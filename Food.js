class Food{

constructor(){

this.image=loadImage("images/Milk.png")



}

display(){

    var y =330; // to diplay bottles i  different rows
    var x=20;// setting starting position for rows of milk 
    for (var i=0;i<foods; i++){
        x=x+20;
        if (i%15===0){

        y=y+50; 
        x=20;
        }
        image (this.image,x, y, 40,50)


    }

}



}