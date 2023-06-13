//"use strict";
var isoCountries = {
  AF: "Afghanistan",
  DZ: "Algeria",
  AL: "Albania",
  AS: "American Samoa",
  AI: "Anguilla",
  AG: "Antigua And Barbuda",
  AO: "Angola",
  AD: "Andorra",
  AQ: "Antarctica",
  AW: "Aruba",
  AM: "Armenia",
  AR: "Argentina",
  AT: "Austria",
  AU: "Australia",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BB: "Barbados",
  BD: "Bangladesh",
  BH: "Bahrain",
  BM: "Bermuda",
  BJ: "Benin",
  BE: "Belgium",
  BY: "Belarus",
  BZ: "Belize",
  BT: "Bhutan",
  BW: "Botswana",
  BA: "Bosnia And Herzegovina",
  BV: "Bouvet Island",
  BO: "Bolivia",
  IO: "British Indian Ocean Territory",
  BR: "Brazil",
  BN: "Brunei",
  BF: "Burkina Faso",
  BI: "Burundi",
  BG: "Bulgaria",
  CA: "Canada",
  KY: "Cayman Islands",
  CM: "Cameroon",
  CV: "Cape Verde",
  KH: "Cambodia",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CX: "Christmas Islands",
  HK: "China (Hong Kong S.A.R.)",
  MO: "China (Macau S.A.R.)",
  CN: "China",
  CI: "Cote D Ivoire",
  CG: "Congo",
  KM: "Comoros",
  CR: "Costa Rica",
  CO: "Colombia",
  CC: "Cocos Islands",
  CK: "Cook Islands",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  CD: "Democractic Republic Of Congo",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  TL: "East Timor",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FO: "Faroe Islands",
  FK: "Falkland Islands",
  FI: "Finland",
  FJ: "Fiji Islands",
  TF: "French Southern Territories",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  GA: "Gabon",
  DE: "Germany",
  GE: "Georgia",
  GH: "Ghana",
  GI: "Gibraltar",
  GD: "Grenada",
  GL: "Greenland",
  GR: "Greece",
  GU: "Guam",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GT: "Guatemala",
  GP: "Guadeloupe",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard And Mcdonald Islands",
  VA: "Holy See",
  HN: "Honduras",
  HU: "Hungary",
  IS: "Iceland",
  ID: "Indonesia",
  IN: "India",
  IE: "Ireland",
  IQ: "Iraq",
  IR: "Iran",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "Korea",
  KP: "Korea, North",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LV: "Latvia",
  LA: "Lao People's Democratic Republic",
  LS: "Lesotho",
  LB: "Lebanon",
  LY: "Libya",
  LR: "Liberia",
  LT: "Lithuania",
  LI: "Liechtenstein",
  LU: "Luxembourg",
  MR: "Mauritania",
  ML: "Mali",
  MU: "Mauritius",
  MG: "Madagascar",
  MW: "Malawi",
  YT: "Mayotte",
  MT: "Malta",
  MK: "Macedonia",
  MQ: "Martinique",
  MY: "Malaysia",
  MH: "Marshall Islands",
  MV: "Maldives",
  MX: "Mexico",
  FM: "Micronesia",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MD: "Moldova",
  MC: "Monaco",
  ME: "Montenegro",
  MN: "Mongolia",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  AN: "Netherlands Antilles",
  NZ: "New Zealand",
  NC: "New Caledonia",
  NP: "Nepal",
  NE: "Niger",
  NG: "Nigeria",
  NI: "Nicaragua",
  NU: "Niue",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  NF: "Norfolk Island",
  OM: "Oman",
  PA: "Panama",
  PY: "Paraguay",
  PG: "Papua New Guinea",
  PW: "Palau",
  PK: "Pakistan",
  PS: "Palestinian National Authority",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn Island",
  PT: "Portugal",
  PL: "Poland",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russia",
  RW: "Rwanda",
  LC: "Saint Lucia",
  VC: "Saint Vincent And The Grenadin",
  KN: "Saint Kitts And Nevis",
  ST: "Sao Tome And Principe",
  SH: "Saint Helena",
  SM: "San Marino",
  PM: "Saint Pierre And Miquelon",
  WS: "Samoa",
  SA: "Saudi Arabia",
  SN: "Senegal",
  SC: "Seychelles",
  RS: "Serbia",
  CS: "Serbia And Montenegro",
  SL: "Sierra Leone",
  SG: "Singapore",
  SI: "Slovenia",
  SK: "Slovakia",
  SS: "South Sudan",
  SO: "Somalia",
  ZA: "South Africa",
  SB: "Solomon Islands",
  GS: "South Georgia",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen Islands",
  SZ: "Swaziland",
  CH: "Switzerland",
  SE: "Sweden",
  SY: "Syria",
  TZ: "Tanzania",
  TW: "Taiwan",
  TJ: "Tajikistan",
  GM: "The Gambia",
  NL: "The Netherlands",
  TH: "Thailand",
  TG: "Togo",
  TO: "Tonga",
  TK: "Tokelau",
  TT: "Trinidad And Tobago",
  TC: "Turks And Caicos Islands",
  TN: "Tunisia",
  TV: "Tuvalu",
  TR: "Turkey",
  TM: "Turkmenistan",
  UG: "Uganda",
  UA: "Ukraine",
  UM: "United States Minor Outlying Islands",
  US: "United States Of America",
  GB: "United Kingdom",
  UK: "United Kingdom",
  AE: "United Arab Emirates",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VG: "Virgin Islands (British)",
  VI: "Virgin Islands (Us)",
  VN: "Vietnam",
  WF: "Wallis And Futuna Islands",
  EH: "Western Sahara",
  YE: "Yemen",
  YU: "Yugoslavia",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

var flagResList = [
  {
    value: "93",
    label: "Afghanistan  +93",
    data: { cname: "Afghanistan", iso: "AF", icon_order: "210" },
  },
  {
    value: "213",
    label: "Algeria  +213",
    data: { cname: "Algeria", iso: "DZ", icon_order: "48" },
  },
  {
    value: "355",
    label: "Albania  +355",
    data: { cname: "Albania", iso: "AL", icon_order: "94" },
  },
  {
    value: "1-684",
    label: "American Samoa  +1-684",
    data: { cname: "American Samoa", iso: "AS", icon_order: "142" },
  },
  {
    value: "1-264",
    label: "Anguilla  +1-264",
    data: { cname: "Anguilla", iso: "AI", icon_order: "180" },
  },
  {
    value: "1-268",
    label: "Antigua And Barbuda  +1-268",
    data: { cname: "Antigua And Barbuda", iso: "AG", icon_order: "79" },
  },
  {
    value: "244",
    label: "Angola  +244",
    data: { cname: "Angola", iso: "AO", icon_order: "177" },
  },
  {
    value: "376",
    label: "Andorra  +376",
    data: { cname: "Andorra", iso: "AD", icon_order: "54" },
  },
  {
    value: "672",
    label: "Antarctica  +672",
    data: { cname: "Antarctica", iso: "AQ", icon_order: "254" },
  },
  {
    value: "297",
    label: "Aruba  +297",
    data: { cname: "Aruba", iso: "AW", icon_order: "72" },
  },
  {
    value: "374",
    label: "Armenia  +374",
    data: { cname: "Armenia", iso: "AM", icon_order: "16" },
  },
  {
    value: "54",
    label: "Argentina  +54",
    data: { cname: "Argentina", iso: "AR", icon_order: "216" },
  },
  {
    value: "43",
    label: "Austria  +43",
    data: { cname: "Austria", iso: "AT", icon_order: "121" },
  },
  {
    value: "61",
    label: "Australia  +61",
    data: { cname: "Australia", iso: "AU", icon_order: "156" },
  },
  {
    value: "994",
    label: "Azerbaijan  +994",
    data: { cname: "Azerbaijan", iso: "AZ", icon_order: "113" },
  },
  {
    value: "1-242",
    label: "Bahamas  +1-242",
    data: { cname: "Bahamas", iso: "BS", icon_order: "33" },
  },
  {
    value: "1-246",
    label: "Barbados  +1-246",
    data: { cname: "Barbados", iso: "BB", icon_order: "143" },
  },
  {
    value: "880",
    label: "Bangladesh  +880",
    data: { cname: "Bangladesh", iso: "BD", icon_order: "161" },
  },
  {
    value: "973",
    label: "Bahrain  +973",
    data: { cname: "Bahrain", iso: "BH", icon_order: "136" },
  },
  {
    value: "1-441",
    label: "Bermuda  +1-441",
    data: { cname: "Bermuda", iso: "BM", icon_order: "174" },
  },
  {
    value: "229",
    label: "Benin  +229",
    data: { cname: "Benin", iso: "BJ", icon_order: "118" },
  },
  {
    value: "32",
    label: "Belgium  +32",
    data: { cname: "Belgium", iso: "BE", icon_order: "0" },
  },
  {
    value: "375",
    label: "Belarus  +375",
    data: { cname: "Belarus", iso: "BY", icon_order: "100" },
  },
  {
    value: "501",
    label: "Belize  +501",
    data: { cname: "Belize", iso: "BZ", icon_order: "44" },
  },
  {
    value: "975",
    label: "Bhutan  +975",
    data: { cname: "Bhutan", iso: "BT", icon_order: "168" },
  },
  {
    value: "267",
    label: "Botswana  +267",
    data: { cname: "Botswana", iso: "BW", icon_order: "246" },
  },
  {
    value: "387",
    label: "Bosnia And Herzegovina  +387",
    data: { cname: "Bosnia And Herzegovina", iso: "BA", icon_order: "144" },
  },
  {
    value: "47",
    label: "Bouvet Island  +47",
    data: { cname: "Bouvet Island", iso: "BV", icon_order: "76" },
  },
  {
    value: "591",
    label: "Bolivia  +591",
    data: { cname: "Bolivia", iso: "BO", icon_order: "150" },
  },
  {
    value: "246",
    label: "British Indian Ocean Territory  +246",
    data: {
      cname: "British Indian Ocean Territory",
      iso: "IO",
      icon_order: "5",
    },
  },
  {
    value: "55",
    label: "Brazil  +55",
    data: { cname: "Brazil", iso: "BR", icon_order: "70" },
  },
  {
    value: "673",
    label: "Brunei  +673",
    data: { cname: "Brunei", iso: "BN", icon_order: "153" },
  },
  {
    value: "226",
    label: "Burkina Faso  +226",
    data: { cname: "Burkina Faso", iso: "BF", icon_order: "66" },
  },
  {
    value: "257",
    label: "Burundi  +257",
    data: { cname: "Burundi", iso: "BI", icon_order: "172" },
  },
  {
    value: "359",
    label: "Bulgaria  +359",
    data: { cname: "Bulgaria", iso: "BG", icon_order: "235" },
  },
  {
    value: "1",
    label: "Canada  +1",
    data: { cname: "Canada", iso: "CA", icon_order: "125" },
  },
  {
    value: "1-345",
    label: "Cayman Islands  +1-345",
    data: { cname: "Cayman Islands", iso: "KY", icon_order: "28" },
  },
  {
    value: "237",
    label: "Cameroon  +237",
    data: { cname: "Cameroon", iso: "CM", icon_order: "187" },
  },
  {
    value: "238",
    label: "Cape Verde  +238",
    data: { cname: "Cape Verde", iso: "CV", icon_order: "241" },
  },
  {
    value: "855",
    label: "Cambodia  +855",
    data: { cname: "Cambodia", iso: "KH", icon_order: "22" },
  },
  {
    value: "236",
    label: "Central African Republic  +236",
    data: { cname: "Central African Republic", iso: "CF", icon_order: "167" },
  },
  {
    value: "235",
    label: "Chad  +235",
    data: { cname: "Chad", iso: "TD", icon_order: "74" },
  },
  {
    value: "56",
    label: "Chile  +56",
    data: { cname: "Chile", iso: "CL", icon_order: "122" },
  },
  {
    value: "61",
    label: "Christmas Islands  +61",
    data: { cname: "Christmas Islands", iso: "CX", icon_order: "255" },
  },
  {
    value: "852",
    label: "China (Hong Kong S.A.R.)  +852",
    data: { cname: "China (Hong Kong S.A.R.)", iso: "HK", icon_order: "245" },
  },
  {
    value: "853",
    label: "China (Macau S.A.R.)  +853",
    data: { cname: "China (Macau S.A.R.)", iso: "MO", icon_order: "236" },
  },
  {
    value: "86",
    label: "China  +86",
    data: { cname: "China", iso: "CN", icon_order: "75" },
  },
  {
    value: "225",
    label: "Cote D Ivoire  +225",
    data: { cname: "Cote D Ivoire", iso: "CI", icon_order: "151" },
  },
  {
    value: "242",
    label: "Congo  +242",
    data: { cname: "Congo", iso: "CG", icon_order: "163" },
  },
  {
    value: "269",
    label: "Comoros  +269",
    data: { cname: "Comoros", iso: "KM", icon_order: "130" },
  },
  {
    value: "506",
    label: "Costa Rica  +506",
    data: { cname: "Costa Rica", iso: "CR", icon_order: "190" },
  },
  {
    value: "57",
    label: "Colombia  +57",
    data: { cname: "Colombia", iso: "CO", icon_order: "30" },
  },
  {
    value: "891",
    label: "Cocos Islands  +891",
    data: { cname: "Cocos Islands", iso: "CC", icon_order: "256" },
  },
  {
    value: "682",
    label: "Cook Islands  +682",
    data: { cname: "Cook Islands", iso: "CK", icon_order: "206" },
  },
  {
    value: "385",
    label: "Croatia  +385",
    data: { cname: "Croatia", iso: "HR", icon_order: "82" },
  },
  {
    value: "53",
    label: "Cuba  +53",
    data: { cname: "Cuba", iso: "CU", icon_order: "68" },
  },
  {
    value: "357",
    label: "Cyprus  +357",
    data: { cname: "Cyprus", iso: "CY", icon_order: "51" },
  },
  {
    value: "420",
    label: "Czech Republic  +420",
    data: { cname: "Czech Republic", iso: "CZ", icon_order: "205" },
  },
  {
    value: "243",
    label: "Democractic Republic Of Congo  +243",
    data: {
      cname: "Democractic Republic Of Congo",
      iso: "CD",
      icon_order: "138",
    },
  },
  {
    value: "45",
    label: "Denmark  +45",
    data: { cname: "Denmark", iso: "DK", icon_order: "126" },
  },
  {
    value: "253",
    label: "Djibouti  +253",
    data: { cname: "Djibouti", iso: "DJ", icon_order: "191" },
  },
  {
    value: "1-767",
    label: "Dominica  +1-767",
    data: { cname: "Dominica", iso: "DM", icon_order: "221" },
  },
  {
    value: "1-809",
    label: "Dominican Republic  +1-809",
    data: { cname: "Dominican Republic", iso: "DO", icon_order: "139" },
  },
  {
    value: "670",
    label: "East Timor  +670",
    data: { cname: "East Timor", iso: "TL", icon_order: "253" },
  },
  {
    value: "593",
    label: "Ecuador  +593",
    data: { cname: "Ecuador", iso: "EC", icon_order: "108" },
  },
  {
    value: "20",
    label: "Egypt  +20",
    data: { cname: "Egypt", iso: "EG", icon_order: "200" },
  },
  {
    value: "503",
    label: "El Salvador  +503",
    data: { cname: "El Salvador", iso: "SV", icon_order: "149" },
  },
  {
    value: "240",
    label: "Equatorial Guinea  +240",
    data: { cname: "Equatorial Guinea", iso: "GQ", icon_order: "137" },
  },
  {
    value: "291",
    label: "Eritrea  +291",
    data: { cname: "Eritrea", iso: "ER", icon_order: "65" },
  },
  {
    value: "372",
    label: "Estonia  +372",
    data: { cname: "Estonia", iso: "EE", icon_order: "219" },
  },
  {
    value: "251",
    label: "Ethiopia  +251",
    data: { cname: "Ethiopia", iso: "ET", icon_order: "222" },
  },
  {
    value: "298",
    label: "Faroe Islands  +298",
    data: { cname: "Faroe Islands", iso: "FO", icon_order: "101" },
  },
  {
    value: "500",
    label: "Falkland Islands  +500",
    data: { cname: "Falkland Islands", iso: "FK", icon_order: "251" },
  },
  {
    value: "358",
    label: "Finland  +358",
    data: { cname: "Finland", iso: "FI", icon_order: "173" },
  },
  {
    value: "679",
    label: "Fiji Islands  +679",
    data: { cname: "Fiji Islands", iso: "FJ", icon_order: "169" },
  },
  {
    value: "262",
    label: "French Southern Territories  +262",
    data: {
      cname: "French Southern Territories",
      iso: "TF",
      icon_order: "257",
    },
  },
  {
    value: "33",
    label: "France  +33",
    data: { cname: "France", iso: "FR", icon_order: "92" },
  },
  {
    value: "594",
    label: "French Guiana  +594",
    data: { cname: "French Guiana", iso: "GF", icon_order: "261" },
  },
  {
    value: "689",
    label: "French Polynesia  +689",
    data: { cname: "French Polynesia", iso: "PF", icon_order: "155" },
  },
  {
    value: "241",
    label: "Gabon  +241",
    data: { cname: "Gabon", iso: "GA", icon_order: "80" },
  },
  {
    value: "49",
    label: "Germany  +49",
    data: { cname: "Germany", iso: "DE", icon_order: "228" },
  },
  {
    value: "995",
    label: "Georgia  +995",
    data: { cname: "Georgia", iso: "GE", icon_order: "78" },
  },
  {
    value: "233",
    label: "Ghana  +233",
    data: { cname: "Ghana", iso: "GH", icon_order: "192" },
  },
  {
    value: "350",
    label: "Gibraltar  +350",
    data: { cname: "Gibraltar", iso: "GI", icon_order: "25" },
  },
  {
    value: "1-473",
    label: "Grenada  +1-473",
    data: { cname: "Grenada", iso: "GD", icon_order: "218" },
  },
  {
    value: "299",
    label: "Greenland  +299",
    data: { cname: "Greenland", iso: "GL", icon_order: "160" },
  },
  {
    value: "30",
    label: "Greece  +30",
    data: { cname: "Greece", iso: "GR", icon_order: "15" },
  },
  {
    value: "1-671",
    label: "Guam  +1-671",
    data: { cname: "Guam", iso: "GU", icon_order: "215" },
  },
  {
    value: "224",
    label: "Guinea  +224",
    data: { cname: "Guinea", iso: "GN", icon_order: "234" },
  },
  {
    value: "245",
    label: "Guinea-Bissau  +245",
    data: { cname: "Guinea-Bissau", iso: "GW", icon_order: "175" },
  },
  {
    value: "502",
    label: "Guatemala  +502",
    data: { cname: "Guatemala", iso: "GT", icon_order: "85" },
  },
  {
    value: "590",
    label: "Guadeloupe  +590",
    data: { cname: "Guadeloupe", iso: "GP", icon_order: "37" },
  },
  {
    value: "592",
    label: "Guyana  +592",
    data: { cname: "Guyana", iso: "GY", icon_order: "73" },
  },
  {
    value: "509",
    label: "Haiti  +509",
    data: { cname: "Haiti", iso: "HT", icon_order: "29" },
  },
  {
    value: "672",
    label: "Heard And Mcdonald Islands  +672",
    data: { cname: "Heard And Mcdonald Islands", iso: "HM", icon_order: "156" },
  },
  {
    value: "379",
    label: "Holy See  +379",
    data: { cname: "Holy See", iso: "VA", icon_order: "211" },
  },
  {
    value: "504",
    label: "Honduras  +504",
    data: { cname: "Honduras", iso: "HN", icon_order: "196" },
  },
  {
    value: "36",
    label: "Hungary  +36",
    data: { cname: "Hungary", iso: "HU", icon_order: "62" },
  },
  {
    value: "354",
    label: "Iceland  +354",
    data: { cname: "Iceland", iso: "IS", icon_order: "181" },
  },
  {
    value: "62",
    label: "Indonesia  +62",
    data: { cname: "Indonesia", iso: "ID", icon_order: "178" },
  },
  {
    value: "91",
    label: "India  +91",
    data: { cname: "India", iso: "IN", icon_order: "154" },
  },
  {
    value: "353",
    label: "Ireland  +353",
    data: { cname: "Ireland", iso: "IE", icon_order: "179" },
  },
  {
    value: "964",
    label: "Iraq  +964",
    data: { cname: "Iraq", iso: "IQ", icon_order: "59" },
  },
  {
    value: "98",
    label: "Iran  +98",
    data: { cname: "Iran", iso: "IR", icon_order: "183" },
  },
  {
    value: "972",
    label: "Israel  +972",
    data: { cname: "Israel", iso: "IL", icon_order: "31" },
  },
  {
    value: "39",
    label: "Italy  +39",
    data: { cname: "Italy", iso: "IT", icon_order: "13" },
  },
  {
    value: "1-876",
    label: "Jamaica  +1-876",
    data: { cname: "Jamaica", iso: "JM", icon_order: "157" },
  },
  {
    value: "81",
    label: "Japan  +81",
    data: { cname: "Japan", iso: "JP", icon_order: "39" },
  },
  {
    value: "962",
    label: "Jordan  +962",
    data: { cname: "Jordan", iso: "JO", icon_order: "133" },
  },
  {
    value: "7",
    label: "Kazakhstan  +7",
    data: { cname: "Kazakhstan", iso: "KZ", icon_order: "110" },
  },
  {
    value: "254",
    label: "Kenya  +254",
    data: { cname: "Kenya", iso: "KE", icon_order: "239" },
  },
  {
    value: "686",
    label: "Kiribati  +686",
    data: { cname: "Kiribati", iso: "KI", icon_order: "34" },
  },
  {
    value: "82",
    label: "Korea  +82",
    data: { cname: "Korea", iso: "KR", icon_order: "204" },
  },
  {
    value: "850",
    label: "Korea, North  +850",
    data: { cname: "Korea, North", iso: "KP", icon_order: "164" },
  },
  {
    value: "965",
    label: "Kuwait  +965",
    data: { cname: "Kuwait", iso: "KW", icon_order: "226" },
  },
  {
    value: "996",
    label: "Kyrgyzstan  +996",
    data: { cname: "Kyrgyzstan", iso: "KG", icon_order: "147" },
  },
  {
    value: "371",
    label: "Latvia  +371",
    data: { cname: "Latvia", iso: "LV", icon_order: "176" },
  },
  {
    value: "856",
    label: "Lao People's Democratic Republic  +856",
    data: {
      cname: "Lao People's Democratic Republic",
      iso: "LA",
      icon_order: "41",
    },
  },
  {
    value: "266",
    label: "Lesotho  +266",
    data: { cname: "Lesotho", iso: "LS", icon_order: "199" },
  },
  {
    value: "961",
    label: "Lebanon  +961",
    data: { cname: "Lebanon", iso: "LB", icon_order: "114" },
  },
  {
    value: "218",
    label: "Libya  +218",
    data: { cname: "Libya", iso: "LY", icon_order: "12" },
  },
  {
    value: "231",
    label: "Liberia  +231",
    data: { cname: "Liberia", iso: "LR", icon_order: "188" },
  },
  {
    value: "370",
    label: "Lithuania  +370",
    data: { cname: "Lithuania", iso: "LT", icon_order: "102" },
  },
  {
    value: "423",
    label: "Liechtenstein  +423",
    data: { cname: "Liechtenstein", iso: "LI", icon_order: "89" },
  },
  {
    value: "352",
    label: "Luxembourg  +352",
    data: { cname: "Luxembourg", iso: "LU", icon_order: "134" },
  },
  {
    value: "222",
    label: "Mauritania  +222",
    data: { cname: "Mauritania", iso: "MR", icon_order: "23" },
  },
  {
    value: "223",
    label: "Mali  +223",
    data: { cname: "Mali", iso: "ML", icon_order: "229" },
  },
  {
    value: "230",
    label: "Mauritius  +230",
    data: { cname: "Mauritius", iso: "MU", icon_order: "198" },
  },
  {
    value: "261",
    label: "Madagascar  +261",
    data: { cname: "Madagascar", iso: "MG", icon_order: "117" },
  },
  {
    value: "265",
    label: "Malawi  +265",
    data: { cname: "Malawi", iso: "MW", icon_order: "195" },
  },
  {
    value: "269",
    label: "Mayotte  +269",
    data: { cname: "Mayotte", iso: "YT", icon_order: "24" },
  },
  {
    value: "356",
    label: "Malta  +356",
    data: { cname: "Malta", iso: "MT", icon_order: "141" },
  },
  {
    value: "389",
    label: "Macedonia  +389",
    data: { cname: "Macedonia", iso: "MK", icon_order: "123" },
  },
  {
    value: "596",
    label: "Martinique  +596",
    data: { cname: "Martinique", iso: "MQ", icon_order: "18" },
  },
  {
    value: "60",
    label: "Malaysia  +60",
    data: { cname: "Malaysia", iso: "MY", icon_order: "170" },
  },
  {
    value: "692",
    label: "Marshall Islands  +692",
    data: { cname: "Marshall Islands", iso: "MH", icon_order: "104" },
  },
  {
    value: "960",
    label: "Maldives  +960",
    data: { cname: "Maldives", iso: "MV", icon_order: "56" },
  },
  {
    value: "52",
    label: "Mexico  +52",
    data: { cname: "Mexico", iso: "MX", icon_order: "184" },
  },
  {
    value: "691",
    label: "Micronesia  +691",
    data: { cname: "Micronesia", iso: "FM", icon_order: "158" },
  },
  {
    value: "1-664",
    label: "Montserrat  +1-664",
    data: { cname: "Montserrat", iso: "MS", icon_order: "53" },
  },
  {
    value: "212",
    label: "Morocco  +212",
    data: { cname: "Morocco", iso: "MA", icon_order: "212" },
  },
  {
    value: "258",
    label: "Mozambique  +258",
    data: { cname: "Mozambique", iso: "MZ", icon_order: "58" },
  },
  {
    value: "373",
    label: "Moldova  +373",
    data: { cname: "Moldova", iso: "MD", icon_order: "244" },
  },
  {
    value: "377",
    label: "Monaco  +377",
    data: { cname: "Monaco", iso: "MC", icon_order: "83" },
  },
  {
    value: "382",
    label: "Montenegro  +382",
    data: { cname: "Montenegro", iso: "ME", icon_order: "197" },
  },
  {
    value: "976",
    label: "Mongolia  +976",
    data: { cname: "Mongolia", iso: "MN", icon_order: "232" },
  },
  {
    value: "95",
    label: "Myanmar  +95",
    data: { cname: "Myanmar", iso: "MM", icon_order: "1" },
  },
  {
    value: "264",
    label: "Namibia  +264",
    data: { cname: "Namibia", iso: "NA", icon_order: "171" },
  },
  {
    value: "674",
    label: "Nauru  +674",
    data: { cname: "Nauru", iso: "NR", icon_order: "159" },
  },
  {
    value: "599",
    label: "Netherlands Antilles  +599",
    data: { cname: "Netherlands Antilles", iso: "AN", icon_order: "24" },
  },
  {
    value: "64",
    label: "New Zealand  +64",
    data: { cname: "New Zealand", iso: "NZ", icon_order: "140" },
  },
  {
    value: "687",
    label: "New Caledonia  +687",
    data: { cname: "New Caledonia", iso: "NC", icon_order: "116" },
  },
  {
    value: "977",
    label: "Nepal  +977",
    data: { cname: "Nepal", iso: "NP", icon_order: "10" },
  },
  {
    value: "227",
    label: "Niger  +227",
    data: { cname: "Niger", iso: "NE", icon_order: "50" },
  },
  {
    value: "234",
    label: "Nigeria  +234",
    data: { cname: "Nigeria", iso: "NG", icon_order: "225" },
  },
  {
    value: "505",
    label: "Nicaragua  +505",
    data: { cname: "Nicaragua", iso: "NI", icon_order: "14" },
  },
  {
    value: "683",
    label: "Niue  +683",
    data: { cname: "Niue", iso: "NU", icon_order: "189" },
  },
  {
    value: "1-670",
    label: "Northern Mariana Islands  +1-670",
    data: { cname: "Northern Mariana Islands", iso: "MP", icon_order: "64" },
  },
  {
    value: "47",
    label: "Norway  +47",
    data: { cname: "Norway", iso: "NO", icon_order: "76" },
  },
  {
    value: "672",
    label: "Norfolk Island  +672",
    data: { cname: "Norfolk Island", iso: "NF", icon_order: "19" },
  },
  {
    value: "968",
    label: "Oman  +968",
    data: { cname: "Oman", iso: "OM", icon_order: "223" },
  },
  {
    value: "507",
    label: "Panama  +507",
    data: { cname: "Panama", iso: "PA", icon_order: "77" },
  },
  {
    value: "595",
    label: "Paraguay  +595",
    data: { cname: "Paraguay", iso: "PY", icon_order: "213" },
  },
  {
    value: "675",
    label: "Papua New Guinea  +675",
    data: { cname: "Papua New Guinea", iso: "PG", icon_order: "135" },
  },
  {
    value: "680",
    label: "Palau  +680",
    data: { cname: "Palau", iso: "PW", icon_order: "21" },
  },
  {
    value: "92",
    label: "Pakistan  +92",
    data: { cname: "Pakistan", iso: "PK", icon_order: "185" },
  },
  {
    value: "970",
    label: "Palestinian National Authority  +970",
    data: {
      cname: "Palestinian National Authority",
      iso: "PS",
      icon_order: "109",
    },
  },
  {
    value: "51",
    label: "Peru  +51",
    data: { cname: "Peru", iso: "PE", icon_order: "86" },
  },
  {
    value: "63",
    label: "Philippines  +63",
    data: { cname: "Philippines", iso: "PH", icon_order: "165" },
  },
  {
    value: "872",
    label: "Pitcairn Island  +872",
    data: { cname: "Pitcairn Island", iso: "PN", icon_order: "258" },
  },
  {
    value: "351",
    label: "Portugal  +351",
    data: { cname: "Portugal", iso: "PT", icon_order: "47" },
  },
  {
    value: "48",
    label: "Poland  +48",
    data: { cname: "Poland", iso: "PL", icon_order: "107" },
  },
  {
    value: "1",
    label: "Puerto Rico  +1",
    data: { cname: "Puerto Rico", iso: "PR", icon_order: "43" },
  },
  {
    value: "974",
    label: "Qatar  +974",
    data: { cname: "Qatar", iso: "QA", icon_order: "42" },
  },
  {
    value: "262",
    label: "Reunion  +262",
    data: { cname: "Reunion", iso: "RE", icon_order: "24" },
  },
  {
    value: "40",
    label: "Romania  +40",
    data: { cname: "Romania", iso: "RO", icon_order: "61" },
  },
  {
    value: "7",
    label: "Russia  +7",
    data: { cname: "Russia", iso: "RU", icon_order: "60" },
  },
  {
    value: "250",
    label: "Rwanda  +250",
    data: { cname: "Rwanda", iso: "RW", icon_order: "243" },
  },
  {
    value: "1-758",
    label: "Saint Lucia  +1-758",
    data: { cname: "Saint Lucia", iso: "LC", icon_order: "127" },
  },
  {
    value: "1-784",
    label: "Saint Vincent And The Grenadin  +1-784",
    data: {
      cname: "Saint Vincent And The Grenadin",
      iso: "VC",
      icon_order: "238",
    },
  },
  {
    value: "1-869",
    label: "Saint Kitts And Nevis  +1-869",
    data: { cname: "Saint Kitts And Nevis", iso: "KN", icon_order: "9" },
  },
  {
    value: "239",
    label: "Sao Tome And Principe  +239",
    data: { cname: "Sao Tome And Principe", iso: "ST", icon_order: "217" },
  },
  {
    value: "290",
    label: "Saint Helena  +290",
    data: { cname: "Saint Helena", iso: "SH", icon_order: "45" },
  },
  {
    value: "378",
    label: "San Marino  +378",
    data: { cname: "San Marino", iso: "SM", icon_order: "193" },
  },
  {
    value: "508",
    label: "Saint Pierre And Miquelon  +508",
    data: { cname: "Saint Pierre And Miquelon", iso: "PM", icon_order: "98" },
  },
  {
    value: "685",
    label: "Samoa  +685",
    data: { cname: "Samoa", iso: "WS", icon_order: "209" },
  },
  {
    value: "966",
    label: "Saudi Arabia  +966",
    data: { cname: "Saudi Arabia", iso: "SA", icon_order: "3" },
  },
  {
    value: "221",
    label: "Senegal  +221",
    data: { cname: "Senegal", iso: "SN", icon_order: "194" },
  },
  {
    value: "248",
    label: "Seychelles  +248",
    data: { cname: "Seychelles", iso: "SC", icon_order: "95" },
  },
  {
    value: "381",
    label: "Serbia  +381",
    data: { cname: "Serbia", iso: "RS", icon_order: "224" },
  },
  {
    value: "381",
    label: "Serbia And Montenegro  +381",
    data: { cname: "Serbia And Montenegro", iso: "CS", icon_order: "224" },
  },
  {
    value: "232",
    label: "Sierra Leone  +232",
    data: { cname: "Sierra Leone", iso: "SL", icon_order: "67" },
  },
  {
    value: "65",
    label: "Singapore  +65",
    data: { cname: "Singapore", iso: "SG", icon_order: "2" },
  },
  {
    value: "386",
    label: "Slovenia  +386",
    data: { cname: "Slovenia", iso: "SI", icon_order: "111" },
  },
  {
    value: "421",
    label: "Slovakia  +421",
    data: { cname: "Slovakia", iso: "SK", icon_order: "201" },
  },
  {
    value: "211",
    label: "South Sudan  +211",
    data: { cname: "South Sudan", iso: "SS", icon_order: "249" },
  },
  {
    value: "252",
    label: "Somalia  +252",
    data: { cname: "Somalia", iso: "SO", icon_order: "124" },
  },
  {
    value: "27",
    label: "South Africa  +27",
    data: { cname: "South Africa", iso: "ZA", icon_order: "214" },
  },
  {
    value: "677",
    label: "Solomon Islands  +677",
    data: { cname: "Solomon Islands", iso: "SB", icon_order: "97" },
  },
  {
    value: "995",
    label: "South Georgia  +995",
    data: { cname: "South Georgia", iso: "GS", icon_order: "78" },
  },
  {
    value: "34",
    label: "Spain  +34",
    data: { cname: "Spain", iso: "ES", icon_order: "105" },
  },
  {
    value: "94",
    label: "Sri Lanka  +94",
    data: { cname: "Sri Lanka", iso: "LK", icon_order: "240" },
  },
  {
    value: "249",
    label: "Sudan  +249",
    data: { cname: "Sudan", iso: "SD", icon_order: "32" },
  },
  {
    value: "597",
    label: "Suriname  +597",
    data: { cname: "Suriname", iso: "SR", icon_order: "242" },
  },
  {
    value: "47",
    label: "Svalbard And Jan Mayen Islands  +47",
    data: {
      cname: "Svalbard And Jan Mayen Islands",
      iso: "SJ",
      icon_order: "76",
    },
  },
  {
    value: "268",
    label: "Swaziland  +268",
    data: { cname: "Swaziland", iso: "SZ", icon_order: "207" },
  },
  {
    value: "41",
    label: "Switzerland  +41",
    data: { cname: "Switzerland", iso: "CH", icon_order: "120" },
  },
  {
    value: "46",
    label: "Sweden  +46",
    data: { cname: "Sweden", iso: "SE", icon_order: "35" },
  },
  {
    value: "963",
    label: "Syria  +963",
    data: { cname: "Syria", iso: "SY", icon_order: "166" },
  },
  {
    value: "255",
    label: "Tanzania  +255",
    data: { cname: "Tanzania", iso: "TZ", icon_order: "208" },
  },
  {
    value: "886",
    label: "Taiwan  +886",
    data: { cname: "Taiwan", iso: "TW", icon_order: "46" },
  },
  {
    value: "992",
    label: "Tajikistan  +992",
    data: { cname: "Tajikistan", iso: "TJ", icon_order: "17" },
  },
  {
    value: "220",
    label: "The Gambia  +220",
    data: { cname: "The Gambia", iso: "GM", icon_order: "57" },
  },
  {
    value: "31",
    label: "The Netherlands  +31",
    data: { cname: "The Netherlands", iso: "NL", icon_order: "131" },
  },
  {
    value: "66",
    label: "Thailand  +66",
    data: { cname: "Thailand", iso: "TH", icon_order: "87" },
  },
  {
    value: "228",
    label: "Togo  +228",
    data: { cname: "Togo", iso: "TG", icon_order: "55" },
  },
  {
    value: "676",
    label: "Tonga  +676",
    data: { cname: "Tonga", iso: "TO", icon_order: "99" },
  },
  {
    value: "690",
    label: "Tokelau  +690",
    data: { cname: "Tokelau", iso: "TK", icon_order: "250" },
  },
  {
    value: "1-868",
    label: "Trinidad And Tobago  +1-868",
    data: { cname: "Trinidad And Tobago", iso: "TT", icon_order: "40" },
  },
  {
    value: "1-649",
    label: "Turks And Caicos Islands  +1-649",
    data: { cname: "Turks And Caicos Islands", iso: "TC", icon_order: "119" },
  },
  {
    value: "216",
    label: "Tunisia  +216",
    data: { cname: "Tunisia", iso: "TN", icon_order: "49" },
  },
  {
    value: "688",
    label: "Tuvalu  +688",
    data: { cname: "Tuvalu", iso: "TV", icon_order: "26" },
  },
  {
    value: "90",
    label: "Turkey  +90",
    data: { cname: "Turkey", iso: "TR", icon_order: "146" },
  },
  {
    value: "993",
    label: "Turkmenistan  +993",
    data: { cname: "Turkmenistan", iso: "TM", icon_order: "231" },
  },
  {
    value: "256",
    label: "Uganda  +256",
    data: { cname: "Uganda", iso: "UG", icon_order: "106" },
  },
  {
    value: "380",
    label: "Ukraine  +380",
    data: { cname: "Ukraine", iso: "UA", icon_order: "182" },
  },
  {
    value: "246",
    label: "United States Minor Outlying Islands  +246",
    data: {
      cname: "United States Minor Outlying Islands",
      iso: "UM",
      icon_order: "4",
    },
  },
  {
    value: "1",
    label: "United States Of America  +1",
    data: { cname: "United States Of America", iso: "US", icon_order: "4" },
  },
  {
    value: "44",
    label: "United Kingdom  +44",
    data: { cname: "United Kingdom", iso: "GB", icon_order: "5" },
  },
  {
    value: "971",
    label: "United Arab Emirates  +971",
    data: { cname: "United Arab Emirates", iso: "AE", icon_order: "202" },
  },
  {
    value: "598",
    label: "Uruguay  +598",
    data: { cname: "Uruguay", iso: "UY", icon_order: "237" },
  },
  {
    value: "998",
    label: "Uzbekistan  +998",
    data: { cname: "Uzbekistan", iso: "UZ", icon_order: "91" },
  },
  {
    value: "678",
    label: "Vanuatu  +678",
    data: { cname: "Vanuatu", iso: "VU", icon_order: "115" },
  },
  {
    value: "58",
    label: "Venezuela  +58",
    data: { cname: "Venezuela", iso: "VE", icon_order: "96" },
  },
  {
    value: "1-284",
    label: "Virgin Islands (British)  +1-284",
    data: { cname: "Virgin Islands (British)", iso: "VG", icon_order: "128" },
  },
  {
    value: "1-340",
    label: "Virgin Islands (Us)  +1-340",
    data: { cname: "Virgin Islands (Us)", iso: "VI", icon_order: "162" },
  },
  {
    value: "84",
    label: "Vietnam  +84",
    data: { cname: "Vietnam", iso: "VN", icon_order: "88" },
  },
  {
    value: "681",
    label: "Wallis And Futuna Islands  +681",
    data: { cname: "Wallis And Futuna Islands", iso: "WF", icon_order: "92" },
  },
  {
    value: "212",
    label: "Western Sahara  +212",
    data: { cname: "Western Sahara", iso: "EH", icon_order: "109" },
  },
  {
    value: "967",
    label: "Yemen  +967",
    data: { cname: "Yemen", iso: "YE", icon_order: "152" },
  },
  {
    value: "38",
    label: "Yugoslavia  +38",
    data: { cname: "Yugoslavia", iso: "YU", icon_order: "260" },
  },
  {
    value: "260",
    label: "Zambia  +260",
    data: { cname: "Zambia", iso: "ZM", icon_order: "145" },
  },
  {
    value: "263",
    label: "Zimbabwe  +263",
    data: { cname: "Zimbabwe", iso: "ZW", icon_order: "186" },
  },
];


$.getScript("https://apis.google.com/js/platform.js");

var otpcounter = 0;
var quantityshown = 0;
var displayedisq = 0;
var windowctrlscroll = 0;
var blankscreenisq = 0;
var currentscreen_no = 0;

var savenrflag = 0;
//   get more images form changes
var RD_prefilled = "";

var ReqObj = {
  Form: {},
  ipLoc: {
    isFailed: false,
    pinged: false,
    response: false,
    zoneISO: "",
    callIpFlagSugg: false,
    onClose: false,
  },
  classCode: {
    RequirementDtl: "r",
    UserLogin: "u",
    ContactDetail: "c",
    ProductName: "p",
    Isq: "i",
    MoreDetails: "m",
    ThankYou: "t",
  },
  OTPratelimitstatus: "",
  OTPratelimitmessage: "",
  IPDetails: [],
  Original: {},
  Temp_Id: "",
  TempEmail: "",
  TempMobile: "",
  TempName: "",
  OverlayHtml: "",
  UserDetail: {
    fn: "",
    em: "",
    ctid: "",
    mb1: "",
    uv: "",
    ctoth: "",
    cityname: "",
    ipctid: "",
    ipcityname: "",
    statename: "",
    stateid: "",
    gst: "",
    suggesCity: {},
  },
  UserHtml: {},
  changeUserIso: "",
  changeUserCountry: "",
  isoFlag: "",
  isTNCShownOnFirstStep: false,
  isTNCShownQuestion: false,
  updateImage: 0,
  userType: "",
  loginMode: 0,
  chatBlSequence: "",
  IsqCalled: {},
  selectFromCountrySugg: false,
  submitFromCountrySugg: false,
  changeFlag: false,
  ImageKey: {},
  isMouseDownFired: false, //login
  gst: { toask: false },
  url: { toask: false },
  ChatBl: {
    item: "",
  },
  IsqQuestion: {
    start: 0,
    end: 0,
  },
  ImageVideoIsqSeq: false,
  quantityunit: {
    isfirstcharacter: false,
  },
  mcatdtl: { ping: false, response: false },
  mcatdtlcbObj: {},
  isqservice: {},
  isqFuncCalledArr: [],
  isAddSlot: 0,
  miniDetailHit: { ping: false, reply: { success: false, failure: false } },
  finEnq: "",
};

var TreeConfig = {
  ProductName: [],
  UserLogin: [],
  Generation: [
    "UserLogin",
    "ProductName",
    "UserVerification",
    "ProdNameQuestionObject",
  ],
  Isq: ["Generation"],
  PostBlEnqUpdate: ["Generation"],
  ContactDetail: ["UserLogin"],
  UserVerification: ["UserLogin"],
  RequirementDtl: ["Generation"],
  BlStaticQues: ["Generation"],
};

var PnameDependent = ["Isq", "RequirementDtl"];
var BtnType = {
  ProductName: {
    order: 2,
    text: "Submit",
    class: "form-btn",
    parent: "befstgo2",
  },
  UserLogin: {
    order: 1,
    text: "Go",
    class: "befstbtn",
    parent: "befstgo",
  },
  Isq: {
    order: 4,
    text: "Next",
    class: "form-btn",
    parent: "befstgo2",
  },
  ContactDetail: {
    order: 3,
    text: "Submit",
    class: "form-btn",
    parent: "befstgo2",
  },
  UserVerification: {
    order: 5,
    text: "Confirm Requirement",
    class: "blotpbtn",
    parent: "befstgo3",
  },
  RequirementDtl: {
    order: 4,
    text: "Next",
    class: "form-btn",
    parent: "befstgo2",
  },
  ThankYou: {
    order: 10,
    text: "Next",
    class: "form-btn",
    parent: "befstgo2",
  },
};

var Templateconfig = {
  "01": {
    istitleEditable: true,
    isTitleSuggSet: false,
    isFlagSuggSet: false,
    isOtpShown: false,
    isNECShown: false,
    isDescDivShown: false,
    isEnrichShown: {
      isStaticShown: false,
      isAttachmentShown: false,
    },
    WasProdNamePresent: false,
    autofocusPName: false,
    isCountryFlagSuggSet: false,
    IsFirstStep: false,
    isIsqServiceFuncCalled: false,
    isEnrichCalled: false,
  },

  "02": {
    istitleEditable: true,
    isTitleSuggSet: false,
    isFlagSuggSet: false,
    isOtpShown: false,
    isNECShown: false,
    isDescDivShown: false,
    isEnrichShown: {
      isStaticShown: false,
      isAttachmentShown: false,
    },
    WasProdNamePresent: false,
    autofocusPName: false,
    isCountryFlagSuggSet: false,
    IsFirstStep: false,
    isIsqServiceFuncCalled: false,
  },
  "03": {
    istitleEditable: true,
    isTitleSuggSet: false,
    isFlagSuggSet: false,
    isOtpShown: false,
    isNECShown: false,
    isDescDivShown: false,
    isEnrichShown: {
      isStaticShown: false,
      isAttachmentShown: false,
    },
    WasProdNamePresent: false,
    autofocusPName: false,
    isCountryFlagSuggSet: false,
    IsFirstStep: false,
    isIsqServiceFuncCalled: false,
  },
  "04": {
    istitleEditable: false,
    isTitleSuggSet: false,
    isFlagSuggSet: false,
    isOtpShown: false,
    isNECShown: false,
    isDescDivShown: false,
    isEnrichShown: {
      isStaticShown: false,
      isAttachmentShown: false,
    },
    WasProdNamePresent: false,
    autofocusPName: false,
    isCountryFlagSuggSet: false,
    IsFirstStep: false,
    isIsqServiceFuncCalled: false,
    isEnrichCalled: false,
    isThankYouCalled: false,
    isFinishEnquiryHit: false,
  },
  // "05": {
  //   "istitleEditable": false,
  //   "isTitleSuggSet": false,
  //   "isFlagSuggSet": false,
  //   "isOtpShown": false,
  //   "isNECShown": false,
  //   "isDescDivShown": false,
  //   "isEnrichShown": {
  //     "isStaticShown": false,
  //     "isAttachmentShown": false
  //   },
  //   "WasProdNamePresent": false,
  //   "autofocusPName": false,
  //   "isCountryFlagSuggSet": false,
  //   "IsFirstStep": false,
  //   "isIsqServiceFuncCalled": false,
  // },
  "06": {
    istitleEditable: true,
    isTitleSuggSet: false,
    isFlagSuggSet: false,
    isOtpShown: false,
    isNECShown: false,
    isDescDivShown: false,
    isEnrichShown: {
      isStaticShown: false,
      isAttachmentShown: false,
    },
    WasProdNamePresent: false,
    autofocusPName: false,
    isCountryFlagSuggSet: false,
    IsFirstStep: false,
    isIsqServiceFuncCalled: false,
    isSkipOTPClicked: false,
    toCallUpdateSeq: true,
    RemoveService: false,
    prodSecNochange: false,
  },
  "08": {
    istitleEditable: true,
    isTitleSuggSet: false,
    isFlagSuggSet: false,
    isOtpShown: false,
    isNECShown: false,
    isDescDivShown: false,
    isEnrichShown: {
      isStaticShown: false,
      isAttachmentShown: false,
    },
    WasProdNamePresent: false,
    autofocusPName: false,
    isCountryFlagSuggSet: false,
    IsFirstStep: false,
    isotpSkipped: false,
    isSkipOTPClicked: false,
    showotpstep: 0,
    isIsqServiceFuncCalled: false,
  },
  "09": {
    istitleEditable: true,
    isTitleSuggSet: false,
    isFlagSuggSet: false,
    isOtpShown: false,
    isNECShown: false,
    isDescDivShown: false,
    isEnrichShown: {
      isStaticShown: false,
      isAttachmentShown: false,
    },
    WasProdNamePresent: false,
    autofocusPName: false,
    isCountryFlagSuggSet: false,
    IsFirstStep: false,
    isIsqServiceFuncCalled: false,
    isReqHtmlPresent: false,
    isEnrichCalled: false,
    isThankYouCalled: false,
    isFinishEnquiryHit: false,
  },
};

var BlPopup = ["09"];
var EnqPopup = ["09"];
var showElemonForm = ["chatbl", "chatbl-inline"];
var template_array = [];
var global_euroArr = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
  "UK",
];
var savedMcatIsq = {};
var savedCatIsq = {};
var HitMcatIsq = {};
var isBLFormOpen = false;
var IsqSeperator = "##";
var modIdf = "";
if (typeof glmodid !== "undefined" && isSet(glmodid)) modIdf = glmodid;

