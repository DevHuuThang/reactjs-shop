import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Container from 'react-bootstrap/Container';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Error from './pages/Error';
import Header from './components/Header';
import rootReducer from './store/reducers';

import './index.css';
import './fakebackend/axiosData';

const Root = () => {
  //
  const initialState = {};

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
        compose,
    ),
  );
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Container className="margin-top">
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/products" exact component={Products} />
            <Route
              path="/product-details/:id"
              exact
              component={ProductDetails}
            />
            <Route path="/error" component={Error} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Redirect to="/error" />
          </Switch>
        </Container>
      </Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
