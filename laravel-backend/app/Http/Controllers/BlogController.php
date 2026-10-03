<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Blog;

class BlogController extends Controller
{
    /**
     * Display a listing of published blog posts.
     */
    public function index(Request $request)
    {
        $query = Blog::where('status', 'published');

        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        if ($request->has('q')) {
            $term = '%' . $request->q . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('excerpt', 'like', $term);
            });
        }

        $blogs = $query->orderBy('published_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'count' => $blogs->count(),
            'data' => $blogs,
        ]);
    }

    /**
     * Display single blog post by slug.
     */
    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)->first();

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => "Blog '{$slug}' not found",
            ], 404);
        }

        $blog->increment('views_count');

        return response()->json([
            'success' => true,
            'data' => $blog,
        ]);
    }

    /**
     * Store and publish a new blog post.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:100',
            'image' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $slug = Str::slug($validated['title']);
        $uniqueSlug = $slug;
        $counter = 1;
        while (Blog::where('slug', $uniqueSlug)->exists()) {
            $uniqueSlug = "{$slug}-{$counter}";
            $counter++;
        }

        $blog = Blog::create([
            'title' => $validated['title'],
            'slug' => $uniqueSlug,
            'category' => $validated['category'] ?? 'Web Development',
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'] ?? $validated['excerpt'],
            'author' => $validated['author'] ?? 'Admin Team',
            'read_time' => '4 min read',
            'image' => $validated['image'] ?? '/images/full-stact-development.png',
            'tags' => $validated['tags'] ?? [],
            'status' => 'published',
            'published_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Article published successfully',
            'data' => $blog,
        ], 201);
    }

    /**
     * Update an article.
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Article updated successfully',
            'data' => $blog,
        ]);
    }

    /**
     * Delete an article.
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully',
        ]);
    }
}
