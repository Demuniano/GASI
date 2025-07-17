package com.area.api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.CourseModel;
import com.area.api.repositories.ICourseRepository;

@Service
public class CourseService {
	@Autowired
	ICourseRepository courseRepository;

	public ArrayList<CourseModel> getCourses(){
		return (ArrayList<CourseModel>)courseRepository.findAll();
	}
	
	public CourseModel saveCourse(CourseModel act) {
		return courseRepository.save(act);
	}
	
	public Optional<CourseModel> getById(Long id){
		return courseRepository.findById(id);
	}
	
	public CourseModel updateById(CourseModel request, Long id){
		CourseModel requestObj = courseRepository.findById(id).get();
		requestObj.setName(request.getName());
		return requestObj;
	}
	public Boolean deleteCourse (Long id) {
		try {
			courseRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
}
