import React from "react";

// Leaflet
import L from "leaflet";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/images/marker-shadow.png";

export default props => {
    const {
        userPosition,
        position,
        onViewportChange,
        terminals,
        onViewportClick,
    } = props;

    const createCustomIcon = color =>
        new L.divIcon({
            html: `<span style="background-color: #${color};"></span>`,
            className: "marker-custom",
            iconSize: L.point(30, 30, true),
        });

    const createClusterCustomIcon = cluster =>
        L.divIcon({
            html: `<span>${cluster.getChildCount()}</span>`,
            className: "marker-cluster-custom",
            iconSize: L.point(40, 40, true),
        });

    return (
        <Map
            className={"markercluster-map"}
            onClick={onViewportClick}
            animate={true}
            minZoom={7}
            maxZoom={16}
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
            <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
                {terminals.map(value => (
                    <Marker
                        onClick={onViewportClick}
                        key={value._id}
                        position={[value.latitude, value.longitude]}
                        icon={createCustomIcon(
                            value.bank && value.bank.color
                                ? value.bank.color
                                : "f0ffdd",
                        )}
                    />
                ))}
            </MarkerClusterGroup>
        </Map>
    );
};
