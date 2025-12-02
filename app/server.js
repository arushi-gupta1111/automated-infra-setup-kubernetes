const http = require('http');

// Set port and environment
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

// Define responses based on environment
const responses = {
  development: "Hello from DEV environment!",
  staging: "Hello from STAGING environment!",
  production: "Hello from PROD environment!"
};

// Create server
const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    return res.end(JSON.stringify({status: "ok", environment: env}));
  }

  // Respond based on current environment
  const message = responses[env] || "Hello from app";
  res.end(message);
});

// Start server
server.listen(port, () => console.log(`Listening on port ${port} in ${env} mode`));
