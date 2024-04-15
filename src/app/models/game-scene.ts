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

import { ElementRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameResult } from "../interfaces/game-result";
import { PuzzlePiece } from "../interfaces/puzzle-piece";

class GameScene extends Phaser.Scene {
    squares: Phaser.GameObjects.Sprite[];
    pieces: Phaser.GameObjects.Group[];

    shapes: PuzzlePiece[];

    status$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    currentScore: number = 0;
    currentSteps: number = 0;
    isWon: boolean = false;

    gameResult: GameResult | undefined = undefined;
    gameResult$: BehaviorSubject<undefined | GameResult> = new BehaviorSubject<undefined | GameResult>(this.gameResult);

    private timer: number = 30; // Adjust initial timer value (seconds)
    private timeText!: Phaser.GameObjects.Text;
    private timerInterval: any;

    constructor(gameContainer: ElementRef, shapes: PuzzlePiece[]) {
        super({ key: 'GameScene' });
        this.squares = [];
        this.pieces = [];
        this.shapes = shapes;
    }

    preload() {
        this.load.image('square', '../../../../assets/game/square.png');
        this.load.image('red', '../../../../assets/game/red.png');
        this.load.image('blue', '../../../../assets/game/blue.png');
        this.load.image('green', '../../../../assets/game/green.png');
        this.load.image('purple', '../../../../assets/game/purple.png');
    }

