package com.area.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.area.api.models.MobilityModel;
import com.area.api.dto.MobilityRequestDTO;

import org.springframework.transaction.annotation.Transactional;

public interface IMobilityRepository extends JpaRepository<MobilityModel,Long>{

	@Query("SELECT m.idMobility FROM OrderPaperModel o " +
	           "JOIN o.detailOrderPapers d " +
	           "JOIN MobilityModel m ON m.request.idRequest = d.request.idRequest " +
	           "WHERE o.act.actId = :actId")
	    List<Long> findMobilityIdsByActId(@Param("actId") Long actId);

	    @Modifying
	    @Transactional
	    @Query("DELETE FROM MobilityModel m WHERE m.idMobility IN :ids")
	    void deleteByMobilityIds(@Param("ids") List<Long> ids);

	    @Query("SELECT new com.area.api.dto.MobilityRequestDTO(m.idMobility, m.request.idRequest, d.orderPaper.id, r.requestType.idRequestType) " +
	            "FROM MobilityModel m " +
	            "JOIN m.request r " +
	            "JOIN DetailOrderPaperModel d ON d.request.idRequest = m.request.idRequest " +
	            "JOIN d.orderPaper o " +
	            "WHERE o.act.id = :actId")
	     List<MobilityRequestDTO> findMobilityRequestDTOsByAct(@Param("actId") Long actId);
} 
