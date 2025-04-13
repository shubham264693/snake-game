const express = require('express');
const path = require('path');

const app = express();

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
// Express servers file from static folder so remember whenever you want to serve static files keep them into public folder
// and which file or anything your using using pass /static infront of path
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes ejs rendering
// Added test comment to check jenkins auto build
app.get('/', (req, res) => {
  res.render('index'); // index.ejs should contain "Snake Game"
});


// Only listen when not in test
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
