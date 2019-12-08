import React from "react";

// Leaflet
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";

// https://react-leaflet.js.org/docs/en/components#mapcomponent

export default props => {
    const {userPosition, position, onViewportChange} = props;

    return (
        <Map
            center={position}
            zoom={position.zoom}
            onViewportChange={onViewportChange}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
            <Marker position={userPosition}>
                <Popup>{"Your position"}</Popup>
            </Marker>
        </Map>
    );
};
