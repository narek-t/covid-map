import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import DataProvider from 'providers/data';
import { HomePage } from 'pages';
import Header from 'components/Header';
import './App.scss';


const routes = (
  <Switch>
    <Route path="/" exact>
      <HomePage />
    </Route>
    <Route path="/page1">
      Page 1
    </Route>
    <Redirect to="/" />
  </Switch>
);

const App = () => (
  <DataProvider>
    <Router>
      <div className="app-wrapper">
        <Header />
        <main className="content">{routes}</main>
      </div>
    </Router>
  </DataProvider>
);

export default App;
