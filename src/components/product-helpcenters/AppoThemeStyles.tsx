'use client';

export default function AppoThemeStyles() {
  return (
    <style jsx global>{`
      .appo-theme nav button {
        background-color: transparent !important;
      }
      .appo-theme nav button:hover {
        background-color: transparent !important;
      }
      .appo-theme nav button span[class*="bg-gradient"] {
        background: linear-gradient(to right, transparent, rgb(242, 141, 27), transparent) !important;
      }
      .appo-theme nav a:not([href*="demo"]) {
        background-color: transparent !important;
      }
      .appo-theme nav a:hover:not([href*="demo"]) {
        background-color: transparent !important;
      }
      .appo-theme nav a[class*="bg-primary"] {
        background-color: #F28D1B !important;
      }
      .appo-theme nav a[class*="bg-primary"]:hover {
        background-color: #FFB633 !important;
      }
      .appo-theme nav a[class*="shadow-primary"] {
        box-shadow: 0 10px 15px -3px rgba(242, 141, 27, 0.25) !important;
      }
      .appo-theme nav a[class*="shadow-primary"]:hover {
        box-shadow: 0 20px 25px -5px rgba(242, 141, 27, 0.4) !important;
      }
    `}</style>
  );
}
