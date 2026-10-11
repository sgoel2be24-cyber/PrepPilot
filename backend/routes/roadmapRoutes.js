const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  validateCreateRoadmap,
  validateUpdateRoadmap,
  validateToggleTask,
} = require("../Input_validators/ValidateRoadmap");

const {
  createRoadmap,
  getUserRoadmaps,
  getRoadmapById,
  updateRoadmap,
  toggleTask,
  deleteRoadmap,
} = require("../controllers/roadmapController");

// Rate limiting is applied at the server layer (server.js attaches
// generalLimiter to /api/roadmaps) — a router-level limiter here would
// double-charge every request against the same quota.

// Authentication
router.use(protect);

router.post("/", validateCreateRoadmap, createRoadmap);
router.get("/", getUserRoadmaps);
router.get("/:id", getRoadmapById);
router.put("/:id", validateUpdateRoadmap, updateRoadmap);
router.patch("/:id/tasks", validateToggleTask, toggleTask);
router.delete("/:id", deleteRoadmap);

module.exports = router;