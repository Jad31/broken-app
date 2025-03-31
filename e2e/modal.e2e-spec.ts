import { expect, test } from "@playwright/test";

test.describe("Modal Exercise", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the app URL before each test
    await page.goto("/");
  });

  test("should open modal when button is clicked", async ({ page }) => {
    // Initially, modal should not be visible
    expect(await page.locator(".modal-container").count()).toBe(0);

    // Click the button to open the modal
    await page.locator('.card button:has-text("Ouvrir le Modal")').click();

    // Modal should now be visible
    await expect(page.locator(".modal-container")).toBeVisible();
    await expect(page.locator(".modal")).toBeVisible();
    await expect(page.locator(".overlay")).toBeVisible();

    // Verify modal content
    await expect(page.locator(".modal h3")).toHaveText("Contenu du Modal");
    await expect(page.locator(".modal p")).toHaveText(
      "Ce modal doit apparaître au-dessus de tous les autres éléments."
    );
  });

  test("should close modal when close button is clicked", async ({ page }) => {
    // Open the modal
    await page.locator('.card button:has-text("Ouvrir le Modal")').click();
    await expect(page.locator(".modal")).toBeVisible();

    // Click the close button
    await page.locator('.modal button:has-text("Fermer")').click();

    // Modal should be removed from DOM immediately with animation
    await expect(page.locator(".modal-container")).toBeHidden({ timeout: 500 });
  });

  test("should close modal when overlay is clicked", async ({ page }) => {
    // Open the modal
    await page.locator('.card button:has-text("Ouvrir le Modal")').click();
    await expect(page.locator(".modal")).toBeVisible();

    // Click the overlay (outside of the modal)
    await page.locator(".overlay").click({ position: { x: 10, y: 10 } });

    // Modal should be removed from DOM immediately with animation
    await expect(page.locator(".modal-container")).toBeHidden({ timeout: 500 });
  });

  test("should close modal when ESC key is pressed", async ({ page }) => {
    // Open the modal
    await page.locator('.card button:has-text("Ouvrir le Modal")').click();
    await expect(page.locator(".modal")).toBeVisible();

    // Press the ESC key
    await page.keyboard.press("Escape");

    // Modal should be removed from DOM immediately with animation
    await expect(page.locator(".modal-container")).toBeHidden({ timeout: 500 });
  });

  test("should properly focus the close button when modal opens", async ({
    page,
  }) => {
    // Open the modal
    await page.locator('.card button:has-text("Ouvrir le Modal")').click();

    // Check if the close button is focused
    await expect(
      page.locator('.modal button:has-text("Fermer")')
    ).toBeFocused();
  });

  test("should have proper z-index hierarchy", async ({ page }) => {
    // Open the modal
    await page.locator('.card button:has-text("Ouvrir le Modal")').click();

    // Check z-index values
    const modalContainerZIndex = await page
      .locator(".modal-container")
      .evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("z-index")
      );
    const overlayZIndex = await page
      .locator(".overlay")
      .evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("z-index")
      );
    const modalZIndex = await page
      .locator(".modal")
      .evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

    // Verify z-index hierarchy
    expect(parseInt(modalContainerZIndex)).toBeLessThan(
      parseInt(overlayZIndex)
    );
    expect(parseInt(overlayZIndex)).toBeLessThan(parseInt(modalZIndex));
  });
});
