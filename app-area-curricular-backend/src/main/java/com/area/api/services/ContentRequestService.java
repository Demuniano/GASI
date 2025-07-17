package com.area.api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.ContentRequestModel;
import com.area.api.repositories.IContentRequestRepository;

@Service
public class ContentRequestService {
	@Autowired
	IContentRequestRepository contentRequestRepository;

    
	public ArrayList<ContentRequestModel> getContentRequests(){
		return (ArrayList<ContentRequestModel>)contentRequestRepository.findAll();
	}
	
	public ContentRequestModel saveContentRequest(ContentRequestModel act) {
		return contentRequestRepository.save(act);
	}
	
	public Optional<ContentRequestModel> getById(Long id){
		return contentRequestRepository.findById(id);
	}
	
	public ContentRequestModel updateById(ContentRequestModel request, Long id){
		ContentRequestModel requestObj = contentRequestRepository.findById(id).get();
		requestObj.setDescription(request.getDescription());
		return requestObj;
	}
	public Boolean deleteContentRequest (Long id) {
		try {
			contentRequestRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
}
