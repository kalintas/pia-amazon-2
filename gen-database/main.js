const { MongoClient, listDatabases } = require('mongodb');
const playwright = require('playwright');

const databaseUri = "mongodb://root:root@localhost:27017/?authSource=admin";

const categories = [];

async function populateDatabase() {
    /*
    const client = new MongoClient(databaseUri);

    await client.connect();
    const users = await client.db("pia-db").collection("products").find().toArray();
    */

    const browser = await playwright['firefox'].launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const openCategoryMenu = async () => {
        await page.getByRole('button', { name: 'Open All Categories Menu' }).waitFor({ state: 'visible' });
        await page.locator('#nav-main div').filter({ hasText: 'All' }).click();
        await page.getByRole('list').filter({ hasText: 'ElectronicsComputersSmart' }).getByLabel('See all').click();
    };

    await page.goto('https://amazon.com');
    await openCategoryMenu();

    const buttons = page.getByRole('button');

    for (let i = 5; i <= 26; i++) {
        const text = await buttons.nth(i).innerText();
        categories.push(text);
    }
    console.log("Fetched categories: ", categories);
    for (const category of categories) {
        console.log(category)
        await page.getByRole('button', { name: category, exact: true }).click();
        const content = page.locator('#hmenu-content').first();
        content.waitFor({ state: 'visible' });
        const links = content.locator("ul > li").getByRole('link');
        console.log(await links.allInnerTexts());

        /*
        const count = await links.count();
        
        console.log(`Under category${category}. Found ${count} match.`);
        for (let i = 0; i < count; ++i) {
            if (!(await links[i].isVisible())) continue;
            const text = await links.nth(i).innerText();
            console.log(text);
            //await links.nth(i).click();
        }
        console.log();*/

        await page.getByRole('button', { name: 'Close menu' }).click();
        await openCategoryMenu();
        console.log('saaaa')
        await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1000)})
    }

    await page.waitForTimeout(100000);
    //await browser.close();
}

if (require.main) {
    populateDatabase()
    .catch((error) => {
        console.error("Could not populate the database: ", error)
    })
    .then();
}

