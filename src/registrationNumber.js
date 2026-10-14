import { supabase } from "./supabaseClient";

/**
 * Requests the next registration number from Supabase.
 *
 * Example:
 * REG:2026/01/SPT
 * REG:2026/02/SPT
 */
export async function generateRegistrationNumber() {
  const { data, error } = await supabase.rpc(
    "next_training_registration_number"
  );

  if (error) {
    console.error("Supabase registration error:", error.message);

    throw new Error(
      "Unable to generate your registration number. Please try again."
    );
  }

  if (typeof data !== "string" || !/^REG:\d{4}\/\d+\/SPT$/.test(data)) {
    console.error("Invalid registration number returned:", data);

    throw new Error(
      "The registration number received is invalid."
    );
  }

  return data;
}