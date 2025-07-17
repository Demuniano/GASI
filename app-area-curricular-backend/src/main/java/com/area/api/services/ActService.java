package com.area.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.dto.ActRequestStateDTO;
import com.area.api.models.ActModel;
import com.area.api.models.ParticipantModel;
import com.area.api.repositories.IActRepository;
import com.area.api.repositories.IParticipantRepository;

@Service
public class ActService {
	@Autowired
	IActRepository actRepository;
	@Autowired
	IParticipantRepository participantRepository;
    
	public ArrayList<ActModel> getActs(){
		return (ArrayList<ActModel>)actRepository.findAll();
	}
	
	public ActModel saveAct(ActModel act) {
		Optional<ActModel> optionalAct = actRepository.findById(act.getActId());
		if (optionalAct.isEmpty()) {
			return actRepository.save(act);
		} else {
			throw new RuntimeException("ActModel not found with id: " + act.getActId());
		}
	}
	
	public Optional<ActModel> getById(Long id){
		return actRepository.findById(id);
	}
	
	public ActModel updateById(ActModel request, Long id) {
		Optional<ActModel> optionalAct = actRepository.findById(id);
		if (optionalAct.isPresent()) {
			ActModel existingAct = optionalAct.get();
			existingAct.setDate(request.getDate());
			existingAct.setPlace(request.getPlace());
			existingAct.setTime(request.getTime());
			return actRepository.save(existingAct);
		} else {
			throw new RuntimeException("ActModel not found with id: " + id);
		}
	}
	public Boolean deleteAct (Long id) {
		try {
			actRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	 public ActModel addParticipantToAct(Long actaId, Long participanteId) {
	        Optional<ActModel> actaOpt = actRepository.findById(actaId);
	        Optional<ParticipantModel> participanteOpt = participantRepository.findById(participanteId);

	        if (actaOpt.isPresent() && participanteOpt.isPresent()) {
	        	ActModel acta = actaOpt.get();
	        	ParticipantModel participante = participanteOpt.get();
	            acta.getParticipants().add(participante);
	            participante.getActs().add(acta);
	            actRepository.save(acta);
	            participantRepository.save(participante);
	            return acta;
	        } else {
	            throw new RuntimeException("Acta or Participante not found");
	        }
	    }
	 public List<ActRequestStateDTO> getActRequestStates(Long actId) {
	        return actRepository.findActRequestStateByActId(actId);
	    }
}
