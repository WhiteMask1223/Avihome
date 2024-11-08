/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      colors: {

        //Estilos para Checkboxes
        checkboxThemeColor: 'rgb(var(--theme-checkbox-background-color))',
        checkboxThemeBorder: 'rgb(var(--theme-checkbox-border-color))',
        checkboxThemeSelected: 'rgb(var(--theme-checkbox-selected-color))',

        //Estilos Para Sections
        sectionThemeBackground: 'rgb(var(--theme-section-background-color))',
        sectionThemeBorder: 'rgb(var(--theme-section-border-color))',
        sectionThemeShadow: 'rgb(var(--theme-section-shadow-color))',

        //Estilos para elementos
        elementThemeColor: 'rgb(var(--theme-element-background-color))',

        //Estilos de paginación
        arrowThemeColor: 'rgb(var(--theme-arrow-color))',
        arrowDisableThemeColor: 'rgb(var(--theme-arrow-disable-color))',

        //Estilos para Danger Buttons
        dangerButtonThemeColor: 'rgb(var(--theme-dangerButton-color))',
        dangerButtonDisableThemeColor: 'rgb(var(--theme-dangerButton-disable-color))',
        dangerButtonIconsThemeColor: 'rgb(var(--theme-dangerButton-icons))'
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
