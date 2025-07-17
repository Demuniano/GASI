package com.area.api.models;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class OrderPaperRequestId implements Serializable {
	 @Column(name = "id_order_paper")
     private Long orderPaperId;
	 
	 @Column(name = "id_request")
	 private Long requestId;
	 
	 public OrderPaperRequestId() {}

    public OrderPaperRequestId(Long orderPaperId, Long requestId) {
        this.orderPaperId = orderPaperId;
        this.requestId = requestId;
    }
    
    public Long getOrderPaperId() {
		return orderPaperId;
	}

	public void setOrderPaperId(Long orderPaperId) {
		this.orderPaperId = orderPaperId;
	}

	public Long getRequestId() {
		return requestId;
	}

	public void setRequestId(Long requestId) {
		this.requestId = requestId;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderPaperRequestId that = (OrderPaperRequestId) o;
        return Objects.equals(orderPaperId, that.orderPaperId) && 
               Objects.equals(requestId, that.requestId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderPaperId, requestId);
    }
}
