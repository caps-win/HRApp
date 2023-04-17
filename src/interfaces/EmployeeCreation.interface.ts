import { Employee } from './Employee.interface';
export interface EmployeeCreation extends Employee {
     EmploymentStartDate: string | null,
     EmploymentEndDate: string | null
 }