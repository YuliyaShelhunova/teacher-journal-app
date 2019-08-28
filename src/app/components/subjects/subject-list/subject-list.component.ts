import { Component, OnInit } from "@angular/core";
import { Subject } from "../../../common/entities/subject";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SubjectAddFormComponent } from "../subject-add-form/subject-add-form.component";
import { Store } from "@ngrx/store";
import * as SubjectAction from "../../../redux/actions/subject.actions";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.less']
})

export class SubjectListComponent implements OnInit {
  public subjects: Subject[] = [];

  constructor(private modalService: NgbModal, private store: Store<any>) { }

  public ngOnInit(): void {
    this.store.dispatch(new SubjectAction.GetSubjects());
    this.store.select("subjects").subscribe
      (response => {
        this.subjects = response.subjects;
      });
  }
  public openModal(): void {
    const modalRef = this.modalService.open(SubjectAddFormComponent);
  }
}

