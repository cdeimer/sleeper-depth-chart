import React from "react";
import TeamEntry from "./components/TeamEntry";
import DepthChart from "./components/DepthChart";
import {
  InputGroup,
  InputGroupAddon,
  FormInput,
  Button,
  Form
} from "shards-react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

class SleeperTestApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: "",
      leagueID: null,
      userData: [],
      rosterData: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ formValue: event.target.value });
  }

  handleSubmit(event) {
    console.log("An ID was submitted: " + this.state.formValue);
    this.setState({ leagueID: this.state.formValue });
    event.preventDefault();

    /* remove api call while I mock the data
    fetch("https://api.sleeper.app/v1/league/723379161837670400/users")
      .then((response) => response.json())
      .then((data) => this.setState({ userData: data }));
    */
  }

  render() {
    //const userData = this.state.userData;
    const userData = require("./data/test_data/user_data_test.json");
    const rosterData = require("./data/test_data/roster_data_test.json");
    const playerData = require("./data/test_data/player_data_test.json");
    const formattedData = [];
    userData.forEach((user) => {
      var formattedObject = {};
      var id = user["user_id"];
      formattedObject["id"] = id;
      formattedObject["username"] = user["display_name"];
      formattedObject["teamname"] = user["metadata"]["team_name"];
      for (var i in rosterData) {
        if (rosterData[i].owner_id === id) {
          formattedObject["roster"] = rosterData[i]["players"];
          formattedObject["starters"] = rosterData[i]["starters"];
          formattedObject["metadata"] = rosterData[i]["metadata"];
        }
      }
      formattedData.push(formattedObject);
    });
    //console.log(formattedData);
    return (
      <div>
        <h1>Sleeper League Visualizer</h1>

        <Form onSubmit={this.handleSubmit}>
          <InputGroup seamless className="mx-auto w-75">
            <FormInput
              value={this.state.formValue}
              onChange={this.handleChange}
              placeholder="League ID"
            />
            <InputGroupAddon type="append">
              <Button>Submit</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>

        <h2>{this.state.formValue}</h2>
        <h2>{this.state.leagueID}</h2>

        <DepthChart rosterData={formattedData} />

        <div hidden>
          {formattedData.map((user) => (
            <div className="user" key={user.id}>
              <b>{user.username}</b>{" "}
              {user.teamname ? "(" + user.teamname + ")" : ""}
              <TeamEntry {...user} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <SleeperTestApp />
    </div>
  );
}
