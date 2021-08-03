import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

import { TreeService, TodoItemNode, TREE_DATA } from '../services/tree.service';

@Component({
  selector: 'editor-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.sass'],
  providers: [TreeService],
})
export class TreeComponent {
  dataSource = new MatTreeNestedDataSource<TodoItemNode>();

  treeControl = new NestedTreeControl<TodoItemNode>((node) => node.children);

  constructor(private _treeService: TreeService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: TodoItemNode) =>
    !!node.children && node.children.length > 0;
}
