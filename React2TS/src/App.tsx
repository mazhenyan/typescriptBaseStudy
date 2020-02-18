import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import loginPage from './pages/Login/index';
import homePage from './pages/Home/index';

export default () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path='/' exact component={homePage} />
          <Route path='/login' exact component={loginPage} />
        </Switch>
      </HashRouter>
    </div>
  );
};
