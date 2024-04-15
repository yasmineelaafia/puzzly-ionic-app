
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

import { GamePage } from './game.page';

const routes: Routes = [
  {
    path: 'mode-selection',
    loadChildren: () => import('./mode-selection/mode-selection.module').then(m => m.ModeSelectionPageModule)
  },
  {
    path: 'solo',
    loadChildren: () => import('./solo/solo.module').then(m => m.SoloPageModule)
  },
  {
    path: 'voice',
    loadChildren: () => import('./voice/voice.module').then(m => m.VoicePageModule)
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "mode-selection"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamePageRoutingModule { }
