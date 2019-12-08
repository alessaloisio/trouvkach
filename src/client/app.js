/* becodeorg/trouvkach
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import * as React from "react";
import ReactDOM from "react-dom";

import "./scss/style.scss";

// If we need React Router
import MapPage from "./containers/map-interactive";

ReactDOM.render(<MapPage />, document.querySelector("#app"));
