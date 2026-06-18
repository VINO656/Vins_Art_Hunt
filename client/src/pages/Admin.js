import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

export default function Admin() {
  const { adminPassword } = useAuth();
  
  const [artworks, setArtworks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const defaultFormState = {
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
  };

  const [formData, setFormData] = useState(defaultFormState);
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const [passwordData, setPasswordData] = useState({ newPassword: '' });
  const [passwordStatus, setPasswordStatus] = useState({ loading: false, message: '', error: false });

  const fetchArtworks = async () => {
    try {
      const res = await axios.get('/api/artworks');
      setArtworks(res.data);
    } catch (err) {
      console.error('Failed to fetch artworks', err);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ newPassword: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !imageFile) {
      setStatus({ loading: false, message: 'Please select an image', error: true });
      return;
    }

    setStatus({ loading: true, message: editingId ? 'Updating artwork...' : 'Uploading image...', error: false });

    try {
      let imageUrl = formData.imageUrl;

      // 1. Upload the image first if there's a new one
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);

        const uploadRes = await axios.post('/api/upload', imageFormData, {
          headers: { 
            'x-admin-password': adminPassword 
          }
        });
        
        imageUrl = uploadRes.data.imageUrl;
      }

      // 2. Format the tags string into an array
      const tagsArray = typeof formData.tags === 'string' 
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : formData.tags;

      // 3. Post the full artwork data to the database
      const artworkData = {
        ...formData,
        price: Number(formData.price),
        year: Number(formData.year),
        tags: tagsArray,
        imageUrl: imageUrl,
        driveImageId: formData.driveImageId || ''
      };

      setStatus({ loading: true, message: 'Saving to database...', error: false });
      
      if (editingId) {
        await axios.put(`/api/artworks/${editingId}`, artworkData, {
          headers: {
            'x-admin-password': adminPassword
          }
        });
        setStatus({ loading: false, message: 'Artwork updated successfully!', error: false });
      } else {
        await axios.post('/api/artworks', artworkData, {
          headers: {
            'x-admin-password': adminPassword
          }
        });
        setStatus({ loading: false, message: 'Artwork uploaded successfully!', error: false });
      }
      
      // Reset form
      setFormData(defaultFormState);
      setImageFile(null);
      setEditingId(null);
      e.target.reset(); // Reset file input
      
      fetchArtworks(); // Refresh list

      // Clear success message after 3 seconds
      setTimeout(() => setStatus({ loading: false, message: '', error: false }), 3000);

    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired or invalid password. Please log in again.");
      }
      setStatus({ 
        loading: false, 
        message: err.response?.data?.error || 'Failed to save artwork. Please try again.', 
        error: true 
      });
    }
  };

  const handleEdit = (artwork) => {
    setEditingId(artwork._id);
    setFormData({
      ...artwork,
      tags: artwork.tags ? artwork.tags.join(', ') : ''
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      await axios.delete(`/api/artworks/${id}`, {
        headers: {
          'x-admin-password': adminPassword
        }
      });
      fetchArtworks(); // refresh list
    } catch (err) {
      alert("Failed to delete artwork: " + (err.response?.data?.error || err.message));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(defaultFormState);
    setImageFile(null);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!passwordData.newPassword) return;

    setPasswordStatus({ loading: true, message: 'Updating password...', error: false });

    try {
      await axios.post('/api/admin/update-password', { newPassword: passwordData.newPassword }, {
        headers: {
          'x-admin-password': adminPassword
        }
      });

      setPasswordStatus({ loading: false, message: 'Password updated successfully!', error: false });
      setPasswordData({ newPassword: '' });
      setTimeout(() => setPasswordStatus({ loading: false, message: '', error: false }), 3000);
      alert("Password updated! Please log in with the new password next time.");
    } catch (err) {
      setPasswordStatus({ 
        loading: false, 
        message: err.response?.data?.error || 'Failed to update password.', 
        error: true 
      });
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Manage your collection and settings.</p>
      </div>

      <div className="admin-section">
        <h2>{editingId ? 'Edit Artwork' : 'Upload New Artwork'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          {status.message && (
            <div className={`status-message ${status.error ? 'error' : 'success'}`}>
              {status.message}
            </div>
          )}

          <div className="form-group">
            <label>Artwork Image {editingId ? '(Leave blank to keep current image)' : '*'}</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              required={!editingId} 
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

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={status.loading}>
              {status.loading ? 'Saving...' : (editingId ? 'Update Artwork' : 'Publish Artwork')}
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={cancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-section">
        <h2>Manage Artworks</h2>
        <div className="artworks-list">
          {artworks.map(art => (
            <div key={art._id} className="artwork-list-item">
              <div className="artwork-info">
                <img src={art.imageUrl} alt={art.title} className="artwork-thumb" />
                <div className="artwork-details">
                  <h3>{art.title}</h3>
                  <p>{art.category} • ₹{art.price}</p>
                </div>
              </div>
              <div className="artwork-actions">
                <button onClick={() => handleEdit(art)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(art._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
          {artworks.length === 0 && <p>No artworks found.</p>}
        </div>
      </div>

      <div className="admin-section">
        <h2>Update Admin Password</h2>
        <form className="admin-form password-form" onSubmit={handlePasswordUpdate}>
          {passwordStatus.message && (
            <div className={`status-message ${passwordStatus.error ? 'error' : 'success'}`}>
              {passwordStatus.message}
            </div>
          )}
          <div className="form-group">
            <label>New Password *</label>
            <input 
              type="text" 
              name="newPassword" 
              value={passwordData.newPassword} 
              onChange={handlePasswordChange} 
              required 
              placeholder="Enter new password"
            />
          </div>
          <button type="submit" className="submit-btn" disabled={passwordStatus.loading}>
            {passwordStatus.loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
