import { NextApiRequest, NextApiResponse } from 'next'
const { LASTFM_API_KEY } = process.env

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=nionide&api_key=b9214ac8b554733e66f584d24f0dcd89&format=json`
  )
  const data = await response.json()
  res.status(200).json(data)
}
