import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {timeout} from "rxjs";
import {LoaderConfig} from "../shared/interfaces/loader-config.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isLoading: boolean = false;

  loaderConfig: LoaderConfig = {
    images: ['https://placehold.co/600x400', 'https://placehold.co/600x400', 'https://placehold.co/600x400'],
    texts: ['Texto 1', 'Texto 2', 'Texto 3'],
    interval: 1000,
    visible: true
  }

  constructor(
    private router: Router
  ) {
  }

  startLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/other']);
    }, 10000);

  }
}
