import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  gatewayUrl = 'http://172.20.10.3:8000/v1/';

  constructor() { }
}
