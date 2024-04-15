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
import { environment } from 'src/environments/environment';
import axios from "axios";
import { StorageService } from './storage.service';

type RecorderValue = {
  recordDataBase64: string;
  msDuration: number;
  mimeType: string;
}

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  constructor(
    private readonly storage: StorageService
  ) { }

  sendVoice = async (recorderVoiceResult: RecorderValue): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        // Convert base64 data to Blob
        const byteCharacters = atob(recorderVoiceResult.recordDataBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: recorderVoiceResult.mimeType });

        // Create FormData object for multipart form data
        const formData = new FormData();
        formData.append('file', blob, `puzzly-${new Date().getTime()}.${recorderVoiceResult.mimeType.split(";")[0].split("/")[1]}`);
        const token = await this.storage.get("jwtToken");
        const result = await axios.post<string>(`${environment.apiURI}/api/voice/send`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
          }
        });
        if (result.status === axios.HttpStatusCode.Ok) {
          resolve(result.data);
        }
        else {
          reject(new Error(result.data));
        }
      } catch (error) {
        reject(error)
      }
    });
  }


}
