package com.area.api.models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_paper")
public class OrderPaperModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String description;
	
	@JsonIgnore
    @ManyToOne()
	@JoinColumn(name = "act_id")
    private ActModel act;

	@OneToMany(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "id_order_paper", referencedColumnName = "id")
	private List<DetailOrderPaperModel> detailOrderPapers;
	
	public OrderPaperModel() {
	}


	
	public OrderPaperModel(Long id, String description, ActModel act, List<DetailOrderPaperModel> detailOrderPapers) {
		this.id = id;
		this.description = description;
		this.act = act;
		this.detailOrderPapers = detailOrderPapers;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}



	public void setDescription(String description) {
		this.description = description;
	}



	public ActModel getAct() {
		return act;
	}



	public void setAct(ActModel act) {
		this.act = act;
	}



	public List<DetailOrderPaperModel> getDetailOrderPapers() {
		return detailOrderPapers;
	}



	public void setDetailOrderPapers(List<DetailOrderPaperModel> detailOrderPapers) {
		this.detailOrderPapers = detailOrderPapers;
	}

}