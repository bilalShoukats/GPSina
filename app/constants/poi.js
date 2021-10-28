import {
    faBuilding,
    faFlag,
    faHome,
    faIndustry,
    faMapMarkerAlt,
    faStreetView,
} from '@fortawesome/free-solid-svg-icons';
export const POICOLORS = [
    { color: '#000000', value: 1 }, //black
    { color: '#001CEE', value: 2 }, //blue
    { color: '#398022', value: 3 }, //green
    { color: '#EC3524', value: 4 }, //red
    { color: '#FFFE55', value: 5 }, //yellow
    { color: '#F6C2CC', value: 6 }, //pink
    { color: '#731978', value: 7 }, //purple
    { color: '#F0AE3C', value: 8 }, //orange
];
export const MARKER = [
    { icon: faBuilding, value: 1 },
    { icon: faHome, value: 2 },
    { icon: faMapMarkerAlt, value: 3 },
    { icon: faIndustry, value: 4 },
    { icon: faFlag, value: 5 },
    { icon: faStreetView, value: 6 },
];

export const TYPE = [
    { label: 'Private', value: 1 },
    { label: 'Business', value: 2 },
];
