package com.project.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.ecommerce.exception.OrderException;
import com.project.ecommerce.exception.ProductException;
import com.project.ecommerce.exception.UserException;
import com.project.ecommerce.model.Address;
import com.project.ecommerce.model.Order;
import com.project.ecommerce.model.User;
import com.project.ecommerce.request.AddItemRequest;
import com.project.ecommerce.service.OrderService;
import com.project.ecommerce.service.OrderServiceImpl;
import com.project.ecommerce.service.UserService;
import com.project.ecommerce.service.UserServiceImpl;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderServiceImpl orderServiceImpl;
	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@PostMapping("/")
	public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress, @RequestHeader("Authorization") String jwt) throws UserException{
		User user = userServiceImpl.findUserProfileByJwt(jwt);
		Order order = orderServiceImpl.createOrder(user, shippingAddress);
		System.out.println("order" + order);
		return new ResponseEntity<Order>(order, HttpStatus.CREATED);
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<Order>> usersOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException{
		User user = userServiceImpl.findUserProfileByJwt(jwt);
		List<Order> orders = orderServiceImpl.usersOrderHistory(user.getId());
		return new ResponseEntity<>(orders, HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Order> findOrderById(@PathVariable("id")Long orderId, @RequestHeader("Authorization") String jwt) throws UserException, OrderException{
		User user = userServiceImpl.findUserProfileByJwt(jwt);
		Order order = orderServiceImpl.findOrderById(orderId);
		return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
	}
}
