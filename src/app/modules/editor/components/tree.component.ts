import { Component, ViewChild } from '@angular/core';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { MatMenuTrigger } from '@angular/material/menu';
import { FlatTreeControl } from '@angular/cdk/tree';

import { TreeService, ItemNode, ItemFlatNode } from '../services/tree.service';

@Component({
  selector: 'editor-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.sass'],
  providers: [TreeService],
})
export class TreeComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ItemFlatNode, ItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<ItemNode, ItemFlatNode>();

  dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;

  treeControl: FlatTreeControl<ItemFlatNode>;

  treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;

  transfomer = (node: ItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : new ItemFlatNode();
    flatNode.name = node.name;
    flatNode.type = node.type;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;

  menuX: number = 0;

  menuY: number = 0;

  selectedNode: ItemFlatNode | null = null;

  onContextMenu(event: MouseEvent, node: ItemFlatNode | null) {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = event;
    this.menuX = clientX;
    this.menuY = clientY;
    this.selectedNode = node;
    this.contextMenu.openMenu();
  }

  addItem(type: 'item' | 'folder') {
    let inserted = null;
    if (this.selectedNode && this.selectedNode.type === 'folder') {
      const parentNode = this.flatNodeMap.get(this.selectedNode);
      inserted = this._treeService.insertEmptyNode(parentNode!, type);
      this.treeControl.expand(this.selectedNode);
    } else {
      inserted = this._treeService.insertEmptyNode(null, type);
    }

    if (inserted) {
      const newNode = this.nestedNodeMap.get(inserted) || null;
      this.selectedNode = newNode;
    }
  }

  saveItem(itemValue: string) {
    if (this.selectedNode) {
      const parentNode = this.flatNodeMap.get(this.selectedNode);
      this._treeService.updateNode(parentNode!, itemValue);
    }
  }

  viewItem(node: ItemFlatNode) {
    this.selectedNode = node;
  }

  get menuPositionStyle() {
    return {
      left: `${this.menuX}px`,
      top: `${this.menuY}px`,
    };
  }

  constructor(private _treeService: TreeService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transfomer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<ItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    _treeService.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: ItemFlatNode) => node.level;

  isExpandable = (node: ItemFlatNode) => node.expandable;

  getChildren = (node: ItemNode): ItemNode[] => node?.children || [];

  isFolder = (_: number, node: ItemNode) => node.type === 'folder';

  hasNoContent = (_: number, node: ItemNode) => node.name === '';
}
