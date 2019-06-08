export const generatePot = () => [1000][Math.floor(Math.random() * 1)];

export const generateBet = (currPot: number) =>
  currPot * [0.25, 0.5, 0.75, 0.1][Math.floor(Math.random() * 4)];
