import { newSpecPage } from '@stencil/core/testing';
import { SgInput } from './input';

describe('sg-input', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input></sg-input>',
    });
    expect(page.root).toHaveClass('sg-input');
    expect(page.root).toHaveClass('sg-input--md');
    // variant="default" is applied via reflect, check attribute instead
    expect(page.root.getAttribute('variant')).toBe('default');
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input label="Email"></sg-input>',
    });
    const label = page.root?.shadowRoot?.querySelector('.input-label');
    expect(label).toBeTruthy();
    expect(label?.textContent).toContain('Email');
  });

  it('renders required indicator', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input label="Email" required></sg-input>',
    });
    const required = page.root?.shadowRoot?.querySelector('.required-mark');
    expect(required).toBeTruthy();
    expect(required?.textContent).toBe('*');
  });

  it('renders with placeholder', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input placeholder="Enter text"></sg-input>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.placeholder).toBe('Enter text');
  });

  it('handles value changes', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input value="test"></sg-input>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.value).toBe('test');
  });

  it('renders with leading icon', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input leading-icon="search"></sg-input>',
    });
    const icon = page.root?.shadowRoot?.querySelector('.input-icon--leading');
    expect(icon).toBeTruthy();
    expect(page.root).toHaveClass('sg-input--has-leading-icon');
  });

  it('renders with trailing icon', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input trailing-icon="check"></sg-input>',
    });
    const icon = page.root?.shadowRoot?.querySelector('.input-icon--trailing');
    expect(icon).toBeTruthy();
    expect(page.root).toHaveClass('sg-input--has-trailing-icon');
  });

  it('renders clear button when clearable and has value', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input value="test" clearable></sg-input>',
    });
    const clearBtn = page.root?.shadowRoot?.querySelector('.input-clear');
    expect(clearBtn).toBeTruthy();
  });

  it('does not render clear button when empty', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input clearable></sg-input>',
    });
    const clearBtn = page.root?.shadowRoot?.querySelector('.input-clear');
    expect(clearBtn).toBeFalsy();
  });

  it('renders password toggle for password type', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input type="password"></sg-input>',
    });
    const toggle = page.root?.shadowRoot?.querySelector('.input-toggle-password');
    expect(toggle).toBeTruthy();
  });

  it('renders helper text', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input helper-text="Enter a valid email"></sg-input>',
    });
    const helper = page.root?.shadowRoot?.querySelector('.input-helper');
    expect(helper).toBeTruthy();
    expect(helper?.textContent).toContain('Enter a valid email');
  });

  it('renders error message when validation-state is error', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input validation-state="error" error-message="Invalid input"></sg-input>',
    });
    const helper = page.root?.shadowRoot?.querySelector('.input-helper--error');
    expect(helper).toBeTruthy();
    expect(helper?.textContent).toContain('Invalid input');
  });

  it('applies size classes', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input size="lg"></sg-input>',
    });
    expect(page.root).toHaveClass('sg-input--lg');
  });

  it('applies variant classes', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input variant="filled"></sg-input>',
    });
    // variant is reflected as attribute
    expect(page.root.getAttribute('variant')).toBe('filled');
  });

  it('applies disabled state', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input disabled></sg-input>',
    });
    expect(page.root).toHaveClass('sg-input--disabled');
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('applies readonly state', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input readonly></sg-input>',
    });
    expect(page.root).toHaveClass('sg-input--readonly');
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.readOnly).toBe(true);
  });

  it('emits sgInput event on input', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input></sg-input>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    const spy = jest.fn();
    page.root?.addEventListener('sgInput', spy);

    input?.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalled();
  });

  it('emits sgClear event when clear button clicked', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input value="test" clearable></sg-input>',
    });
    const clearBtn = page.root?.shadowRoot?.querySelector('.input-clear') as HTMLButtonElement;
    const spy = jest.fn();
    page.root?.addEventListener('sgClear', spy);

    clearBtn?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('toggles password visibility', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input type="password"></sg-input>',
    });
    const toggle = page.root?.shadowRoot?.querySelector('.input-toggle-password') as HTMLButtonElement;
    const input = page.root?.shadowRoot?.querySelector('input');

    expect(input?.type).toBe('password');

    toggle?.click();
    await page.waitForChanges();

    expect(input?.type).toBe('text');
  });

  it('supports minlength and maxlength', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input minlength="3" maxlength="10"></sg-input>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.minLength).toBe(3);
    expect(input?.maxLength).toBe(10);
  });

  it('supports pattern validation', async () => {
    const page = await newSpecPage({
      components: [SgInput],
      html: '<sg-input pattern="[a-z]+"></sg-input>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.pattern).toBe('[a-z]+');
  });
});
