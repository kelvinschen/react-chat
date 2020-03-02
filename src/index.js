import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'
import store from './redux/store'


const d =
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/register"><Register /></Route>
                <Route path="/login"><Login /></Route>
                <Route ><Main /></Route>
                {/* Main as default route */}
            </Switch>
        </Router>

    </Provider>

ReactDOM.render(d, document.getElementById('root'));

