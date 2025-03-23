import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-exercise',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2>Exercice 1: Modal et Z-index</h2>
      <p>Corriger les problèmes de z-index du modal et améliorer son animation.</p>
      
      <button class="btn" (click)="showModal = true">Ouvrir le Modal</button>
      
      @if (showModal) {
        <div class="modal-container">
          <div class="overlay" (click)="showModal = false"></div>
          <div class="modal">
            <h3>Contenu du Modal</h3>
            <p>Ce modal doit apparaître au-dessus de tous les autres éléments.</p>
            <button class="btn" (click)="showModal = false">Fermer</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .modal-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class ModalExerciseComponent {
  showModal = false;
}