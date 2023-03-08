//Function to sleep for a given amount of milliseconds
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//Function to load a declared webpage (can be an external link), with a fancy zoom in effect to a given location (might be optional)
function newProject(Longitude, Latitude, Altitude, imageSource, slideSource0, slideSource1, slideSource2, projectName, shortDescription, projectLocation, timeActivated, projectDescription, entryNumber, projectTags, projectCollections, projectCache, projectKeyValue) {

  pointSelected = true;

  viewer.camera.flyTo({ //Flys camera to given co-ordinates
    destination: Cesium.Cartesian3.fromDegrees(Longitude, Latitude, Altitude),
  });

  w3.show('#back')

  async function loadResource() { //Waits four seconds before opening given link (modifier allows to change how link is opened, e.g. '_self' will open in parent window)
    for (let i = 0; i < 1; i++) {
      await sleep(4000);

      checkMenu()
      imageChange('image', imageSource); // Change image
      imageChange('slide0', slideSource0); // Change slide0
      imageChange('slide1', slideSource1); // Change slide1
      imageChange('slide2', slideSource2); // Change slide2
      w3.show('#image')
      fieldChange(projectName, shortDescription, projectLocation, timeActivated, projectDescription, entryNumber, projectTags, projectCollections, projectCache, projectKeyValue)
      slideToggle()
    }
  }

  loadResource()
}

function imageChange(id, imageSource) {
  document.getElementById(id).src = imageSource; //Updates image element
  document.getElementById(id).load;
}

function imageRemove() {

  document.getElementById('image').src = '';
  document.getElementById('image').load;

}

function fieldChange(projectName, shortDescription, projectLocation, timeActivated, projectDescription, entryNumber, projectTags, projectCollections, projectCache, projectKeyValue) {
  document.getElementById("projectName").innerHTML = projectName; // Change project name
  document.getElementById("shortDesc").innerHTML = shortDescription; // Change time frame
  document.getElementById("location").innerHTML = projectLocation; // Change location
  document.getElementById("timeActivated").innerHTML = timeActivated; // Change timeActivated
  document.getElementById("description").innerHTML = projectDescription; // Change description
  document.getElementById("entires").innerHTML = entryNumber; // Change number of entries
  document.getElementById("tags").innerHTML = projectTags; // Change tags
  document.getElementById("collections").innerHTML = projectCollections; // Change collections
  document.getElementById("cache").innerHTML = projectCache; // Change total cache
  document.getElementById("keyValue").innerHTML = projectKeyValue; // Change project key value


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

function slideToggle() {
  if (pointSelected) {
    w3.show('#slideshow')
    showSlides(slideIndex);
  } else if (!pointSelected) {
    w3.hide('#slideshow')
  }

}

let slideIndex = 1;


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}