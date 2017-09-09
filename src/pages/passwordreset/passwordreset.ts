import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'

/**
 * Generated class for the PasswordresetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public alertCntrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

  reset(){
    let alert = this.alertCntrl.create({
      buttons: ['Ok']
    })
    this.userservice.passwordreset(this.email).then((res:any)=>{
      if(res.success){
        alert.setSubTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in th email to reset your password');
      }

      else{
        alert.setTitle('Failed');
      }
        
    })
  }

  goback(){
    this.navCtrl.setRoot('LoginPage');
  }

}
