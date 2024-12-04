import React, { useState, useEffect } from 'react';
import { Trophy, Zap } from 'lucide-react';
import type { AccentGame as AccentGameType, GameStats } from '../types';
import { cn } from '../utils/cn';
import { getRandomWords } from '../utils/game';

interface AccentGameProps {
  onNext: () => void;
}

export function AccentGame({ onNext }: AccentGameProps) {
  const [words, setWords] = useState<AccentGameType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [stats, setStats] = useState<GameStats>({
    correct: 0,
    total: 0,
    streak: 0,
  });

  useEffect(() => {
    setWords(getRandomWords(10));
  }, []);

  const currentWord = words[currentIndex];

  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);

    const isCorrect = option === currentWord.correctWord;
    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
      streak: isCorrect ? prev.streak + 1 : 0,
    }));
  };

  const handleNext = () => {
    if (currentIndex === words.length - 1) {
      setWords(getRandomWords(10));
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    setSelectedOption(null);
    setShowResult(false);
    onNext();
  };

  if (!currentWord) return null;

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Precisão</p>
              <p className="text-2xl font-bold">{accuracy}%</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sequência</p>
              <p className="text-2xl font-bold">{stats.streak}</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Selecione a acentuação correta:</h3>
          <p className="text-4xl font-bold text-gray-800 mb-4">{currentWord.word}</p>
          <p className="text-gray-600">Palavra {currentIndex + 1} de {words.length}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {currentWord.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={showResult}
              className={cn(
                'p-4 text-lg font-semibold rounded-lg transition-all',
                showResult
                  ? option === currentWord.correctWord
                    ? 'bg-green-100 text-green-700 border-2 border-green-500'
                    : option === selectedOption
                    ? 'bg-red-100 text-red-700 border-2 border-red-500'
                    : 'bg-gray-100 text-gray-700'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="space-y-4">
            <div className={cn(
              'p-4 rounded-lg',
              selectedOption === currentWord.correctWord
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            )}>
              <p className="font-semibold mb-2">
                {selectedOption === currentWord.correctWord
                  ? '🎉 Parabéns! Você acertou!'
                  : '😅 Ops! Não foi dessa vez!'}
              </p>
              <p className="text-sm">{currentWord.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Próxima Palavra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}