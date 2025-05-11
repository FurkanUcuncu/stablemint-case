export const fetchExchangeRate = async (apiKey: string): Promise<number> => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/latest?access_key=${apiKey}`);

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.error?.info || 'Unknown error from Fixer API');
    }

    return data.rates['USD'];
};