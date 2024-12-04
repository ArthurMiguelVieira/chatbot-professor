import React, { useState } from 'react';
import { GraduationCap, MessageSquare } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { AccentGame } from './components/AccentGame';
import { getChatCompletion } from './services/openai';
import type { Message } from './types';
import { cn } from './utils/cn';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Eu sou seu professor de português. Como posso ajudar você hoje?',
    },
  ]);
  const [showGame, setShowGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    try {
      const userMessage: Message = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      const response = await getChatCompletion([...messages, userMessage]);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Professor de Português</h1>
          <p className="text-gray-600">Aprenda português de forma divertida e interativa</p>
        </header>

        <div className="flex gap-4 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setShowGame(false)}
            className={cn(
              'flex-1 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all',
              !showGame
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            <MessageSquare className="w-5 h-5" />
            Chat
          </button>
          <button
            onClick={() => setShowGame(true)}
            className={cn(
              'flex-1 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all',
              showGame
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            <GraduationCap className="w-5 h-5" />
            Jogo
          </button>
        </div>

        {showGame ? (
          <AccentGame onNext={() => {}} />
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}