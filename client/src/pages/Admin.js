import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

export default function Admin() {
  const { adminPassword } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Watercolour',
    medium: '',
    dimensions: '',
    year: new Date().getFullYear(),
    available: true,
    featured: false,
    tags: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setStatus({ loading: false, message: 'Please select an image', error: true });
      return;
    }

    setStatus({ loading: true, message: 'Uploading image...', error: false });

    try {
      // 1. Upload the image first
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);

      const uploadRes = await axios.post('/api/upload', imageFormData, {
        headers: { 
          'x-admin-password': adminPassword 
        }
      });
      
      const imageUrl = uploadRes.data.imageUrl;

      // 2. Format the tags string into an array
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

      // 3. Post the full artwork data to the database
      const artworkData = {
        ...formData,
        price: Number(formData.price),
        year: Number(formData.year),
        tags: tagsArray,
        imageUrl: imageUrl,
        driveImageId: '' // left blank intentionally as per model
      };

      setStatus({ loading: true, message: 'Saving to database...', error: false });
      
      await axios.post('/api/artworks', artworkData, {
        headers: {
          'x-admin-password': adminPassword
        }
      });

      setStatus({ loading: false, message: 'Artwork uploaded successfully!', error: false });
      
      // Reset form
      setFormData({
        title: '', description: '', price: '', category: 'Watercolour',
        medium: '', dimensions: '', year: new Date().getFullYear(),
        available: true, featured: false, tags: ''
      });
      setImageFile(null);
      e.target.reset(); // Reset file input
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus({ loading: false, message: '', error: false }), 3000);

    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired or invalid password. Please log in again.");
      }
      setStatus({ 
        loading: false, 
        message: err.response?.data?.error || 'Failed to upload artwork. Please try again.', 
        error: true 
      });
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Upload new artwork to your collection.</p>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        {status.message && (
          <div className={`status-message ${status.error ? 'error' : 'success'}`}>
            {status.message}
          </div>
        )}

        <div className="form-group">
          <label>Artwork Image *</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            required 
            className="file-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price (₹) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" />
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="3"></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Watercolour">Watercolour</option>
              <option value="Oil">Oil</option>
              <option value="Gouache">Gouache</option>
              <option value="Ink">Ink</option>
              <option value="Mixed Media">Mixed Media</option>
            </select>
          </div>
          <div className="form-group">
            <label>Medium (e.g. Oil on canvas) *</label>
            <input type="text" name="medium" value={formData.medium} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Dimensions (e.g. 30cm × 40cm) *</label>
            <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Year *</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Tags (comma separated, e.g. landscape, floral, sunset)</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="nature, blue, peaceful" />
        </div>

        <div className="form-row checkboxes">
          <label className="checkbox-label">
            <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
            Available for Sale
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
            Feature on Home Page
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={status.loading}>
          {status.loading ? 'Uploading...' : 'Publish Artwork'}
        </button>
      </form>
    </div>
  );
}
