import * as React from 'react';
import './App.css';
import './Glyphicons.css'
import { Provider } from 'react-redux'
import store from './store'
import {
  Route,
  // withRouter,
  BrowserRouter as Router
} from "react-router-dom";


import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  Contact,
  Home,
  Settings,
  Timeline
} from './pages'

import Footer from './components/Footer';
import Navigation from './components/Navigation'

class Layout extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="headerArea">
          <Navigation />
        </div>
        <div className="mainArea" style={{ marginTop: -5}}>
          <Route exact path='/' component={Home} />
          <Route path='/settings' component={Settings} />
          <Route path='/timeline' component={Timeline} />
          <Route path='/contact' component={Contact} />
        </div>
        <div className='footerArea'>
        <Footer />
        </div>
      </div>
    );
  }
}

// const LayoutWithRouter = withRouter(Layout);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout/>
        </Router>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
