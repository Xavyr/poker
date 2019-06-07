import * as React from "react";

type Props = {
  trajectory: Array<number>;
};

type State = {
  baseline: number;
};

export class MoneyLine extends React.Component<Props, State> {
  public state: State = {
    baseline: 0
  };

  render() {
    const { trajectory } = this.props;
    return (
      <div>
        <h1>Money Line</h1>
        <div>
          <h5>Baseline: {this.state.baseline}</h5>
        </div>
        <div>
          <h5>Trajectory: {trajectory}</h5>
        </div>
      </div>
    );
  }
}
