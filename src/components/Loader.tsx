import { Loader2 } from 'lucide-react';
import React from 'react';

function Loader() {
    return (
        <div className="h-[80vh] flex items-center justify-center mx-auto max-w-screen-xl">
            <Loader2 className="text-blue-600 animate-spin" />
        </div>
    );
}

export default Loader;
