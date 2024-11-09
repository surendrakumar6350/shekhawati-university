export function ThemeScript() {
  const script = `
    try {
      const savedTheme = document.cookie.match(/theme=(light|dark)/)?.[1] || 'light';
      document.documentElement.classList.add(savedTheme === 'dark' ? 'dark' : '');
      document.body.classList.add(savedTheme === 'dark' ? 'dark' : '');
    } catch (e) {}
  `;
  
  return (
    <script dangerouslySetInnerHTML={{ __html: script }} />
  );
}
