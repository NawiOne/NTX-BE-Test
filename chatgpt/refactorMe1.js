const refactoreMe1 = async (req, res) => {
    try {
      // Use raw SQL query to fetch and sum the values, dividing each by 10.
      const query = `
        SELECT 
          SUM(CASE WHEN array_length(values, 1) >= 1 THEN values[1] ELSE 0 END) / 10.0 AS index1,
          SUM(CASE WHEN array_length(values, 1) >= 2 THEN values[2] ELSE 0 END) / 10.0 AS index2,
          SUM(CASE WHEN array_length(values, 1) >= 3 THEN values[3] ELSE 0 END) / 10.0 AS index3,
          SUM(CASE WHEN array_length(values, 1) >= 4 THEN values[4] ELSE 0 END) / 10.0 AS index4,
          SUM(CASE WHEN array_length(values, 1) >= 5 THEN values[5] ELSE 0 END) / 10.0 AS index5,
          SUM(CASE WHEN array_length(values, 1) >= 6 THEN values[6] ELSE 0 END) / 10.0 AS index6,
          SUM(CASE WHEN array_length(values, 1) >= 7 THEN values[7] ELSE 0 END) / 10.0 AS index7,
          SUM(CASE WHEN array_length(values, 1) >= 8 THEN values[8] ELSE 0 END) / 10.0 AS index8,
          SUM(CASE WHEN array_length(values, 1) >= 9 THEN values[9] ELSE 0 END) / 10.0 AS index9,
          SUM(CASE WHEN array_length(values, 1) >= 10 THEN values[10] ELSE 0 END) / 10.0 AS index10
        FROM surveys;
      `;
  
      const [results] = await db.sequelize.query(query);
      
      const totalIndex = [
        results[0].index1 ? parseFloat(results[0].index1.toFixed(2)) : null,
        results[0].index2 ? parseFloat(results[0].index2.toFixed(2)) : null,
        results[0].index3 ? parseFloat(results[0].index3.toFixed(2)) : null,
        results[0].index4 ? parseFloat(results[0].index4.toFixed(2)) : null,
        results[0].index5 ? parseFloat(results[0].index5.toFixed(2)) : null,
        results[0].index6 ? parseFloat(results[0].index6.toFixed(2)) : null,
        results[0].index7 ? parseFloat(results[0].index7.toFixed(2)) : null,
        results[0].index8 ? parseFloat(results[0].index8.toFixed(2)) : null,
        results[0].index9 ? parseFloat(results[0].index9.toFixed(2)) : null,
        results[0].index10 ? parseFloat(results[0].index10.toFixed(2)) : null,
      ];
  
      res.status(200).send({
        statusCode: 200,
        success: true,
        data: totalIndex,
      });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        success: false,
        message: 'Internal server error',
      });
    }
  };
  