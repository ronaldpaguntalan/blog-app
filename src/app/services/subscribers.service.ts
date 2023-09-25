import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private firestore: AngularFirestore) {}

  addSubs(subData: any) {
    this.firestore
      .collection('subscribers')
      .add(subData)
      .then((val) => {});
  }

  checkEmail(subEmail: any): Observable<any>{
    return this.firestore
      .collection('subscribers', (ref) => ref.where('email', '==', subEmail)).get()
  }
}
