import { Experience, PageInfo, Project, Skill, Social } from "@/typings";
import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "m45u25nb",
  dataset: "production",
  apiVersion: "2023-06-04",
};

const client = createClient(config);

export async function getExperience(): Promise<Experience[]> {
  return client.fetch(groq`*[_type == "experience"]{
		...,
		technologies[]->
	}`);
}

export async function getPageinfo(): Promise<PageInfo[]> {
  return client.fetch(groq`*[_type == "pageInfo"][0]`);
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(groq`*[_type == "project"]`);
}

export async function getSkill(): Promise<Skill[]> {
  return client.fetch(groq`*[_type == "skill"]`);
}

export async function getSocials(): Promise<Social[]> {
  return client.fetch(groq`*[_type == "social"]`);
}

// helper function to pull all our images from Sanity
const builder = imageUrlBuilder(config);
export function urlFor(source: any) {
  return builder.image(source);
}
