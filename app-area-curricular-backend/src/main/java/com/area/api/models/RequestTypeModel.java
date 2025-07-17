package com.area.api.models;

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
@Table(name = "request_type")
public class RequestTypeModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idRequestType;
	private String name;
	
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "requestCategory_id")
    private RequestCategoryModel requestCategory;
	
	@OneToMany()
	@JoinColumn(name = "id_request_type", referencedColumnName = "idRequestType")
    private List<RequestModel> requests;
	
	public RequestTypeModel() {
	}

	public RequestTypeModel(Long idRequestType, String name, RequestCategoryModel requestCategory,List<RequestModel> requests) {
		this.idRequestType = idRequestType;
		this.name = name;
		this.requestCategory = requestCategory;
		this.requests = requests;
	}

	public Long getIdRequestType() {
		return idRequestType;
	}

	public void setIdRequestType(Long idRequestType) {
		this.idRequestType = idRequestType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public RequestCategoryModel getRequestCategory() {
		return requestCategory;
	}

	public void setRequestCategory(RequestCategoryModel requestCategory) {
		this.requestCategory = requestCategory;
	}


	public List<RequestModel> getRequests() {
		return requests;
	}

	public void setRequests(List<RequestModel> requests) {
		this.requests = requests;
	}

	
}
