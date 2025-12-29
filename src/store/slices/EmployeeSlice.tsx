import { createSlice,  } from '@reduxjs/toolkit';
import type {  PayloadAction } from "@reduxjs/toolkit";
import type { EmployeeType  } from '../../models/EmployeeType';

interface EmployeeState {
  employeeList: EmployeeType[];
  selectedEmployee: EmployeeType | null;
  searchTerm: string;
  roleFilter: string;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: EmployeeState = {
  employeeList: [
  {
    id: 1,
    age: 28,
    role: "admin",
    userName: "vishnu",
    password: "vishnu@123",
    firstName: "Vishnu",
    lastName: "Kumar",
    email: "vishnu@example.com",
    dob: "1995-05-12",
    phoneNumber: "9876543210",
   
  },
  {
    id: 2,
    age: 32,
    role: "admin",
    userName: "sriram",
    password: "sriram",
    firstName: "Arun",
    lastName: "Singh",
    email: "arun@example.com",
    dob: "1991-08-20",
    phoneNumber: "9123456780",
  
  },
  ],
  selectedEmployee: null,
  searchTerm: '',
  roleFilter: 'all',
  currentPage: 1,
  itemsPerPage: 5
};

const EmployeeSlice = createSlice({
  name: 'EmployeeSlice',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<EmployeeType>) => {
      const id = Math.random() * 100;
      const employee = { ...action.payload, id };
      state.employeeList.push(employee);
    },
    removeEmployee: (state, action: PayloadAction<{ id: number }>) => {
      state.employeeList = state.employeeList.filter(
        (employee) => employee.id !== action.payload.id
      );
    },
    updateEmployee: (state, action: PayloadAction<EmployeeType>) => {
      state.employeeList = state.employeeList.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    },
    setSelectedEmployee: (state, action: PayloadAction<EmployeeType | null>) => {
      state.selectedEmployee = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.roleFilter = action.payload;
      state.currentPage = 1; // Reset to first page when filtering
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when changing items per page
    }
  }
});

export const {
  addEmployee,
  removeEmployee,
  updateEmployee,
  setSelectedEmployee,
  setSearchTerm,
  setRoleFilter,
  setCurrentPage,
  setItemsPerPage
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
export type { EmployeeState };




// remove 

// ✅ Meaning of !==

//  meansnot equal to !==.

// So:

// 3 !== 3 → false (because they ARE equal)

// 1 !== 3 → true (because they are NOT equal)

// The filter only keeps items where the condition is true.
// If action.payload.id = 3, then:

// The filter keeps all employees whose id is NOT 3

// The employee whose id is 3 is not kept, so it is removed

// 🧠 1-Line Understanding

// ✔ The filter creates a new list
// ✔ It keeps only employees whose ID is not the one we want to delete
// ✔ Because employee 3 is equal, 3 !== 3 becomes false, so it is removed

// 📌 Example
// ID	Check (id !== 3)	Result
// 1	1 !== 3 → true	Keep
// 2	2 !== 3 → true	Keep
// 3	3 !== 3 → false	❌ Remove
// 4	4 !== 3 → true	Keep
// 5	5 !== 3 → true	Keep
// 🎯 Final Meaning

// ➡️ !== = NOT EQUAL
// ➡️ Filter keeps only items not equal
// ➡️ ID 3 does not pass, so it gets removed