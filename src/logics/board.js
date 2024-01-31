import {WINNER_COMBOS} from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {
    //revisamos combinaciones ganadoras
    //y vemos si gano x u o o todavia nadie
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]

      ) {
        return boardToCheck[a]
      }
    }
    //si no hay ganador
    return null
  }

  // chequeamos fin del juego a ver si hay empate
export const checkEndGame = (newBoard) =>{
    //si todas las posiciones estan ocupadas 
    //(o sea diferentes a null)
    return newBoard.every((square) => square != null)
  }