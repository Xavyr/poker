import * as React from "react";

type Props = {
  firstFlop: string;
  secondFlop: string;
  thirdFlop: string;
};

type State = {};

export class Board extends React.Component<Props, State> {
  public state: State = {};

  render() {
    const { firstFlop, secondFlop, thirdFlop } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            backgroundColor: "lightpink",
            textAlign: "center",
            marginRight: 20
          }}
        >
          <h1>First Flop</h1>
          <p>{firstFlop}</p>
        </div>
        <div
          style={{
            backgroundColor: "lightpink",
            textAlign: "center",
            marginRight: 20
          }}
        >
          <h1>Second Flop</h1>
          <p>{secondFlop}</p>
        </div>
        <div
          style={{
            backgroundColor: "lightpink",
            textAlign: "center",
            marginRight: 20
          }}
        >
          <h1>Third Flop</h1>
          <p>{thirdFlop}</p>
        </div>
      </div>
    );
  }
}
