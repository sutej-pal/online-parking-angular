import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-parking-lot',
  templateUrl: './edit-parking-lot.component.html',
  styleUrls: ['./edit-parking-lot.component.scss']
})
export class EditParkingLotComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  imagesForUpload: { name: string, src: unknown | string }[] = [];
  isFormReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isImagePreviewReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('hi');

    }
  }

  async cancel() {
    this.location.back();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      parkingLotName: ['', Validators.required]
    });
    setTimeout(() => {
      this.isFormReady$.next(true);
    }, 500);
  }

  async handleImageUpload(event: HTMLElement | any) {
    this.isImagePreviewReady$.next(false);
    const input: HTMLInputElement = event.target;
    console.log('event', event.target.files);
    const files = event.target.files as Array<any>;
    const acceptedImages: File[] = [];
    Array.from(files).map(async (file: File) => {
      if (this.isFileImage(file)) {
        acceptedImages.push(file);
      }
    });
    this.imagesForUpload = await this.getBase64FromFiles(acceptedImages);
    this.isImagePreviewReady$.next(true);
  }

  isFileImage(file: File) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type'])
  }

  async getBase64FromFiles(files: Array<File>) {
    const promises = files.map(async file => {
      return this.toDataURL(URL.createObjectURL(file))
    });
    let base64Strings = await Promise.all(promises);
    return files.map((file, index) => {
      return {
        name: file.name,
        src: base64Strings[index],
        file: file
      }
    })
  }

  toDataURL(url: string) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  removeImage(index: number) {
    this.imagesForUpload.splice(index, 1);
  }
}
