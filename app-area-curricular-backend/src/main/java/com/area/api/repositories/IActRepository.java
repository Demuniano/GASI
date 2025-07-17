package com.area.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.area.api.dto.ActRequestStateDTO;
import com.area.api.models.ActModel;

public interface IActRepository extends JpaRepository<ActModel,Long>{
	@Query("SELECT new com.area.api.dto.ActRequestStateDTO(a.actId, r.state) " +
	           "FROM ActModel a " +
	           "JOIN a.orderPapers op " +
	           "JOIN op.detailOrderPapers dop " +
	           "JOIN dop.request r " +
	           "WHERE a.actId = :actId")
	    List<ActRequestStateDTO> findActRequestStateByActId(@Param("actId") Long actId);
}
