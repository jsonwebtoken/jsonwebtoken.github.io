'use client'

import { GoogleTagManager } from "@next/third-parties/google"
import { useEffect, useState } from "react";

const MAX_URL_LENGTH = 4000;

export function SafeGTM({ gtmId}: { gtmId: string}) {
    const [canLoad, setCanLoad] = useState(false)

    useEffect(() => {
        const urlLength = window.location.href.length
        const hasLargeToken = urlLength > MAX_URL_LENGTH
        console.log("url length", urlLength)
        if(hasLargeToken) {
            console.warn("GTM disabled: URL too long", urlLength)
        }
        setCanLoad(!hasLargeToken)
    }, [])

    return canLoad ? <GoogleTagManager gtmId={gtmId} /> : null
}