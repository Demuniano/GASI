package com.area.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.area.api.models.StudentModel;

public interface IStudentRepository extends JpaRepository<StudentModel,Long>{

}
