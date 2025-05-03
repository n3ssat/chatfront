    const QuestionCard = ({ 
        question, 
        options, 
        selectedOption, 
        onSelect,
        showResult,
        correctAnswer
    }) => {
        return (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-purple-200">
            <h3 className="font-semibold text-lg mb-3 text-purple-800">
            {question}
            </h3>
            <div className="space-y-2">
            {options.map((option, idx) => {
                const optionLetter = option.split(')')[0];
                const isCorrect = showResult && optionLetter === correctAnswer;
                const isSelectedWrong = showResult && 
                                    selectedOption === optionLetter && 
                                    optionLetter !== correctAnswer;
                
                return (
                <div 
                    key={idx}
                    onClick={() => !showResult && onSelect(optionLetter)}
                    className={`p-3 rounded-lg cursor-pointer transition-all
                    ${!showResult && selectedOption === optionLetter ? 
                        'bg-purple-600 text-white' : 
                        !showResult ? 
                        'bg-purple-100 hover:bg-purple-200' : 
                        isCorrect ? 
                        'bg-green-100 border border-green-400' : 
                        isSelectedWrong ? 
                        'bg-red-100 border border-red-400' : 
                        'bg-gray-50'
                    }`}
                >
                    {option}
                    {showResult && isCorrect && (
                    <span className="ml-2 text-green-600">✓ Correcta</span>
                    )}
                    {showResult && isSelectedWrong && (
                    <span className="ml-2 text-red-600">✗ Incorrecta</span>
                    )}
                </div>
                );
            })}
            </div>
        </div>
        );
    };
    
    export default QuestionCard;