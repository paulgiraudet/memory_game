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


      //start function
      function start(){
        time=40;
        //shuffling deck
        shuffle(deck_list);
        //display backgrounds after 1s cause of pokeball transition
        id2=setTimeout(display,1800);
        //s    id4=setTimeout(rotateCardEhowing pokeball to hide backgrounds
        rotateCardStart();
        //launching timer
        id5=setTimeout(timer,1800);
        //allowing player to play only when the game is fully displayed
        id6=setTimeout(resetMaxCard,1800);

        //avoid player to spam start game function
        document.getElementById("start_game").style.display ="none";
        restart.style.display ="none";
        //resetting
        tries = 0 ;
        score = 0 ;
        choice1="";
        choice2="";
        document.getElementById("guess").innerHTML = tries;
      }

      function resetMaxCard(){
        //set count to 0 to permit player to click on cards
        max_card=0;
      }

      //used to avoid a bug with card transition rotation
      // function maxCardAdd(){
      //   clearTimeout(id6);
      //   max_card++;
      // }

      //timer function
      function timer(){

          clearTimeout(id5);

          //display time in html
          document.getElementById("timer").innerHTML = time+" s";

          if (score===8){
            clearTimeout(id3);
            restart.style.display ="block";
            // document.getElementById("timer").innerHTML = "";
          }
          //stopping the timer
          else if (time===0){
            //setting count to 2 to stop the game
            max_card=2;
            clearTimeout(id3);
            //showing restart button
            restart.style.display ="block";
            document.getElementById("timer").innerHTML = "";

            //showing full cards to player if he lose
            rotateCardEnd();
          }
          //timeout of 1 second on our function till 0s
          else{
            id3=setTimeout(timer,1000);
          }
          //sum -1 cause our timer is in seconds
          time--;
      }

      //function to show cards if user is losing to show him the full deck
      function rotateCardEnd(){

        //hide pokeball to show the card hidden behind
        backcard[rotate].style.transform = "rotateY(90deg)";
        //going to the next card
        rotate++;

        //stopping the timer
        if (rotate===deck.length){
          clearTimeout(id4);
          rotate = 0;
        }
        //timeout of 0.1 second on our function till the end of display
        else{
          id4=setTimeout(rotateCardEnd,100);
        }
      }

      function rotateCardStart(){
        //show pokeball to hide the card behind
        backcard[rotate].style.transform = "rotateY(0deg)";
        //going to the next card
        rotate++;

        //stopping the timer
        if (rotate===deck.length){
          clearTimeout(id4);
          rotate = 0;
        }
        //timeout of 0.1 second on our function till the end of display
        else{
          id4=setTimeout(rotateCardStart,100);
        }
      }

//display all backgroundImage
function display(){

  clearTimeout(id2);
  //displaying every backgroundImage after the randomize
  //to position the differents elements
  for (background=0;background<deck.length;background++){
    deck[background].style.backgroundImage = "url('img/"+deck_list[background]+"')";
  }

}

//will save the two different choices and lanch a check funciton
function compare(n){

  //we avoid player to use the function more than 2 times
  //in a row for displaying only 2 card at max.
  //the function will do nothing if the count is at more than 2
  if (max_card <2){
    //rotating image in front to show the background
    //90deg is pixel perfect so we cant spam click on
    //the same image
    backcard[n].style.transform = "rotateY(90deg)";

    //saving the first choice
    if (choice1===""){
      choice1 = deck_list[n];
      save=n;
    }

    //when we have tje first choice we go here
    else {
      //saving second choice
      choice2 = deck_list[n];
      save2=n;
      //comapring the 2 choices with 1s timer to let the 2 cards
      id = setTimeout(check,1000);
      //display for 1 second
      tries++;
    }
    //count ++
    max_card++;
  }
}

function check(){
  //clearing timeout to avoid animation repetition
  clearTimeout(id);

  //counting tries
  document.getElementById("guess").innerHTML = tries;

  //happen only if the two choices are different
  if (choice1 != choice2){
    //getting back the 2 front images to their original
    //position
    backcard[save].style.transform = "rotateY(0deg)";
    backcard[save2].style.transform = "rotateY(0deg)";
  }

  //else nothing happen the 2 cards dont move so we let
  //the player see the pairs
  else{
    //if the player find one pair we had 1 so we can control
    //the end of the game
    score++;
  }
  //reseting choice1 var for the compare function plus the counter else
  //we couldn't play anymore
  choice1="";
  max_card=0;
}
