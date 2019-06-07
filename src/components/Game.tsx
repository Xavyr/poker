import * as React from "react";
import { Pot } from "./Pot";
import { SingleHand } from "./SingleHand";
import { Board } from "./Board";
import { situations } from "../utils/pokerSituations";
import { calculateOdds } from "../utils/pokerCalculations";
import { generatePot, generateBet } from "../utils/pokerPot";

type Props = {};

type State = {
  situation: string;
  hero: Array<string>;
  villain: Array<string>;
  board: Array<string>;
  currHandOdds: {
    hero: number;
    villain: number;
  };
  pot: number;
  bet: number;
  trajectory: Array<number>;
};

export class Game extends React.Component<Props, State> {
  public state: State = {
    situation: situations[0],
    board: ["Tc", "9h", "Kd"],
    hero: ["Jc", "8s"],
    villain: ["Ac", "kh"],
    currHandOdds: {
      hero: 0,
      villain: 0
    },
    pot: 0,
    bet: 0,
    trajectory: []
  };

  generateNewHand = () => {
    //generate different states for situation, board, hand
    console.log("generating...");
    //use library to get results
    const handOddsAfterFlop = calculateOdds(
      this.state.hero,
      this.state.villain,
      this.state.board
    );
    const pot = generatePot();
    const bet = generateBet(pot);
    this.setState({ currHandOdds: handOddsAfterFlop, pot, bet });
  };

  call = () => {
    //XAVYR, do all the math here, pot odds and such-- perhaps show a perfect money line becasue the money can cahnge
    //so much so maybe need to see how i am different than ideal play
  };

  fold = () => {};

  render() {
    console.log("this.state", this.state);
    const { hero, villain, board, pot, bet } = this.state;

    //hero's hand
    const firstHeroCard = hero[0];
    const secondHeroCard = hero[1];

    //villain's hand
    const firstVillainCard = villain[0];
    const secondVillainCard = villain[1];

    //Three flop board cards
    const firstFlop = board[0];
    const secondFlop = board[1];
    const thirdFlop = board[2];

    return (
      <div>
        <button onClick={this.generateNewHand}>Generate New Hand</button>
        <div>
          <Pot moneyInPot={pot} bet={bet} />
        </div>
        <div>
          <div>
            <h3>Villain Hand</h3>
            <SingleHand
              villain
              firstCard={firstVillainCard}
              secondCard={secondVillainCard}
            />
          </div>
          <h3>The Board</h3>
          <Board
            firstFlop={firstFlop}
            secondFlop={secondFlop}
            thirdFlop={thirdFlop}
          />
        </div>
        <div>
          <h3>Hero Hand</h3>
          <SingleHand
            hero
            firstCard={firstHeroCard}
            secondCard={secondHeroCard}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 100 }}>
          <button onClick={this.call}>Call!</button>
          <button onClick={this.fold}>Fold</button>
        </div>
      </div>
    );
  }
}
