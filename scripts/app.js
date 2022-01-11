
const container = document.querySelector(".container")
const cells = document.querySelectorAll('.cell')
//console.log(cells)
const width = 4;
const resultDisplay = document.querySelector('.result')
const scoreDisplay = document.querySelector(".score")
let score = 0; 

// generate Number
function generateNumber (){
  let randomNumber = Math.floor(Math.random() * cells.length)
  if (cells[randomNumber == 0]) {
  cells[randomNumber].innerHTML = 2;
  }

}
  generateNumber();
  generateNumber();
 //Swipt right
  function moveRight() { 
    for ( let i=0; i<16; i++){
      if (i % 4 === 0) {
     let totalOne = cells[i].innerHTML
     let totalTwo = cells[i + 1].innerHTML
     let totalThree = cells[i + 2].innerHTML
     let totalFour = cells[i + 3].innerHTML
     let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
    // console.log(row)
     let filterdRow = row.filter(rows => rows )
    //console.log(filterdRow)
    let missing = 4 - filterdRow.length
    let zeros = Array(missing).fill(0)
    //console.log(zeros)
    let newRow = zeros.concat(filterdRow)
    //console.log(newRow)
    cells[i].innerHTML = newRow[0]
    cells[i + 1].innerHTML = newRow[1]
    cells[i + 2].innerHTML = newRow[2]
    cells[i + 3].innerHTML = newRow[3]
      }
    }
  }
  // Swipe Left
function moveLeft() {
  for (let i = 0; i < 16; i++) {
    if ( i % 4 === 0) {
      let totalOne = cells[i].innerHTML
      let totalTwo = cells[i + 1].innerHTML
      let totalThree = cells[i + 2].innerHTML
      let totalFour = cells[i + 3].innerHTML
      let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour) ]
console.log(row)
      let filterdRow = row.filter(rows => rows)
      //console.log(filterdRow)
      let missing = 4 - filterdRow.length
      //console.log(missing)
      let zeros = Array(missing).fill(0)
      //console.log(zeros)
      let newRow = filterdRow.concat(zeros)
     //console.log(newRow)
      cells[i].innerHTML = newRow[0]
      cells[i + 1].innerHTML = newRow[1]
      cells[i + 2].innerHTML = newRow[2]
      cells[i + 3].innerHTML = newRow[3]
    }
  }
}

//swipe Down 
function moveDown() {
  for (let i = 0; i < 4; i++){
    let totalOne = cells[i].innerHTML
    let totalTwo = cells[i+width].innerHTML
    let totalThree = cells[i+(width*2)].innerHTML
    let totalFour = cells[i+(width*3)].innerHTML
    let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
   //console.log(column)
    let filteredColumn = column.filter(columns => columns)
   //console.log(filteredColumn)
    let missing = 4 - filteredColumn.length
    //console.log(missing)
    let zeros = Array(missing).fill(0)
    //console.log(zeros)
    let newColumn = zeros.concat(filteredColumn)
    //console.log(zeros)
    cells[i].innerHTML = newColumn[0]
    cells[i+width].innerHTML = newColumn[1]
    cells[i+(width*2)].innerHTML = newColumn[2]
    cells[i+(width*3)].innerHTML = newColumn[3]
    }
}


// Move up function 
function moveUp() {
  for (let i=0; i < 4; i++) {
    let totalOne = cells[i].innerHTML
    let totalTwo = cells[i+width].innerHTML
    let totalThree = cells[i+(width*2)].innerHTML
    let totalFour = cells[i+(width*3)].innerHTML
    let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
    let filteredColumn = column.filter(column => column)
    let missing = 4 - filteredColumn.length
    let zeros = Array(missing).fill(0)
    let newColumn = filteredColumn.concat(zeros)
    cells[i].innerHTML = newColumn[0]
    cells[i+width].innerHTML = newColumn[1]
    cells[i+(width*2)].innerHTML = newColumn[2]
    cells[i+(width*3)].innerHTML = newColumn[3]  
  }
}

// Add up number Row 
function combineRow() {
  for ( let i = 0; i < 15; i++){
    if (cells[i].innerHTML === cells[i + 1].innerHTML){
      let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i+1].innerHTML)
      cells[i].innerHTML = combinedTotal
      cells[i + 1].innerHTML = 0
      score += combinedTotal
      scoreDisplay.innerHTML = score;
    }
   
  }
  checkForWin()
}

// add up number Column
function combineColumn() {
  for (let i = 0; i < 12; i++){
    if(cells[i].innerHTML === cells[i+width].innerHTML){
      let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i+width].innerHTML)
      cells[i].innerHTML = combinedTotal
      cells[i+width].innerHTML = 0
      score += combinedTotal
      scoreDisplay.innerHTML = score
    }
  }
  checkForWin()
}
 //assign keycodes 
 function control(e) {
   if(e.keyCode === 39) {
     keyRight()
   }
   else if(e.keyCode === 37) {
     keyLeft()
   }
   else if(e.keyCode === 38 ){
     keyUp();
   }
   else if(e.keyCode === 40){
     keyDown();
   }
 }
 document.addEventListener('keyup', control)

 function keyRight() {
   moveRight()
   combineRow()
   moveRight()
   generateNumber()
 }
 function keyLeft() {
   moveLeft()
   combineRow()
   moveLeft()
   generateNumber()
 }
 function keyDown() {
   moveDown()
   combineColumn()
   moveDown()
   generateNumber()
 }
 function keyUp() {
   moveUp()
   combineColumn()
   moveUp()
   generateNumber()
 }

 //check for the Win 2048
 function checkForWin() {
   for (let i = 0; i < cells.length; i++) {
     if (cells[i].innerHTML == 2048){
       resultDisplay.innerHTML = "You win"
       document.removeEventListener("keyup", control)
     }
   }
 }

 //check for Game over 
 function checkForGameOver() {
   let zeros = 0
   for (let i = 0; i < cells.length; i++ ){
     if (cells[i].innerHTML == 0){
       zeros++
     }
     if (zeros === 0){
       resultDisplay.innerHTML = "You lose"
       document.removeEventListener("keyup", control )
     }
   }


 }