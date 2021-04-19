export const CellState = Object.freeze({
    Empty    : "",
    Player01 : "X", //"😂",
    Player02 : "0",
});

export function checkForWinState(cells, cellStateInputed) {
    let winDetected = false;
    
    checkBlock: {
        
        for (let i = 0 ; i < 3; i++) {
            // Checando na horizontal
            if (cells[i][0] === cellStateInputed &&
                cells[i][1] === cellStateInputed &&
                cells[i][2] === cellStateInputed
            ) {
                winDetected = true;
                break checkBlock;
            }
            
            // Checando na vertical
            if (cells[0][i] === cellStateInputed &&
                cells[1][i] === cellStateInputed &&
                cells[2][i] === cellStateInputed
            ) {
                winDetected = true;
                break checkBlock;
            }  
        }

        // Checando verticais
        if (
            cells[1][1] === cellStateInputed &&
            (
                (
                    cells[0][0] === cellStateInputed && 
                    cells[2][2] === cellStateInputed
                ) ||
                (
                    cells[0][2] === cellStateInputed && 
                    cells[2][0] === cellStateInputed
                )
            )
        ) {
            winDetected = true;
            break checkBlock;
        }

    }

    if (winDetected) {
        return 'ganhou';
    } else endCheck: {
        for (let x = 0; x < 3; x++)
        for (let y = 0; y < 3; y++) {
            if (cells[x][y] === CellState.Empty) {
                break endCheck;
            }
        }

        return 'empatou';
    }

    return 'continuar';
}

function initialGridState() {
    return Array(3).fill(0).map(_ => Array(3).fill(CellState.Empty));
}

export default class GameState {
    constructor() {
        this.cells = initialGridState();
        this.playerTurn = true;
    }

    isCellFree(rowIndex, cellIndex) {
        return this.cells[rowIndex][cellIndex] === CellState.Empty;
    }

    setCell(rowIndex, cellIndex) {
        this.cells[rowIndex][cellIndex] = this.playerTurn ? CellState.Player01 : CellState.Player02;
    }

    changeTurn() {
        this.playerTurn = !this.playerTurn;
    }

    reset() {
		this.playerTurn = true;
		this.cells = initialGridState();
	}

    getCurrentPlayer() {
        return this.playerTurn ? CellState.Player01 : CellState.Player02;
    }

    checkForWinState() {
        return checkForWinState(this.cells, this.playerTurn ? CellState.Player01 : CellState.Player02)
    }
}