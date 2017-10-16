import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Scene, Router, Tabs } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import NewStory from './components/NewStory';
import Profile from './components/Profile';
import SearchStoryModal from './components/SearchStoryModal';
import { HomeIcon, StoryIcon, ProfileIcon } from './components/icons/Icons';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="modal">
        <Scene key="root" hideNavBar>
          <Scene key="auth">
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="signup" component={SignUp} hideNavBar />
          </Scene>
          <Scene key="main" hideNavBar>
            <Tabs
              key="tabBar"
              activeTintColor="black"
              tabStyle={{
                paddingTop: Platform.OS === 'android'
                ? StatusBar.currentHeight : 0,
                backgroundColor: 'white' }}
              labelStyle={{ fontSize: 9, fontFamily: 'Avenir' }}
              swipeEnabled={false}
              hideNavBar
            >
              <Scene key="HOME" component={Home} icon={HomeIcon} hideNavBar />
              <Scene key="NEW STORY" component={NewStory} icon={StoryIcon} hideNavBar />
              <Scene key="PROFILE" component={Profile} icon={ProfileIcon} hideNavBar />
            </Tabs>
          </Scene>
        </Scene>
        <Scene key="newStoryModal" direction="vertical" component={NewStory} hideNavBar />
        <Scene key="searchStory" direction="vertical" component={SearchStoryModal} hideNavBar />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
