import React, { Suspense, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';
import LandingPage from './LandingPage';
import Footer from './Footer';
import ProtectedRoute from '../context/ProtectedRoute';
import NavBar from './NavBar';
import Home from './Home';
import Sidebar from './Sidebar';
import LikedVideos from './LikedVideos';
import YourVideos from './YourVideos';

import WatchPage from './WatchPage';
import Subscription from './Subscription';
import './App.css';

const { Content } = Layout;

const App = () => {
  const [state, setState] = useState({
    collapsed: true,
  });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <NavBar toggle={toggle} />
        <Layout>
          <Sidebar collapsed={state.collapsed} toggle={toggle}/>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content>
              <div
                style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}
              >
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <ProtectedRoute exact path="/home" component={Home} />
                  <ProtectedRoute
                    exact
                    path="/subscription"
                    component={Subscription}
                  />
                  <ProtectedRoute exact path="/liked" component={LikedVideos} />
                  <ProtectedRoute exact path="/yours" component={YourVideos} />

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
