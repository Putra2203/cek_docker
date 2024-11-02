// src/components/ItemRow.jsx
import React from 'react';

function ItemRow({ item, onEdit, onDelete }) {
  return (
    <tr>
      <td className="px-4 py-2 border-b">{item.nama}</td>
      <td className="px-4 py-2 border-b">{item.hrg}</td>
      <td className="px-4 py-2 border-b">{item.jml}</td>
      <td className="px-4 py-2 border-b">
        <button onClick={() => onEdit(item)} className="px-3 py-1 mr-2 text-white bg-yellow-400 rounded">
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className="px-3 py-1 text-white bg-red-500 rounded">
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ItemRow;
