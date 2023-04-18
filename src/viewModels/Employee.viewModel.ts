import { EmployeeCreation } from './../interfaces/EmployeeCreation.interface';
import { v4 } from 'uuid';
import { Employee } from "../interfaces/Employee.interface";
import { EmployeeModel } from "../models/Employee.model"
const template =  require('../views/EmployeeView.handlebars');
const editView = require('../views/AddEmployeeView.handlebars')
const editTemplate = require('../views/EditEmployeeView.handlebars');
export const getEmployees = async () => {
    const model = new EmployeeModel();
    const response = await model.getEmployees();
    console.log(typeof(template))
    return template({response}, {
        Helpers: [
            {'test': () => console.log('hey')}
        ]
    });
}

export const UpdateEmployee = async (id: string, breadcrumb: HTMLElement) => {
    const model = new EmployeeModel();
    const employee = await model.getEmployeeById(id);
    breadcrumb.innerHTML  = `<a href="#"> Employee </a> > ${employee.FirstName} ${employee.LastName}`;
    const element = document.createElement('div')
    element.innerHTML = editTemplate({employee});

    element.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log(document.querySelector("#form") as HTMLFormElement);
        const form = new FormData(document.querySelector("#form"))
        const personId = form.get('personID')
        console.log(personId == '');

        const employee : Employee = {
            PersonID: form.get('personID').toString(),
            FirstName: form.get('firstName').toString(),
            LastName: form.get('lastName').toString(),
            EmployeeNo: form.get('id').toString(),
            SSN: form.get('ssn').toString(),
            Status: form.get('active')?.toString() == 'on'? 1 : 0,
        }
        await model.editEmployee(employee);

        window.location.href = "#"
    });

    return element;
}

export const AddEmployee = async () => {
    const model = new EmployeeModel();
    const element = document.createElement('div')
    element.innerHTML = editView();

    element.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log(document.querySelector("#form") as HTMLFormElement);
        const form = new FormData(document.querySelector("#form"))
        const personId = form.get('personID')
        console.log(personId == '');

        const uuid = v4();
        const employee : EmployeeCreation = {
            PersonID: uuid,
            FirstName: form.get('firstName').toString(),
            LastName: form.get('lastName').toString(),
            EmployeeNo: form.get('id').toString(),
            SSN: form.get('ssn').toString(),
            Status: form.get('active')?.toString() == 'on'? 1 : 0,
            EmploymentStartDate: new Date().toISOString(),
            EmploymentEndDate: null
        }
        await model.addEmployee(employee);
        window.location.href = "#"
    });
    return element;
}


export const removeEmployee = async (id: string) => {
    const model = new EmployeeModel();
    await model.RemoveEmployee(id);
    return await getEmployees();
}