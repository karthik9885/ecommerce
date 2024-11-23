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
import com.project.ecommerce.model.Order;
import com.project.ecommerce.model.Rating;
import com.project.ecommerce.model.User;
import com.project.ecommerce.request.RatingRequest;
import com.project.ecommerce.service.RatingService;
import com.project.ecommerce.service.RatingServiceImpl;
import com.project.ecommerce.service.UserService;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

	@Autowired
	private UserService userService;
	@Autowired
	private RatingServiceImpl ratingServiceImpl;
	
	@PostMapping("/create")
	public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
		User user = userService.findUserProfileByJwt(jwt);
		Rating rating = ratingServiceImpl.createRating(req, user);
		return new ResponseEntity<Rating>(rating, HttpStatus.CREATED);
	}
	
	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Rating>> getProductsRating(@PathVariable Long productId, @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
		User user = userService.findUserProfileByJwt(jwt);
		List<Rating> ratings = ratingServiceImpl.getProductRating(productId);
		return new ResponseEntity<>(ratings, HttpStatus.CREATED);
	}
}
