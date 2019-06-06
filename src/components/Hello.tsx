import * as React from "react";
import { CardGroup, OddsCalculator } from "poker-odds-calculator";

const player1Cards = CardGroup.fromString("JhJs");
const player2Cards = CardGroup.fromString("JdQd");
const board = CardGroup.fromString("7d9dTs");

const result = OddsCalculator.calculate([player1Cards, player2Cards], board);

console.log(`Player #1 - ${player1Cards} - ${result.equities[0].getEquity()}%`);
console.log(`Player #2 - ${player2Cards} - ${result.equities[1].getEquity()}%`);

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} AsdfsdfND {props.framework}!
  </h1>
);

export interface HelloPropsClass {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class HelloClass extends React.Component<HelloPropsClass, {}> {
  render() {
    return (
      <h1>
        Hello from {this.props.compiler} aaaaaa {this.props.framework}!
      </h1>
    );
  }
}
