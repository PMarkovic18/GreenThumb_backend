const express = require('express');
const plantRoutes = require('./routes/plantRoutes');
const growthLogRoutes = require('./routes/growthLogRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/growthlogs', growthLogRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
