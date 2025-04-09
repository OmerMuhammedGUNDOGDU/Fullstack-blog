import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError('Kayıt başarısız! ' + err.response?.data?.message);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Kayıt Ol</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" className="form-control mb-2" placeholder="Ad Soyad" onChange={handleChange} required />
        <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" className="form-control mb-2" placeholder="Şifre" onChange={handleChange} required />
        <button className="btn btn-primary">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default Register;
