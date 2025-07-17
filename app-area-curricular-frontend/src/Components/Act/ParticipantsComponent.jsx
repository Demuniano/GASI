import React, { useContext } from 'react';
import SwalComponent from './ParticipantsModal';
import axios from 'axios';
import AuthContext from '../Auth/AuthContext';

const ParticipantsComponent = ({ students, teachers, participants, setParticipants,mode }) => {
    const { auth } = useContext(AuthContext);
    const handleParticipantClick = (index) => {
        if (participants[index].id) {
            const updatedParticipants = [...participants];
            updatedParticipants.splice(index, 1);
            setParticipants(updatedParticipants);
        } else {
            const url = `http://localhost:8080/api/participant/${participants[index].participantId}`;
            axios.delete(url,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            const updatedParticipants = [...participants];
            updatedParticipants.splice(index, 1);
            setParticipants(updatedParticipants);
        }
    };

    return (
        <>
            <div className="input-container">
                <div className='text-button'>
                    <h5 htmlFor="participants">Participantes</h5>
                    <SwalComponent
                        students={students}
                        teachers={teachers}
                        participants={participants}
                        setParticipants={setParticipants}   
                 />
                </div>
            </div>
            <div className="input-container">
                <label htmlFor="participants">Asistentes:</label>
            </div>
            <div className="input-container">
                <ul>
                    {participants
                        .filter((participant) => participant.type === 'Asistente')
                        .map((participant, index) => (
                            <li
                                key={index}
                                className="participant-item"
                                onClick={() => handleParticipantClick(index)}
                            >
                                {participant.name}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="input-container">
                <label htmlFor="participants">Ausentes:</label>
            </div>
            <div className="input-container">
                <ul>
                    {participants
                        .filter((participant) => participant.type === 'Ausente')
                        .map((participant, index) => (
                            <li
                                key={index}
                                className="participant-item"
                                onClick={() => handleParticipantClick(index)}
                            >
                                {participant.name}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="input-container">
                <label htmlFor="participants">Invitados:</label>
            </div>
            <div className="input-container">
                <ul>
                    {participants
                        .filter((participant) => participant.type === 'Invitado')
                        .map((participant, index) => (
                            <li
                                key={index}
                                className="participant-item"
                                onClick={() => handleParticipantClick(index)}
                            >
                                {participant.name}
                            </li>
                        ))}
                </ul>
            </div>
            
            
        </>
    );
};

export default ParticipantsComponent;
