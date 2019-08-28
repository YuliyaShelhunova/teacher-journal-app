import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { APP_BASE_HREF } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { StudentFormComponent } from "./components/students/student-form/student-form.component";
import { ExportComponent } from "./components/export/export.component";
import { SubjectListComponent } from "./components/subjects/subject-list/subject-list.component";
import { SubjectAddFormComponent } from "./components/subjects/subject-add-form/subject-add-form.component";
import { JournalRecordsComponent } from "./components/journal-records/journal-records.component";
import { StatisticsMainComponent } from "./components/statistics/statistics-main/statistics-main.component";
import { StudentStatisticsComponent } from "./components/statistics/student-statistics/student-statistics.component";
import { SubjectStatisticsComponent } from "./components/statistics/subject-statistics/subject-statistics.component";
import { StudentRatingComponent } from "./components/statistics/student-rating/student-rating.component";
import { SubjectRatingComponent } from "./components/statistics/subject-rating/subject-rating.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ReduxModule } from "./redux/module";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [AppComponent, StudentTableComponent,
    ExportComponent, StudentFormComponent, SubjectListComponent, SubjectAddFormComponent,
    JournalRecordsComponent, StatisticsMainComponent, StudentStatisticsComponent,
    SubjectStatisticsComponent, StudentRatingComponent, SubjectRatingComponent, PageNotFoundComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule,
    HttpClientModule, NgbModule, ReduxModule, MatProgressSpinnerModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  bootstrap: [AppComponent],
  exports: [StudentFormComponent, SubjectAddFormComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
  entryComponents: [StudentFormComponent, SubjectAddFormComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
