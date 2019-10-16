drop database if exists crickstrait_dbs;
create database crickstrait_dbs;

\c crickstrait_dbs;

create table user_info
(
    id serial,
    email varchar,
    password varchar
);
create table delivery
(
    match_id int,
    inning int,
    overs float,
    striker int,
    non_striker int,
    bowler int,
    batsman_run int,
    extra_id int,
    wicket_id int,
    total_runs int
);

create table extras
(
    extras_id serial,
    extras_type varchar(255),
    extras_run int
);

create table match
(
    match_id serial,
    match_type varchar(255),
    toss_winner int,
    toss_decision varchar(255),
    innings_one_team int,
    innings_two_team int,
    outcome varchar(255),
    player_of_the_match varchar
    [],
    gender varchar
    (255),
    winner int,
    summary varchar
    (8000),
    venue_id int,
    competition varchar
    (255)
);

    create table match_date
    (
        match_id int,
        match_date date
    );

    create table match_team_player
    (
        match_id int,
        team_id int,
        player_id int
    );

    create table match_type
    (
        match_type_id serial,
        match_type varchar(255),
        match_values varchar(255)
    );

    create table match_umpire
    (
        match_id int,
        umpire_id int
    );

    create table headlines
    (
        headline_id serial,
        headlines varchar(8000)

    );
    create table fixtures
    (
        fixture_id serial,
        match_date varchar(8000),
        match varchar(8000),
        time varchar(100)
    );

    create table player
    (
        player_id serial,
        player_name varchar(255),
        player_type varchar(255),
        batting_style varchar(255),
        bowling_style varchar(255),
        player_dob date,
        player_role varchar(255),
        gender varchar
    );

    create table player_stats
    (
        player_stats_id serial,
        player_id int,
        player_stats_name varchar(100),
        player_stats_value int,
        match_type varchar(30),
        competition varchar(255)
    );

    create table match_stats
    (
        match_stats_id serial,
        match_id int,
        match_stats_name varchar(100),
        match_stats_value varchar(255),
        match_type varchar(30),
        competition varchar(255),
        inning int
    );

    create table team_stats
    (
        team_stats_id serial,
        team_stats_name varchar(100),
        team_stats_value varchar(255),
        team_id int,
        match_type varchar(30),
        competition varchar(255),
        match_id int
    );

    create table team
    (
        team_id serial,
        team_name varchar(255)
    );

    create table umpire
    (
        umpire_id serial,
        umpire_name varchar(255)
    );
    create table venue
    (
        venue_id serial,
        venue_name varchar(255),
        venue_city varchar(255)
    );

    create table wickets
    (
        wicket_id serial,
        wicket_type varchar(255),
        fielder_one int,
        fielder_two int,
        player_out int
    );
