package com.area.api.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.area.api.dto.OrderPaperDetailsDTO;
import com.area.api.models.ActModel;
import com.area.api.models.OrderPaperModel;
import com.area.api.models.DetailOrderPaperModel;
import com.area.api.services.ActService;
import com.area.api.services.DetailOrderPaperService;
import com.area.api.services.OrderPaperService;

@RestController
@RequestMapping("/api/orderPaper")
public class OrderPaperController {
	@Autowired
	private OrderPaperService orderPaperService;
	@Autowired
	private ActService actService;
	@Autowired
	private DetailOrderPaperService detailService;
	
	@GetMapping("getAllOrderPaper")
	public ArrayList<OrderPaperModel> getAllOrderPaper(){
		return this.orderPaperService.getOrderPapers();
	}

	@PostMapping("/newOrderPaper/{actId}")
	public OrderPaperModel saveOrderPaper(@PathVariable Long actId, @RequestBody OrderPaperModel orderPaper) {	    
		ActModel actModel = actService.getById(actId)
	            .orElseThrow(() -> new RuntimeException("Act not found with id: " + actId));

		orderPaper.setAct(actModel);

	    return orderPaperService.saveOrderPaper(orderPaper);
	}
   @PostMapping("requestToOrder/{requestId}/{orderPaperId}")
   public void addRequestToOrderPaper(@PathVariable Long requestId, @PathVariable Long orderPaperId, @RequestBody DetailOrderPaperModel detailOrder) {
	   detailService.addRequestToOrderPaper(requestId, orderPaperId,detailOrder);
	}
	@GetMapping(path = "/{id}")
	public Optional<OrderPaperModel> getOrderPaperById(@PathVariable("id")Long id){
		return this.orderPaperService.getById(id);
	}
	
	@PutMapping(path = "/{id}")
	public OrderPaperModel updateOrderPaperById(@RequestBody OrderPaperModel request,@PathVariable("id") Long id) {
		return this.orderPaperService.updateById(request, id);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long id) {
		boolean ok = this.orderPaperService.deleteOrderPaper(id);
		if(ok) {
			return "OrderPaper with id" + id + "deleted";
		}
		else {
			return "Error, OrderPaper not deleted";
		}
	}
	@GetMapping(path = "act/{actId}")
	public List<OrderPaperModel>  getOrderPapersByAct(@PathVariable("actId")Long id){
		return this.orderPaperService.getOrderPapersByAct(id);
	}
	@GetMapping("recommendations/{id}")
    public List<OrderPaperDetailsDTO> getOrderPaperWithDetailsAndRecommendations(@PathVariable Long id) {
        return orderPaperService.getOrderPaperWithDetailsAndRecommendations(id);
    }
	
}
