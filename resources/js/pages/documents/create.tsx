import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        title: '',
        src: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/documents');
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link href="/documents">
                        <Button variant="outline">← Back to Documents</Button>
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Document</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Document Title
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full"
                            placeholder="Enter document title"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="src" className="block text-sm font-medium text-gray-700 mb-2">
                            PDF File Path or URL
                        </Label>
                        <Input
                            id="src"
                            type="text"
                            value={data.src}
                            onChange={(e) => setData('src', e.target.value)}
                            className="w-full"
                            placeholder="Enter path to PDF file or URL"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Enter the path or URL to your PDF file
                        </p>
                        {errors.src && (
                            <p className="mt-1 text-sm text-red-600">{errors.src}</p>
                        )}
                    </div>

                    <div className="flex gap-4 pt-6">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {processing ? 'Creating...' : 'Create Document'}
                        </Button>
                        <Link href="/documents">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
