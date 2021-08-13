import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ModelImage } from "../../models";
import { switchMap, take } from "rxjs/operators";
import { ModelsService } from "../../services/models.service";

@Injectable({
  providedIn: 'root'
})
export class ModelImagesResolver implements Resolve<ModelImage[]> {

  constructor(private modelsService: ModelsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ModelImage[]> {
    // console.log("resolver")
    return this.modelsService.currentModelSubject.pipe(switchMap(model => this.modelsService.getImagesByModelId(model?.id)), take(1));
  }
}
