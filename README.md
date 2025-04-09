# Fullstack Blog

Laravel + React ile geliştirilmiş basit bir blog uygulaması.

## Yapı

- `blog-backend/` → Laravel API (Post CRUD)
- `blog-frontend/` → React uygulaması (Verileri API üzerinden alır)


## Kurulum

### Frontend
```bash
cd blog-frontend
npm install
npm start
```

### Backend
```bash
cd blog-backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve


