type Blog = {
  _id: string;
  author: string;
  authorImage: string;
  title: string;
  titleImage: string;
  description: string;
  category: string;
  content: string;
  timeToRead: string;
  createdAt: string;
  updatedAt: string;
};

type Child = {
  _id?: string;
  name: string;
  dateOfBirth: string;
  description: string;
};

type Family = {
  _id: string;
  fatherStatus: "Alive" | "Deceased" | "Disabled" | "Unknown";
  motherStatus: "Alive" | "Deceased" | "Disabled" | "Unknown";
  guardian: string;
  totalChildren: number;
  city: string;
  children: Child[];
  createdAt: string;
  updatedAt: string;
};

type FamilyStats = {
  totalFamilies: number;
  totalChildren: number;
  totalCities: number;
};
