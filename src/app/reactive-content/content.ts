import { InjectionToken, Provider } from '@angular/core';
import { ContentMappingType } from './content.interfaces';


/** DI Token for content mappings. */
export const CONTENT_MAPPINGS = new InjectionToken<ContentMappingType>(`CONTENT_MAPPINGS`);

/** Content base URL points to a json document of the 'index' page. */
export const CONTENT_BASE_URL = new InjectionToken<string>('CONTENT_BASE_URL');

/** Default values for content base URL. */
export const CONTENT_BASE_URL_DEFAULT: Provider = {
  provide: CONTENT_BASE_URL,
  useValue: 'content/index.json'
};
