<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoteRequest;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::where('user_id', auth()->id())->get(['id', 'title', 'content']);
        return response()->json(['notes' => $notes]);
    }

    public function store(StoreNoteRequest $request)
    {        
        Note::create(array_merge($request->validated(), ['user_id' => auth()->id()]));

        return response()->json([
            'message' => 'Note created successfully!',
            'notes' => Note::where('user_id', auth()->id())->get(['id', 'title', 'content'])
        ], 201);
    }

    public function update(StoreNoteRequest $request, $id)
    {
        $validated = $request->validated();

        $note = Note::findOrFail($id);
        $note->update($validated);

        return response()->json(['message' => 'Note updated successfully!']);
    }

    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $note->delete();

        return response()->json(['message' => 'Note deleted successfully!'], 200);
    }
}
