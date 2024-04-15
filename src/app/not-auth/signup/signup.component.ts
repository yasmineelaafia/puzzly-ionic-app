/*
 * Puzzly - A puzzle game project
 *
 * (C) 2024 Yasmine EL AAFIA <elaafiayasmine@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Puzzly is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupFormGroup!: FormGroup;

  options: AnimationOptions = {
    loop: true,
    autoplay: true,
    path: '../../../assets/anim/puzzly.json'
  }
  constructor(
    private readonly toast: ToastController,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  get username(): AbstractControl<string> | null {
    return this.signupFormGroup?.get("username");
  }

  get password(): AbstractControl<string> | null {
    return this.signupFormGroup?.get("password");
  }

  get passwordConfirm(): AbstractControl<string> | null {
    return this.signupFormGroup?.get("passwordConfirm");
  }

  get fName(): AbstractControl<string> | null {
    return this.signupFormGroup?.get("fName");
  }

  get lName(): AbstractControl<string> | null {
    return this.signupFormGroup?.get("lName");
  }


  passwordMatchValidator = (control: AbstractControl<string>) => {
    return (control.value === this.password?.value) ? null : { dontMatch: true };
  }

  ngOnInit() {
    this.signupFormGroup = new FormGroup({
      username: new FormControl<string>("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,24}[a-zA-Z0-9]$/)]),
      password: new FormControl<string>("", [Validators.required, Validators.minLength(8), Validators.maxLength(24)]),
      passwordConfirm: new FormControl<string>("", [Validators.required, this.passwordMatchValidator]),
      fName: new FormControl<string>("", [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/)]),
      lName: new FormControl<string>("", [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/)])
    });
  }

  async presentToast(message: string, color: string | undefined = undefined) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  onSubmit = async () => {
    if (this.signupFormGroup.valid) {
      try {
        const message: string = await this.auth.signUp({
          username: this.username?.value,
          password: this.password?.value,
          fname: this.fName?.value,
          lname: this.lName?.value
        });
        await this.presentToast(message, "success");

        this.router.navigate(["../login"], { relativeTo: this.route });
      } catch (error) {
        console.error(error);
        
        await this.presentToast(error as string, "danger");
      }
    } else {
      await this.presentToast("Formulaire invalide", "danger");
    }
  }
}
