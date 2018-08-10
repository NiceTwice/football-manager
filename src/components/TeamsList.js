import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PlayerListItem from "./PlayerListItem";
import {Container, Row, Col, Collapse, ListGroup, Button} from "reactstrap";

class TeamListItem extends React.PureComponent {
  state = {
    collapse: false
  }
  toggleCollapse = () => {
    this.setState({collapse: !this.state.collapse})
  }
  render(){
    const {team} = this.props;

    return (
        <Row>
          <Col className="teamListItem">
            <div className="title flex align-center" onClick={this.toggleCollapse}>
              <span className="box grow flex align-center t-ellipsis">
                <i className="fas fa-futbol"/> <span className="t-ellipsis">{team.name}</span>
              </span>
              <span className="count box noshrink">
                <i className="far fa-user"/> {team.players.length}
              </span>
              <i className="fas fa-caret-down"/>
            </div>
            <Collapse isOpen={this.state.collapse}>
              <div className="players">
                <Link to={`/addPlayer/${team.id}`}>
                  <Button color="primary" style={{marginBottom: 15}}>
                    Add new
                  </Button>
                </Link>
                <ListGroup>
                  {team.players.map(pId => {
                    return <PlayerListItem key={pId} id={pId}/>
                  })}
                </ListGroup>
              </div>
            </Collapse>
          </Col>
        </Row>
    )
  }
}

@connect(store => ({
  teams: store.teams.teams
}))
export default class TeamsList extends React.PureComponent {
  render(){
    const {teams} = this.props;
    return (
        <Container className="teamsList">
          {teams.map(team => <TeamListItem key={team.id} team={team}/>)}
        </Container>
    )
  }
}