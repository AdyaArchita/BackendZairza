const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let nextId = 1; 

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string.' });
  }

  const newTodo = {
    id: nextId++,
    title,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'To-do item not found.' });
  }

  const deleted = todos.splice(index, 1);
  res.status(200).json({ message: 'Deleted successfully.', item: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`To-Do server running at http://localhost:${PORT}`);
});
