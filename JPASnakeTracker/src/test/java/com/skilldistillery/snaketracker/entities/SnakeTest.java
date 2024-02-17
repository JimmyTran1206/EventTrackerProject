package com.skilldistillery.snaketracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;


class SnakeTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Snake snake;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPASnakeTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		snake = em.find(Snake.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		snake = null;
		em.close();
	}

	@Test
	void test_Snake_entity_mapping() {
		assertNotNull(snake);
		assertEquals("King Cobra", snake.getSnakeType());
	}
	

}
