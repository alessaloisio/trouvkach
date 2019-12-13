# BeCode TrouvKach

Web application to illustrate all ATM's (Automated teller machine) on a map. 

## Technologies used on this project :

### Node.js and MongoDB, to create the Rest API

**Endpoints:**

- *Principal endpoint for the React App*
```
 /api/terminals/:latitude,:longitude,:zoom/:search*?
```
With this endpoint we can determine all ATM's around the user coordinates, 
the [zoom](https://wiki.openstreetmap.org/wiki/Zoom_levels) can be important for the performance, just return what the user can see on the map.

I used "[haversine formula](https://stackoverflow.com/a/365853)" to determine the distance between 2 coordinates, not good practices,
I had to use [$geoNear](https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/) but the structure of fields wasn't appropriate. For practice and to learn how works $aggregate,
I put the formula on it, I could also restructure the database but we are not looking for simplicity here :)

- *Get all banks*
```
 /api/banks
```
- *Get banks started with a search word*
```
 /api/banks/:search
```

### React.js and Webpack
I have a smart components with all logics handle, the others components just have to render visual elements.

At the beginning, I ask user to have his position to determine ATM's around him but by default, he is located in Liege (if permission is declined).

For the interaction of the map, I used Leaflet with MarkerCluster to group some ATM if they are located at the same position. For the sidebar when you click on a element, the terminal are automatically showed in the map. You can also filter results by banks name just by tapping the starting letters of your favourite bank on the search box.

### Create a new server MongoDB on a VPS
For the developpement i used Docker with the last MongoDB container (v4.2.2) and at the end when i had to deploy, everything worked but not my terminals endpoint because I use $sin/$cos on my aggregation and this operator was not compatible with free cluster on MongoDB Atlas because they use the version 4.0. I had to use an alternative so sorry for the slowness during the demo, my vps is not powerful.

