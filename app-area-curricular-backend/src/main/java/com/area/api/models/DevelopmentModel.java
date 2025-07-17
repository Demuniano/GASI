package com.area.api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "development")
public class DevelopmentModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idDevelopment;
	private String description;
	
	@OneToOne
    @JoinColumn(name = "id_detail_order_paper", referencedColumnName = "idDetailOrderPaper")
    private DetailOrderPaperModel detailOrderPaper;

	public DevelopmentModel() {
	}

	public DevelopmentModel(Long idDevelopment, String description, DetailOrderPaperModel detailOrderPaper) {
		this.idDevelopment = idDevelopment;
		this.description = description;
		this.detailOrderPaper = detailOrderPaper;
	}

	public Long getIdDevelopment() {
		return idDevelopment;
	}

	public void setIdDevelopment(Long idDevelopment) {
		this.idDevelopment = idDevelopment;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public DetailOrderPaperModel getDetailOrderPaper() {
		return detailOrderPaper;
	}

	public void setDetailOrderPaper(DetailOrderPaperModel detailOrderPaper) {
		this.detailOrderPaper = detailOrderPaper;
	}
    
}
