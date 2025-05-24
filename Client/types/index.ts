type Fundraiser = {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  totalAmount: number;
  amountRaised: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

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
