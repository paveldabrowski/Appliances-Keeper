import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ModelImage } from "../../models";
import { map, switchMap, take } from "rxjs/operators";
import { ModelsService } from "../../services/models.service";

@Injectable({
  providedIn: 'root'
})
export class ModelImagesResolver implements Resolve<Array<object>> {

  constructor(private modelsService: ModelsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<object>> {
    return this.modelsService.currentModelSubject.pipe(
      switchMap(model => this.modelsService.getImagesByModelId(model?.id)),
      map(modelsImages => {
        const images: Array<object> = [];
        modelsImages.forEach(image => images.push(
          {
            image: image.url,
            thumbImage: image.url,
            alt: image.ibmKey,
            title: image.ibmKey
          }
        ));
        return images;
      }),
      take(1),
    );
  }
}
