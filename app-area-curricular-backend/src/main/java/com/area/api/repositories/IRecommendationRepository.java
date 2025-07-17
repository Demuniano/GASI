package com.area.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.area.api.models.RecommendationModel;

public interface IRecommendationRepository extends JpaRepository <RecommendationModel,Long>{
	@Query("SELECT r FROM RecommendationModel r WHERE r.detailOrderPaper.idDetailOrderPaper = :detailOrderPaperId")
    Optional<RecommendationModel> findByDetailOrderPaperId(@Param("detailOrderPaperId") Long detailOrderPaperId);

}
