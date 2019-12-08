import React from "react";

import Header from "../components/header";
import SideBar from "../components/sidebar";
import Map from "../components/map";

export default () => (
    <React.Fragment>
        <Header />
        <div className={"content"}>
            <SideBar />
            <Map />
        </div>
    </React.Fragment>
);