function DataSeparator(array) {
  return array.join(IsqSeperator);
}
var DefaultIsqAns = { "sample order": "yes" };
var QuestionEnding = "?";
var ChatBlStaticMsg = {
  quantity: "What is the order <strong>Quantity</strong>" + QuestionEnding,
  "quantity unit": "",
  "total order value(rs)":
    "What is the <strong>Total Order Value (Rs)</strong>" + QuestionEnding,
  "total order value":
    "What is the <strong>Total Order Value</strong>" + QuestionEnding,
  "why do you need this": "Why do you need this" + QuestionEnding,
  currency: "",
  "requirement details":
    "Please mention <strong>additional  details</strong>, if any, about your requirement",
  //"i am interested in": "I am interested in",
  "i am interested in": "Tell us what you are interested in",
  "set content": "Set content" + QuestionEnding,
  "is this a sample order ?": "Is this a sample order" + QuestionEnding,
  "any preferred brand": "Any Preferred Brand" + QuestionEnding,
  "is it customized": "Is It Customized" + QuestionEnding,
};

var NotFilled = "Not Answered";
var Skipped = "Not Sure";

var ReloadReqClass = ["UserLogin", "ContactDetail", "UserVerification"]; // "MoreDetails"

var SelectBoxStaticMsg = {
  "quantity unit": {
    default: "Select Unit",
    imgvidfrst: "Select Unit",
  },
  currency: {
    chatbl: "Currency",
    default: "Select a Currency",
  },
};

