<?php

namespace App\Http\Controllers;

use App\Models\book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return book::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'author' => 'required',
            'publish_year' => 'required'
        ]);

        book::create($request->all());
        return response()->json([
            'message' => 'Item added succefully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(book $book)
    {
        return response()->json([
            'book' => $book
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, book $book)
    {
        $request->validate([
            'title' => 'required',
            'author' => 'required',
            'publish_year' => 'required'
        ]);
        try{
            $book->update([
                'title' => $request->title,
                'author' => $request->author,
                'publish_year' => $request->publish_year,
            ]);
            return response()->json([
                'message' => 'Item updated successfully'
            ]);
        }catch(\Exception $error){
            return response()->json([
                'error' => $error->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(book $book)
    {
        try{
            $book->delete();
            return response()->json([
                'message' => 'Item deleted successfully'
            ]);
        }catch(\Exception $error){
            return response()->json([
                'error' => $error->getMessage()
            ], 500);
        }
    }
}
