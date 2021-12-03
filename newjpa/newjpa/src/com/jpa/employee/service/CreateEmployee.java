package com.jpa.employee.service;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.jpa.employee.entity.Employee;

public class CreateEmployee {

	public static void main( String[ ] args ) {
		   
	      EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );
	      
	      EntityManager entitymanager = emfactory.createEntityManager( );
	      entitymanager.getTransaction( ).begin( );

	      Employee employee = new Employee( ); 
	      
	      employee.setEmpID(12);
	      employee.setEmpFirstname("Edwin");
	      employee.setEmpSecondname("Sabu");
	      employee.setWorkingdate(new Date());
	      employee.setWorkinghour(8);
	      
	      entitymanager.persist( employee );
	      entitymanager.getTransaction( ).commit( );

	      entitymanager.close( );
	      emfactory.close( );
	   }
}
