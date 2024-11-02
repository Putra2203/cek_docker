// src/components/ItemList.jsx
import React from 'react';
import ItemRow from './ItemRow';

function ItemList({ items, onEdit, onDelete }) {
  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden shadow-md">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Price</th>
          <th className="py-2 px-4 border-b">Stock</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

export default ItemList;
