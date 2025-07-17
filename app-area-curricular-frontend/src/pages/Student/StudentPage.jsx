import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import StudentListComponent from '../../Components/Student/StudentListComponent';
import '../../sass/Student/StudentPage.scss';
import AuthContext from '../../Components/Auth/AuthContext';

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/student/getAllStudents',{
                    headers: {
                      Authorization: `Bearer ${auth.token}`
                    }
                  });
                console.log(response.data);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="student-page-container container">
            <StudentListComponent students={students} />
        </div>
    );
};

export default StudentPage;
