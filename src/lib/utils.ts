export const sleep = (ms = 2000, dev = 1) => {
    const msWithDev = (Math.random() * dev + 1) * ms
    return new Promise((resolve) => setTimeout(resolve, msWithDev))
}

