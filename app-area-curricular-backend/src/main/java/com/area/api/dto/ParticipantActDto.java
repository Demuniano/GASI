package com.area.api.dto;

public class ParticipantActDto {
	private Long id;
	private String name;
	private String role;
	private String type;
	private String state;
    
	public ParticipantActDto() {
	}

	public ParticipantActDto(Long id, String name, String role, String type, String state) {
		this.id = id;
		this.name = name;
		this.role = role;
		this.type = type;
		this.state = state;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
    
    
}
