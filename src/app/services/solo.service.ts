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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameResult } from '../auth/game/puzzly-phaser/puzzly-phaser.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoloService {

  constructor(private readonly http: HttpClient) { }

  saveGame = async (game: GameResult): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.http.post(`${environment.apiURI}/api/solo/save`, game)
        .subscribe({
          next: () => resolve(),
          error: (err) => reject(err)
        });
    });
  }
}
