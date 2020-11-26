import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-editmovie',
  templateUrl: '../createmovie/createmovie.component.html',
  styleUrls: ['./editmovie.component.css'],
  providers: [MovieService, UploadService],
})
export class EditmovieComponent implements OnInit {
  public title: string;
  public movie: Movie;
  public  save_movie;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;
  constructor(
    private _movieService: MovieService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = "Edit Movie";
    this.url = Global.url;
   }

  ngOnInit(){
    this._route.params.subscribe(params =>{
      let id = params.id;

      this.getMovie(id);
    });
  }

  getMovie(id) {
    this._movieService.getMovie(id).subscribe(
      response => {
        this.movie = response.movie;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit() {
    this._movieService.updateMovie(this.movie).subscribe(
      response => {
        if (response.movie) {
      
          //Subir Imagen
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.movie._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                
                this.save_movie = result.movie;
                
                this.status = "success"; 
              });
          } else {
            this.save_movie = response.movie;
            this.status = "success"; 
          }  
          } else {
            this.status = "failed";
          }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
