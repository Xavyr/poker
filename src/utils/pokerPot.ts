export const generatePot = () => [200][Math.floor(Math.random() * 1)];

export const generateBet = (currPot: number) =>
  currPot *
  [0.1, 0.15, 0.25, 0.33, 0.4, 0.5, 0.6, 0.75][Math.floor(Math.random() * 8)];
