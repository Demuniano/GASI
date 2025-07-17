package com.area.api.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.area.api.dto.DetailOrderPaperDTO;
import com.area.api.models.DetailOrderPaperModel;
import com.area.api.models.OrderPaperModel;
import com.area.api.models.RequestModel;
import com.area.api.services.DetailOrderPaperService;
import com.area.api.services.OrderPaperService;
import com.area.api.services.RequestService;

@RestController
@RequestMapping("/api/detailOrderPaper")
public class DetailOrderPaperController {
	@Autowired
	private DetailOrderPaperService detailOrderPaperService;
	@Autowired
	private OrderPaperService orderPaperService;
	@Autowired
	private RequestService requestService;
	
	@GetMapping("getAllDetailOrderPapers")
	public ArrayList<DetailOrderPaperModel> getDetailOrderPapers(){
		return this.detailOrderPaperService.getDetailOrderPapers();
	}
	
	@PostMapping("/newDetailOrderPaper/{orderPaperId}/{RequestId}")
	public DetailOrderPaperModel saveDetailOrderPaper(@PathVariable Long orderPaperId,@PathVariable Long RequestId) {	    
	    OrderPaperModel orderPaperObj = orderPaperService.getById(orderPaperId)
	            .orElseThrow(() -> new RuntimeException("orderPaper not found with id: " + orderPaperId));
	    RequestModel requestObj = requestService.getById(RequestId)
	            .orElseThrow(() -> new RuntimeException("request type not found with id: " + RequestId));
	    DetailOrderPaperModel detail = new DetailOrderPaperModel();
	    detail.setOrderPaper(orderPaperObj);
	    detail.setRequest(requestObj);
	    return detailOrderPaperService.saveIndicator(detail);
	}
	@GetMapping(path = "/{id}")
	public Optional<DetailOrderPaperModel> getDetailOrderPaperById(@PathVariable("id")Long id){
		return this.detailOrderPaperService.getById(id);
	}

	@DeleteMapping(path = "/{id}")
	public String deleteById(@PathVariable("id")Long mobilityId) {
		boolean ok = this.detailOrderPaperService.deleteDetailOrderPaper(mobilityId);
		if(ok) {
			return "DetailOrderPaper with id" + mobilityId + "deleted";
		}
		else {
			return "Error, detail not deleted";
		}
	}
	@GetMapping("/{orderPaperId}/requestIds")
    public List<Long> getRequestIdsByOrderPaperId(@PathVariable Long orderPaperId) {
        return detailOrderPaperService.getRequestIdsByOrderPaperId(orderPaperId);
    }
	@GetMapping(path = "/dto/{id}")
    public DetailOrderPaperDTO getDetailOrderPaper(@PathVariable Long id) {
        return detailOrderPaperService.getDetailOrderPaperById(id);
    }
}
