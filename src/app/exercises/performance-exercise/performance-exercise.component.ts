import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-performance-exercise",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2>Exercice 3: Performance</h2>
      <p>
        Optimiser les calculs intensifs et éviter le blocage du thread
        principal.
      </p>

      <div class="controls">
        <button class="btn" (click)="startHeavyCalculation()">
          Démarrer le calcul intensif
        </button>
      </div>

      <div class="results">
        @if (calculating) {
        <div class="loading-spinner"></div>
        } @if (results.length > 0) {
        <div class="data-grid">
          @for (result of results; track result.id) {
          <div class="grid-item">
            {{ result.value }}
          </div>
          }
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .controls {
        margin-bottom: 20px;
      }
      .data-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 10px;
      }
      .grid-item {
        padding: 10px;
        background: #eee;
        text-align: center;
        border-radius: 4px;
      }
      .results {
        margin-top: 20px;
      }
    `,
  ],
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
