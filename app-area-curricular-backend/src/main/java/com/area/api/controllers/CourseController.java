package com.area.api.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.area.api.models.MobilityModel;
import com.area.api.models.CourseModel;
import com.area.api.services.CourseService;
import com.area.api.services.MobilityService;

@RestController
@RequestMapping("/api/course")
public class CourseController {
	@Autowired
	private CourseService courseService;
	@Autowired
	private MobilityService mobilityService;
	
	@GetMapping("getAllCourses")
	public ArrayList<CourseModel> getAllCourses(){
		return this.courseService.getCourses();
	}
	/*
	@PostMapping("/newCourse")
	public CourseModel saveCourse(@RequestBody CourseModel Course) {
		return this.CourseService.saveCourse(Course);
	}
	*/
	@PostMapping("/newCourse/{mobilityId}")
	public CourseModel saveCourse(@PathVariable Long mobilityId, @RequestBody CourseModel Course) {	    
	    MobilityModel mobility = mobilityService.getById(mobilityId)
	            .orElseThrow(() -> new RuntimeException("mobility not found with id: " + mobilityId));
	    
	    Course.setMobility(mobility);
	    
	    return courseService.saveCourse(Course);
	}
	@GetMapping(path = "/{id}")
	public Optional<CourseModel> getCourseById(@PathVariable("id")Long id){
		return this.courseService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public CourseModel updateCourseById(@RequestBody CourseModel request,@PathVariable("id") Long CourseId) {
		return this.courseService.updateById(request, CourseId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long CourseId) {
		boolean ok = this.courseService.deleteCourse(CourseId);
		if(ok) {
			return "Course with id" + CourseId + "deleted";
		}
		else {
			return "Error, Course not deleted";
		}
	}
}
