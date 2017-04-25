import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentHostComponent } from './content-host/content-host.component';
import { ContentSourceService } from './content-source.service';
import { CONTENT_BASE_URL_DEFAULT } from './content';
import { ContentLinksComponent } from './content-links/content-links.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContentHostComponent, ContentLinksComponent],
  exports: [ContentHostComponent, ContentLinksComponent]
})
export class ReactiveContentModule {

  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: ReactiveContentModule,
      providers: [
        ContentSourceService,
        CONTENT_BASE_URL_DEFAULT
      ]
    };
  }

}
