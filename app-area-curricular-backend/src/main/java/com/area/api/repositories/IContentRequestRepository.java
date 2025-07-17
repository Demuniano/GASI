package com.area.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.area.api.models.ContentRequestModel;

public interface IContentRequestRepository extends JpaRepository<ContentRequestModel,Long>{

}
