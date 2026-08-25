import type { APIRoute } from "astro";
import { generateOgImageForTraining } from "@/utils/generateOgImages";

export const GET: APIRoute = async () => {
  const pngBuffer = await generateOgImageForTraining();

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};