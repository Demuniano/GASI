package com.area.api.dto;

public class RequestDetailsDTO {
	private Long studentId;
	private Long requestId;
    private Long requestTypeId;
    private String description;
    private String requestTypeName;
    private String source;
    
	public RequestDetailsDTO(Long studentId, Long requestId, Long requestTypeId, String description,
			String requestTypeName, String source) {
		this.studentId = studentId;
		this.requestId = requestId;
		this.requestTypeId = requestTypeId;
		this.description = description;
		this.requestTypeName = requestTypeName;
		this.source = source;
	}
	
	public RequestDetailsDTO() {
	}
	public Long getStudentId() {
		return studentId;
	}
	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}
	public Long getrequestId() {
		return requestId;
	}
	public void setrequestId(Long requestId) {
		this.requestId = requestId;
	}
	public Long getRequestTypeId() {
		return requestTypeId;
	}
	public void setRequestTypeId(Long requestTypeId) {
		this.requestTypeId = requestTypeId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getRequestTypeName() {
		return requestTypeName;
	}
	public void setRequestTypeName(String requestTypeName) {
		this.requestTypeName = requestTypeName;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}

}
