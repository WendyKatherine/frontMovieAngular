import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService],
})
export class MoviesComponent implements OnInit {

  public movies: Movie[];
  public url: string;

  constructor(private _movieService: MovieService) {
    this.url = Global.url;
   }

  ngOnInit(){
    this.getMovies();
    this.getMoviesTerror();
  }

  getMovies() {
    this._movieService.getMovies().subscribe(
      (response) => {
        if (response.movies) {
          this.movies = response.movies;
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
  
  getMoviesTerror() {
    this._movieService.getMoviesTerror().subscribe(
      (response) => {
        if (response.movies) {
          this.movies = response.movies;
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

}
