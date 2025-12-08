import { newE2EPage } from '@stencil/core/testing';

describe('sg-modal e2e', () => {
  it('should have correct typography styles', async () => {
    const page = await newE2EPage();
    await page.setContent('<sg-modal header="Test Title" open>Content</sg-modal>');

    const modal = await page.find('sg-modal');
    expect(modal).toHaveClass('hydrated');

    // Check font-family on the modal container
    const modalContainer = await page.find('sg-modal >>> .sg-modal');
    const modalStyle = await modalContainer.getComputedStyle();

    // Verify font-family is set (checking for sans-serif as it's the fallback in our token)
    expect(modalStyle.fontFamily).toContain('sans-serif');

    // Check title typography
    const title = await page.find('sg-modal >>> .sg-modal__title');
    const titleStyle = await title.getComputedStyle();

    // font-size: xl -> 1.25rem -> 20px (assuming base 16px)
    expect(titleStyle.fontSize).toBe('20px');

    // font-weight: semibold -> 600
    expect(titleStyle.fontWeight).toBe('600');
  });
});
