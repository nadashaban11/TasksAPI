
const taskService = require('../services/taskServices');

async function getAllTasks(req,res) {
    try{
        const tasks = await taskService.readAllTasks();
        res.status(200).json(tasks);
    }
    catch(error){
        res.status(500).json({error : "could not get tasks"});
    }
};

async function getTask(req , res){
    const taskID = req.params.id;
    try{
        const tasks = await taskService.readAllTasks();
        const myTask = tasks.find(task=>task.id === Number(taskID));
        if(!myTask){
            res.status(404).json({error : "can not find task"})
        }
        res.status(200).json(myTask);
    }
    catch(error){
            return res.status(404).json({error : "can not find task"});
    }
}

async function addTask(req,res){
    try{
        const tasks = await taskService.readAllTasks();
        const newTask = {
            id : tasks.length + 1,
            text : req.body.text,
            done : req.body.done
        };
        tasks.push(newTask);
        await taskService.writeAllTasks(tasks);
        res.status(200).send("Task Added");
    }
    catch(error){
            return res.status(500).json({error : "failed to add task"});
    }
}

async function deleteTask(req, res) {
    try {
        const tasks = await taskService.readAllTasks();
        const id = Number(req.params.id);
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found" });
        }
        const updatedTasks = tasks.filter(task => task.id !== id);
        await taskService.writeAllTasks(updatedTasks);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
}
async function editTask(req, res) {
    try {
        const tasks = await taskService.readAllTasks();
        const idx = tasks.findIndex(task => task.id === Number(req.params.id));
        if (idx === -1) {
            return res.status(404).json({ error: "Task not found" });
        }
        tasks[idx].text = req.body.text;
        tasks[idx].done = req.body.done !== undefined ? req.body.done : tasks[idx].done; 
        await taskService.writeAllTasks(tasks);
        return res.status(200).json({ message: "Task updated successfully", task: tasks[idx] });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

async function clearAllTasks(req, res) {
    try {
        await taskService.writeAllTasks([]);
        res.status(200).json({ message: "All tasks have been cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to clear tasks" });
    }
}

module.exports = { getAllTasks ,getTask, addTask, deleteTask, editTask, clearAllTasks}

