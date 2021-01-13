import React from "react";
import NavMenu from "../components/NavMenu";

export default props => (
    <React.Fragment>
        <div className="container-fluid">
            <NavMenu />
            <div>{props.children}</div>
        </div>
    </React.Fragment>
);
