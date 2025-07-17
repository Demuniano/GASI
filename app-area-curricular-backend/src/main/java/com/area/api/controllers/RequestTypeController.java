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
import com.area.api.models.RequestModel;
import com.area.api.models.RequestTypeModel;
import com.area.api.models.StudentModel;
import com.area.api.services.RequestCategoryService;
import com.area.api.services.RequestTypeService;
@RestController
@RequestMapping("/api/requestType")
public class RequestTypeController {
	@Autowired
	private RequestTypeService requestTypeService;
	@Autowired
	private RequestCategoryService requestCategoryService;
	
	@GetMapping("getAllRequestTypes")
	public ArrayList<RequestTypeModel> getAllRequestTypes(){
		return this.requestTypeService.getRequestTypes();
	}
	/*
	@PostMapping("/newRequestType")
	public RequestTypeModel saveRequestType(@RequestBody RequestTypeModel mobility) {
		return this.requestTypeService.saveRequestType(mobility);
	}*/
	@PostMapping("/newRequestType/{requestCategoryId}")
	public RequestTypeModel saveRequest(@PathVariable Long requestCategoryId, @RequestBody RequestTypeModel requestType) {	    
	    RequestCategoryModel requestCategory = requestCategoryService.getById(requestCategoryId)
	            .orElseThrow(() -> new RuntimeException("Request type not found with id: " + requestCategoryId));
	    
	    requestType.setRequestCategory(requestCategory);

	    return requestTypeService.saveRequestType(requestType);
	}
	
	@GetMapping(path = "/{id}")
	public Optional<RequestTypeModel> getRequestTypeById(@PathVariable("id")Long id){
		return this.requestTypeService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public RequestTypeModel updateRequestTypeById(@RequestBody RequestTypeModel request,@PathVariable("id") Long requestTypeId) {
		return this.requestTypeService.updateById(request, requestTypeId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long requestTypeId) {
		boolean ok = this.requestTypeService.deleteRequestType(requestTypeId);
		if(ok) {
			return "RequestType with id" + requestTypeId + "deleted";
		}
		else {
			return "Error, mobility not deleted";
		}
	}
}
