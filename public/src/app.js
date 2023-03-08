//BACKEND REQUESTS

var url = 'http://0.0.0.0:8004/siteVisit'; // Url for the request 

fetch(url, { method: 'GET' }).then(function () { console.log("Site Loaded"); }).catch(errorMsg => { console.log(errorMsg); }); // Making our request 




//CESIUM

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzMyNjg5Zi00ZTI5LTRmYWEtOTE3Mi1kOTk3Y2RjYjY1YWEiLCJpZCI6NzQ1MjEsImlhdCI6MTYzNzgyMzU4N30.JFkVpFHpCeYuhC4KDr5_Or8PZArO_v8ed9nuP2j1xUU'; // Access token, found at: https://cesium.com/ion/tokens.

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
    scene3DOnly: true,
    infoBox: false
});

var scene = viewer.scene;

scene.globe.depthTestAgainstTerrain = false; // Enable depth testing so things behind the terrain disappear.
scene.globe.enableLighting = false; // Enable lighting based on sun/moon positions
//const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings()); // Add Cesium OSM Buildings, a global 3D buildings layer.

scene.debugShowFramesPerSecond = false; // Shows FPS counter overlay, mainly for debugging purposes

Cesium.GeoJsonDataSource.clampToGround = true; //clampgeojson to ground so it can be viewed with terrain

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
var initialPosition = new Cesium.Cartesian3.fromDegrees(-3.0218179, 53.4276631, 2500);
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(2, -37.9, 0.0);
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
    pointSelected = false;
    slideToggle()
    fieldChange( //Updates image and metadata elements, can be found in functions.js

    "Test-BT", //Project name
    "", //Project short decription
    "Location: Liverpool", //Project location
    "Time Frame: 2023-", //Time activated
    "Webapp Description: TBD", //Project description
    "", //NUmber of entries
    "", //Project Tags
    "", //Project collections
    "", //Number of map points
    "" //Key value
    )
    w3.hide('#image')
    w3.hide('#back')
    viewer.scene.camera.flyTo(homeCameraView);
}

homeView()



//SIDE MENU

var menuOpen = false;
var pointSelected = false;

w3.show('#leftMenu')

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



// CESIUM POINTS & EVENTS

var GranbyStreet = viewer.entities.add({
    name: 'ecosystem2',
    position: Cesium.Cartesian3.fromDegrees(-3.0228179, 53.4576631, 120),
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
                newProject( //Updates image and metadata elements, can be found in functions.js
                -3.0228179, 53.4576631, 190, //New camera position
                    './Media/Adam2.jpg', //Media Location
                    './Media/BTLiverpool-01.jpg',
                    './Media/BTLiverpool-06.jpg',
                    './Media/BTLiverpool-11.jpg',
                    "Name: Ecosystem 2 ", //Project name
                    "Project: Interface for Land Based Projects", //Project short decription
                    "Location: Latitude/Longitude ", //Project location
                    "Time activated: ISO8601", //Time activated
                    "Project description: STRING", //Project description
                    "# entries: INTEGER", //NUmber of entries
                    "Tags: a collection of hashtags to order content", //Project Tags
                    "Collections: this is a set of user managed links which describe areas of activity through media - text, images, film <br><br> example collections: SOWINGS - BLOOMS - HARVEST - COMMUNITY - SPECIES - SOIL", //Project collections
                    "Total cache: reveals the total number of entries as map points", //Number of map points
                    "Key:value" //Key value
                )
                break; //Stops execution

        }
    }
    else {
        console.log('Deselected.');
    }
});