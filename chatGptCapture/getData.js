const { sequelize } = require('./models'); // Assuming your Sequelize instance is exported from your models

// Function to get total attacks by destinationCountry and sourceCountry
exports.getData = async (req, res) => {
  try {
    // Raw SQL query to count attacks per destinationCountry and sourceCountry
    const query = `
      SELECT destinationCountry AS label, COUNT(*) AS total
      FROM attack_logs
      GROUP BY destinationCountry
      ORDER BY total DESC;
    `;

    // Execute the raw query
    const [results] = await sequelize.query(query);

    // Extract labels and totals
    const labels = results.map(row => row.label);
    const totals = results.map(row => row.total);

    // Send the result as the response
    res.json({
      label: labels,
      total: totals,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
