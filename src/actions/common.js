import shortid from "shortid";
import api from "../utils/api";

export const initAppState = () => {
  return async (dispatch, getState) => {
    if (getState().teams.loaded)
      return;
    let teams = await api.fetchTeams();
    let players = {};

    teams = teams.map(team => ({
      apiId: team.idTeam,
      id: shortid.generate(),
      name: team.strTeam,
      players: []
    }));
    let playersList = await Promise.all(teams.map(team => api.fetchTeamPlayers({team_id: team.apiId})));
    teams = teams.map((team, idx) => {
      return {
        ...team,
        players: playersList[idx].map(player => {
          const id = shortid.generate();
          players[id] = {
            teamId: team.id,
            name: !!player.strPlayer ? player.strPlayer : '',
            position: !!player.strPosition ? player.strPosition : '',
            avatar: !!player.strCutout ? player.strCutout : '',
            birthdate: !!player.dateBorn ? player.dateBorn : '',
            contractDate: !!player.dateSigned ? player.dateSigned : '',
            birthLocation: !!player.strBirthLocation ? player.strBirthLocation : '',
            description: !!player.strDescriptionEN ? player.strDescriptionEN : '',
            id: id
          };
          return id;
        })
      }
    });
    dispatch({
      type: 'INIT_APP_STATE',
      teams: teams,
      players: players
    })
  }
}

export const createPlayer = ({player}) => {
  return (dispatch, getState) => {
    if (!getState().teams.teams.find(team => team.id === player.teamId))
      return;
    dispatch({
      type: 'CREATE_PLAYER',
      player: {
        ...player,
        id: shortid.generate()
      }
    })
  }
}

export const deletePlayer = ({playerId}) => {
  return (dispatch, getState) => {
    if (!getState().teams.players[playerId])
      return;
    dispatch({
      type: 'DELETE_PLAYER',
      playerId
    })
  }
}

export const updatePlayer = ({player}) => {
  return (dispatch, getState) => {
    if (!getState().teams.players[player.id])
      return;
    dispatch({
      type: 'UPDATE_PLAYER',
      player
    })
  }
}
