import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggregationOfQualityIndicatorsComponent } from './components/aggregation-of-quality-indicators/aggregation-of-quality-indicators.component';
import { ChatGptComponent } from './components/chat-gpt/chat-gpt.component';
import { GreetingComponent } from './components/greeting/greeting.component';
import { ListProjectComponent } from './components/list-project/list-project.component';
import { ProjectChecklistComponent } from './components/project-checklist/project-checklist.component';
import { ProjectComponent } from './components/project/project.component';
import { QualityIndexValueComponent } from './components/quality-index-value/quality-index-value.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProjectTComponent } from './components/project-t/project-t.component'; 

const routes: Routes = [
  { path: 'greeting', component: GreetingComponent },
  { path: 'list-project', component: ListProjectComponent },
  { path: 'chat', component: ChatGptComponent },

  {
    path: 'dashboard',
    component: ProjectComponent,
    children: [
      {
        path: 'checklist',
        component: ProjectChecklistComponent,
      },
    ],
  },
  {
    path: 'checklist',
    component: ProjectChecklistComponent,
  },
  {
    path: 'checklist2',
    component: ProjectTComponent,
  },
  {
    path: 'quality-indicators',
    component: AggregationOfQualityIndicatorsComponent,
  },
  {
    path: 'quality-index-value',
    component: QualityIndexValueComponent,
  },
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent },
  { path: '**', component: GreetingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
