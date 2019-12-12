import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeEurope} from "@fortawesome/free-solid-svg-icons";

import "../assets/banks";

export default props => {
    const {terminals, onViewportClick} = props;

    return (
        <div className={"sidebar"}>
            <h2>{"Terminals"}</h2>
            <ul className={"sidebar-list"}>
                {terminals.map(terminal => (
                    <li
                        className={"sidebar-item"}
                        key={terminal._id}
                        onClick={() =>
                            onViewportClick({
                                latlng: {
                                    lat: terminal.latitude,
                                    lng: terminal.longitude,
                                },
                            })
                        }
                        style={{
                            borderBottom: `4px solid #${
                                terminal.bank && terminal.bank.color
                                    ? terminal.bank.color
                                    : "eee"
                            }`,
                        }}>
                        <div className={"item-container"}>
                            <div className={"item-logo"}>
                                <img src={`/images/${terminal.bank.icon}`} />
                            </div>
                            <div className={"item-content"}>
                                <p className={"item-title"}>
                                    {terminal.bank.name}
                                </p>
                                <p className={"item-description"}>
                                    {terminal.address}
                                </p>
                            </div>
                            <div className={"item-actions"}>
                                <a href={terminal.bank.url}>
                                    <FontAwesomeIcon
                                        icon={faGlobeEurope}
                                        size={"lg"}
                                        color={"#333"}
                                    />
                                </a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
