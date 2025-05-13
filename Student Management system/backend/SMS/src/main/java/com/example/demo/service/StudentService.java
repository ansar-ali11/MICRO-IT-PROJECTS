package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Student;
import com.example.demo.respository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository repo;
	
	public List<Student> getall(){
		return repo.findAll();
	}
	
	public Student addstd(Student std) {
		return repo.save(std);
	}
	
	public void deletestd(Long id) {
		repo.deleteById(id);
	}
	
	public Student updatestd(Long id,Student std) {
		Student exstd=repo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
		exstd.setName(std.getName());
		exstd.setEmail(std.getEmail());
		exstd.setPhone(std.getPhone());
		exstd.setDepartment(std.getDepartment());
		return repo.save(exstd);
	}
}
