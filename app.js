// Access token, found at: https://cesium.com/ion/tokens.
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzMyNjg5Zi00ZTI5LTRmYWEtOTE3Mi1kOTk3Y2RjYjY1YWEiLCJpZCI6NzQ1MjEsImlhdCI6MTYzNzgyMzU4N30.JFkVpFHpCeYuhC4KDr5_Or8PZArO_v8ed9nuP2j1xUU';

const viewer = new Cesium.Viewer('cesiumContainer', {
    requestRenderMode: true, // Only render on request from entity, reduces CPU usage
    maximumRenderTimeChange: Infinity,
    terrainProvider: Cesium.createWorldTerrain()
});

const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings()); // Add Cesium OSM Buildings, a global 3D buildings layer.

var scene = viewer.scene;
scene.debugShowFramesPerSecond = false; // Shows FPS counter overlay, mainly for debugging purposes

// Clear scene and set default view.
var handler;
function resetScene() {
    viewer.trackedEntity = undefined;
    viewer.dataSources.removeAll();
    viewer.entities.removeAll();
    viewer.scene.primitives.remove(tileset);
    viewer.clock.shouldAnimate = false;
    handler = handler && handler.destroy();
    scene.skyBox.show = true;
    scene.camera.flyHome(0.0);
    scene.requestRender();
    viewModel.showTimeOptions = false;
    viewModel.timeChangeEnabled = false;
    viewModel.maximumRenderTimeChange = 0;
}
