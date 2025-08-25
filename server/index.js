const dotenv = require('dotenv').config();

const express = require('express');
const cors = require("cors")
const postgres = require('postgres');
const {Pool} = require("pg")

const app = express();
app.use(cors())
// for future use, put origin in curly braces within the cors()
// e.g. cors({origin : "https://..."})
// to ensure that data is only obtained from secure domains. NOT every dataset

app.use(express.json())
//allows app to parse POST requests

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGSSLMODE, PGCHANNELBINDING} = process.env;
//Pooling
const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  sslmode: PGSSLMODE,
  channelBinding: PGCHANNELBINDING,
})

const PORT = process.env.PORT || 4242;
// still pooling but too lazy to combine haha


// server to display items for SALE (from backend to frontend)
app.get("/", async (_,res) => {
    const client = await pool.connect()
    //pooling statement to connect with neondb
    try {
      //Using SQL to query databases for GET requests
      const result = await client.query("SELECT * FROM products")
      //display json data
      res.json(result.rows)
    } catch(err){
      console.log(err)
    }finally{
      client.release()
      //release client session after finishing rendering all json data
    }
})

//server to display items in CART (from backend to frontend)
app.get("/cart", async (_,res) => {
    const client = await pool.connect()  
    try {
      //Using SQL to query databases
      const result = await client.query("SELECT * FROM cart")
      res.json(result.rows)
    } catch(err){
      console.log(err)
    }finally{
      client.release()
      //release client session after finishing rendering all json data
    }
})

//server to UPDATE things in CART (from frontend to backend)
app.post("/cart", async (req, res) => {
  const client = await pool.connect();
  try {
    const { id, quantity } = req.body;
    //request to post entry to database
    const result = await client.query(
      `INSERT INTO cart (id, quantity) 
       VALUES ($1, $2) RETURNING *`,
      [id, quantity]
    );
    //SQL code, INSERT inserts data into the cart table, filling the id and quantity columns
    // VALUES ($1, $2) are placeholders 
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err)
  } 
  finally {
    client.release();
  }
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});