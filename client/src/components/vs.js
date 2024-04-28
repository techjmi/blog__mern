  // Import the Express.js framework
  const express = require('express');

  // Create an instance of the Express application
  const app = express();

  // Define the port number for your server
  const PORT = process.env.PORT || 3000;

  // Define a route handler for the root URL ("/")
  app.get('/', (req, res) => {
    // Send a "Hello, World!" response
    res.send('Hello, World!');
  });

  // Start the server and listen for incoming requests on the specified port
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
