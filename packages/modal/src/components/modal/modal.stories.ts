export default {
  title: 'Components/Modal',
  component: 'sg-modal',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size preset',
    },
    header: {
      control: 'text',
      description: 'Modal header text',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Close when clicking backdrop',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close when pressing Escape',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    overlay: {
      control: 'boolean',
      description: 'Show backdrop overlay',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A modern modal dialog component built on the native HTML \`<dialog>\` element.

## Features
- ✅ Native \`<dialog>\` element for accessibility
- ✅ Built-in focus trapping
- ✅ Backdrop click to close
- ✅ Escape key to close
- ✅ Smooth animations
- ✅ Multiple size variants
- ✅ Dark mode support

## Usage

\`\`\`html
<sg-modal id="myModal" header="Confirm Action">
  <p>Are you sure?</p>
  <div slot="footer">
    <button class="btn btn-secondary">Cancel</button>
    <button class="btn btn-primary">Confirm</button>
  </div>
</sg-modal>

<script>
  document.getElementById('myModal').showModal();
  document.getElementById('myModal').close();
</script>
\`\`\`
        `,
      },
    },
  },
};

// Estilos para botones nativos
const buttonStyles = `
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    border: 1px solid transparent;
    font-family: inherit;
  }
  .btn-primary {
    background: var(--sg-color-primary, #3b82f6);
    color: white;
    border-color: var(--sg-color-primary, #3b82f6);
  }
  .btn-primary:hover {
    background: var(--sg-color-primary-hover, #2563eb);
    border-color: var(--sg-color-primary-hover, #2563eb);
  }
  .btn-secondary {
    background: #e5e7eb;
    color: #374151;
    border-color: #d1d5db;
  }
  .btn-secondary:hover {
    background: #d1d5db;
  }
  .btn-danger {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
  }
  .btn-danger:hover {
    background: #dc2626;
    border-color: #dc2626;
  }
  .btn-warning {
    background: #f59e0b;
    color: white;
    border-color: #f59e0b;
  }
  .btn-warning:hover {
    background: #d97706;
  }
`;

// Helper function to create story HTML
const createStoryContainer = (html: string) => {
  const container = document.createElement('div');

  // Inject button styles if not already present
  if (!document.getElementById('story-btn-styles')) {
    const style = document.createElement('style');
    style.id = 'story-btn-styles';
    style.textContent = buttonStyles;
    document.head.appendChild(style);
  }

  container.innerHTML = html;

  // Setup event listeners after DOM is created
  setTimeout(() => {
    container.querySelectorAll('[data-open-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-open-modal');
        const modal = document.getElementById(modalId!) as any;
        modal?.showModal();
      });
    });

    container.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        const modal = document.getElementById(modalId!) as any;
        modal?.close();
      });
    });
  }, 0);

  return container;
};

export const Default = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-primary" data-open-modal="demo-modal">
      Open Modal
    </button>

    <sg-modal id="demo-modal" header="Welcome to SageBox">
      <p>This is a modal dialog built with the native HTML <code>&lt;dialog&gt;</code> element.</p>
      <p>It includes:</p>
      <ul>
        <li>Focus trapping</li>
        <li>Escape to close</li>
        <li>Backdrop click to close</li>
        <li>Smooth animations</li>
      </ul>
      <div slot="footer">
        <button class="btn btn-secondary" data-close-modal="demo-modal">Cancel</button>
        <button class="btn btn-primary" data-close-modal="demo-modal">Confirm</button>
      </div>
    </sg-modal>
  `),
};

export const Small = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-secondary" data-open-modal="modal-sm">Open Small Modal</button>
    <sg-modal id="modal-sm" header="Small Modal" size="sm">
      <p>This is a <strong>small</strong> sized modal, perfect for confirmations.</p>
      <div slot="footer">
        <button class="btn btn-primary" data-close-modal="modal-sm">Close</button>
      </div>
    </sg-modal>
  `),
};

export const Medium = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-secondary" data-open-modal="modal-md">Open Medium Modal</button>
    <sg-modal id="modal-md" header="Medium Modal" size="md">
      <p>This is a <strong>medium</strong> sized modal (default size).</p>
      <p>Good for forms and standard content.</p>
      <div slot="footer">
        <button class="btn btn-secondary" data-close-modal="modal-md">Cancel</button>
        <button class="btn btn-primary" data-close-modal="modal-md">Save</button>
      </div>
    </sg-modal>
  `),
};

export const Large = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-secondary" data-open-modal="modal-lg">Open Large Modal</button>
    <sg-modal id="modal-lg" header="Large Modal" size="lg">
      <p>This is a <strong>large</strong> sized modal, great for forms and detailed content.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <div slot="footer">
        <button class="btn btn-secondary" data-close-modal="modal-lg">Cancel</button>
        <button class="btn btn-primary" data-close-modal="modal-lg">Save</button>
      </div>
    </sg-modal>
  `),
};

