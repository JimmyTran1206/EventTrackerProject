package com.skilldistillery.snaketracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.snaketracker.entities.Snake;
import com.skilldistillery.snaketracker.services.SnakeService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/")
public class SnakeController {
	@Autowired
	private SnakeService snakeService;

	@GetMapping("snakes")
	public List<Snake> index(HttpServletResponse res) {
		res.setStatus(200);
		return snakeService.index();
	}

	@GetMapping("snakes/{id}")
	public Snake index(@PathVariable(name = "id") int id, HttpServletResponse res) {
		Snake snake = snakeService.searchById(id);
		if (snake == null) {
			res.setStatus(404);
		} else {
			res.setStatus(200);
		}
		return snake;
	}

	@PostMapping("snakes")
	public Snake addNewSnake(@RequestBody Snake snake, HttpServletResponse res, HttpServletRequest req) {
		try {
			snake = snakeService.addNewSnake(snake);
			res.setStatus(201);
			res.setHeader("Location", req.getRequestURL().append("/").append(snake.getId()).toString());
		} catch (Exception e) {
			res.setStatus(400);
			snake=null;
		}
		return snake;
	}
	
	@PutMapping("snakes/{id}")
	public Snake updateSnakeInfo(@RequestBody Snake snake,@PathVariable(name="id") int id, HttpServletResponse res, HttpServletRequest req) {
		try {
			snake = snakeService.updateSnakeInfo(id, snake);
			if(snake==null) {
				res.setStatus(404);
			}else {
				res.setStatus(201);				
			}
		} catch (Exception e) {
			res.setStatus(400);
			snake=null;
		}
		return snake;
	}
	
	@DeleteMapping("snakes/{id}")
	public void deleteSnake(@PathVariable(name = "id") int id, HttpServletResponse res) {
		try {
			if(snakeService.deleteSnake(id)) {
				res.setStatus(204);
			}else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
		}
	}
}
