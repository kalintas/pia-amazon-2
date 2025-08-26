package com.example.pia_internship;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.mongodb.client.DistinctIterable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.Duration;
import java.util.List;

@RestController
@SpringBootApplication
public class PiaInternshipApplication {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public PiaInternshipApplication(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public static void main(String[] args) throws IOException {

        /*
        FileInputStream serviceAccount =
        new FileInputStream("path/to/serviceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();

        FirebaseApp.initializeApp(options);*/


		SpringApplication.run(PiaInternshipApplication.class, args);
	}

    @GetMapping({"/api/signIn", "/api/signIn/{uid}"})
    public ResponseEntity<User> loginUser(@PathVariable(value = "uid", required = false) String uid,
                                            @CookieValue(value = "token", required = false) String token) {
        if (token != null) {
            var userOptional = userRepository.findByUid(token);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                return ResponseEntity.ok(user);
            }
        }

        var userOptional = userRepository.findByUid(uid);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            ResponseCookie tokenCookie =
                    ResponseCookie.from("token", uid).httpOnly(true).path("/").maxAge(Duration.ofDays(4)).build();
            ResponseCookie sessionCookie = ResponseCookie.from("session", "token").httpOnly(false).path("/").maxAge(Duration.ofDays(4)).build();

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, tokenCookie.toString());
            headers.add(HttpHeaders.SET_COOKIE, sessionCookie.toString());

            return ResponseEntity.ok().headers(headers).body(user);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/api/signUp")
    public ResponseEntity<Void> signUp(@RequestBody User user) {
        var userOptional = userRepository.findByUid(user.getUid());
        if (userOptional.isPresent()) {
            // Already exists.
            return ResponseEntity.badRequest().build();
        }

        userRepository.insert(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/signOut")
    public ResponseEntity<Void> signOut(@CookieValue(value = "token", required = false) String token) {
        if (token == null) {
            return ResponseEntity.badRequest().build();
        }

        var userOptional = userRepository.findByUid(token);
        if (userOptional.isEmpty()) {
            // User doesn't exist.
            return ResponseEntity.badRequest().build();
        }

        // Delete cookies.
        ResponseCookie tokenCookie =
                ResponseCookie.from("token", "").path("/").maxAge(0).build();
        ResponseCookie sessionCookie = ResponseCookie.from("session", "").path("/").maxAge(0).build();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, tokenCookie.toString());
        headers.add(HttpHeaders.SET_COOKIE, sessionCookie.toString());

        return ResponseEntity.ok().headers(headers).build();
    }

    @GetMapping("/api/products")
    public ResponseEntity<List<Product>> products   () {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/api/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/api/productCategories")
    public ResponseEntity<List<String>> productCategories () {
        var categories = productRepository.getDistinctByCategory("category");
        return ResponseEntity.ok(categories);
    }

    // Calculates the search with the given query parameters.
    @PostMapping("/api/search")
    public ResponseEntity<SearchQueryResult> search(@RequestBody SearchQuery searchQuery) {
        Query query = new Query();

        if (searchQuery.getId() != null && !searchQuery.getId().isEmpty()) {
            query.addCriteria(Criteria.where("id").regex(searchQuery.getId(), "i"));
        }
        if (searchQuery.getName() != null && !searchQuery.getName().isEmpty()) {
            query.addCriteria(Criteria.where("name").regex(searchQuery.getName(), "i"));
        }
        if (searchQuery.getCategory() != null && !searchQuery.getCategory().isEmpty()) {
            query.addCriteria(Criteria.where("category").is(searchQuery.getCategory()));
        }
        // TODO getPage()
        var count = searchQuery.getProductCount();
        var searchResult = productRepository.find(query);
        var index = (searchQuery.getPage() - 1) * count;
        if (index > searchResult.size()) {
            return ResponseEntity.badRequest().build();
        }

        var products = searchResult.subList(index, Math.min(index + count, searchResult.size()));

        SearchQueryResult result = new SearchQueryResult(products, searchResult.size(), searchQuery.getPage());

        return ResponseEntity.ok(result);
    }

}
