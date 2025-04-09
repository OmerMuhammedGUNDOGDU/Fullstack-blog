import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function BlogCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/posts', form);
      setSuccess(true);
      setForm({ title: '', content: '' });  // Formu temizle
      setError(null);
      navigate('/');  // Ana sayfaya yönlendir
    } catch (err) {
      setError('Gönderi oluşturulamadı! ' + err.response?.data?.message);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Yeni Gönderi Oluştur</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Gönderi başarıyla oluşturuldu!</div>}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          className="form-control mb-2" 
          placeholder="Başlık" 
          onChange={handleChange} 
          value={form.title}
          required 
        />
        <textarea 
          name="content" 
          className="form-control mb-2" 
          placeholder="İçerik" 
          onChange={handleChange} 
          value={form.content} 
          rows="5"
          required
        />
        <button className="btn btn-primary">Gönderiyi Oluştur</button>
      </form>
    </div>
  );
}

export default BlogCreate;
