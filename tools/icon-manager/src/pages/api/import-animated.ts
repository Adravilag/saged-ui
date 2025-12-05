import type { APIRoute } from 'astro';
import { ANIMATED_ICONS, readIcons, saveIcons } from '../../lib/icons';

export const POST: APIRoute = async () => {
  try {
    const currentIcons = await readIcons();
    const existingNames = new Set(currentIcons.map(icon => icon.name));

    // Add animated icons that don't already exist
    const newIcons = Object.entries(ANIMATED_ICONS)
      .filter(([name]) => !existingNames.has(name))
      .map(([name, content]) => ({ name, content, inProject: false }));

    if (newIcons.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        message: 'All animated icons already imported',
        added: 0
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Merge and save
    const allIcons = [...currentIcons, ...newIcons];
    await saveIcons(allIcons);

    return new Response(JSON.stringify({
      success: true,
      message: `Added ${newIcons.length} animated icons`,
      added: newIcons.length,
      icons: newIcons.map(i => i.name)
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error importing animated icons:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to import animated icons'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
