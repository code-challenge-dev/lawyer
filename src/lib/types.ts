import { NextRequest, NextResponse } from 'next/server'

export type THTTPMethod = (req: NextRequest, res: NextResponse) => Promise<any>