var section_class = {
  enquiry: {
    left: {
      1: {
        id: "_prodmedia",
        name: "prodmedia",
        cls: "be-pnmS ",
      },
      2: {
        id: "_proddetails",
        name: "proddetail",
        cls: "bepr lTxt ",
      }, // pname/cname/price/soldby/isqquestion
    },
    right: {
      1: {
        id: "_hdg",
        name: "heading",
        cls: "be-hdg",
      },
      2: {
        id: "_rightproddetails",
        name: "rightproddetails",
        cls: "",
      }, // pname/cname/price/soldby/isqquestion
      3: {
        id: "_questionouterwrapper",
        name: "questionouterwrapper",
        cls: "bemlsec",
      },
    },
  },
  bl: {
    left: {
      1: {
        id: "_prodmedia",
        name: "prodmedia",
        cls: "be-pnmS ",
      },
      2: {
        id: "_helpQuest",
        name: "helpQuest",
        cls: "be-help ",
      },
    },
    right: {
      1: {
        id: "_hdg",
        name: "heading",
        cls: "be-hdg",
      },
      2: {
        id: "_rightproddetails",
        name: "rightproddetails",
        cls: "",
      }, // pname/cname/price/soldby/isqquestion
      3: {
        id: "_questionouterwrapper",
        name: "questionouterwrapper",
        cls: "bemlsec",
      },
    },
  },
  image: {
    left: {
      1: {
        id: "_prodmedia",
        name: "prodmedia",
        cls: "",
      },
      2: {
        id: "_proddetails",
        name: "proddetail",
        cls: "",
      }, // pname/cname/price/soldby/isqquestion
    },
    right: {
      1: {
        id: "_hdg",
        name: "heading",
        cls: "be-hdg",
      },
      2: {
        id: "_rightproddetails",
        name: "rightproddetails",
        cls: "",
      }, // pname/cname/price/soldby/isqquestion
      3: {
        id: "_questionouterwrapper",
        name: "questionouterwrapper",
        cls: "",
      },
    },
  },
  video: {
    left: {
      1: {
        id: "_prodmedia",
        name: "prodmedia",
        cls: "",
      },
      2: {
        id: "_proddetails",
        name: "proddetail",
        cls: "",
      }, // pname/cname/price/soldby/isqquestion
    },
    right: {
      1: {
        id: "_hdg",
        name: "heading",
        cls: "be-hdg",
      },
      2: {
        id: "_rightproddetails",
        name: "rightproddetails",
        cls: "",
      }, // pname/cname/price/soldby/isqquestion
      3: {
        id: "_questionouterwrapper",
        name: "questionouterwrapper",
        cls: "",
      },
    },
  },
  popupchatbl: {
    left: {},
    right: {
      1: {
        id: "_blchatheader",
        name: "header",
        cls: "cbl_hed cbl_df cbl_p025 cbl_aic cbl_br8 cbl_bg1",
      },
      2: {
        id: "_hdg",
        name: "heading",
        cls: "be-hdg",
      },
      3: {
        id: "_questionouterwrapper",
        name: "questionouterwrapper",
        cls: "",
      },
    },
  },
  inlinechatbl: {
    left: {},
    right: {
      1: {
        id: "_cls",
        name: "cross",
        cls: "be-cls",
      },
      2: {
        id: "_hdg",
        name: "heading",
        cls: "be-hdg",
      },
    },
  },
};

