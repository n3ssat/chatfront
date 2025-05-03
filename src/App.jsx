import { useState } from 'react';
import GameSelection from './components/GameSelection';
import QuestionCard from './components/QuestionCard';
import axios from 'axios';

function App() {
  const [gameState, setGameState] = useState('selection'); // 'selection', 'playing', 'results'
  const [currentGame, setCurrentGame] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGameStart = (gameData) => {
    setCurrentGame(gameData);
    setAnswers(Array(gameData.questions.length).fill(null));
    setGameState('playing');
  };

  const handleSelectAnswer = (questionIndex, option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.some(a => a === null)) {
      alert('Por favor responde todas las preguntas');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://chatback-chi.vercel.app/api/chat/submit', { 
      /*const response = await axios.post('http://localhost:5000/api/chat/submit', { */
        gameId: currentGame.gameId,
        answers
      });
      
      setResults(response.data);
      setGameState('results');
    } catch (error) {
      console.error('Error al enviar respuestas:', error);
      alert('Error al enviar respuestas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewGame = () => {
    setGameState('selection');
    setCurrentGame(null);
    setAnswers([]);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 mb-4 mt-2">
        Preguntado con ChatGPT
      </h1>

      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
        {gameState === 'selection' && (
          <GameSelection onGameStart={handleGameStart} />
        )}

        {gameState === 'playing' && currentGame && (
          <div className="flex-1 flex flex-col pb-4">
            <div className="bg-white shadow-lg rounded-xl p-4 mb-4">
              <h2 className="text-xl font-bold text-purple-800 mb-2">
                Categoría: {currentGame.category}
              </h2>
              <p className="text-sm text-purple-600">
                Responde las siguientes preguntas:
              </p>
            </div>

            {currentGame.questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question.question}
                options={question.options}
                selectedOption={answers[index]}
                onSelect={(option) => handleSelectAnswer(index, option)}
              />
            ))}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Calculando...' : 'Enviar Respuestas'}
            </button>
          </div>
        )}

        {gameState === 'results' && results && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">
              Resultados
            </h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {results.score}/{results.totalQuestions}
              </div>
              <div className="text-lg">
                {results.score === results.totalQuestions ? '¡Perfecto! 🎉' : 
                 results.score >= results.totalQuestions * 0.7 ? '¡Buen trabajo! 👍' : 
                  'Sigue practicando 💪'}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {results.questions.map((q, idx) => (
                <QuestionCard
                  key={idx}
                  question={q.question}
                  options={q.options}
                  selectedOption={q.userAnswer}
                  showResult={true}
                  correctAnswer={q.correctAnswer}
                />
              ))}
            </div>

            <button
              onClick={handleNewGame}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-bold hover:from-purple-600 hover:to-indigo-600"
            >
              Jugar de nuevo
            </button>
          </div>
        )}

        <p className="text-center text-purple-600 font-medium text-sm my-2">
          Desarrollado con ❤️ para UNICATOLICA 2025
        </p>
      </div>
    </div>
  );
}

export default App;