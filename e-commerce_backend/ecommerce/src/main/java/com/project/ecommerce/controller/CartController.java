package com.project.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.ecommerce.exception.OrderException;
import com.project.ecommerce.exception.ProductException;
import com.project.ecommerce.exception.UserException;
import com.project.ecommerce.model.Cart;
import com.project.ecommerce.model.User;
import com.project.ecommerce.request.AddItemRequest;
import com.project.ecommerce.request.ApiResponse;
import com.project.ecommerce.service.CartService;
import com.project.ecommerce.service.CartServiceImpl;
import com.project.ecommerce.service.UserService;
import com.project.ecommerce.service.UserServiceImpl;

@RestController
@RequestMapping("/api/cart")
//@Tag(name="Cart Management", description = "find user cart,add item to cart")
public class CartController {

	@Autowired
	private CartServiceImpl cartServiceImpl;
	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@GetMapping("/")
	public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException{
		User user = userServiceImpl.findUserProfileByJwt(jwt);
		Cart cart = cartServiceImpl.findUserCart(user.getId());		
		return new ResponseEntity<Cart>(cart,HttpStatus.OK);
	}
	
	@PutMapping(value="/add")
	public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
		User user = userServiceImpl.findUserProfileByJwt(jwt);		
		cartServiceImpl.addCartItem(user.getId(), req);
		ApiResponse res = new ApiResponse();
		res.setMessage("Item Added to Cart");
		res.setStatus(true);
		return new ResponseEntity<>(res,HttpStatus.OK);
	}	
}
