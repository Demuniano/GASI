package com.area.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.dto.ParticipantsDTO;
import com.area.api.dto.ParticipantDTO;
import com.area.api.dto.ParticipantActDto;
import com.area.api.models.ParticipantModel;
import com.area.api.repositories.IParticipantRepository;

@Service
public class ParticipantService {
	@Autowired
	IParticipantRepository participantRepository;
	
	public ArrayList<ParticipantModel> getParticipants(){
		return (ArrayList<ParticipantModel>)participantRepository.findAll();
	}
	
	public ParticipantModel saveParticipant(ParticipantModel participant) {
		return participantRepository.save(participant);
	}
	
	public Optional<ParticipantModel> getById(Long id){
		return participantRepository.findById(id);
	}
	
	public ParticipantModel updateById(ParticipantModel request, Long id){
		ParticipantModel participant = participantRepository.findById(id).get();
		participant.setName(request.getName());
		participant.setRole(request.getRole());
		participant.setstate(request.getstate());
		participant.setType(request.getType());
		/*
		participant.setStudent(request.getStudent());
		participant.setTeacher(request.getTeacher());
		participant.setAct(request.getAct());
		*/
		participantRepository.save(participant);
		return participant;
	}
	public Boolean deleteParticipant (Long id) {
		try {
			participantRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	public List<ParticipantsDTO> getParticipantsByAct(Long id) {
        return participantRepository.findByAct(id);
    }
	public List<ParticipantDTO> getAllActiveParticipants() {
        return participantRepository.findAllActiveParticipants();
    }
    public List<ParticipantActDto> getParticipantsByActId(Long actId) {
        return participantRepository.findParticipantsByActId(actId);
    }
}
