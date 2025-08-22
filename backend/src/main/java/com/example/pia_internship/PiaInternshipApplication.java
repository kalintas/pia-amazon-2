package com.example.pia_internship;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@SpringBootApplication
public class PiaInternshipApplication {

	public static void main(String[] args) throws IOException {
        /*
        FileInputStream serviceAccount =
        new FileInputStream("path/to/serviceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();

        FirebaseApp.initializeApp(options);*/


		SpringApplication.run(PiaInternshipApplication.class, args);
	}

    @GetMapping("/login")
    public String sayHello() {
        return "";
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
