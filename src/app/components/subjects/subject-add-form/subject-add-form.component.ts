import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import * as SubjectAction from "../../../redux/actions/subject.actions";

@Component({
  selector: 'app-subject-add-form',
  templateUrl: './subject-add-form.component.html',
  styleUrls: ['./subject-add-form.component.less']
})
export class SubjectAddFormComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private store: Store<any>) { }
  ngOnInit() {}

  public addSubject(name: string, teacher: string, cabinet: number, description: string): void {
    const data = { name, teacher, cabinet, description };
    this.store.dispatch(new SubjectAction.AddSubject(data));
    this.activeModal.close();
  }
}
