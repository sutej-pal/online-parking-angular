import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../../common-services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {
  FullscreenImagePreviewComponent
} from "../../components/fullscreen-image-preview/fullscreen-image-preview.component";
import {ParkingLotService} from "../../services/parking-lot.service";
import {LatLngPickerComponent} from "../../components/lat-lng-picker/lat-lng-picker.component";

@Component({
  selector: 'app-edit-parking-lot',
  templateUrl: './edit-parking-lot.component.html',
  styleUrls: ['./edit-parking-lot.component.scss']
})
export class EditParkingLotComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  imagesForUpload: { name: string, src: unknown | string, file: File }[] = [];
  isFormReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isImagePreviewReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  formType: string = 'Add';
  editId: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private parkingLotService: ParkingLotService,
    private notificationService: NotificationService
  ) {
  }

  async ngOnInit() {
    await this.createForm();
    this.route.params.subscribe(e => {
      if (e.parkingLotId) {
        this.editId = e.parkingLotId;
        this.populateFormValues()
      }
      this.isFormReady$.next(true);
    });
  }

  populateFormValues() {
    this.parkingLotService.get(this.editId).then(e => {
      this.formGroup.patchValue(e.data)
    })
  }

  async onSubmit() {
    if (this.formGroup.invalid) {
      this.notificationService.showError('Please fix the form errors');
      return;
    }
    let request = Object.assign({}, this.formGroup.value);
    try {
      let res;
      if (this.editId) {
        res = await this.parkingLotService.edit(this.editId, request);
      } else {
        res = await this.parkingLotService.create(request);
      }
      this.notificationService.showSuccess(res.message);
      await this.uploadGalleryImages();
      await this.router.navigate(['/parking-lot']);
    } catch (e) {
      this.notificationService.showError('Failed to add Parking Lot.');
    }
  }

  async uploadGalleryImages() {
    let formData = new FormData();
    this.imagesForUpload.forEach(image => {
      formData.append('gallery', image.file);
    })
    try {
      const res = await this.parkingLotService.edit(this.editId, formData);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async cancel() {
    this.location.back();
  }

  private createForm() {
    return new Promise((resolve, reject) => {
      this.formGroup = this.fb.group({
        name: ['', Validators.required],
        address: this.fb.group({
          addressLineOne: ['', Validators.required],
          addressLineTwo: ['', Validators.required]
        }),
        geometry: this.fb.group({
          lat: ['', Validators.required],
          lng: ['', Validators.required]
        }),
      });
      resolve(true);
    });
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

  async openLatLngPicker() {
    let data = {};
    if (this.editId) {
      data = {
        center: this.formGroup.controls['geometry'].value
      };
    } else {
      data = {};
    }
    const dialogRef = this.dialog.open(LatLngPickerComponent, {
      width: '800px',
      data: data
    })
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.formGroup.patchValue({geometry: result})
    }
  }
}
