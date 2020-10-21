const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// VARIABLE DATA

var tables = [
    //     {
    //     name: "",
    //     phone: "",
    //     email: "",
    //     id:""
    // }
];

var waitList = [
    // //     {
    // //     name: "",
    // //     phone: "",
    // //     email: "",
    // //     id:""
    // // }
];

// ROUTES
// Displays HOME page only
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/home.html"));
});
// Displays TABLE and WAITLIST only
app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/tables.html"));
});
// Displays RESERVE form only
app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/reserve.html"));
});
// displays raw data of tables
app.get("/api/tables", (req, res) => {
    res.send(tables);
});
// displays raw data of waitlist
app.get("/api/waitlist",(req,res)=>{
    res.send(waitList);
})
// Takes in answers from RESERVE FORM and submits to the waitList
app.post("/reserve", (req, res) => {
    // ADD IN NEW RESERVATION
    // Based on FORM the user can edit
    var newReserve = req.body;

    // Conditional if tables array has 5 index
    if (tables.length < 5) {
        // if yes, add in reservation to tables array
        tables.push(newReserve);
        // write to tables file
    }
    else {
        // if no, push new reservations to waitList array
        waitList.push(newReserve);
    }
});

// LISTENER
app.listen(PORT, () => console.log("App listening on PORT: " + PORT));