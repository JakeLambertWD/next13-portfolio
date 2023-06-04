import { PortableTextBlock } from "sanity";

interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Project extends SanityBody {
  name: string;
  slug: string;
  image: Image;
  url: string;
  content: PortableTextBlock[];
}
