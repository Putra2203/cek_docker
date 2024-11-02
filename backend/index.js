const express = require("express");
const cors = require("cors");
const db = require("./config");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = 5000;

app.use(express.json());

// Get all items
app.get("/api/barang", (req, res) => {
  const query = "SELECT * FROM barang";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch items" });
    } else {
      res.json(results);
    }
  });
}); 

// Get item by ID
app.get("/api/barang/:id", (req, res) => {
  const query = "SELECT * FROM barang WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch item" });
    } else {
      res.json(results[0]);
    }
  });
});

// Create new item
app.post("/api/barang", (req, res) => {
  const { nama, hrg, jml, ket } = req.body;
  const query = "INSERT INTO barang (nama, hrg, jml, ket) VALUES (?, ?, ?, ?)";
  db.query(query, [nama, hrg, jml, ket], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create item" });
    } else {
      res.status(201).json({ id: results.insertId, nama, hrg, jml, ket });
    }
  });
});

// Update item
app.put("/api/barang/:id", (req, res) => {
  const { nama, hrg, jml, ket } = req.body;
  const query = "UPDATE barang SET nama = ?, hrg = ?, jml = ?, ket = ?, WHERE id = ?";
  db.query(query, [nama, hrg, jml, ket, req.params.id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update item" });
    } else {
      res.json({ message: "Item updated successfully" });
    }
  });
});

// Delete item
app.delete("/api/barang/:id", (req, res) => {
  const query = "DELETE FROM barang WHERE id = ?";
  db.query(query, [req.params.id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete item" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
