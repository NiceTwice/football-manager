import React, { Component } from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {initAppState} from "./actions/common";
import TeamsList from "./components/TeamsList";
import AddPlayerModal from "./components/AddPlayerModal";
import EditPlayerModal from "./components/EditPlayerModal";

@connect()
class App extends Component {
  state = {
    loading: true,
    error: ''
  }
  componentDidMount(){
    this.props.dispatch(initAppState()).then(response => {
      this.setState({loading: false, error: ''});
    }).catch(err => {
      this.setState({loading: false, error: err})
    })
  }
  render() {
    return (
        <div className="App">
          <header className="appHeader">
            <h1>English Premier League</h1>
          </header>
          <div className="appBody">
            {this.state.loading ?
                'Loading' :
                !!this.state.error ?
                    `Something went wrong: ${this.state.error}`:
                    <TeamsList/>}
          </div>
          <Switch>
            <Route exact path={'/addPlayer/:teamId'} component={AddPlayerModal}/>
            <Route exact path={'/player/:playerId/edit'} component={EditPlayerModal}/>
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
