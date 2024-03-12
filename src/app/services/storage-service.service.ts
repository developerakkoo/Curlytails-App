import { Injectable } from '@angular/core';
import { Storage } from '@ionic/Storage-angular'

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  private _storage: Storage | null = null; 

  constructor( private storage: Storage ) { 
    this.init();
   }

   async init(){
    const storage = await this.storage.create();
    this._storage = storage
   }

   set(key: string, value:any){
      return this.storage?.set(key, value);
   }

   get(key:string){
    return this.storage?.get(key)
   }

   clearAll(){
    return this.storage?.clear()
   }

   public remove(key:string){
    return this._storage?.remove(key);
   }
}
