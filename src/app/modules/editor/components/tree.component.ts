import { Component, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatMenuTrigger } from '@angular/material/menu';
import { NestedTreeControl } from '@angular/cdk/tree';

import { TreeService, ItemNode, TREE_DATA } from '../services/tree.service';

@Component({
  selector: 'editor-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.sass'],
  providers: [TreeService],
})
export class TreeComponent {
  dataSource = new MatTreeNestedDataSource<ItemNode>();

  treeControl = new NestedTreeControl<ItemNode>((node) => node.children);

  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;

  menuX: number = 0;

  menuY: number = 0;

  onContextMenu(event: MouseEvent, node: ItemNode) {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = event;
    this.menuX = clientX;
    this.menuY = clientY;
    this.contextMenu.openMenu();
  }

  get menuPositionStyle() {
    return {
      left: `${this.menuX}px`,
      top: `${this.menuY}px`,
    };
  }

  constructor(private _treeService: TreeService) {
    this.dataSource.data = TREE_DATA;
  }

  isFolder = (_: number, node: ItemNode) => node.type === 'folder';

  hasNoContent = (_: number, node: ItemNode) => node.name === '';
}
