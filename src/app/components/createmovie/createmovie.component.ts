import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-createmovie',
  templateUrl: './createmovie.component.html',
  styleUrls: ['./createmovie.component.css'],
  providers: [MovieService, UploadService],
})
export class CreatemovieComponent implements OnInit {

  public title: string;
  public movie: Movie;
  public save_movie;
  public status: string;
  public url: string;
  public filesToUpload: Array<File>;

  constructor( 
    private _movieService: MovieService, 
    private _uploadService: UploadService) { 
    this.title = 'Create Movie';
    this.movie = new Movie('','','','','', '', 2020,'');
  }

  ngOnInit(){
  }

  onSubmit(form) {
    //Guardar los datos basicos
    this._movieService.saveMovie(this.movie).subscribe(
      (response) => {
        if (response.movie) {
          //Subir Imagen
          if (this.filesToUpload) {
            this._uploadService
              .makeFileRequest(
                Global.url + 'upload-image/' + response.movie._id,
                [],
                this.filesToUpload,
                'image'
              )
              .then((result: any) => {
                this.save_movie = result.movie;

                this.status = 'success';
                form.reset();
              });
          } else {
            this.save_movie = response.movie;
            this.status = 'success';
            form.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
