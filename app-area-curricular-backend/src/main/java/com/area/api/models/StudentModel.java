package com.area.api.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class StudentModel {
	@Id
	private Long idStudent;
	private String name;
	private String email;
	/*
	@OneToMany(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "student_id", referencedColumnName = "idStudent")
	private List<ParticipantModel> participants;
	*/
	@OneToMany(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "student_id", referencedColumnName = "idStudent")
	private List<RequestModel> requests;
	
	public StudentModel() {
	}

	public StudentModel(Long idStudent, String name, String email, List<RequestModel> requests) {
		this.idStudent = idStudent;
		this.name = name;
		this.email = email;
		this.requests = requests;
	}

	public Long getIdStudent() {
		return idStudent;
	}

	public void setIdStudent(Long idStudent) {
		this.idStudent = idStudent;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<RequestModel> getRequests() {
		return requests;
	}

	public void setRequests(List<RequestModel> requests) {
		this.requests = requests;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
}
