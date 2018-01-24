import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ChoixcoiffeurPage } from '../../pages/choixcoiffeur/choixcoiffeur';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController) {

  }

  // ###############################################################
  // ######################### CONNEXION ###########################
  // ###############################################################
  login(user, password) {
    let postParams = {
      email: user,
      pass: password
    }
    const myObjStr = JSON.stringify(postParams);
    this.http.post("https://kooplib.fr/front/apimobile/", myObjStr)
      .subscribe(data => {
        console.log(data);
        // ICI ON GÈRE LA CONNEXION :)
        // console.log(data.JSONEXEC);
        if(data.JSONEXEC == 4) {
          // COMPTE CLIENT OK
          //storeIdentity(user, password);
          this.navCtrl.push(ChoixcoiffeurPage);
          //console.log("This is ok");
        } else {
          let alert = this.alertCtrl.create({
            title: 'Erreur',
            subTitle: 'Votre email ou mot de passe est invalide ! Merci de rééssayer',
            buttons: ['OK']
          });
          alert.present();
        }
       }, error => {
        console.log(error);// Error getting the data
      });
    
  }
  // ###############################################################
  // ######################### SAVE USER ###########################
  // ###############################################################
  storeIdentity(user, password): void {
    this.nativeStorage.setItem('compte', { email: user, pass: password })
      .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
      );
  }

}
