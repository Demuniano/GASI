package com.area.api.dto;

public class DetailOrderPaperDTO {
	private Long idDetailOrderPaper;
    private Long idOrderPaper;
    private Long idRequest;

	public DetailOrderPaperDTO() {
	}
	public DetailOrderPaperDTO(Long idDetailOrderPaper, Long idOrderPaper, Long idRequest) {
		this.idDetailOrderPaper = idDetailOrderPaper;
		this.idOrderPaper = idOrderPaper;
		this.idRequest = idRequest;
	}
	public Long getIdDetailOrderPaper() {
		return idDetailOrderPaper;
	}
	public void setIdDetailOrderPaper(Long idDetailOrderPaper) {
		this.idDetailOrderPaper = idDetailOrderPaper;
	}
	public Long getIdOrderPaper() {
		return idOrderPaper;
	}
	public void setIdOrderPaper(Long idOrderPaper) {
		this.idOrderPaper = idOrderPaper;
	}
	public Long getIdRequest() {
		return idRequest;
	}
	public void setIdRequest(Long idRequest) {
		this.idRequest = idRequest;
	}
    
    
}
