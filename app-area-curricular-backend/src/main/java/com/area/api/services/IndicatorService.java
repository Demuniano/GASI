package com.area.api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.IndicatorModel;
import com.area.api.repositories.IIndicatorRepository;
@Service
public class IndicatorService {
	@Autowired
	IIndicatorRepository indicatorRepository;

    
	public ArrayList<IndicatorModel> getIndicators(){
		return (ArrayList<IndicatorModel>)indicatorRepository.findAll();
	}
	
	public IndicatorModel saveIndicator(IndicatorModel act) {
		return indicatorRepository.save(act);
	}
	
	public Optional<IndicatorModel> getById(Long id){
		return indicatorRepository.findById(id);
	}
	
	public IndicatorModel updateById(IndicatorModel request, Long id){
		IndicatorModel indicator = indicatorRepository.findById(id).get();
		indicator.setName(request.getName());
		indicator.setDescription(request.getDescription());
		return indicator;
	}
	public Boolean deleteIndicator (Long id) {
		try {
			indicatorRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
}
