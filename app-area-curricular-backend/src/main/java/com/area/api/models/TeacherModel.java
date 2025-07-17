package com.area.api.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "teacher")
public class TeacherModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idTeacher;
	private String name;
	/*
	@OneToMany(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "teacher_id", referencedColumnName = "idTeacher")
	private List<ParticipantModel> participants;
	*/

	public TeacherModel() {
	}

	public TeacherModel(Long idTeacher, String name) {
		this.idTeacher = idTeacher;
		this.name = name;
	}

	public Long getIdTeacher() {
		return idTeacher;
	}


	public void setIdTeacher(Long idTeacher) {
		this.idTeacher = idTeacher;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
}
