package com.area.api.seed;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.area.api.models.RoleModel;
import com.area.api.models.UserModel;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.area.api.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private IUserRepository userRepository;
	@Autowired
    private PasswordEncoder passwordEncoder;

    public void run(String... args) throws Exception {
    	
        if (userRepository.count() == 0) {
            UserModel admin = new UserModel();
            admin.setLastname("Admin");
            admin.setFirstname("Super");
            admin.setusername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(RoleModel.ADMIN);

            UserModel user = new UserModel();
            user.setLastname("User");
            user.setFirstname("Normal");
            user.setusername("user");
            user.setPassword(passwordEncoder.encode("admin123"));
            user.setRole(RoleModel.USER);

            userRepository.save(admin);
            userRepository.save(user);
        }
    }
}
