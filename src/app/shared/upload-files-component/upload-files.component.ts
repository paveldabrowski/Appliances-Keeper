import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from "../../file-upload.service";

@Component({
  selector: 'app-upload-files-component',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  @ViewChild('upload') upload!: ElementRef;
  selectedFiles: File[] = [];

  constructor() { }

  ngOnInit(): void {
    this.selectedFiles
  }

  addFiles($event: Event): void {
    const target = $event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      this.selectedFiles.push(... Array.from(files));
    }
  }

  removeFile(file: File): void {
    this.selectedFiles.splice(this.selectedFiles.findIndex(fileInArray => Object.is(fileInArray, file)), 1);
    this.upload.nativeElement.value = "";
  }

  clearUpload(): void {
    this.selectedFiles = [];
    this.upload.nativeElement.value = "";
  }
}
