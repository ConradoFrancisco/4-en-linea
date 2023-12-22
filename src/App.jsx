import { useState } from 'react'

import './App.css'
const Square = ({children,index,updateBoard,isSeleccted}) =>{

  const handleClick = () =>{
    updateBoard(index)
  }

  const className = `square ${isSeleccted ? 'is-selected' : ''}`
  return(
    <div onClick={handleClick} key={index} className={className}>
      {children}
    </div>
  )
}
const WINNER_COMBOS = [
  //combos laterales
  //linea 1
  [0,1,2,3],
  [1,2,3,4],
  [2,3,4,5],
  //linea 2
  [6,7,8,9],
  [7,8,9,10],
  [8,9,10,11],
  //linea 3
  [12,13,14,15],
  [13,14,15,16],
  [14,15,16,17],
  //linea 4
  [18,19,20,21],
  [19,20,21,22],
  [20,21,22,23],
  //linea 5
  [24,25,26,27],
  [25,26,27,28],
  [26,27,28,29],
  //combos Verticales
  //linea 1
  [0,6,12,18],
  [6,12,18,24],
  //linea 2
  [1,7,13,19],
  [7,13,19,25],
  //linea 3
  [2,8,14,20],
  [8,14,20,26],
  //linea 4
  [3,9,15,21],
  [9,15,21,27],
  //linea 5
  [4,10,16,22],
  [10,16,22,28],
  //linea 6
  [5,11,17,23],
  [11,17,23,29],
  // DIAGONALES DERECHAS
  //DIAGONAL 0
  [0,7,14,21],
  [7,14,21,28],
 // DIAGONAL 1
  [1,8,15,22],
  [8,15,22,29],
  //DIAGONAL 2
  [2,9,16,23],
  //DIAGONAL 6
  [6,13,20,27],
  // DIAGONALES IZQUIERDAS
  //DIAGONAL 5
  [5,10,15,20],
  [10,15,20,25],
  //DIAGONAL 4
  [4,9,14,19],
  [9,14,19,24],
  //DIAGONAL 3
  [3,8,13,18],
  //DIAGONAL 11
  [11,16,21,26]
  
]

function App() {
  const TURNS = {
    X:'x',
    O:'o'
  }
  const [board,setBoard] = useState(Array(30).fill(null));

  const checkWinner = (boardToCheck) =>{
    for (const combo of WINNER_COMBOS){
      const [a,b,c,d] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] &&
        boardToCheck[a] === boardToCheck[d]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }
  const [turn,setTurn] = useState(TURNS.X)

  const [winner,setWinner] = useState(null)

  const updateBoard = (index) =>{
    if(board[index] !== null || board[index + 6] === null || winner ) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner(newWinner)
    }
    
  }

  return (
      <main className='board'>
        <h1>Ta-Te-Ti</h1>
        <section className='game'>
          {board.map((_,index)=>{
            return(
              <Square
                updateBoard={updateBoard}
                index={index}
                key={index}
              >
                {board[index]}
              </Square>
            )
          })}
        </section>
        <section className='turn'>
          <Square isSeleccted={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSeleccted={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>
        <button>
          Reiniciar juego
        </button>
      </main>
  )
}

export default App
