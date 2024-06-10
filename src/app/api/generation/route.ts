import axios from 'axios'
import { errorUtils } from '@/lib/utils'
import { THTTPMethod } from '@/lib/types'

export const GET: THTTPMethod = async (_, res) => {
  try {
    const response = await axios.get(`${process.env.API_ROUTE}`, {
      timeout: 10000,
    })
    return new Response(JSON.stringify(response.data))
  } catch (error) {
    return errorUtils.getError(error)
  }
}

export const POST: THTTPMethod = async (req, res) => {
  try {
    const data = await req.json()

    const response = await axios.post(
      `${process.env.API_ROUTE}/generation`,
      data,
      {
        timeout: 50000,
      }
    )

    return new Response(JSON.stringify(response.data))
  } catch (error) {
    errorUtils.getError(error)
  }
}
