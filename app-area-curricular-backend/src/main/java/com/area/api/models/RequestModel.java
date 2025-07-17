package com.area.api.models;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "request")
public class RequestModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idRequest;
	private String state;
	private String reason;
	private String source;
	private Date dateRequest;
	
	@JsonIgnore
    @ManyToOne(cascade = CascadeType.REMOVE)
  	@JoinColumn(name = "student_id")
    private StudentModel student;
    
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "id_request_type")
    private RequestTypeModel requestType;

	@OneToMany(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "id_request", referencedColumnName = "idRequest")
	private List<MobilityModel> mobilities;
	
	@OneToOne()
	@JoinColumn(name = "id_content_request", referencedColumnName = "idContentRequest")
	private ContentRequestModel contentRequest;
	
	@OneToMany(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "id_request", referencedColumnName = "idRequest")
	private List<DetailOrderPaperModel> detailOrderPapers;
	
	public RequestModel() {
	}

	public RequestModel(Long idRequest, String state, String reason, String source, Date dateRequest,
			StudentModel student, RequestTypeModel requestType, List<MobilityModel> mobilities,
			ContentRequestModel contentRequest, List<DetailOrderPaperModel> detailOrderPapers) {
		super();
		this.idRequest = idRequest;
		this.state = state;
		this.reason = reason;
		this.source = source;
		this.dateRequest = dateRequest;
		this.student = student;
		this.requestType = requestType;
		this.mobilities = mobilities;
		this.contentRequest = contentRequest;
		this.detailOrderPapers = detailOrderPapers;
	}

	public Long getIdRequest() {
		return idRequest;
	}

	public void setIdRequest(Long idRequest) {
		this.idRequest = idRequest;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public Date getDateRequest() {
		return dateRequest;
	}

	public void setDateRequest(Date dateRequest) {
		this.dateRequest = dateRequest;
	}

	public StudentModel getStudent() {
		return student;
	}

	public void setStudent(StudentModel student) {
		this.student = student;
	}

	public RequestTypeModel getRequestType() {
		return requestType;
	}

	public void setRequestType(RequestTypeModel requestType) {
		this.requestType = requestType;
	}

	public List<MobilityModel> getMobilities() {
		return mobilities;
	}

	public void setMobilities(List<MobilityModel> mobilities) {
		this.mobilities = mobilities;
	}

	public ContentRequestModel getContentRequest() {
		return contentRequest;
	}

	public void setContentRequest(ContentRequestModel contentRequest) {
		this.contentRequest = contentRequest;
	}

	public List<DetailOrderPaperModel> getDetailOrderPapers() {
		return detailOrderPapers;
	}

	public void setDetailOrderPapers(List<DetailOrderPaperModel> detailOrderPapers) {
		this.detailOrderPapers = detailOrderPapers;
	}


}
