import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ModelsService } from "../../services/models.service";
import { Observable } from "rxjs";
import { ModelImage } from "../../models";

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {

  images!: Observable<ModelImage[]>;
  constructor(private activatedRoute: ActivatedRoute, private modelsService: ModelsService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(value => {
      this.images = value.model;
    })
  }

}
