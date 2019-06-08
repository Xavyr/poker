import * as React from "react";
import styled from "styled-components";

type Props = {
  decisions: Array<{}>;
  moneyLine: number;
};

type State = {
  baseline: number;
};

const MoneyItem = styled.li`
  color: ${props => (props.correct ? "green" : "red")};
`;

const Bankroll = styled.h5`
  color: ${props => (props.moneyLine > 0 ? "green" : "red")};
`;

const MoneyPoint = ({ equity, correct }) => {
  return <MoneyItem correct={correct}>{equity}</MoneyItem>;
};

export class MoneyLine extends React.Component<Props, State> {
  render() {
    const { moneyLine, decisions } = this.props;
    return (
      <div style={{ color: "white", backgroundColor: "black" }}>
        <h1>Money Line</h1>
        <div>
          <h5>Net Bankroll:</h5>
          <Bankroll moneyLine={moneyLine}>{moneyLine}</Bankroll>
        </div>
        <div>
          <h5>Decisions:</h5>
          <ul>
            {decisions &&
              decisions.map(decision => {
                return (
                  <MoneyPoint
                    correct={decision.correct}
                    equity={decision.equityEarnedOrLost}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}
