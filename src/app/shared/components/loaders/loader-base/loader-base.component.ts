import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {interval, Subject, takeUntil} from "rxjs";
import {LoaderConfig} from "../../../interfaces/loader-config.interface";

@Component({
  selector: 'app-loader-base',
  templateUrl: './loader-base.component.html',
  styleUrls: ['./loader-base.component.scss'],
})

export class LoaderBaseComponent implements OnInit, OnDestroy, OnChanges {


  @Input({required: true}) config: LoaderConfig = {
    images: [],
    texts: [],
    interval: 1000,
    visible: true
  };

 images: string[] = this.config.images;
  texts: string[] = this.config.texts;


  private unsubscribe$ = new Subject<void>();
  currentIndex: number = 0;

  constructor() {
    console.log(this.images)
  }

  ngOnInit() {
    this.loadContent();

    console.log(this.config.images)
    this.startLoader()

  }


  ngOnChanges() {

    this.loadContent();
    this.startLoader();
    this.stopInterval();

  }

  startLoader() {


    interval(this.config.interval)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      });
  }

  stopInterval() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  loadContent() {
    this.images = this.config.images;
    this.texts = this.config.texts;
  }

}
