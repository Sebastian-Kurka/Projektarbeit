// Constants
const BOARD_SIZE = 3;
const PLAYER = "X";
const BOT = "O";

// State variables
let currentPlayer = PLAYER;
let gameActive = true;
let clickedCells = [];
let validMove = true;


function checkWinner(localClickedCells) {
    console.log("Checking for winner...")

    const winPatterns = [
        [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }], // Horizontal rows
        [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }],
        [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }],
        [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }], // Vertical columns
        [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }],
        [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }],
        [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }], // Diagonal rows
        [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }]
    ]
    let winnerFound = false

    winPatterns.forEach(pattern => {
        const [cellA, cellB, cellC] = pattern
        const playerA = localClickedCells.find(cell => cell.row === cellA.row && cell.col === cellA.col)?.player
        const playerB = localClickedCells.find(cell => cell.row === cellB.row && cell.col === cellB.col)?.player
        const playerC = localClickedCells.find(cell => cell.row === cellC.row && cell.col === cellC.col)?.player
        if (playerA && playerA === playerB && playerA === playerC) {
            winnerFound = true
        }
    })
    return winnerFound
}


function checkDraw(localClickedCells) {
    return localClickedCells.length === 9 && !checkWinner(clickedCells) &&
    localClickedCells.every(cell => cell.player)
}


function checkGameOver(currentPlayer, localClickedCells) {
    if (checkWinner(localClickedCells) || checkDraw(localClickedCells)) {
        gameActive = false
        showModal(currentPlayer)
    } else {
        return
    }
}


// Wird nur für Tests verwendet ohne der showModal() Funktion.
function testCheckGameOver(currentPlayer, localClickedCells) {
    if (checkWinner(localClickedCells) || checkDraw(localClickedCells)) {
        gameActive = false
    } else {
        return
    }
}


function showModal(currentPlayer) {
    const modal = document.getElementById("modal")
    const modalMessage = document.getElementById("modal-message")
    const restartButton = document.getElementById("restart-button")
    if (checkDraw(clickedCells)) {
        modalMessage.textContent = "GAME OVER: Unentschieden"
    } else {
        modalMessage.textContent = `GAME OVER: Spieler ${currentPlayer} hat gewonnen!`
    }
    modal.style.display = "flex"

    restartButton.addEventListener("click", function () {
        resetGame()
        modal.style.display = "none"
    })
}


function resetGame() {
    clickedCells.forEach(cell => {
        const button = document.querySelector(`button[data-row="${cell.row}"][data-col="${cell.col}"]`)
        if (button) {
            button.textContent = ""
            button.disabled = false
        }
    })
    clickedCells = []
    gameActive = true
    currentPlayer = PLAYER
    console.log("Spiel zurückgesetzt!")
}


function extractCoordinates(assistantResponse) {
    const parts = assistantResponse.split(/[^\d]+/).filter(part => part !== '')
    if (parts.length >= 2) {
        const row = parseInt(parts[0]);
        const col = parseInt(parts[1]);
        if (!isNaN(row) && !isNaN(col)) {
            return { row, col };
        }
    }
    return { row: null, col: null }
}


function handleAssistantMove(row, col, currentPlayer) {
    if (isValidMove(row, col)) {
        validMove = true
        clickedCells.push({ row, col, player: currentPlayer })
        console.log("Clicked cell values: ", clickedCells.map(cell => `(${cell.row}, ${cell.col}, ${cell.player})`))
        updateButtons(row, col)
    } else {
        console.log("Invalid move by the bot!")
        validMove = false
        sendGameToServer(currentPlayer, clickedCells)
    }
}


function isValidMove(row, col) {
    // Überprüfen, ob die Koordinaten innerhalb des Spielfelds liegen
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
        console.log("invalid move")
        return false;
    }

    // Überprüfen, ob das Feld bereits besetzt ist
    const cell = clickedCells.find(cell => cell.row === row && cell.col === col);
    if (cell) {
        console.log("invalid move")
        return false;
    }
    // Überprüfen, ob Koordinaten erkannt wurden
    if (row == null || col == null) {
        console.log("invalid move")
        return false
    }
    console.log("valid move")
    return true;
}


