import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { Global } from './global';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    public url: string;

    constructor(private _http: HttpClient){
        this.url = Global.url;
    }

    testService(){
        return 'Testing Angular Service';
    }

    saveMovie(movie: Movie): Observable<any> {
        let params = JSON.stringify(movie);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-movie', params, {
            headers: headers,
        });
    }

    getMovies(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.get(this.url + 'movies', {headers:headers});
    }
    
    getMoviesTerror(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.get(this.url + 'movies', {headers:headers});
    }

    getMovie(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'movie/' + id, { headers: headers });
    }

    deleteMovie(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
        return this._http.delete(this.url + 'movie/' + id, { headers: headers });
      }

      updateMovie(movie): Observable<any> {
        let params = JSON.stringify(movie);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
        return this._http.put(this.url + 'movie/' + movie._id, params, {
          headers: headers,
        });
      }
}