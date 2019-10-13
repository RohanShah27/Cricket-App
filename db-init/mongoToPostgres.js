const url = "mongodb://localhost:27017/crickstrait_db";
const escape = require("pg-escape");

let MongoClient = require("mongodb").MongoClient;

const pgp = require("pg-promise")();
const postdb = pgp("postgres://postgres:root@localhost:5432/crickstrait_db");
let dbo;

MongoClient.connect(url, {
	useNewUrlParser: true
}).then(async db => {
	dbo = db.db("crickstrait_db");
	// async function which will be defined below

	console.time("Computing match type");
	await match_type();
	console.timeEnd("match type");

	console.log();

	console.time("Computing match table");
	await match();
	console.timeEnd("match table");

	await player_stats();
	console.log("Promise satisfied");
});

async function match() {
	console.log(
		"\x1b[34m%s\x1b[0m",
		"\nEntered in match function.\nThis might take time, depends on your device.\n"
	);
	ids = await dbo
		.collection("matchinfo")
		.find()
		.toArray();
	let inc = 1;

	for (id in ids) {
		let venue_id;
		let umpires_id = [];
		let toss_winner_id;
		let inning_team_id = [];
		let inning_one_team_id;
		let inning_two_team_id;
		let winner_id;
		try {
			let currentId = ids[id];
			// // venue
			venue_id = 0;
			if (
				currentId.info.hasOwnProperty("venue") ||
				currentId.info.hasOwnProperty("city")
			) {
				let query = escape(
					"with s as (select venue_id, venue_name from venue where venue_name=%L), i as (insert into venue(venue_name,venue_city) select %L,%L where not exists (select 1 from s) returning venue_id) select venue_id from s union all select venue_id from i",
					currentId.info.venue ? currentId.info.venue : "NA",
					currentId.info.venue ? currentId.info.venue : "NA",
					currentId.info.city ? currentId.info.city : "NA"
				);
				venue_id = await postdb.any(query);
				venue_id = venue_id[0].venue_id;
			}

			// umpires of the match
			if (currentId.info.hasOwnProperty("umpires")) {
				for (umpire in currentId.info.umpires) {
					let u = currentId.info.umpires;
					query = escape(
						"with s as (select umpire_id, umpire_name from umpire where umpire_name=%L), i as (insert into umpire(umpire_name) select %L where not exists (select 1 from s) returning umpire_id) select umpire_id from s union all select umpire_id from i",
						u[umpire],
						u[umpire]
					);
					umpire_id = await postdb.any(query);

					umpires_id.push(umpire_id[0].umpire_id);
				}
			}

			// // toss_winner
			query = escape(
				"with s as (select team_id, team_name from team where team_name=%L), i as (insert into team(team_name) select %L where not exists (select 1 from s) returning team_id) select team_id from s union all select team_id from i",
				currentId.info.toss.winner,
				currentId.info.toss.winner
			);
			toss_winner_id = await postdb.any(query);
			toss_winner_id = toss_winner_id[0].team_id;

			// =======================================================================
			let innning_dec = 2;
			if (currentId.info.outcome.result == "no result") {
				innning_dec = 1;
			}
			for (single_match_inning of currentId.innings) {
				for (let [single_inning, single_inning_data] of Object.entries(
					single_match_inning
				)) {
					let si = single_inning;
					if (innning_dec > 0) {
						query = escape(
							"with s as (select team_id, team_name from team where team_name=%L), i as (insert into team(team_name) select %L where not exists (select 1 from s) returning team_id) select team_id from s union all select team_id from i",
							single_inning_data.team,
							single_inning_data.team
						);
						let one_team_id = await postdb.any(query);
						inning_team_id.push(one_team_id[0].team_id);
						// console.log(si, single_inning_data.team);
					}
					innning_dec--;
				}
			}

			if (inning_team_id.length == 1) {
				inning_team_id.push(0);
			}

			// // winner
			winner_id = 0;
			if (currentId.info.outcome.hasOwnProperty("winner")) {
				query = escape(
					"with s as (select team_id, team_name from team where team_name=%L), i as (insert into team(team_name) select %L where not exists (select 1 from s) returning team_id) select team_id from s union all select team_id from i",
					currentId.info.outcome.winner,
					currentId.info.outcome.winner
				);
				winner_id = await postdb.any(query);
				winner_id = winner_id[0].team_id;
			}

			let outcome_match;
			if (currentId.info.outcome.hasOwnProperty("result")) {
				outcome_match = `${currentId.info.outcome.result}`;
			} else if (currentId.info.outcome.by.hasOwnProperty("runs")) {
				outcome_match = `won by ${currentId.info.outcome.by.runs} runs`;
			} else if (currentId.info.outcome.by.hasOwnProperty("wickets")) {
				outcome_match = `won by ${currentId.info.outcome.by.wickets} wickets`;
			}
			// console.log("outcome", currentId.info.outcome);

			competition = "others";
			if (currentId.info.hasOwnProperty("competition")) {
				competition = currentId.info.competition;
			}

			// Insert into match table
			query = escape(
				`insert into match(match_type,toss_winner,toss_decision,innings_one_team,innings_two_team,outcome,player_of_the_match,gender,winner,venue_id,competition) values('${
					currentId.info.match_type
				}',${toss_winner_id},'${currentId.info.toss.decision}',${
					inning_team_id[0]
				},${inning_team_id[1]},'${outcome_match}',ARRAY[%L],'${
					currentId.info.gender
				}',${winner_id},${venue_id},%L) returning match_id`,
				currentId.info.player_of_match,
				competition
			);
			console.log("\n\nmatch query", query);
			console.log("\x1b[36m%s\x1b[0m", `mongo id ${currentId._id}`);
			let match_id = await postdb.any(query);
			if (match_id.length > 0) {
				console.log(
					"\x1b[35m%s\x1b[0m",
					`\n=========> inserted data in match table ${inc} `
				);
			}
			match_id = match_id[0].match_id;

			//  insert into match_umpires table
			umpires_id.forEach(async u_id => {
				query = `insert into match_umpire values(${match_id},${u_id})`;
				const result = await postdb.any(query);
				// if (result.length < 0) {
				// 	console.log(
				// 		"\x1b[45m\x1b30m%s\x1b[0m",
				// 		`\n=======================> inserted data in match_umpires table ${inc}`
				// 	);
				// }
			});

			//  insert into match_date table
			currentId.info.dates.forEach(async date => {
				date = date.substring(0, 10);
				const query = escape(
					`insert into match_date values(${match_id},%L)`,
					date
				);
				const result = await postdb.any(query);
				// if (result.length < 0) {
				// 	console.log(
				// 		"\x1b[45m\x1b30m%s\x1b[0m",
				// 		`\n=======================> inserted data in match_date table ${inc}`
				// 	);
				// }
			});

			// inserting for delivery
			for (let i in currentId.innings) {
				let inn = parseInt(i) + 1;
				console.log(`=========> inserting innings ${inn} `);
				for (const [k, v] of Object.entries(currentId.innings[i])) {
					let current_team = v.team;
					let team_query = escape(
						"with s as (select team_id, team_name from team where team_name=%L), i as (insert into team(team_name) select %L where not exists (select 1 from s) returning team_id) select team_id from s union all select team_id from i",
						current_team,
						current_team
					);

					let current_team_id = await postdb.any(team_query);
					current_team_id = current_team_id[0].team_id;

					deliveries = v.deliveries;
					let current_team_players = [];
					for (delivery in deliveries) {
						for (const [key, val] of Object.entries(
							deliveries[delivery]
						)) {
							// console.log(key);
							let wicket_id = 0;
							let extras_id = 0;
							let fielder_one = 0;
							let fielder_two = 0;
							if (val.hasOwnProperty("wicket")) {
								if (val.wicket.hasOwnProperty("fielders")) {
									// console;
									// console.log(
									// 	"\x1b[34m%s\x1b[0m",
									// 	`wicket fielders length ${val.wicket.fielders.length}`
									// );
									// get fielder_one id
									let query = escape(
										"with s as (select player_id, player_name from player where player_name=%L), i as (insert into player(player_name) select %L where not exists (select 1 from s) returning player_id) select player_id from s union all select player_id from i",
										val.wicket.fielders[0],
										val.wicket.fielders[0]
									);
									fielder_one = await postdb.any(query);
									if (fielder_one.length > 0) {
										fielder_one = fielder_one[0].player_id;
									} else {
										fielder_one = 0;
									}

									// get fielder_two id
									if (val.wicket.fielders.length == 2) {
										query = escape(
											"with s as (select player_id, player_name from player where player_name=%L), i as (insert into player(player_name) select %L where not exists (select 1 from s) returning player_id) select player_id from s union all select player_id from i",
											val.wicket.fielders[1],
											val.wicket.fielders[1]
										);
										fielder_two = await postdb.any(query);
										if (fielder_two.length > 0) {
											fielder_two =
												fielder_two[0].player_id;
										} else {
											fielder_two = 0;
										}
									}
								}

								// get player_out id
								let query = escape(
									"with s as (select player_id, player_name from player where player_name=%L), i as (insert into player(player_name) select %L where not exists (select 1 from s) returning player_id) select player_id from s union all select player_id from i",
									val.wicket.player_out,
									val.wicket.player_out
								);
								let player_out = await postdb.any(query);
								player_out = player_out[0].player_id;

								// add into wickets
								query = `insert into wickets(wicket_type,fielder_one, fielder_two, player_out) values('${val.wicket.kind}',${fielder_one},${fielder_two},${player_out}) returning wicket_id`;

								wicket_id = await postdb.any(query);
								wicket_id = wicket_id[0].wicket_id;
							}
							if (val.hasOwnProperty("extras")) {
								const query = escape(
									`insert into extras(extras_type,extras_run) values(%L,${val.runs.extras}) returning extras_id`,
									Object.keys(val.extras)[0]
								);
								extras_id = await postdb.any(query);
								extras_id = extras_id[0].extras_id;
							}

							// get striker_id
							let query = escape(
								"with s as (select player_id, player_name from player where player_name=%L), i as (insert into player(player_name) select %L where not exists (select 1 from s) returning player_id) select player_id from s union all select player_id from i",
								val.batsman,
								val.batsman
							);
							let striker_id = await postdb.any(query);
							striker_id = striker_id[0].player_id;

							// get non_striker_id
							query = escape(
								"with s as (select player_id, player_name from player where player_name=%L), i as (insert into player(player_name) select %L where not exists (select 1 from s) returning player_id) select player_id from s union all select player_id from i",
								val.non_striker,
								val.non_striker
							);
							let non_striker_id = await postdb.any(query);
							non_striker_id = non_striker_id[0].player_id;

							current_team_players.push(striker_id);
							current_team_players.push(non_striker_id);

							// get bowler_id
							query = escape(
								"with s as (select player_id, player_name from player where player_name=%L), i as (insert into player(player_name) select %L where not exists (select 1 from s) returning player_id) select player_id from s union all select player_id from i",
								val.bowler,
								val.bowler
							);
							let bowler_id = await postdb.any(query);
							bowler_id = bowler_id[0].player_id;

							// insert into delivery table
							query = `insert into delivery values(${match_id},${inn},${key},${striker_id},${non_striker_id},${bowler_id},${val.runs.batsman},${extras_id},${wicket_id},${val.runs.total})`;
							const del_result = await postdb.any(query);
						}
					}

					// current_team_players = current_team_players.filter(
					// 	(value, index, arr) => arr.indexOf(value) === index
					// );

					current_team_players.forEach(current_player => {
						const query = `insert into match_team_player select ${match_id},${current_team_id},${current_player} where not exists(select * from match_team_player where match_id=${match_id} and team_id=${current_team_id} and player_id=${current_player})`;
						// const query = `insert into match_team_player values(${match_id},${current_team_id},${current_player})`;
						const result = postdb.any(query);
						// if (result.length < 0) {
						// 	console.log(
						// 		"\x1b[45m\x1b30m%s\x1b[0m",
						// 		`\n=======================> inserted data in match_team_player table ${inc}`
						// 	);
						// }
					});
				}
			}
			inc++;
		} catch (err) {
			console.error(err);
		}
	}
}

