import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppStore } from '../../store';
import { Message } from '../../models';
import { MessageService } from '../../services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('form', { static: false }) public form?: FormGroupDirective;

  private messageSubscription?: Subscription;

  public userName: string | null;
  public messages: Array<Message> = [];
  public chatForm = new FormGroup({
    text: new FormControl('', [Validators.required])
  });

  constructor(
    private appStore: AppStore,
    private messageService: MessageService,
    private router: Router
  ) {
    this.userName = sessionStorage.getItem('userName');
  }

  public ngOnInit(): void {
    if(!this.messageService.isSocketConnected()) {
      this.redirectToSignIn();
    }

    this.messageSubscription = this.appStore.messages$.subscribe((messages: Array<Message>) => {
      this.messages = messages;
    });
  }

  public onSubmit() {
    this.messageService.sendMessage(this.chatForm.value.text);
    this.form?.resetForm();
  }

  public logout() {
    this.messageService.disconnect();
    this.redirectToSignIn();
  }

  private redirectToSignIn() {
    sessionStorage.removeItem('userName');
    this.router.navigate(['/sign-in']);
  }

  public ngOnDestroy() {
    if(this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
