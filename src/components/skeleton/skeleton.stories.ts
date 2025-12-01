import type { Meta, StoryObj } from '@storybook/html';

interface SgSkeletonArgs {
  variant: 'text' | 'rect' | 'circle';
  width: string;
  height: string;
  animation: 'shimmer' | 'pulse' | 'none';
}

const meta: Meta<SgSkeletonArgs> = {
  title: 'Components/SgSkeleton',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'rect', 'circle'],
      description: 'La forma del skeleton',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    width: {
      control: 'text',
      description: 'El ancho del skeleton',
      table: {
        defaultValue: { summary: '100%' },
      },
    },
    height: {
      control: 'text',
      description: 'La altura del skeleton',
      table: {
        defaultValue: { summary: '1rem' },
      },
    },
    animation: {
      control: { type: 'select' },
      options: ['shimmer', 'pulse', 'none'],
      description: 'El tipo de animación',
      table: {
        defaultValue: { summary: 'shimmer' },
      },
    },
  },
  render: args => {
    return `<sg-skeleton
      variant="${args.variant}"
      width="${args.width}"
      height="${args.height}"
      animation="${args.animation}">
    </sg-skeleton>`;
  },
};

export default meta;
type Story = StoryObj<SgSkeletonArgs>;

/**
 * El skeleton por defecto usa variant="text", animación shimmer y ocupa el 100% del ancho.
 */
export const Default: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: '1rem',
    animation: 'shimmer',
  },
};

/**
 * Skeleton de texto - ideal para representar líneas de texto.
 */
export const Text: Story = {
  args: {
    variant: 'text',
    width: '200px',
    height: '1rem',
    animation: 'shimmer',
  },
};

/**
 * Skeleton rectangular - ideal para imágenes, cards o contenedores.
 */
export const Rectangle: Story = {
  args: {
    variant: 'rect',
    width: '300px',
    height: '200px',
    animation: 'shimmer',
  },
};

/**
 * Skeleton circular - ideal para avatares o iconos.
 */
export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '64px',
    height: '64px',
    animation: 'shimmer',
  },
};

/**
 * Animación de pulso - efecto de opacidad alternante.
 */
export const PulseAnimation: Story = {
  args: {
    variant: 'rect',
    width: '200px',
    height: '100px',
    animation: 'pulse',
  },
};

/**
 * Sin animación - skeleton estático.
 */
export const NoAnimation: Story = {
  args: {
    variant: 'rect',
    width: '200px',
    height: '100px',
    animation: 'none',
  },
};

/**
 * Ejemplo de card skeleton - combinación de múltiples skeletons para simular una tarjeta.
 */
export const CardSkeleton: Story = {
  render: () => `
    <div style="width: 300px; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <!-- Imagen -->
      <sg-skeleton variant="rect" width="100%" height="150px" animation="shimmer"></sg-skeleton>

      <!-- Contenido -->
      <div style="margin-top: 16px;">
        <!-- Título -->
        <sg-skeleton variant="text" width="80%" height="1.5rem" animation="shimmer"></sg-skeleton>

        <!-- Descripción -->
        <div style="margin-top: 8px;">
          <sg-skeleton variant="text" width="100%" height="1rem" animation="shimmer"></sg-skeleton>
        </div>
        <div style="margin-top: 4px;">
          <sg-skeleton variant="text" width="90%" height="1rem" animation="shimmer"></sg-skeleton>
        </div>
        <div style="margin-top: 4px;">
          <sg-skeleton variant="text" width="60%" height="1rem" animation="shimmer"></sg-skeleton>
        </div>
      </div>

      <!-- Footer con avatar -->
      <div style="margin-top: 16px; display: flex; align-items: center; gap: 12px;">
        <sg-skeleton variant="circle" width="40px" height="40px" animation="shimmer"></sg-skeleton>
        <div style="flex: 1;">
          <sg-skeleton variant="text" width="120px" height="0.875rem" animation="shimmer"></sg-skeleton>
          <div style="margin-top: 4px;">
            <sg-skeleton variant="text" width="80px" height="0.75rem" animation="shimmer"></sg-skeleton>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Lista de items skeleton - simula una lista de elementos.
 */
export const ListSkeleton: Story = {
  render: () => `
    <div style="width: 400px;">
      ${[1, 2, 3, 4]
        .map(
          () => `
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
          <sg-skeleton variant="circle" width="48px" height="48px" animation="shimmer"></sg-skeleton>
          <div style="flex: 1;">
            <sg-skeleton variant="text" width="60%" height="1rem" animation="shimmer"></sg-skeleton>
            <div style="margin-top: 6px;">
              <sg-skeleton variant="text" width="40%" height="0.75rem" animation="shimmer"></sg-skeleton>
            </div>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `,
};
