package com.project.ecommerce.service;

import java.util.List;

import com.project.ecommerce.exception.ProductException;
import com.project.ecommerce.model.Rating;
import com.project.ecommerce.model.User;
import com.project.ecommerce.request.RatingRequest;

public interface RatingService {

	public Rating createRating(RatingRequest req, User user) throws ProductException;
	
	public List<Rating> getProductRating(Long productId);
}
