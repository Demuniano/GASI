package com.area.api.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.area.api.models.RecommendationModel;
import com.area.api.models.DetailOrderPaperModel;
import com.area.api.services.DetailOrderPaperService;
import com.area.api.services.RecommendationService;

@RestController
@RequestMapping("/api/recommendation")
public class RecommendationController {
	@Autowired
	private RecommendationService recommendationService;
	@Autowired
	private DetailOrderPaperService detailOrderPaperService;
	
	@GetMapping("getAllRecommendations")
	public ArrayList<RecommendationModel> getAllRecommendations(){
		return this.recommendationService.getRecommendations();
	}

	@PostMapping("/newRecommendation/{detailOrderPaperId}")
	public RecommendationModel saveRecommendation(@PathVariable Long detailOrderPaperId,@RequestBody RecommendationModel dev) {	    
	    DetailOrderPaperModel detail = detailOrderPaperService.getById(detailOrderPaperId)
	            .orElseThrow(() -> new RuntimeException("Recommendation not found with id: " + detailOrderPaperId));
	    
	    dev.setDetailOrderPaper(detail);
	    return recommendationService.saveRecommendation(dev);
	}
	@GetMapping(path = "/{id}")
	public Optional<RecommendationModel> getRecommendationById(@PathVariable("id")Long id){
		return this.recommendationService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public RecommendationModel updateRecommendationById(@RequestBody RecommendationModel request,@PathVariable("id") Long mobilityId) {
		return this.recommendationService.updateById(request, mobilityId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long mobilityId) {
		boolean ok = this.recommendationService.deleteRecommendation(mobilityId);
		if(ok) {
			return "Recommendation with id" + mobilityId + "deleted";
		}
		else {
			return "Error, dev not deleted";
		}
	}
	@GetMapping("/detail/{detailOrderPaperId}")
    public Optional<RecommendationModel> getRecommendationByDetailOrderPaperId(@PathVariable Long detailOrderPaperId) {
        return recommendationService.getRecommendationByDetailOrderPaperId(detailOrderPaperId);
    }
}
