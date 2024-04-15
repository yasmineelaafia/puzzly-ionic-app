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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;
  errorMsg: string = "";

  options: AnimationOptions = {
    loop: true,
    autoplay: true,
    path: '../../../assets/anim/puzzly.json'
  }

  loginFormGroup!: FormGroup;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: ToastController
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      username: new FormControl<string>("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]([._](?![._])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/)
      ]),
      password: new FormControl<string>("", [
        Validators.required
      ])
    });
  }


  get username() {
    return this.loginFormGroup.get("username");
  }

  get password() {
    return this.loginFormGroup.get("password");
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

  handleSubmit = () => {
    if (!this.isLoading) {

      if (this.loginFormGroup.valid) {
        this.isLoading = true;
        setTimeout(() => {
          this.auth.login(this.username?.value, this.password?.value)
            .then(async (res) => {
              await this.auth.configAuthStatus();
              this.isError = false;
              this.errorMsg = "";
              try {
                await this.router.navigate(["/auth/"], { relativeTo: this.route });
                this.presentToast(res, "success");
              } catch (error) {
                this.presentToast("Erreur de nevigation", "danger")
              }
            })
            .catch(err => {
              this.presentToast(err.error.message, "danger")
              this.isError = true;
              this.errorMsg = err.error.message;
            }
            )
            .finally(() => {
              this.isLoading = false;
            });
        }, 4000);

      } else {
        this.presentToast("Les informations entrées sont invalides", "danger");
        this.isError = true;
        this.errorMsg = JSON.stringify(this.loginFormGroup.errors);
      }
    }
  }

}
