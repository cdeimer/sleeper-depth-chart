import React from "react";

class DepthChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: require("../data/test_data/player_data_test.json")
    };
  }

  getPlayerInfoForTeam(team) {
    const teamArray = [];
    for (var player of team.roster) {
      const playerObject = {};
      if (player in this.state.playerData) {
        playerObject["position"] = this.state.playerData[player]["position"];
        playerObject["full_name"] = this.state.playerData[player]["full_name"];
        teamArray.push(playerObject);
      } else if (isNaN(player)) {
        playerObject["position"] = "DEF";
        playerObject["full_name"] = player;
        teamArray.push(playerObject);
      }
    }
    console.log(teamArray);
    return teamArray;
  }

  getPlayersOfPosition(team, position) {
    var players = "";
    for (var player in team) {
      if (team[player].position === position) {
        players += team[player].full_name + "\n";
      }
    }
    return players;
  }

  render() {
    console.log(this.props.rosterData);
    console.log(this.state.playerData);
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>QB</th>
              <th>RB</th>
              <th>WR</th>
              <th>TE</th>
              <th>K</th>
              <th>DST</th>
            </tr>
          </thead>
          <tbody>
            {this.props.rosterData.map((team, key) => {
              const playerInfo = this.getPlayerInfoForTeam(team);
              return (
                <tr key={key}>
                  <td>{team.username}</td>
                  <td>{this.getPlayersOfPosition(playerInfo, "QB")}</td>
                  <td>{this.getPlayersOfPosition(playerInfo, "RB")}</td>
                  <td>{this.getPlayersOfPosition(playerInfo, "WR")}</td>
                  <td>{this.getPlayersOfPosition(playerInfo, "TE")}</td>
                  <td>{this.getPlayersOfPosition(playerInfo, "K")}</td>
                  <td>{this.getPlayersOfPosition(playerInfo, "DEF")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default DepthChart;
