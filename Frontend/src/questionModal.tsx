import React, { useState } from 'react';

interface QuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (question: string, image?: File) => Promise<void>;
}

export default function QuestionModal({ isOpen, onClose, onSubmit }: QuestionModalProps) {
    const [question, setQuestion] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await onSubmit(question, image || undefined);
            setQuestion('');
            setImage(null);
            setImagePreview(null);
            onClose();
        } catch (error) {
            console.error('Error submitting question:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-1/2 max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">Ask a Question</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                            Your Question
                        </label>
                        <textarea
                            id="question"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                            rows={4}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type your question here..."
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                            Upload an Image (Optional)
                        </label>
                        <div className="mt-1 flex items-center space-x-4">
                            <label
                                htmlFor="image"
                                className="cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 transition duration-200"
                            >
                                Choose Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {image && (
                                <span className="text-sm text-green-600">
                                    ✓ Image selected
                                </span>
                            )}
                        </div>
                        {imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-w-full h-48 object-contain rounded-lg border border-gray-200"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                'Submit Question'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
        
