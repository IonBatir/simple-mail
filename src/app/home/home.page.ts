import {Component, OnInit} from '@angular/core';
import {MailsService, Mail} from '../services/mails.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public mails: Mail[];

  constructor(private alertController: AlertController, private mailsService: MailsService) {
  }

  async ngOnInit() {
    this.mailsService.getMail().then(async (mail) => {
      if (!mail) {
        const alert = await this.alertController.create({
            header: 'Please enter your email',
            inputs: [
              {
                name: 'mail',
                type: 'text',
                placeholder: 'Email...'
              }],
            buttons: [{
              text: 'Confirm',
              handler: (inputs) => {
                this.mailsService.setMail(inputs.mail).then(() => this.getMails());
              }
            }]
          }
        );

        await alert.present();
      } else {
        this.getMails();
      }
    });

  }

  getMails() {
    this.mailsService.getAll().subscribe(response => {
      this.mails = response.map(({payload: {doc}}) => {
        const docData = doc.data();
        return ({id: doc.id, ...docData, date: docData.date?.toDate()}) as Mail;
      });
    });
  }
}
