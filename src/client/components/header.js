import React from "react";

import SearchBox from "./search-box";

export default ({searchInput, handleSearchInput}) => (
    <header>
        <h1>{"Trouvkach"}</h1>
        <SearchBox
            searchInput={searchInput}
            handleSearchInput={handleSearchInput}
        />
    </header>
);
