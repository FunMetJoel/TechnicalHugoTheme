document.addEventListener('DOMContentLoaded', async function () {
    const toggleBtn = document.getElementById('theme-toggle');
    const userPref = localStorage.getItem('theme');

    function setInitialTheme() {
        if (userPref) {
            document.documentElement.setAttribute('data-theme', userPref);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    async function renderMermaidWithTheme(theme) {
        mermaid.initialize({
            startOnLoad: false,
            theme: theme
        });

        const mermaidElements = document.querySelectorAll('.mermaid');
        for (let i = 0; i < mermaidElements.length; i++) {
            const el = mermaidElements[i];

            const diagramCode = el.getAttribute('diagram-data');
            if (!diagramCode) continue;

            const newEl = document.createElement('div');
            newEl.className = 'mermaid';
            newEl.setAttribute('diagram-data', diagramCode); // Preserve for future theme changes
            newEl.innerHTML = diagramCode;

            el.replaceWith(newEl);

            try {
                await new Promise((r) => requestAnimationFrame(r));
                await mermaid.run({ nodes: [newEl] });
            } catch (err) {
                console.error(`Failed to render diagram ${i + 1}`, err);
            }
        }
    }

    async function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        await renderMermaidWithTheme(next === 'dark' ? 'dark' : 'default');
    }

    setInitialTheme();
    await renderMermaidWithTheme(
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default'
    );

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }
});