async function match_type() {
	console.log("\x1b[34m%s\x1b[0m", "\nEntered in match_type function.\n");
	match_types = await dbo.collection("matchinfo").distinct("info.match_type");

	console.log(match_types);
	match_types.forEach(async type => {
		let query = `select match_type_id from match_type where match_type = '${type}'`;
		console.log(query);
		const match_type_id = await postdb.any(query);
		if (match_type_id.length < 1) {
			let query = `insert into match_type(match_type) values('${type}')`;
			console.log(query);

			const result = await postdb.any(query);
		}
	});
}

async function player_stats() {
	const player_ids = await postdb.any("select player_id from player");
	player_ids.forEach(async player => {
		//  total_runs stats
		let query = `select m.match_type, sum(d.batsman_run) as total_runs from delivery as d inner join match as m on d.match_id = m.match_id where d.striker = ${player.player_id} group by m.match_type`;

		const total_runs_results = await postdb.any(query);
		total_runs_results.forEach(async result => {
			let query = `insert into player_stats(player_stats_name, player_stats_value,player_id, match_type) values('total_runs',${result.total_runs},${player.player_id},'${result.match_type}') returning player_stats_id`;

			console.log("add total runs to player_stats : ", query);
			const player_stat = await postdb.any(query);
		});

		// // total_wickets stats
		const total_wickets_results = await postdb.any(
			`select m.match_type, count(d.wicket_id) as total_wickets from delivery as d inner join match as m on d.match_id = m.match_id where d.bowler = ${player.player_id} and d.wicket_id>0 group by m.match_type`
		);
		total_wickets_results.forEach(async result => {
			let query = `insert into player_stats(player_stats_name, player_stats_value,player_id, match_type) values('total_wickets',${result.total_wickets},${player.player_id},'${result.match_type}') returning player_stats_id`;

			console.log("add total wicket to player_stats : ", query);
			const player_stat = await postdb.any(query);
		});

		// // // // 4s stats
		const fours_results = await postdb.any(
			`select m.match_type, count(d.batsman_run) as total_4s from delivery as d inner join match as m on d.match_id = m.match_id where d.striker = ${player.player_id} and d.batsman_run=4 group by m.match_type`
		);
		fours_results.forEach(async result => {
			let query = `insert into player_stats(player_stats_name, player_stats_value,player_id, match_type) values('4s',${result.total_4s},${player.player_id},'${result.match_type}') returning player_stats_id`;

			console.log("add total fours to player_stats : ", query);
			const player_stat = await postdb.any(query);
		});

		// // // // 6s stats
		const sixes_results = await postdb.any(
			`select m.match_type, count(d.batsman_run) as total_6s from delivery as d inner join match as m on d.match_id = m.match_id where d.striker = ${player.player_id} and d.batsman_run=6 group by m.match_type`
		);
		sixes_results.forEach(async result => {
			let query = `insert into player_stats(player_stats_name, player_stats_value,player_id, match_type) values('6s',${result.total_6s},${player.player_id},'${result.match_type}') returning player_stats_id`;

			console.log("add total sixes to player_stats : ", query);
			const player_stat = await postdb.any(query);
		});

		// total 50s
		const total_50s_result =await postdb.any(`with total as (select m.match_type, m.match_id, sum(d.batsman_run) as total_50s from delivery as d inner join match as m on d.match_id = m.match_id
		where d.striker = ${player.player_id} group by m.match_type, m.match_id)
		select match_type, count(total_50s) as no_of_50s from total where total_50s >= 50 and total_50s <100 group by match_type`)
		total_50s_result.forEach(async result=>{
			let query =`insert into player_stats(player_stats_name,player_stats_value,player_id,match_type) values ('total_50s','${result.no_of_50s}',${player.player_id},'${result.match_type}') returning player_stats_id;`
			const player_stat = await postdb.any(query);
			console.log("add total 50s to player_stats : ", query);
		});

		// Total centuries
		const total_100s_result =await postdb.any(`with total as (select m.match_type, m.match_id, sum(d.batsman_run) as total_100s from delivery as d inner join match as m on d.match_id = m.match_id
		where d.striker = ${player.player_id} group by m.match_type, m.match_id)
		select match_type, count(total_100s) as no_of_100s from total where total_100s >= 100 and total_100s <200 group by match_type`)
		total_100s_result.forEach(async result=>{
			let query =`insert into player_stats(player_stats_name,player_stats_value,player_id,match_type) values ('centuries','${result.no_of_100s}',${player.player_id},'${result.match_type}') returning player_stats_id;`
			console.log("Added total 100s to the player_stats",query);
			const player_stat=await postdb.any(query);
		})

		// Total double centuries
		const total_200s_result =await postdb.any(`with total as (select m.match_type, m.match_id, sum(d.batsman_run) as total_200s from delivery as d inner join match as m on d.match_id = m.match_id
		where d.striker = ${player.player_id} group by m.match_type, m.match_id)
		select match_type, count(total_200s) as no_of_200s from total where total_200s >= 200 and total_200s <300 group by match_type`)
		total_200s_result.forEach(async result=>{
			let query =`insert into player_stats(player_stats_name,player_stats_value,player_id,match_type) values ('double centuries','${result.no_of_200s}',${player.player_id},'${result.match_type}') returning player_stats_id;`
			console.log("Added total 200s to the player_stats",query);
			const player_stat=await postdb.any(query);
		})
	});
}
