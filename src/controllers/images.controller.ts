import { Request, Response } from 'express'
const axios = require('axios')
const xml2js = require('xml2js')

export const getUserImages = async (req: Request, res: Response) => {
  const xmlData = await axios.get('https://api.flickr.com/services/feeds/photos_public.gne', {
    headers: {
      'Content-Type': 'application/xml'
    }
  })

  xml2js.parseString(xmlData.data, (err: any, result: any) => {
    if (err) {
      return res.status(500).json({ status: false, statusCode: 500, message: 'failed to fetch data' })
    }
    return res.status(200).json({ status: true, statusCode: 200, message: 'data fetched successfully', data: result })
  })
}

export const getImagesByTag = async (req: Request, res: Response) => {
  const xmlData = await axios.get('https://api.flickr.com/services/feeds/photos_public.gne', {
    headers: {
      'Content-Type': 'application/xml'
    },
    params: {
      tags: req.query.tag
    }
  })

  console.log(req)

  xml2js.parseString(xmlData.data, (err: any, result: any) => {
    if (err) {
      return res.status(500).json({ status: false, statusCode: 500, message: 'failed to fetch data' })
    }
    return res.status(200).json({ status: true, statusCode: 200, message: 'data fetched successfully', data: result })
  })
}
