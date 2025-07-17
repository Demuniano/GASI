package com.area.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.area.api.dto.OrderPaperDetailsDTO;
import com.area.api.models.OrderPaperModel;

public interface IOrderPaperRepository extends JpaRepository<OrderPaperModel, Long>{
	 @Query("SELECT o FROM OrderPaperModel o WHERE o.act.id = :actId")
     List<OrderPaperModel> findByActId(@Param("actId") Long actId);
	 
	 @Query("SELECT new com.area.api.dto.OrderPaperDetailsDTO(o.id, r.idRecommendation, r.description, d.idDetailOrderPaper, d.request.id) " +
	           "FROM OrderPaperModel o " +
	           "JOIN o.detailOrderPapers d " +
	           "JOIN d.recommendation r " +
	           "WHERE o.id = :orderPaperId")
    List<OrderPaperDetailsDTO> findOrderPaperDetailsAndRecommendations(@Param("orderPaperId") Long orderPaperId);
}
