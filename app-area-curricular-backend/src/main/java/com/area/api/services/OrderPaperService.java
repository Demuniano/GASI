package com.area.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.area.api.dto.OrderPaperDetailsDTO;
import com.area.api.models.OrderPaperModel;
import com.area.api.repositories.IOrderPaperRepository;

@Service
public class OrderPaperService {
	@Autowired
	IOrderPaperRepository orderPaperRepository;
	
	public ArrayList<OrderPaperModel> getOrderPapers(){
		return (ArrayList<OrderPaperModel>)orderPaperRepository.findAll();
	}
	
	public OrderPaperModel saveOrderPaper(OrderPaperModel OrderPaper) {
		return orderPaperRepository.save(OrderPaper);
	}
	
	public Optional<OrderPaperModel> getById(Long id){
		return orderPaperRepository.findById(id);
	}
	
	public OrderPaperModel updateById(OrderPaperModel request, Long id){
		OrderPaperModel orderPaper = orderPaperRepository.findById(id).get();
		orderPaper.setDescription(request.getDescription());
		return orderPaper;
	}
	public Boolean deleteOrderPaper (Long id) {
		try {
			orderPaperRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	public List<OrderPaperModel> getOrderPapersByAct(Long actId){
		return orderPaperRepository.findByActId(actId);
	}
	public List<OrderPaperDetailsDTO>  getOrderPaperWithDetailsAndRecommendations(Long orderPaperId) {
        return orderPaperRepository.findOrderPaperDetailsAndRecommendations(orderPaperId);
    }
}
