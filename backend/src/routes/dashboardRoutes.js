import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [[facilities]] = await pool.query('SELECT COUNT(*) AS total FROM facilities');
    const [[inspections]] = await pool.query('SELECT COUNT(*) AS total FROM inspections');
    const [[complaints]] = await pool.query("SELECT COUNT(*) AS total FROM complaints WHERE status <> 'Resolved'");
    const [recent] = await pool.query(`
      SELECT i.id, f.name AS facility_name, i.inspection_date, i.score, i.status
      FROM inspections i
      JOIN facilities f ON f.id = i.facility_id
      ORDER BY i.id DESC LIMIT 5
    `);
    res.json({
      totalFacilities: facilities.total,
      totalInspections: inspections.total,
      openComplaints: complaints.total,
      recentInspections: recent
    });
  } catch (error) {
    next(error);
  }
});

export default router;
