import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  avatar: string;
  displayname: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public zone: NgZone, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter(){
    this.loaduserdetails()
  }

  loaduserdetails(){
    this.userservice.getuserdetails().then((res:any)=>{
      this.displayname = res.displayName;
      this.zone.run(()=>{
        this.avatar = res.photoURL;
      })
    })
  }

  editname(){
    let alert = this.alertCtrl.create({
      title: 'edit your name',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nick Name'
      }],
      buttons:[{
        text: 'Cancel',
        role: 'Cancel',
        handler: data =>{

        }
      },
        {
          text: 'Edit',
          handler: data =>{
            if(data.nickname){
              this.userservice.updatedisplayname(data.nickname).then((res:any)=>{
                if(res.success){
                  this.displayname = data.nickname
                }
              })
            }
          }
        }
      ]
    })
  }

}
