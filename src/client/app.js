/* becodeorg/trouvkach
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import * as React from "react";
import ReactDOM from "react-dom";
import Localisation from "./components/geolocalisation";
/* ReactDOM.render(<HelloWorld />, document.querySelector("#app")); */
ReactDOM.render(
    <div>
        <Localisation />
    </div>,
    document.querySelector("#app"),
);
