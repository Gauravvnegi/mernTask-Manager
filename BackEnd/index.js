const express = require('express');
const app = express();
const connectToDatabase  = require('./db')
const  Task = require('./Models/model')
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors');
// Connect to the database
connectToDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json()); 
app.get('/api/getAll',async(req,res)=>{
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving tasks' });
    }
})


app.get("/api/searchTask", async (req, res) => {
  const { title } = req.query;
  try {
    const task = await Task.find({ title: { $regex: title, $options: "i" } }); 
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error });
  }
});

app.post('/api/addNew',async(req,res)=>{
    try{
        const {title, description} = req.body;
        const data = new Task({
            title,
            description,
        })
        const saveData = await data.save();

        res.status(200).send(saveData)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error adding task' });
    }
})

app.post('/api/delete', async (req, res) => {
    try {
        const { id } = req.body; 
        const result = await Task.findByIdAndDelete(id); 
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).send('Task deleted successfully');
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});
app.put('/api/update', async (req, res) => {
    try {
        const { id, title, description } = req.body; 
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description }, 
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Error updating task' });
    }
});


app.listen(3001 , ()=>{
    console.log('Server is running on port 3001');
 
})