import createReducer from  "./createReducer";
import update from "immutability-helper";

export default createReducer({
  loaded: false,
  teams: [],
  players: {}
}, {
  ['INIT_APP_STATE'](state, {teams, players}){
    return {
      ...state,
      teams,
      players,
      loaded: true
    }
  },
  ['CREATE_PLAYER'](state, {player}){
    const {teams} = state;
    const indexOfTeamToUpdate = teams.findIndex(team => team.id === player.teamId);
    const team = update(teams[indexOfTeamToUpdate], {
      players: {$unshift: [player.id]}
    });

    return update(state, {
      players: {
        [player.id] : {$set: player}
      },
      teams: {$splice: [[indexOfTeamToUpdate, 1, team]]}
    })
  },
  ['DELETE_PLAYER'](state, {playerId}){
    const {teams, players} = state;
    const player = players[playerId];
    const indexOfTeamToUpdate = teams.findIndex(team => team.id === player.teamId);
    const team = update(teams[indexOfTeamToUpdate], {
      players: {$splice: [[teams[indexOfTeamToUpdate].players.findIndex(item => item === player.id), 1]]}
    });

    return update(state, {
      players: {$unset: [player.id]},
      teams: {$splice: [[indexOfTeamToUpdate, 1, team]]}
    })
  },
  ['UPDATE_PLAYER'](state, {player}){
    if (state.players[player.id].teamId !== player.teamId){
      const oldTeamIdx = state.teams.findIndex(team => team.id === state.players[player.id].teamId);
      const newTeamIdx = state.teams.findIndex(team => team.id === player.teamId);

      state = update(state, {
        teams: {
          [oldTeamIdx]: {
            players: {$splice: [[state.teams[oldTeamIdx].players.findIndex(playerId => playerId === player.id), 1]]}
          },
          [newTeamIdx]: {
            players: {$unshift: [player.id]}
          }
        }
      })
    }
    return update(state, {
      players: {
        [player.id]: {$merge: player}
      }
    })
  }
});