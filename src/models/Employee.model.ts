import { EmployeeCreation } from '../interfaces/EmployeeCreation.interface';
import { Employee } from './../interfaces/Employee.interface';
export class EmployeeModel {
    private API_KEY = process.env.API_KEY
    private URL_BASE = process.env.URL_BKN

    private header = {
        "ApiKey": this.API_KEY
    }

    async getEmployees(): Promise<Employee[]>{
        const header = new Headers(this.header);
        const response = await fetch(this.URL_BASE, {
            headers: header
        })
        const data = await response.json()
        localStorage.setItem('employees', JSON.stringify(data))
        return data
    }

    async getEmployeeById(id : string): Promise<Employee> {
        let data = JSON.parse(localStorage.getItem('employees')) as Employee[]
        if (!data) {
            data = await this.getEmployees();
        }
        return data.find(x => x.PersonID == id)
    }

    async editEmployee(employee : Employee) {
        const header = new Headers(this.header);
        const response = await fetch(`${this.URL_BASE}`, {
            headers: header,
            method: 'PUT',
            body: JSON.stringify(employee)
        })
    }

    async addEmployee(employee : EmployeeCreation) {
        const header = new Headers(this.header);
        const response = await fetch(`${this.URL_BASE}`, {
            headers: header,
            method: 'POST',
            body: JSON.stringify(employee)
        });
    }

    async RemoveEmployee(id : string) {
        const header = new Headers(this.header);
        await fetch(`${this.URL_BASE}(${id})`, {
            headers: header,
            method: 'DELETE'
        })
    }
}