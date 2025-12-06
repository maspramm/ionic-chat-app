import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonItem, IonAvatar, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [IonLabel, IonAvatar, IonItem]
})
export class UserListComponent  implements OnInit {
  @Input() item: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}
  redirect() {
    this.onClick.emit(this.item);
  }

}
