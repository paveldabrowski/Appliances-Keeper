import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ModelsService } from "../../services/models.service";
import { Observable, Subscription } from "rxjs";
import { ModelImage } from "../../models";
import { ContentDescriptor } from "../../../model";
import { Location } from "@angular/common";


@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit, OnDestroy, ContentDescriptor {
  imagesObservable!: Observable<ModelImage[]>;
  images!: ModelImage[];
  private readonly canGoBack: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private location: Location, private modelsService: ModelsService,
              private router: Router) {
    this.canGoBack = !!(this.router.getCurrentNavigation()?.previousNavigation);
  }

  ngOnInit(): void {
    // this.subscriptions.add(this.activatedRoute.data.subscribe(data => {
    //   console.log(data)
    //   this.images = data.images as ModelImage[];
    // }));
    this.imagesObservable = this.modelsService.getImagesByModelId(14)
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
