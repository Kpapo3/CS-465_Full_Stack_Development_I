const fs = require('fs');
const path = require('path');

let trips = [];
try {
    const dataPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
    trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch(err) {
    console.error('Error reading JSON data:', err);
    trips = [];
}

/* GET Travel View */
const travel = (req, res) => {
    // 'trips' available in scope
    res.render('travel', {title: 'Travlr Getaways', trips});
};

module.exports = {
    travel
};