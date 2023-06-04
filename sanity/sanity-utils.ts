import { Project, Social } from "@/typings";
import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: "m45u25nb",
  dataset: "production",
  apiVersion: "2023-06-04",
});
export async function getProjects(): Promise<Project[]> {
  return client.fetch(groq`*[_type == "project"]`);
}

export async function getSocials(): Promise<Social[]> {
  return client.fetch(groq`*[_type == "social"]`);
}