function updateButtons(row, col) {
    const button = document.querySelector(`button[data-row="${row}"][data-col="${col}"]`)
    if (button) {
        button.textContent = BOT
        button.disabled = true
    }
}


document.addEventListener("DOMContentLoaded", function () {


    initializeBoard()

    document.getElementById("newGameBtn").addEventListener("click", resetGame)

    // Functions
    function initializeBoard() {
        const board = document.getElementById("board")
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const cell = createCell(row, col)
                board.appendChild(cell)
            }
        }
    }


    function createCell(row, col) {
        const cell = document.createElement("button")
        cell.className = "cell"
        cell.dataset.row = row
        cell.dataset.col = col
        cell.addEventListener("click", handlePlayerMove)
        return cell
    }


    function handlePlayerMove(event) {
        const clickedCell = event.target
        const row = parseInt(clickedCell.dataset.row)
        const col = parseInt(clickedCell.dataset.col)
        console.log("current player: PLAYER")
        console.log("Player move: " + row + "," + col)
        if (gameActive && !clickedCell.textContent) {
            clickedCell.textContent = PLAYER
            clickedCells.push({ row, col, player: currentPlayer })
            checkGameOver(currentPlayer, clickedCells)
            if (gameActive) {
                sendGameToServer(currentPlayer, clickedCells)
            }
        }
    }
})


function sendGameToServer(currentPlayer, clickedCells) {
    document.querySelectorAll(".cell").forEach(cell => { cell.disabled = true })
    console.log(JSON.stringify(clickedCells))
    let messages = []
    if (!validMove) {
        messages = [
            {
                role: "system",
                content: "you are my Tic-Tac-Toe oponent."
            },
            {
                role: 'user',
                content: `Dein Zug war ungültig. Bitte wähle erneut die Position für dein 'O', indem du die Zeile und die Spalte angibst, z. B. '1,1' für die Mitte. 
                    Nur Zahlen inklusive 0 und 2 sind erlaubt.Der aktuelle Zustand des Bretts ist: ${JSON.stringify(clickedCells)}`
            },
        ]
    } else {
        messages = [
            {
                role: "system",
                content: "you are my Tic-Tac-Toe oponent."
            },
            {
                role: 'user',
                content: `Ich spiele Tic-Tac-Toe gegen dich. Du bist 'O'. Der aktuelle Zustand des Bretts ist: ${JSON.stringify(clickedCells)} 
                    Bitte wähle die Position für dein 'O', indem du die Zeile und die Spalte angibst, z. B. '1,1' für die Mitte. Nur Zahlen inklusive 0 und 2 sind erlaubt. 
                    Nach deinem Zug werde ich antworten. Antworte ausschließlich mit zwei Zahlen!`
            },
        ]
    }

    const data = {
        model: 'gpt-3.5-turbo-1106',
        messages: messages,
    }


    fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            currentPlayer = "O"
            console.log("current player: BOT")
            const assistantResponse = data.choices[0].message.content
            const coordinates = extractCoordinates(assistantResponse)
            console.log('Assistant Response: ', assistantResponse)
            console.log('Extracted Coordinates: ', coordinates)
            handleAssistantMove(coordinates.row, coordinates.col, currentPlayer)
            checkGameOver(currentPlayer, clickedCells)
            currentPlayer = PLAYER
        })
        .catch(error => {
            console.error('Error: ', error)
        })
        .finally(() => {
            document.querySelectorAll(".cell").forEach(cell => {
                if (cell.textContent === "") {
                    cell.disabled = false
                }
            })
        })
}

export {
    checkWinner,
    checkDraw,
    testCheckGameOver,
    PLAYER,
    BOT,
    gameActive
};
