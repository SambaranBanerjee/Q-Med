import React, { useState } from 'react';

interface QuestionProps {
  onQuestionSubmit: (question: string) => void;
}

export default function Question({ onQuestionSubmit }: QuestionProps) {
  const [question, setQuestion] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (question.trim()) {
      onQuestionSubmit(question);
      setQuestion(''); // Clear the textarea after submission
      console.log('Submitted Question:', question);
      alert('Submitted Question');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 space-y-6"
    >
      <label htmlFor="question" className="block text-xl font-semibold text-gray-800">
        Ask your Question:
      </label>
      <textarea
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        rows={5}
      />
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}