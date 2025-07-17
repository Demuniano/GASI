import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


const SwalComponent = ({ students, teachers, participants,setParticipants}) => {
    const [selectedType, setSelectedType] = useState('teacher');
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const handleAddParticipant = () => {

        Swal.fire({
            title: 'Agregar Invitado',
            html: `
                <div class="container" style="text-align: left">
                    <div class="form-check text-left">
                        <input class="form-check-input" type="radio" name="participantType" id="studentCheckbox" value="student">
                        <label class="form-check-label" for="studentCheckbox">
                            Estudiante
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="participantType" id="teacherCheckbox" value="teacher" checked>
                        <label class="form-check-label" for="teacherCheckbox">
                            Docente
                        </label>
                    </div>
                </div>
                <select id="participantSelect" class="swal2-input mt-2" placeholder="Nombre" disabled>
                    <option value="">Selecciona un nombre</option>
                </select>
                <div class="mt-4">
                    <select id="typeSelect" class="swal2-input" placeholder="Nombre">
                        <option value="">Seleccione el tipo de participante</option>
                        <option value="1">Invitado</option>
                        <option value="2">Asistente</option>
                        <option value="3">Ausente</option>
                    </select>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí dentro, result.isConfirmed es verdadero si el usuario hizo clic en 'Guardar'
                const select = document.getElementById('participantSelect');
                const selectedId= select.value; // Obtener el valor seleccionado del combo box
                const selectedName = select.options[select.selectedIndex].text; // Obtener el texto seleccionado del combo box
                const type = document.getElementById('typeSelect').value;
                if (selectedName) {
                    console.log('Nombre seleccionado:', actorType);
                    const typePart = type == 1 ? 'Invitado' : type == 2 ? 'Asistente' : 'Ausente';
                    console.log('Tipo seleccionado:', typePart);
                    setParticipants([...participants, {id: selectedId, name: selectedName, type: typePart, actorType: actorType}]);
                }
            }
        });
        let actorType = 'teacher';
        // Obtener el elemento select y cargar los datos iniciales
        const select = document.getElementById('participantSelect');
        select.disabled = false;
        select.innerHTML = teachers.map(teacher => `<option value="${teacher.idTeacher}">${teacher.name}</option>`).join('');
    
        // Agregar un listener de eventos al grupo de checkboxes
        const checkboxes = document.querySelectorAll('input[name="participantType"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const selectedType = event.target.value; // Obtener el valor del checkbox seleccionado
                actorType = selectedType;
                if (selectedType === 'student') {
                    console.log('Checkbox seleccionado:', selectedType);
                    select.disabled = false;
                    select.innerHTML = students.map(student => `<option value="${student.idStudent}">${student.name}</option>`).join('');
                }else {
                    console.log('Checkbox seleccionado:', selectedType);
                    select.disabled = false;
                    select.innerHTML = teachers.map(teacher => `<option value="${teacher.idTeacher}">${teacher.name}</option>`).join('');
                }
                
            });
        });
    };
    

    return (
        <div>
            <button type="button" onClick={() => handleAddParticipant()}>
                <FontAwesomeIcon icon={faCirclePlus} />
            </button>
        </div>
    );
};

export default SwalComponent;
