import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser= {
    email: '',
    password: '',
    displayName: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public loadingCtrl: LoadingController, public toastCntrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    var toaster = this.toastCntrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if(this.newUser.email == '' || this.newUser.password == '' || this.newUser.displayName == ''){
      toaster.setMessage('All fields are required');
      toaster.present();
    }
      
    else if(this.newUser.password.length < 7)
      {
        toaster.setMessage('Password is not strong. Try giving more than six characters');
        toaster.present();
      }

      else{
        let loader = this.loadingCtrl.create({
          content: 'Please wait'
        });
        loader.present();
        this.userservice.addUser(this.newUser).then((res:any)=>{
          loader.dismiss();
          if(res.success)
            this.navCtrl.push('ProfilepicPage')
        }).catch((err)=>{
          loader.dismiss()
          alert(err)
        })
      }
    
  }

  goback(){
    this.navCtrl.setRoot('LoginPage')
  }

}
