import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators } from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonItem,
  IonInput,
  IonText,
  IonButton,IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { addIcons } from 'ionicons';
import { personAdd, personOutline, mailOutline, keyOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonSpinner, 
    IonIcon,
    IonButton,
    IonText,
    IonInput,
    IonItem,
    IonCard,
    IonContent,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class SignupPage {
  signupForm: FormGroup;
  isTypePassword = true;
  isLoading: boolean = false;
  isPwd = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    addIcons({ 
      personAdd, 
      personOutline, 
      mailOutline, 
      keyOutline, 
      eyeOutline, 
      eyeOffOutline 
    });
    this.initForm();
  }

  initForm() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  togglePwd() {
    this.isPwd = !this.isPwd;
  }

  onSubmit() {
    if (!this.signupForm.valid)return;
    this.register(this.signupForm);
  }

  register(form) {
    this.isLoading = true;
    console.log(form.value);
    this.authService.register(form.value).then((data: any) => {
      console.log(data);
      this.router.navigate(['/login']);
      this.isLoading = false;
      form.reset();
    })
    .catch((error) => {
      console.log(error);
      this.isLoading = false;
      let msg: string = 'Could not sign you up, please try again.';
      if (error.code== 'auth/email-already-in-use') {
        msg = error.message;
    //   } else {
    //     msg = 'Akun berhasil dibuat, tapi gagal menyimpan data. Silakan login.';
    //     this.router.navigate(['/home']);
      }
      this.showAlert(msg);
    });
  }
  async showAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'A Sub Header Is Optional',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
