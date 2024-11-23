package com.project.ecommerce.service;

import com.project.ecommerce.exception.UserException;
import com.project.ecommerce.model.User;

public interface UserService {

	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
}
