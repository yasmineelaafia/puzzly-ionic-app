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
import { AnimationOptions } from 'ngx-lottie';
import { Directory, Encoding, FileInfo, Filesystem, ReaddirResult, WriteFileResult } from "@capacitor/filesystem";
import { RecordingData, VoiceRecorder } from "capacitor-voice-recorder";
import { VoiceService } from 'src/app/services/voice.service';
import { ToastController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { AxiosError } from 'axios';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {
  isRecording: boolean = false;
  storedFileNames: FileInfo[] = [];
  duration: number = 0;
  durationDisplay: string = "";
  
  isProcessing: boolean = false;

  voiceCommands: string[] = [];

  options: AnimationOptions = {
    loop: true,
    autoplay: true,
    path: '../../../assets/anim/recording.json'
  }

  constructor(
    private readonly voice: VoiceService,
    private readonly toastCtrl: ToastController
  ) { }

  ngOnInit(): void {
    VoiceRecorder.requestAudioRecordingPermission();
  }

  calcDuration = () => {
    if (!this.isRecording) {
      this.duration = 0;
      this.durationDisplay = "";
      return;
    }

    this.duration += 1;
    const mins = Math.floor(this.duration / 60);
    const secs = (this.duration % 60).toString().padStart(2, '0');
    this.durationDisplay = `${mins}:${secs}`;

    setTimeout(() => {
      this.calcDuration();
    }, 1000);
  }

  startRecording = () => {
    if (this.isRecording) {
      return;
    }
    this.isRecording = true;
    VoiceRecorder.startRecording();
    Haptics.impact({
      style: ImpactStyle.Medium
    });
    this.calcDuration();
  }

  stopRecording = () => {
    if (!this.isRecording) {
      return;
    }
    this.isRecording = false;
    VoiceRecorder.stopRecording().then(async (result: RecordingData) => {
      this.isProcessing = true;
      if (result.value && result.value.recordDataBase64) {

        try {
          const value = await this.voice.sendVoice(result.value);

          this.voiceCommands.push(value);
        } catch (error) {
          const tst = await this.toastCtrl.create({
            color: 'danger',
            message: "Erreur : " + ((error as AxiosError).response?.data as string).split("\"")[1],
            buttons: [{ role: 'cancel', side: 'end' }],
            duration: 83000
          });
          console.error(error);
          tst.present();
        }

      }
      this.isProcessing = false;
    });
  }

}
