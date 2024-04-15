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
import { HallOfFame } from 'src/app/models/hall-of-fame';
import { HallOfFameService } from 'src/app/services/hall-of-fame.service';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.page.html',
  styleUrls: ['./hall-of-fame.page.scss'],
})
export class HallOfFamePage implements OnInit {
  hallOfFame!: HallOfFame[];
  constructor(
    private readonly hof: HallOfFameService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData = async () => {
    try {
      const result = await this.hof.getHallOfFameList()
      this.hallOfFame = result;
    } catch (error) {
      console.error(error);
    }
  }

  handleRefresh = (event: any) => {
    this.loadData()
    .finally(() => event.target.complete());
  }

}
