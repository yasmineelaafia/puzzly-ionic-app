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

import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import * as Phaser from 'phaser';
import { GameResult } from 'src/app/interfaces/game-result';
import { PuzzlePiece } from 'src/app/interfaces/puzzle-piece';
import GameScene from 'src/app/models/game-scene';

@Component({
  selector: 'app-puzzly-phaser',
  templateUrl: './puzzly-phaser.component.html',
  styleUrls: ['./puzzly-phaser.component.scss'],
  standalone: false
})
export class PuzzlyPhaserComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  phaserGame: Phaser.Game | null = null;
  config!: Phaser.Types.Core.GameConfig;

  @Output() gameEnd: EventEmitter<GameResult> = new EventEmitter<GameResult>();

  // Define the shape of the piece as a 2D array
  shapes: PuzzlePiece[][] = [
    // set 1
    [
      {
        color: "red",
        shape: [
          [1],
          [1],
          [1],
          [1]
        ]
      },
      {
        color: "green",
        shape: [
          [1, 1, 1],
          [1, 0, 1]
        ]
      },
      {
        color: "blue",
        shape: [
          [0, 1],
          [1, 1],
          [1, 0]
        ]
      },
      {
        color: "purple",
        shape: [
          [0, 1],
          [1, 1]
        ]
      }
    ],
    // set 2
    [
      {
        color: "red",
        shape: [
          [1],
          [1]
        ]
      },
      {
        color: "green",
        shape: [
          [1, 1, 0],
          [0, 1, 0],
          [0, 1, 1]
        ]
      },
      {
        color: "blue",
        shape: [
          [1, 1, 1],
          [0, 0, 1],
          [0, 0, 1]
        ]
      },
      {
        color: "purple",
        shape: [
          [1],
          [1],
          [1],
          [1]
        ]
      }
    ],
    // set 3
    [
      {
        color: "red",
        shape: [
          [1, 1, 1],
          [0, 0, 1]
        ]
      },
      {
        color: "green",
        shape: [
          [0, 1],
          [0, 1],
          [1, 1],
          [1, 1]
        ]
      },
      {
        color: "blue",
        shape: [
          [1, 1],
          [0, 1]
        ]
      },
      {
        color: "purple",
        shape: [
          [1, 0],
          [1, 1]
        ]
      }
    ]
  ];

  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let scene = new GameScene(this.gameContainer, this.shapes[Math.floor(Math.random() * 3)]);
      this.config = {
        type: Phaser.AUTO,
        scene: scene,
        parent: this.gameContainer.nativeElement,
        width: 367,
        height: 595,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      this.phaserGame = new Phaser.Game(this.config);

      scene.gameResult$.subscribe(res => {
        if (res !== undefined) {
          this.gameEnd.emit(res);
        }
      });
    }, 500);
  }

  destroyGame = () => {
    if (this.phaserGame) {
      this.phaserGame.destroy(true);
      this.phaserGame = null;
    }
    console.log("Done destroy");

  }

  ngOnDestroy(): void {
    this.destroyGame();
  }
}
