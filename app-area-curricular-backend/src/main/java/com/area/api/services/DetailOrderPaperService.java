package com.area.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.models.RequestModel;
import com.area.api.dto.DetailOrderPaperDTO;
import com.area.api.models.DetailOrderPaperModel;
import com.area.api.models.IndicatorModel;
import com.area.api.models.OrderPaperModel;
import com.area.api.models.OrderPaperRequestId;
import com.area.api.repositories.IOrderPaperRepository;
import com.area.api.repositories.IDetailOrderPaperRepository;
import com.area.api.repositories.IRequestRepository;
import jakarta.transaction.Transactional;

@Service
public class DetailOrderPaperService {
	@Autowired
	private IOrderPaperRepository orderPaperRepository;
	@Autowired
	private IRequestRepository requestRepository;
	@Autowired
	private IDetailOrderPaperRepository detailOrderPaperRepository;
	
	public ArrayList<DetailOrderPaperModel> getDetailOrderPapers(){
		return (ArrayList<DetailOrderPaperModel>)detailOrderPaperRepository.findAll();
	}
	public DetailOrderPaperModel saveIndicator(DetailOrderPaperModel detail) {
		return detailOrderPaperRepository.save(detail);
	}
	@Transactional
    public void addRequestToOrderPaper(Long requestId, Long orderPaperId, DetailOrderPaperModel detailOrderPaper) {
        Optional<RequestModel> requestOptional = requestRepository.findById(requestId);
        Optional<OrderPaperModel> orderPaperOptional = orderPaperRepository.findById(orderPaperId);

        if (requestOptional.isPresent() && orderPaperOptional.isPresent()) {
            RequestModel request = requestOptional.get();
            OrderPaperModel orderPaper = orderPaperOptional.get();
            detailOrderPaper.setOrderPaper(orderPaper);
            detailOrderPaper.setRequest(request);
            //OrderPaperRequestModel orderPaperRequest = new OrderPaperRequestModel(orderPaper, request);
            detailOrderPaperRepository.save(detailOrderPaper);
        } else {
            throw new RuntimeException("Request or OrderPaper not found");
        }
    }
	public Optional<DetailOrderPaperModel> getById(Long id){
		return detailOrderPaperRepository.findById(id);
	}
/*
	public OrderPaperRequestModel updateById(OrderPaperRequestModel request, Long id){
		OrderPaperRequestModel requestObj = detailOrderPaperRepository.findById(id).get();
		requestObj.setDescription(request.getDescription());
		requestObj.setUrlImg(request.getUrlImg());
		return requestObj;
	}
	*/
	public Boolean deleteDetailOrderPaper (Long id) {
		try {
			detailOrderPaperRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	public List<Long> getRequestIdsByOrderPaperId(Long orderPaperId) {
        return detailOrderPaperRepository.findRequestIdsByOrderPaperId(orderPaperId);
    }
	public DetailOrderPaperDTO getDetailOrderPaperById(Long id) {
        return detailOrderPaperRepository.findDetailOrderPaperById(id);
    }
}
