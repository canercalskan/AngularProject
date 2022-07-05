import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../../../../services/employees.service';
import { ShareService } from 'src/services/share.service';

@Component({
  selector: 'employees-table',
  templateUrl: 'employeesTable.component.html',
  styleUrls: ['employeesTable.component.css'],
})
export class EmployeesTableComponent {
  employeesList: Employee[] = []
  constructor(private EmployeeService : EmployeeService  , private ShareService : ShareService,private router : Router) {}
  ngOnInit(): void {
    this.ShareService.shareAdm.subscribe(admin => {
      if(admin.isLoggedIn == '0') {
        this.router.navigate(['']);
      }
    })

    this.EmployeeService.getEmployees().subscribe((result: Employee[]) => {
        this.employeesList = result;
    })
  }
  
  deleteEmployee(empID:String):void {
    this.EmployeeService.deleteEmployees(empID).subscribe(() => {
      this.EmployeeService.getEmployees().subscribe((response) => {this.employeesList = response})
    });
  }

  setUpdateActive(employee:Employee) {
    this.ShareService.shareEmployee(employee);
    this.router.navigate(['/Actions/Update'])
  }

}
