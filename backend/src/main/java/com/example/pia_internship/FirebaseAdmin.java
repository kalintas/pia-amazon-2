package com.example.pia_internship;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

import java.io.FileInputStream;
import java.io.IOException;

public class FirebaseAdmin {
    static private FirebaseAdmin firebaseAdmin = null;

    FirebaseApp app = null;
    FirebaseAuth auth = null;

    private FirebaseAdmin() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("src/main/resources/private-key.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        app = FirebaseApp.initializeApp(options);
        auth = FirebaseAuth.getInstance(app);
    }

    public static FirebaseAdmin getAdmin() throws IOException {
        if (firebaseAdmin == null) {
            firebaseAdmin = new FirebaseAdmin();
        }
        return firebaseAdmin;
    }

}
