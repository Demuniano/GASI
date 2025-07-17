package com.area.api.controllers;

import java.util.ArrayList;
import java.util.List;
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

import com.area.api.models.ActModel;
import com.area.api.services.ActService;
import com.area.api.dto.ActRequestStateDTO;

@RestController
@RequestMapping("/api/act")
public class ActController {
	@Autowired
	private ActService actService;
	
	@GetMapping("getAllActs")
	public ArrayList<ActModel> getAllActs(){
		return this.actService.getActs();
	}
	
	@PostMapping("/newAct")
	public ActModel saveAct(@RequestBody ActModel act) {
		return this.actService.saveAct(act);
	}
	
	@GetMapping(path = "/{id}")
	public Optional<ActModel> getActById(@PathVariable("id")Long id){
		return this.actService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public ActModel updateActById(@RequestBody ActModel request,@PathVariable("id") Long actId) {
		return this.actService.updateById(request, actId);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long actId) {
		boolean ok = this.actService.deleteAct(actId);
		if(ok) {
			return "Act with id" + actId + "deleted";
		}
		else {
			return "Error, act not deleted";
		}
	}
	 @PostMapping("/{actId}/{participantId}")
	    public ActModel addParticipanteToActa(@PathVariable Long actId, @PathVariable Long participantId) {
	        return actService.addParticipantToAct(actId, participantId);
	    }
    @GetMapping("/{actId}/requestStates")
    public List<ActRequestStateDTO> getActRequestStates(@PathVariable Long actId) {
        return actService.getActRequestStates(actId);
    }
}
