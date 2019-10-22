import axios from "axios";
import {
  GET_RECENT_MATCHES,
  GET_MATCHESBYTYPE,
  SEARCH_TEAM,
  GET_MATCH_DETAILS,
  GET_SCORECARD,
  MATCH_SUMMARY,
  GET_MATCHES_BY_TEAM,
  GET_MATCHES_BY_TEAM_AND_TYPE,
  GET_MATCHES_BY_DATE,
  MANHATTAN_GRAPH_MATCH
} from "./Types";

const url = "http://localhost:5000/api/matches";

// et Recent Matches
export const getMatchesRecentMatches = gender => dispatch => {
  console.log(gender);
  return axios
    .get(url + "/getrecent/" + gender)
    .then(res => {
      dispatch({
        type: GET_RECENT_MATCHES,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get Matches by match type
export const getMatchesByType = matches => dispatch => {
  console.log("Actions", matches);
  return axios
    .post(url + "/getbytype", matches)
    .then(res => {
      dispatch({
        type: GET_MATCHESBYTYPE,
        payload: res.data.data
      });
      console.log("ODI", res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// To get Scorecard of a particular match
export const getScorecard = id => dispatch => {
  return axios
    .get(url + "/getscorecard/" + id.match_id)
    .then(res => {
      dispatch({
        type: GET_SCORECARD,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get Matchdetails of a match
export const getMatchDetails = id => dispatch => {
  console.log(" id actions " + id.match_id);
  return axios
    .get(url + "/getmatchdetails/" + id.match_id)
    .then(res => {
      dispatch({
        type: GET_MATCH_DETAILS,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const searchTeam = team_name => dispatch => {
  console.log(team_name);
  return axios
    .post(url + "/match_search", team_name)
    .then(res => {
      dispatch({
        type: SEARCH_TEAM,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get Summary of a match
export const getAllMatchDetails = id => dispatch => {
  console.log(id);
  return axios
    .get(url + "/summary/" + id.match_id)
    .then(res => {
      dispatch({
        type: MATCH_SUMMARY,
        payload: res.data.data
      });
      console.log("Details", res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get All Matches of a team
export const getMatchesByTeam = (teamname, gender) => dispatch => {
  console.log(teamname);
  return axios
    .post(url + "/getbyteam", teamname, gender)
    .then(res => {
      dispatch({
        type: GET_MATCHES_BY_TEAM,
        payload: res.data.data
      });
      console.log("from team match action team is:", res);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get all matches of a team and match_type
export const getMatchesByTeamAndType = teamname => dispatch => {
  console.log(teamname);
  return axios
    .post(url + "/getbyteamandtype", teamname)
    .then(res => {
      dispatch({
        type: GET_MATCHES_BY_TEAM_AND_TYPE,
        payload: res.data.data
      });
      console.log("from team match action team is:", res);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get Matches of team based on match type,date and gender
export const getMatchesByDate = teamname => dispatch => {
  console.log(teamname);
  return axios
    .post(url + "/getbydate", teamname)
    .then(res => {
      dispatch({
        type: GET_MATCHES_BY_DATE,
        payload: res.data.data
      });
      console.log("from team match action team is:", res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Manhattan Chart for each Match
export const getManhattanGraphMatch = teamid => dispatch => {
  return axios
    .get("http://127.0.0.1:5002/runperover/" + teamid)
    .then(res => {
      dispatch({
        type: MANHATTAN_GRAPH_MATCH,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Pie chart of Batsman Contribution for Innings1
export const getPieChartBatsman1 = (teamid, innings) => dispatch => {
  return axios
    .get("http://127.0.0.1:5002/batsman_inning1/" + teamid + "/" + innings)
    .then(res => {
      dispatch({
        type: MANHATTAN_GRAPH_MATCH,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Pie chart of Bowler Contribution for Innings1
export const getPieChartBowler1 = (teamid, innings) => dispatch => {
  return axios
    .get("http://127.0.0.1:5002/bowler_inning1/" + teamid + "/" + innings)
    .then(res => {
      dispatch({
        type: MANHATTAN_GRAPH_MATCH,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Pie chart of Batsman Contribution for Innings2
export const getPieChartBatsman2 = (teamid, innings) => dispatch => {
  return axios
    .get("http://127.0.0.1:5002/batsman_inning2/" + teamid + "/" + innings)
    .then(res => {
      dispatch({
        type: MANHATTAN_GRAPH_MATCH,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Pie chart of Bowler Contribution for Innings2
export const getPieChartBowler2 = (teamid, innings) => dispatch => {
  return axios
    .get("http://127.0.0.1:5002/bowler_inning2/" + teamid + "/" + innings)
    .then(res => {
      dispatch({
        type: MANHATTAN_GRAPH_MATCH,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
