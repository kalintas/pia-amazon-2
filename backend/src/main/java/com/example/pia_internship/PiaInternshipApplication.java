package com.example.pia_internship;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@SpringBootApplication
public class PiaInternshipApplication {

    private UserRepository userRepository;

    @Autowired
    public PiaInternshipApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static void main(String[] args) throws IOException {

        /*
        FileInputStream serviceAccount =
        new FileInputStream("path/to/serviceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();

        FirebaseApp.initializeApp(options);*/


		SpringApplication.run(PiaInternshipApplication.class, args);
	}

    @GetMapping("/api/signIn/{uid}")
    public ResponseEntity<User> loginUser(@PathVariable("uid") String uid) {
        var userOptional = userRepository.findByUid(uid);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/api/signUp/{uid}")
    public ResponseEntity<Void> signUp(@RequestBody User user) {
        var userOptional = userRepository.findByUid(user.getUid());
        if (userOptional.isPresent()) {
            // Already exists.
            return ResponseEntity.badRequest().build();
        }

        userRepository.insert(user);
        return ResponseEntity.ok().build();
    }

    /*
    @GetMapping("/signUp")
    public String sayHello() {
    } 
    @GetMapping("/purchase")
    public String sayHello() {
    } 
    @GetMapping("/admin/addProduct")
    public String sayHello() {
    } 
    @GetMapping("/admin/removeProduct")
    public String sayHello() {
    } */
}
