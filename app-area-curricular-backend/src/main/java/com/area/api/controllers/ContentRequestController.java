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

import com.area.api.models.ContentRequestModel;
import com.area.api.services.ContentRequestService;

@RestController
@RequestMapping("/api/contentRequest")
public class ContentRequestController {
	@Autowired
	private ContentRequestService contentRequestService;
	
	@GetMapping("getAllContentRequests")
	public ArrayList<ContentRequestModel> getAllContentRequests(){
		return this.contentRequestService.getContentRequests();
	}
	
	@PostMapping("/newContentRequest")
	public ContentRequestModel saveContentRequest(@RequestBody ContentRequestModel contentRequest) {	    
	    return this.contentRequestService.saveContentRequest(contentRequest);
	}
	@GetMapping(path = "/{id}")
	public Optional<ContentRequestModel> getContentRequestById(@PathVariable("id")Long id){
		return this.contentRequestService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public ContentRequestModel updateContentRequestById(@RequestBody ContentRequestModel request,@PathVariable("id") Long contentRequestId) {
		return this.contentRequestService.updateById(request, contentRequestId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long contentRequestId) {
		boolean ok = this.contentRequestService.deleteContentRequest(contentRequestId);
		if(ok) {
			return "ContentRequest with id" + contentRequestId + "deleted";
		}
		else {
			return "Error, Content Request not deleted";
		}
	}
}
