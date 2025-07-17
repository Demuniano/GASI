package com.area.api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.RequestTypeModel;
import com.area.api.repositories.IRequestTypeRepository;
@Service
public class RequestTypeService {
	@Autowired
	IRequestTypeRepository requestTypeRepository;

    
	public ArrayList<RequestTypeModel> getRequestTypes(){
		return (ArrayList<RequestTypeModel>)requestTypeRepository.findAll();
	}
	
	public RequestTypeModel saveRequestType(RequestTypeModel act) {
		return requestTypeRepository.save(act);
	}
	
	public Optional<RequestTypeModel> getById(Long id){
		return requestTypeRepository.findById(id);
	}
	
	public RequestTypeModel updateById(RequestTypeModel request, Long id){
		RequestTypeModel requestType = requestTypeRepository.findById(id).get();
		requestType.setName(request.getName());
		requestType.setRequestCategory(request.getRequestCategory());
		return requestType;
	}
	public Boolean deleteRequestType (Long id) {
		try {
			requestTypeRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
}
