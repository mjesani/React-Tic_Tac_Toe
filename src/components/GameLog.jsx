export default function GameLog({ logs }) {
    return(
        <ol id="log">
            {logs.map(log => (
                <li key={`${log.square.row}${log.square.col}`}>`Player {log.player} played on {log.square.row}, {log.square.col}`</li>
            ))}
        </ol>
    );
}