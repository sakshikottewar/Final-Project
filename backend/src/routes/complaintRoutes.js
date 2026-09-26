import { Router } from "express";
import { pool } from "../db.js";

const router = Router();


// GET ALL COMPLAINTS
router.get("/", async (req, res, next) => {

  try {

    const [rows] = await pool.query(`
      SELECT 
        c.id,
        c.facility_id,
        c.reported_by,
        c.title,
        c.description,
        c.priority,
        c.status,
        f.name AS facility_name,
        u.name AS reporter_name
      FROM complaints c
      JOIN facilities f 
        ON f.id = c.facility_id
      LEFT JOIN users u 
        ON u.id = c.reported_by
      ORDER BY c.id DESC
    `);

    res.json(rows);

  } catch (error) {

    console.error("GET COMPLAINTS ERROR:", error);

    next(error);
  }
});


// CREATE COMPLAINT
router.post("/", async (req, res, next) => {

  try {

    console.log("COMPLAINT BODY:");
    console.log(req.body);

    const {
      facility_id,
      reported_by,
      title,
      description,
      priority = "Medium"
    } = req.body;


    // Validation
    if (!facility_id) {

      return res.status(400).json({
        message: "Facility ID is required"
      });

    }


    if (!title || !title.trim()) {

      return res.status(400).json({
        message: "Complaint title is required"
      });

    }


    const [result] = await pool.query(
      `
      INSERT INTO complaints
      (
        facility_id,
        reported_by,
        title,
        description,
        priority
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        Number(facility_id),
        reported_by ? Number(reported_by) : null,
        title.trim(),
        description?.trim() || null,
        priority
      ]
    );


    console.log(
      "COMPLAINT INSERTED:",
      result.insertId
    );


    res.status(201).json({

      success: true,

      id: result.insertId,

      message: "Complaint created successfully"

    });


  } catch (error) {

    console.error("CREATE COMPLAINT ERROR:");
    console.error(error);

    next(error);
  }

});


// UPDATE STATUS
router.put("/:id/status", async (req, res, next) => {

  try {

    const { status } = req.body;

    if (!["Open", "In Progress", "Resolved"].includes(status)) {

      return res.status(400).json({
        message: "Invalid complaint status"
      });

    }


    const [result] = await pool.query(
      "UPDATE complaints SET status=? WHERE id=?",
      [
        status,
        req.params.id
      ]
    );


    if (!result.affectedRows) {

      return res.status(404).json({
        message: "Complaint not found"
      });

    }


    res.json({
      message: "Complaint status updated"
    });


  } catch (error) {

    console.error("UPDATE COMPLAINT ERROR:", error);

    next(error);

  }

});


export default router;