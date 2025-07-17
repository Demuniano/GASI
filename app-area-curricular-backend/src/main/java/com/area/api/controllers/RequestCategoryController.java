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

import com.area.api.models.RequestCategoryModel;
import com.area.api.services.RequestCategoryService;
@RestController
@RequestMapping("/api/category")
public class RequestCategoryController {
	@Autowired
	private RequestCategoryService requestCategoryService;
	
	@GetMapping("getAllRequestCategorys")
	public ArrayList<RequestCategoryModel> getAllRequestCategorys(){
		return this.requestCategoryService.getRequestCategorys();
	}
	
	@PostMapping("/newRequestCategory")
	public RequestCategoryModel saveRequestCategory(@RequestBody RequestCategoryModel requestCategory) {
		return this.requestCategoryService.saveRequestCategory(requestCategory);
	}
	
	@GetMapping(path = "/{id}")
	public Optional<RequestCategoryModel> getRequestCategoryById(@PathVariable("id")Long id){
		return this.requestCategoryService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public RequestCategoryModel updateRequestCategoryById(@RequestBody RequestCategoryModel request,@PathVariable("id") Long requestCategoryId) {
		return this.requestCategoryService.updateById(request, requestCategoryId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long requestCategoryId) {
		boolean ok = this.requestCategoryService.deleteRequestCategory(requestCategoryId);
		if(ok) {
			return "RequestCategory with id" + requestCategoryId + "deleted";
		}
		else {
			return "Error, requestCategory not deleted";
		}
	}
}
