package com.area.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.area.api.models.RequestTypeModel;

public interface IRequestTypeRepository extends JpaRepository<RequestTypeModel,Long>{

}
