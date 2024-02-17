package com.skilldistillery.snaketracker.services;

import java.util.List;

import com.skilldistillery.snaketracker.entities.Snake;

public interface SnakeService {
	public List<Snake> index();
	public Snake searchById(int id);
	public Snake addNewSnake(Snake snake);
	public Snake updateSnakeInfo(int id, Snake snake);
	public boolean deleteSnake(int id);
	
}
