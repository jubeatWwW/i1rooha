import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnInit,
} from '@angular/core';

import {
  IActionMapping,
  ITreeState,
  ITreeOptions,
  TreeNode,
  TREE_ACTIONS,
  TreeModel,
  TreeComponent as Tree,
} from '@circlon/angular-tree-component';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { TreeService, ItemNode } from '../services/tree.service';

@Component({
  selector: 'editor-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.sass'],
  providers: [TreeService],
})
export class TreeComponent implements OnInit {
  @ViewChild('tree') tree!: Tree;

  @ViewChild('menu') contextMenu!: ContextMenu;

  public nodes: ItemNode[];

  items!: MenuItem[];

  ngOnInit() {
    this._treeService.nodes$.subscribe((nodes) => {
      this.nodes = nodes;
    });
    this.items = [
      {
        label: 'File',
        items: [
          {
            label: '新增檔案',
            icon: PrimeIcons.PLUS,
            command: () => {
              this._treeService.addNode(this.tree.treeModel, 'item');
            },
          },
          {
            label: '新增資料夾',
            icon: PrimeIcons.PLUS,
            command: () => {
              this._treeService.addNode(this.tree.treeModel, 'folder');
            },
          },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
        ],
      },
    ];
  }

  actionMapping: IActionMapping = {
    mouse: {
      contextMenu: (tree, node, $event) => {
        $event.preventDefault();
        node.focus();
        this.contextMenu.show();
      },
      click: (tree, node, $event) => {
        if (node.data.type === 'item') {
          console.log(node);
        }
        TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
      },
    },
  };

  public options: ITreeOptions = {
    allowDrag: (node: TreeNode) => node.data.type === 'item',
    allowDrop: (node: TreeNode, { parent, index }) =>
      parent.data.type === 'folder',
    actionMapping: this.actionMapping,
  };

  constructor(private _treeService: TreeService) {
    this.nodes = _treeService.nodes;
  }
}
