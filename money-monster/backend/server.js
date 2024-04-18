const express = require('express');
const userRoutes = require('./userroutes');
const cors = require('cors');

// CORS options
const corsOptions = {
    origin: true, // Allow only requests from your React application
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));


// Use routes defined in userRoutes.js
app.use('/api', userRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
