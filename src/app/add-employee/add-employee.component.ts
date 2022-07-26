import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  submitted: boolean = false;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   firstName: ['', [Validators.required, Validators.minLength(4)]],
    //   emailId: new FormControl(
    //     '',
    //     Validators.compose([
    //       Validators.required,
    //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    //     ])
    //   ),
    // });
  }
  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService.createEmployee(this.employee).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.employee = new Employee();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
