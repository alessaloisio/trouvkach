import React, {useState, useEffect} from "react";

import Header from "../components/header";
import SideBar from "../components/sidebar";
import Map from "../components/map";

export default () => {
    const [mapData, setMapData] = useState(false);

    const [userPosition, setUserPosition] = useState({
        lat: 50.6593305,
        lng: 5.5995275,
    });

    const [position] = useState({
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
                setMapData(true);
            },
            () => {
                // (User denied Geolocation)
                setMapData(true);
            },
        );
    }, []);

    /**
     * Get terminals from where we are
     */

    const handleViewportChange = e => {
        console.log(e);
    };

    return (
        <React.Fragment>
            <Header />
            <div className={"content"}>
                <SideBar />
                {mapData ? (
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
