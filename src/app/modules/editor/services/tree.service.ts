import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Node for to-do item
 */
export class ItemNode {
  name: string = '';
  type: 'folder' | 'item' = 'item';
  children?: ItemNode[];
  path?: string[] = [];
}

export class ItemFlatNode {
  name: string = '';
  type: 'folder' | 'item' = 'item';
  level: number = 0;
  path?: string[] = [];
  expandable: boolean = false;
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
  dataChange = new BehaviorSubject<ItemNode[]>([]);

  buildFileTree(data: ItemNode[], path: string[] = []): ItemNode[] {
    return data.map((node) => {
      const newPath = [...path, node.name];
      return node.children
        ? {
            ...node,
            path: newPath,
            children: this.buildFileTree(node.children, newPath),
          }
        : { ...node, path: newPath };
    });
  }

  insertEmptyNode(parent: ItemNode, type: 'folder' | 'item' = 'item') {
    if (parent.type === 'folder') {
      const newNode = new ItemNode();
      newNode.type = type;
      if (parent.children) {
        parent.children.push(newNode);
      } else {
        parent.children = [newNode];
      }
      this.dataChange.next(this.data);
      return newNode;
    }
    return null;
  }

  updateNode(node: ItemNode, name: string) {
    node.name = name;
    this.dataChange.next(this.data);
  }

  get data(): ItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.dataChange.next(this.buildFileTree(TREE_DATA));
  }
}
