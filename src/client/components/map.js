import React from "react";

// Leaflet
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/images/marker-shadow.png";

// https://react-leaflet.js.org/docs/en/components#mapcomponent

export default props => {
    const {userPosition, position, onViewportChange, terminals} = props;

    return (
        <Map
            className={"markercluster-map"}
            animate={true}
            minZoom={7}
            maxZoom={17}
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
            <MarkerClusterGroup>
                {terminals.map(value => (
                    <Marker
                        key={value._id}
                        position={[value.latitude, value.longitude]}
                    />
                ))}
            </MarkerClusterGroup>
        </Map>
    );
};
