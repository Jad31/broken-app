import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ModalExerciseComponent } from "./modal-exercise.component";

describe("ModalExerciseComponent", () => {
  let component: ModalExerciseComponent;
  let fixture: ComponentFixture<ModalExerciseComponent>;

  // Setup fake timers
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ModalExerciseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not show modal by default", () => {
    const modalElement = fixture.debugElement.query(By.css(".modal-container"));
    expect(modalElement).toBeFalsy();
  });

  it("should show modal when openModal is called", () => {
    // Initial state
    expect(component.showModal).toBe(false);

    // Open modal
    component.openModal();
    fixture.detectChanges();

    // Check component state
    expect(component.showModal).toBe(true);

    // Check DOM
    const modalElement = fixture.debugElement.query(By.css(".modal-container"));
    expect(modalElement).toBeTruthy();
  });

  it("should close modal when closeModal is called", () => {
    // Open the modal first
    component.openModal();
    fixture.detectChanges();
    expect(component.showModal).toBe(true);

    // Close modal
    component.closeModal();
    fixture.detectChanges();

    // Modal should be removed from DOM immediately
    const modalElement = fixture.debugElement.query(By.css(".modal-container"));
    expect(modalElement).toBeFalsy();

    // Test focus restoration timeout
    jest.advanceTimersByTime(100);

    // Modal should still be hidden
    expect(component.showModal).toBe(false);
  });

  it("should close modal when ESC key is pressed", () => {
    // Spy on closeModal
    const closeModalSpy = jest.spyOn(component, "closeModal");

    // Open the modal first
    component.openModal();
    fixture.detectChanges();

    // Simulate ESC key press
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
    });
    document.dispatchEvent(event);

    // Check if closeModal was called
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it("should close modal when overlay is clicked", () => {
    // Open the modal first
    component.openModal();
    fixture.detectChanges();

    // Spy on closeModal
    const closeModalSpy = jest.spyOn(component, "closeModal");

    // Find and click the overlay
    const overlayElement = fixture.debugElement.query(By.css(".overlay"));
    overlayElement.nativeElement.click();

    // Check if closeModal was called
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it("should manage focus properly", () => {
    // Mock the document.activeElement
    const mockButton = document.createElement("button");
    document.body.appendChild(mockButton);
    mockButton.focus();

    // Open modal
    component.openModal();
    fixture.detectChanges();

    // Verify that the previously focused element is stored
    expect(component["previouslyFocusedElement"]).toBe(mockButton);

    // Test that focus moves to modal button
    jest.advanceTimersByTime(100);

    // Close modal
    component.closeModal();

    // Fast-forward timeout for focus restoration
    jest.advanceTimersByTime(100);

    // Clean up
    document.body.removeChild(mockButton);
  });
});
