import { useState } from 'react';
import Player from './components/Player.jsx';
import Gameboard from './components/Gameboard.jsx';
import GameLog from './components/GameLog.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './components/winning_combinations.js';

const PLAYERS = {
  X: 'Player1',
  O: 'Player2'
}

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const symbol1 = gameBoard[combination[0].row][combination[0].column];
    const symbol2 = gameBoard[combination[1].row][combination[1].column];
    const symbol3 = gameBoard[combination[2].row][combination[2].column];

    if (symbol1 && symbol1 === symbol2 && symbol1 === symbol3) {
      winner = players[symbol1];
      break;
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_BOARD.map(innerArray => [...innerArray])];

  for (const turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }
  return gameBoard;
}

function App() {

  //const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer(prevPlayer => prevPlayer === 'X' ? 'O' : 'X');

    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const newTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return newTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  function resetGame() {
    setGameTurns([]);
  }

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  let isDraw = false;
  if (gameTurns.length === 9 && !winner) {
    isDraw = true;
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onPlayerNameChange={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onPlayerNameChange={handlePlayerNameChange} />
        </ol>

        {(winner || isDraw) && <GameOver winner={winner} isDraw={isDraw} onPlayAgain={resetGame} />}
        <Gameboard afterSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>

      <GameLog logs={gameTurns} />
    </main>
  )
}

export default App
