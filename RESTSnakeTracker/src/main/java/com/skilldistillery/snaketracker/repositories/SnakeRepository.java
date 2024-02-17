package com.skilldistillery.snaketracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.snaketracker.entities.Snake;

public interface SnakeRepository extends JpaRepository<Snake, Integer> {
	Snake searchById(int id);
}
