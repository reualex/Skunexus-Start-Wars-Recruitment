import { Route, Switch } from "react-router";
import App from "./components/App";

const Root = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </div>
  );
};

export default Root;
