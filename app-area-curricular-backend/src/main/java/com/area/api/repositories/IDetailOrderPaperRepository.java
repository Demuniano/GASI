package com.area.api.repositories;
import com.area.api.dto.DetailOrderPaperDTO;
import com.area.api.models.DetailOrderPaperModel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface IDetailOrderPaperRepository extends JpaRepository<DetailOrderPaperModel, Long>{
	 @Query("SELECT d.request.id FROM DetailOrderPaperModel d WHERE d.orderPaper.id = :orderPaperId")
	 List<Long> findRequestIdsByOrderPaperId(@Param("orderPaperId") Long orderPaperId);
	 
	 @Query("SELECT new com.area.api.dto.DetailOrderPaperDTO(dop.idDetailOrderPaper, dop.orderPaper.id, dop.request.id) " +
	           "FROM DetailOrderPaperModel dop WHERE dop.idDetailOrderPaper = :id")
    DetailOrderPaperDTO findDetailOrderPaperById(@Param("id") Long id);
}
