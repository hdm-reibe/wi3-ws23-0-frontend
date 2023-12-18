'use client'
import { getShortenedUrls } from '@/lib/api/shortenUrls';

import { createShortenedUrl } from '@/lib/api/shortenUrls'
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

import { toast } from 'react-toastify';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SetStateAction, Dispatch } from 'react';
import { ShortenedUrl } from './models/shortenedUrl';


const formSchema = z
  .object({
    apiKey: z.string().min(10)
  })

type Props = {
  setApiKey: Dispatch<SetStateAction<string>>;
  setShortenedUrls: Dispatch<SetStateAction<ShortenedUrl[]>>;
};
export default function UpdateAPIKey({ setApiKey, setShortenedUrls }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: ""
    },
  });

  const showToastMessage = (success: boolean, message: string) => {
    if (success) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };


  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setApiKey(values.apiKey)

      setShortenedUrls(await getShortenedUrls(values.apiKey))

      showToastMessage(true, "API Key updated successfully.")
    } catch (error: any) {
      showToastMessage(false, error.message)
    }
  }


  return (
    <main className="flex gap-10 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your API Key"
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
            Save API Key
          </Button>
        </form>
      </Form>
    </main>

  )
}