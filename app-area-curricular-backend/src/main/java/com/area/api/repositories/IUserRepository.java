package com.area.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.area.api.dto.UserDto;
import com.area.api.models.UserModel;

@Repository
public interface IUserRepository extends JpaRepository<UserModel,Long>{
	Optional<UserModel> findByUsername(String username); 
	
	@Query("SELECT new com.area.api.dto.UserDto(u.id, u.lastname, u.firstname, u.username, u.role) FROM UserModel u")
    List<UserDto> findAllUsers();
}
