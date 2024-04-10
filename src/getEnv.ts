type envType =
    | `VITE_WEATHER_API_KEY`
    | 'VITE_WEATHER_API_URL'


const defaultValues: Partial<Record<envType, string>> = {};
export const getEnv = (val: envType): string => {
    const key = val;
    return import.meta.env[key] ?? defaultValues[val];
};
