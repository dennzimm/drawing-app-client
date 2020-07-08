import paper from 'paper';
import { nanoid } from 'nanoid';

class PaperProvider {
  private _paperScope: paper.PaperScope = new paper.PaperScope();

  setup(id: string) {
    window.paper = this._paperScope;
    this._paperScope.setup(id);
    this.createActiveLayer();
  }

  cleanup() {
    delete window.paper;
    this._paperScope.projects = [];
  }

  get paperScope() {
    return this._paperScope;
  }

  private createActiveLayer() {
    const layer = new this._paperScope.Layer({ name: nanoid() });
    layer.activate();
  }
}

export default new PaperProvider();
