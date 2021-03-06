import { LoginComponent } from "./app/components/pages/login/login.component"
import { EmployeesTableComponent } from "./app/components/pages/employees/list/employees-table.component"
import { EmployeeForm } from "./app/components/pages/employees/forms/employee.form"
import { NotFoundComponent } from "./app/components/pages/notfound/notfound.component"
import { AuthGuard } from "./app/services/auth/auth.guard"
import { LoginGuard } from "./app/services/auth/login.guard"
import { Routes } from "@angular/router"
import { RouterModule } from "@angular/router"
import { NgModule } from "@angular/core"
import { Actions } from "./app/components/pages/actions/actions.component"

const appRoute: Routes = [
    {path : 'Home' , component: EmployeesTableComponent , canActivate: [AuthGuard]},
    {path : 'Actions' , component : Actions , children : [
      {path : 'Add' , component : EmployeeForm , canActivate : [AuthGuard]},
      {path: 'Update' , component: EmployeeForm , canActivate : [AuthGuard]},
    ]},
    {path : '' , component : LoginComponent , canActivate: [LoginGuard]},
    {path : '**' , component: NotFoundComponent}
  ]
  
  @NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }