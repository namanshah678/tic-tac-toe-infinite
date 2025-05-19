document.addEventListener("DOMContentLoaded", () => {
    const boxs = document.querySelectorAll('.cell');
    const Restart = document.querySelector('#Restart');
    const newGame = document.querySelector('#New_Game');
    const msgcontainer = document.querySelector('.msg_container');
    const msg1 = document.querySelector('#msg');

    let turnO = true;

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

    boxs.forEach((box) => {
        box.addEventListener("click", () => {
            // console.log("clicked");
            if (turnO) {
                box.innerText = "O"
                turnO = false;
            }
            else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;

            checkwinner();
        });
    });

    const resetGame = () => {
        turnO = true;
        EnabledBoxes();            
        msgcontainer.classList.add("hide");
        msg1.innerText = "";   // Hide the message container
    };
    const EnabledBoxes = () => {
        boxs.forEach((box) => {
            box.disabled = false;
            box.innerText = "";
        });
    }

    const disabledBoxes = () => {
        boxs.forEach((box) => {
            box.disabled = true;
        });
    }

    const winner = (winner1) => {
        msg1.innerText = `congratulations the winner is ${winner1}`;
        msgcontainer.classList.remove("hide");
        disabledBoxes();
    }

    const checkwinner = () => {
        for (let patterns of winningConditions) {
            let po1 = boxs[patterns[0]].innerText;
            let po2 = boxs[patterns[1]].innerText;
            let po3 = boxs[patterns[2]].innerText;

            if (po1 != "" && po2 != "" && po3 != "") {
                if (po1 === po2 && po2 === po3) {
                    console.log("Winner", po1)
                    winner(po1);
                }
            }
        }
    }
    newGame.addEventListener('click', resetGame)
    Restart.addEventListener('click', resetGame)
});
