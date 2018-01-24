import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login(user, password) {
    this.http.post('https://kooplib.fr/front/apimobile/', {'email='+user+'&pass='+password}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(data => {
        console.log(data.data);
      }).catch(error => {
        console.log(error.status);
      });
  }
}
