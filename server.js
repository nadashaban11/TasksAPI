const express = require("express");
const router = require("./routes/taskRoutes");
const path = require('path');

const app = express();
const port = 3000;


const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/tasks', router);                                                


app.listen(port , ()=>{console.log(`server is running on port ${port}`)});