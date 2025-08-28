const { MongoClient, listDatabases, ObjectId } = require('mongodb');
const { faker } = require('@faker-js/faker');

const databaseUri = "mongodb://root:root@localhost:27017/?authSource=admin";

const client = new MongoClient(databaseUri);

const randomNumber = (max) => Math.floor(Math.random() * max);

const commentTemplates = [
    "This is amazing! {}",
    "I can't believe this! {}",
    "Love it 😍 {}",
    "So relatable! {}",
    "😂😂😂 {}",
    "Where did you get this? {}",
    "This made my day! {}",
];

const emojis = ["🔥", "❤️", "😂", "😍", "🙌", "👍"];

function generateFakeComment() {
    const template = commentTemplates[randomNumber(commentTemplates.length)];
    const emoji = emojis[randomNumber(emojis.length)];
    const randomText = faker.lorem.words(5); // random 5-word text

    return template.replace("{}", randomText + " " + emoji);
}

async function populateDatabase() {

    await client.connect();
    const db = client.db('pia-db');
    const products = await db.collection("products").find().toArray();

    const reelCommentsCollection = db.collection("reelComments");

    await db.collection("reels").deleteMany({});
    await reelCommentsCollection.deleteMany({});

    const reels = await Promise.all(products.map(async (product) => {

        const reelId = (new ObjectId()).toString();

        const commentCount = randomNumber(20);
        const comments = [];
        const commentIds = [];

        for (let i = 0; i < commentCount; ++i) {
            const commentId = (new ObjectId()).toString();
            commentIds.push(commentId);

            const subCommentCount = randomNumber(3);
            const subComments = [];
            for (let j = 0; j < subCommentCount; ++j) {
                subComments.push(generateFakeComment());
            } 

            comments.push({
                _id: commentId,
                reelId,
                comment: generateFakeComment(),
                likes: randomNumber(1000),
                dislikes: randomNumber(1000),
                subComments
            })
        }
        if (comments.length > 0) {
            await reelCommentsCollection.insertMany(comments);
        }

        return {
            _id: reelId,
            productId: product._id,
            commentsId: commentIds,
            likes: randomNumber(1000),
            dislikes: randomNumber(1000),
        }
    }));

    await db.collection("reels").insertMany(reels);
}

if (require.main) {
    populateDatabase()
        .catch((error) => {
            console.error("Could not populate the database: ", error)
        })
        .then()
        .finally(() => {
            client.close();
        });
}

