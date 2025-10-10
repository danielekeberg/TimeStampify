'use client';

import { useState, useEffect } from 'react';

type Counter = {
    date: number,
    counter: number
}

function Count() {
    const [counter, setCounter] = useState<Counter[]>([]);

    useEffect(() => {
        async function fetchCounter() {
            try {
            const res = await fetch('https://api.sheetbest.com/sheets/d9af5cd8-e4ed-40c1-98aa-2d97bebd15ef');
            const data = await res.json();
            setCounter(data)
        } catch(err) {
            console.error(err);
        }
        }
        fetchCounter();
    }, [])

    counter.sort((a, b) => b.counter - a.counter);
    
    return (
        <div>
            <div>
            {counter.map((count: Counter) => (
                <div key={count.counter} className="flex gap-4">
                    <p className="w-10 text-right">{count.counter}</p>
                    <p className="w-50 text-center">{new Date(count.date).toLocaleDateString('no-NO', {
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