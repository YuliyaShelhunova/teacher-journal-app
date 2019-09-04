import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { appReducers } from './reducers/app.reducers';
import { RecordsEffects } from './effects/records.effects';
import { StudentEffects } from './effects/students.effects';
import { SubjectsEffects } from './effects/subjects.effects';

import { SubjectService } from './../common/services/subject/subject.service';
import { StudentService } from './../common/services/student/student.service';

@NgModule({
  imports: [StoreModule.forRoot(appReducers), EffectsModule.forRoot([RecordsEffects,
    StudentEffects, SubjectsEffects])],
  providers: [SubjectService, StudentService],

})

export class ReduxModule { }
