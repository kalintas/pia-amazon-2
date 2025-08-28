package com.example.pia_internship;
import java.io.IOException;
import java.time.Duration;
import java.util.List;

import com.example.pia_internship.entities.*;
import com.example.pia_internship.repositories.ProductRepository;
import com.example.pia_internship.repositories.ReelCommentsRepository;
import com.example.pia_internship.repositories.ReelRepository;
import com.example.pia_internship.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@SpringBootApplication
public class PiaInternshipApplication {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ReelCommentsRepository reelCommentsRepository;
    private final ReelRepository reelRepository;
    private final String corsOrigin = "http://localhost:4200";

    @Autowired
    public PiaInternshipApplication(UserRepository userRepository, ProductRepository productRepository, ReelCommentsRepository reelCommentsRepository, ReelRepository reelRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.reelCommentsRepository = reelCommentsRepository;
        this.reelRepository = reelRepository;
    }

    public static void main(String[] args) throws IOException {
        /*
        FileInputStream serviceAccount =
        new FileInputStream("path/to/serviceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();

        FirebaseApp.initializeApp(options);*/

		SpringApplication.run(PiaInternshipApplication.class, args);
	}

    /**
     * Logs in the user. Should be used either with an uid as a path variable or
     *     a cookie that was sent by this server.
     * @param uid Optional uid of the user that should be logged in.
     * @param token Optional cookie with the users token.
     * */
    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @GetMapping({"/api/signIn", "/api/signIn/{uid}"})
    public ResponseEntity<User> loginUser(@PathVariable(value = "uid", required = false) String uid,
                                          @CookieValue(value = "token", required = false) String token) {
        // First try the cookie
        if (token != null) {
            var userOptional = userRepository.findByUid(token);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                return ResponseEntity.ok(user);
            }
        }

        // Request should carry either an uid or a valid token.
        if (uid == null) {
            return ResponseEntity.badRequest().build();
        }

        // Then log the user with the given uid.
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

    /**
     * Signs up the user with the given credentials.
     * @param user User to be signed up.
     * @return Bad request if the user already exists with the user.getUid()
     * */
    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
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

    /**
     * Signs out the user with the give cookie. Resets the cookie.
     * @param token Required cookie to sign out the user.
     * @return Returns bad request if cookie is null or the user doesn't exist.
     * */
    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
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

    /**
     * Returns the product with the given id.
     * @return Returns bad request if the product doesn't exist.
     * */
    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @GetMapping("/api/product/{id}")
    public  ResponseEntity<Product> product(@PathVariable String id) {
        var productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            return ResponseEntity.ok(productOptional.get());
        }
        return  ResponseEntity.notFound().build();
    }


    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @PostMapping("/api/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    /**
     * Returns all the product categories.
     * */
    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @GetMapping("/api/productCategories")
    public ResponseEntity<List<String>> productCategories () {
        var categories = productRepository.getDistinctByCategory("category");
        return ResponseEntity.ok(categories);
    }

    /**
     * Does a search with the given SearchQuery parameter. Returns at max 100 products at a single request.
     * @param searchQuery the object to run the search with.
     * @return bad request if the searchQuery.getProductCount() is bigger than 100.
     * */
    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @PostMapping("/api/search")
    public ResponseEntity<ProductQueryResult> search(@RequestBody SearchQuery searchQuery) {
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

        var size = searchQuery.getPageSize();
        if (size > 100) {
            return  ResponseEntity.badRequest().build();
        }

        var searchResult = productRepository.find(query);
        var index = (searchQuery.getPage() - 1) * size;
        if (index > searchResult.size()) {
            return ResponseEntity.badRequest().build();
        }

        var products = searchResult.subList(index, Math.min(index + size, searchResult.size()));

        ProductQueryResult result = new ProductQueryResult(products, searchResult.size(), searchQuery.getPage());

        return ResponseEntity.ok(result);
    }

    /**
     * Returns the personalized suggestions for the product with the given id.
     * Returns at max 100 suggestions at a single request.
     * @param suggestionQuery the suggestion query that should be run to generate the suggestions.
     * */
    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @PostMapping("/api/suggestions")
    public ResponseEntity<ProductQueryResult> suggestions(@CookieValue(value = "token", required = false) String token, @RequestBody SuggestionQuery suggestionQuery) {
        if (suggestionQuery.getProductId() == null) {
            return ResponseEntity.badRequest().build();
        }

        var productOptional = productRepository.findById(suggestionQuery.getProductId());
        if (productOptional.isPresent()) {
            var product = productOptional.get();

            Query query = new Query();
            query.addCriteria(Criteria.where("id").ne(suggestionQuery.getProductId()));
            query.addCriteria(Criteria.where("category").is(product.getCategory()));

            var queryResult = productRepository.find(query);

            var size = suggestionQuery.getPageSize();
            if (size > 100) {
                return ResponseEntity.badRequest().build();
            }

            var index = (suggestionQuery.getPage() - 1) * size;
            if (index > queryResult.size()) {
                return ResponseEntity.badRequest().build();
            }

            var suggestions = queryResult.subList(index, Math.min(index + size, queryResult.size()));

            ProductQueryResult result = new ProductQueryResult(suggestions, queryResult.size(), suggestionQuery.getPage());

            return ResponseEntity.ok(result);
        }

        return ResponseEntity.notFound().build();
    }

    /**
     * Updates the user with the give credentials
     * @return Returns bad request if the cookie is empty or the user doesn't exist.
     * */
    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @PatchMapping("/api/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody UpdateUserRequest request, @CookieValue(value = "token", required = false) String token) {
        if  (token == null) {
            return ResponseEntity.badRequest().build();
        }
        var userOptional = userRepository.findByUid(token);
        if (userOptional.isEmpty()) {
            // User doesn't exist.
            return ResponseEntity.badRequest().build();
        }
        if (request.getName() == null || request.getName().isEmpty()
            || request.getSurname() == null || request.getSurname().isEmpty()
            || request.getPhoneNumber() == null || request.getPhoneNumber().isEmpty()
        ) {
            return ResponseEntity.badRequest().build();
        }

        var user = userOptional.get();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setPhoneNumber(request.getPhoneNumber());

        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    /**
     * Sends a random reel from the reel database.
     * */
    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @GetMapping("/api/reel")
    public ResponseEntity<Reel> reel(@CookieValue(value = "token", required = false) String token) {
        Reel reel = reelRepository.getRandomReel();
        return ResponseEntity.ok(reel);
    }

    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @GetMapping("/api/reel/{id}")
    public ResponseEntity<Reel> reel(@CookieValue(value = "token", required = false) String token, @PathVariable String id) {
        var optionalReel = reelRepository.findById(id);
        if (optionalReel.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optionalReel.get());
    }


    @CrossOrigin(origins = corsOrigin, allowCredentials = "true")
    @GetMapping("/api/reel/comments/{id}")
    public ResponseEntity<ReelComment> reelComments(@PathVariable String reelId) {
        var optionalReelComments = reelCommentsRepository.findByReelId(reelId);
        if (optionalReelComments.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optionalReelComments.get());
    }

}
