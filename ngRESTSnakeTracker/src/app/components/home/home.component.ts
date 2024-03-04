import { SnakeService } from './../../services/snake.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Snake } from '../../models/snake';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // Data variables
  public snakes: Snake[] = [];
  // View-Control variables
  public showWelcomeHeader: boolean = true;
  public showFrontPage: boolean = true;
  public showDetailPage: boolean = false;
  public showAddEditForm: boolean = false;
  public showControlButtons: boolean = false;
  public showDeleteConfirmation: boolean = false;
  // Next and Previous Button
  public showNextButton: boolean = true;
  public showPreviousButton: boolean = true;
  // End of view control variable
  // show-view functions
  public hideAllDiv() {
    this.showWelcomeHeader = false;
    this.showFrontPage = false;
    this.showDetailPage = false;
    this.showAddEditForm = false;
    this.showControlButtons = false;
    this.showDeleteConfirmation = false;
  }
  // End of show-viewFunction
  constructor(private snakeService: SnakeService) {}
  ngOnInit(): void {
    this.loadSnake();
  }

  public loadSnake() {
    this.snakeService.index().subscribe({
      next: (snakeList) => {
        this.snakes = snakeList;
        console.log(this.snakes);
      },
      error: (problem) => {
        console.error('HomeComponent.loadSnakes(): error loading snakeList:');
        console.error(problem);
      },
    });
  }

  public selectedSnake: Snake = new Snake(0, '', '', '');
  public showSnakeDetails(snakeId: number) {
    this.snakeService.show(snakeId).subscribe({
      next: (snake) => {
        this.selectedSnake = snake;
        this.hideAllDiv();
        this.showDetailPage = true;
        this.showControlButtons = true;
      },
      error: (problem) => {
        console.error('HomeComponent.loadSnakes(): error loading snakeList:');
        console.error(problem);
      },
    });
  }

  public backToMain() {
    this.hideAllDiv();
    this.loadSnake();
    this.showWelcomeHeader = true;
    this.showFrontPage = true;
  }

  public deleteSnake(snakeId: number) {
    this.snakeService.destroy(snakeId).subscribe({
      next: () => {
        this.loadSnake();
        this.hideAllDiv();
        this.showWelcomeHeader = true;
        this.showFrontPage = true;
      },
      error: (problem) => {
        console.error('HomeComponent.deleteSnake(): error deleting snake');
        console.error(problem);
      },
    });
  }

  public showEditForm(snake: Snake) {
    this.selectedSnake = snake;
    this.hideAllDiv();
    this.showDetailPage = true;
    this.showAddEditForm = true;
  }

  public cancelEdit() {
    this.showAddEditForm = false;
    this.showControlButtons = true;
  }

  public confirmEdit(snake: Snake, snakeId: number) {
    this.snakeService.update(snake, snakeId).subscribe({
      next: (snake) => {
        this.selectedSnake = snake;
        this.showAddEditForm = false;
        this.showControlButtons = true;
      },
      error: (problem) => {
        console.error(
          'HomeComponent.deleteWithoutConfirmation(): error deletiong snake'
        );
        console.error(problem);
      },
    });
  }

  public showDeleteConfirmDialog() {
    this.showControlButtons = false;
    this.showDeleteConfirmation = true;
  }
  public cancelDelete() {
    this.showControlButtons = true;
    this.showDeleteConfirmation = false;
  }

  public addNewSnake() {
    this.selectedSnake = {
      id: 0,
      snakeType: '',
      description: '',
      pictureUrl:
        'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
    };
    this.hideAllDiv();
    this.showDetailPage = true;
    this.showAddEditForm = true;
  }

  public cancelAddNewSnake() {
    this.hideAllDiv();
    this.showWelcomeHeader = true;
    this.showFrontPage = true;
  }

  public confirmAddingNewSnake(snake: Snake) {
    this.snakeService.create(snake).subscribe({
      next: (snake) => {
        this.selectedSnake = snake;
        this.hideAllDiv();
        this.showDetailPage = true;
        this.showControlButtons = true;
      },
      error: (problem) => {
        console.error(
          'HomeComponent.confirmAddingNewSnake(): error adding new snake:'
        );
        console.error(problem);
      },
    });
  }

  public showNextSnake(snake: Snake) {
    const currentIndex = this.snakes.findIndex((elem) => elem.id === snake.id);
    if (currentIndex === this.snakes.length - 1) {
      this.showPreviousButton = true;
      this.showNextButton = false;
    } else {
      this.showPreviousButton = true;
      this.showNextButton = true;
      this.selectedSnake = this.snakes[currentIndex + 1];
    }
  }

  public showPreviousSnake(snake: Snake) {
    const currentIndex = this.snakes.findIndex((elem) => elem.id === snake.id);
    if (currentIndex === 0) {
      this.showNextButton = true;
      this.showPreviousButton = false;
    } else {
      this.showPreviousButton = true;
      this.showNextButton = true;
      this.selectedSnake = this.snakes[currentIndex - 1];
    }
  }
}
