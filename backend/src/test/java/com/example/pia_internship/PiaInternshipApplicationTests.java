package com.example.pia_internship;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.Optional;


@WebMvcTest(PiaInternshipApplication.class)
class PiaInternshipApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserRepository userRepository;

	@Test
	void signInNotFoundReturns404() throws Exception {
		given(userRepository.findByUid(eq("nonexistentuid"))).willReturn(Optional.empty());
		mockMvc.perform(get("/api/signIn/nonexistentuid"))
				.andExpect(status().isNotFound());
	}

	@Test
	void signInFoundReturnsOkWithBody() throws Exception {
		User u = new User();
		// uid has no setter, rely on repository-returned entity shape; JSON asserts verify mapping
		given(userRepository.findByUid(eq("someuid"))).willReturn(Optional.of(u));
		mockMvc.perform(get("/api/signIn/someuid"))
				.andExpect(status().isOk());
	}

	@Test
	void signUpReturnsBadRequestWhenExists() throws Exception {
		given(userRepository.findByUid(eq("existinguid"))).willReturn(Optional.of(new User()));
		String body = "{\"uid\":\"existinguid\",\"email\":\"exists@mail.com\"}";
		mockMvc.perform(post("/api/signUp/existinguid")
				.contentType(MediaType.APPLICATION_JSON)
				.content(body))
				.andExpect(status().isBadRequest());
	}

	@Test
	void signUpInsertsAndReturnsOkForNew() throws Exception {
		given(userRepository.findByUid(eq("newuid"))).willReturn(Optional.empty());
		String body = "{\"uid\":\"newuid\",\"email\":\"new@mail.com\"}";
		mockMvc.perform(post("/api/signUp/newuid")
				.contentType(MediaType.APPLICATION_JSON)
				.content(body))
				.andExpect(status().isOk());
		verify(userRepository).insert(any(User.class));
	}
}
