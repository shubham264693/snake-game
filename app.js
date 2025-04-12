const express = require('express');
const path = require('path');

const app = express();

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index'); // index.ejs should contain "Snake Game"
});

app.get('/healthCheck',(res,res)=>{
    return res.status(200).json({ message : "Health Check added"})
})

// Only listen when not in test
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
