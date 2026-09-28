import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// GET all facilities
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT f.*, d.name AS department_name
      FROM facilities f
      LEFT JOIN departments d ON d.id = f.department_id
      ORDER BY f.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET facility by ID
router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM facilities WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// CREATE facility
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      location,
      facility_type,
      status = 'Active',
      department_id
    } = req.body;

    if (!name || !location || !facility_type) {
      return res.status(400).json({
        message: 'Name, location and facility type are required'
      });
    }

    const result = await pool.query(
      `INSERT INTO facilities
       (name, location, facility_type, status, department_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        name,
        location,
        facility_type,
        status,
        department_id || null
      ]
    );

    res.status(201).json({
      id: result.rows[0].id,
      message: 'Facility created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE facility
router.put('/:id', async (req, res, next) => {
  try {
    const {
      name,
      location,
      facility_type,
      status,
      department_id
    } = req.body;

    const result = await pool.query(
      `UPDATE facilities
       SET name = $1,
           location = $2,
           facility_type = $3,
           status = $4,
           department_id = $5
       WHERE id = $6`,
      [
        name,
        location,
        facility_type,
        status,
        department_id || null,
        req.params.id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Facility not found'
      });
    }

    res.json({
      message: 'Facility updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// DELETE facility
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(
      'DELETE FROM facilities WHERE id = $1',
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Facility not found'
      });
    }

    res.json({
      message: 'Facility deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;