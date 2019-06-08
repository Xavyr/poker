import * as React from "react";
import styled from "styled-components";

type Props = {
  decisions: Array<{}>;
  moneyLine: number;
};

type State = {
  baseline: number;
};

const MoneyPoint = ({ equity }) => {
  return <li>{equity}</li>;
};

export class MoneyLine extends React.Component<Props, State> {
  render() {
    const { moneyLine, decisions } = this.props;
    console.log("DECISIONS", decisions);
    return (
      <div style={{ color: "white", backgroundColor: "black" }}>
        <h1>Money Line</h1>
        <div>
          <h5>Net Bankroll: {moneyLine}</h5>
        </div>
        <div>
          <h5>Decisions:</h5>
          <ul>
            {decisions &&
              decisions.map(decision => {
                return <MoneyPoint equity={decision.equityEarnedOrLost} />;
              })}
          </ul>
        </div>
      </div>
    );
  }
}
