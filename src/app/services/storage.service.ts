import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveItem = async (key: string, value: any) => {
    const obj = JSON.stringify(value)
    await localStorage.setItem(key, obj)
  }

  getItem = async (key: string) => {
     const data = await localStorage.getItem(key)
     if(data){
        const obj = JSON.parse(data)
        return obj
     }
  }

  removeItem = async (key: string) => localStorage.removeItem(key)

}
