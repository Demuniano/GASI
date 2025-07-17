package com.area.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.Lob;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "recommendation")
public class RecommendationModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idRecommendation;
	@Lob
    @Column(columnDefinition = "LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
	private String description;
	
	@OneToOne()
	@JoinColumn(name = "id_detail_order_paper", referencedColumnName = "idDetailOrderPaper")
    private DetailOrderPaperModel detailOrderPaper;

	public RecommendationModel() {
	}

	public RecommendationModel(Long idRecommendation, String description, DetailOrderPaperModel detailOrderPaper) {
		this.idRecommendation = idRecommendation;
		this.description = description;
		this.detailOrderPaper = detailOrderPaper;
	}

	public Long getIdRecommendation() {
		return idRecommendation;
	}

	public void setIdRecommendation(Long idRecommendation) {
		this.idRecommendation = idRecommendation;
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
