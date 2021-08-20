import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Mail, MailsService} from '../services/mails.service';

@Component({
  selector: 'app-view-mail',
  templateUrl: './view-mail.page.html',
  styleUrls: ['./view-mail.page.scss'],
})
export class ViewMailPage implements OnInit {
  public mail: Mail;

  constructor(
    private mailsService: MailsService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.mailsService.get(id).subscribe(data => {
      this.mail = data as Mail;
    });
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
