<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // Tüm blog gönderilerini listeleme
   public function index()
   {
       $posts = Post::all();
       return response()->json($posts);
   }

   // Yeni blog gönderisi oluşturma
   public function store(Request $request)
   {
       $request->validate([
           'title' => 'required|string|max:255',
           'content' => 'required|string',
       ]);

       $post = Post::create([
           'title' => $request->title,
           'content' => $request->content,
       ]);

       return response()->json($post, 201);
   }

   // Belirli bir blog gönderisini güncelleme
   public function update(Request $request, $id)
   {
       $post = Post::findOrFail($id);

       $request->validate([
           'title' => 'sometimes|required|string|max:255',
           'content' => 'sometimes|required|string',
       ]);

       $post->update($request->all());

       return response()->json($post);
   }

   // Belirli bir blog gönderisini silme
   public function destroy($id)
   {
       $post = Post::findOrFail($id);
       $post->delete();

       return response()->json(['message' => 'Post deleted successfully']);
   }
}
