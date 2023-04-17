import { getEmployees, removeEmployee, UpdateEmployee, AddEmployee } from './viewModels/Employee.viewModel';
export const router = async (route: string) => {
    console.log(route)
    const path = route.split('/')[0];
    const parameter = route.split('/')[1]
    const element = document.getElementById('root')!;
    const modal = document.getElementById('modal')!;
    const breadcrumb = document.getElementById('breadcrumb')!;
    modal.classList.add('hidden')
    switch(path) {
        case '':
            breadcrumb.innerHTML  = `<a href="#"> Employees </a>`;
            const b = require('./views/EmployeeView.handlebars')
            element.innerHTML = await getEmployees()
            break;
        case '#EditEmployee':
            element.innerHTML = ''
            element.appendChild(await UpdateEmployee(parameter, breadcrumb));
            break;
        case '#NewEmployee':
            element.innerHTML = ''
            element.appendChild(await AddEmployee());
            break
        case '#RemoveEmployee':
            modal.classList.remove('hidden')
            modal.innerHTML = require('./views/RemoveEmployeeView.handlebars')({parameter});
            break
        case '#Remove':
            modal.classList.add('hidden')
            element.innerHTML = await removeEmployee(parameter);
            break
        default:
            element.innerHTML = require('./views/NotFoundView.handlebars')()
        break;
    }
}