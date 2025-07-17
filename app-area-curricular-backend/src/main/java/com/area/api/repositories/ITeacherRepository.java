package com.area.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.area.api.models.TeacherModel;

public interface ITeacherRepository extends JpaRepository<TeacherModel,Long>{

}
