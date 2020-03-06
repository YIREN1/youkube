import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';
import LandingPage from './LandingPage';
import About from './About';
import Footer from './Footer';
import ProtectedRoute from '../context/ProtectedRoute';
import NavBar from './NavBar';
import Home from './Home';
import Sidebar from './Sidebar';

import WatchPage from './WatchPage';
import Subscription from './Subscription';
import './App.css';

const { Content } = Layout;

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <NavBar />
        <Layout>
          <Sidebar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content>
              <div
                style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}
              >
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <ProtectedRoute exact path="/about" component={About} />
                  <ProtectedRoute exact path="/home" component={Home} />
                  <ProtectedRoute
                    exact
                    path="/subscription"
                    component={Subscription}
                  />

                  <Route exact path="/watch/:videoId" component={WatchPage} />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
        <Footer />
      </Layout>
    </Suspense>
  );
};

export default App;
