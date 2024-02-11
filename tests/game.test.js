// game.test.js

// Importiere die zu testenden Funktionen und Konstanten
import { 
    checkWinner,
    checkDraw,
    testCheckGameOver,
    PLAYER,
    BOT,
    gameActive
} from '../src/game.mjs';

describe('Tic Tac Toe Game Tests', () => {
    let clickedCells;

    beforeEach(() => {
        // Setup: Definiere Initialzustand für jeden Testfall
        clickedCells = [];
    });

    test('Check if the game correctly identifies a winning condition', () => {
        // Simuliere einen Zustand, in dem ein Spieler gewinnt
        clickedCells = [
            { row: 0, col: 0, player: PLAYER },
            { row: 0, col: 1, player: PLAYER },
            { row: 0, col: 2, player: PLAYER }
        ];
        expect(checkWinner(clickedCells)).toBe(true);
    });

    test('Check if the game correctly identifies a draw condition', () => {
        // Simuliere einen Zustand, in dem das Spiel unentschieden ist
        clickedCells = [
            { row: 0, col: 0, player: PLAYER },
            { row: 0, col: 1, player: BOT },
            { row: 0, col: 2, player: PLAYER },
            { row: 1, col: 0, player: PLAYER },
            { row: 1, col: 1, player: PLAYER },
            { row: 1, col: 2, player: BOT },
            { row: 2, col: 0, player: BOT },
            { row: 2, col: 1, player: BOT },
            { row: 2, col: 2, player: PLAYER }
        ];
        expect(checkDraw(clickedCells)).toBe(true);
    });

    test('Check if the game correctly ends when a player wins', () => {
        // Simuliere einen Zustand, in dem ein Spieler gewinnt
        clickedCells = [
            { row: 0, col: 0, player: PLAYER },
            { row: 0, col: 1, player: PLAYER },
            { row: 0, col: 2, player: PLAYER }
        ];
        testCheckGameOver(PLAYER, clickedCells);
        // Überprüfe, ob das Spielende ausgelöst wird
        expect(gameActive).toBe(false);
    });

    test('Check if the game correctly ends when it\'s a draw', () => {
        // Simuliere einen Zustand, in dem das Spiel unentschieden ist
        clickedCells = [
            { row: 0, col: 0, player: PLAYER },
            { row: 0, col: 1, player: BOT },
            { row: 0, col: 2, player: PLAYER },
            { row: 1, col: 0, player: PLAYER },
            { row: 1, col: 1, player: PLAYER },
            { row: 1, col: 2, player: BOT },
            { row: 2, col: 0, player: BOT },
            { row: 2, col: 1, player: BOT },
            { row: 2, col: 2, player: PLAYER }
        ];
        testCheckGameOver(PLAYER, clickedCells);
        // Überprüfe, ob das Spielende ausgelöst wird
        expect(gameActive).toBe(false);
    });

});
