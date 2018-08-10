import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createPlayer} from "../actions/common";
import {playerPositions} from "../utils/datas";
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';

@connect(store => ({
  teams: store.teams.teams
}))
class AddPlayerModal extends React.PureComponent {
  state = {
    avatar: '',
    name: '',
    birthdate: '',
    birthLocation: '',
    contractDate: '',
    description: '',
    position: '',
    teamId: ''
  }
  confirm = (e) => {
    e.preventDefault();
    this.props.dispatch(createPlayer({
      player: {
        ...this.state
      }
    }));
    this.close();
  };
  close = () => {
    this.props.history.push('/');
  }
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  componentWillMount(){
    this.setState({teamId: this.props.match.params.teamId})
  }
  render(){
    const {avatar, birthdate, name, birthLocation, contractDate, description, position, teamId} = this.state;
    const {teams} = this.props

    return (
        <Modal isOpen={true} toggle={this.close}>
          <Form onSubmit={this.confirm}>
            <ModalHeader toggle={this.close}>Add new player !</ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Col sm={6}>
                  <Label>Name</Label>
                  <Input type="text"
                         value={name}
                         onChange={this.onChange}
                         name="name"
                         placeholder="Name"
                         required/>
                </Col>
                <Col sm={6}>
                  <Label>Avatar URL</Label>
                  <Input type="url"
                         value={avatar}
                         onChange={this.onChange}
                         name="avatar"
                         placeholder="Avatar URL" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={6}>
                  <Label>Birthdate</Label>
                  <Input type="date"
                         value={birthdate}
                         onChange={this.onChange}
                         name="birthdate"
                         placeholder="Birthdate" />
                </Col>
                <Col sm={6}>
                  <Label>Birth location</Label>
                  <Input type="text"
                         value={birthLocation}
                         onChange={this.onChange}
                         name="birthLocation"
                         placeholder="Birth location" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={6}>
                  <Label>Contract date</Label>
                  <Input type="date"
                         value={contractDate}
                         onChange={this.onChange}
                         name="contractDate"
                         placeholder="Contract date" />
                </Col>
                <Col sm={6}>
                  <Label>Position</Label>
                  <Input type="select"
                         value={position}
                         onChange={this.onChange}
                         name="position"
                         placeholder="Position"
                         required>
                    <option value="">Select</option>
                    {playerPositions.map((p,i) => <option key={i}>{p}</option>)}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label>Team</Label>
                <Input type="select"
                       value={teamId}
                       onChange={this.onChange}
                       name="teamId"
                       required
                       placeholder="Team">
                  {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea"
                       value={description}
                       onChange={this.onChange}
                       name="description"
                       placeholder="Description" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Confirm</Button>{' '}
              <Button color="secondary"
                      type="button"
                      onClick={this.close}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
    )
  }
}

export default withRouter(AddPlayerModal);