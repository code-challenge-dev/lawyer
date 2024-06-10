import axios from 'axios'
import { THTTPMethod } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'

export const POST: THTTPMethod = async (req, res) => {
  try {
    const data = await req.json()

    const response = await axios.post(
      `${process.env.API_ROUTE}/correction`,
      data,
      {
        timeout: 50000,
      }
    )

    return new Response(JSON.stringify(response.data))
  } catch (error) {
    toast({
      variant: 'destructive',
      title: 'Jejda! Něco se pokazilo!',
      description: 'Při odesílání požadavku POST došlo k chybě.',
    })
  }
}
