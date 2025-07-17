package com.area.api.models;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "participant")
public class ParticipantModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String role;
	private String type;
	private String state;
	
	@JsonIgnore
	@ManyToMany(mappedBy = "participants")
    private Set<ActModel> acts = new HashSet<>();
/*	
	@JsonIgnore
    @ManyToOne()
  	@JoinColumn(name = "student_id")
    private StudentModel student;
    
	@JsonIgnore
    @ManyToOne()
  	@JoinColumn(name = "teacher_id")
    private TeacherModel teacher;
*/  
	public ParticipantModel() {
	}
	public ParticipantModel(Long id, String name, String role, String type, String state, Set<ActModel> acts) {
		this.id = id;
		this.name = name;
		this.role = role;
		this.type = type;
		this.state = state;
		this.acts = acts;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getstate() {
		return state;
	}
	public void setstate(String state) {
		this.state = state;
	}
	public Set<ActModel> getActs() {
		return acts;
	}
	public void setActs(Set<ActModel> acts) {
		this.acts = acts;
	}
	
	
}
