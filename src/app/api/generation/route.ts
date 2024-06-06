import axios from 'axios'
import { errorUtils } from '@/lib/utils'
import { THTTPMethod } from '@/lib/types'

export const GET: THTTPMethod = async (_, res) => {
  try {
    const response = await axios.get(`${process.env.API_ROUTE}`, {
      timeout: 10000,
    })
    return new Response(JSON.stringify(response.data), {
      status: response.status,
    })
  } catch (error) {
    errorUtils.getError(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
    })
  }
}

export const POST: THTTPMethod = async (req, res) => {
  try {
    const data = await req.json() //! Extract JSON body from the request
    console.log('data inside post req api/generate:', data)

    const response = await axios.post(
      `${process.env.API_ROUTE}/generation`,
      data,
      {
        timeout: 20000,
      }
    )

    return new Response(JSON.stringify(response.data), {
      status: response.status,
    })
  } catch (error) {
    return errorUtils.getError(error)
  }
}
