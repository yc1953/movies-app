import './App.css';
import Movies from './Components/Movies';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Nav from './Components/Nav';

function App() {
  return (
    <Router>
      <Nav></Nav>
      <Switch>
        <Route path='/' exact component={Home}></Route>
        <Route path='/about' render={(props) => {
          return (<About {...props} isAuth={true} />);
        }}></Route>
        <Route path='/movies' component={Movies}></Route>
      </Switch>
    </Router>
  );
}

export default App;
