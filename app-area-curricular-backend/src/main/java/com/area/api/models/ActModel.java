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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "act")
public class ActModel {
	@Id
	private Long actId;
	private Date date;
	private String place;
	private String time;

	@OneToMany(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "act_id", referencedColumnName = "actId")
	private List<OrderPaperModel> orderPapers;
	
	@JsonIgnore
	 @ManyToMany
	 @JoinTable(
	        name = "act_participants",
	        joinColumns = @JoinColumn(name = "act_id"),
	        inverseJoinColumns = @JoinColumn(name = "participant_id")
	    )
    private Set<ParticipantModel> participants = new HashSet<>();
	 
	public ActModel() {
	}

	public ActModel(Long actId,Date date, String place, String time, List<OrderPaperModel> orderPapers,
			Set<ParticipantModel> participants) {
		this.actId = actId;
		this.date = date;
		this.place = place;
		this.time = time;
		this.orderPapers = orderPapers;
		this.participants = participants;
	}

	public Long getActId() {
		return actId;
	}

	public void setActId(Long actId) {
		this.actId = actId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public List<OrderPaperModel> getOrderPapers() {
		return orderPapers;
	}

	public void setOrderPapers(List<OrderPaperModel> orderPapers) {
		this.orderPapers = orderPapers;
	}

	public Set<ParticipantModel> getParticipants() {
		return participants;
	}

	public void setParticipants(Set<ParticipantModel> participants) {
		this.participants = participants;
	}
	

}
