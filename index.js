const express = require('express');
const pool = require('./db');

const app = express();

app.use(express.json());

// ROUTES

//get all todos
app.get('/todos' , async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.log(err.message);
    }
})
//get a todo
app.get('/todos/:id' , async (req ,res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1" ,[id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})
//create a todo
app.post('/todos' , async (req , res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VAlUES ($1) RETURNING *" , [description]);
        res.json(newTodo.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.log(err);
    }
})
//update a todo
app.put('/todos/:id' , async(req , res) => {
    try {
        const {id} = req.params //  WHERE
        const { description} = req.body;  // SET
        const updateTodo = pool.query("UPDATE todo SET description = $1 WHERE todo_id =$2" , [description , id])
        res.json('Todo was updated');
    } catch (err) {
        console.log(err.message);
    }
})
//delete a todo
app.delete('/todos/:id' , async (req , res) =>{
    try {
        const {id} = req.params;
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id =$1",[id])
        res.json('todo was deleted')
    } catch (err) {
        console.log(err.message);
    }
})

const port = 3000;
app.listen( port , ()=>{
    console.log(`server is running on port ${port}`);
})