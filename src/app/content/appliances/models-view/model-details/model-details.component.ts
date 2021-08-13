import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ModelsService } from "../../services/models.service";
import { Observable, Subscription } from "rxjs";
import { Model, ModelImage } from "../../models";
import { ContentDescriptor } from "../../../model";
import { Location } from "@angular/common";
import { map } from "rxjs/operators";


@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit, OnDestroy, ContentDescriptor {
  images!: ModelImage[];
  private readonly canGoBack: boolean;
  private subscriptions: Subscription = new Subscription();
  model?: Model | undefined;
  imagesObject: Array<object> = [];

  constructor(private activatedRoute: ActivatedRoute, private location: Location, private modelsService: ModelsService,
              private router: Router) {
    this.canGoBack = !!(this.router.getCurrentNavigation()?.previousNavigation);
  }

  ngOnInit(): void {
    this.modelsService.currentModelSubject.subscribe(model => this.model = model)
    this.subscriptions.add(this.modelsService.getImagesByModelId(15)
      .pipe(
        map(images => {
          const imagesObject: Array<object> = [];
          images.forEach(image => imagesObject.push(
            {
              image: image.url,
              thumbImage: image.url,
              alt: image.ibmKey,
              title: image.ibmKey
            }
          ));
          return imagesObject;
        }))
      .subscribe(images => this.imagesObject = images));
    this.images = this.activatedRoute.snapshot.data['images'];

  }

  getTitle(): string {
    return "Model Details";
  }

  goBack(): void {
    if (this.canGoBack) {
      this.location.back();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
