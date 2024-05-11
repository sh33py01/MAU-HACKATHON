import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ChallengeModel} from "../components/challenges/challenge.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  gatewayUrl = 'http://172.20.10.3:8000/v1/';

  constructor(private http: HttpClient) { }

  getChallengeList(): Observable<ChallengeModel[]> {
    return this.http.get<ChallengeModel[]>(this.gatewayUrl + 'challenges/?kind=code').pipe(
      map((res: any[]) => res.map(item => ({
        description: item.description,
        id: item.id,
        question: item.question,
        solved: item.solved
      })))
    );
  }

}
