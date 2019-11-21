import React from 'react';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MoviesList from './movies/movies-list';

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <ul>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
        </ul>
      </header>
      <div>
        <Switch>
          <Route path="/movies">
            <MoviesList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
