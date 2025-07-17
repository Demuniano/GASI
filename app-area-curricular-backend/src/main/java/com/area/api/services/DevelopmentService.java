package com.area.api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.DevelopmentModel;
import com.area.api.repositories.IDevelopmentRepository;

@Service
public class DevelopmentService {
	@Autowired
	IDevelopmentRepository developmentRepository;

    
	public ArrayList<DevelopmentModel> getDevelopments(){
		return (ArrayList<DevelopmentModel>)developmentRepository.findAll();
	}
	
	public DevelopmentModel saveDevelopment(DevelopmentModel dev) {
		return developmentRepository.save(dev);
	}
	
	public Optional<DevelopmentModel> getById(Long id){
		return developmentRepository.findById(id);
	}
	
	public DevelopmentModel updateById(DevelopmentModel request, Long id){
		DevelopmentModel indicator = developmentRepository.findById(id).get();
		indicator.setDescription(request.getDescription());
		return indicator;
	}
	public Boolean deleteDevelopment (Long id) {
		try {
			developmentRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
}
