import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./Home";
import fetch from 'node-fetch';


class Main extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>

        );
    }
}

export default Main;