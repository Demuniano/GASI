package com.area.api.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.RecommendationModel;
import com.area.api.repositories.IRecommendationRepository;

@Service
public class RecommendationService {
	@Autowired
	IRecommendationRepository recommendationRepository;

    
	public ArrayList<RecommendationModel> getRecommendations(){
		return (ArrayList<RecommendationModel>)recommendationRepository.findAll();
	}
	
	public RecommendationModel saveRecommendation(RecommendationModel rec) {
		return recommendationRepository.save(rec);
	}
	
	public Optional<RecommendationModel> getById(Long id){
		return recommendationRepository.findById(id);
	}
	
	public RecommendationModel updateById(RecommendationModel request, Long id){
		RecommendationModel indicator = recommendationRepository.findById(id).get();
		indicator.setDescription(request.getDescription());
		return indicator;
	}
	public Boolean deleteRecommendation (Long id) {
		try {
			recommendationRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	public Optional<RecommendationModel> getRecommendationByDetailOrderPaperId(Long detailOrderPaperId) {
        return recommendationRepository.findByDetailOrderPaperId(detailOrderPaperId);
    }
}
