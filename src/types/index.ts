export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface AccentGame {
  word: string;
  options: string[];
  correctWord: string;
  explanation: string;
}

export interface GameStats {
  correct: number;
  total: number;
  streak: number;
}