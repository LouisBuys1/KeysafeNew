import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"; // Import json
import { useLoaderData } from "@remix-run/react"; // Import useLoaderData
import Key from "~/components/Key";
import { supabase } from "~/lib/supabase.server"; // Import server-side supabase client

export const meta: MetaFunction = () => {
  return [
    { title: "Key Safe Management" },
    { name: "description", content: "Manage keys in the key safe." },
  ];
};

// Define KeyData interface (matching your Supabase table structure)
// IMPORTANT: Adjust this interface to match your actual 'keys' table columns in Supabase
export interface KeyData {
  id: number;
  status: 'In' | 'Out' | 'Restricted'; // Ensure these match your Supabase enum/text values
  label: string;
  // Add any other relevant fields from your Supabase table
}

// Loader function to fetch data from Supabase
export async function loader() {
  const { data, error } = await supabase
    .from('keys') // Replace 'keys' with your actual table name
    .select('*') // Select all columns, or specify needed columns: 'id, status, label'
    .order('id', { ascending: true }); // Optional: order the keys

  if (error) {
    console.error("Supabase error:", error);
    // Handle error appropriately, maybe return an empty array or throw
    throw new Response("Error fetching keys from Supabase", { status: 500 });
  }

  // Ensure data conforms to KeyData interface (add validation/transformation if needed)
  const keys: KeyData[] = data || [];

  return json({ keys }); // Return data wrapped in json
}


export default function Index() {
  const { keys } = useLoaderData<typeof loader>(); // Use loader data

  return (
    // Main container with neumorphic styling
    <div className="w-full max-w-7xl bg-brand-purple rounded-2xl shadow-neumorphic-outset p-6 md:p-8">
      {/* Header Section (Placeholder) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-text-light flex items-center">
          <span className="mr-2">🔑</span> Key Safe
        </h1>
        <button className="bg-brand-red text-white px-4 py-2 rounded-lg shadow-neumorphic-outset-sm hover:shadow-neumorphic-inset active:shadow-neumorphic-inset">
          CHECK OUT
        </button>
      </div>

      {/* Main Content Area (Grid Only) */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* Left Side: Key Grid Only */}
        <div className="flex-grow bg-brand-purple-dark rounded-xl shadow-neumorphic-inset p-4 md:p-6">
           {/* Key Grid */}
           <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-4">
             {keys.length > 0 ? (
                keys.map((keyData) => (
                  <Key key={keyData.id} keyData={keyData} />
                ))
             ) : (
                <p className="text-brand-text-light col-span-full text-center">No keys found.</p> // Handle empty state
             )}
           </div>
        </div>

        {/* Right Side: Sidebar Removed */}

      </div>
    </div>
  );
}
