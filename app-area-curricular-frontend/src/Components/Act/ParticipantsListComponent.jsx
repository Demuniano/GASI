import React from 'react';

const ParticipantsListComponent = ({ participants,actorType }) => {
    console.log('Nombre seleccionado:', actorType, participants);
    return (
        <div className="input-container">
            <ul>
            {participants.filter(participant => participant.type === actorType).map((participant, index) => (
                <li key={index}>{participant.name}</li>
            ))}
            </ul>
        </div>
    );
};

export default ParticipantsListComponent;
