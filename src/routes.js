import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/detail" exact component={Detail} />
    </Switch>
  );
}
