package com.area.api.dto;

public class RequestDTO {
	private Long idRequest;
    private Long requestTypeId;
    private String typeRequestName;
    private String state;
	
	public RequestDTO() {
	}

	public RequestDTO(Long idRequest, Long requestTypeId, String typeRequestName, String state) {
		this.idRequest = idRequest;
		this.requestTypeId = requestTypeId;
		this.typeRequestName = typeRequestName;
		this.state = state;
	}

	public Long getIdRequest() {
		return idRequest;
	}

	public void setIdRequest(Long idRequest) {
		this.idRequest = idRequest;
	}

	public Long getRequestTypeId() {
		return requestTypeId;
	}

	public void setRequestTypeId(Long requestTypeId) {
		this.requestTypeId = requestTypeId;
	}

	public String getTypeRequestName() {
		return typeRequestName;
	}

	public void setTypeRequestName(String typeRequestName) {
		this.typeRequestName = typeRequestName;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

 
}

