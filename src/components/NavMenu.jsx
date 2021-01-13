import React from "react";
import { withRouter } from 'react-router-dom'

const DenseAppBar =(props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">TestApp</a>
        </nav>
    );
}

export default withRouter(DenseAppBar);
