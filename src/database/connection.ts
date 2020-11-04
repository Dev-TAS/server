import knex from 'knex' 
import 'dotenv/config' 


const db = knex({ 
  client:'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password:'docker',
    database: 'tasdb',
  }, 
  useNullAsDefault: true
}) 

export default db
  