import { Component } from '@angular/core';
import { ChatService } from '../../service/chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './chat-gpt.component.html',
})
export class ChatGptComponent {
  textList: textResponse[] = [{ sno: 1, text: '', response: '' }];

  constructor(private openaiService: ChatService) {}

  generateText(data: textResponse) {
    this.openaiService.generateText(data.text).then((text) => {
      data.response = text;
      if (this.textList.length === data.sno) {
        this.textList.push({ sno: 1, text: '', response: '' });
      }
    });
  }
}

export class textResponse {
  sno: number = 1;
  text: string = '';
  response: any = '';
}
