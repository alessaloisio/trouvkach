import React, {useState, useEffect} from "react";
// import axios from "axios";

import Header from "../components/header";
import SideBar from "../components/sidebar";
import Map from "../components/map";

export default () => {
    const [showMap, setShowMap] = useState(false);

    const [userPosition, setUserPosition] = useState({
        lat: 50.6593305,
        lng: 5.5995275,
    });

    const [position, setPosition] = useState({
        ...userPosition,
        zoom: 13,
    });

    /**
     * Try to get the user position
     */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                setUserPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setShowMap(true);
            },
            () => {
                // (User denied Geolocation)
                setShowMap(true);
            },
        );
    }, []);

    /**
     * Get terminals from where we are
     */
    const handleViewportChange = coords => {
        setPosition({
            lat: coords.center[0],
            lng: coords.center[1],
            zoom: coords.zoom,
        });
    };

    useEffect(() => {
        if (showMap) {
            console.log("get terminals from api");
        }
    }, [showMap, position]);

    return (
        <React.Fragment>
            <Header />
            <div className={"content"}>
                <SideBar />
                {showMap ? (
                    <Map
                        userPosition={userPosition}
                        position={position}
                        onViewportChange={handleViewportChange}
                    />
                ) : (
                    <React.Fragment />
                )}
            </div>
        </React.Fragment>
    );
};