var section_number = {
  enquiry: {
    left: 2,
    right: 3,
  },
  bl: {
    left: 2,
    right: 3,
  },
  image: {
    left: 2,
    right: 3,
  },
  video: {
    left: 2,
    right: 3,
  },
  popupchatbl: {
    left: 0,
    right: 3,
  },
  inlinechatbl: {
    left: 0,
    right: 2,
  },
};
// var webAddressLocation = location.hostname;
// var userNameList = (webAddressLocation.match(/^dev/) || webAddressLocation.match(/^stg/)) ?  ["9839932616","9490340610"] : ["9811829818" , "8765471607","9618837669"];
function getTimeZone() {
  if (ReqObj.ipLoc.zoneISO == "") {
    var zdate = new Date();
    var zgmt = -zdate.getTimezoneOffset() / 60;
    if (zgmt != 5.5) ReqObj.ipLoc.zoneISO = "OTHER";
    else ReqObj.ipLoc.zoneISO = "IN";
  }
  //ReqObj.ipLoc.zoneISO = 'OTHER'; // remove later
}
getTimeZone();

/**
 *
 * @description
 * @param {*} fName constructor name of the class
 * @returns object which is found in service sequence and inserted in hitarray
 * @usage takes object from the service sequence and inserts the same into hit array
 */
