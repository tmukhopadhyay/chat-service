import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Message } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppStore {

  private readonly messages = new BehaviorSubject<Array<Message>>([]);
  public readonly messages$ = this.messages.asObservable();

  constructor() { }

  public setMessages(messages: Array<Message>) {
    this.messages.next(messages);
  }

  public addMessage(message: Message) {
    this.messages.next([ ...this.messages.getValue(), message ]);
  }
}
