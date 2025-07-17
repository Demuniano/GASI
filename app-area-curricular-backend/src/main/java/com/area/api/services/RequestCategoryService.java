package com.area.api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.RequestCategoryModel;
import com.area.api.repositories.IRequestCategoryRepository;
@Service
public class RequestCategoryService {
	@Autowired
	IRequestCategoryRepository requestCategoryRepository;

    
	public ArrayList<RequestCategoryModel> getRequestCategorys(){
		return (ArrayList<RequestCategoryModel>)requestCategoryRepository.findAll();
	}
	
	public RequestCategoryModel saveRequestCategory(RequestCategoryModel act) {
		return requestCategoryRepository.save(act);
	}
	
	public Optional<RequestCategoryModel> getById(Long id){
		return requestCategoryRepository.findById(id);
	}
	
	public RequestCategoryModel updateById(RequestCategoryModel request, Long id){
		RequestCategoryModel indicator = requestCategoryRepository.findById(id).get();
		indicator.setName(request.getName());
		return indicator;
	}
	public Boolean deleteRequestCategory (Long id) {
		try {
			requestCategoryRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
}
