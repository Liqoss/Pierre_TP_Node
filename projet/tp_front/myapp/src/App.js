import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Header from './Headers/Header';
import Dashboard from './Dashboard/Dashboard';
import HeaderHome from './Headers/HeaderHome';
import Add from './Add/Add';
import Article from './Dashboard/Article';

function App() {

  return (
    <Router>
      <>
        <Switch>
          <Route path='/' exact component={Header} />
          <Route path='/Login' exact component={Header} />
          <Route path='/Add' component={HeaderHome} />
          <Route path='/Dashboard' exact component={HeaderHome} />
          <Route path='/Article' component={HeaderHome} />
        </Switch>
      </>

      <main className='divLoginSignup'>
        <Switch>
          <Route path='/' exact component={Signup} />
          <Route path='/Login' exact component={Login} />
          <Route path='/Dashboard' exact component={Dashboard} />
          <Route path='/Add' exact component={Add} />
          <Route path='/Article' component={Article} />
        </Switch>
      </main>

      <footer><p>TP Node.js</p></footer>
    </Router>
  );
}

export default App;
