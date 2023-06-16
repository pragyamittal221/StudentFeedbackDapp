// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'TeacherRole' to manage this role - add, remove, check
contract TeacherRole {
  using Roles for Roles.Role;
  // Define 2 events, one for Adding, and other for Removing
  event TeacherAdded(address indexed account);
  event TeacherRemoved(address indexed account);

  // Define a struct 'Teachers' by inheriting from 'Roles' library, struct Role
  Roles.Role private Teachers;
  // In the constructor make the address that deploys this contract the 1st Teacher
  constructor() public{
    //_addConstructor(msg.sender);
    _addTeacher(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyTeacher() {
    require(isTeacher(msg.sender));
    _;
  }

  // Define a function 'isTeacher' to check this role
  function isTeacher(address account) public view returns (bool) {
    return Teachers.has(account);
  }

  // Define a function 'addTeacher' that adds this role
  function addTeacher(address account) public onlyTeacher {
    _addTeacher(account);
  }

  // Define a function 'renounceTeacher' to renounce this role
  function renounceTeacher(address account) public {
    _removeTeacher(account);
  }

  // Define an internal function '_addTeacher' to add this role, called by 'addTeacher'
  function _addTeacher(address account) internal {
    Teachers.add(account);
    emit TeacherAdded(account);
  }

  // Define an internal function '_removeTeacher' to remove this role, called by 'removeTeacher'
  function _removeTeacher(address account) internal {
    Teachers.remove(account);
    emit TeacherRemoved(account);
  }
}