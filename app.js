// Access token, found at: https://cesium.com/ion/tokens.
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzMyNjg5Zi00ZTI5LTRmYWEtOTE3Mi1kOTk3Y2RjYjY1YWEiLCJpZCI6NzQ1MjEsImlhdCI6MTYzNzgyMzU4N30.JFkVpFHpCeYuhC4KDr5_Or8PZArO_v8ed9nuP2j1xUU';

var menuOpen = false;
w3.show('#leftMenu')

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

//clampgeojson to ground so it can be viewed with terrain
Cesium.GeoJsonDataSource.clampToGround = true;

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
    homeView()
});

// Set the initial view
function homeView() {
    checkMenu()
    fieldChange( //Updates video and metadata elements, can be found in functions.js
        "Test-BT", //Project name
        "Time Frame: 2023-", //Project Time Frame
        "e2", //Author
        "Webapp Description: TBD", //Project description
        "", //Media format
        "", //Media colour
        "", //Media Length
        "", //Project Co-ords
        "Location: Liverpool" //Project Location
    )
    w3.hide('#video')
    document.getElementById("video").pause();
    w3.hide('#back')
    viewer.scene.camera.flyTo(homeCameraView);
}

homeView()


var coll = document.getElementsByClassName("collapsible");
var i;

//Collapses leftMenu
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        menuOpen = !menuOpen;
        var content = this.nextElementSibling;
        var elements = (document.getElementById("leftMenu").offsetHeight + document.getElementById("back").offsetHeight);
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = (window.innerHeight - elements) + "px";
        }
    });
}

var GranbyStreet = viewer.entities.add({
    name: 'ecosystem2',
    position: Cesium.Cartesian3.fromDegrees(-2.957483, 53.395154, 120),
    point: {
        pixelSize: 25,
        color: Cesium.Color.DEEPSKYBLUE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    label: {
        text: 'Click Me',
        font: '15pt bold Roboto',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 6,
        outlineColor: Cesium.Color.DEEPSKYBLUE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -9)
    }
});

viewer.selectedEntityChanged.addEventListener(function (selectedEntity) { //Listens for picked entity
    if (Cesium.defined(selectedEntity)) {
        switch (selectedEntity.name) {

            case "ecosystem2": //Potential value returned from selectedEntity
                newProject( //Updates video and metadata elements, can be found in functions.js
                    '/Media/ResilienceGardenTrailer.mp4', //Media Location
                    -2.957483, 53.395154, 190, //New camera position
                    "Name: TBD ", //Project name
                    "Project: e2", //Project Time Frame
                    "Location: Lat/long ", //Author
                    "Pinned photos: 3 thumbnail images of locations", //Project description
                    "Time activated: ISO8601", //Media format
                    "Project description: STRING", //Media colour
                    "# entries: INTEGER", //Media Length
                    "Tags: a collection of hashtags to order content", //Project Co-ords
                    "Collections: this is separate collections <br><br> links that open information such as pictures that the user orders and posts to their profile", //Project Location
                    "Total cache: reveals the total number of entries as czml points", //Project Co-ords
                    "Key:value" //Project Co-ords
                )
                break; //Stops execution

        }
    }
    else {
        console.log('Deselected.');
    }
});