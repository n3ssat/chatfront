    import { useState } from 'react';
    import axios from 'axios';

    const GameSelection = ({ onGameStart }) => {
    const categories = [
        { id: 1, name: 'Farándula', emoji: '🎭' },
        { id: 2, name: 'Historia', emoji: '🏛️' },
        { id: 3, name: 'Ciencia', emoji: '🔬' },
        { id: 4, name: 'Deporte', emoji: '⚽' },
        { id: 5, name: 'Arte', emoji: '🎨' }
    ];
    const [loading, setLoading] = useState(false);

    const handleStartGame = async (category) => {
        setLoading(true);
        try {
        const response = await axios.post('https://chatback-chi.vercel.app/api/chat/start', { 
            category 
        });
        /*const response = await axios.post('http://localhost:5000/api/chat/start', { 
            category 
        });*/
        onGameStart(response.data);
        } catch (error) {
        console.error('Error al iniciar el juego:', error);
        alert('Error al iniciar el juego. Intenta de nuevo.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
            Elige una categoría
        </h2>
        <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
            <button
                key={cat.id}
                onClick={() => handleStartGame(cat.name)}
                disabled={loading}
                className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
                <span className="text-3xl mb-2">{cat.emoji}</span>
                <span className="font-medium text-purple-800">{cat.name}</span>
            </button>
            ))}
        </div>
        {loading && (
            <div className="mt-4 text-center text-purple-600">
            Generando preguntas...
            </div>
        )}
        </div>
    );
    };

    export default GameSelection;