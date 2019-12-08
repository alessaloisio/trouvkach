import React from "react";

export default props => {
    const {terminals} = props;

    return (
        <div className={"sidebar"}>
            <h1>{"Terminals"}</h1>
            <ul className={"sidebar-list"}>
                {terminals.map(terminal => (
                    <li key={terminal._id}>{terminal.bank.name}</li>
                ))}
            </ul>
        </div>
    );
};
