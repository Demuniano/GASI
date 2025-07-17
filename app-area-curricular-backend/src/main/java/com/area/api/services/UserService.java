package com.area.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.area.api.models.UserModel;
import com.area.api.dto.UserDto;
import com.area.api.repositories.IUserRepository;

@Service
public class UserService {
	@Autowired
	IUserRepository userRepository;
	
	public ArrayList<UserModel> getUsers(){
		return (ArrayList<UserModel>)userRepository.findAll();
	}
	
	public UserModel saveUser(UserModel user) {
		return userRepository.save(user);
	}
	
	public Optional<UserModel> getById(Long id){
		return userRepository.findById(id);
	}
	
	public UserModel updateById(UserModel request, Long id){
		UserModel user = userRepository.findById(id).get();
		user.setFirstname(request.getFirstname());
		user.setLastname(request.getLastname());
		user.setRole(request.getRole());
		user.setusername(request.getUsername());
		user.setPassword(request.getPassword());
		return user;
	}
	public Boolean deleteUser (Long id) {
		try {
			userRepository.deleteById(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	public Optional<UserModel> getByUsername(String username){
		return userRepository.findByUsername(username);
	}
	public List<UserDto> getAllUsers() {
        return userRepository.findAllUsers();
    }
	
}
