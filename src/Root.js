import { Route, Switch } from "react-router";
import App from "./components/App";
import Films from "./components/App/Films";

const Root = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/films/:id" component={Films} />
      </Switch>
    </div>
  );
};

export default Root;
