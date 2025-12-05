import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Document {
    id: number;
    title: string;
    src: string;
    created_at: string;
}

interface Props {
    documents: Document[];
}

export default function Index({ documents }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this document?')) {
            fetch(`/documents/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            })
            .then(() => window.location.reload())
            .catch(err => console.error(err));
        }
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
                    <Link href="/documents/create">
                        <Button>Add Document</Button>
                    </Link>
                </div>

                {documents.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No documents yet.</p>
                        <Link href="/documents/create">
                            <Button className="mt-4">Create your first document</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3">Title</th>
                                    <th className="px-6 py-3">Created At</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <Link href={`/documents/${doc.id}`} className="text-blue-600 hover:underline font-medium">
                                                {doc.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(doc.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link href={`/documents/${doc.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(doc.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
