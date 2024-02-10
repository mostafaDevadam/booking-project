import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ROLE_ENUM } from '../common/enums';
import { AUTH_FORM_TYPE, AUTH_INPUTS_TYPE } from '../common/types';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  invalidCredentialMsg: string = '';

  api = environment.API_URL.toString()

  //public authForm: FormGroup<AUTH_FORM_TYPE> = new FormGroup<AUTH_FORM_TYPE>({
  /* public authForm = new FormGroup({
   //role: new FormControl(),
   email: new FormControl(''),
   password: new FormControl(''),
 });*/

  public authForm: any;

  public profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  role_keys = Object.keys(ROLE_ENUM)

  lbls: { [key in ROLE_ENUM]: ROLE_ENUM } = {
    hotel: ROLE_ENUM.hotel,
    guest: ROLE_ENUM.guest
  }

  getROLE = (t: ROLE_ENUM) => this.lbls[t]


  constructor(private authService: AuthService, private router: Router) { }



  ngOnInit(): void {
    // console.log("auth ", this.authService.getRole(), this.authService.isAuthenticatedUser())
    console.log("auth")

    this.authForm = new FormGroup({
      role: new FormControl(ROLE_ENUM),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  async signUp() {

  }


  async signIn() {
    console.log("clicked sign-in ", this.authForm.value)
    //this.authService.signIn('','','')
    // console.log("auth ", this.authService.getRole(), this.authService.isAuthenticatedUser())
    this.onFormSubmit()
  }


  async onFormSubmit() {
    //let uname = "" //this.loginForm.get('username').value;
    //let pwd = "" //this.loginForm.get('password').value;
    const newLocal = {
      role: ROLE_ENUM.hotel,
      email: 'hotel1@gmx.de',
      password: '123123',
    };

    let inputs: AUTH_INPUTS_TYPE = this.authForm.value;

    console.log('form: ', inputs);

    (await this.authService.signIn(inputs)).subscribe((sub: any) => {
       if(sub){
         console.log("signIn sub:", sub)
         console.log("inputs role: ", inputs.role, this.authService.getRole())
         if(this.authService.getRole() === ROLE_ENUM.hotel){
          //this.authService.setRedirectUrl('/home')
          console.log("auth role hotel: ", this.authService.getRole())
         } else  if(this.authService.getRole() === ROLE_ENUM.guest){
          //this.authService.setRedirectUrl('/home-guest')
          console.log("auth role guest: ", this.authService.getRole())
         }
         let url = this.authService.getRedirectUrl()
         console.log("auth page url: ", url)
         this.router.navigate([url])
       }else{
        this.invalidCredentialMsg = 'Invalid Credentials. Try again.'
       }
    })


    /* this.authService.isUserAuthenticated('mohan', 'mo123').subscribe(
       authenticated => {
         if (authenticated) {
           let url = this.authService.getRedirectUrl();
           console.log('Redirect Url:' + url);
           this.router.navigate([url]);
         } else {
           this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
         }
       }
     );*/
  }

  checkRole = () => {
    if(this.authService.getRole() === ROLE_ENUM.hotel){
      //this.authService.setRedirectUrl('/home')
      console.log("auth role hotel: ", this.authService.getRole())
     } else  if(this.authService.getRole() === ROLE_ENUM.guest){
      //this.authService.setRedirectUrl('/home-guest')
      console.log("auth role guest: ", this.authService.getRole())
     }
  }


}
