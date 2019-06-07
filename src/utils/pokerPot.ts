export const generatePot = () =>
  [10, 50, 100, 1000][Math.floor(Math.random() * 4)];

export const generateBet = (currPot: number) =>
  currPot * [0.25, 0.5, 0.75, 0.1][Math.floor(Math.random() * 4)];
