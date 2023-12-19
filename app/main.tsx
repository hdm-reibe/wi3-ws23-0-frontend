"use client";

import { useState } from "react";

import { columns } from "@/app/tableColumns";
import { ShortenedUrl } from "@/app/models/shortenedUrl";

import ShortenedUrlsTable from "@/app/shortenedUrlsTable";
import SetAPIKeyForm from "@/app/setAPIKeyForm";
import ShortenUrlForm from "@/app/shortenUrlForm";

export default function Main() {
  const [apiKey, setApiKey] = useState<string>("");
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);

  return (
    <main className="flex flex-col items-center">
      <SetAPIKeyForm
        setApiKey={setApiKey}
        setShortenedUrls={setShortenedUrls}
      />
      <ShortenUrlForm
        apiKey={apiKey}
        shortenedUrls={shortenedUrls}
        setShortenedUrls={setShortenedUrls}
      />
      <ShortenedUrlsTable
        columns={columns({ apiKey, setShortenedUrls })}
        data={shortenedUrls}
      />
    </main>
  );
}
