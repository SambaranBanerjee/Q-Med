import { useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

export default function MyQuestionsPage() {
    const location = useLocation();
    const { darkMode } = useTheme();
    const questions = location.state?.questions || [];

    return (
        <div className={`p-6 min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
            <h1 className="text-2xl font-bold mb-6">All My Questions</h1>
            <div className="space-y-4">
                {questions.length > 0 ? (
                    <ul className="space-y-3">
                        {questions.map((q: string, index: number) => (
                            <li key={index} className={`p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} rounded-lg border`}>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{q}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No questions found.</p>
                )}
            </div>
        </div>
    );
}