import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MailsService } from '../services/mails.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.page.html',
  styleUrls: ['./send-mail.page.scss'],
})
export class SendMailPage implements OnInit {
  public mailForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private mailsService: MailsService, private router: Router) { }

  ngOnInit() {
    this.mailForm = this.formBuilder.group(({
      to: [''],
      subject: [''],
      content: ['']
    }));
  }

  onSubmit() {
    if (!this.mailForm.valid) {
      return false;
    } else {
      this.mailsService.add(this.mailForm.value).then(() => {
        this.mailForm.reset();
        return this.router.navigate(['/']);
      });
    }
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
