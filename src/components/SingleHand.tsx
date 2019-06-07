import * as React from "react";

type Props = {
  firstCard: string;
  secondCard: string;
  hero?: boolean;
  villain?: boolean;
  thirdToFlop?: boolean;
};

type State = {};

export class SingleHand extends React.Component<Props, State> {
  public state: State = {};

  render() {
    const { firstCard, secondCard, hero, villain } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div
          style={{
            backgroundColor: "lightgreen",
            textAlign: "center",
            marginRight: 20
          }}
        >
          <h1>First Card</h1>
          <p>{hero ? firstCard : "?"}</p>
        </div>
        <div
          style={{
            backgroundColor: "lightblue",
            textAlign: "center",
            marginRight: 20
          }}
        >
          <h1>Second Card</h1>
          <p>{hero ? secondCard : "?"}</p>
        </div>
      </div>
    );
  }
}
