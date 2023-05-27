module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-blue": "rgba(60, 130, 214, 0.14)",
        "blue-dash":" rgba(60, 130, 214, 0.53)",
        "yellow-dash": "rgba(251, 187, 0, 0.38)",
        "custom-red": "rgba(255, 0, 0, 0.22)",
        "custom-grey":"rgba(140, 184, 105, 0.19)"
      },
      borderColor: {
        "custom-border": "rgba(0, 0, 0, 0.08)",
        // Add more custom border colors if needed
      },
     
    },
    colors: {
      gray: "#808080",
      midgray:'#A4A4A4',
      lightgray:'#F6F6F6',
      black:'#212121',
      blue:'#3C82D6',
      red:'#FF0000'
    },
   
  },
  plugins: [],
};
