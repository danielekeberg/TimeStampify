'use client'

import { useEffect, useRef, useState } from 'react';
import Count from './Counter'

const URL = 'https://api.sheetbest.com/sheets/d9af5cd8-e4ed-40c1-98aa-2d97bebd15ef';

function Counter() {
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const ranOnceRef = useRef(false);

    useEffect(() => {
        if(ranOnceRef.current) return;
        ranOnceRef.current = true;

        const alreadyCounted = sessionStorage.getItem('visited-counted') === '1';

        async function postVisitOncePerSession() {
            try {
                const res = await fetch(URL, { cache: 'no-store'});
                const data = await res.json();

                let newCounter = 1;
                if(Array.isArray(data) && data.length > 0) {
                    const lastItem = data[data.length - 1];
                    const lastCount = parseInt(lastItem.counter || 0, 10);
                    newCounter = lastCount + 1;
                }

                if(!alreadyCounted) {
                    await fetch(URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            date: new Date().toISOString(),
                            source: 'website',
                            counter: newCounter
                        }),
                        cache: 'no-store',
                    })
                    sessionStorage.setItem('visited-counted', '1');
                }

                setCount(Array.isArray(data) ? data.length : 0)
            } catch(e: any) {
                console.error(e);
                setError('Could not update visit counter.');
            }
        }

        postVisitOncePerSession();
    }, [])

    return (
        <div className="text-white">
            <Count />
        </div>
    )
}

export default Counter;