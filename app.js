const express = require('express');
const app = express();

const todos = [
  "Learn Jenkins pipelines",
  "Automate builds with Git",
  "Deploy sample Node app"
];

app.get('/', (req, res) => {
  res.send(`
    <h1>TODO Application by Ram</h1>
    <ul>
      ${todos.map(item => `<li>${item}</li>`).join('')}
    </ul>
  `);
});

app.listen(3000, () => {
  console.log("🚀 TODO App running on http://localhost:3000");
});
