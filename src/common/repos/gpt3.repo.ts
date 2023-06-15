import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Gpt3Repo {
  private readonly endpoint = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey =
    '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'; // replace with your actual OpenAI API key

  async generateText(prompt: string): Promise<string> {
    const promptTemplate = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Act like a nutritionis, provide me a weekly meals and snacks. its all should be arranged in points and short sentances with line breaks and take in considaration all my perfers, limitations and goals. please take in a considaration an average budget for the grosery.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    };
    const response = await axios.post(this.endpoint, promptTemplate, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    return response.data.choices[0].message.content.trim();
  }
}
