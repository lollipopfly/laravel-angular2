import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SharedService } from './api/shared.service';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule, [SharedService]);
