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
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthInfosHttpResponse } from 'src/app/types/auth-infos-http-response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  authInfos!: AuthInfosHttpResponse;

  constructor(private readonly auth: AuthService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.auth.getUserAUthInfos()
        .then(res => {
          console.log(res);
          
          this.authInfos = res;
        })
        .catch(err => console.error(err));
    }, 1000);

  }
}
