"use client";

import { createShortenedUrl } from "@/lib/api/shortenUrls";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ShortenedUrl } from "@/app/models/shortenedUrl";

import { toast } from "react-toastify";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SetStateAction, Dispatch } from "react";

const formSchema = z.object({
  longUrl: z.string().url(),
  shortId: z.string().min(3),
});

type Props = {
  apiKey: string;
  shortenedUrls: ShortenedUrl[];
  setShortenedUrls: Dispatch<SetStateAction<ShortenedUrl[]>>;
};

export default function ShortenUrlForm({
  apiKey,
  shortenedUrls,
  setShortenedUrls,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: "",
      shortId: "",
    },
  });

  const showToastMessage = (success: boolean, message: string) => {
    if (success) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    if (!apiKey) {
      showToastMessage(false, "Please enter your API key.");
      return;
    }

    try {
      let shortenedUrl = await createShortenedUrl(
        apiKey,
        values.longUrl,
        values.shortId,
      );
      console.log("shortenedUrl", shortenedUrl);
      showToastMessage(true, "Shortened URL created successfully.");
      setShortenedUrls([...shortenedUrls, shortenedUrl]);
    } catch (error: any) {
      showToastMessage(false, error.message);
    }
  };

  return (
    <main className="flex p-10 flex-col items-center w-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-lg w-full flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md"
        >
          <FormField
            control={form.control}
            name="longUrl"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Long URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your long URL"
                      type="string"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="shortId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Short ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your short ID"
                      type="string"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
