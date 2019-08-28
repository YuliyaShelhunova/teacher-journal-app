import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectListComponent } from "./components/subjects/subject-list/subject-list.component";
import { JournalRecordsComponent } from "./components/journal-records/journal-records.component";
import { ExportComponent } from "./components/export/export.component";
import { StatisticsMainComponent } from "./components/statistics/statistics-main/statistics-main.component";
import { StudentStatisticsComponent } from "./components/statistics/student-statistics/student-statistics.component";
import { SubjectStatisticsComponent } from "./components/statistics/subject-statistics/subject-statistics.component";
import { StudentRatingComponent } from "./components/statistics/student-rating/student-rating.component";
import { SubjectRatingComponent } from "./components/statistics/subject-rating/subject-rating.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    { path: "", redirectTo: "/students", pathMatch: "full" },
    { path: "", component: AppComponent },
    { path: "statistics", redirectTo: "/statistics/students/", pathMatch: "full" },
    { path: "students", component: StudentTableComponent },
    { path: "subjects", component: SubjectListComponent },
    { path: "export", component: ExportComponent },
    {
        path: "statistics", component: StatisticsMainComponent, children:
            [
                {
                    path: "students", component: StudentStatisticsComponent, children: [
                        { path: ":id", component: StudentRatingComponent }
                    ]
                },
                {
                    path: "subjects", component: SubjectStatisticsComponent, children: [
                        { path: ":id", component: SubjectRatingComponent }
                    ]
                }
            ]
    },
    { path: "subjects/:id/records", component: JournalRecordsComponent },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
