import { NextRequest, NextResponse } from 'next/server'

export type THTTPMethod = (req: NextRequest, res: NextResponse) => Promise<any>

export interface IGenerateDocumentData {
  metrics: {
    seconds_take: number
  }
  response: string
}
