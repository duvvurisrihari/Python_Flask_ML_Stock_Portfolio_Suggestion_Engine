import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home2 from "./components/Home/Home2";
import PortfolioGraphs from "./components/Graphs/PortfolioGraphs";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home2} />
          <Route path="/portfolioGraph" component={PortfolioGraphs} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
