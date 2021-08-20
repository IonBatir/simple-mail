import {Component, OnInit} from '@angular/core';
import {MailsService, Mail} from '../services/mails.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public mails: Mail[];

  constructor(private mailsService: MailsService) {
  }

  ngOnInit() {
    this.mailsService.getAll().subscribe(response => {
      this.mails = response.map(({payload: {doc}}) => {
        const docData = doc.data();
        return ({id: doc.id, ...docData, date: docData.date?.toDate()}) as Mail;
      });
    });
  }
}
