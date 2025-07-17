package com.area.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "content_request")
public class ContentRequestModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idContentRequest;
    @Lob
    @Column(columnDefinition = "LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    private String description;
	
	public ContentRequestModel() {
	}

	public ContentRequestModel(Long idContentRequest, String description) {
		this.idContentRequest = idContentRequest;
		this.description = description;
	}

	public Long getIdContentRequest() {
		return idContentRequest;
	}

	public void setIdContentRequest(Long idContentRequest) {
		this.idContentRequest = idContentRequest;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
