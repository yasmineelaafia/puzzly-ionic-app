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
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GameResult, PuzzlyPhaserComponent } from '../puzzly-phaser/puzzly-phaser.component';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SoloService } from 'src/app/services/solo.service';

@Component({
  selector: 'app-solo',
  templateUrl: './solo.page.html',
  styleUrls: ['./solo.page.scss'],
})
export class SoloPage implements OnDestroy {

  @ViewChild(PuzzlyPhaserComponent) gameComponent!: PuzzlyPhaserComponent;

  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly solo: SoloService
  ) { }

  async endGameHandler(results: GameResult) {
    const loading = await this.loadingCtrl.create({
      animated: true,
      backdropDismiss: false,
      message: "Traitement de vos resultats..",
    });
    loading.present();
    setTimeout(async () => {
      console.warn(results);
      try {
        await this.solo.saveGame(results)
        this.router.navigate(["../"], { relativeTo: this.route });
      } catch (error) {
        console.error(error);
      } finally {

        loading.dismiss();
      }
    }, 3000);
  }

  ionViewDidLeave() {
    console.log("did leave");
    this.ngOnDestroy();

  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.gameComponent.destroyGame();
  }

}
