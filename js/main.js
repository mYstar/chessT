var moveNumbers = document.getElementsByClassName("move-number");
var moveRows = [];
for (item of moveNumbers) {
  moveRows.push([
    item,
    item.nextElementSibling,
    item.nextElementSibling.nextElementSibling
  ])
}
var currentMove = undefined;
/**
 * This function removes the highlighting of the old move
 * and highlights the new move.
*
* @param newMove: an size 3 array containing all the <div>s in the
*   row to select. get these from var moveRows
* @param playerColor: a string giving the selected players color 
*   ("white" || "black")
 */
var selectMove = function(newMove, playerColor) {
  if(currentMove !== undefined) {
    currentMove[0].classList.remove("sel-row");
    currentMove[1].classList.remove("sel-row");
    currentMove[2].classList.remove("sel-row");

    document.getElementById('sel-move').remove();
  }

  newMove[0].classList.add("sel-row");
  newMove[1].classList.add("sel-row");
  newMove[2].classList.add("sel-row");

  var slot = document.createElement("img");
  slot.id = "sel-move";
  slot.src = "./img/sel-move.svg";
  slot.alt = "seleced move";

  if(playerColor === "white") {
    newMove[1].appendChild(slot);
  } else {
    newMove[2].appendChild(slot);
  }

  currentMove = newMove;
}
selectMove(moveRows[0], "white");

for (let move of moveRows) {
  
  move[1].onclick = function() {
    selectMove(move, "white");
  }

  move[2].onclick = function() {
    selectMove(move, "black");
  }
}
