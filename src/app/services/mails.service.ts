import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;

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

  add(data) {
    return this.collection.add({...data, from: '', date: FieldValue.serverTimestamp(), read: false});
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
