export default function GameOver({ winner, isDraw, onPlayAgain }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} wins!</p>}
            {isDraw && <p>It's a draw!</p>}
            <p>
                <button onClick={onPlayAgain}>Play Again!</button>
            </p>

        </div>
    );
}