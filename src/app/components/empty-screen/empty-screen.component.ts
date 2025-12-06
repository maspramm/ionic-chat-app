import { Component, Input, OnInit } from '@angular/core';
import { IonGrid, IonCol } from "@ionic/angular/standalone";

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
})
export class EmptyScreenComponent  implements OnInit {
  
  @Input() model: any;

  constructor() { }

  ngOnInit() {}

}
