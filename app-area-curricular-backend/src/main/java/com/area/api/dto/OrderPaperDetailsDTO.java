package com.area.api.dto;

public class OrderPaperDetailsDTO {
	private Long orderId;
    private Long recommendationId;
    private String recommendationDescription;
    private Long detailOrderPaperId;
    private Long requestId;
    
	public OrderPaperDetailsDTO(Long orderId, Long recommendationId, String recommendationDescription, Long detailOrderPaperId, Long requestId) {
        this.orderId = orderId;
        this.recommendationId = recommendationId;
        this.recommendationDescription = recommendationDescription;
        this.detailOrderPaperId = detailOrderPaperId;
        this.requestId = requestId;
    }

    // Getters y setters

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getRecommendationId() {
        return recommendationId;
    }

    public void setRecommendationId(Long recommendationId) {
        this.recommendationId = recommendationId;
    }

    public String getRecommendationDescription() {
        return recommendationDescription;
    }

    public void setRecommendationDescription(String recommendationDescription) {
        this.recommendationDescription = recommendationDescription;
    }

    public Long getDetailOrderPaperId() {
        return detailOrderPaperId;
    }

    public void setDetailOrderPaperId(Long detailOrderPaperId) {
        this.detailOrderPaperId = detailOrderPaperId;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

   
}