import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

import {MailsService} from '../services/mails.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.page.html',
  styleUrls: ['./send-mail.page.scss'],
})
export class SendMailPage implements OnInit {
  public mailForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              private mailsService: MailsService,
              private router: Router,
              private loadingController: LoadingController) {
  }

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
      this.loadingController.create({
        message: 'Loading'
      }).then(loading => {
        loading.present().then(() => {
          this.mailsService.add(this.mailForm.value).then(() => {
            loading.dismiss().then(() => {
              this.mailForm.reset();
              return this.router.navigate(['/']);
            });
          });
        });
      });
    }
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
