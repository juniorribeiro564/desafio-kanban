import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { baseURLService, jwtToken } from 'src/assets/env';
import { getFromLocalStorage } from './storage';
import { AxiosRequestConfig } from "axios";

export interface IUser {
    id?: string
    titulo: string,
    conteudo: string,
    lista: string,
    next: any
}

const token = getFromLocalStorage(jwtToken);

const options = { 
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
};

@Injectable()
export class cardService {
    constructor(private http: HttpClient) { }

    public getCard(): Observable<IUser> {
        return this.http.get<any>(baseURLService, options)
            .pipe(
                tap(response => {
                    response;
                })
            )
    }

    public postCard(config: AxiosRequestConfig) {

        return this.http.post<any>(baseURLService, config.data, options)
            .pipe(
                tap(response => {
                    response;
                })
            )
    }

    public putCard(params: any): Observable<IUser> {
        return this.http.put<any>(`${baseURLService}${params.id}/`, params, options)
            .pipe(
                tap(response => {
                    response;
                })
            )
    }

    public deleteCard(params: any): Observable<IUser> {
        return this.http.delete<any>(`${baseURLService}${params.id}/`, options)
            .pipe(
                tap(response => {
                    response;
                })
            )
    }
}