package com.area.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.area.api.models.RequestCategoryModel;

public interface IRequestCategoryRepository extends JpaRepository<RequestCategoryModel,Long>{

}
