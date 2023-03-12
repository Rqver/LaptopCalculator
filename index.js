/**
 * Example document structure
 *   _id: new ObjectId("640e469b585739f5afc6615b"),
 *   brand: 'Lenovo',
 *   model: 'A6-9225',
 *   processor_brand: 'AMD',
 *   processor_name: 'A6-9225 Processor',
 *   processor_gnrtn: '10th',
 *   ram_gb: '4 GB GB',
 *   ram_type: 'DDR4',
 *   ssd: '0 GB',
 *   hdd: '1024 GB',
 *   os: 'Windows',
 *   os_bit: '64-bit',
 *   graphic_card_gb: 0,
 *   weight: 'ThinNlight',
 *   display_size: 'Missing',
 *   warranty: 0,
 *   Touchscreen: 'No',
 *   msoffice: 'No',
 *   latest_price: 24990,
 *   old_price: 32790,
 *   discount: 23,
 *   star_rating: 3.7,
 *   ratings: 63,
 *   reviews: 12
 */

// Would you prefer Windows or MacOS? (os)

// IF WINDOWS:
//      What is your preferred laptop manufacturer? (brand)
//      You can select multiple. Select continue if you have no preference

// IF WINDOWS:
//      What is your preferred CPU brand? (processor_brand) - AMD or Intel
//      Select continue if you have no preference

// IF WINDOWS:
//      What is your preferred CPU brand?
//      Select continue if you have no preference.


// IF WINDOWS:
//      Do you require a touchscreen?
//      Select continue if you have no preference.

// How much ram do you require?
// Select continue if you have no requirements.

// How much storage do you require (HDD/SSD)?
// Select continue if you have no requirements.

// What is your budget?
// Select continue if you have no requirements





// Prefered Brand
// Processor Brand (AMD/Intel)
// Minimum Ram
// SSD/hdd
// os


import express from 'express';
import {MongoClient} from 'mongodb';
import path from 'path';

const uri = "mongodb+srv://lensboy007:bgIVuw4HTJXp3bGa@cluster0.nkap6xj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const app = express();
const port = 3000;

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


/*
async function run() {
    try {
        const database = client.db('laptops');
        const laptops = database.collection('laptops');
        // Query for a movie that has the title 'Back to the Future'
        const query = {processor_brand: 'AMD'};
        const laptop = await laptops.findOne(query);
        console.log(laptop);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);
 */






