const express = require("express");

const PORT = 3010;

const app = express();
let data = "Initial Data";
const waitingClientList = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__filename, "/index.html");
});

// use for short polling ---

app.get('/getData', (req, res)=>{
  res.send({data})
})

// use post to update
// open a new tab and call this api
app.get('/updateData', (req, res)=>{
  data = 'updated data';
  res.send({data})
})


app.listen(PORT, () => {
  console.log(`listening to PORT : ${PORT}`);
});
