package com.area.api.models;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "mobility")
public class MobilityModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idMobility;
	private String targetEntity;
	private String country;
	private String purpose;
	private String result;
	private String type;
	private boolean outgoing;
	private String semester;
	private Date startDate;
	private  Date endDate;
	private Integer lengthStay;
	
	@JsonIgnore
    @ManyToOne()
	@JoinColumn(name = "indicator_id")
    private IndicatorModel indicator;
    
	@JsonIgnore
    @ManyToOne()
	@JoinColumn(name = "id_request")
    private RequestModel request;
    
	@OneToMany(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "id_mobility", referencedColumnName = "idMobility")
	private List<CourseModel> courses;
	
	public MobilityModel() {
	}

	public MobilityModel(Long idMobility, String targetEntity, String country, String purpose, String result,
			String type, boolean outgoing, String semester, Date startDate, Date endDate, Integer lengthStay,
			IndicatorModel indicator, RequestModel request, List<CourseModel> courses) {
		this.idMobility = idMobility;
		this.targetEntity = targetEntity;
		this.country = country;
		this.purpose = purpose;
		this.result = result;
		this.type = type;
		this.outgoing = outgoing;
		this.semester = semester;
		this.startDate = startDate;
		this.endDate = endDate;
		this.lengthStay = lengthStay;
		this.indicator = indicator;
		this.request = request;
		this.courses = courses;
	}

	public Long getIdMobility() {
		return idMobility;
	}

	public void setIdMobility(Long idMobility) {
		this.idMobility = idMobility;
	}

	public String getTargetEntity() {
		return targetEntity;
	}

	public void setTargetEntity(String targetEntity) {
		this.targetEntity = targetEntity;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean isOutgoing() {
		return outgoing;
	}

	public void setOutgoing(boolean outgoing) {
		this.outgoing = outgoing;
	}

	public String getSemester() {
		return semester;
	}

	public void setSemester(String semester) {
		this.semester = semester;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Integer getLengthStay() {
		return lengthStay;
	}

	public void setLengthStay(Integer lengthStay) {
		this.lengthStay = lengthStay;
	}

	public IndicatorModel getIndicator() {
		return indicator;
	}

	public void setIndicator(IndicatorModel indicator) {
		this.indicator = indicator;
	}

	public RequestModel getRequest() {
		return request;
	}

	public void setRequest(RequestModel request) {
		this.request = request;
	}

	public List<CourseModel> getCourses() {
		return courses;
	}

	public void setCourses(List<CourseModel> courses) {
		this.courses = courses;
	}
	
	
}