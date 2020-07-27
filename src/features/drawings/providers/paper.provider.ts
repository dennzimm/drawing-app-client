import { nanoid } from 'nanoid';
import paper from 'paper';

interface PaperProviderSetupProps {
  id: string;
  initialLayer?: boolean;
  injectGlobal?: boolean;
}

class PaperProvider {
  private paperScope: paper.PaperScope;
  private injectGlobal: boolean = false;

  constructor() {
    this.paperScope = new paper.PaperScope();
  }

  setup(props: PaperProviderSetupProps) {
    const { id, initialLayer = true, injectGlobal = this.injectGlobal } = props;

    if (injectGlobal) {
      window.paper = this.paperScope;
    }

    this.paperScope.activate();
    this.paperScope.setup(id);
    this.setDefaultSettings();
    initialLayer && this.createInitialLayer();
  }

  cleanup() {
    if (window.paper) {
      delete window.paper;
    }
  }

  get scope() {
    return this.paperScope;
  }

  get view() {
    return this.paperScope.view;
  }

  get project() {
    return this.paperScope.project;
  }

  get activeLayer() {
    return this.paperScope.project.activeLayer;
  }

  private setDefaultSettings() {
    this.paperScope.settings.insertItems = false;
  }

  private createInitialLayer() {
    const layer = new this.paperScope.Layer({ name: nanoid() });
    this.paperScope.project.addLayer(layer);
    layer.activate();
  }

  // clearProject() {
  //   this._scope.project.clear();
  // }

  // getChildById(id: string): paper.Item {
  //   return get(this.activeLayer.children, [id]);
  // }

  // getLayerById(id: string): paper.Layer {
  //   return get(this.project.layers, [id]);
  // }

  // get scope() {
  //   return this._scope;
  // }

  // get project() {
  //   return this.scope.project;
  // }

  // get activeLayer() {
  //   return this.project.activeLayer;
  // }

  // get childsCount() {
  //   return this.activeLayer.children.length;
  // }

  // get lastChild() {
  //   return this.activeLayer.children[this.childsCount - 1];
  // }
}

const paperProvider = new PaperProvider();

export default paperProvider;
