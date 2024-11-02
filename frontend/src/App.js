import React, { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000/api/barang';

  // Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
        setError(null);
      } catch (error) {
        setError(`Failed to fetch items: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Add new item
  const addItem = async (item) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newItem = await response.json();
      setItems([...items, newItem]);
      setError(null);
    } catch (error) {
      setError(`Failed to add item: ${error.message}`);
    }
  };

  // Edit item
  const updateItem = async (updatedItem) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${updatedItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setItems(items.map((item) => 
        item.id === updatedItem.id ? updatedItem : item
      ));
      setEditingItem(null);
      setError(null);
    } catch (error) {
      setError(`Failed to update item: ${error.message}`);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { 
        method: 'DELETE' 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setItems(items.filter((item) => item.id !== id));
      setError(null);
    } catch (error) {
      setError(`Failed to delete item: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Inventory Management
        </h1>
        
        {/* Error Message */}
        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <>
            <ItemForm
              onSubmit={editingItem ? updateItem : addItem}
              editingItem={editingItem}
            />
            <ItemList
              items={items}
              onEdit={setEditingItem}
              onDelete={deleteItem}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;