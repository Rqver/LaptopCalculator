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

import express from 'express';
import {MongoClient} from 'mongodb';
import path from 'path';

const uri = "mongodb+srv://lensboy007:bgIVuw4HTJXp3bGa@cluster0.nkap6xj.mongodb.net/?retryWrites=true&w=majority"; // I know... Couldn't be bothered setting up an env, only going to be used for this one school project.
const client = new MongoClient(uri);
const app = express();
const port = 3000;

// Express Setup
app.use(express.static('public'));
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next()
})

// Routes Setup
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    const database = client.db('laptops');
    const laptops = database.collection('laptops');


    const details = req.body
    const os = details.os
    const ram = details.ram
    const storage = details.storage
    const budget = details.budget

    if (os === "WINDOWS") {
        let laptopData = []
        let laptopDataTwo = []
        let laptopDataThree = []
        let finalLaptopData = []
        let query = {os: "Windows"}
        await laptops.find(query).forEach(laptop => {
            laptopData.push(laptop)
        }).then(async () => {
            laptopData.forEach(laptop => {
                if (ram === '4' && (laptop.ram_gb === '4 GB GB' || laptop.ram_gb === '8 GB GB' || laptop.ram_gb === "16 GB GB" || laptop.ram_gb === "32 GB GB" || laptop.ram_gb === "64 GB GB")) {
                    laptopDataTwo.push(laptop)
                } else if (ram === '8' && (laptop.ram_gb === '8 GB GB' || laptop.ram_gb === "16 GB GB" || laptop.ram_gb === "32 GB GB" || laptop.ram_gb === "32 GB GB" || laptop.ram_gb === "64 GB GB")) {
                    laptopDataTwo.push(laptop)
                } else if (ram === '16' && (laptop.ram_gb === '16 GB GB' || laptop.ram_gb === "32 GB GB" || laptop.ram_gb === "64 GB GB")) {
                    laptopDataTwo.push(laptop)
                } else if (ram === '32' && (laptop.ram_gb === '32 GB GB' || laptop.ram_gb === "64 GB GB")) {
                    laptopDataTwo.push(laptop)
                } else if (ram === '64' && (laptop.ram_gb === '64 GB GB')) {
                    laptopDataTwo.push(laptop)
                }
            })
            laptopDataTwo.forEach(laptop => {
                if (storage === "256" && laptop.ssd === "256 GB" || laptop.ssd === "") {
                    laptopDataThree.push(laptop)
                } else if (storage === "512" && laptop.ssd === "512 GB") {
                    laptopDataThree.push(laptop)
                } else if (storage === "1024" && laptop.ssd === "1024 GB") {
                    laptopDataThree.push(laptop)
                }
            })
            laptopDataThree.forEach(laptop => {
                let price = Math.floor(laptop.latest_price / 10) - 1000
                if (parseInt(budget) >= price) {
                    finalLaptopData.push(laptop)
                }
            })
        }).then(() => {
            finalLaptopData.forEach(laptop => {
                console.log(laptop.brand + ' ' + laptop.model + ' (' + laptop.ram_gb.replace("GB", "") + 'GB DDR4 Ram,' + storage + 'GB SSD Storage) ')
            })
            //TODO: Send finalLaptopData the client to display in a web page
        })
    }
})

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
