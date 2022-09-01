import React from "react";

class TeamEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: 20
          }}
        >
          <div>{this.props.username}</div>
          <div>{this.props.metadata.record}</div>
          <div>{this.props.roster[0]}</div>
        </div>
      </>
    );
  }
}

export default TeamEntry;
