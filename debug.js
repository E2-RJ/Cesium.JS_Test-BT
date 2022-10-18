/*
const scene = viewer.scene;
if (!scene.pickPositionSupported) {
  window.alert("This browser does not support pickPosition.");
}

let handler;
*/

var showCoords = false;

let keysPressed = {};

document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true;

  if (keysPressed['Alt'] && event.key == 'c') {
    showCoords = !showCoords;
    console.log('Showing co-ordinate picker');
  }
});

document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];
});

document.addEventListener( //Everytime the mouse is moved, run the following
  "mousemove",
  function () {

      scene.requestRender(); //Request the scene be rerendered

      const coordPicker = viewer.entities.add({ //Add text box next to pointer
        label: {
          show: false,
          showBackground: true,
          font: "14px monospace",
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: Cesium.VerticalOrigin.TOP,
          pixelOffset: new Cesium.Cartesian2(15, 0),
        },
      });

      handler = new Cesium.ScreenSpaceEventHandler(scene.canvas); //Mouse over the globe to see the cartographic position
      handler.setInputAction(function (movement) {
        const cartesian = viewer.camera.pickEllipsoid(
          movement.endPosition,
          scene.globe.ellipsoid
        );
        if (cartesian) {
          const cartographic = Cesium.Cartographic.fromCartesian(
            cartesian
          );
          const longitudeString = Cesium.Math.toDegrees(
            cartographic.longitude
          ).toFixed(8);
          const latitudeString = Cesium.Math.toDegrees(
            cartographic.latitude
          ).toFixed(8);

          coordPicker.position = cartesian;
          coordPicker.label.show = true;
          coordPicker.label.text = //Update Label
            `Lon: ${`   ${longitudeString}`.slice(-13)}\u00B0` +
            `\nLat: ${`   ${latitudeString}`.slice(-13)}\u00B0`;
        } else {
          coordPicker.label.show = false;
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
);

function remove () {
  viewer.entities.removeAll();
  handler = handler && handler.destroy();
};
