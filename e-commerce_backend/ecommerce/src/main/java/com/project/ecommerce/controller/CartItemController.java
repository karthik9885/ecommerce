package com.project.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.ecommerce.exception.CartItemException;
import com.project.ecommerce.exception.UserException;
import com.project.ecommerce.model.CartItem;
import com.project.ecommerce.model.User;
import com.project.ecommerce.request.ApiResponse;
import com.project.ecommerce.service.CartItemServiceImpl;
import com.project.ecommerce.service.UserServiceImpl;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {
	
	@Autowired
	private CartItemServiceImpl cartItemServiceImpl;
	@Autowired
	private UserServiceImpl userServiceImpl;

	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long cartItemId, @RequestHeader("Authorization") String jwt) throws UserException, CartItemException{
		User user = userServiceImpl.findUserProfileByJwt(jwt);
		cartItemServiceImpl.removeCartItem(user.getId(), cartItemId);
		ApiResponse res = new ApiResponse();
		res.setMessage("Item Removed From Cart");
		res.setStatus(true);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PutMapping("/{cartItemId}")
	public ResponseEntity<CartItem> updateCartItem(@RequestBody CartItem cartItem, @PathVariable Long cartItemId, @RequestHeader("Authorization") String jwt) throws UserException, CartItemException{
		User user = userServiceImpl.findUserProfileByJwt(jwt);
		CartItem updatedCartItem = cartItemServiceImpl.updateCartItem(user.getId(), cartItemId, cartItem);
		return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
	}	
}
