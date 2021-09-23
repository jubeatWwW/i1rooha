import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TreeModel } from '@circlon/angular-tree-component';

/**
 * Node for to-do item
 */
export class ItemNode {
  name: string = '';
  type: 'folder' | 'item' = 'item';
  children?: ItemNode[];
  path?: string[] = [];
  content?: string;
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
  nodes$ = new BehaviorSubject<ItemNode[]>(TREE_DATA);

  get nodes(): ItemNode[] {
    return this.nodes$.value;
  }

  addNode(tree: TreeModel, type: 'item' | 'folder' = 'item') {
    const node = tree.getFocusedNode();
    if (node) {
      if (node.data.type === 'folder') {
        if (node?.data?.children?.length) {
          node.data.children.push({ name: 'new Item', type });
        } else {
          node.data.children = [{ name: 'new Item', type }];
        }
        tree.update();
        node.expand();
      } else {
        const parent = node.parent;
        parent.data.children.push({ name: 'new Item', type });
        tree.update();
        parent.expand();
      }
    } else {
      this.nodes$.next([...this.nodes$.value, { name: 'new Item', type }]);
      tree.update();
    }
  }
}
