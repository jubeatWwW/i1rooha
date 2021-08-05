import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Node for to-do item
 */
export class ItemNode {
  name: string = '';
  type: 'folder' | 'item' = 'item';
  children?: ItemNode[];
}

export const TREE_DATA: ItemNode[] = [
  {
    name: 'Fruit',
    type: 'folder',
    children: [
      { type: 'item', name: 'Apple' },
      { type: 'item', name: 'Banana' },
      { type: 'item', name: 'Fruit loops' },
      { type: 'folder', name: 'folder' },
      { type: 'item', name: '' },
    ],
  },
  {
    name: 'Vegetables',
    type: 'folder',
    children: [
      {
        name: 'Green',
        type: 'folder',
        children: [
          { type: 'item', name: 'Broccoli' },
          { type: 'item', name: 'Brussels sprouts' },
        ],
      },
      {
        name: 'Orange',
        type: 'folder',
        children: [
          { type: 'item', name: 'Pumpkins' },
          { type: 'item', name: 'Carrots' },
        ],
      },
    ],
  },
];

@Injectable()
export class TreeService {
  dataChange = new BehaviorSubject<ItemNode[]>([]);

  get data(): ItemNode[] {
    return this.dataChange.value;
  }
}
