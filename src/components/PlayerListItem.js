import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ListGroupItem, Button} from "reactstrap";
import {deletePlayer} from "../actions/common";

@connect((store, props) => ({
  player: store.teams.players[props.id]
}))
export default class PlayerListItem extends React.PureComponent {
  render(){
    const {player} = this.props;

    return (
        <ListGroupItem className="flex">
          <div className="avatar flex align-center justify-center noshrink box">
            {!!player.avatar ?
                <img src={player.avatar} alt="avatar"/> :
                <i className="far fa-user"/>}
          </div>
          <div className="flex column box grow">
            <h5>
              {player.name}
            </h5>
            <div className="desc flex column">
              <p className="flex">
                <span className="t-muted">Birthdate</span>{!!player.birthdate ? player.birthdate : 'not specified'}
              </p>
              <p className="flex">
                <span className="t-muted">Location</span>{!!player.birthLocation ? player.birthLocation : 'not specified'}
              </p>
              <p className="flex">
                <span className="t-muted">Position</span>{!!player.position ? player.position : 'not specified'}
              </p>
              <p className="flex">
                <span className="t-muted">Contract date</span>{!!player.contractDate ? player.contractDate : 'not specified'}
              </p>
              <p className="t-muted">
                Description
              </p>
              <p className="description">
                {!!player.description ? player.description : 'Not specified'}
              </p>
            </div>
            <div>
              <Link to={`/player/${player.id}/edit`}>
                <Button outline color="primary">
                  Edit
                </Button>
              </Link>
              {' '}
              <Button color="link" onClick={() => this.props.dispatch(deletePlayer({playerId: player.id}))}>
                Remove
              </Button>
            </div>
          </div>
        </ListGroupItem>
    )
  }
}
