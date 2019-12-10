/* import L from "leaflet"; */
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import React from "react";

function Mapgeo() {
    const position = [50.638, 5.595];

    return (
        <div>
            <Map center={position} zoom={13} id={"map"}>
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
