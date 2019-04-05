// - Within your groups you are going to be creating a Node application called "Great-Bay" which allows users
// to create and bid on assorted items, tasks, jobs, or projects.
// - The basic application is fairly simple: Upon loading up the program, the user is prompted on whether they 
// would like to "POST AN ITEM" or "BID ON AN ITEM"
//     - If the user selects "POST AN ITEM" they are prompted for an assortment of information regarding the item 
//     and then that information is added to the database so that others can bid on it

//     - If the user selects "BID ON AN ITEM" they are shown a list of all available items and then are prompted to 
//     select what they would like to bid on. The console then asks them how much they would like to bid, and their bid is 
//     compared to the previous highest bid. If their bid is higher, inform the user of their success and replace the previous 
//     bid with the new one. If their bid is lower (or equal), inform the user of their failure and boot them back to 
//     the selection screen.

// - Once your group has put together the basic application, it's time to test your collective skills on some additional 
// functionality, or "addons". Remember to take into consideration the amount of time you have been given when choosing 
// what addons you would like to tackle.

//     - Create a sign up and login system that prompts users for a username and password upon loading up the app. Do not 
//     worry about setting up a truly secure database if you choose to tackle this addon. Just worry about building working 
//     sign up and login features.

//     - Create a system on the "POST AN ITEM" which allows users to look at the auctions they have created. On this screen 
//     they can add new auctions, modify previous auctions, or close bidding on an auction.

//     - Create a system which allows users to view all of the auctions of which they are the leading bidder.

//     - Create a third option on the main screen which allows administrators to modify the database as they see fit.

//     - Create visually appealing tables. This means making dynamic console code and it is a lot harder than it might 
//     seem at first so do not think this one is so simple.

//     - Create a search function that allows users to look through the database of available auctions to find those that 
//     share the specified keyword or username.

//     - Get creative! There are a lot of addons to this app which you could create so feel free to work with your group 
//     to come up with something not listed above!


var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "mypass",
    database: "great_bay"
});

connection.connect(function (err) {
    if (err) throw err;
});

function readData() {
    console.log("Reading all bids...\n");
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}

function createAuction() {
    inquirer.prompt([
        {
            type: "input",
            message: "What are you selling?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the opening bid price?",
            name: "price"
        },
        {
            type: "input",
            message: "How long is your bid?",
            name: "time_limit"
        }
    ]).then(function (response) {

        var query = connection.query(
            "INSERT INTO items SET ?",
            {
                title: response.title,
                price: response.price,
                time_limit: response.time_limit
            },
            function (err, res) {
                readData();
            }
        );
    });
}


inquirer
    .prompt([
        {
            type: "list",
            choices: ["Seller", "Bidder"],
            message: "Are you a seller or bidder?",
            name: "action"
        }
    ]).then(function (res) {
        var action = res.action;


        if (action === "Bidder") {
            // CREATE A NEW BID
            console.log("I'm a bidder!");
            readData();
        }
        if (action === "Seller") {
            // DISPLAY BIDS
            createAuction();
        }
    });


