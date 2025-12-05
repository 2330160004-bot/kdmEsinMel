<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    /**
     * Display a listing of user's documents.
     */
    public function index(): Response
    {
        $documents = auth()->user()->documents()->latest()->get();

        return Inertia::render('Documents/Index', [
            'documents' => $documents,
        ]);
    }

    /**
     * Show the form for creating a new document.
     */
    public function create(): Response
    {
        return Inertia::render('Documents/Create');
    }

    /**
     * Store a newly created document in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'src' => ['required', 'string'],
        ]);

        auth()->user()->documents()->create($validated);

        return redirect()->route('documents.index')
            ->with('success', 'Document created successfully.');
    }

    /**
     * Display the specified document.
     */
    public function show(Document $document): Response
    {
        // Authorize user
        $this->authorize('view', $document);

        return Inertia::render('Documents/Show', [
            'document' => $document,
        ]);
    }

    /**
     * Show the form for editing the specified document.
     */
    public function edit(Document $document): Response
    {
        // Authorize user
        $this->authorize('update', $document);

        return Inertia::render('Documents/Edit', [
            'document' => $document,
        ]);
    }

    /**
     * Update the specified document in storage.
     */
    public function update(Request $request, Document $document): RedirectResponse
    {
        // Authorize user
        $this->authorize('update', $document);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'src' => ['required', 'string'],
        ]);

        $document->update($validated);

        return redirect()->route('documents.index')
            ->with('success', 'Document updated successfully.');
    }

    /**
     * Remove the specified document from storage.
     */
    public function destroy(Document $document): RedirectResponse
    {
        // Authorize user
        $this->authorize('delete', $document);

        $document->delete();

        return redirect()->route('documents.index')
            ->with('success', 'Document deleted successfully.');
    }
}
