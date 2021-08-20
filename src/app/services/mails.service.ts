import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

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
  private collection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.collection = this.firestore.collection('mails');
  }

  add(subject, content, to) {
    return this.collection.add({subject, content, to, from: '', date: new Date(), read: false});
  }

  get(id) {
    return this.collection.doc(id).valueChanges();
  }

  getAll() {
    return this.collection.snapshotChanges();
  }
}
