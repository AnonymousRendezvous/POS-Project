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
  sslmode:  { rejectUnauthorized: false },
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
      const result = await client.query("SELECT * FROM products ORDER BY id")
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
// app.get("/cart", async (_,res) => {
//     const client = await pool.connect()  
//     try {
//       //Using SQL to query databases
//       const result = await client.query("SELECT * FROM cart ORDER BY id")
//       res.json(result.rows)
//     } catch(err){
//       console.log(err)
//     }finally{
//       client.release()
//       //release client session after finishing rendering all json data
//     }
// })

// //server to UPDATE things in CART (from frontend to backend)
// app.post("/cart", async (req, res) => {
//   const client = await pool.connect();
//   try {
//     const { id, quantity, cost} = req.body;
//     //request to post entry to database
//     const result = await client.query(
//       `INSERT INTO cart (id, quantity, cost)
//        VALUES ($1, $2, $3)
//        ON CONFLICT (id) DO UPDATE
//        SET quantity = cart.quantity + EXCLUDED.quantity
//        RETURNING *;`,
//       [id, quantity,cost]
//     );
//     //SQL code, INSERT inserts data into the cart table, filling the id and quantity columns
//     // VALUES ($1, $2) are placeholders 
//     // Checks if the quantity already exists, then set the new quantity
//     res.json(result.rows[0]); 
//   } catch (err) {
//     console.log(err)
//   } 
//   finally {
//     client.release();
//   }
// });

// app.delete("/cart", async (req,res) => {
//   const client = await pool.connect();
//   try {
//     const { id, removeAll } = req.body;

//     // If removeAll flag is true → delete the row entirely
//     if (removeAll) {
//       await client.query(`DELETE FROM cart WHERE id = $1`, [id]);
//       return res.json({ message: "Item removed completely" });
//     }

//     // Otherwise, decrement the quantity by 1
//     const result = await client.query(
//       `UPDATE cart
//        SET quantity = quantity - 1
//        WHERE id = $1
//        RETURNING *;`,
//       [id]
//     );

//     // If no row matched the id
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Item not found" });
//     }

//     // If quantity reaches 0, remove the item completely
//     if (result.rows[0].quantity <= 0) {
//       await client.query(`DELETE FROM cart WHERE id = $1`, [id]);
//       return res.json({ message: "Item removed completely" });
//     }

//     // Otherwise, return the updated row
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to remove item" });
//   } finally {
//     client.release();
//   }
// });

// app.get("/invoices", async (req, res) => {
//   try {
//     const invoicesRes = await pool.query("SELECT * FROM invoices ORDER BY created_at DESC");
//     const invoices = invoicesRes.rows;

//     // Fetch items for all invoices
//     for (const invoice of invoices) {
//       const itemsRes = await pool.query(
//         "SELECT * FROM invoice_items WHERE invoice_id=$1",
//         [invoice.id]
//       );
//       invoice.items = itemsRes.rows;
//       invoice.total_price = itemsRes.rows.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       );
//     }

//     res.json(invoices);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch invoices" });
//   }
// });

// // POST a new invoice with items
// app.post("/invoices", async (req, res) => {
//   const { status, due_date, items } = req.body;

//   try {
//     await pool.query("BEGIN");

//     const invoiceRes = await pool.query(
//       "INSERT INTO invoices (status, due_date) VALUES ($1, $2) RETURNING *",
//       [status || "pending", due_date]
//     );
//     const invoiceId = invoiceRes.rows[0].id;

//     for (const item of items) {
//       await pool.query(
//         "INSERT INTO invoice_items (invoice_id, product_name, quantity, price) VALUES ($1, $2, $3, $4)",
//         [invoiceId, item.product_name, item.quantity, item.price]
//       );
//     }

//     await pool.query("COMMIT");

//     // Return invoice with items
//     invoiceRes.rows[0].items = items;
//     invoiceRes.rows[0].total_price = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     res.status(201).json(invoiceRes.rows[0]);
//   } catch (err) {
//     await pool.query("ROLLBACK");
//     console.error(err);
//     res.status(500).json({ error: "Failed to create invoice with items" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});

//MERN without MongoDB
// Mongo DB, Expressjs, react and nodejs