export const ExtraLarge = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-secondary" data-open-modal="modal-xl">Open XL Modal</button>
    <sg-modal id="modal-xl" header="Extra Large Modal" size="xl">
      <p>This is an <strong>extra large</strong> modal for complex content.</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
        <div style="padding: 1rem; background: rgba(0,0,0,0.05); border-radius: 0.5rem;">
          <h4 style="margin: 0 0 0.5rem 0;">Section 1</h4>
          <p style="margin: 0;">Content for the first section.</p>
        </div>
        <div style="padding: 1rem; background: rgba(0,0,0,0.05); border-radius: 0.5rem;">
          <h4 style="margin: 0 0 0.5rem 0;">Section 2</h4>
          <p style="margin: 0;">Content for the second section.</p>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" data-close-modal="modal-xl">Close</button>
      </div>
    </sg-modal>
  `),
};

export const Fullscreen = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-secondary" data-open-modal="modal-full">Open Fullscreen Modal</button>
    <sg-modal id="modal-full" header="Fullscreen Modal" size="full">
      <p>This modal takes up the entire viewport.</p>
      <p>Ideal for complex workflows or immersive experiences.</p>
      <div slot="footer">
        <button class="btn btn-primary" data-close-modal="modal-full">Exit</button>
      </div>
    </sg-modal>
  `),
};

export const ConfirmDialog = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-danger" data-open-modal="confirm-modal">Delete Item</button>
    <sg-modal id="confirm-modal" header="Delete Item?" size="sm">
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      <div slot="footer">
        <button class="btn btn-secondary" data-close-modal="confirm-modal">Cancel</button>
        <button class="btn btn-danger" data-close-modal="confirm-modal">Delete</button>
      </div>
    </sg-modal>
  `),
};

export const WithForm = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-primary" data-open-modal="form-modal">Edit Profile</button>
    <sg-modal id="form-modal" header="Edit Profile" size="md">
      <form style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name</label>
          <input type="text" value="John Doe" style="width: 100%; padding: 0.5rem; border: 1px solid var(--sg-color-border, #d1d5db); border-radius: 0.375rem; box-sizing: border-box; background: var(--sg-color-surface, white); color: var(--sg-color-text, #1f2937);" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
          <input type="email" value="john@example.com" style="width: 100%; padding: 0.5rem; border: 1px solid var(--sg-color-border, #d1d5db); border-radius: 0.375rem; box-sizing: border-box; background: var(--sg-color-surface, white); color: var(--sg-color-text, #1f2937);" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Bio</label>
          <textarea rows="3" style="width: 100%; padding: 0.5rem; border: 1px solid var(--sg-color-border, #d1d5db); border-radius: 0.375rem; resize: vertical; box-sizing: border-box; background: var(--sg-color-surface, white); color: var(--sg-color-text, #1f2937);">Software developer passionate about web components.</textarea>
        </div>
      </form>
      <div slot="footer">
        <button class="btn btn-secondary" data-close-modal="form-modal">Cancel</button>
        <button class="btn btn-primary" data-close-modal="form-modal">Save Changes</button>
      </div>
    </sg-modal>
  `),
};

export const LongContent = {
  render: () => {
    const sections = Array(8)
      .fill(null)
      .map(
        (_, i) => `
        <h3 style="margin: 1rem 0 0.5rem 0;">Section ${i + 1}</h3>
        <p style="margin: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      `
      )
      .join('');

    return createStoryContainer(`
      <button class="btn btn-primary" data-open-modal="long-modal">Open Scrollable Modal</button>
      <sg-modal id="long-modal" header="Terms and Conditions" size="lg">
        <div>${sections}</div>
        <div slot="footer">
          <button class="btn btn-secondary" data-close-modal="long-modal">Decline</button>
          <button class="btn btn-primary" data-close-modal="long-modal">Accept</button>
        </div>
      </sg-modal>
    `);
  },
};

export const NoCloseButton = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-warning" data-open-modal="forced-modal">Important Notice</button>
    <sg-modal
      id="forced-modal"
      header="Important Notice"
      size="sm"
      show-close-button="false"
      close-on-backdrop="false"
      close-on-escape="false"
    >
      <p>You must acknowledge this message before continuing.</p>
      <div slot="footer">
        <button class="btn btn-primary" data-close-modal="forced-modal">I Understand</button>
      </div>
    </sg-modal>
  `),
};

export const CustomHeader = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-primary" data-open-modal="custom-header-modal">Open with Custom Header</button>
    <sg-modal id="custom-header-modal" size="md">
      <div slot="header" style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 1.25rem;">ℹ️</span>
        <span style="font-weight: 600; font-size: 1.125rem;">Custom Header with Icon</span>
      </div>
      <p>This modal has a custom header using the header slot instead of the header prop.</p>
      <div slot="footer">
        <button class="btn btn-primary" data-close-modal="custom-header-modal">Got it</button>
      </div>
    </sg-modal>
  `),
};

export const NoFooter = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-secondary" data-open-modal="no-footer-modal">Open Modal without Footer</button>
    <sg-modal id="no-footer-modal" header="Information">
      <p>This modal doesn't have a footer slot.</p>
      <p>The user can close it using the X button, clicking the backdrop, or pressing Escape.</p>
    </sg-modal>
  `),
};

export const NoOverlay = {
  render: () =>
    createStoryContainer(`
    <button class="btn btn-secondary" data-open-modal="no-overlay-modal">Open Modal without Overlay</button>
    <sg-modal id="no-overlay-modal" header="No Backdrop Overlay" overlay="false">
      <p>This modal has no backdrop overlay.</p>
      <p>You can still see and interact with the content behind it.</p>
      <div slot="footer">
        <button class="btn btn-primary" data-close-modal="no-overlay-modal">Close</button>
      </div>
    </sg-modal>
  `),
};
