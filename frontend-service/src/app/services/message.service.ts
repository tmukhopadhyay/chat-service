import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Observable, Subscriber } from 'rxjs';
import * as SockJS from 'sockjs-client';

import { environment } from '../../environments/environment';
import { AppStore } from '../store';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private serverBaseUrl = environment.serverBaseUrl;
  public stompClient: any;

  constructor(private appStore: AppStore) {}

  public initializeWebSocket(): Observable<boolean> {
    return new Observable((observer: Subscriber<any>) => {
      const _this = this;
      const socketUrl = `${_this.serverBaseUrl}/ws`;
      const ws = new SockJS(socketUrl);

      _this.stompClient = Stomp.over(ws);
      _this.stompClient.connect({}, function() {
        _this.getMessages();
        _this.handleErrors();

        return observer.next(true);
      }, function(err: any) {
        console.log(err);
        return observer.error(err);
      });

      observer.next(false);
    });
  }

  private getMessages() {
    this.stompClient.subscribe('/topic/messages', (message: any) => {
      if (message.body) {
        this.appStore.addMessage(JSON.parse(message.body));
      }
    });
  }

  private handleErrors() {
    this.stompClient.subscribe('/queue/errors', (message: any) => {
      if (message.body) {
        console.log('Error: ' + message.body);
      }
    });
  }

  public sendMessage(message: string) {
    this.stompClient.send('/app/chat', {}, JSON.stringify({
      name: sessionStorage.getItem('userName'),
      text: message
    }));
  }

  public isSocketConnected(): boolean {
    return this.stompClient?.connected;
  }

  public disconnect() {
    if(this.stompClient?.connected) {
      this.stompClient.disconnect();
    }
  }
}
