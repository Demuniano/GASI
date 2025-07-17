package com.area.api.controllers;

import java.util.ArrayList;
import java.util.List;
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

import com.area.api.models.IndicatorModel;
import com.area.api.models.MobilityModel;
import com.area.api.models.RequestModel;
import com.area.api.models.StudentModel;
import com.area.api.dto.MobilityRequestDTO;
import com.area.api.services.IndicatorService;
import com.area.api.services.MobilityService;
import com.area.api.services.RequestService;
import com.area.api.services.StudentService;
@RestController
@RequestMapping("/api/mobility")
public class MobilityController {
	@Autowired
	private MobilityService mobilityService;
	@Autowired
	private IndicatorService indicatorService;
	@Autowired
	private RequestService requestService;
	
	@GetMapping("getAllMobilitys")
	public ArrayList<MobilityModel> getAllMobilitys(){
		return this.mobilityService.getMobilitys();
	}
	/*
	@PostMapping("/newMobility")
	public MobilityModel saveMobility(@RequestBody MobilityModel mobility) {
		return this.mobilityService.saveMobility(mobility);
	}
	*/
	@PostMapping("/newMobility/{indicatorId}/{requestId}")
	public MobilityModel saveMobility(@PathVariable Long indicatorId,@PathVariable Long requestId, @RequestBody MobilityModel mobility) {	    
	    IndicatorModel indicator = indicatorService.getById(indicatorId)
	            .orElseThrow(() -> new RuntimeException("Indicator not found with id: " + indicatorId));
	    RequestModel request = requestService.getById(requestId)
	            .orElseThrow(() -> new RuntimeException("request not found with id: " + requestId));
	    
	    mobility.setIndicator(indicator);
	    mobility.setRequest(request);
	    
	    return mobilityService.saveMobility(mobility);
	}
	@GetMapping(path = "/{id}")
	public Optional<MobilityModel> getMobilityById(@PathVariable("id")Long id){
		return this.mobilityService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public MobilityModel updateMobilityById(@RequestBody MobilityModel request,@PathVariable("id") Long mobilityId) {
		return this.mobilityService.updateById(request, mobilityId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long mobilityId) {
		boolean ok = this.mobilityService.deleteMobility(mobilityId);
		if(ok) {
			return "Mobility with id" + mobilityId + "deleted";
		}
		else {
			return "Error, mobility not deleted";
		}
	}
	@DeleteMapping("/deleteByActId/{actId}")
    public ResponseEntity<String> deleteMobilityByActId(@PathVariable Long actId) {
        try {
            mobilityService.deleteMobilityByActId(actId);
            return ResponseEntity.ok("Deletion successful");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting mobility: " + e.getMessage());
        }
    }
	@GetMapping("/getByActId/{actId}")
    public List<MobilityRequestDTO> getMobilityRequests(@PathVariable Long actId) {
        return mobilityService.getMobilityRequestDTOs(actId);
    }
}
