package com.area.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "course")
public class CourseModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCourse;
	private String name;
	
	@JsonIgnore
    @ManyToOne()
	@JoinColumn(name = "id_mobility")
	private MobilityModel mobility;

	public CourseModel(Long idCourse, String name, MobilityModel mobility) {
		this.idCourse = idCourse;
		this.name = name;
		this.mobility = mobility;
	}

	public CourseModel() {
	}

	public Long getIdCourse() {
		return idCourse;
	}

	public void setIdCourse(Long idCourse) {
		this.idCourse = idCourse;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public MobilityModel getMobility() {
		return mobility;
	}

	public void setMobility(MobilityModel mobility) {
		this.mobility = mobility;
	}

	
}
