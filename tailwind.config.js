module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-blue": "rgba(60, 130, 214, 0.14)",
        "blue-dash":" rgba(60, 130, 214, 0.53)",
        "yellow-dash": "rgba(251, 187, 0, 0.38)",
        "custom-red": "rgba(255, 0, 0, 0.22)",
        "custom-dark-red": "rgba(198, 59, 59, 0.65)",
        "custom-grey":"rgba(140, 184, 105, 0.19)",
        "custom-yellow":"rgba(251, 187, 0, 0.12)",
        "custom-pink":"rgba(255, 0, 0, 0.12)",
        "custome-button-grey":"rgba(180, 180, 180, 0.26)"
      },
      borderColor: {
        "custom-border": "rgba(0, 0, 0, 0.08)",
        "custom-cardBorder":"rgba(101, 101, 101, 0.29)",
      
        // Add more custom border colors if needed
      },
      boxShadow: {
        "custom-shadow": "0px 4px 14px rgba(0, 0, 0, 0.15)",
        "custom-inset-shadow":"inset 0px 0px 19px rgba(0, 0, 0, 0.05)"
        // Add more custom shadows if needed
      },
      borderColor: {
        'custom': 'rgba(0, 0, 0, 0.08)',
        'line-border':'rgba(180, 180, 180, 0.37)',
        'inputBorder':' rgba(0, 0, 0, 0.08)',
       
      },
      spacing: {
        'Custom-spacing': '0.5rem', // Increase the distance between the dots
      },
     
    },
    colors: {
      gray: "#808080",
      midgray:'#A4A4A4',
      lightgray:'#F6F6F6',
      black:'#212121',
      blue:'#3C82D6',
      red:'#FF0000',
      white:'#FFFFFF',
      customTxt:'rgba(101, 101, 101, 0.62)'
    },
   
  },
  plugins: [],
};
