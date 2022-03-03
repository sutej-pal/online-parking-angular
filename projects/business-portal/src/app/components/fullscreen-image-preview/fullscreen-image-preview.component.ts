import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface ImageData {
  src: string
}

@Component({
  selector: 'app-fullscreen-image-preview',
  templateUrl: './fullscreen-image-preview.component.html',
  styleUrls: ['./fullscreen-image-preview.component.scss']
})
export class FullscreenImagePreviewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FullscreenImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageData
  ) {
  }

  ngOnInit(): void {
  }

}
