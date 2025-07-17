package com.area.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.area.api.dto.MobilityRequestDTO;
import com.area.api.models.CourseModel;
import com.area.api.models.MobilityModel;
import com.area.api.repositories.IMobilityRepository;
import com.area.api.repositories.ICourseRepository;
@Service
public class MobilityService {
	@Autowired
	IMobilityRepository mobilityRepository;
	
	@Autowired
	ICourseRepository courseRepository;
    
	public ArrayList<MobilityModel> getMobilitys(){
		return (ArrayList<MobilityModel>)mobilityRepository.findAll();
	}
	
	public MobilityModel saveMobility(MobilityModel act) {
		return mobilityRepository.save(act);
	}
	
	public Optional<MobilityModel> getById(Long id){
		return mobilityRepository.findById(id);
	}
	
	public MobilityModel updateById(MobilityModel request, Long id){
		MobilityModel mobility = mobilityRepository.findById(id).get();
		mobility.setTargetEntity(request.getTargetEntity());
		mobility.setCountry(request.getCountry());
		mobility.setPurpose(request.getPurpose());
		mobility.setResult(request.getResult());
		mobility.setType(request.getType());
		mobility.setOutgoing(request.isOutgoing());
		mobility.setSemester(request.getSemester());
		mobility.setStartDate(request.getStartDate());
		mobility.setEndDate(request.getEndDate());
		mobility.setLengthStay(request.getLengthStay());
		mobilityRepository.save(mobility);
		return mobility;
	}
	public Boolean deleteMobility (Long id) {
		try {
			mobilityRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	@Transactional
    public void deleteMobilityByActId(Long actId) {
        List<Long> mobilityIds = mobilityRepository.findMobilityIdsByActId(actId);
        for (Long mobilityId : mobilityIds) {
            // Obtener la movilidad por su ID
            MobilityModel mobility = mobilityRepository.findById(mobilityId).orElse(null);
            if (mobility != null) {
                // Eliminar los cursos asociados a esta movilidad
                List<CourseModel> courses = mobility.getCourses();
                if (courses != null && !courses.isEmpty()) {
                    for (CourseModel course : courses) {
                        courseRepository.deleteById(course.getIdCourse());
                    }
                }
                
                mobilityRepository.deleteById(mobility.getIdMobility());
            }
        }
    }
	public List<MobilityRequestDTO> getMobilityRequestDTOs(Long actId) {
        return mobilityRepository.findMobilityRequestDTOsByAct(actId);
    }
}
