document.addEventListener("DOMContentLoaded", () => {
    const boxs = document.querySelectorAll('.cell');
    const Restart = document.querySelector('#Restart');
    const newGame = document.querySelector('#New_Game');
    const msgcontainer = document.querySelector('.msg_container');
    const msg1 = document.querySelector('#msg');

    let turnO = true;
  let moveHistory = [];  // { index, value }
  let gameOver = false;
  let fadedMove = null;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

  boxs.forEach((box, index) => {
        box.addEventListener("click", () => {
      if (box.innerText !== "" || gameOver) return;

      // Fade-out content
      if (fadedMove) {
        const fadedBox = boxs[fadedMove.index];
        fadedBox.innerText = "";
        fadedBox.classList.remove("fade-out");
        fadedMove = null;
            }

      const symbol = turnO ? "O" : "X";
      box.innerText = symbol;
      turnO = !turnO;

      moveHistory.push({ index, value: symbol });

      if (moveHistory.length > 6) {
        fadedMove = moveHistory.shift(); 
        const oldBox = boxs[fadedMove.index];
        oldBox.classList.add("fade-out");
      }

            checkwinner();
        });
    });

  function checkwinner() {
    for (let pattern of winningConditions) {
      let [a, b, c] = pattern;
      let po1 = boxs[a].innerText;
      let po2 = boxs[b].innerText;
      let po3 = boxs[c].innerText;

      if (po1 !== "" && po1 === po2 && po2 === po3) {
        winner(po1);
        return;
      }
    }

    const winner = (winner1) => {
        msg1.innerText = `congratulations the winner is ${winner1}`;
        msgcontainer.classList.remove("hide");
        disabledBoxes();
    }

  function resetGame() {
    turnO = true;
    moveHistory = [];
    fadedMove = null;
    gameOver = false;
    boxs.forEach(box => {
      box.innerText = "";
      box.classList.remove("fade-out");
    });
    msgcontainer.classList.add("hide");
    msg1.innerText = "";
                }
            }
        }
    }
    newGame.addEventListener('click', resetGame)
    Restart.addEventListener('click', resetGame)
});
