const express = require("express");

const PORT = 3010;

const app = express();
let data = "Initial Data";
const waitingClientList = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__filename, "/index.html");
});

//  use for long polling ---
app.get("/getData", (req, res) => {
  if (data !== req.query.lastData) {
    res.json({ data });
  } else {
    waitingClientList.push(res);
  }
});

// open new tab and open url - http://localhost:3010/updateData?newData=abc
app.get("/updateData", (req, res) => {
  data = req.query.newData;
  while(waitingClientList.length>0){
    const clientRes = waitingClientList.pop()
    clientRes.json({data})
  }
  res.json({})
});

app.listen(PORT, () => {
  console.log(`listening to PORT : ${PORT}`);
});
