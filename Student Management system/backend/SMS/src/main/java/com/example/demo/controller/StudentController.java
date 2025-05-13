package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Student;
import com.example.demo.service.StudentService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
	private StudentService service;
	
	@GetMapping("/get")
	public List<Student> getall(){
		return service.getall();
	}
	
	@PostMapping("/add")
	public Student addstd(@RequestBody Student std) {
		return service.addstd(std);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deletestd(@PathVariable Long id) {
		service.deletestd(id);
	}
	
	@PutMapping("/update/{id}")
	public Student updatestd(@PathVariable Long id,@RequestBody Student std) {
		return service.updatestd(id, std);
	}
}
