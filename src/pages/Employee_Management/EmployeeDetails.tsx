import { Card, Divider } from '@mui/material';
import EmployeeTable from './EmployeeTable';
import EmployeeSearch from './EmployeeSearch';

const EmployeeDetails = () => {
  return (
    <Card>
      <EmployeeSearch />
      <Divider />
      <EmployeeTable />
    </Card>
  );
};

export default EmployeeDetails;

// {
//   "name": "employee1",
//   "email": "employee1@test.com",
//   "password": "Emp@123",
//   "role": "EMPLOYEE"
// }
