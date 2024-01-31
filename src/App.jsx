
import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

import {Square} from "./components/Square.jsx"
import {TURNS} from "./constants.js"
import {checkWinnerFrom, checkEndGame} from "./logics/board.js"
import {WinnerModal} from "./components/WinnerModal.jsx"


function App() {
  // Inicializar: Estado de cada cuadro del tablero
  const [board, setBoard] = useState(() =>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null)
  }
  )

  //Inicializar: Estado de turno de jugador
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //buscar ganador con un nuevo estado
  //null no hay ganador, false es empate
  const [winner, setWinner] = useState(null)

  

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }




  // Actualiza tablero
  const updateBoard = (index) => {
    //no actualiza si la posicion ya esta marcada
    if (board[index] || winner) return
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn // x u o
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar mi partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      for (let y = 0; y < 20; y++) {
        confetti()
        
      }
      

      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false) // empate
  }
  }

  return (
    <main className='board'>
      <h1>TaTeTi</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}

              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
    
    </main >
  )
}

export default App
