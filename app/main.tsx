'use client'

import { useState } from 'react'

import { columns } from "@/app/tableColumns"
import { ShortenedUrl } from "@/app/models/shortenedUrl"

import UrlTable from '@/app/table';
import UpdateAPIKey from '@/app/updateApiKey';
import ShortenUrlForm from '@/app/shortenUrlForm';


export default function Main() {
  const [apiKey, setApiKey] = useState<string>("")
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([])

  return (
    <main className="flex flex-col items-center">
      <UpdateAPIKey setApiKey={setApiKey} setShortenedUrls={setShortenedUrls} />
      <ShortenUrlForm apiKey={apiKey} shortenedUrls={shortenedUrls} setShortenedUrls={setShortenedUrls} />
      <UrlTable columns={columns({ apiKey, setShortenedUrls })} data={shortenedUrls} />
    </main>
  )
}