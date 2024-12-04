import OpenAI from 'openai';
import { OPENAI_CONFIG } from '../config/openai';
import type { Message } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getChatCompletion(messages: Message[]): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      temperature: OPENAI_CONFIG.temperature,
      max_tokens: OPENAI_CONFIG.max_tokens,
      messages: [
        { role: 'system', content: OPENAI_CONFIG.systemPrompt },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ]
    });

    return response.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Erro ao processar sua mensagem. Por favor, tente novamente.');
  }
}