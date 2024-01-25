import { ModelCollection } from "../models/ModelCollection";

export abstract class ViewCollection<T, U> {
  constructor(public parent: HTMLElement, public collection: ModelCollection<T, U>) {}

  abstract renderItem(itemParent: HTMLElement, model: T): void;

  render(): void {
    const templateElement = document.createElement("template");

    for (const model of this.collection.models) {
      const itemParent = document.createElement("div");

      this.renderItem(itemParent, model);

      templateElement.content.append(itemParent);
    }

    this.parent.replaceChildren(templateElement.content);
  }
}
