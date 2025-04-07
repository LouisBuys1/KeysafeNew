import type { KeyData } from "~/routes/_index"; // Import the interface

interface KeyProps {
  keyData: KeyData;
}

// Placeholder for actual key icon SVG or component
const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange">
    <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.79-.273 1.057l-1.74 2.437a3 3 0 0 0-.22 1.767V18.75a3 3 0 0 0 3 3h.094c.37.026.74.04 1.11.041h2.105c1.184-.028 2.31-.21 3.388-.555a.75.75 0 0 0 .44-.699V18a.75.75 0 0 0-.44-.7a11.95 11.95 0 0 1-3.388-.555c-.428-.128-.86-.24-1.297-.331a.75.75 0 0 0-.56.086 4.48 4.48 0 0 1-1.97.441 4.5 4.5 0 0 1-1.97-.441.75.75 0 0 0-.559-.086c-.437.09-.87.203-1.297.331-.401.12-.786.255-1.155.399a.75.75 0 0 0-.44.699v.013a5.94 5.94 0 0 1 1.11-.041h2.105c.37-.001.74-.015 1.11-.041a.75.75 0 0 0 .56-.086 4.48 4.48 0 0 1 1.97-.441c.713 0 1.394.204 1.97.441a.75.75 0 0 0 .559.086c.428.09.86.203 1.297.331a11.95 11.95 0 0 1 3.388.555.75.75 0 0 0 .44.7v.737c.004.008.007.016.01.024a6.75 6.75 0 0 0 6.64-7.821 6.75 6.75 0 0 0-6.75-6.75Zm-8.25 7.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" clipRule="evenodd" />
  </svg>
);


export default function Key({ keyData }: KeyProps) {
  // Base styles for the key slot
  const baseStyle = "key-slot bg-brand-purple rounded-lg shadow-neumorphic-outset hover:shadow-neumorphic-inset active:shadow-neumorphic-inset cursor-pointer";

  // Status-specific styles (currently just placeholder, could change icon color/opacity later)
  let statusStyle = "";
  switch (keyData.status) {
    case 'Out':
      statusStyle = "opacity-50"; // Example: Dim if out
      break;
    case 'Restricted':
      statusStyle = "border-2 border-red-500"; // Example: Border if restricted
      break;
    case 'In':
    default:
      statusStyle = ""; // Default 'In' state
      break;
  }

  return (
    <div
      className={`${baseStyle} ${statusStyle}`}
      title={`ID: ${keyData.id} - ${keyData.label} (${keyData.status})`} // Tooltip for info
    >
      <KeyIcon />
      {/* We removed the text label from inside the key slot */}
    </div>
  );
}
