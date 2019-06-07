import * as React from "react";

type Props = {
  moneyInPot: number;
  bet: number;
};

type State = {};

export class Pot extends React.Component<Props, State> {
  public state: State = {};

  render() {
    const { moneyInPot, bet } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "silver",
          marginTop: 40,
          marginBottom: 40
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3>Current bet is {bet}</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3>Money in Pot {moneyInPot}</h3>
        </div>
      </div>
    );
  }
}
