import * as React from "react";
import { MoneyLine } from "./MoneyLine";
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
  decisions?: Array<{
    equityEarnedOrLost: number;
    heroPercentage: number;
    potOdds: number;
    cards: {
      hero: Array<string>;
      villain: Array<string>;
      board: Array<string>;
    };
    correct: boolean;
  }>;
  lastDecisionCorrect?: boolean;
  moneyLine: number;
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
    decisions: null,
    lastDecisionCorrect: false,
    moneyLine: 0
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

  determinePotOdds = () => {
    const { bet, pot } = this.state;
    return Math.floor((bet / (pot + bet)) * 100);
  };

  proffitable = (action: string) => {
    const { currHandOdds, pot, bet } = this.state;
    return action === "call"
      ? ((currHandOdds.hero - this.determinePotOdds()) / 100) * (pot + bet) >= 0
      : ((currHandOdds.hero - this.determinePotOdds()) / 100) * (pot + bet) <=
          0;
  };

  calculateGainedOrLostEquity = (correct: boolean) => {
    const { currHandOdds, pot, bet } = this.state;
    const potOdds = this.determinePotOdds();
    console.log(potOdds, currHandOdds, correct);
    const netOutput = ((currHandOdds.hero - potOdds) / 100) * (pot + bet);

    if (correct && netOutput <= 0) {
      return netOutput * -1;
    }

    if (!correct && netOutput >= 0) {
      return netOutput * -1;
    }

    return netOutput;
  };

  updateMoneyLine = (correct: boolean) => {
    const { moneyLine } = this.state;
    return moneyLine + this.calculateGainedOrLostEquity(correct);
  };

  callOrFold = (action: string) => {
    const { bet, pot, currHandOdds } = this.state;
    const potOdds = this.determinePotOdds();
    const lastDecisionCorrect = this.proffitable(action);
    const updatedMoneyLine = this.updateMoneyLine(lastDecisionCorrect);

    const singleDecision = {
      equityEarnedOrLost: this.calculateGainedOrLostEquity(lastDecisionCorrect),
      heroPercentage: currHandOdds.hero,
      potOdds,
      bet,
      pot,
      cards: {
        hero: this.state.hero,
        villain: this.state.villain,
        board: this.state.board
      },
      correct: lastDecisionCorrect
    };
    const allDecisions = this.state.decisions ? this.state.decisions : [];
    allDecisions.push(singleDecision);
    this.setState({
      decisions: allDecisions,
      lastDecisionCorrect,
      moneyLine: updatedMoneyLine
    });

    //Start New Hand
    this.generateNewHand();
  };

  render() {
    console.log("this.state", this.state);
    const { moneyLine, hero, villain, board, pot, bet, decisions } = this.state;

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
        <MoneyLine moneyLine={moneyLine} decisions={decisions} />
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
          <button onClick={() => this.callOrFold("call")}>Call!</button>
          <button onClick={() => this.callOrFold("fold")}>Fold</button>
        </div>
      </div>
    );
  }
}
