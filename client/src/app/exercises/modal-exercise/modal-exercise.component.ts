import { animate, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-modal-exercise",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./modal-exercise.component.html",
  styleUrls: ["./modal-exercise.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms ease-out", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("300ms ease-in", style({ opacity: 0 }))]),
    ]),
    trigger("slideInOut", [
      transition(":enter", [
        style({
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.8)",
        }),
        animate(
          "400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          style({
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          })
        ),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-in",
          style({
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.9)",
          })
        ),
      ]),
    ]),
  ],
})
export class ModalExerciseComponent {
  showModal = false;
  private previouslyFocusedElement: HTMLElement | null = null;

  @HostListener("document:keydown.escape")
  handleEscapeKey(): void {
    if (this.showModal) {
      this.closeModal();
    }
  }

  openModal(): void {
    this.showModal = true;
    // Store the currently focused element to return focus when modal closes
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    // Set focus on the modal after it's displayed
    setTimeout(() => {
      const modalElement = document.querySelector(".modal") as HTMLElement;
      if (modalElement) {
        const focusableElement = modalElement.querySelector(
          "button"
        ) as HTMLElement;
        if (focusableElement) {
          focusableElement.focus();
        }
      }
    }, 100);
  }

  closeModal(): void {
    this.showModal = false;

    // Return focus to the previously focused element when modal closes
    if (this.previouslyFocusedElement) {
      setTimeout(() => {
        this.previouslyFocusedElement?.focus();
      }, 100);
    }
  }
}
