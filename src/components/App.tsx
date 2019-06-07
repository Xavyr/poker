import * as React from "react";
import { Game } from "./Game";

type AppProps = {
  compiler: string;
  framework: string;
};

export class App extends React.Component<AppProps, {}> {
  render() {
    return <Game />;
  }
}
