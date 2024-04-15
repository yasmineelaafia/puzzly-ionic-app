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
import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isThemeMode$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const isDarkMode = prefersDarkScheme.matches;

    this.isThemeMode$.next(isDarkMode);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const isDarkMode = e.matches;
      console.log(isDarkMode);
      StatusBar.setStyle({ style: isDarkMode ? Style.Dark : Style.Light })
    });
  }
}
