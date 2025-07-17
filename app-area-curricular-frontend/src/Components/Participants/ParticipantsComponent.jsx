import { useEffect,useState,useContext } from "react";
import axios from 'axios';
import AuthContext from '../Auth/AuthContext';

const ParticipantsComponent = () => {
    const [participants, setParticipants] = useState([]);
    const { auth } = useContext(AuthContext);
    const getParticipants = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/participant/getActiveParticipants',{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            console.log(response.data);
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    }
    useEffect(() => {
        getParticipants();
    }
    , []);
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
                        .filter((participant) => participant.type === 'ausente')
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
        </>
     );
}
 
export default ParticipantsComponent;