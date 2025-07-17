package com.area.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.area.api.models.CourseModel;

public interface ICourseRepository extends JpaRepository<CourseModel,Long>{

}
