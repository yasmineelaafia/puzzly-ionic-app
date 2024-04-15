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
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private init = async () => {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set = async (key: string, value: any) => {
    await this._storage?.set(key, value);
  }

  public get = async (key: string) => {
    return await this._storage?.get(key);
  }

  public clear = async () => {
    await this._storage?.clear();
  }

  public remove = async (key: string) => {
    await this._storage?.remove(key);
  }
}
