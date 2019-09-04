import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import * as StudentAction from "../../../redux/actions/students.actions";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.less']
})

export class StudentFormComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal, private store: Store<any>) { }

  public ngOnInit(): void { }

  public addStudent(firstName: string, lastName: string, address: string, description: string): void {
    const data = { firstName, lastName, address, description };
    this.store.dispatch(new StudentAction.AddStudent(data));
    this.activeModal.close();
  }
}

