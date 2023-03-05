//Function to sleep for a given amount of milliseconds
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

//Function to load a declared webpage (can be an external link), with a fancy zoom in effect to a given location (might be optional)
function newProject(videoSource, Longitude, Latitude, Altitude, projectName, timeFrame, projectAuthor, paragraph, mediaFormat, mediaColour, mediaLength, projectcoords, projectlocation,extField1,extField2,extField3) {

    viewer.camera.flyTo({ //Flys camera to given co-ordinates
      destination: Cesium.Cartesian3.fromDegrees(Longitude, Latitude, Altitude),
    });
  
    w3.show('#back')
  
    async function loadResource() { //Waits four seconds before opening given link (modifier allows to change how link is opened, e.g. '_self' will open in parent window)
      for (let i = 0; i < 1; i++) {
        await sleep(4000);
  
        checkMenu()
        videoChange('video', videoSource); // Change video
        w3.show('#video')
        fieldChange(projectName, timeFrame, projectAuthor, paragraph, mediaFormat, mediaColour, mediaLength, projectcoords, projectlocation,extField1,extField2,extField3)
      }
    }
  
    loadResource()
  }
  
  function videoChange(id, videoSource) {
    document.getElementById(id).src = videoSource; //Updates video element
    document.getElementById(id).load;
  }
  
  function videoRemove() {
  
    document.getElementById('video').src = '';
    document.getElementById('video').load;
  
  }
  
  function fieldChange(projectName, timeFrame, projectAuthor, paragraph, mediaFormat, mediaColour, mediaLength, projectcoords, projectlocation,extField1,extField2,extField3) {
    document.getElementById("projectName").innerHTML = projectName; // Change project name
    document.getElementById("timeFrame").innerHTML = timeFrame; // Change time frame
    document.getElementById("author").innerHTML = projectAuthor; // Change author
    document.getElementById("paragraph").innerHTML = paragraph; // Change paragraph
    document.getElementById("format").innerHTML = mediaFormat; // Change format
    document.getElementById("colour").innerHTML = mediaColour; // Change colour
    document.getElementById("length").innerHTML = mediaLength; // Change length
    document.getElementById("co-ords").innerHTML = projectcoords; // Change co-ords
    document.getElementById("location").innerHTML = projectlocation; // Change location
    document.getElementById("extField1").innerHTML = extField1; // Change extra field
    document.getElementById("extField2").innerHTML = extField2; // Change extra field
    document.getElementById("extField3").innerHTML = extField3; // Change extra field


  }
  
  function deselectInfoBox() {
    // https://cesium.com/docs/cesiumjs-ref-doc/InfoBoxViewModel.html#showInfo
    viewer.selectedEntity = undefined;
  };
  
  function menuClick() {
    document.getElementById("leftCollapsible").click();
  }
  
  function checkMenu() {

    if (menuOpen) {
      menuClick();
    }
  }