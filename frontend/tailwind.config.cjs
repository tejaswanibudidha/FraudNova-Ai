module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: '#070d19',
        darkbg: '#050914',
        surface: '#0c1427',
        cardbg: '#0e172a',
        cybercyan: '#00f5ff',
        cyan: '#06b6d4',
        electric: '#38bdf8',
        fraudred: '#ff3366',
        danger: '#f43f5e',
        genuine: '#10b981',
        warning: '#f59e0b',
        neonpurple: '#a855f7'
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    }
  },
  plugins: []
}
