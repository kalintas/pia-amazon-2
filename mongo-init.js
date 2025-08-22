db = db.getSiblingDB("pia-db");

db.createUser({
    user: "pia-user",
    pwd: "pia-password",
    roles: [
        { role: "readWrite", db: "pia-db" }
    ]
});

db.createCollection("users")
db.createCollection("products")