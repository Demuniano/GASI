package com.area.api.dto;

public class MobilityRequestDTO {
	private Long idMobility;
    private Long idRequest;
    private Long idOrderPaper;
    private Long idRequestType;
    
	public MobilityRequestDTO(Long idMobility, Long idRequest, Long idOrderPaper, Long idRequestType) {
		this.idMobility = idMobility;
		this.idRequest = idRequest;
		this.idOrderPaper = idOrderPaper;
		this.idRequestType = idRequestType;
	}
	
	public MobilityRequestDTO() {
	}
	
	public Long getIdMobility() {
		return idMobility;
	}
	public void setIdMobility(Long idMobility) {
		this.idMobility = idMobility;
	}
	public Long getIdRequest() {
		return idRequest;
	}
	public void setIdRequest(Long idRequest) {
		this.idRequest = idRequest;
	}
	public Long getIdOrderPaper() {
		return idOrderPaper;
	}
	public void setIdOrderPaper(Long idOrderPaper) {
		this.idOrderPaper = idOrderPaper;
	}
	public Long getIdRequestType() {
		return idRequestType;
	}
	public void setIdRequestType(Long idRequestType) {
		this.idRequestType = idRequestType;
	}
    
}
