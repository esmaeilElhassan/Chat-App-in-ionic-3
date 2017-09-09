import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../../pages/tabs/tabs'

/**
 * Generated class for the ProfilepicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/chat-application-39c4b.appspot.com/o/765-default-avatar.png?alt=media&token=588f8397-a6dd-4f63-b85d-2f0878d49e9a'
  moveon: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider,
              public zone: NgZone, public userservice: UserProvider, public loadinCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepicPage');
  }

  chooseimage(){
    let loader = this.loadinCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.imgservice.uploadimage().then((uploadedurl: any)=>{
      loader.dismiss()
      this.imgurl = uploadedurl;
      this.zone.run(()=>{
        this.imgurl = uploadedurl;
        this.moveon = false
      })
    })
  }

  updateproceed(){
    let loader = this.loadinCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.userservice.updateimage(this.imgurl).then((res:any)=>{
      loader.dismiss()
      if(res.success){
        this.navCtrl.setRoot(TabsPage)
      }
      else{
        alert(res)
      }
    });
  }

  proceed(){
    this.navCtrl.setRoot(TabsPage)

  }

}
