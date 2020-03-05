import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage';
import About from './About';
import Footer from './Footer';
import ProtectedRoute from '../context/ProtectedRoute';
import NavBar from './NavBar/NavBar';
import Home from './Home';
import WatchPage from './WatchPage';
import Subscription from './Subscription';
import './App.css';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute exact path="/about" component={About} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/subscription" component={Subscription} />

          <Route exact path="/watch/:videoId" component={WatchPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
};

export default App;
