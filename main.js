function Player(name, icon) {
  this.name = name;
  this.icon = icon;
}

const initGame = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const container = document.querySelector(".container");

  let currentPlayer = "X";
  let gameOver = false;

  function createBoard() {
    const grid = document.createElement("div");
    const resetBtn = document.createElement("button");
    const p = document.createElement("p");

    grid.classList.add("grid-container");
    p.classList.add("msg");
    resetBtn.innerHTML = "Reset";
    resetBtn.addEventListener("click", reset);

    container.append(grid, p, resetBtn);
    grid.innerHTML = "";

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.setAttribute("col", `${i}`);
        div.setAttribute("row", `${j}`);
        grid.append(div);
      }
    }
  }

  function isDraw() {
    return board.every((row) => row.every((cell) => cell !== ""));
  }

  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function makeMove() {
    const cells = document.querySelectorAll(".cell");
    const msg = document.querySelector(".msg");

    if (gameOver) {
      return;
    }

    cells.forEach((cell) =>
      cell.addEventListener("click", (e) => {
        if (gameOver || e.target.innerHTML !== "") {
          return;
        }

        cell.innerHTML = currentPlayer;
        const col = cell.getAttribute("col");
        const row = cell.getAttribute("row");

        board[col][row] = currentPlayer;

        if (isDraw()) {
          msg.innerHTML = "It is a draw!!";
          gameOver = true;
        }

        if (checkWin()) {
          msg.innerHTML = `${currentPlayer} wins!!`;
          gameOver = true;
          return;
        }

        changePlayer();
      })
    );
  }

  function reset() {
    const cells = document.querySelectorAll(".cell");
    const msg = document.querySelector(".msg");

    cells.forEach((cell) => (cell.innerHTML = ""));
    board = board.map((row) => row.map(() => ""));

    gameOver = false;
    currentPlayer = "X";
    msg.innerHTML = "";
  }

  function checkWin() {
    const winsComb = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    return winsComb.some((pattern) =>
      pattern.every((cell) => cell === currentPlayer)
    );
  }

  return {
    createBoard,
    makeMove,
    reset,
  };
})();

const start = document.querySelector(".start");
const cont = document.querySelector(".start-container");
start.addEventListener("click", () => {
  initGame.createBoard();
  initGame.makeMove();
  cont.style.display = "none";
});
