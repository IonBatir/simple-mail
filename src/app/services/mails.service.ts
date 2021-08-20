import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import firebase from 'firebase';
import {Storage} from '@ionic/storage-angular';

export type Mail = {
  id: string;
  subject: string;
  content: string;
  date: Date;
  from: string;
  to: string;
  read: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class MailsService {
  private static mailKey = 'MAIL';
  private collection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore, private storage: Storage) {
    this.storage.create().then(storageInstance => {
      this.storage = storageInstance;
      this.getMail().then(mail => {
        if (mail) {
          this.collection = this.firestore.collection('mails', ref => ref.where('to', '==', mail));
        }
      });
    });
  }

  getMail() {
    return this.storage.get(MailsService.mailKey);
  }

  setMail(mail) {
    return this.storage.set(MailsService.mailKey, mail).then(() => {
      this.collection = this.firestore.collection('mails', ref => ref.where('to', '==', mail));
    });
  }

  add(data) {
    return this.storage.get(MailsService.mailKey).then(mail =>
      this.collection.add({
        ...data,
        from: mail,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        read: false
      }));
  }

  get(id) {
    return this.collection.doc(id).valueChanges();
  }

  getAll() {
    return this.collection.snapshotChanges();
  }

  markRead(id) {
    return this.collection.doc(id).update({read: true});
  }
}
