let block = document.querySelectorAll('.block');
let reset = document.querySelector('.reset');
let message = document.querySelector('.message');
let playerMove = document.querySelector('.player-move');
let player = 'cross';
let moveCount = 0;

let winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
let arrZero = [];
let arrCross = [];

for (let i=0; i<block.length; i++){
    block[i].addEventListener('click', move)
    
}


function move(event) {
    if (!this.classList.contains('zero')&&!this.classList.contains('cross')) {
        let target = event.target;
        let index = Array.from(block).indexOf(target);
        
        this.classList.add(player);
        (player === 'cross') ? arrCross.push(index) : arrZero.push(index);
       
        if (player==='cross'){
            playerMove.textContent = 'Нолики ходят'
        } else {
        playerMove.textContent = 'Крестики ходят'
        }
      
        if (
            (arrZero.length>2||arrCross.length>2)&&
            (checkWin(arrCross, index)||checkWin(arrZero, index))
            ) {
                for (let i=0; i<block.length; i++){
                    block[i].removeEventListener('click', move);                
                }
                arrZero = [];
                arrCross = [];
                if (player==='cross'){
                    playerMove.textContent = 'Крестики ПОБЕДИЛИ'
                } else {
                playerMove.textContent = 'Нолики ПОБЕДИЛИ'
                }
                document.querySelector('.game-block').classList.add('red');
            }


        chengePlayer();       
           
    }
    moveCount++;
    console.log(moveCount);
    if(moveCount==9)message.textContent='НИЧЬЯ';
}
function chengePlayer(){
    if(player==='cross'){
        player = 'zero'
    }
    else(player = 'cross')
}
reset.addEventListener('click', function(){
    for (let i=0; i<block.length; i++) {
        block[i].classList.remove('zero', 'cross');}
        player = 'cross';
        moveCount = 0;
        for (let i=0; i<block.length; i++){
            block[i].addEventListener('click', move)            
        }
        moveCount = 0;
        playerMove.textContent = '';
        message.textContent = '';
    document.querySelector('.game-block').classList.remove('red');
});
function checkWin(arr, num) {
    for (let i=0; i<winCondition.length; i++){
        let subArr = winCondition[i];
        let count = 0;
        if (subArr.indexOf(num)!== -1) {
            for (let j=0; j<subArr.length; j++){
                if (arr.indexOf(subArr[j]) !== -1) {
                    count++;
                    if (count === 3) {
                        return true;
                    }
                }
            }
        }
    }
}
