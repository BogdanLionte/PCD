import { Component } from '@angular/core';
import {FileUploadService} from './file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  fileToUpload: File = null;

  constructor(private fileUploadService: FileUploadService) {}

  handleFileInput(files: FileList) {
    console.log('file added');
    this.fileToUpload = files.item(0);
    this.uploadFile();
  }

  uploadFile() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      console.log('uploaded :D');
    }, error => {
      console.log(error);
    });
  }

}
