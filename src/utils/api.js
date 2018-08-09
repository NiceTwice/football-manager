import axios from "axios";

axios.defaults.baseURL = 'https://www.thesportsdb.com/api/v1/json/1/';

export default {
  fetchTeams: () => {
    return axios.get('/lookup_all_teams.php?id=4328').then(response => {
      return response.data.teams;
    }).catch(err => {
      console.log(err);
      throw err;
    })
  },
  fetchTeamPlayers: ({team_id}) => {
    return axios.get(`/lookup_all_players.php?id=${team_id}`).then(response => {
      return response.data.player;
    }).catch(err => {
      console.log(err);
      throw err;
    })
  }
};