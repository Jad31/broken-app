import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-performance-exercise",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./performance-exercise.component.html",
  styleUrl: "./performance-exercise.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceExerciseComponent {
  calculating = false;
  results: Array<{ id: number; value: number }> = [];

  startHeavyCalculation() {
    this.calculating = true;
    const data = Array.from({ length: 1000 }, (_, i) => i);

    if (typeof Worker !== "undefined") {
      const worker = new Worker(
        new URL("./performance.worker.ts", import.meta.url)
      );

      worker.onmessage = ({ data }) => {
        this.results = data;
        this.calculating = false;
        worker.terminate();
      };

      worker.postMessage(data);
    } else {
      // Fallback pour les environnements sans Web Workers
      this.results = this.heavyCalculation(data);
      this.calculating = false;
    }
  }

  private heavyCalculation(
    data: number[]
  ): Array<{ id: number; value: number }> {
    return data.map((n, id) => {
      let value = n;
      for (let i = 0; i < 1000000; i++) {
        value = Math.sqrt(value * i);
      }
      return { id, value: Math.round(value) };
    });
  }
}
