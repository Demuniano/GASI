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

import com.area.api.models.StudentModel;
import com.area.api.services.StudentService;

@RestController
@RequestMapping("/api/student")
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	@GetMapping("getAllStudents")
	public ArrayList<StudentModel> getStudent(){
		return this.studentService.getStudents();
	}
	
	@PostMapping("/newStudent")
	public StudentModel saveStudent(@RequestBody StudentModel act) {
		return this.studentService.saveStudent(act);
	}
	
	@GetMapping(path = "/{id}")
	public Optional<StudentModel> getStudentById(@PathVariable("id")Long id){
		return this.studentService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public StudentModel updateStudentById(@RequestBody StudentModel request,@PathVariable("id") Long id) {
		return this.studentService.updateById(request, id);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long id) {
		boolean ok = this.studentService.deleteStudent(id);
		if(ok) {
			return "Student with id" + id + "deleted";
		}
		else {
			return "Error, Student not deleted";
		}
	}
}