function PreAjax(fName, tmpId) {
  if (isSet(fName) && isSet(tmpId) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
    var CalledObj = RemoveObjFromService(fName, tmpId, ReqObj.Form[tmpId].ServiceSequence);
    if (checkblockedUser() && imeshExist() === "" && fName.toLowerCase() === "userlogin" && ReqObj.Form[tmpId].FormSequence.ServiceSequenceBlocked.length === 0 && isSSB(tmpId)) {
      ReqObj.Form[tmpId].FormSequence.ServiceSequenceBlocked.push(CalledObj);
      var cb = ReqObj.Form[tmpId].FormSequence.ServiceSequenceBlocked[0].cb;
      var len = cb.length - 1;
      var index = tofindindexfn(cb, "userverification", "fn");
      while (len >= 0) {
        if (isSet(cb[len].fn) && ConstructorName(cb[len].fn) !== "UserVerification") {
          var popCatch = cb.pop();
          ConstructorName(popCatch.fn) !== "Generation" ? cb[index].cb.push(popCatch) : "";
        }
        len -= 1;
      }
    }
    if (isSet(ReqObj.Form[tmpId].HitArray))
      ReqObj.Form[tmpId].HitArray.push(CalledObj);
    if (isSet(CalledObj) && CalledObj !== "") {
      return CalledObj;
    }
  }
}




