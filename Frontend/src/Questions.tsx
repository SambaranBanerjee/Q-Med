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
      setQuestion(''); 
      console.log('Submitted Question:', question);
      alert('Submitted Question');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-lg shadow-lg p-6 space-y-4"
    >
      <label htmlFor="question" className="block text-lg font-semibold text-gray-800">
        Ask your Question:
      </label>
      <textarea
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        rows={4}
      />
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}