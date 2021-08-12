import { Component, OnInit } from '@angular/core';
import { ContentDescriptor } from "../../model";
import { Observable } from "rxjs";
import { ModelImage } from "../models";
import { ModelsService } from "../services/models.service";
import { TokenStorageService } from "../../../auth/service/token-storage.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-models-view',
  templateUrl: './models-view.component.html',
  styleUrls: ['./models-view.component.css']
})
export class ModelsViewComponent implements OnInit, ContentDescriptor {

  modelImages!: Observable<ModelImage[]>;

  constructor(private modelsService: ModelsService) {
  }

  ngOnInit(): void {
    this.modelImages = this.modelsService.getImagesByModelId(14);
  }

  getTitle(): string {
    return "Appliances Library";
  }
}