/**
 *
 *
 * @param {*} fName constructor name of the class
 * @param {*} tmpId
 * @param {*} array array from which the fName object is to be spliced
 * @returns
 */

function SpliceObject(fName, array) {
  if (isSet(fName) && isSet(array)) {
    var DetachObject = "";
    for (var i = 0; i < array.length; i++) {
      if (isSet(array[i].fn) && fName.toLowerCase() === ConstructorName(array[i].fn).toLowerCase()) {
        DetachObject = array.splice(i, 1)[0];
        break;
      }
      // else {
      //   return DetachObject;
      // }
    }
    return DetachObject;
  }
}

/**
 *
 *
 * @param {*} fName object which to be removed from the service sequence
 * @param {*} tmpId
 * @returns removed object from the service sequence
 */
function RemoveObjFromService(fName, tmpId) {
  var ServiceArrayObj = "";
  if (isSet(tmpId)) {
    ServiceArrayObj = RemoveObjFromArray(
      fName,
      tmpId,
      ReqObj.Form[tmpId].ServiceSequence
    );
  }
  return ServiceArrayObj;
}

/**
 *
 *
 * @param {*} CalledObject object which to be removed from the hit sequence
 * @param {*} tmpId
 * @returns removed object from the hit sequence
 */
function RemoveObjFromHit(CalledObject, tmpId) {
  var HitArrayObj = "";
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId].HitArray)) {
    HitArrayObj = RemoveObjFromArray(ConstructorName(CalledObject.fn), tmpId, ReqObj.Form[tmpId].HitArray);
  }
  return HitArrayObj;
}

/**
 *
 * @description
 * @param {*} fName name of the object which is to be removed
 * @param {*} tmpId
 * @param {*} array array from which object is to be removed
 * @returns removed object from the array
 */
function RemoveObjFromArray(fName, tmpId, array) {
  if (isSet(fName) && isSet(tmpId) && isSet(array)) {
    var CalledObj = SpliceObject(fName, array);
    if (isSet(CalledObj)) {
      return CalledObj;
    }
  }
}


/**
 *
 * @description this method is used
 * @param {*} CalledObject:Object
 * @param {*} tmpId:string
 * @usage removes object from hit array and pushed it back to the service sequence.
 */
function Ajaxfailure(CalledObject, tmpId, hitfinserv) {
  if (isSet(CalledObject) && CalledObject !== "" && isSet(tmpId)) {
    if (isSet(ReqObj.Form[tmpId].ServiceSequence)) {
      RemoveObjFromHit(CalledObject, tmpId);
      ReqObj.Form[tmpId].ServiceSequence.push(CalledObject);
    }
  }
  // if (hitfinserv && !isSet(ReqObj.Form[tmpId].ServiceSequence) && ValidGenId(ReqObj.Form[tmpId].generationId)) {
  //   FinishEnquiryService(tmpId);
  //   ReqObj.Form[tmpId].hitFinishEnquiryService = false;
  // }
}

/**
 *
 * @description
 * @param {*} CalledObject
 * @param {*} tmpId
 */
function PostAjax(CalledObject, tmpId) {
  if (isSet(CalledObject) && CalledObject !== "") {
    // if (isSet(CalledObject.post) && CalledObject.post.length > 0)
    //   questionTransition(ReqObj.Form[tmpId].formType, tmpId);

    if (isSet(ReqObj.Form[tmpId].HitArray)) {
      var TempCalledObject = RemoveObjFromHit(CalledObject, tmpId);

      if (TempCalledObject !== "") CalledObject = TempCalledObject;
    }
    SubmitCallback(CalledObject.cb, tmpId);
    // ReqObj.Form[tmpId].LastPrePost = CalledObject.post;
    for (var i = 0; i < CalledObject.post.length; i++) {
      PrePostService(CalledObject.post[i], tmpId);
    }
    CalledObject.post = [];
    // if (ReqObj.Form[tmpId].hitFinishEnquiryService !== "undefined" && ReqObj.Form[tmpId].hitFinishEnquiryService && CalledObject.cb.length === 0 && ValidGenId(ReqObj.Form[tmpId].generationId)) {
    //   FinishEnquiryService(tmpId);
    //   ReqObj.Form[tmpId].hitFinishEnquiryService = false;
    // }
  }
}
function SubmitCallback(cb, tmpId) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId].ServiceSequence) && isSet(cb)) {
    for (var i = 0; i < cb.length; i++) {
      if (isSSB(tmpId) && $.inArray(ConstructorName(cb[i].fn), ReqObj.Form[tmpId].servicecalled) !== -1) { }
      else {
        ReqObj.Form[tmpId].ServiceSequence.push(cb[i]);
        if (isSet(cb[i].fn)) cb[i].fn.onSubmit(tmpId);
        if (isSSB(tmpId) && ReqObj.Form[tmpId].flags.RemoveService) {
          ReqObj.Form[tmpId].flags.RemoveService = false;
          ReqObj.Form[tmpId].ServiceSequence.pop();
        }
      }
    }
  }
}

