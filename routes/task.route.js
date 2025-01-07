const express = require ('express');
const router = express.Router();
const authMiddleware = require ('../Middlewares/authMiddleware.js')
const taskController = require('../controllers/task.controller.js')

router.get('/edit/:id',authMiddleware, taskController.editTask ); 
router.get('/', authMiddleware, taskController.getTasks);
router.post('/create', authMiddleware, taskController.createTasks);
router.post('/edit/:id',authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);   
  
   
module.exports = router;   