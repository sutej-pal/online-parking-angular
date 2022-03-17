import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../../common-services/notification.service";
import {HttpService} from "../../../../../common-services/http.service";
import {MatDialog} from "@angular/material/dialog";
import {
  FullscreenImagePreviewComponent
} from "../../components/fullscreen-image-preview/fullscreen-image-preview.component";

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
    private fb: FormBuilder,
    public dialog: MatDialog,
    private location: Location,
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.notificationService.showSuccess('res.ss.message');
    this.createForm();
  }

  async onSubmit() {
    if (this.formGroup.invalid) {
      this.notificationService.showError('Please fix the form errors');
      return;
    }
    try {
      const token = localStorage.getItem('token') || '';
      // let res = await this.httpService.makeRequest('business/parking-lot', 'get', this.formGroup.value);
      // this.notificationService.showSuccess(res.data.message);
      // console.log('res', res);
      await this.router.navigate(['parking-lot']);
    } catch (e) {
      this.notificationService.showError('Failed to add Parking Lot.');
    }
  }

  async cancel() {
    this.location.back();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group({
        addressLineOne: ['', Validators.required],
        addressLineTwo: ['', Validators.required]
      }),
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

  fullScreenPreview(index: number) {
    console.log(this.imagesForUpload[index]);
    const dialogRef = this.dialog.open(FullscreenImagePreviewComponent, {
      width: '70vw',
      data: {src: this.imagesForUpload[index].src}
    });
  }

  resetFilesArray(event: HTMLElement | any) {
    const input: HTMLInputElement = event.target;
    input.value = '';
  }
}
