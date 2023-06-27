import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = req.query;

    // Fetch the image data from the provided URL
    const imageResponse = await fetch(url as string);

    // Read the image data as a buffer
    const imageBuffer = await imageResponse.buffer();

    // Set the appropriate response headers
    res.setHeader('Content-Type', imageResponse.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Adjust cache-control headers as needed

    // Send the image buffer as the response
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).send('Internal Server Error');
  }
}
