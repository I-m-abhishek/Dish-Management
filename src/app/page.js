"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    dishId: '',
    dishName: '',
    imageUrl: '',
    isPublished: true,
  });
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger updates

  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await axios.get('/api/dishes');
        setDishes(response.data.dishes); // Ensure this line matches your backend response structure
      } catch (error) {
        console.log('Failed to fetch dishes:', error);
      }
    }
    fetchDishes();
  }, [updateTrigger]); // Trigger effect when updateTrigger changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/dishes', newDish, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUpdateTrigger((prev) => !prev); // Toggle the updateTrigger state to refresh the dishes list
      setNewDish({ dishId: '', dishName: '', imageUrl: '', isPublished: true });
    } catch (error) {
      console.log('Failed to add dish:', error);
    }
  };

  const togglePublish = async (dishId) => {
    try {
      const response = await axios.post('/api/togglePublish', { dishId }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setUpdateTrigger((prev) => !prev); // Toggle the updateTrigger state to refresh the dishes list
      } else {
        console.error('Failed to toggle publish status:', response.data.error);
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dish Dashboard</h1>
      <form onSubmit={handleAddDish} className="mb-4">
        <input
          type="text"
          name="dishId"
          value={newDish.dishId}
          onChange={handleInputChange}
          placeholder="Dish ID"
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="dishName"
          value={newDish.dishName}
          onChange={handleInputChange}
          placeholder="Dish Name"
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={newDish.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="mr-2 p-2 border rounded"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Dish</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes.map((dish) => (
          <div key={dish.dishId} className="border p-4 rounded">
            <img src={dish.imageUrl} alt={dish.dishName} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-bold">{dish.dishName}</h2>
            <button
              onClick={() => togglePublish(dish.dishId)}
              className={`mt-2 p-2 rounded ${dish.isPublished ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              {dish.isPublished ? 'Unpublish' : 'Publish'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
