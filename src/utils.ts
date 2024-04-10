export const getAPIType = (type: string = 'search'): string => {
    switch (type) {
        case 'geoLocation':
            return 'http://api.openweathermap.org/geo/1.0/direct';
        case 'reverseGeoLocation':
            return 'http://api.openweathermap.org/geo/1.0/reverse';
        case 'onecall':
            return 'https://api.openweathermap.org/data/3.0/onecall';
        default:
            return 'https://api.openweathermap.org/data/2.5/';
    }
};
export const timeformat = (date: Date): string => {
    let h = date.getHours();
    let m: string | number = date.getMinutes();
    const x = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? '0'+m: m;
    const time = h + ':' + m + ' ' + x;
    return time;
};
export function kelvinToCelsius(kelvin: number): string {
    return (kelvin - 273.15).toFixed(2);
}