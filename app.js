const express = require('express');
const app = express();

const todos = [
  "Learn Jenkins pipelines",
  "Automate builds with Git",
  "Deploy sample Node app",
  "This is your 1st Todo-Demo-App",
  
];

app.get('/', (req, res) => {
  res.send(`
    <h1>Ram TODO App </h1>
    <ul>
      ${todos.map(item => `<li>${item}</li>`).join('')}
    </ul>
  `);
});

app.listen(3000, () => {
  console.log("🚀 TODO App running on http://localhost:3000");
});