    create() {

        const selfScene = this;

        let initialX = 35;
        const initialY = 420;

        this.timeText = this.add.text(140, 350, `Reste ${this.timer} secondes`, { color: this.timer > 10 ? "#fefefe" : "#fe8877", fontSize: "14pt" })
        this.timerInterval = this.time.addEvent({
            delay: 1000,
            callback: this.decrementTimer,
            callbackScope: this,
            loop: true,
        });

        const rect = this.add.rectangle(180, 180, 8 + 72 * 4, 8 + 72 * 4, 0x222132);
        const txt = this.add.text(35, 350, "0", { color: "#fefefe", fontSize: "14pt" })
        const line = this.add.rectangle(180, 390, 400, 4, 0x222132);

        // Create a 4x4 grid of squares
        let grid: any = [];
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 4; j++) {
                let square = this.add.sprite(72 + j * 72, 72 + i * 72, 'square');
                this.squares.push(square);
                row.push(null); // Initialize the grid with null values
            }
            grid.push(row);
        }

        // Create the pieces
        this.shapes.forEach((pieceData, index) => {
            let piece = this.add.group();
            let pieceWidth = pieceData.shape[0].length * 72;

            pieceData.shape.forEach((row, i) => {
                row.forEach((value, j) => {
                    if (value === 1) {
                        // Place the pieces in the piece tray initially
                        let x = initialX + j * 72 * 0.5; // Scale down the x-coordinate
                        let y = initialY + i * 72 * 0.5; // Scale down the y-coordinate
                        let square = this.add.sprite(x, y, pieceData.color);
                        square.setInteractive(); // Enable input events
                        this.input.setDraggable(square); // Make the square draggable
                        square.setData('parentGroup', piece);
                        square.setData('initialxy', { x: x, y: y });
                        square.setData('placed', false);
                        square.setScale(0.5);
                        piece.add(square);
                    }
                });
            });

            this.pieces.push(piece);
            // Update startX for the next piece
            initialX += pieceWidth * 0.5 + 10; // Add some space between pieces
        });

        this.input.on('dragstart', function (pointer: any, gameObject: Phaser.GameObjects.Sprite) {
            gameObject.setAlpha(0.7);
            gameObject.setDepth(100);
            if (!gameObject.getData('placed')) {
                gameObject.setScale(1);
                gameObject.x *= 2
                gameObject.y *= 2
            }
            let parentGroup = gameObject.getData('parentGroup');
            parentGroup.getChildren().forEach(function (child: any) {
                if (child !== gameObject) {
                    child.setAlpha(0.7);
                    if (!child.getData("placed")) {
                        child.setScale(1);
                        child.x *= 2;
                        child.y *= 2;
                        child.setDepth(100);
                    }
                }
                // Free up the old position on the grid
                let gridX = Phaser.Math.Snap.To(child.x, 72) / 72 - 1;
                let gridY = Phaser.Math.Snap.To(child.y, 72) / 72 - 1;
                if (grid[gridY] && grid[gridY][gridX] === child) {
                    grid[gridY][gridX] = null;
                }
            });
        });

        this.input.on('drag', function (pointer: any, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) {
            // Update the position of the game object to the drag coordinates
            let deltaX = dragX - gameObject.x;
            let deltaY = dragY - gameObject.y;
            gameObject.x = dragX;
            gameObject.y = dragY;

            // Update the position of all other squares in the same group
            let parentGroup = gameObject.getData('parentGroup');
            parentGroup.getChildren().forEach(function (child: any) {
                if (child !== gameObject) {
                    child.x += deltaX;
                    child.y += deltaY;
                }
            });

        });

        this.input.on('dragend', function (pointer: any, gameObject: Phaser.GameObjects.Sprite) {
            gameObject.setAlpha(1);
            gameObject.setDepth(50);
            let parentGroup = gameObject.getData('parentGroup');
            parentGroup.getChildren().forEach(function (child: any) {
                if (child !== gameObject) {
                    child.setAlpha(1);
                    child.setDepth(50);
                }
            });

            // Snap to grid
            let snapX = Phaser.Math.Snap.To(gameObject.x, 72);
            let snapY = Phaser.Math.Snap.To(gameObject.y, 72);

            const canPlace = selfScene.canPlacePiece(parentGroup, grid);

            if (canPlace) {
                // Update the position of the game object to the nearest grid position
                let deltaX = snapX - gameObject.x;
                let deltaY = snapY - gameObject.y;
                gameObject.x = snapX;
                gameObject.y = snapY;

                gameObject.setData('placed', true);

                // Update the position of all other squares in the same group
                parentGroup.getChildren().forEach(function (child: any) {
                    if (child !== gameObject) {
                        child.x += deltaX;
                        child.y += deltaY;
                        child.setData("placed", true);
                    }
                });

                // Update the grid
                parentGroup.getChildren().forEach(function (child: any) {
                    let gridX = Phaser.Math.Snap.To(child.x, 72) / 72 - 1;
                    let gridY = Phaser.Math.Snap.To(child.y, 72) / 72 - 1;
                    grid[gridY][gridX] = child;
                });

                selfScene.status$.next(true);
            } else {
                gameObject.setScale(0.5);
                gameObject.x = gameObject.getData("initialxy").x;
                gameObject.y = gameObject.getData("initialxy").y;

                gameObject.setData("placed", false);

                parentGroup.getChildren().forEach((child: any) => {
                    if (child !== gameObject) {
                        child.setScale(0.5);

                        // Adjust the position of the squares
                        child.x = child.getData("initialxy").x;
                        child.y = child.getData("initialxy").y;
                        child.setData("placed", false);
                    }
                });
                selfScene.status$.next(false);
            }
            selfScene.currentScore = selfScene.calculateScore(grid);
            selfScene.currentSteps += 1;
            txt.setText(selfScene.currentScore.toString());
            if (selfScene.currentScore === 16) {
                selfScene.isWon = true;
                selfScene.gameOver();
            }

        });
    }

    decrementTimer() {
        this.timer--;
        this.timeText.setText(`Reste ${this.timer} secondes`);

        if (this.timer <= 0) {
            this.timeText.setText("C'est fini!");
            this.gameOver();
            this.time.removeEvent(this.timerInterval);
        }
    }

    gameOver = () => {
        this.disableMovement()
        this.time.removeAllEvents();
        this.gameResult = {
            elapsedTime: 30 - this.timer,
            numberSteps: this.currentSteps,
            score: this.currentScore,
            won: this.isWon
        };
        this.gameResult$.next(this.gameResult);
        this.gameResult = undefined;
    }

    disableMovement() {
        this.input.off('dragstart'); // Remove drag start event listener
        this.input.off('drag'); // Remove drag event listener
        this.input.off('dragend'); // Remove drag end event listener
        this.pieces.forEach((piece) => {
            piece.getChildren().forEach((child: any) => {
                child.setInteractive(false); // Disable interaction with individual squares
            });
        });
    }

    calculateScore = (grid: any): number => {
        let score = 0;
        for (let row of grid) {
            for (let col of row) {
                score += col !== null ? 1 : 0;
            }
        }
        return score;
    }

    canPlacePiece = (parentGroup: Phaser.GameObjects.Group, grid: any): boolean => {
        // Check if the entire piece can be placed on the grid
        let canPlace = true;
        parentGroup.getChildren().forEach(function (child: any) {
            let gridX = Phaser.Math.Snap.To(child.x, 72) / 72 - 1;
            let gridY = Phaser.Math.Snap.To(child.y, 72) / 72 - 1;
            if (!grid[gridY] || grid[gridY][gridX] !== null) {
                canPlace = false;
            }
        });

        return canPlace;
    }
}

export default GameScene;