package com.area.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.area.api.models.IndicatorModel;

public interface IIndicatorRepository extends JpaRepository<IndicatorModel,Long>{

}
