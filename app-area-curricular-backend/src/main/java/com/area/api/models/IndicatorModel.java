package com.area.api.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "indicator")
public class IndicatorModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idIndicator;
	private String name;
	private String description;
	
	@OneToOne()
	@JoinColumn(name = "requestType_id", referencedColumnName = "idRequestType")
	private RequestTypeModel requestType;
	
	@OneToMany(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "indicator_id", referencedColumnName = "idIndicator")
	private List<MobilityModel> mobilities;
	public IndicatorModel() {
	}
	public IndicatorModel(Long idIndicator, String name, String description, RequestTypeModel requestType,
			List<MobilityModel> mobilities) {
		this.idIndicator = idIndicator;
		this.name = name;
		this.description = description;
		this.requestType = requestType;
		this.mobilities = mobilities;
	}

	public Long getIdIndicator() {
		return idIndicator;
	}

	public void setIdIndicator(Long idIndicator) {
		this.idIndicator = idIndicator;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
	
	
}
