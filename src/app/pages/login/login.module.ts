import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
  ],
})
export class LoginModule { }
