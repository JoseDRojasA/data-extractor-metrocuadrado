export interface ServerPropsData {
  dataManager: string;
  props: Props;
  page: string;
  query: Query;
  buildId: string;
  assetPrefix: string;
  runtimeConfig: RuntimeConfig;
}

interface Props {
  isServer: boolean;
  initialState: InitialState;
  initialProps: InitialProps;
}

interface InitialProps {
  pageProps: PageProps;
}

interface PageProps {
  prefooter: ContactInfoClass;
  businessOptions: SOptions;
  typesOptions: SOptions;
  realEstate: RealEstate;
}

interface SOptions {
  type: string;
}

interface ContactInfoClass {}

interface RealEstate {
  propertyId: string;
  publicationId: null;
  propertyType: City;
  businessType: string;
  businessTypeId: string;
  publicationStatus: string;
  salePrice: number;
  rentPrice: number;
  rentTotalPrice: number;
  area: number;
  areac: number;
  areaPrivada: null;
  rooms: string;
  bathrooms: string;
  garages: string;
  city: City;
  zone: City;
  sector: Sector;
  neighborhood: string;
  commonNeighborhood: string;
  comment: string;
  detail: Detail;
  companyId: string;
  projectName: null;
  salesRoomAddress: null;
  salesRoomSchedule: any[];
  companyName: string;
  companyAddress: string;
  companyImage: string;
  companyLink: null;
  companySeoUrl: string;
  contactPhone: string;
  whatsapp: string;
  propertyState: string;
  coordinates: Coordinates;
  title: string;
  shortTitle: string;
  subtitle: string;
  link: string;
  imageLink: string;
  whatsappMessage: string;
  images: Image[];
  featured: Featured[];
  builtTime: string;
  stratum: string;
  isOcasional: boolean;
  isProject: boolean;
  isUsed: boolean;
  isSale: boolean;
  isLease: boolean;
  priceFrom: null;
  priceUp: null;
  fee: null;
  areacFrom: null;
  areacUp: null;
  areaFrom: null;
  areaUp: null;
  video: null;
  deliverDate: null;
  breadcrumb: Breadcrumb;
  backUrl: string;
  titleSeo: string;
  descriptionSeo: string;
  linkSeo: string;
  roomsFrom: null;
  roomsTo: null;
  bathroomsFrom: null;
  bathroomsTo: null;
  localPhone: string;
  mcontactosucursalCelular1: null;
  signwall: string;
  campaign: null;
  highlight: boolean;
}

interface Breadcrumb {
  h1: string;
  links: Link[];
}

interface Link {
  text: string;
  url: string;
}

interface City {
  id: string;
  nombre: string;
}

interface Coordinates {
  lon: number;
  lat: number;
}

export interface Detail {
  firstImage: string;
  adminPrice: number;
  urlDetail: string;
  micrositeId: null;
}

export interface Featured {
  title: string;
  items: string[];
}

export interface Image {
  id: string;
  image: string;
  imageMobile: string;
}

export interface Sector {
  nombre: string;
}

export interface InitialState {
  newsletter: Newsletter;
  selector: Selector;
  realestate: Realestate;
  contact: Contact;
  share: Share;
  typeproperties: Suggested;
  suggested: Suggested;
  prefooter: InitialStatePrefooter;
  favorites: InitialStateFavorites;
  report: Report;
  filtersTeallium: FiltersTeallium;
  creditSimulator: CreditSimulator;
}

export interface Contact {
  contactInfo: ContactInfoClass;
  error: ContactInfoClass;
  hasError: boolean;
  success: boolean;
}

export interface CreditSimulator {
  isMountCreditsimulator: boolean;
}

export interface InitialStateFavorites {
  favorites: FavoritesFavorites;
  wasCalled: boolean;
}

export interface FavoritesFavorites {
  projects: any[];
  used: any[];
}

export interface FiltersTeallium {
  filtersTeallium: ContactInfoClass;
}

export interface Newsletter {
  news: ContactInfoClass;
  tools: ContactInfoClass;
  subscription: Share;
}

export interface Share {
  hasError: boolean;
  success: boolean;
}

export interface InitialStatePrefooter {
  records: ContactInfoClass;
}

export interface Realestate {
  basic: RealEstate;
}

export interface Report {
  hasError: boolean;
  success: boolean;
  message: string;
}

export interface Selector {
  types: Business;
  business: Business;
  cities: any[];
}

export interface Business {
  options: Option[];
}

export interface Option {
  value: string;
  label: string;
}

export interface Suggested {
  properties: any[];
}

export interface Query {
  propertyId: string;
}

export interface RuntimeConfig {
  assetPrefix: string;
}
