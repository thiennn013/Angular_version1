import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration, OpenAIApi } from 'openai';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private openai: OpenAIApi;
  configuration = new Configuration({
    apiKey: "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",
  });

  constructor() {
    this.openai = new OpenAIApi(this.configuration);
  }

  generateText(prompt: string):Promise<string | undefined>{
   return this.openai.createCompletion({
    model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 256
      }).then(response => {
        return response.data.choices[0].text;
      }).catch(error=>{
        return '';
      });
  }
}
