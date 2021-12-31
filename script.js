//array to house 3 pairs of random numbers
//to be used to assign in url id number e.g. [102 102 544 544 233 233]
let randomIdArr = [];
while (randomIdArr.length < 7) {
  var r = Math.floor(Math.random() * 9) + 1020;
  if (randomIdArr.indexOf(r) === -1) randomIdArr.push(r);
}

//generating 3 urls, changing just the id number
//and placing them in an object to be later
//inserted into their respective image elements
let urls = {
  url0: `https://picsum.photos/id/${randomIdArr[0]}/300/200`,
  url1: `https://picsum.photos/id/${randomIdArr[0]}/300/200`,
  url2: `https://picsum.photos/id/${randomIdArr[1]}/300/200`,
  url3: `https://picsum.photos/id/${randomIdArr[1]}/300/200`,
  url4: `https://picsum.photos/id/${randomIdArr[2]}/300/200`,
  url5: `https://picsum.photos/id/${randomIdArr[2]}/300/200`,
};

//creating array with val a-f so we can match urls
//with html IDs.
let htmlID = ["a", "b", "c", "d", "e", "f"];

//creating 6 random numbers so we can later select htmlID values by
//by using the random numbers in randomIdIndexArr as index values of
//of htmlID.
let randomIdIndexArr = [];
while (randomIdIndexArr.length < htmlID.length) {
  let n = Math.floor(Math.random() * htmlID.length);
  if (randomIdIndexArr.indexOf(n) === -1) randomIdIndexArr.push(n);
}

//injecting urls by selecting random html id element and adding url from
//above object (urls)
for (let j = 0; j < htmlID.length; j++) {
  let urlsKeys = Object.keys(urls);

  document.body
    .querySelector("#" + htmlID[randomIdIndexArr[j]])
    .setAttribute("src", urls[urlsKeys[j]]);
}

///////////END OF IMAGE PLACEMENTS/////////////

///////////START OF EVENT LISTENERS AND GAME FUNCTIONALITY //////////////

const container = document.body.querySelector(".container");
const tile = document.body.querySelectorAll(".tile");
const popUp = document.body.querySelector(".matchedPopUp");
const playAgainBtn = document.body.querySelector("button");
let compareSrcArr = [];
let compareClass = [];
let matchedPair = [];
let freezeBoard = false;

function gameFunction() {
  let imgElement = this.children[0];

  compareSrcArr.push(imgElement);
  imgElement.style.visibility = "visible";

  let imgClass = imgElement.classList.value;
  compareClass.push(imgClass);

  //check if the element has been matched before
  //if so then remove eventListener

  if (matchedPair.includes(imgElement)) {
    matchedPair.forEach((element) =>
      element.removeEventListener("click", gameFunction)
    );
    reset();
  }

  //if tile is clicked once, it reveals image, another click hides it.
  //works by seeing if classes match
  else if (compareClass.length == 2 && compareClass[0] === compareClass[1]) {
    hide();
  }
  //if tiles match then YES!
  else if (
    compareSrcArr.length === 2 &&
    compareSrcArr[0].getAttribute("src") ===
      compareSrcArr[1].getAttribute("src")
  ) {
    // this.removeEventListener("click",gameFunction);
    compareSrcArr[0].removeEventListener("click", gameFunction);
    compareSrcArr[1].removeEventListener("click", gameFunction);
    
    // now we pass the matched pair into an array and remove eventListener
    matched();
    
    lockboard();
    reset();
  } else if (
    compareSrcArr.length === 2 &&
    compareSrcArr[0].getAttribute("src") !==
      compareSrcArr[1].getAttribute("src")
  ) {
    lockBoard(); //locking the board so no clicks

    setTimeout(hide, 750); // function has to be declared inside Timeout function or it will execute instantaneously
    setTimeout(lockBoard, 750); //unblocking the board
  }
}

tile.forEach((tile) => tile.addEventListener("click", gameFunction));
playAgainBtn.addEventListener("click", ()=>{
  location.reload();
});


function hide() {
  compareSrcArr[0].style.visibility = "hidden";
  compareSrcArr[1].style.visibility = "hidden";
  compareSrcArr = [];
  compareClass = [];
}

function reset() {
  compareClass = [];
  compareSrcArr = [];
}

function lockBoard() {
  if (!freezeBoard) {
    tile.forEach((tile) => tile.removeEventListener("click", gameFunction));
    freezeBoard = true;
  } else {
    tile.forEach((tile) => tile.addEventListener("click", gameFunction));
    freezeBoard = false;
  }
}

function matched() {
  matchedPair.push(...compareSrcArr);

  if (matchedPair.length ===6){
    popUp.children[0].textContent = "You got them all!";
    popUp.style.visibility = "visible";
    popUp.style.animation = "gameOver 1.5s";
    playAgainBtn.style.display="block";
  }

  else{
  //setting timeout so img is displayed before the pop up.
  setTimeout(() => {
    popUp.style.visibility = "visible";
    popUp.style.animation = "popUpAnimation 1.5s";
  }, 100);
  setTimeout(() => {
    popUp.style.visibility = "hidden";
    popUp.style.animation = "none";
  }, 1600);

}
}
