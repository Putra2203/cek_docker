// src/components/ItemForm.jsx
import React, { useState, useEffect } from "react";

function ItemForm({ onSubmit, editingItem }) {
  const [form, setForm] = useState({ nama: "", hrg: "", jml: "", ket: "" });

  useEffect(() => {
    if (editingItem) {
      setForm(editingItem);
    } else {
      setForm({ nama: "", hrg: "", jml: "", ket: "" });
    }
  }, [editingItem]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nama: "", hrg: "", jml: "", ket: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 bg-white rounded-md shadow-md"
    >
      <input
        type="text"
        name="nama"
        placeholder="nama"
        value={form.nama}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded-md"
      />
      <input
        type="number"
        name="hrg"
        placeholder="hrg"
        value={form.hrg}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded-md"
      />
      <input
        type="number"
        name="jml"
        placeholder="jml"
        value={form.jml}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        name="ket"
        placeholder="kett"
        value={form.ket}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded-md"
      >
        {editingItem ? "Update" : "Add"} Item
      </button>
    </form>
  );
}

export default ItemForm;
