import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import Landing from './components/layout/Landing.js';
import Auth from './views/Auth';
import AuthContextsProvider from './contexts/AuthContexts';
import Dashboard from './views/Dashboard';

function App() {
  return (
  <AuthContextsProvider>
    <Router>
      <Switch>
        <Route exact path='/' component={Landing}/>
          <Route
            exact
            path='/login'
            render={props => <Auth {...props} authRoute='login' />} 
            />
          <Route
            exact
            path='/register'
            render={props => <Auth {...props} authRoute='register' />}
          />
          <Route exact path = '/dashboard' component ={Dashboard}/>
      </Switch>
    </Router>
  </AuthContextsProvider>
  )
}

export default App;
