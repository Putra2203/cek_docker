// src/components/ItemList.jsx
import React from 'react';
import ItemRow from './ItemRow';

function ItemList({ items, onEdit, onDelete }) {
  return (
    <table className="min-w-full overflow-hidden bg-white border border-gray-200 rounded-md shadow-md">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Name</th>
          <th className="px-4 py-2 border-b">Price</th>
          <th className="px-4 py-2 border-b">Stock</th>
          <th className="px-4 py-2 border-b">Keterangan</th>
          <th className="px-4 py-2 border-b">Actions</th>
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
