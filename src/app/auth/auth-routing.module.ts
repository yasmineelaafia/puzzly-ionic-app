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
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then((m) => m.GamePageModule),
      },
      {
        path: 'hall-of-fame',
        loadChildren: () => import('./hall-of-fame/hall-of-fame.module').then((m) => m.HallOfFamePageModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsPageModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'game',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule { }
