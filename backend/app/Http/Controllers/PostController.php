<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PostImageRequest;
use App\Http\Requests\PostUpdateRequest;

class PostController extends Controller
{
    public function index(Request $request) {
        $param = $request->get('query');

        $model = Post::latest()->where(function($query) use($param) {
            if (!empty($param)) {
                $query->where('title', 'LIKE', '%'.$param.'%');
            }
        })->paginate(3);

        return response()->json($model, Response::HTTP_OK);

    }

    public function store(PostRequest $request) {

        $post = Post::create($request->validated());

        return response()->json([
            'message' => 'CREATED'
        ], Response::HTTP_CREATED);
    }

    public function update(PostUpdateRequest $request, $id) {

        $post = Post::find($id);

        $post->update($request->validated());

        return response()->json([
            'post' => $post
        ], Response::HTTP_OK);
    }

    public function destroy($id) {

        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'message' => 'Not Found.'
            ], Response::HTTP_NOT_FOUND);
        }

        $post->delete();

        return response()->json([
            'message' => 'DELETED'
        ], Response::HTTP_OK);
    }

    public function addImage(PostImageRequest $request) {
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $input['file'] = time().'.'.$image->getClientOriginalExtension();

            Storage::disk('public')->put('images/'.$input['file'], file_get_contents($image));

            $imageURL = url('/').'/storage/images/'.$input['file'];

            $post = Post::find($request->post_id);
            $post->update([
                'image' => $imageURL
            ]);

            return response()->json([
                'image' => $imageURL
            ], Response::HTTP_OK);
        }

    }
}
