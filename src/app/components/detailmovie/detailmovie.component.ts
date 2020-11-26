import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detailmovie',
  templateUrl: './detailmovie.component.html',
  styleUrls: ['./detailmovie.component.css']
})
export class DetailmovieComponent implements OnInit {
  public url: string;
  public movie: Movie;
  public confirm: boolean;

  constructor(
    private _movieService: MovieService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
   }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;

      this.getMovie(id);
    });
  }

  getMovie(id) {
    this._movieService.getMovie(id).subscribe(
      (response) => {
        this.movie = response.movie;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  setConfirm(confirm) {
    this.confirm = confirm;
  }

  deleteMovie(id) {
    this._movieService.deleteMovie(id).subscribe(
      (response) => {
        if (response.movie) {
          this._router.navigate(['/movie']);
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

}
