package com.area.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.area.api.dto.ParticipantsDTO;
import com.area.api.dto.ParticipantDTO;
import com.area.api.dto.ParticipantActDto;
import com.area.api.models.ParticipantModel;

public interface IParticipantRepository extends JpaRepository<ParticipantModel,Long>{
	/*
	@Query("SELECT new com.area.api.dto.ParticipantsDTO(p.id, p.type, a.name, s.name, t.name) " +
	           "FROM ParticipantModel p " +
	           "LEFT JOIN p.act a " +
	           "LEFT JOIN p.student s " +
	           "LEFT JOIN p.teacher t " +
	           "WHERE p.act.id = :id")
    List<ParticipantsDTO> findByAct(@Param("id") Long id);
    */
	@Query("SELECT new com.area.api.dto.ParticipantsDTO(p.id, p.type) " +
	           "FROM ParticipantModel p ")
	List<ParticipantsDTO> findByAct(@Param("id") Long id);
	
	@Query("SELECT new com.area.api.dto.ParticipantDTO(p.id, p.name, p.role, p.type, p.state) FROM ParticipantModel p WHERE p.state = 'activo'")
    List<ParticipantDTO> findAllActiveParticipants();
	
	@Query("SELECT new com.area.api.dto.ParticipantActDto(p.id, p.name, p.role, p.type, p.state) " +
	           "FROM ParticipantModel p " +
	           "JOIN p.acts a " +
	           "WHERE a.actId = :actId")
    List<ParticipantActDto> findParticipantsByActId(@Param("actId") Long actId);
}
