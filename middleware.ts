import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    if (url.pathname === '/animals/rabbit') {
        url.pathname = '/animals/bunny'
        return NextResponse.redirect(url)
    }
    if (url.pathname === '/animals/ladybeetle' || url.pathname === '/animals/lady-beetle') {
        url.pathname = '/animals/ladybug'
        return NextResponse.redirect(url)
    }
}