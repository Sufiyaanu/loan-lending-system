import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  existingData: any;

  constructor() { }
  getFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key); //to get the data and then attempts to parse it as JSON 
    return data ? JSON.parse(data) : [];
  }

  
  saveToLocalStorage(key: string, newData: any): void {
     this.existingData = this.getFromLocalStorage(key) || []; // Get existing data or initialize as an empty array
    this.existingData.push(newData); // It then appends the newData to the existingData array
    localStorage.setItem(key, JSON.stringify(this.existingData)); // Save the updated array
  }

  updateToLocalStorage(key: string, newData: any): void{  // It removes any data from the local storage 
    localStorage.removeItem(key)
    localStorage.setItem(key, JSON.stringify(newData)); // It stores the newData in the local storage 
  }


  removeFromLocalStorage(key: string, newData: any ): void {
     // Remove the data associated with the provided key
    localStorage.setItem(key, JSON.stringify(newData)); // Save the updated array 
  }
}
