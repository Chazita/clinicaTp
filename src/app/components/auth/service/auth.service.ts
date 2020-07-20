import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/class/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router
  ) {}

  public async signIn(email, password) {
    const result = await this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
    this.getDataUserName(result.user);
    result.user.getIdToken().then((value) => {
      localStorage.setItem('token', value);
    });
  }

  public async signUp(email, password, userName, lastName, foto, role) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.uploadImage(foto, result.user, userName, lastName, role);
    } catch (err) {
      console.log(err);
    }
  }

  private uploadImage(
    file: any,
    user: any,
    userName: string,
    lastName: string,
    role
  ) {
    const filePath = `userImages/${user.uid}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    let download: Observable<string>;
    let photoUrl: string;
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          download = fileRef.getDownloadURL();
          download.subscribe((url) => {
            if (url) {
              photoUrl = url;
              this.setDataUserName(user, userName, lastName, photoUrl, role);
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log('Url:  ', url);
        }
      });
  }

  private setDataUserName(user, userName, lastName, photoUrl, role) {
    try {
      const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
        `users/${user.uid}`
      );
      const userData: User = {
        uid: user.uid,
        email: user.email,
        name: userName,
        lastName,
        photo: photoUrl,
        role,
      };
      userRef.set(userData, { merge: true });
      window.alert('Usuario registrado');
    } catch (err) {
      console.log(err);
    }
  }

  private getDataUserName(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    userRef.valueChanges().subscribe((value: User) => {
      localStorage.setItem('data', JSON.stringify(value));
      this.router.navigateByUrl(`${value.role}`);
    });
  }

  async signOut() {
    await this.afAuth.signOut();
  }
}
