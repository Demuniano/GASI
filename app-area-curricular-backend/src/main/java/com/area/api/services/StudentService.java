package com.area.api.services;

import java.util.ArrayList;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.StudentModel;
import com.area.api.repositories.IStudentRepository;
@Service
public class StudentService {
	@Autowired
	IStudentRepository studentRepository;
	
	public ArrayList<StudentModel> getStudents(){
		return (ArrayList<StudentModel>)studentRepository.findAll();
	}
	
	public StudentModel saveStudent(StudentModel student) {
		Optional<StudentModel> optinalStudent = studentRepository.findById(student.getIdStudent());
		if (optinalStudent.isEmpty()) {
			return studentRepository.save(student);
		} else {
			throw new RuntimeException("StudentModel not found with id: " + student.getIdStudent());
		}

	}
	
	public Optional<StudentModel> getById(Long id){
		return studentRepository.findById(id);
	}
	
	public StudentModel updateById(StudentModel request, Long id){
		StudentModel student = studentRepository.findById(id).get();
		student.setName(request.getName());
		student.setEmail(request.getEmail());
		return studentRepository.save(student);
	}
	public Boolean deleteStudent (Long id) {
		try {
			studentRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
}
