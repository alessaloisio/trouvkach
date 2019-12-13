/* import L from "leaflet"; */
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import React, {useEffect, useState} from "react";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

function Mapgeo() {
    const [place, setPlace] = useState({
        longitude: 0,
        latitude: 0,
    });

    useEffect(() => {
        navigator.geolocation.watchPosition(pos => {
            setPlace(pos.coords);
        });
    }, []);
    const position = [place.latitude, place.longitude];
    return (
        <div>
            <Map
                center={position}
                zoom={13}
                id={"map"}
                style={{height: "600px"}}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <Marker position={position}>
                    <Popup>{"Vous êtes ici."}</Popup>
                </Marker>
            </Map>
        </div>
    );
}

export default Mapgeo;
