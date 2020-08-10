import { nanoid } from "nanoid";
import paper from "paper";
import { paperDataHelper } from "../helper";

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
    console.log("PaperProvider -> cleanup");
    this.paperScope.projects.forEach((project) => project.remove());

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
    paperDataHelper.addCustomItemData(layer, { immutable: true });
    this.paperScope.project.addLayer(layer);
    layer.activate();
  }
}

export const paperProvider = new PaperProvider();
