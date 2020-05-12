import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import PortfolioGraphs from "./components/Graphs/PortfolioGraphs";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/portfolioGraph" component={PortfolioGraphs} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
