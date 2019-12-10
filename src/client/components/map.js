/* import L from "leaflet"; */
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

function Mapgeo() {
    const position = [50.638, 5.595];

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
                    <Popup>
                        {"A pretty CSS3 popup."}
                        <br />
                        {"Easily customizable."}
                    </Popup>
                </Marker>
            </Map>
        </div>
    );
}

export default Mapgeo;
