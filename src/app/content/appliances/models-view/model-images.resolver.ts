import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ModelsService } from "../services/models.service";
import { ModelImage } from "../models";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModelImagesResolver implements Resolve<ModelImage[]> {

  constructor(private modelService: ModelsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ModelImage[]> {
    return this.modelService.currentModelSubject.pipe(switchMap(value => this.modelService.getImagesByModelId(value?.id)));
  }
}
