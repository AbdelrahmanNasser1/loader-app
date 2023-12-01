import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggingService } from './services/log/logging.service';
import { ContentLoaderComponent } from './content-loader/content-loader.component';

@NgModule({
  declarations: [AppComponent, ContentLoaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: ErrorHandler, useClass: LoggingService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
