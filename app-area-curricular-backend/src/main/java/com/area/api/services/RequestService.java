package com.area.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.dto.RequestDTO;
import com.area.api.models.RequestModel;
import com.area.api.repositories.IRequestRepository;
import com.area.api.dto.RequestDetailsDTO;

@Service
public class RequestService {
	@Autowired
	IRequestRepository requestRepository;

    
	public ArrayList<RequestModel> getRequests(){
		return (ArrayList<RequestModel>)requestRepository.findAll();
	}
	
	public RequestModel saveRequest(RequestModel act) {
		return requestRepository.save(act);
	}
	
	public Optional<RequestModel> getById(Long id){
		return requestRepository.findById(id);
	}
	
	public RequestModel updateById(RequestModel request, Long id){
		RequestModel requestObj = requestRepository.findById(id).get();
		requestObj.setState(request.getState());
		return requestRepository.save(requestObj);
	}
	public Boolean deleteRequest (Long id) {
		try {
			requestRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	public Optional<RequestDTO> getRequestIdAndRequestTypeId(Long idRequest) {
        return requestRepository.findRequestIdAndRequestTypeId(idRequest);
    }
	public List<RequestDetailsDTO> getRequestDetails(Long idStudent) {
        return requestRepository.findRequestDetailsByStudentId(idStudent);
    }
}
