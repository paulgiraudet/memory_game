//To avoid bug on cards display (more than 2) you can just comment
//the transition (rotation) in css line 144


//non randomize array
var deck_list = [ "pikachu.png","metamorph.png","pikachu.png","metamorph.png","tortipouss.png","tortipouss.png","papi.jpg","papi.jpg", "lipoutou.png","lipoutou.png","artikodin.jpg","artikodin.jpg","mew.png","mew.png","abra.png","abra.png",];
//all div containing cards
var deck = document.getElementsByClassName("card");
//images hidding background(game using background's comparison)
var backcard = document.getElementsByClassName("backcard");

//saving click choices
var choice1="";
var choice2="";
//saving array positions
var save ="";
var save2 ="";

//used for timeout
var id =""; //for checking cards
var id2=""; //for display timeout
var id3=""; //for timer timeout
var id4=""; //for rotate timeout
var id5=""; //delay for launching timer
var id6=""; //delay for max_card++

//used to block maximum card click
var max_card=2;

//counting score
var score = 0;
//number of try
var tries = 0 ;
//timer ++
var time = 0;
//background ++
var background=0;
//rotate ++
var rotate = 0 ;

//hidding restart button at the start
var restart = document.getElementById("restart_game");
restart.style.display ="none";

//rotation to make a little animation on start
for (i=0;i<deck.length;i++){
  backcard[i].style.transform = "rotateY(90deg)";
}

//random shuffle of deck_list
function shuffle(array) {
  //used for shuffle the deck_list
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  //choose randomly an element from an array and then put
  //it in an new temporary array for each element with
  //the same probability
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

}
