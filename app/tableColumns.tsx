"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Link } from "lucide-react"
import { ShortenedUrl } from "@/app/models/shortenedUrl"
import { getShortenedUrls, deleteShortenedUrl } from "@/lib/api/shortenUrls"
import { SetStateAction, Dispatch } from 'react';
import { toast } from 'react-toastify';

// create column definition with shortenendUrls and api key as props
// create a delete button that calls deleteShortenedUrl

type Props = {
    apiKey: string,
    setShortenedUrls: Dispatch<SetStateAction<ShortenedUrl[]>>;
};

export const columns = ({ apiKey, setShortenedUrls }: Props): ColumnDef<ShortenedUrl>[] => [
    {
        accessorKey: "shortId",
        header: "Short ID",
        cell: ({ row }) => {
            var shortUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/" + row.original.shortId
            return (
                <div className="flex flex-row items-center">
                    <Link size={12} className="mr-2" />
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </div>
            );
        },
    },
    {
        accessorKey: "longUrl",
        header: "Long URL",
        cell: ({ row }) => {
            return (
                <div className="flex flex-row items-center">
                    <Link size={12} className="mr-2" />
                    <a href={row.original.longUrl} target="_blank" rel="noopener noreferrer">
                        {row.original.longUrl}
                    </a>
                </div>

            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "delete",
        header: "Delete",
        cell: ({ row }) => {
            console.log(row.original.shortId);
            return (
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async () => {
                        await deleteShortenedUrl(apiKey, row.original.shortId)
                        setShortenedUrls(await getShortenedUrls(apiKey))

                        toast.success("Successfully deleted shortened URL with key " + row.original.shortId, {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    }}
                >
                    Delete
                </button>
            )
        },
    },
]
