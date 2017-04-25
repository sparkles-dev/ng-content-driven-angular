import { Type, ViewContainerRef } from '@angular/core';

/** Interface that needs to be implemented by dynamic content components. */
export interface ContentOnCreate {

  /**
   * Notifies the component instance that it is being dynamically created and inserted in
   * Angular's component tree. Receives the content `values` that this component should display.
   *
   * This method is a lifecycle hook. Dynamic content components need to implement this interface
   * and update their bound properties to the values they receive in the `values` parameter.
   *
   * @param values Input values for the component.
   */
  contentOnCreate(values: { [key: string]: any }): void;
}

export interface ContentEmbeddable {

  contentEmbeddable(): ViewContainerRef;
}

/** A mapping from a string to a Component type. Example: `{ 'foo': FooComponent }` */
export interface ContentMappingType {
  [key: string]: Type<any>;
}

/** TypeScript interface for a HAL+JSON document describing our content pages. */
export interface ContentDocument {
  /** Links from this document */
  _links?: Links;
  /** Embedded documents */
  _embedded?: Embeddeds;
  /** The type of the content that should be displayed. Examples: 'page', 'image', 'headline' */
  _type: string;
  /** Additional key-value pairs */
  [key: string]: any;
}

export interface Links {
  [key: string]: Link;
}

export interface Link {
  href: string;
  templated?: boolean;
}

export interface Embeddeds {
  [key: string]: ContentDocument | ContentDocument[];
}
