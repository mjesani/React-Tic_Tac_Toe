import { useState } from 'react';

export default function Gameboard({ afterSelectSquare, gameBoard }) {
    // We lifted the state up from here because turns were used by both Gameboard and GameLog components.
    // So instead of managing state here we will derive the gameboard from turns that we receive from App.jsx
    // const [gameBoard, setGameBoard] = useState(INITIAL_BOARD);

    // function handleGameBoardCellClick(rowIndex, colIndex) {
    //     setGameBoard(prevBoard =>  {
    //         const newBoard = [...prevBoard.map(innerArrays => [...innerArrays])];
    //         newBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return newBoard;
    //     });
    //     afterSelectSquare();
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => {
                            return <li key={colIndex}>
                                <button onClick={() => afterSelectSquare(rowIndex, colIndex)} disabled={playerSymbol}>{playerSymbol}</button>
                            </li>
                        })}
                    </ol>
                </li>
            ))}
        </ol>
    );
}