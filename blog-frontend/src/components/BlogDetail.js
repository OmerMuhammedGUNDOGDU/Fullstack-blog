import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';

function BlogDetail() {
  const { id } = useParams();  // URL'den gönderi ID'sini alıyoruz
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Gönderi detayları alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);  // id değiştiğinde yeniden veri çekilecek

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!post) {
    return <div>Gönderi bulunamadı.</div>;
  }

  return (
    <div className="col-md-8 offset-md-2">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default BlogDetail;
