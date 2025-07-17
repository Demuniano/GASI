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

import com.area.api.dto.ParticipantsDTO;
import com.area.api.dto.ParticipantDTO;
import com.area.api.dto.ParticipantActDto;
import com.area.api.models.ParticipantModel;
import com.area.api.services.ParticipantService;


@RestController
@RequestMapping("/api/participant")
public class ParticipantController {
	@Autowired
	private ParticipantService participantService;

	@GetMapping("getAllParticipants")
	public ArrayList<ParticipantModel> getParticipant(){
		return this.participantService.getParticipants();
	}
	@GetMapping("getActiveParticipants")
    public List<ParticipantDTO> getAllActiveParticipants() {
        return participantService.getAllActiveParticipants();
    }
	@PostMapping("/newParticipant")
	public ParticipantModel saveParticipant(@RequestBody ParticipantModel act) {
		return this.participantService.saveParticipant(act);
	}
	/*
	@PostMapping("/newParticipantTr/{actId}/{teacherId}")
	public ParticipantModel saveParticipantTr(@PathVariable Long actId, @PathVariable Long teacherId, @RequestBody ParticipantModel participant) {	    
		ActModel actModel = actService.getById(actId)
	            .orElseThrow(() -> new RuntimeException("Act not found with id: " + actId));

	    TeacherModel teacher = teacherService.getById(teacherId)
	            .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + teacherId));

	    participant.setAct(actModel);
	    participant.setTeacher(teacher);

	    return participantService.saveParticipant(participant);
	}
	@PostMapping("/newParticipantSt/{actId}/{studentId}")
	public ParticipantModel saveParticipantSt(@PathVariable Long actId, @PathVariable Long studentId, @RequestBody ParticipantModel participant) {	    
		ActModel actModel = actService.getById(actId)
	            .orElseThrow(() -> new RuntimeException("Act not found with id: " + actId));

	    StudentModel student = studentService.getById(studentId)
	            .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + studentId));

	    participant.setAct(actModel);
	    participant.setStudent(student);

	    return participantService.saveParticipant(participant);
	}
	*/
	@GetMapping(path = "/{id}")
	public Optional<ParticipantModel> getParticipantById(@PathVariable("id")Long id){
		return this.participantService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public ParticipantModel updateParticipantById(@RequestBody ParticipantModel request,@PathVariable("id") Long id) {
		return this.participantService.updateById(request, id);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long id) {
		boolean ok = this.participantService.deleteParticipant(id);
		if(ok) {
			return "Participant with id" + id + "deleted";
		}
		else {
			return "Error, Participant not deleted";
		}
	}
	@GetMapping(path = "/act/{id}")
    public List<ParticipantsDTO> getActsByPlace(@PathVariable Long id) {
        return participantService.getParticipantsByAct(id);
    }
    @GetMapping(path = "/byAct/{actId}")
    public List<ParticipantActDto> getParticipantsByActId(@PathVariable Long actId) {
        return participantService.getParticipantsByActId(actId);
    }
}
