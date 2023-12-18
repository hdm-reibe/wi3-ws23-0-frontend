import axios from 'axios';

import { ShortenedUrl } from "@/app/models/shortenedUrl"

const handleAxiosError = (error: any) => {
  if (error.response.status == 400) {
    throw new Error("Bad request, please check your input.")
  } else if (error.response.status == 403) {
    throw new Error("Forbidden, please check your API key.")
  } else if (error.response.status == 500) {
    throw new Error("Internal server error, please try again later.")
  } else {
    throw new Error("Unkown error occured, please try again later.")
  }
}

export const getShortenedUrls = async (apiKey: string) => {
  let shortenedUrls: ShortenedUrl[] = []

  await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/shortened-urls', {
    method: 'GET',
    headers: {
      'x-api-key': apiKey
    }
  }).then((response) => {
    // transform response data into list of ShortenedUrl
    response.data.map((shortenedUrl: any) => {
      shortenedUrls.push({
        shortId: shortenedUrl.id,
        longUrl: shortenedUrl.url,
        createdAt: shortenedUrl.timestamp
      })
    })
  }
  ).catch((error) => {
    handleAxiosError(error);
  })

  return shortenedUrls
}

export const createShortenedUrl = async (apiKey: string, longUrl: string, shortId: string) => {
  let shortenedUrl: ShortenedUrl = {
    shortId: "",
    longUrl: "",
    createdAt: ""
  }

  await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/shortened-urls',
    {
      url: longUrl,
      shortId: shortId
    },
    {
      headers: {
        'x-api-key': apiKey
      }
    }).then((response) => {
      // transform response data into ShortenedUrl
      shortenedUrl.shortId = response.data.id;
      shortenedUrl.longUrl = response.data.url;
      shortenedUrl.createdAt = response.data.timestamp;
    }
    ).catch((error) => {
      handleAxiosError(error);
    })

  return shortenedUrl
}

export const deleteShortenedUrl = async (apiKey: string, shortId: string) => {
  await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/' + shortId, {
    method: 'DELETE',
    headers: {
      'x-api-key': apiKey
    },
  }).then((response) => {
    return response
  }
  ).catch((error) => {
    handleAxiosError(error);
  })
}