import { Route, Switch } from "react-router";
import App from "./components/App";
import Films from "./components/App/Films";
import Residents from "./components/App/Residents";

const Root = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/planets/:id/films/" component={Films} />
        <Route exact path="/planets/:id/residents/" component={Residents} />
      </Switch>
    </div>
  );
};

export default Root;
