// Access token, found at: https://cesium.com/ion/tokens.
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzMyNjg5Zi00ZTI5LTRmYWEtOTE3Mi1kOTk3Y2RjYjY1YWEiLCJpZCI6NzQ1MjEsImlhdCI6MTYzNzgyMzU4N30.JFkVpFHpCeYuhC4KDr5_Or8PZArO_v8ed9nuP2j1xUU';

const viewer = new Cesium.Viewer('cesiumContainer', {
    /*imageryProvider : new Cesium.TileMapServiceImageryProvider({url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')}),*/ //Inbuilt Low res baselayer
    imageryProvider: new Cesium.UrlTemplateImageryProvider({ // Access the CartoDB Positron basemap, which uses an OpenStreetMap-like tiling scheme.
        url: 'https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png',
        credit: 'Copyright (c) 2014, Stamen Design <info@stamen.com>'
    }),
    requestRenderMode: true, // Only render on request from entity, reduces CPU usage
    maximumRenderTimeChange: Infinity, //Time in with a new frame is requested, depending on simulation time changes. (Set to a high value, such as Infinity, if no elements in your scene change with simulation time)
    terrainProvider: Cesium.createWorldTerrain(), //Add terrain height
    geocoder: true, //Show location search
    baseLayerPicker: false, //Show base layer picker
    sceneModePicker: false, //Show scene mode picker
    animation: false, //Disable animation controls
    timeline: false, //Show Timeline
    shouldAnimate: true, // Animation on by default
    clock: true,
    canAnimate: true,
    navigationHelpButton: false,
    scene3DOnly: true
});




var scene = viewer.scene;

scene.globe.depthTestAgainstTerrain = false; // Enable depth testing so things behind the terrain disappear.
scene.globe.enableLighting = false; // Enable lighting based on sun/moon positions
//const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings()); // Add Cesium OSM Buildings, a global 3D buildings layer.

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

// Set the initial view
scene.camera.setView(homeCameraView);

// Create an initial camera view
var initialPosition = new Cesium.Cartesian3.fromDegrees(-2.959, 53.369, 1700.082);
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(-3.7, -37.9, 0.0);
var homeCameraView = {
    destination: initialPosition,
    orientation: {
        heading: initialOrientation.heading,
        pitch: initialOrientation.pitch,
        roll: initialOrientation.roll
    }
};

// Add some camera flight animation options
homeCameraView.duration = 2.0;
homeCameraView.maximumHeight = 2000;
homeCameraView.pitchAdjustHeight = 2000;
homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;

// Override the default home button
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;
    viewer.scene.camera.flyTo(homeCameraView);
});

var Point01 = viewer.entities.add({
    name: "Point01",
    description: "Example of a selectable point",
    position: Cesium.Cartesian3.fromDegrees(-2.957483, 53.395154, 120),
    point: {
        pixelSize: 12,
        color: Cesium.Color.DEEPSKYBLUE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 1,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    label: {
        text: 'Example Point',
        font: '10pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -9)
    }
});

var Point01 = viewer.entities.add({
    name: "Point02",
    description: "Example of a selectable point",
    position: Cesium.Cartesian3.fromDegrees(-2.969162, 53.393156, 120),
    point: {
        pixelSize: 12,
        color: Cesium.Color.DEEPSKYBLUE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 1,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    label: {
        text: 'Example Point',
        font: '10pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -9)
    }
});

viewer.selectedEntityChanged.addEventListener(function (selectedEntity) { //Listens for picked entity
    if (Cesium.defined(selectedEntity)) {
        switch (selectedEntity.name) {
            case "Point01": //Potential value returned from selectedEntity
                console.log("Selected " + selectedEntity.name)
                break; //Stops execution

            case "Point02": //Potential value returned from selectedEntity
                console.log("This is an " + selectedEntity.description)
                break; //Stops execution

        }
    }
    else {
        console.log('Deselected.');
    }
});