package com.jpa.employee.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="employee")
public class Employee {
		
		@Id
		@GeneratedValue
		private int id;
		private String name;
		private String occupation;
		private Date workingdate;
		private int workinghour;
		
		public int getEmpID() {
			return id;
		}
		public void setEmpID(int empID) {
			this.id = empID;
		}
		public String getEmpFirstname() {
			return name;
		}
		public void setEmpFirstname(String empFirstname) {
			this.name = empFirstname;
		}
		public String getEmpSecondname() {
			return occupation;
		}
		public void setEmpSecondname(String empSecondname) {
			this.occupation = empSecondname;
		}
		public Date getWorkingdate() {
			return workingdate;
		}
		public void setWorkingdate(Date workingdate) {
			this.workingdate = workingdate;
		}
		public int getWorkinghour() {
			return workinghour;
		}
		public void setWorkinghour(int workinghour) {
			this.workinghour = workinghour;
		}
		@Override
		public String toString() {
			return "Employee [id=" + id + ", name=" + name + ", occupation=" + occupation + ", workingdate=" + workingdate
					+ ", workinghour=" + workinghour + "]";
		}
		
		
		
}
