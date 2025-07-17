package com.area.api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.TeacherModel;
import com.area.api.repositories.ITeacherRepository;

@Service
public class TeacherService {
	@Autowired
	ITeacherRepository teacherRepository;
	
	public ArrayList<TeacherModel> getTeachers(){
		return (ArrayList<TeacherModel>)teacherRepository.findAll();
	}
	
	public TeacherModel saveTeacher(TeacherModel teacher) {
		return teacherRepository.save(teacher);
	}
	
	public Optional<TeacherModel> getById(Long id){
		return teacherRepository.findById(id);
	}
	
	public TeacherModel updateById(TeacherModel request, Long id){
		TeacherModel student = teacherRepository.findById(id).get();
		student.setName(request.getName());
		return student;
	}
	public Boolean deleteTeacher (Long id) {
		try {
			teacherRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
}
