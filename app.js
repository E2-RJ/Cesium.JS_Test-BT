// Your access token can be found at: https://cesium.com/ion/tokens.
// Replace `your_access_token` with your Cesium ion access token.
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzMyNjg5Zi00ZTI5LTRmYWEtOTE3Mi1kOTk3Y2RjYjY1YWEiLCJpZCI6NzQ1MjEsImlhdCI6MTYzNzgyMzU4N30.JFkVpFHpCeYuhC4KDr5_Or8PZArO_v8ed9nuP2j1xUU';

const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain()
});

// Add Cesium OSM Buildings, a global 3D buildings layer.

const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
