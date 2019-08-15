import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from '../item';
import { CreateNewItemComponent } from '../create-new-item/create-new-item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  @Input() items: Item[];
  @Output() onSave: EventEmitter<Item> = new EventEmitter();

  constructor(private modalCtrl: ModalController) { }

  addCount(item: Item) {
    item.count += 1;
  }

  substractCount(item: Item) {
    if (item.count !== 1) {
      item.count -= 1;
    } else {
      this.items = this.items.filter(x => x.name !== item.name);
    }

    this.onSave.emit(item);
  }

  async addNewItem() {
    const modal = await this.modalCtrl.create({
      component: CreateNewItemComponent
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    var existingItem = this.items.find(x => x.name === data.name);
    if (existingItem) {
      existingItem.count += data.count;
      this.onSave.emit(existingItem);
    } else {
      const newItem = <Item>data;
      this.items.push(newItem);
      this.onSave.emit(newItem);
    }
  }

}