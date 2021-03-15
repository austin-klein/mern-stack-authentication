import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/routing/PrivateRoute';

import Private from './components/screens/Private';
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import ForgotPassword from './components/screens/ForgotPassword';
import ResetPassword from './components/screens/ResetPassword.js';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Switch>
          <PrivateRoute exact path='/' component={Private} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
          <Route exact path='/passwordreset:resetToken' component={ResetPassword} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
