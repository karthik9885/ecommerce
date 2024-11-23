package com.project.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.ecommerce.exception.ProductException;
import com.project.ecommerce.model.Product;
import com.project.ecommerce.model.Review;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.ProductRepository;
import com.project.ecommerce.repository.ReviewRepository;
import com.project.ecommerce.request.ReviewRequest;

@Service
public class ReviewServiceImpl implements ReviewService{

	@Autowired
	private ReviewRepository reviewRepository;
	@Autowired
	private ProductService productService;
	@Autowired
	private ProductRepository productRepository;
	
	
	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
		Product product = productService.findProductById(req.getProductId());
		
		Review review = new Review();
		review.setUser(user);
		review.setProduct(product);
		review.setReview(req.getReview());
		review.setCreatedAt(LocalDateTime.now());
		
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getAllReview(Long productId) {
		return reviewRepository.getAllProductsReview(productId);
	}

}
