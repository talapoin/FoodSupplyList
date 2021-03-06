import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item, ELocation } from 'src/app/shared/item';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '../uuid';

@Component({
  selector: 'app-create-new-item',
  templateUrl: './create-new-item.component.html',
  styleUrls: ['./create-new-item.component.scss'],
})
export class CreateNewItemComponent implements OnInit {

  form: FormGroup;

  @Input() location: ELocation;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      count: new FormControl(1, Validators.min(1))
    })
  }

  ngOnInit() { }

  save() {
    let item = <Item>this.form.value;
    item.id = UUID.create();
    item.location = this.location;
    
    this.modalCtrl.dismiss(item);
  }

  close() {
    this.modalCtrl.dismiss();
  }
  
}
