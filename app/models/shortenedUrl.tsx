// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ShortenedUrl = {
  shortId: string;
  longUrl: string;
  createdAt: string;
};
