import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from '../../services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required])
  });

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  public onSubmit() {
    this.messageService.initializeWebSocket().subscribe((connected: boolean) => {
      if(connected) {
        sessionStorage.setItem('userName', this.loginForm.value.userName);
        this.router.navigate(['/chat']);
      }
    });
  }
}
