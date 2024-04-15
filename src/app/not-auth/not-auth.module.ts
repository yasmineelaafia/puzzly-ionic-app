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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotAuthPageRoutingModule } from './not-auth-routing.module';

import { NotAuthPage } from './not-auth.page';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MasterComponent } from './master/master.component';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NotAuthPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [
    NotAuthPage,
    MasterComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [AuthService]
})
export class NotAuthPageModule { }
