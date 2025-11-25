'use client';

import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';

type Counter = {
    created_at: string,
    id: number
}

function Count() {
    const [counter, setCounter] = useState<Counter[]>([]);

    useEffect(() => {
        async function fetchCounter() {
            const { data, error } = await supabase
                .from("timestamp")
                .select("*")
            if(error) {
                console.error("Error fetching timestamps:", error);
                return;
            }
            setCounter(data)
        }
        fetchCounter();
    }, [])

    counter.sort((a, b) => b.id - a.id);
    
    return (
        <div>
            <div>
            {counter.map((count: Counter) => (
                <div key={count.id} className="flex gap-4">
                    <p className="w-10 text-right">{count.id}</p>
                    <p className="w-50 text-center">{new Date(count.created_at).toLocaleDateString('no-NO', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                    })}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Count;