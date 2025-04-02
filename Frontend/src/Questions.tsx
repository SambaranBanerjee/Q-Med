import { useState, useRef } from 'react';

interface QuestionProps {
  onQuestionSubmit: (question: string, image?: File) => Promise<void>;
}

export default function Question({ onQuestionSubmit }: QuestionProps) {
  const [question, setQuestion] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    
    if (!question || question.trim().length === 0) {
      setError('Question cannot be empty');
      return;
    }

    if (question.trim().length < 3) {
      setError('Question must be at least 3 characters long');
      return;
    }

    try {
      setIsSubmitting(true);
      await onQuestionSubmit(question.trim(), image || undefined);
      setQuestion('');
      setImage(null);
      setError(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting question:', error);
      setError('Failed to submit question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
      >
        Ask a Question
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Ask Your Question</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                    id="image-upload"
                  />
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="image-upload"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      Choose File
                    </label>
                    {image && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">
                          {image.name.length > 20 
                            ? `${image.name.substring(0, 20)}...` 
                            : image.name}
                        </span>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-white rounded-lg ${
                      isSubmitting ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}