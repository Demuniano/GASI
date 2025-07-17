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

import com.area.api.models.IndicatorModel;
import com.area.api.models.RequestModel;
import com.area.api.models.RequestTypeModel;
import com.area.api.models.StudentModel;
import com.area.api.services.IndicatorService;
import com.area.api.services.RequestTypeService;
@RestController
@RequestMapping("/api/indicator")
public class IndicatorController {
	@Autowired
	private IndicatorService indicatorService;
	@Autowired
	private RequestTypeService requestTypeService;
	
	@GetMapping("getAllIndicators")
	public ArrayList<IndicatorModel> getAllIndicators(){
		return this.indicatorService.getIndicators();
	}
	/*
	@PostMapping("/newIndicator")
	public IndicatorModel saveIndicator(@RequestBody IndicatorModel mobility) {
		return this.indicatorService.saveIndicator(mobility);
	}
	*/
	@PostMapping("/newIndicator/{requestTypeId}")
	public IndicatorModel saveIndicator(@PathVariable Long requestTypeId, @RequestBody IndicatorModel indicator) {	    
	    RequestTypeModel requestType = requestTypeService.getById(requestTypeId)
	            .orElseThrow(() -> new RuntimeException("Request type not found with id: " + requestTypeId));
	    
	    indicator.setRequestType(requestType);
	    
	    return indicatorService.saveIndicator(indicator);
	}
	@GetMapping(path = "/{id}")
	public Optional<IndicatorModel> getIndicatorById(@PathVariable("id")Long id){
		return this.indicatorService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public IndicatorModel updateIndicatorById(@RequestBody IndicatorModel request,@PathVariable("id") Long mobilityId) {
		return this.indicatorService.updateById(request, mobilityId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long mobilityId) {
		boolean ok = this.indicatorService.deleteIndicator(mobilityId);
		if(ok) {
			return "Indicator with id" + mobilityId + "deleted";
		}
		else {
			return "Error, indicator not deleted";
		}
	}
}
