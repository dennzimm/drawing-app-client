import { nanoid } from 'nanoid';
import paper from 'paper';
import { get } from 'lodash-es';

class PaperProvider {
  private _scope: paper.PaperScope;

  constructor() {
    this._scope = new paper.PaperScope();
  }

  setup(id: string) {
    window.paper = this._scope;
    this._scope.setup(id);
    this.createInitialLayer();
  }

  cleanup() {
    delete window.paper;
    this._scope.projects = [];
  }

  clearProject() {
    this._scope.project.clear();
  }

  getChildById(id: string): paper.Item {
    return get(this.activeLayer.children, [id]);
  }

  getLayerById(id: string): paper.Layer {
    return get(this.project.layers, [id]);
  }

  get scope() {
    return this._scope;
  }

  get project() {
    return this.scope.project;
  }

  get activeLayer() {
    return this.project.activeLayer;
  }

  get childsCount() {
    return this.activeLayer.children.length;
  }

  get lastChild() {
    return this.activeLayer.children[this.childsCount - 1];
  }

  private createInitialLayer() {
    const layer = new this._scope.Layer({ name: nanoid() });
    layer.activate();
  }
}

export default new PaperProvider();
