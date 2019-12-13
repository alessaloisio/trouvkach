/* import React, {useEffect, useState} from "react";
import Axios from "axios";

//usestate créé une variable et apres on peut la modifier avec le deuxieme e du tableau

function RenderTerminals() {
    const [terminaux, setTerminaux] = useState({});

    useEffect(() => {
        Axios.get(`/api/terminals/`).then(res => {
            const results = res.data;
            setTerminaux(results.data);
        });
    }, []);

    return (
        <ul>
            {terminaux.map(el => (
                <li>{el.adress}</li>
                <li>{terminaux.name}</li>
            ))}
        </ul>
    );
}

export default RenderTerminals;
 */
