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

import com.area.api.models.TeacherModel;
import com.area.api.services.TeacherService;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {
	@Autowired
	private TeacherService teacherService;
	
	@GetMapping("getAllTeachers")
	public ArrayList<TeacherModel> getTeacher(){
		return this.teacherService.getTeachers();
	}
	
	@PostMapping("/newTeacher")
	public TeacherModel saveTeacher(@RequestBody TeacherModel act) {
		return this.teacherService.saveTeacher(act);
	}
	
	@GetMapping(path = "/{id}")
	public Optional<TeacherModel> getTeacherById(@PathVariable("id")Long id){
		return this.teacherService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public TeacherModel updateTeacherById(@RequestBody TeacherModel request,@PathVariable("id") Long id) {
		return this.teacherService.updateById(request, id);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long id) {
		boolean ok = this.teacherService.deleteTeacher(id);
		if(ok) {
			return "Teacher with id" + id + "deleted";
		}
		else {
			return "Error, Teacher not deleted";
		}
	}
}
