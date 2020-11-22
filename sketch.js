//Create variables here
var dog, dogImage, happyDog, database, foods;

var lastFed, foodObject;
function preload(){

  dogImage=loadImage ("images/dogImg.png");
  happyDog= loadImage ("images/dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(500, 500);
  database =firebase.database();

  dog =createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale=0.3;

// reading food data from DB 
database.ref("food").on("value",readFood);

// adding buttons 

addFood=createButton ('Add Food');
addFood.position(400,150);
addFood.mousePressed (AddFood)


feedDog=createButton ('Feed Dog');
feedDog.position(600,150);
feedDog.mousePressed (FeedDog)

// getting lastFed value from DB 
database.ref('lastFed').on ("value", function (data){

  lastFed=data.val();
  console.log(lastFed)
})

foodObject= new Food();


}


function draw() {  
  background(46,139,87);

  drawSprites();

  //add styles here
 textSize(20);
 stroke("green");
  fill("red");
  text("Food Stock: "+ foods, 200, 80);

  // to display time 
 showTime();
 foodObject.display();
}
//function to read values from database
function readFood(data){

  foods=data.val();
//console.log("reading")

}
// to add food to DB 
function AddFood(){
  foods++;
  database.ref('/').update({food:foods});

}


function FeedDog(){

	if (foods>0){
    foods--;
    }
    dog.addImage(happyDog);
    database.ref('/').update({
      food:foods,
      lastFed:hour()});
}


function showTime(){

if (lastFed<12 ){
text("LAst Fed: "+ lastFed +"AM", 200, 150)
}
else if (lastFed==12){
  text("LAst Fed: "+ lastFed +"PM", 200, 150)

}
else if (lastFed > 12){
  text("LAst Fed: "+ lastFed%12 +"PM", 200, 150)// md is used to get hour as 1 , 2 3, etc

}

} 