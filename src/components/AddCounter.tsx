'use client'

import { useEffect, useRef, useState } from 'react';
import Count from './Counter'
import { supabase } from '@/lib/supabaseClient';

function Counter() {
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const ranOnceRef = useRef(false);

    useEffect(() => {
        if(ranOnceRef.current) return;
        ranOnceRef.current = true;

        const alreadyCounted = sessionStorage.getItem('visited-counted') === '1';
        async function addCounter() {
            if(!alreadyCounted) {
            const {data, error} = await supabase
                .from("timestamp")
                .insert({
                    new: "new"
                })
                sessionStorage.setItem('visited-counted', '1');
            }
        }
        addCounter();
    }, [])

    return (
        <div className="text-white">
            <Count />
        </div>
    )
}

export default Counter;