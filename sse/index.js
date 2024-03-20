const express = require("express");
const {join} = require('node:path')

const PORT = 3010
const app = express()

app.use(express.static("public"));

app.get("/sse",(req, res)=>{
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection','keep-live');
  res.setHeader('Cache-Control', 'no-cache');
  const intervalId = setInterval(() => {
    const stock1Rate = Math.floor(Math.random() * 30000);
    const stock2Rate = Math.floor(Math.random() * 40000);
    const currentTime = new Date().toLocaleTimeString()
    res.write(`data: ${JSON.stringify({currentTime,stock1Rate, stock2Rate})} \n\n`)
  }, 1000);

  req.on('close', ()=>{
    clearInterval(intervalId)
  })

})

app.get("/", (req, res) => {
  res.sendFile(join(__filename, "/index.html"));
});

app.listen(PORT,()=>{
  console.log(`App is connected to ${PORT}`)
})

