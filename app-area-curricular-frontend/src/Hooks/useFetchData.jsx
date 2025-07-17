import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Components/Auth/AuthContext';
const useFetchData = () => {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/student/getAllStudents',{
                    headers: {
                      Authorization: `Bearer ${auth.token}`
                    }
                  });
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/teacher/getAllTeachers',{
                    headers: {
                      Authorization: `Bearer ${auth.token}`
                    }
                  });
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchStudents();
        fetchTeachers();
    }, []);

    return { students, teachers };
};

export default useFetchData;
