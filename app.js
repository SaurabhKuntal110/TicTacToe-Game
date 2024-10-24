//accessing all the boxex, resetbutton,new gaem button,and other message displaying container class and id
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn= document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg-container");
let msg= document.querySelector("#msg");
let msgTurn = document.querySelector(".turn");

let turnO = true; //playerX,playerO if turnO is true then playerO turn else playerX turn
let count = 0; //to track Draw

// condition for winning patterns
let winPatterns= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

//func to resetgame 
const resetGame= () => {
    turnO=true; //let first turn be of O
    count =0;
    enableBoxes(); //calling enableboxes function
    msgContainer.classList.add("hide"); // to add hide class to msg container to make it hidden
    msgTurn.innerText = "Player O Starts."; //initial dilpay msg
};

//checking condtion for each boxes with the help of event listener
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // if else to identify player turn
        if(turnO){ 
            box.innerText="O"; // adding O to box
            msgTurn.innerText="Player X's Turn"; // display message for next player
            turnO=false; // to make next turn for player X
        }
        else{
            box.innerText="X"; //adding X to box
            msgTurn.innerText="Player O's Turn";  // display message for next player
            turnO=true; //to make next turn for player O
        }
        box.disabled=true; //disable box to prevent entering value to same box
        count++; // record the number to chance
        
        // variable to store the winner
        let isWinner = checkWinner();

        // condition for game draw function calling
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

//func for game draw
const gameDraw = () =>{
    msg.innerText="Game was a Draw."; // display the message in msg box
    msgContainer.classList.remove("hide"); // removing the hide class from msgContainer to make it visible
    disableBoxes(); // disable boxes func called
};

// func to diable each box
const disableBoxes= () =>{
    for (let box of boxes){
        box.disabled=true;
    }
};
//func to enable each box, called when new game/reset game button is invoked
const enableBoxes= () =>{
    for (let box of boxes){
        box.disabled=false;
        box.innerText= ""; // adding blank value to all boxes
    }
};

// func to show winner in msg container
const showWinner= (winner) =>{ //winner is passed as a parameter to display
    msg.innerText=`Congratulations!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

//func to check winner condition
const checkWinner = () => {
    // checking each win pattern with for of 
    for( let pattern of winPatterns){
        // accessing the 3 value to posVal
        let pos1Val =    boxes[pattern[0]].innerText;
        let pos2Val =    boxes[pattern[1]].innerText;
        let pos3Val =    boxes[pattern[2]].innerText;

        // Cond the three boxes should not be empty and all the 3 values should be equal
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val===pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val); // show winner func called and winner is passed as parameter
            };
        };
    };
};

// adding resetgame func to newgame button and reset game button
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);