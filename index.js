// Function to create a single employee record
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to process an array of arrays and return an array of employee records
  function createEmployeeRecords(arrays) {
    return arrays.map(arr => createEmployeeRecord(arr));
  }
  
  // Function to add a timeIn event to an employee's record
  function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour)
    });
    return employee;
  }
  
  // Function to add a timeOut event to an employee's record
  function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour)
    });
    return employee;
  }
  
  // Function to calculate the hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    }
    return 0;
  }
  
  // Function to calculate the wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Function to calculate the total wages earned by an employee for all dates worked
  function allWagesFor(employee) {
    let allDates = employee.timeInEvents.map(event => event.date);
    return allDates.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
  }
  
  // Function to calculate the total payroll for an array of employees
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }
  