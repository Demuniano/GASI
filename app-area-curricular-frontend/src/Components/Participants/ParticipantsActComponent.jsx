import { useEffect,useState } from "react";
import axios from 'axios';

const ParticipantsComponent = ({participants}) => {


    return ( 
        <>
         <div className="input-container">
                <label htmlFor="participants">Asistentes:</label>
            </div>
            <div className="input-container">
                <ul>
                    {participants
                        .filter((participant) => participant.type === 'asistente')
                        .map((participant, index) => (
                            <li
                                key={index}
                                className=""
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
                        .filter((participant) => participant.type === 'invitado')
                        .map((participant, index) => (
                            <li
                                key={index}
                                className=""
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
                        .filter((participant) => participant.type === 'ausente')
                        .map((participant, index) => (
                            <li
                                key={index}
                                className=""
                            >
                                {participant.name}
                            </li>
                        ))}
                </ul>
            </div>
        </>
     );
}
 
export default ParticipantsComponent;