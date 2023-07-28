import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AggregationOfQualityIndicatorsComponent } from './components/aggregation-of-quality-indicators/aggregation-of-quality-indicators.component';
import { EditQualityIndicatorsComponent } from './components/aggregation-of-quality-indicators/edit-quality-indicators/edit-quality-indicators.component';
import { ChatGptComponent } from './components/chat-gpt/chat-gpt.component';
import { FeatureComponent } from './components/common/feature/feature.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { PmsComponent } from './components/common/pms/pms.component';
import { SideBarComponent } from './components/common/side-bar/side-bar.component';
import { SpinnerComponent } from './components/common/spinner/spinner.component';
import { EditRowComponent } from './components/edit-row/edit-row.component';
import { GreetingComponent } from './components/greeting/greeting.component';
import { ListProjectComponent } from './components/list-project/list-project.component';
import { ProjectChecklistComponent } from './components/project-checklist/project-checklist.component';
import { ProjectComponent } from './components/project/project.component';
import { QualityIndexValueComponent } from './components/quality-index-value/quality-index-value.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoadingInterceptor } from './service/loading.interceptor';
import { EditChecklistComponent } from './components/project-checklist/edit-checklist/edit-checklist.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProjectTComponent } from './components/project-t/project-t.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavBarComponent,
    PmsComponent,
    FooterComponent,
    ListProjectComponent,
    SigninComponent,
    GreetingComponent,
    ProjectChecklistComponent,
    ProjectComponent,
    AggregationOfQualityIndicatorsComponent,
    FeatureComponent,
    QualityIndexValueComponent,
    EditRowComponent,
    ChatGptComponent,
    SpinnerComponent,
    EditQualityIndicatorsComponent,
    EditChecklistComponent,
    ConfirmDialogComponent,
    ProjectTComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class AppModule {}
