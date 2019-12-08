import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";

import Header from "../components/header";
import SideBar from "../components/sidebar";
import Map from "../components/map";

export default () => {
    const [waitPermission, setWaitPermission] = useState(false);
    const [mutexMapAnimation, setMutexMapAnimation] = useState(false);

    const [userPosition, setUserPosition] = useState({
        lat: 50.6326188,
        lng: 5.5854983,
    });

    // Center map position
    const [position, setPosition] = useState({
        ...userPosition,
        zoom: 16,
    });

    const [terminals, setterminals] = useState([]);

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

                setPosition(prev => ({
                    ...prev,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                }));

                setWaitPermission(true);
            },
            () => {
                // (User denied Geolocation)
                setWaitPermission(true);
            },
        );
    }, []);

    /**
     * Get terminals from where we are
     */
    const handleViewportChange = useCallback(
        coords => {
            if (!mutexMapAnimation) {
                setPosition({
                    lat: coords.center[0],
                    lng: coords.center[1],
                    zoom: coords.zoom,
                });
            }
        },
        [position, mutexMapAnimation],
    );

    useEffect(() => {
        if (waitPermission) {
            axios
                .get(
                    `/api/terminals/${position.lat},${position.lng},${position.zoom}`,
                )
                .then(response => {
                    if (response.status === 200) {
                        const res = response.data;
                        setterminals(res.data);
                    }
                });
        }
    }, [waitPermission, position]);

    /**
     * Map interaction
     */

    const delayMapAnimation = (time = 1000) => {
        if (!mutexMapAnimation) {
            setTimeout(() => {
                setMutexMapAnimation(false);
            }, time);
        }
    };

    const handleViewportClick = useCallback(
        coords => {
            if (!mutexMapAnimation) {
                setMutexMapAnimation(true);
                delayMapAnimation(500);
                setPosition(prev => ({
                    ...prev,
                    lat: coords.latlng.lat,
                    lng: coords.latlng.lng,
                }));
            }
        },
        [position, mutexMapAnimation],
    );

    return (
        <React.Fragment>
            <Header terminals={terminals} />
            <div className={"content"}>
                <SideBar terminals={terminals} />
                {waitPermission ? (
                    <Map
                        userPosition={userPosition}
                        position={position}
                        onViewportChange={handleViewportChange}
                        terminals={terminals}
                        onViewportClick={handleViewportClick}
                    />
                ) : (
                    <React.Fragment />
                )}
            </div>
        </React.Fragment>
    );
};
