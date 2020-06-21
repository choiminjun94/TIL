import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Main from "./components/main";
import Result from "./components/result";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">
          <button>홈</button>
        </Link> 
        <Link to="/result">
          <button>결과</button>
        </Link>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/result" component={Result} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
