import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default ({searchInput, handleSearchInput}) => (
    <div className={"search-box"}>
        <FontAwesomeIcon icon={faSearch} color={"#333"} />
        <input
            type={"text"}
            name={"autocomplete-search"}
            placeholder={"Search bank"}
            value={searchInput}
            onChange={e => handleSearchInput(e)}
        />
    </div>
);
