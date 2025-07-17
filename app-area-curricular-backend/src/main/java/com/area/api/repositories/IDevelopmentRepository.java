package com.area.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.area.api.models.DevelopmentModel;

public interface IDevelopmentRepository extends JpaRepository<DevelopmentModel,Long>{

}
