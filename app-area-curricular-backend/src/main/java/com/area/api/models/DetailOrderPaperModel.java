package com.area.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "detail_order_paper")
public class DetailOrderPaperModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idDetailOrderPaper;

	@JsonIgnore
    @ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "id_order_paper")
    private OrderPaperModel orderPaper;
	
	@JsonIgnore
    @ManyToOne()
	@JoinColumn(name = "id_request")
    private RequestModel request;

	@OneToOne(mappedBy = "detailOrderPaper", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private DevelopmentModel development;
	
	@OneToOne(mappedBy = "detailOrderPaper", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private RecommendationModel recommendation;

	public DetailOrderPaperModel() {
	}

	public DetailOrderPaperModel(Long idDetailOrderPaper, OrderPaperModel orderPaper, RequestModel request) {
		this.idDetailOrderPaper = idDetailOrderPaper;
		this.orderPaper = orderPaper;
		this.request = request;
	}

	public Long getIdDetailOrderPaper() {
		return idDetailOrderPaper;
	}

	public void setIdDetailOrderPaper(Long idDetailOrderPaper) {
		this.idDetailOrderPaper = idDetailOrderPaper;
	}

	public OrderPaperModel getOrderPaper() {
		return orderPaper;
	}

	public void setOrderPaper(OrderPaperModel orderPaper) {
		this.orderPaper = orderPaper;
	}

	public RequestModel getRequest() {
		return request;
	}

	public void setRequest(RequestModel request) {
		this.request = request;
	}
   

    
}
