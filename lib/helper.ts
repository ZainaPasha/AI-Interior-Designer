export interface NavLinkProps {
  label: string;
  link: string;
  protected?: boolean;
}

export const NavRoutes: NavLinkProps[] = [
  { label: "Home", link: "/" },
  { label: "Designs", link: "/designs" },
  { label: "Dashboard", link: "/dashboard", protected: true },
  { label: "Contact", link: "#footer" },
];

export const roomStyles = [
  { label: "Living Room", value: "living_room" },
  { label: "Bedroom", value: "bedroom" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Dining Room", value: "dining_room" },
  { label: "Bathroom", value: "bathroom" },
  { label: "Home Office", value: "home_office" },
  { label: "Hallway", value: "hallway" },
  { label: "Balcony", value: "balcony" },
  { label: "Basement", value: "basement" },
  { label: "Garage", value: "garage" },
  { label: "Laundry Room", value: "laundry_room" },
  { label: "Kids Room", value: "kids_room" },
  { label: "Guest Room", value: "guest_room" },
  { label: "Outdoor Patio", value: "outdoor_patio" },
];

export const aiStyles = [
  { label: "Modern", value: "modern" },
  { label: "Minimalist", value: "minimalist" },
  { label: "Scandinavian", value: "scandinavian" },
  { label: "Industrial", value: "industrial" },
  { label: "Traditional", value: "traditional" },
  { label: "Rustic", value: "rustic" },
  { label: "Bohemian", value: "bohemian" },
  { label: "Mid-Century Modern", value: "midcentury" },
  { label: "Coastal", value: "coastal" },
  { label: "Art Deco", value: "artdeco" },
  { label: "Contemporary", value: "contemporary" },
  { label: "Japanese Zen", value: "japanese_zen" },
  { label: "Farmhouse", value: "farmhouse" },
  { label: "Eclectic", value: "eclectic" },
];
