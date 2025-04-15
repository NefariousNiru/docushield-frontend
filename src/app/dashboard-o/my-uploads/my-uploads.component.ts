import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-uploads',
  templateUrl: './my-uploads.component.html',
  styleUrls: ['./my-uploads.component.css']
})
export class MyUploadsComponent implements OnInit {
  static pathRoute: string = "my-upload";
  constructor() { }

  ngOnInit() {
  }

}
