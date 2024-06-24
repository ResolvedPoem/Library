var rotationDictionary = {one:0, two:-60, three:-120, four:-180, five:-240, six:-300};
var numberArray = ["one", "two", "three", "four", "five", "six"];

window.onload = (event) => {
//in case I want to make something run at launch
  var searchParams = new URLSearchParams(window.location.search);
  if(searchParams.size == 0) {
    const paramStr = "";
    searchParams = new URLSearchParams(paramStr);
  }
  let link = document.getElementById("backButton");
  link.href += `?${searchParams.toString()}`;
  let lecternSeperate = 0;
  let lecternWidth;
  let lecternBuffer;
  Array.from(document.querySelectorAll(`.lectern`)).forEach((lectern) => {
    lectern.addEventListener("click", setRotation);
    lectern.lecternRotation = 0;
    lecternBuffer = (window.innerWidth - (lectern.clientWidth *4 )) / 5;
    lecternWidth = lectern.clientWidth;
    lecternSeperate += lecternBuffer;
    lectern.parentElement.style.left = `${lecternSeperate}px`;
    lecternSeperate += lecternWidth;
  });
  Array.from(document.querySelectorAll(`.imgcontainer`)).forEach((imgcontainer) => {
    imgcontainer.children[0].style.height = `45px`;
    imgcontainer.children[0].style.width = `45px`;
    imgcontainer.children[0].style.imageRendering = `crisp-edges`;
    imgcontainer.children[0].style.position = "absolute";
    imgcontainer.children[0].style.left = `-50px`;
    imgcontainer.children[0].style.top = `5px`;
    imgcontainer.children[1].style.height = `125px`;
  });
  lecternSeperate = 0;
  Array.from(document.querySelectorAll(`.plaques`)).forEach((plaque) => {
    plaque.children[0].style.width = `300px`;
    lecternSeperate += lecternBuffer;
    plaque.style.left = `${lecternSeperate}px`;
    lecternSeperate += lecternWidth;
  });
}


function setRotation(e) {
  let target;
  if(e.target.tagName == "IMG") {
    target = e.target.parentElement.parentElement;
  } else {
    target = e.target;
  }
  let currentFace = getKeyByValue(rotationDictionary, this.lecternRotation);
  let plusIndex = numberArray.indexOf(currentFace)+1;
  if(plusIndex == numberArray.length) {
    plusIndex = 0;
  }
  let minusIndex = numberArray.indexOf(currentFace)-1;
  if(minusIndex == -1) {
    minusIndex = numberArray.length-1;
  }
  if(target.id == currentFace) {
    return;
  } else if(target.id == numberArray[plusIndex]) {
    this.lecternRotation -= 60;
  } else if(target.id == numberArray[minusIndex]) {
    this.lecternRotation += 60;
  }
  if(this.lecternRotation <= -360 || this.lecternRotation >= 60) {
    cheatJustALittle(this);
  } else {
    rotateLectern(this, e);
  }
}

function rotateLectern(object, event) {
  object.style.transform = `rotate3d(1, 0, 0, ${object.lecternRotation}deg)`;
}

function cheatJustALittle(object) {
  if(object.lecternRotation <= -360) {
    object.lecternRotation = 0;    
    object.classList.add("notransition");
    object.style.transform = `rotate3d(1, 0, 0, ${object.lecternRotation + 60}deg)`;
    object.offsetHeight;
    object.classList.remove("notransition");
  } else {
    object.lecternRotation = -300;    
    object.classList.add("notransition");
    object.style.transform = `rotate3d(1, 0, 0, ${object.lecternRotation - 60}deg)`;
    object.offsetHeight;
    object.classList.remove("notransition");    
  }
  rotateLectern(object);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}