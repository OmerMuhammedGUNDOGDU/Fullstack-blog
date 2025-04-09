import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Blog gönderilerini API'den alalım
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Blog gönderileri alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="row">
      {posts.map((post) => (
        <div key={post.id} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.excerpt}</p>
              <Link to={`/posts/${post.id}`} className="btn btn-primary">Detaylar</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
