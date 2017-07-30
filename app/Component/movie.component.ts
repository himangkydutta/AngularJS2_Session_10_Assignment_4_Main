// Importing required libraries.
import { Component, Injectable } from '@angular/core'
import { Movie, IRating } from '../Service/movie'
import { MovieService, RatingService } from '../Service/movie.service'
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
    selector: 'app-movie-root',
    templateUrl: '../View/movie.Component.html',
    providers: [MovieService, RatingService]
})
export class MovieComponent {
    // Binding Logic.
    currMovie: Movie = new Movie();

    // List of Movies.
    listOfMovies: Array<Movie> = new Array<Movie>();

    // Initializing the Rating
    ratings: IRating[] = [];

    // Declaring myForm of Type FormGroup
    formsMovie: FormGroup;


    // Injecting services into constructor.
    constructor(private _movieService: MovieService, private _ratingService: RatingService, private _formBuilder: FormBuilder) {}

    /** Adding the Validators */
   ngOnInit() {
    this.formsMovie = this._formBuilder.group({
        'imagesUrl': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
        'name': ['', (control) => this.isNumber(control)],
        'description': ['', Validators.compose([Validators.pattern('^[a-zA-Z]*$'), Validators.required])],
        'rating': ['', Validators.compose([Validators.required])]
      });

      this.listOfMovies = this._movieService.getList();
      this.ratings = this._ratingService.getRatings();
    }

    /** To Add the Movies */
    addMovie() {
        this._movieService.addList(this.currMovie);
        this.currMovie = new Movie();
        this.formsMovie.reset();
    }

    /** Validation for Numeric */
    isNumber(fieldControl: FormControl) {
        console.log('Value of Control ', fieldControl.value);
        const ALLOWED_DIGITS = /'^[0-9]{3}$'/i;
        return ALLOWED_DIGITS.test(fieldControl.value) ? null : { notNumber: true };
    }
}
