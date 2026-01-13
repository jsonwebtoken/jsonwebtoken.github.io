'use client'

import { GoogleTagManager } from "@next/third-parties/google"
import { useEffect, useState } from "react";

const MAX_HASH_LENGTH = 4000;

export function SafeGTM({ gtmId}: { gtmId: string}) {
    const [canLoad, setCanLoad] = useState(false)

    useEffect(() => {
        /* const hash = window.location.hash
        const hasLargeHash = hash.length > MAX_HASH_LENGTH
        let originalHash = ""
        if(hasLargeHash) {
            originalHash = hash
            window.location.hash = ""
            setTimeout(() => {
                window.location.hash = originalHash
            }, 500)
        } */
        setCanLoad(true)
    }, [])

    return canLoad ? <GoogleTagManager gtmId={gtmId} /> : null
}