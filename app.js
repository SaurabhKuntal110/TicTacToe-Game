let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn= document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg-container");
let msg= document.querySelector("#msg");
let msgTurn = document.querySelector(".turn");

let turnO = true; //playerX,playerO if turnO is true then playerO turn else playerX turn
let count = 0; //to track Draw
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

const resetGame= () => {
    turnO=true;
    count =0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msgTurn.innerText = "Player O Starts.";
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            msgTurn.innerText="Player X's Turn";
            turnO=false;
        }
        else{
            box.innerText="X";
            msgTurn.innerText="Player O's Turn";
            turnO=true;
        }
        box.disabled=true;
        count++;
        
        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
});


const gameDraw = () =>{
    msg.innerText="Game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const disableBoxes= () =>{
    for (let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes= () =>{
    for (let box of boxes){
        box.disabled=false;
        box.innerText= "";
    }
};

const showWinner= (winner) =>{
    msg.innerText=`Congratulations!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for( let pattern of winPatterns){
        let pos1Val =    boxes[pattern[0]].innerText;
        let pos2Val =    boxes[pattern[1]].innerText;
        let pos3Val =    boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val===pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);