let express = require('express');
let app = express();
let { repository } = require('./repository');
const port = 3000;

app.get('/', async (_, res) => {

    const people = await repository.query(`SELECT * FROM people`);
  
    const title = '<h1>Full Cycle Rocks!</h1>';
    const list = `
      <ul>
        ${people.map(p => `<li>${p.name}</li>`).join('')}
      </ul>
    `;
  
    res.send(title + list);
});

app.listen (port, () => {    
    repository.query(`CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`);
    repository.query(`INSERT INTO people (name) VALUES ('Cristiano Rosa')`);
    
    console.log('Rodando na porta '+port);    
})
    