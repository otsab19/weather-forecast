import {useEffect, useState} from "react";
import {TGeoLocation} from "./types.ts";


export const useGeoLocation: () => TGeoLocation = () => {
    const [location, setLocation] = useState<TGeoLocation>({longitude: null, latitude: null});

    const getGeoLocation = () => {
        if (navigator.geolocation) {
            // get the current users location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // save the geolocation coordinates in two variables
                    const {latitude, longitude} = position.coords;
                    // update the value of userlocation variable
                    setLocation({latitude, longitude});
                },
                // if there was an error getting the users location
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
    }

    useEffect(() => {
        getGeoLocation();
    }, []);

    return location;
}