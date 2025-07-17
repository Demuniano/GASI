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
@Table(name = "request_category")
public class RequestCategoryModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idRequestCategory;
	private String name;
	
	@OneToMany(mappedBy = "requestCategory", cascade = CascadeType.REMOVE)
    private List<RequestTypeModel> requestTypes;
	
	public RequestCategoryModel() {
	}

	public RequestCategoryModel(Long idRequestCategory, String name, List<RequestTypeModel> requestTypes) {
		this.idRequestCategory = idRequestCategory;
		this.name = name;
		this.requestTypes = requestTypes;
	}

	public Long getIdRequestCategory() {
		return idRequestCategory;
	}

	public void setIdRequestCategory(Long idRequestCategory) {
		this.idRequestCategory = idRequestCategory;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<RequestTypeModel> getRequestTypes() {
		return requestTypes;
	}

	public void setRequestTypes(List<RequestTypeModel> requestTypes) {
		this.requestTypes = requestTypes;
	}

	
	
}
