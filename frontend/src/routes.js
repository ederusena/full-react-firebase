import { Route, Switch } from 'react-router-dom';

import {
  Home,
  Login,
  Signup
} from './pages';

const Rotas = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </Switch>
);

export default Rotas;
