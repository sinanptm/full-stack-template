"use client";

import { useEffect, useState } from "react";

const useHydrated = () => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return isHydrated;
};

export default useHydrated;