package com.project.ecommerce.service;

import com.project.ecommerce.exception.ProductException;
import com.project.ecommerce.model.Cart;
import com.project.ecommerce.model.User;
import com.project.ecommerce.request.AddItemRequest;

public interface CartService {

	public Cart createCart(User user);
	
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);
}
