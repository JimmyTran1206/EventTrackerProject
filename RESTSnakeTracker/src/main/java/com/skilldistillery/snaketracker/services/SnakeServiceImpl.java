package com.skilldistillery.snaketracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.snaketracker.entities.Snake;
import com.skilldistillery.snaketracker.repositories.SnakeRepository;

@Service
public class SnakeServiceImpl implements SnakeService {

	@Autowired
	private SnakeRepository snakeRepo;

	@Override
	public List<Snake> index() {
		return snakeRepo.findAll();
	}

	@Override
	public Snake searchById(int id) {
		return snakeRepo.searchById(id);
	}

	@Override
	public Snake addNewSnake(Snake snake) {
		return snakeRepo.save(snake);
	}

	@Override
	public Snake updateSnakeInfo(int id, Snake snake) {
		Snake snakeOrig = snakeRepo.searchById(id);
		if (snakeOrig == null) {
			return null;
		}
		snakeOrig.setSnakeType(snake.getSnakeType());
		snakeOrig.setDescription(snake.getDescription());
		snakeOrig.setPictureUrl(snake.getPictureUrl());
		return snakeRepo.save(snakeOrig);
	}

	@Override
	public boolean deleteSnake(int id) {
		if (snakeRepo.existsById(id)) {
			snakeRepo.deleteById(id);
			return true;
		}
		return false;
	}

}
