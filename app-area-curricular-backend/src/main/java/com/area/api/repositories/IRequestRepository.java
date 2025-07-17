package com.area.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.area.api.models.RequestModel;
import com.area.api.dto.RequestDTO;
import com.area.api.dto.RequestDetailsDTO;

public interface IRequestRepository extends JpaRepository<RequestModel,Long>{

	@Query("SELECT new com.area.api.dto.RequestDTO(r.idRequest, r.requestType.idRequestType, rt.name, r.state) FROM RequestModel r JOIN r.requestType rt WHERE r.idRequest = :idRequest")
	Optional<RequestDTO> findRequestIdAndRequestTypeId(@Param("idRequest") Long idRequest);

	
	@Query("SELECT new com.area.api.dto.RequestDetailsDTO(s.idStudent,r.idRequest, rt.idRequestType, c.description, rt.name, r.source) " +
	           "FROM StudentModel s " +
	           "JOIN s.requests r " +
	           "JOIN r.requestType rt " +
	           "JOIN r.contentRequest c " +
	           "WHERE s.idStudent = :idStudent AND r.state = 'Pendiente'")
	    List<RequestDetailsDTO> findRequestDetailsByStudentId(@Param("idStudent") Long idStudent);
}
