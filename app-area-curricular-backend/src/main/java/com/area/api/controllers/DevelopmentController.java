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

import com.area.api.models.DevelopmentModel;
import com.area.api.models.DetailOrderPaperModel;
import com.area.api.services.DetailOrderPaperService;
import com.area.api.services.DevelopmentService;



@RestController
@RequestMapping("/api/development")
public class DevelopmentController {
	@Autowired
	private DevelopmentService developmentService;
	@Autowired 
	private DetailOrderPaperService detailOrderPaperService;

	@GetMapping("getAllDevelopments")
	public ArrayList<DevelopmentModel> getAllDevelopments(){
		return this.developmentService.getDevelopments();
	}

	@PostMapping("/newDevelopment/{detailOrderPaperId}")
	public DevelopmentModel saveDevelopment(@PathVariable Long detailOrderPaperId,@RequestBody DevelopmentModel dev) {	    
	    DetailOrderPaperModel detail = detailOrderPaperService.getById(detailOrderPaperId)
	            .orElseThrow(() -> new RuntimeException("Development not found with id: " + detailOrderPaperId));
	    
	    dev.setDetailOrderPaper(detail);
	    return developmentService.saveDevelopment(dev);
	}
	@GetMapping(path = "/{id}")
	public Optional<DevelopmentModel> getDevelopmentById(@PathVariable("id")Long id){
		return this.developmentService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public DevelopmentModel updateDevelopmentById(@RequestBody DevelopmentModel request,@PathVariable("id") Long mobilityId) {
		return this.developmentService.updateById(request, mobilityId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long mobilityId) {
		boolean ok = this.developmentService.deleteDevelopment(mobilityId);
		if(ok) {
			return "Development with id" + mobilityId + "deleted";
		}
		else {
			return "Error, dev not deleted";
		}
	}

}
