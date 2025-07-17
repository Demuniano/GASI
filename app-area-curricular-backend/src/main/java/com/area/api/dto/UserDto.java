package com.area.api.dto;

import com.area.api.models.RoleModel;

public class UserDto {
	private Long id;
    private String lastname;
    private String firstname;
    private String username;
    private RoleModel role;

    // Constructor
    public UserDto(Long id, String lastname, String firstname, String username, RoleModel role) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.username = username;
        this.role = role; // Inicializa el campo role
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public RoleModel getRole() {
        return role;
    }

    public void setRole(RoleModel role) {
        this.role = role;
    }
}
