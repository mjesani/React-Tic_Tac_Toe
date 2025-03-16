import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onPlayerNameChange }) {
    const [isEdit, setIsEdit] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditClick() {
        // setIsEdit(!isEdit); //Wrong way of updating state when it depends on the previous state. React schedules the changes so state won't be updated immediately.
        setIsEdit(prevState => !prevState); //Correct way accepts function that returns the new state
        if (isEdit) {
            onPlayerNameChange(symbol, playerName);
        }
    }

    function handleNameChange(event) {
        setPlayerName(event.target.value);
    }

    let playerHtml = <span className="player-name">{playerName}</span>;

    if (isEdit) {
        playerHtml = <input type="text" required value={playerName} onChange={handleNameChange} />;
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {playerHtml}
                {/* {!isEdit && <span className="player-name">{name}</span>}
                {isEdit && <input type="text" required value={name} />} */}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEdit ? 'Save' : 'Edit'}</button>
        </li>
    );
}