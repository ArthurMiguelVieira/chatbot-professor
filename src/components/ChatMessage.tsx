import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { cn } from '../utils/cn';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg',
        isUser ? 'bg-blue-50' : 'bg-gray-50'
      )}
    >
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
        {isUser ? (
          <MessageCircle className="w-5 h-5 text-blue-500" />
        ) : (
          <Bot className="w-5 h-5 text-green-500" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{message.content}</p>
      </div>
    </div>
  );
}