function PrePostService(name, tmpId) {
  // RemoveButton(tmpId);
  if (isSet(name) && name !== "") {
    //added loader for bl chat
    if (IsChatbl(tmpId)) {
      newchatblScroll("t" + tmpId + "_chatScroll", tmpId);
    } else {
      addBlLoader(tmpId, "left");
    }
    name.call(ReqObj.Form[tmpId].FormSequence, tmpId);
  }
}

FormSeq.prototype.BlSsbNext = function (tmpId) {
  NextStepSSB(tmpId, this);
};

FormSeq.prototype.BLSingleStep = function (tmpId) {
  var that = this;
  if (typeof isSSBLoaded === "undefined") {
    setTimeout(function () {
      that.BLSingleStep(tmpId);
    }, 50);
  } else {
    InitialStepSSB(tmpId, that);
  }
};

function IsPrevStepAvailable(tmpId) {
  if (IsPrevBtnImplemented(tmpId)) {
    var that = ReqObj.Form[tmpId].FormSequence;
    if (
      isSet(ReqObj.Form[tmpId].IsthroughClosebtn) &&
      !ReqObj.Form[tmpId].IsthroughClosebtn
    ) {
      var CurrentArray = [];
      if (that.OnCloseCounter > -1) {
        if (that.OnCloseCounter > 0) {
          CurrentArray =
            ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter - 1];
        } else {
          CurrentArray = ReqObj.Form[tmpId].UiArray[that.StepCounter];
        }
      } else {
        if (that.StepCounter > 0) {
          CurrentArray = ReqObj.Form[tmpId].UiArray[that.StepCounter - 1];
        } else {
          CurrentArray = [];
        }
      }
      if (CurrentArray.length > 0)
        CurrentArray = manipulatePrevStepArray(
          CurrentArray,
          that.StepCounter - 1,
          tmpId
        );
      var showPrevArray = ["Isq", "RequirementDtl"];
      if (isSet(CurrentArray)) {
        for (var i = 0; i < CurrentArray.length; i++) {
          if (isSet(ConstructorName(CurrentArray[i].Obj))) {
            for (var j = 0; j < showPrevArray.length; j++) {
              if (
                ConstructorName(CurrentArray[i].Obj).toLowerCase() ===
                showPrevArray[j].toLowerCase()
              )
                return true;
            }
          }
        }
        return false;
      }
      return false;
    }
    return false;
  }
}

function manipulatePrevStepArray(CurrentArray, step, tmpId) {
  var rejectarr = ["isqsp", "contactdetail", "userlogin", "userverification"];
  var arr = [];
  var len = CurrentArray.length;
  if (
    isSet(ReqObj.Form[tmpId].calledClassName[step]) &&
    ReqObj.Form[tmpId].calledClassName[step] !== ""
  ) {
    for (var i = 0; i < len; i++) {
      if (
        $.inArray(
          ReqObj.Form[tmpId].calledClassName[step].toLowerCase(),
          rejectarr
        ) !== -1
      ) {
        continue;
      } else {
        arr.push(CurrentArray[i]);
      }
    }
    return arr;
  } else return [];
}

function ButtonNameUI(currentScreen, tmpId, data) {
  var typeofform = ReqObj.Form[tmpId].typeofform.toLowerCase();
  var currentScreen = currentScreen.toLowerCase();
  handleSubmitButton(
    getBtnObject(typeofform, tmpId, currentScreen),
    tmpId,
    data
  );
}

function getBtnObject(typeofform, tmpId, currentScreen) {
  var btnObj =
    ReqObj.Form[tmpId].FormSequence.StepCounter === 0
      ? stepOneButton(typeofform, tmpId, currentScreen)
      : stepNextButton(typeofform, tmpId, currentScreen);
  return btnObj;
}

function stepOneButton(typeofform, tmpId, currentScreen) {
  var btnObj = "";
  var btncls = isGDPRCountry() ? "befstbtn2 hovsub" : "befstgo2 hovsub";
  var imeshcookie = imeshExist();
  if (
    tmpId.substr(0, 2) === "04" &&
    typeofform === "bl" &&
    new RegExp("penqbt").test($("#t" + tmpId + "_submit").attr("class")) &&
    ReqObj.Form[tmpId].FormSequence._stepCounter < 1
  ) {
    btnObj = {
      buttonText: "Submit Requirement",
      buttonCls: "penqbt",
      parentCls: "betxtc",
    };
  } else if (tmpId.substring(0, 2) === "09") {
    if (isImageVidEnq(tmpId)) {
      if (isEcomProduct(tmpId)) {
        btnObj = {
          buttonText: "Buy Now",
          buttonCls: "befstgo2 hovsub befwt",
          parentCls: "",
        };
      } else if (
        ReqObj.Form[tmpId].FormSequence._stepCounter === 0 &&
        imeshcookie !== "" &&
        currentScreen === "enquirenow"
      ) {
        btnObj = {
          buttonText: "Enquire Now",
          buttonCls: "befstgo2 hovsub befwt",
          parentCls: pdpenqImage(tmpId) ? "txt-cnt" : (direnqImage(tmpId) ? "sixcen btmarg" : ""),
        };
      } else if (imeshcookie === "") {
        btnObj = {
          buttonText: "Contact Supplier",
          buttonCls: "befstgo2 hovsub befwt",
          parentCls: direnqImage(tmpId) ? "sixcen btmarg" : "eqimgvidmt",
        };
      } else {
        btnObj = {
          buttonText: "Submit",
          buttonCls: btncls + " hovsub befwt",
          parentCls: direnqImage(tmpId) ? "sixcen btmarg" : "",
        };
      }
    } else {
      btnObj = restScreensButton(typeofform, tmpId, currentScreen); // rest screens
    }
  } else if (typeofform === "popupchatbl") {
    btnObj = {
      buttonText: "",
      buttonCls: "cbl_sbmtbt cbl_pa cbl_cp",
      parentCls: "cbl_sbmt_btn cbl_pr cbl_zi3",
    };
  } else if (isSSB(tmpId)) {
    if (isnewSSB(tmpId)) {
      btnObj = {
        buttonText: "Get Quotes from Sellers",
        buttonCls: "nb-btmm",
        parentCls: "nb-dib nb-btmim",
      };
    } else
      btnObj = {
        buttonText: "Get Quotes from Sellers",
        buttonCls: "mb-btmm",
        parentCls: "mb-dib mb-btmim",
      };
  } else {
    var sticky = isSticky(tmpId) ? "FM_be_btmm" : "be_btmm";
    var buttonCls =
      (isGlIdEven(tmpId) &&
        tmpId.substr(0, 2) === "01" &&
        ReqObj.Form[tmpId].screenNumber === 0) ||
        isBlInline(tmpId)
        ? isBlInlineFr(tmpId)
          ? "fAdsb"
          : "inSbtn crP"
        : isSet(ReqObj.Form[tmpId].changeUICTA) &&
          ReqObj.Form[tmpId].changeUICTA !== ""
          ? sticky + " hovsub pdgbt"
          : sticky + " hovsub";
    btnObj = {
      buttonText: "Submit Requirement",
      buttonCls: buttonCls,
      parentCls:
        (isGlIdEven(tmpId) &&
          tmpId.substr(0, 2) === "01" &&
          ReqObj.Form[tmpId].screenNumber === 0) ||
          isBlInline(tmpId)
          ? isBlInlineFr(tmpId)
            ? imeshExist() !== ""
              ? ReqObj.UserDetail["fn"] == ""
                ? "ident"
                : "adwIdn ident"
              : ""
            : "idsf iJFnd"
          : "be-mdl",
    }; // inline first step
  }
  if (
    !isSSB(tmpId) &&
    currentISO() !== "IN" &&
    ("contactdetail" === currentScreen ||
      ("moredetails" === currentScreen && typeofform === "bl"))
  ) {
    btnObj = stepNextButton(typeofform, tmpId, currentScreen);
  }
  return btnObj;
}


function identAppend(flagIdent) {
  if (typeof appendUtmParamPhase1 == "function") {
    appendUtmParamPhase1(flagIdent);
  } else {
    setTimeout(function () {
      identAppend(flagIdent);
    }, 500);
  }
}

