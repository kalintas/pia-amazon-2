const { MongoClient, ObjectId } = require('mongodb');
const playwright = require('playwright');

const databaseUri = "mongodb://root:root@localhost:27017/?authSource=admin";

const categories = [];

const sleep = async (wait) => new Promise((resolve) => setTimeout(() => resolve(), wait));

async function populateDatabase() {
    
    const client = new MongoClient(databaseUri);

    await client.connect();
    const productsCollection = client.db("pia-db").collection("products");

    //await productsCollection.deleteMany({});

    const browser = await playwright['firefox'].launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const openCategoryMenu = async () => {
        // Wait for the main "All" button to open the menu
        await page.getByRole('button', { name: 'Open All Categories Menu' }).waitFor({ state: 'visible' });
        await page.locator('#nav-main div').filter({ hasText: 'All' }).click();

        // Wait for menu content
        await page.locator('#hmenu-content').first().waitFor({ state: 'visible' });

        // Check if "See all" exists and click it once
        const seeAll = page.getByRole('link', { name: 'See all' }).first();
        if (await seeAll.isVisible()) {
            await seeAll.click();
        } else {
            console.error("seeAll is not visible")
        }
    };


    await page.goto('https://amazon.com');
    await page.waitForTimeout(1000);
    await openCategoryMenu();

    const buttons = page.getByRole('button');

    for (let i = 5; i <= 26; i++) {
        const text = await buttons.nth(i).innerText();
        categories.push(text);
    }
    console.log("Fetched categories: ", categories);

    await page.getByRole('button', { name: 'Close menu' }).click();

    let addedProducts = 0;

    for (const category of categories) {
        try {
        const searchBox = page.getByRole('searchbox', { name: 'Search Amazon' });

        await searchBox.click({ force: true });
        const seed = (Math.random() + 1).toString(36).substring(9);
        await searchBox.fill(category + " " + seed);
        // Search
        await page.getByRole('button', { name: 'Go', exact: true }).click();
        await page.waitForTimeout(2000)

        await page.waitForSelector('#search a.a-link-normal.s-no-outline');

        const products = page.locator('.puis-card-container');
            
        const productCount = await products.count();

        console.log(productCount)

        for (let i = 0; i < productCount; i++) {
            const product = products.nth(i);
            
            product.waitFor({ state: 'visible' });
            const title = await product.locator('h2 span').textContent().catch(() => null);
            const image = await product.locator('img.s-image').first().getAttribute('src').catch(() => null);

            let price = await product.locator('span.a-color-base').last().innerText({ timeout: 500 }).catch(() => null);
            if (price === null || !price.includes('$')) {
                price = await product.locator('span.a-offscreen').first().innerText({ timeout: 500 }).catch(() => null);
            }

            productsCollection.insertOne({
                _id: (new ObjectId()).toString(),
                name: title,
                category,
                description: "",
                price: price ? parseInt(price.replace('$', '')) : Math.floor(Math.random() * 200) + 20,
                imageUrl: image
            });
            addedProducts += 1;
        }
        
        console.log(`Added ${addedProducts} products.`);

        await page.waitForTimeout(500)
        } catch (error) {
            console.error(`Caught error while scraping ${category}: `, error)
        }
    }

    console.log("Finished fetching products")

    await browser.close();
}

if (require.main) {
    populateDatabase()
        .catch((error) => {
            console.error("Could not populate the database: ", error)
        })
        .then();
}

