app.get('/items', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 items
  const offset = (page - 1) * limit; // Calculate the offset
  const search = req.query.search || ""; // Get the search term

  try {
    const result = await pool.query(
      'SELECT * FROM api WHERE LOWER(user) LIKE LOWER($1) ORDER BY id LIMIT $2 OFFSET $3', 
      [`%${search}%`, limit, offset]
    );

    const totalCountResult = await pool.query('SELECT COUNT(*) FROM api WHERE LOWER(user) LIKE LOWER($1)', [`%${search}%`]);
    const totalCount = parseInt(totalCountResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      items: result.rows,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: search ? 1 : page, // If search term exists, return currentPage as 1
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
