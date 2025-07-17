const express = require('express');
const router = express.Router();
const { getAllTasks, getTask, addTask, deleteTask, editTask, clearAllTasks } = require('../controllers/taskController');

router.get('/', getAllTasks);
router.get('/:id' , getTask);
router.post('/', addTask);
router.delete('/:id', deleteTask);
router.patch('/:id', editTask);
router.delete('/clear', clearAllTasks)

module.exports = router;
