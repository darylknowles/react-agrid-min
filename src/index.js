import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "./containers/Layout";

import Dashboard from "./containers/Dashboard";

import axios from "axios";

//Bootstrap 4 & dependencies
import "jquery/dist/jquery.slim";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

//local style sheet
import "./index.css";

const AppContext = React.createContext();

class AppProvider extends Component {
    state = {
        properties: [],
        loadPropertyData: callback => {
            if (this.state.properties.length === 0) {
                axios
                    .get("data/propertydata.json")
                    .then(response => {
                        this.setState(
                            {
                                properties: response.data
                            },
                            () => {
                                callback(this.state.properties);
                            }
                        );
                    })
                    .catch(function(error) {
                        alert("Error " + error);
                    });
            } else {
                callback(this.state.properties);
            }
        }
    };
    render() {
        return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
    }
}

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
    <AppProvider>
        <AppContext.Consumer>
            {context => (
                <BrowserRouter basename={baseUrl}>
                    <Layout>
                        <Route exact path="/" render={() => <Dashboard {...context} />} />
                    </Layout>
                </BrowserRouter>
            )}
        </AppContext.Consumer>
    </AppProvider>,
    rootElement
);
