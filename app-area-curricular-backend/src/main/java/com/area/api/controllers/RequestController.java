package com.area.api.controllers;

import java.util.ArrayList;
import java.util.List;
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

import com.area.api.dto.RequestDTO;
import com.area.api.models.ActModel;
import com.area.api.models.ContentRequestModel;
import com.area.api.models.ParticipantModel;
import com.area.api.models.RequestModel;
import com.area.api.models.RequestTypeModel;
import com.area.api.models.StudentModel;
import com.area.api.services.ContentRequestService;
import com.area.api.services.RequestService;
import com.area.api.services.RequestTypeService;
import com.area.api.services.StudentService;
import com.area.api.dto.RequestDetailsDTO;

@RestController
@RequestMapping("/api/request")
public class RequestController {
	@Autowired
	private RequestService requestService;
	@Autowired
	private StudentService studentService;
	@Autowired
	private RequestTypeService requestTypeService;
	@Autowired
	private ContentRequestService contentRequestService;
	@GetMapping("getAllRequests")
	public ArrayList<RequestModel> getAllRequests(){
		return this.requestService.getRequests();
	}
	/*
	@PostMapping("/newRequest")
	public RequestModel saveRequest(@RequestBody RequestModel mobility) {
		return this.requestService.saveRequest(mobility);
	}*/
	@PostMapping("/newRequest/{requestTypeId}/{studentId}/{contentId}")
	public RequestModel saveRequest(@PathVariable Long requestTypeId,@PathVariable Long studentId,@PathVariable Long contentId,@RequestBody RequestModel request) {	    
	    StudentModel student = studentService.getById(studentId)
	            .orElseThrow(() -> new RuntimeException("student not found with id: " + studentId));
	    RequestTypeModel requestType = requestTypeService.getById(requestTypeId)
	            .orElseThrow(() -> new RuntimeException("Request type not found with id: " + requestTypeId));
	    ContentRequestModel contentRequest = contentRequestService.getById(contentId)
	            .orElseThrow(() -> new RuntimeException("Content Request not found with id: " + contentId));
	    request.setStudent(student);
	    request.setRequestType(requestType);
	    request.setContentRequest(contentRequest);
	    request.setState("Pendiente");
	    return requestService.saveRequest(request);
	}
	@GetMapping(path = "/{id}")
	public Optional<RequestModel> getRequestById(@PathVariable("id")Long id){
		return this.requestService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public RequestModel updateRequestById(@RequestBody RequestModel request,@PathVariable("id") Long mobilityId) {
		return this.requestService.updateById(request, mobilityId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long mobilityId) {
		boolean ok = this.requestService.deleteRequest(mobilityId);
		if(ok) {
			return "Request with id" + mobilityId + "deleted";
		}
		else {
			return "Error, request not deleted";
		}
	}
	@GetMapping("/typeRequest/{idRequest}")
    public Optional<RequestDTO> getRequestIdAndRequestTypeId(@PathVariable Long idRequest) {
        return requestService.getRequestIdAndRequestTypeId(idRequest);
    }
	 @GetMapping("/details/{idStudent}")
	    public List<RequestDetailsDTO> getRequestDetails(@PathVariable Long idStudent) {
	        return requestService.getRequestDetails(idStudent);
	    }
}
