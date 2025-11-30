const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req,res) => {
  if (req.url === "/health") {
    return res.end(JSON.stringify({status: "ok"}));
  }
  res.end("Hello from app");
});
server.listen(port, ()=> console.log("Listening", port));

