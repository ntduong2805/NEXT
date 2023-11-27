
import ReservationProcess from "../components/reservations/ReservationProcess";
import CategoryHome from "../pages/home/CategoryHome";
import DefaultHome from "../pages/home/Home";
import PlacePage from "../pages/places";
import ProfileClient from "../pages/profiles/ProfileClient";
import ProfileSetting from "../pages/profiles/ProfileSetting";
import PropertiesPage from "../pages/properties";
import ReservationsPage from "../pages/reservations";
import TripsPage from "../pages/trips";


export const PUBLIC_ROUTES = [
    {
        name: 'Home',
        path: "/",
        Element: DefaultHome,
    },
    {
        name: "Category",
        path: "/category/:label",
        Element: CategoryHome,
    },
    {
        name: "place",
        path: "/places/:placeId",
        Element: PlacePage,
    },
]
export const PRIVATE_ROUTES = [
    {
        name: "Trips",
        path: "/trips",
        Element: TripsPage,
        requireAdmin: false,
    },
    {
        name: "reservation",
        path: "/reservations",
        Element: ReservationsPage,
        requireAdmin: false,
    },
    {
        name: "properties",
        path: "/properties",
        Element: PropertiesPage,
        requireAdmin: false,
    },
    {
        name: "profile",
        path: "/profile",
        Element: ProfileClient,
        requireAdmin: false,
    },
    {
        name: "Edit profile",
        path: "/profile/setting",
        Element: ProfileSetting,
        requireAdmin: false,
    },
    {
        name: "Show page",
        path: "/reservation-process",
        Element: ReservationProcess,
        requireAdmin: false,
    }
];