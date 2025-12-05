import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Document {
    id: number;
    title: string;
    src: string;
    created_at: string;
}

interface Props {
    document: Document;
}

export default function Show({ document }: Props) {
    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <Link href="/documents">
                        <Button variant="outline">← Back to Documents</Button>
                    </Link>
                    <div className="flex gap-2">
                        <Link href={`/documents/${document.id}/edit`}>
                            <Button variant="outline">Edit</Button>
                        </Link>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{document.title}</h1>
                <p className="text-gray-500 mb-8">
                    Created on {new Date(document.created_at).toLocaleDateString()}
                </p>

                <div className="bg-gray-100 rounded-lg p-8 mb-8 min-h-96">
                    {document.src.match(/\.(pdf)$/i) ? (
                        <embed
                            src={document.src}
                            type="application/pdf"
                            width="100%"
                            height="600px"
                            className="rounded"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-96">
                            <p className="text-gray-600 text-lg mb-4">
                                PDF Preview not available for this file
                            </p>
                            <a
                                href={document.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Open PDF in new tab
                            </a>
                        </div>
                    )}
                </div>

                <div className="border-t pt-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Document Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Title</p>
                            <p className="font-medium text-gray-900">{document.title}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Created At</p>
                            <p className="font-medium text-gray-900">
                                {new Date(document.created_at).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
