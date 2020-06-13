import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, DetailFilm } from 'src/app/models/models';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() id;
  film: DetailFilm;
  actors: Cast[] = [];
  hidden = 100;

  slideOptActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };

  constructor(
    private moviesSrv: MoviesService,
    private modalCtr: ModalController,
    private dataLocal: DataLocalService
  ) { }

  ngOnInit() {
    this.moviesSrv.getDetailFilm(this.id)
      .subscribe((resp) => {
        this.film = resp;
      });

    this.moviesSrv.getActorsMovie(this.id)
      .subscribe((resp) => {
        this.actors = resp.cast;
      });
  }

  back() {
    this.modalCtr.dismiss();
  }

  favorite() {
    this.dataLocal.saveFilm(this.film);
  }
}
