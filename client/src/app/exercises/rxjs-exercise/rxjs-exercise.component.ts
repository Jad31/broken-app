import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { DataService } from "./data.service";

@Component({
  selector: "app-rxjs-exercise",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./rxjs-exercise.component.html",
  styleUrls: ["./rxjs-exercise.component.scss"],
})
export class RxjsExerciseComponent {
  private dataService = inject(DataService);
  users = this.dataService.users;

  updateUserScore(userId: number) {
    const newScore = Math.floor(Math.random() * 1000);
    this.dataService.updateScore(userId, newScore);
  }
}