function handleSubmitButton(btnObj, tmpId, data) {
  if (!IsChatbl(tmpId)) {
    if (isBlInlineFr(tmpId) && imeshExist() === "" && isGDPRCountry()) {
      if (
        $("#t" + tmpId + "_submit")
          .parent()
          .hasClass("fpr10")
      ) {
        $("#t" + tmpId + "_submit")
          .prop("value", btnObj.buttonText)
          .addClass(btnObj.buttonCls)
          .parent()
          .addClass(btnObj.parentCls);
      } else {
        $("#t" + tmpId + "_submit")
          .parent()
          .addClass("w50 fpr10");
        $("#t" + tmpId + "_submit")
          .closest(".iJSpb")
          .removeClass("ngdpr");
      }
    } else if (isBlInlineFr(tmpId) && imeshExist() !== "" && isGDPRCountry()) {
      $("#t" + tmpId + "_submit")
        .prop("value", btnObj.buttonText)
        .removeClass()
        .addClass(btnObj.buttonCls)
        .parent()
        .removeClass()
        .addClass(btnObj.parentCls);

      if (
        !$("#t" + tmpId + "_submit")
          .closest(".iJSpb")
          .hasClass("ngdpr")
      ) {
        $("#t" + tmpId + "_submit")
          .closest(".iJSpb")
          .addClass("ngdpr");
      }
    } else if (isBlInlineFr(tmpId) && imeshExist() === "" && !isGDPRCountry()) {
      $("#t" + tmpId + "_submit")
        .prop("value", btnObj.buttonText)
        .removeClass()
        .addClass(btnObj.buttonCls)
        .parent()
        .removeClass()
        .addClass(btnObj.parentCls);

      if (
        !$("#t" + tmpId + "_submit")
          .closest(".iJSpb")
          .hasClass("ngdpr")
      ) {
        $("#t" + tmpId + "_submit")
          .closest(".iJSpb")
          .addClass("ngdpr");
      }
    } else {
      $("#t" + tmpId + "_submit")
        .prop("value", btnObj.buttonText)
        .removeClass()
        .addClass(btnObj.buttonCls)
        .parent()
        .removeClass()
        .addClass(btnObj.parentCls);

      if (EnqPopupDIR(tmpId) && $("#yajaca").css("display") == "block") {
        //next->submit
        $(
          "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input"
        ).addClass("toConv");
        $("input.toConv").attr("value", "Submit");
      }
    }


    if (
      isBlInlineFr(tmpId) &&
      (btnObj.parentCls === "ident" || btnObj.parentCls === "adwIdn ident")
    ) {
      var mcatView = 0;
      if (
        typeof ims !== "undefined" &&
        isSet(ims) &&
        isSet(ims.mcatid) &&
        ims.mcatid !== ""
      ) {
        mcatView =
          ims.mcatid == "145350" ||
            ims.mcatid == "145513" ||
            ims.mcatid == "113951" ||
            ims.mcatid == "15607"
            ? 1
            : 0;
      }

      if (mcatView === 1) {
        var defaultView = "list";
        if (
          typeof ims !== "undefined" &&
          isSet(ims) &&
          isSet(ims.catGridLabel) &&
          ims.catGridLabel !== ""
        ) {
          defaultView = ims.catGridLabel === "0" ? "list" : "grid";
        }

        var pageView = defaultView;
        if (
          typeof ims !== "undefined" &&
          isSet(ims) &&
          isSet(ims.pageViewStatus) &&
          ims.pageViewStatus !== ""
        ) {
          pageView = ims.pageViewStatus === "grid" ? "grid" : "list";
        }

        //defaultview===list
        if (defaultView === "list") {
          if (pageView === "list") {
            //getting identified on list page

            //update url of switched page
            var switchUrl = $(".dspVew")[1].getAttribute("href");
            var identPresent = switchUrl.indexOf("&ident=1") === -1 ? 0 : 1;
            if (!identPresent) {
              var part2 = "&grid_view=1";
              var part1 = switchUrl.substring(0, switchUrl.lastIndexOf(part2));
              $(".dspVew")[1].setAttribute("href", part1 + "&ident=1" + part2);

            }

            //update url of current page
            var currentUrl = window.location.href;
            var identPresent = currentUrl.indexOf("&ident=1") === -1 ? 0 : 1;
            if (!identPresent) {
              newUrl = currentUrl + "&ident=1";
              history.replaceState(null, "", newUrl);
              var flagIdent = 1;
              identAppend(flagIdent);
            }
          } else {
            //getting identified on grid page

            //update url of switched page
            var switchUrl = $(".dspVew")[1].getAttribute("href");
            var identPresent = switchUrl.indexOf("&ident=1") === -1 ? 0 : 1;
            if (!identPresent) {
              $(".dspVew")[1].setAttribute("href", switchUrl + "&ident=1");

            }

            //update url of current page
            var currentUrl = window.location.href;
            var identPresent = currentUrl.indexOf("&ident=1") === -1 ? 0 : 1;
            if (!identPresent) {
              var part2 = "&grid_view=1";
              var part1 = currentUrl.substring(
                0,
                currentUrl.lastIndexOf(part2)
              );
              newUrl = part1 + "&ident=1" + part2;
              history.replaceState(null, "", newUrl);
              var flagIdent = 1;
              identAppend(flagIdent);
            }
          }
        }

        //defaultview===grid
        else {
          if (pageView === "grid") {
            //getting identified on grid page

            //update url of switched page
            var switchUrl = $(".dspVew")[1].getAttribute("href");
            var identPresent = switchUrl.indexOf("&ident=1") === -1 ? 0 : 1;
            if (!identPresent) {
              var part2 = "&list_view=1";
              var part1 = switchUrl.substring(0, switchUrl.lastIndexOf(part2));
              $(".dspVew")[1].setAttribute("href", part1 + "&ident=1" + part2);

            }

            //update url of current page
            var currentUrl = window.location.href;
            var identPresent = currentUrl.indexOf("&ident=1") === -1 ? 0 : 1;
            if (!identPresent) {
              newUrl = currentUrl + "&ident=1";
              history.replaceState(null, "", newUrl);
              var flagIdent = 1;
              identAppend(flagIdent);
            }
          } else {
            //getting identified on list page

            //update url of switched page
            var switchUrl = $(".dspVew")[1].getAttribute("href");
            var identPresent = switchUrl.indexOf("&ident=1") === -1 ? 0 : 1;
            if (!identPresent) {
              $(".dspVew")[1].setAttribute("href", switchUrl + "&ident=1");

            }

            //update url of current page
            var currentUrl = window.location.href;
            var identPresent = currentUrl.indexOf("&ident=1") === -1 ? 0 : 1;
            if (!identPresent) {
              var part2 = "&list_view=1";
              var part1 = currentUrl.substring(
                0,
                currentUrl.lastIndexOf(part2)
              );
              newUrl = part1 + "&ident=1" + part2;
              history.replaceState(null, "", newUrl);
              var flagIdent = 1;
              identAppend(flagIdent);
            }
          }
        }
      }
    }

    if (
      !(IsChatbl(tmpId) || isSSB(tmpId) || (isBl(tmpId) && !Bl09(tmpId))) &&
      currentISO() !== "IN" &&
      imeshExist() === ""
    )
      $("#t" + tmpId + "_submit")
        .parent()
        .addClass("txt-cnt");
    onHovSub(tmpId);
    backButtonNameUI(tmpId, data);
  }
}

function backButtonNameUI(tmpId, data) {
  var nobackbtn = isSet(data) && isSet(data.showBackBtn) ? data.showBackBtn : 1;
  if (
    nobackbtn === 1 &&
    isOtherEnq(tmpId) &&
    imeshExist() !== "" &&
    IsPrevStepAvailable(tmpId)
  ) {
    $("#t" + tmpId + "_backdiv").removeClass("bedsnone");
    $("#t" + tmpId + "_fBtn").addClass("eqBksb");
    $("#t" + tmpId + "_submitdiv").addClass("eqBsub");
  } else {
    $("#t" + tmpId + "_fBtn").removeClass("eqBksb");
    $("#t" + tmpId + "_submitdiv").removeClass("eqBsub");
    $("#t" + tmpId + "_backdiv").addClass("bedsnone");
  }
}

function miniDetailService(tmpId) {
  var data = {};
  var imeshcookie = imeshExist();
  data["s_glusrid"] =
    imeshcookie === ""
      ? ReqObj.glid
      : usercookie.getParameterValue(imeshcookie, "glid");
  data["modid"] = modIdf;
  ReqObj.miniDetailHit.ping = true;
  fireAjaxRequest({
    data: {
      ga: {
        s: false,
        f: false,
        gatype: "MiniDetails",
        source: "",
      },
      tmpId: tmpId,
      ajaxObj: {
        obj: "",
        s: {
          ss: 0,
          sf: {
            af: 0,
            pa: 0,
          },
          f: 0,
        },
        f: {
          f: 0,
        },
      },
      ajaxtimeout: 0,
      ajaxdata: data,
      hitfinserv: "",
      type: 7,
    },
  });
}

function returnPostBlEnqObject(tmpId, array, hooks, that, ns) {
  return {
    object: {
      obj: new PostBlEnqUpdate(tmpId),
      toReplace: false,
      isService: true,
      array: array,
      hooks: hooks,
    },
    tmpId: tmpId,
    that: that,
    AfterService: [],
    hasFallback: false,
    FallbackObj: null,
    nextStep: ns,
  };
}

function returnGenObject(tmpId, array, hooks, that, type) {
  return {
    object: {
      obj: new Generation(type),
      toReplace: true,
      isService: true,
      array: array,
      hooks: hooks,
    },
    tmpId: tmpId,
    that: that,
    AfterService: [],
    hasFallback: false,
    FallbackObj: null,
  };
}

function returnmdtlObject(array, hooks, tmpId, that, countlastUpdated, md) {
  var Obj = {
    object: {
      obj: new MoreDetails(tmpId),
      toReplace: false,
      isService: false,
      array: array,
      hooks: hooks,
      countlastUpdated: countlastUpdated,
    },
    tmpId: tmpId,
    that: that,
    AfterService: [],
    hasFallback: false,
    FallbackObj: null,
    md: md,
  };
  return Obj;
}

function toAskMoreDetails(tmpId) {
  var cn = cNameConditions(tmpId);
  var gst = gstConditions(tmpId);
  if (cn === true) return { ask: true, what: "Company Name", key: 0 };
  else if (gst === true) return { ask: true, what: "GST Number", key: 1 };
  return { ask: false, what: "", key: -1 };
}

function manipulateWidth(tmpId, id) {
  var siblingElement =
    $("#t" + tmpId + "_cdiv").html() !== "" &&
      $("#t" + tmpId + "_cdiv").html() !== null
      ? $("#t" + tmpId + "_cdiv")
      : $("#t" + tmpId + "_cbx");
  var arr = siblingElement.siblings();
  var len = arr.length;
  var widthSet = false;
  if (len === 0) {
    $("#t" + tmpId + id).width("60%");
    widthSet = true;
  }
  if (
    isSet($(".newui")) &&
    len === 0 &&
    isSet($(".newui").parent().attr("id")) &&
    isBl($(".newui").parent().attr("id").substr(1, 4))
  ) {
    $(".newui").width("60%");
    widthSet = true;
  } else {
    for (var i = len - 1; i >= 0; i--) {
      if (
        $("#" + arr[i].id).html() !== "" &&
        arr[i].id === "t" + tmpId + "_reqbox"
      ) {
        widthSet = true;
        if ($("#t" + tmpId + "_reqBoxTemplates").outerWidth() <= 100)
          $("#t" + tmpId + id).width("86%");
        else
          $("#t" + tmpId + id).width(
            $("#t" + tmpId + "_reqBoxTemplates").outerWidth()
          );
        break;
      }
    }
  }
  if (widthSet === false) $("#t" + tmpId + id).width("60%");
}

