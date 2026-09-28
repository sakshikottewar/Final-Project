import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET ALL INSPECTIONS
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        i.id,
        i.facility_id,
        i.inspector_id,
        i.inspection_date,
        i.score,
        i.status,
        i.notes,
        f.name AS facility_name,
        u.name AS inspector_name
      FROM inspections i
      JOIN facilities f
        ON f.id = i.facility_id
      LEFT JOIN users u
        ON u.id = i.inspector_id
      ORDER BY
        i.inspection_date DESC,
        i.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.error("GET INSPECTIONS ERROR:", error);
    next(error);
  }
});

// CREATE INSPECTION
router.post("/", async (req, res, next) => {
  try {
    console.log("INSPECTION BODY:");
    console.log(req.body);

    const {
      facility_id,
      inspector_id,
      inspection_date,
      score,
      status,
      notes
    } = req.body;

    if (!facility_id) {
      return res.status(400).json({
        message: "Facility ID is required"
      });
    }

    if (!inspection_date) {
      return res.status(400).json({
        message: "Inspection date is required"
      });
    }

    if (score === undefined || score === "") {
      return res.status(400).json({
        message: "Score is required"
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Status is required"
      });
    }

    if (Number(score) < 0 || Number(score) > 100) {
      return res.status(400).json({
        message: "Score must be between 0 and 100"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO inspections
      (
        facility_id,
        inspector_id,
        inspection_date,
        score,
        status,
        notes
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
      `,
      [
        Number(facility_id),
        inspector_id ? Number(inspector_id) : null,
        inspection_date,
        Number(score),
        status,
        notes?.trim() || null
      ]
    );

    console.log(
      "INSPECTION INSERTED:",
      result.rows[0].id
    );

    res.status(201).json({
      success: true,
      id: result.rows[0].id,
      message: "Inspection created successfully"
    });

  } catch (error) {
    console.error("CREATE INSPECTION ERROR:");
    console.error(error);

    next(error);
  }
});

export default router;