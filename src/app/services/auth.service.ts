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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthStatus } from '../types/auth-status';
import { AuthInfosHttpResponse } from '../types/auth-infos-http-response';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStatus: AuthStatus = {
    isAuth: false
  }

  authStatus$: Subject<AuthStatus | null> = new Subject();

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService
  ) { }


  public login = async (username: string, password: string): Promise<string> => {

    const params = {
      username: username,
      password: password
    };

    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };

    return new Promise<string>((resolve, reject) => {
      this.http.post<{ token: string }>(`${environment.apiURI}/auth/login`, params, options).subscribe({
        next: ({ token }) => {
          this.storage.set("jwtToken", token);
          resolve("Connecté avec succès");
        },
        error: (err: Error) => {
          console.error(err.message);
          reject(err);
        }
      });
    })
  }

  signUp = async (infos: any): Promise<string> => {
    console.log(infos);

    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };

    return new Promise<string>((resolve, reject) => {
      this.http.post<any>(`${environment.apiURI}/auth/register`, infos, options).subscribe({
        next: val => {
          resolve("Inscription réussie");
        },
        error: err => {
          reject(err);
        }
      })
    });
  }

  hasRole = async (roleName: string): Promise<boolean> => {

    if (!this.authStatus.isAuth) {

      try {
        await this.configAuthStatus();

        return this.authStatus.roles !== undefined && this.authStatus.roles.includes(roleName);
      } catch (error) {
        return false;
      }
    } else {

      return this.authStatus.roles !== undefined && this.authStatus.roles.includes(roleName);
    }
  }

  hasRole$ = (roleName: string): Observable<boolean> => {
    return from(this.hasRole(roleName))
  }

  testIsAuth = async (): Promise<boolean> => {
    if (!this.authStatus.isAuth) {
      try {
        await this.configAuthStatus();
        return this.authStatus.isAuth;
      } catch (error) {
        return false;
      }
    } else {
      return true;
    }
  }

  getUserAUthInfos = async (): Promise<AuthInfosHttpResponse> => {
    return await this.getAuthInfos();
  }

  private getAuthInfos = (): Promise<AuthInfosHttpResponse> => {
    return new Promise<AuthInfosHttpResponse>((resolve, reject) => {

      this.http.get<AuthInfosHttpResponse>(`${environment.apiURI}/auth/infos`)
        .subscribe({
          next: res => {
            resolve(res);
          },
          error: err => {
            reject(err);
          }
        });
    })
  }


  configAuthStatus = async () => {


    try {
      const authInfosResp: AuthInfosHttpResponse = await this.getAuthInfos();
      this.authStatus.username = authInfosResp.name;
      this.authStatus.roles = authInfosResp.authorities;

      this.authStatus.isAuth = authInfosResp.authenticated;
      this.authStatus$.next(this.authStatus);
    } catch (error) {
      console.error(error);
    }
  }

  logout = async () => {
    return new Promise<string>((resolve, reject) => {

      this.http.get(`${environment.apiURI}/auth/logout`)
        .subscribe({
          next: async () => {
            this.authStatus = {
              isAuth: false
            };
            this.authStatus$.next(this.authStatus);
            await this.storage.clear();
            resolve("Deconnecté avec succès")
          },
          error: err => {
            reject(err);
          }
        })
    });
  }
}
