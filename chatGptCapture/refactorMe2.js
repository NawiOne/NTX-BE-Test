exports.refactoreMe2 = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      // Use a raw query to insert a new survey record
      const insertQuery = `
        INSERT INTO surveys (userId, values, createdAt, updatedAt)
        VALUES (:userId, :values, NOW(), NOW())
        RETURNING *;
      `;
      const [survey] = await db.sequelize.query(insertQuery, {
        replacements: {
          userId: req.body.userId,
          values: JSON.stringify(req.body.values), // Ensure the array is stored correctly
        },
        type: db.sequelize.QueryTypes.INSERT,
        transaction, // Pass the transaction object
      });
  
      // Use a raw query to update the "dosurvey" field in the users table
      const updateQuery = `
        UPDATE users
        SET dosurvey = true, updatedAt = NOW()
        WHERE id = :userId;
      `;
      await db.sequelize.query(updateQuery, {
        replacements: {
          userId: req.body.userId,
        },
        type: db.sequelize.QueryTypes.UPDATE,
        transaction, // Pass the transaction object
      });
  
      // Commit the transaction
      await transaction.commit();
  
      // Send success response
      res.status(201).send({
        statusCode: 201,
        message: "Survey sent successfully!",
        success: true,
        data: survey,
      });
    } catch (error) {
      // Rollback the transaction if any query fails
      await transaction.rollback();
      console.error(error);
      res.status(500).send({
        statusCode: 500,
        message: "Cannot post survey.",
        success: false,
      });
    }
  };
  