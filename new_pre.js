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

/*------------------Contact-Detail--------------------------*/

function ContactDetail(name, email, city) {
  this.setName = "";
  this.setEmail = "";
  this.setCity = "";
  this.setMobile = "";

  this.imeshCookie = "";
  this.iplocCookie = "";

  this.usercountry = "";
  this.geoip_country_iso = "";

  this.name = name;
  this.email = email;
  this.city = city;
  this.shownHtml = [];
  this.contactdetailhtml = "";
  this.className = "ContactDetail";

  this.ContactDetailHtmlNameObj = {
    Label: "",
    UserInput: "",
    OuterWrapper: "",
    ClosingWrapper: "",
  };
  this.ContactDetailHtmlEmailObj = {
    Label: "",
    UserInput: "",
    OuterWrapper: "",
    ClosingWrapper: "",
  };
  this.ContactDetailHtmlCityObj = {
    Label: "",
    UserInput: "",
    OuterWrapper: "",
    ClosingWrapper: "",
  };
  this.ContactDetailHtmlObjArray = [];
  this.nonMandatory = false;
  this.classCount = 0;
  this.templateId = "";
  this.phonecalled = false;
}

ContactDetail.prototype.getClassCount = function (tmpId) {
  if ($.isEmptyObject(ReqObj.Form[tmpId].ContactDetail)) this.classCount = 1;
  else this.classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail) + 1;
  ReqObj.Form[tmpId].nec.classCount = this.classCount;
};

ContactDetail.prototype.returnKey = function (tmpId) {
  var key = "";
  if (this.name === 1 && this.email === 0 && this.city === 0) {
    key = "Name";
  }
  if (this.name === 0 && this.email === 1 && this.city === 0) {
    if (currentISO() === "IN") {
      key = "Email";
    } else {
      key = "Mobile";
    }
  }
  if (this.name === 0 && this.email === 0 && this.city === 1) {
    key = "City";
  }
  return key;
};


ContactDetail.prototype.displayHtml = function (tmpId) {
  this.templateId = tmpId;
  if (tmpId.substring(0, 2) === "09") {
    if (this.name === 1 && this.email === 1 && this.city === 1)
      ReqObj.Form[tmpId].flags.isNECShown = true;
  } else {
    if (this.name === 1 && this.email === 1 && this.city === 1)
      ReqObj.Form[tmpId].flags.isNECShown = true;
    else {
      ReqObj.Form[tmpId].flags.isNECShown = false;
    }
  }
  if (IsChatbl(tmpId)) {
    return [this.contactdetailLabelhtml, this.contactdetailInputhtml];
  }
  if (isOtherEnq(tmpId)) {
    ReqObj.Form[tmpId].calledClassName[
      ReqObj.Form[tmpId].FormSequence.StepCounter
    ] = this.className;
  }
  return [this.contactdetailhtml];
};
ContactDetail.prototype.addHtmlObjToArray = function (htmlObj) {
  if (isSet(htmlObj)) this.ContactDetailHtmlObjArray.push([htmlObj]);
};
ContactDetail.prototype.getContactDetailHtml = function (tmpId) {
  var changeiso = currentISO();
  if (
    this.imeshCookie &&
    this.name === 1 &&
    this.email === 1 &&
    this.city === 1
  ) {
    if (this.setName === "") this.addHtmlObjToArray(this.showName(tmpId));
    if (
      (this.setEmail === "" && changeiso === "IN") ||
      (this.setMobile === "" &&
        changeiso !== "IN" &&
        ReqObj.Form[tmpId].OnCloseStep === true &&
        !isEnq(tmpId)) ||
      (this.setMobile === "" && changeiso !== "IN" && isnewSSB(tmpId)) ||
      (this.setMobile === "" &&
        changeiso !== "IN" &&
        (isEnq(tmpId) || isBl(tmpId)))
    )
      this.addHtmlObjToArray(this.showEmailOrMobile(tmpId));
    if (
      ((isSet(changeiso) && changeiso === "IN") || this.usercountry === "IN") &&
      this.setCity === ""
    )
      this.addHtmlObjToArray(this.showCity(tmpId));
  } else if (this.name === 1 && this.email === 0 && this.city === 0) {
    if (this.setName === "") this.addHtmlObjToArray(this.showName(tmpId));
  } else if (this.email === 1 && this.name === 0 && this.city === 0) {
    this.addHtmlObjToArray(this.showEmailOrMobile(tmpId));
  } else if (this.email === 0 && this.name === 0 && this.city === 1) {
    if (changeiso === "IN") this.addHtmlObjToArray(this.showCity(tmpId));
  } else if (this.name === 1 && this.email === 1 && this.city === 1) {
    if (this.setName === "") this.addHtmlObjToArray(this.showName(tmpId));
    if (
      (this.setEmail === "" && changeiso === "IN") ||
      (this.setMobile === "" &&
        changeiso !== "IN" &&
        ReqObj.Form[tmpId].OnCloseStep === true &&
        !isEnq(tmpId)) ||
      isSSB(tmpId) ||
      (this.setMobile === "" &&
        changeiso !== "IN" &&
        (isEnq(tmpId) || isBl(tmpId)))
    )
      this.addHtmlObjToArray(this.showEmailOrMobile(tmpId));
    if (
      ((isSet(changeiso) && changeiso === "IN") || this.usercountry === "IN") &&
      this.setCity === ""
    )
      this.addHtmlObjToArray(this.showCity(tmpId));
  }

  if (this.ContactDetailHtmlObjArray.length > 0) {
    if (!IsChatbl(tmpId)) {
      var clsnm =
        pdpenqImage(tmpId) ||
          isFirstImgVidCTA(tmpId) ||
          isSSB(tmpId) ||
          isFirstImgVidCTAFR(tmpId) ||
          isBlInlineFr(tmpId) ||
          ((isEnq(tmpId) || Bl09(tmpId)) &&
            currentISO() !== "IN" &&
            imeshExist() === "")
          ? ""
          : "beW5"; //tmpid to be replaced by formtype
      if (isInactiveBL(tmpId)) clsnm = "";
      if (
        ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" &&
        Bl04(tmpId) &&
        ReqObj.Form[tmpId].FormSequence._screenCounter === 0
      )
        clsnm = "";
      var wrapperclass =
        isSSB(tmpId) || isBlInline(tmpId)
          ? ""
          : isInactiveBL(tmpId)
            ? "belft beW11 bemgb15"
            : "belft beW11 beclr";
      if (
        tmpId.substring(0, 2) === "09" &&
        !imeshExist() &&
        currentISO() === "IN"
      )
        wrapperclass += " bedsnone";
      var appendDiv =
        !isImageVidEnq(tmpId) &&
          isEnq(tmpId) &&
          currentISO() !== "IN" &&
          ReqObj.Form[tmpId].FormSequence._stepCounter === 0 &&
          !imeshExist()
          ? "<div class='berow'></div>"
          : "";
      var ContactInfoSuffixOuterHtml =
        "<div class='" +
        wrapperclass +
        "' id='t" +
        tmpId +
        "_contactinfo" +
        this.classCount +
        "'>" +
        appendDiv +
        "<div id='t" +
        tmpId +
        "_idcontactscreen" +
        this.classCount +
        "' class='" +
        clsnm +
        "'>";
      var countryDiv = this.countryDiv(tmpId);
      var cntflg = flagd(countryDiv, tmpId);
      var ContactInfoSuffixClosingHtml =
        Bl04(tmpId) &&
          ReqObj["Form"][tmpId].modId === "DIR" &&
          !isNotfoundBl(tmpId) &&
          ReqObj.Form[tmpId].flag
          ? "</div></div >" + cntflg
          : "</div></div >";
      var ContactInfoSuffixHtmlObj = {
        SuffixOuterHtml: ContactInfoSuffixOuterHtml,
        SuffixClosingHtml: ContactInfoSuffixClosingHtml,
        suffix: "_contactinfo",
        isPhone: this.phonecalled,
      };
      var contactdetailhtml = MakeWrapper(
        this.ContactDetailHtmlObjArray,
        tmpId,
        ContactInfoSuffixHtmlObj,
        ""
      );
    } else {
      var contactcls = "beW5";
      var ContactInfoSuffixOuterHtml =
        "<div class='cbl_ques cbl_vh' id='t" +
        tmpId +
        "_contactinfo" +
        this.classCount +
        "'> <div id='t" +
        tmpId +
        "_idcontactscreen" +
        this.classCount +
        "' class='" +
        contactcls +
        "'>";
      var ContactInfoSuffixClosingHtml = "</div></div > ";
      var appendExtra = "";
      var suggCity = "";
      if (
        isSet(this.ContactDetailHtmlObjArray[0]) &&
        isSet(this.ContactDetailHtmlObjArray[0][0]) &&
        isSet(this.ContactDetailHtmlObjArray[0][0].appendExtra)
      ) {
        appendExtra = this.ContactDetailHtmlObjArray[0][0].appendExtra;
      }
      if (
        isSet(this.ContactDetailHtmlObjArray[0]) &&
        isSet(this.ContactDetailHtmlObjArray[0][0]) &&
        isSet(this.ContactDetailHtmlObjArray[0][0].suggCity)
      ) {
        suggCity = this.ContactDetailHtmlObjArray[0][0].suggCity;
      }
      this.contactdetailLabelhtml =
        MakeWrapper(
          this.ContactDetailHtmlObjArray,
          tmpId,
          WrapperObj(
            ContactInfoSuffixOuterHtml,
            ContactInfoSuffixClosingHtml,
            "_contactinfo"
          ),
          "ques"
        ) +
        appendExtra +
        suggCity +
        "</div>";

      var ContactInfoSuffixOuterHtml =
        "<div class='t" +
        tmpId +
        "_userInput cbl_br10 dn' id='t" +
        tmpId +
        "_contactinfo" +
        this.classCount +
        "'> <div id='t" +
        tmpId +
        "_idcontactscreen" +
        this.classCount +
        "' class='beW5 cbl_dtls cbl_name cbl_df cbl_w1 cbl_br10'>";
      var ContactInfoSuffixClosingHtml = "</div></div > ";
      this.contactdetailInputhtml = MakeWrapper(
        this.ContactDetailHtmlObjArray,
        tmpId,
        WrapperObj(
          ContactInfoSuffixOuterHtml,
          ContactInfoSuffixClosingHtml,
          "_contactinfo"
        ),
        "input"
      );
      var contactdetailhtml =
        this.contactdetailLabelhtml + this.contactdetailInputhtml;
    }
    ReqObj.Form[tmpId].ContactDetail[this.classCount] = contactdetailhtml;
    return contactdetailhtml;
  } else return "";
};

ContactDetail.prototype.hasHtml = function (ContactDetailObj) {
  if (isSet(ContactDetailObj)) {
    var tmpId = ContactDetailObj.tmpId;
    this.type = isSet(ContactDetailObj.type)
      ? ContactDetailObj.type
      : { code: "", step: "" };
    this.getClassCount(tmpId);
    this.nonMandatory =
      typeof ContactDetailObj.nonMandatory !== "undefined"
        ? ContactDetailObj.nonMandatory
        : "";
    this.captureDetails(tmpId);
    this.cookies(tmpId);
    this.onlastscreen =
      isSet(ContactDetailObj.additionalkey) &&
        isSet(ContactDetailObj.additionalkey.onlastscreen)
        ? ContactDetailObj.additionalkey.onlastscreen
        : false;
    this.contactdetailhtml = this.getContactDetailHtml(tmpId);

    ContactDetailObj.that.NumberofClassCalled -= 1;

    if (this.contactdetailhtml !== "") {
      ReqObj.Form[tmpId].currentclassCount++;
      this.ifHtmlPresent(ContactDetailObj, tmpId);
    } else {
      this.ifHtmlNotPresent(ContactDetailObj, tmpId);
    }
  }
};

ContactDetail.prototype.ifHtmlPresent = function (ContactDetailObj, tmpId) {
  AttachObject(ContactDetailObj.object, tmpId);
  if (isSet(ContactDetailObj.AfterService)) {
    for (var i = 0; i < ContactDetailObj.AfterService.length; i++) {
      ContactDetailObj.that.MakeSeq(ContactDetailObj.AfterService[i], tmpId);
    }
  }
  if (ContactDetailObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(ContactDetailObj, tmpId);
  }
};

ContactDetail.prototype.ifHtmlNotPresent = function (ContactDetailObj, tmpId) {
  if (ContactDetailObj.hasFallback) {
    CreateSeq(ContactDetailObj.FallbackObj);
  }
};

ContactDetail.prototype.defaultEvents = function (tmpId) {
  var that = this;

  //next->submit
  if (EnqPopupDIR(tmpId) && ReqObj.Form[tmpId].toShowMsg) {
    $("#yajaca").show();
    $("#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input").addClass(
      "toConv"
    );
    // this.inputText=$("input.toConv").attr("value");
    $("input.toConv").attr("value", "Submit");
    ReqObj.Form[tmpId].toShowMsg = 0;
    ReqObj.Form[tmpId].msgFromOtp = 0;
  }
  //mob track
  if(currentISO() === "IN"){
    if(isSet(ReqObj.Form[tmpId].mobEntered) && ReqObj.Form[tmpId].mobEntered==1){    
      mobEnteredTrack(tmpId,"NEC");       
    }
  }
  else{
    if(isSet(ReqObj.Form[tmpId].emailEntered) && ReqObj.Form[tmpId].emailEntered==1){    
      emailEnteredTrack(tmpId,"NEC");       
    }
  }

  if (ReqObj.Form[tmpId].afflId === "-126")
    $("#t" + tmpId + "_q_first_nm").attr("placeholder", "Enter your Name");
  that.handleUI({
    data: {
      obj: that,
      todo: "nameUI",
      tmpId: tmpId,
    },
  });
  that.handleUI({
    data: {
      obj: that,
      todo: "default",
      tmpId: tmpId,
    },
  });
  if (ReqObj.Form[tmpId].OnCloseStep === true) {
    that.handleUI({
      data: {
        obj: that,
        todo: "cityOthers",
        tmpId: tmpId,
      },
    });
  }
  if (IsChatbl(tmpId)) {
    that.handleUI({
      data: {
        obj: that,
        todo: "focus",
        tmpId: tmpId,
      },
    });
    ChatblfooterAns(tmpId);
  }
  that.handleEvents(this, tmpId);
  if (isOtherEnq(tmpId)) {
    if (NEC()) $("#t" + tmpId + "_hdg").addClass("ln26");
  }
  if (imeshExist() !== "" && !isInactiveBL(tmpId))
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");
  get_buyer_info(tmpId);
};


ContactDetail.prototype.cookies = function (tmpId) {
  this.imeshCookie = imeshExist();
  this.iplocCookie = usercookie.getCookie("iploc");
  this.geoip_country_iso = usercookie.getParameterValue(
    this.iplocCookie,
    "gcniso"
  );
  if (this.imeshCookie !== "") {
    this.setName = ReqObj.UserDetail["fn"];
    this.setEmail = ReqObj.UserDetail["em"];
    this.setCity =
      ReqObj.UserDetail["ctid"] !== ""
        ? ReqObj.UserDetail["ctid"]
        : ReqObj.UserDetail["cityname"] !== ""
          ? ReqObj.UserDetail["cityname"]
          : ReqObj.UserDetail["ctoth"] !== ""
            ? ReqObj.UserDetail["ctoth"]
            : "";
    this.setMobile = ReqObj.UserDetail["mb1"];
    this.usercountry = usercookie.getParameterValue(this.imeshCookie, "iso");
  }
};

ContactDetail.prototype.captureDetails = function (tmpId) {
  var iso = currentISO();
  var imeshcookie = imeshExist();
  if (iso === "IN") {
    var email =
      $("#t" + tmpId + "_q_email_in" + this.classCount).length > 0
        ? $("#t" + tmpId + "_q_email_in" + this.classCount).val()
        : ReqObj.UserDetail["em"];
    ReqObj.UserDetail["em"] = ReturnCorrectVal(
      usercookie.getParameterValue(imeshcookie, "em"),
      email
    );
    if (typeof ReqObj.UserDetail["em"] === "undefined")
      ReqObj.UserDetail["em"] = "";
  } else {
    var mobile =
      $("#t" + tmpId + "_q_mobile_f" + this.classCount).length > 0
        ? $("#t" + tmpId + "_q_mobile_f" + this.classCount).val()
        : ReqObj.UserDetail["mb1"];
    ReqObj.UserDetail["mb1"] = ReturnCorrectVal(
      usercookie.getParameterValue(imeshcookie, "mb1"),
      mobile
    );
    if (typeof ReqObj.UserDetail["mb1"] === "undefined")
      ReqObj.UserDetail["mb1"] = "";
  }

  var fn =
    $("#t" + tmpId + "_q_first_nm" + this.classCount).length > 0
      ? $("#t" + tmpId + "_q_first_nm" + this.classCount).val()
      : ReqObj.UserDetail["fn"];
  ReqObj.UserDetail["fn"] = ReturnCorrectVal(
    usercookie.getParameterValue(imeshcookie, "fn"),
    fn
  );
  ReqObj.UserDetail["fn"] !== ""
    ? $(".gd").removeClass("dn")
    : $(".gd").addClass("dn");
  if (typeof ReqObj.UserDetail["fn"] === "undefined")
    ReqObj.UserDetail["fn"] = "";

  var ctid =
    $("#t" + tmpId + "city_id_sugg" + this.classCount).length > 0
      ? $("#t" + tmpId + "city_id_sugg" + this.classCount).val()
      : ReqObj.UserDetail["ctid"];
  ReqObj.UserDetail["ctid"] = ReturnCorrectVal(
    usercookie.getParameterValue(imeshcookie, "ctid"),
    ctid
  );
  if (typeof ReqObj.UserDetail["ctid"] === "undefined")
    ReqObj.UserDetail["ctid"] = "";

  ReqObj.UserDetail["cityname"] =
    !isSSB(tmpId) &&
      $("#t" + tmpId + "_q_city_oth" + this.classCount).length > 0
      ? $("#t" + tmpId + "_q_city_oth" + this.classCount).val()
      : ReqObj.UserDetail["cityname"];
  if (typeof ReqObj.UserDetail["cityname"] === "undefined")
    ReqObj.UserDetail["cityname"] = "";

  ReqObj.UserDetail["ctoth"] =
    ReqObj.UserDetail["ctid"] === "" ? ReqObj.UserDetail["cityname"] : "";
};
ContactDetail.prototype.toUpdate = function (tmpId) {
  if (imeshExist()) return true;
  return false;
};
ContactDetail.prototype.showName = function (tmpId) {
  var that = this;
  var formType = ReqObj.Form[tmpId].formType.toLowerCase();
  that.getLabelName(tmpId, formType);
  that.getInputName(tmpId, formType);
  that.ContactDetailHtmlNameObj["OuterWrapper"] = "";
  that.ContactDetailHtmlNameObj["ClosingWrapper"] = "";
  that.shownHtml.push("name");
  return that.ContactDetailHtmlNameObj;
};

ContactDetail.prototype.getLabelName = function (tmpId, formType) {
  var that = this;
  var name = returnSpan("t" + tmpId, "login_span_bold" + this.classCount, "Name", "befwt");
  var labeltext = IsChatbl(tmpId) ? "Please tell us your " + name : (isInactiveBL(tmpId)) ? "Name <span class='redc'>*</span>" : "Name";
  if (isBlInlineFr(tmpId)) {
    labeltext += "*";
  }
  var labelclass = IsChatbl(tmpId) || isSSB(tmpId) ? ssbClass("label", tmpId) : isBlInline(tmpId) ? isBlInlineFr(tmpId) ? "fs0 wf fadLbl" : "fs15 cl11"
    : isSticky(tmpId) ? "FM_be-lbl" : isBlFirstfold(tmpId) ? "be-lbl dn" : "be-lbl";
  var namehtml = returnLabel("t" + tmpId, labeltext, "_name-lb" + this.classCount, labelclass);
  that.ContactDetailHtmlNameObj["Label"] = namehtml;
};

ContactDetail.prototype.getInputName = function (tmpId, formType) {
  var that = this;
  var placeholder = IsChatbl(tmpId)
    ? " Enter your Name"
    : isEnq(tmpId) && isSet(this.type) && this.type.code !== "name"
      ? ""
      : "Enter your Name";
  if (
    (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
    (isOtherEnq(tmpId) &&
      tmpId.substring(0, 2) !== "09" &&
      ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
  )
    placeholder = "";
  var sticky = isSticky(tmpId) ? "FM_be-slbox" : "be-slbox";
  var inputclass = IsChatbl(tmpId)
    ? "blchat-inpt"
    : isSSB(tmpId) || isBlInline(tmpId)
      ? ""
      : sticky + " inpt_errorbx";
  if (isOtherEnq(tmpId)) {
    inputclass = inputclass + " inPlace";
  }
  if (isInactiveBL(tmpId)) {
    inputclass = inputclass + " bed_input cpNm";
    if (currentISO() != "IN" && isSet(ReqObj.UserDetail.em) && ReqObj.UserDetail.em == '') {
      inputclass += " wid_255"
    }
    else if (currentISO() != "IN") {
      inputclass += " wid_320"
    }
  }
  var namehtml = "";
  // namehtml += (isSSB(tmpId)) ? "<div class=' mb-wdIn'>" : returnInput("t" + tmpId, "_q_first_nm_hidden" + this.classCount, "hidden", " ", " ", " ", " ", " ", " ");
  namehtml += isSSB(tmpId)
    ? ""
    : returnInput(
      "t" + tmpId,
      "_q_first_nm_hidden" + this.classCount,
      "hidden",
      " ",
      " ",
      " ",
      " ",
      " ",
      " "
    );
  var fname = rvalue(tmpId, "fname");
  var nameInput = returnInput(
    "t" + tmpId,
    "_q_first_nm" + this.classCount,
    "text",
    "q_first_nm",
    placeholder,
    inputclass,
    fname,
    " ",
    " "
  );
  namehtml += isBlInline(tmpId)
    ? "<div class ='pflx1 pr'><div class ='inW240'>" + nameInput + "</div>"
    : nameInput;
  if (IsChatbl(tmpId)) {
    var html = "";
    namehtml += html;
    // var errorhtml = this.getChatblNameErrorDiv(tmpId);
    // namehtml += errorhtml;
  } else {
    var errorhtml = this.getNameErrorDiv(tmpId);
    namehtml += isBlInline(tmpId) ? errorhtml + " </div>" : errorhtml;
  }
  that.ContactDetailHtmlNameObj["UserInput"] = namehtml;
  if (ReqObj.Form[tmpId].FormSequence._stepCounter === 0)
    ReqObj.Form[tmpId]._NCOnFrstScrn = true;
};

ContactDetail.prototype.getNameErrorDiv = function (tmpId) {
  var html = "";
  if (isSSB(tmpId)) {
    return nameErrorDivSSB(tmpId, this);
  }
  var sticky = isSticky(tmpId) ? "FM_beerrp1" : (isInactiveBL(tmpId)) ? (currentISO() != 'IN') ? "namerrfn" : "nmerrin" : "beerrp1";
  if (isInactiveBL(tmpId)) {
    if (currentISO() != 'IN' && ReqObj.UserDetail.em != "" && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn == '') {
      sticky += " lft"
    }
    if (currentISO() == "IN") {
      if (ReqObj.Form[tmpId].currentclassCount != 1) {
        sticky += " top-16"
      }
    }
  }


  html = (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") || (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
    ? html + returnContainer("t" + tmpId, "_error_first_name" + this.classCount, "be-erbx beerrp bedsnone", "", "")
    : html + returnContainer("t" + tmpId, "_error_first_name" + this.classCount, sticky + " be-erbx bedsnone", "", "");
  html += returnContainer("t" + tmpId, "_fname_errmsg" + this.classCount, "", "content", "");
  html += "</div >";
  html = (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") || (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) ? html
    : html + '<a class="be-erarw" data-role="arrow"></a>';
  html += "</div >";
  return html;
};



ContactDetail.prototype.showEmailOrMobile = function (tmpId) {
  var that = this;
  var changeiso = currentISO();
  var formType = ReqObj.Form[tmpId].formType.toLowerCase();

  that.getLabelEmailMobile(tmpId, formType, changeiso);
  that.getInputEmailMobile(tmpId, formType, changeiso);
  that.ContactDetailHtmlEmailObj["OuterWrapper"] = "";
  that.ContactDetailHtmlEmailObj["ClosingWrapper"] = "";
  if (changeiso === "IN") that.shownHtml.push("email");
  else that.shownHtml.push("phone");
  return that.ContactDetailHtmlEmailObj;
};

ContactDetail.prototype.getLabelEmailMobile = function (tmpId, formType, changeiso) {
  var that = this;
  var label = "";
  if (changeiso === "IN") {
    label = "Email";
  } else {
    if (currentISO() !== "IN" && (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId)))
      label = "Phone Number";
    else if (isInactiveBL(tmpId)) {
      label = "Mobile <span class='redc'>*</span>";
    }
    else label = "Mobile";
  }
  let labcheck = label == "Phone Number" ? "" : " ID ";
  var labelelement = changeiso === "IN" ? "_email-lb" : "_mobile-lb";  // chatbl fmob
  var labeltext = IsChatbl(tmpId) ? "Please share your " + returnSpan("t" + tmpId, "login_span_bold" + this.classCount, label + labcheck, "befwt") : label;
  var labelclass = IsChatbl(tmpId) ? "" : isSSB(tmpId) ? ssbClass("label", tmpId) : "be-lbl";
  that.phonecalled = changeiso === "IN" ? false : true;
  that.ContactDetailHtmlEmailObj["Label"] = returnLabel("t" + tmpId, labeltext, labelelement + this.classCount, labelclass);
};
ContactDetail.prototype.getInputEmailMobile = function (
  tmpId,
  formType,
  changeiso
) {
  var that = this;
  var inputelement = changeiso === "IN" ? "_q_email_in" : "_q_mobile_f";
  var emvalue = isSSB(tmpId)
    ? changeiso === "IN"
      ? rvalue(tmpId, "evalue")
      : rvalue(tmpId, "mobval")
    : "";
  let fmobc = inputelement == "_q_mobile_f" ? "blchat-inpt cbl_fmob" : "blchat-inpt"; // chatbl fmob
  var inputclass = IsChatbl(tmpId)
    ? fmobc
    : isSSB(tmpId)
      ? ""
      : changeiso === "IN"
        ? "be-slbox inpt_errorbx"
        : "be-input benords beW3 beh32";
  if (isOtherEnq(tmpId)) {
    inputclass = inputclass + " inPlace";
  }
  if (changeiso === "IN") {
    label = "Email";
  } else {
    if (
      currentISO() !== "IN" &&
      (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId))
    )
      label = "Phone";
    else label = "Mobile";
  }
  if (isInactiveBL(tmpId)) {
    if (inputelement == "_q_mobile_f")
      inputclass = "be-slbox inpt_errorbx bed-input benords cpNm";
    else {
      inputclass = "be-slbox inpt_errorbx bed_input cpNm";
    }
  }
  // var label = (changeiso === "IN") ? "Email" : "Phone";
  var emailmobilehtml = "";

  if (!isSSB(tmpId) && changeiso !== "IN") {
    ReqObj.isoFlag = usercookie.getParameterValue(that.imeshCookie, "phcc");
    //ReqObj.isoFlag = (ReqObj.isoFlag !== "") ? ReqObj.isoFlag : usercookie.getParameterValue(that.imeshCookie, "phcc"); //iso reload error
    ReqObj.isoFlag =
      ReqObj.isoFlag.substring(0, 1) === "+"
        ? ReqObj.isoFlag
        : "+" + ReqObj.isoFlag;
    var isoclass = IsChatbl(tmpId) ? IsChatBLInline(tmpId)? "beiso isocenter" : "beiso isocenhcbl": (isInactiveBL(tmpId)) ? "be-flisq iso brdlft8" : "be-flisq iso"; //chatbl fmob
    emailmobilehtml += returnIsoHtml(tmpId, isoclass, ReqObj.isoFlag);
  }

  var placeholder = changeiso === "IN" && (IsChatbl(tmpId) || isInactiveBL(tmpId))
    ? "Enter your Email"
    : changeiso !== "IN" && !isOtherEnq(tmpId)
      ? "Enter your Phone"
      : "";
  // emailmobilehtml += (isSSB(tmpId)) ? '<div class="mb-wdIn">' : ""
  var instyle =
    Bl09(tmpId) && imeshExist() === "" ? "width: calc(100% - 52px);" : "";

  var limit = (changeiso === "IN") ? "" : "20";

  emailmobilehtml += returnInput(
    "t" + tmpId,
    inputelement + this.classCount,
    "text",
    inputelement + this.classCount,
    placeholder,
    inputclass,
    emvalue,
    instyle,
    limit //f mob bug
  );
  if (IsChatbl(tmpId)) {
    var html = "";
    emailmobilehtml += html;
    var errorhtml = this.getChatblEmailMobileErrorDiv(tmpId, changeiso);
    emailmobilehtml += errorhtml;
  } else {
    if (
      changeiso === "IN" &&
      ReqObj.Form[tmpId].typeofform.toLowerCase() !== "bl"
    ) {
      emailmobilehtml +=
        returnContainer(
          "t" + tmpId,
          "_helpmsg",
          "be-msghlp",
          "",
          "Supplier will contact you on this email",
          ""
        ) + "</div>";
    }
    var errorhtml = this.getEmailMobileErrorDiv(tmpId, changeiso);
    emailmobilehtml += errorhtml;
    emailmobilehtml += isSSB(tmpId) ? "</div>" : "";
  }
  that.ContactDetailHtmlEmailObj["UserInput"] = emailmobilehtml;
};

ContactDetail.prototype.getEmailMobileErrorDiv = function (tmpId, changeiso) {
  if (isSSB(tmpId)) {
    return emailMobileErrorDivSSB(tmpId, changeiso, this);
  }
  var html = "";
  var errorconatiner = changeiso === "IN" ? "_err_email" : "_error_mobile";
  html =
    (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
      (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
      ? html +
      returnContainer(
        "t" + tmpId,
        errorconatiner + this.classCount,
        "be-erbx beerrp bedsnone",
        "",
        ""
      )
      : html +
      returnContainer(
        "t" + tmpId,
        errorconatiner + this.classCount,
        "beerrp1 be-erbx bedsnone error_blck",
        "",
        ""
      );
  errorconatiner = changeiso === "IN" ? "_email_errmsg" : "_mobile_errmsg";
  html += returnContainer(
    "t" + tmpId,
    errorconatiner + this.classCount,
    "",
    "content",
    ""
  );
  html += "</div>";
  html =
    (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
      (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
      ? html + "</div>"
      : html + '<a class="be-erarw" data-role="arrow"></a></div>';
  return html;
};

ContactDetail.prototype.getChatblEmailMobileErrorDiv = function (
  tmpId,
  changeiso
) {
  var html = "";
  var errorconatiner = changeiso === "IN" ? "_err_email" : "_error_mobile";
  html += returnContainer(
    "t" + tmpId,
    errorconatiner + this.classCount,
    "beerrp1 be-erbx bedsnone error_blck",
    "",
    ""
  );
  errorconatiner = changeiso === "IN" ? "_email_errmsg" : "_mobile_errmsg";
  html += returnContainer(
    "t" + tmpId,
    errorconatiner + this.classCount,
    "",
    "content",
    ""
  );
  html += "</div>";
  html += "</div>";
  return html;
};

ContactDetail.prototype.showCity = function (tmpId) {
  var that = this;
  if (!usercookie.getParameterValue(this.imeshCookie, "ctid")) {
    /* City Already Exists. */
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
    that.getLabelCity(tmpId, formType);
    that.getInputCity(tmpId, formType);
    that.ContactDetailHtmlCityObj["OuterWrapper"] = IsChatbl(tmpId) ? "" : "";
    that.ContactDetailHtmlCityObj["ClosingWrapper"] = IsChatbl(tmpId) ? "" : "";
    that.shownHtml.push("city");
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    blenqGATracking(form_type, "Cityshown", getEventLabel(), 1, tmpId);
    return that.ContactDetailHtmlCityObj;
  }
};

ContactDetail.prototype.getPrefillCity = function (tmpId, formType) {
  var city = "";
  if (ReqObj.Form[tmpId].OnCloseStep !== true) {
    city =
      ReqObj.UserDetail["ipcityname"] !== "" &&
        ReqObj.UserDetail["ipcityname"] !== "null"
        ? ReqObj.UserDetail["ipcityname"]
        : ReqObj.Form[tmpId].cityOth !== ""
          ? ReqObj.Form[tmpId].cityOth
          : "";
    if (
      usercookie.getCookie("xnHist") !== "" &&
      (!isSet(city) || city === "")
    ) {
      var xnHistCity = usercookie.getParameterValue(
        usercookie.getCookie("xnHist"),
        "city"
      );
      xnHistCity = xnHistCity.charAt(0).toUpperCase() + xnHistCity.slice(1);
      city = xnHistCity;
    }
    if (city.toLowerCase() === "undefined") city = "";
    return city;
  }
  city =
    ReqObj.Form[tmpId].cityOth !== ""
      ? ReqObj.Form[tmpId].cityOth
      : ReqObj.UserDetail["ipcityname"] !== "" &&
        ReqObj.UserDetail["ipcityname"] !== "null"
        ? ReqObj.UserDetail["ipcityname"]
        : "";
  return city;
};

ContactDetail.prototype.getLabelCity = function (tmpId, formType) {
  var that = this;
  var citybold = returnSpan("", "", "City", "befwt");
  var labeltext = IsChatbl(tmpId) ? "Tell us your " + citybold + " to connect you to nearby sellers" : (isInactiveBL(tmpId)) ? "City <span class='redc'>*</span>" : "City";
  var labelclass = IsChatbl(tmpId) ? "" : isSSB(tmpId) ? ssbClass("label", tmpId) : "be-lbl";
  that.ContactDetailHtmlCityObj["Label"] = returnLabel("t" + tmpId, labeltext, "_for-city-lb" + this.classCount, labelclass);
};

ContactDetail.prototype.getInputCity = function (tmpId, formType) {
  var that = this;
  var prefilCity = that.getPrefillCity(tmpId, formType);
  prefilCity = isSet(prefilCity) ? prefilCity : "";
  if (isSet(prefilCity) && prefilCity !== "")
    ReqObj.Form[tmpId].cityTracking = 1;
  var inputclass = IsChatbl(tmpId)
    ? "blchat-inpt"
    : isSSB(tmpId)
      ? "ui-autocomplete-input"
      : "be-slbox inpt_errorbx ui-autocomplete-input";
  if (isOtherEnq(tmpId)) {
    inputclass = inputclass + " inPlace";
  }
  if (isInactiveBL(tmpId)) {
    inputclass = inputclass + " bed_input cpNm wid_285";
  }
  var placeholder = IsChatbl(tmpId)
    ? "Enter your City"
    : isOtherEnq(tmpId)
      ? ""
      : "Enter City Name";
  var spantext = IsChatBLInline(tmpId) ? "Detect City" : "Detect My City";
  // var spantext = (IsChatbl(tmpId) || isSSB(tmpId)) ? "" : "Detect My City";
  // var spantext = (IsChatbl(tmpId) || isSSB(tmpId)) ? "" : "Change Your City";
  // var spanclass = (IsChatbl(tmpId)|| isSSB(tmpId)) ? "" : "beChtxt";
  var spanclass = isBl(tmpId)
    ? (isInactiveBL(tmpId)) ? "dml" : "beChtxt dc_mid"
    : "beChtxt";
  spanclass =
    (isImageVidEnq(tmpId) &&
      ReqObj.Form[tmpId].FormSequence._stepCounter === 0) || 
      pdpenqImage(tmpId)
      ? "clr_blue befs13 bemt5 disp-inl crP enq_ct"
      : spanclass;
  // var cityhtml = (isSSB(tmpId) ) ? '<div class="mb-wdIn">' : "";
  var cityhtml = "";
  if (isSSB(tmpId) && prefilCity == "") prefilCity = rvalue(tmpId, "cvalue");
  cityhtml +=
    '<input type="text" templateId="' +
    tmpId +
    '" name="q_city_oth' +
    that.classCount +
    '" id="t' +
    tmpId +
    "_q_city_oth" +
    that.classCount +
    '"' +
    'placeholder="' +
    placeholder +
    '" value="' +
    prefilCity +
    '" class="' +
    inputclass +
    '" maxlength = "100" autocomplete = "off" role = "textbox" aria-autocomplete="list" aria-haspopup="true"';
  if (IsChatbl(tmpId) || isSSB(tmpId)) {
    cityhtml += ">";
  } else {
    cityhtml += ">";
    // cityhtml += ' readonly="" disabled="disabled">';
  }
  if (isSSB(tmpId)) {
    cityhtml += returnInput(
      "t" + tmpId,
      "city_id_sugg" + that.classCount,
      "hidden",
      "",
      "",
      "",
      "",
      "",
      ""
    );
    cityhtml += returnSpan(
      "t" + tmpId,
      "_detect_city" + that.classCount,
      spantext,
      spanclass
    );
    cityhtml +=
      that.getCityErrorDiv(tmpId) + "</div>" + that.getCitySuggDiv(tmpId);
  } else if (IsChatbl(tmpId)) {
    var html = "";
    cityhtml += html;
    // cityhtml +=returnSpan("t" + tmpId, "_detect_city" + that.classCount, spantext, spanclass);
    that.ContactDetailHtmlCityObj["suggCity"] = that.getCitySuggDiv(tmpId);
    that.ContactDetailHtmlCityObj["appendExtra"] = returnSpan(
      "t" + tmpId,
      "_detect_city" + that.classCount,
      spantext,
      spanclass
    );
  } else {
    cityhtml += returnInput(
      "t" + tmpId,
      "city_id_sugg" + that.classCount,
      "hidden",
      "",
      "",
      "",
      "",
      "",
      ""
    );
    cityhtml += returnSpan(
      "t" + tmpId,
      "_detect_city" + that.classCount,
      spantext,
      spanclass
    );
    var errorhtml = that.getCityErrorDiv(tmpId);
    cityhtml += that.getCitySuggDiv(tmpId) + errorhtml;
  }
  if (ReqObj.Form[tmpId].FormSequence._stepCounter === 0)
    ReqObj.Form[tmpId]._NCOnFrstScrn = true;
  that.ContactDetailHtmlCityObj["UserInput"] = cityhtml;

  $(document).bind('click', function (event) {
    if (!($(event.target).parents().andSelf().is('#t'+tmpId+'_q_city_oth'+that.classCount))) {
        $('.t'+tmpId+'_CitySuggestor .ui-autocomplete').hide('');
    }
});



};

ContactDetail.prototype.getCityErrorDiv = function (tmpId) {
  var html = "";
  if (isSSB(tmpId)) {
    return cityErrorDivSSB(tmpId, this);
  }
  var cityerrcls = "beerrp1";
  if (isInactiveBL(tmpId)) {
    cityerrcls = "cityerr2";
    if (ReqObj.Form[tmpId].currentclassCount == 1) {
      cityerrcls = " cityerr"
    }
  }

  html = (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") || (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
    ? html + returnContainer("t" + tmpId, "_error_city" + this.classCount, "be-erbx beerrp bedsnone", "", "")
    : html + returnContainer("t" + tmpId, "_error_city" + this.classCount, cityerrcls + " be-erbx bedsnone", "", "");
  html += returnContainer("t" + tmpId, "_city_errmsg" + this.classCount, "", "content", "");
  html = (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") || (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
    ? html + "</div>"
    : html + '</div><a class="be-erarw" data-role="arrow"></a>';
  html += "</div>";
  return html;
};

ContactDetail.prototype.getCitySuggDiv = function (tmpId) {
  var ipLoc = iplocExist();
  var html = "";
  var cityArr = {};
  var hdCt = usercookie.getParameterValue(
    usercookie.getCookie("xnHist"),
    "city"
  );
  hdCt = hdCt.charAt(0).toUpperCase() + hdCt.slice(1);
  cityArr[usercookie.getParameterValue(ipLoc, "lg_ct")] =
    usercookie.getParameterValue(ipLoc, "lg_ctid");
  cityArr[hdCt] = "";
  cityArr[usercookie.getParameterValue(ipLoc, "gctnm")] =
    usercookie.getParameterValue(ipLoc, "gctid");
  var count = 0;
  for (var ct in cityArr) {
    if ( (ct.toLowerCase() !== "all india" || ct.toLowerCase() !== "undefined") && ct.toLowerCase() !== "" ) {
      html += count > 0 ? " | " : "";
      html += "<span class = 'suggClr clr_blue' onClick='return prefilSuggCity(\"" + tmpId + '","' + this.classCount + '" ,"' + cityArr[ct] + '", "' + ct + "\")'>" + ct + "</span>";
      count += 1;
    }
  }
  let citySugg = (isInactiveBL(tmpId)) ? "mt-12" : pdpenq(tmpId)? "mt5" : "";
  return count > 0 ? "<div class = 'citySuggClr "+ citySugg +"'>Suggestions: " + html + "</div>" : "";
};

ContactDetail.prototype.multipleHitCases = function (data, type, where) {
  var iso = currentISO();
  if (
    iso !== "IN" &&
    data.replica.mobile !== "" &&
    (typeof type === "undefined" || type === "url" || type === "noturl")
  ) {
    data["s_mobile"] = "";
    return { data: data, hitagain: where === "no" ? false : true };
  } else if (
    iso !== "IN" &&
    data.replica.mobile !== "" &&
    typeof type !== "undefined" &&
    type === "again"
  ) {
    data["s_first_name"] = "";
    data["url"] = "";
    data["s_companyName"] = "";
    data["s_email"] = data.replica.email;
    data["s_mobile"] = data.replica.mobile;
    return { data: data, hitagain: false };
  } else if (
    iso === "IN" &&
    data.replica.gst !== "" &&
    type === "again" &&
    where === "notgst"
  ) {
    data["gst"] = "";
    return { data: data, hitagain: true };
  } else if (
    iso === "IN" &&
    data.replica.gst !== "" &&
    typeof type === "undefined"
  ) {
    data["s_mobile"] = data.replica.mobile;
    data["s_first_name"] = "";
    data["s_email"] = "";
    data["s_city_name"] = "";
    data["s_companyName"] = "";
    data["gst"] = data.replica.gst;
    return { data: data, hitagain: false };
  }
  return { hitagain: false, data: data, remove: "none" };
};
ContactDetail.prototype.handleEvents = function (obj, tmpId) {
  if (!isSet(validation)) createGlobalObject();
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    //  ChatblfooterAns(tmpId);
    //if (IsChatbl(tmpId) || isSSB(tmpId)) {
    obj.enableCity({
      data: {
        obj: obj,
        tmpId: tmpId,
      },
    });
    //}
    /*------------------ FOCUS ---------------------- */
    var nametypeele =
      isOtherEnq(tmpId) &&
        tmpId.substring(0, 2) !== "09" &&
        ReqObj.Form[tmpId].FormSequence.StepCounter < 1
        ? "inlinename"
        : "";
    var nameplaceholder = IsChatbl(tmpId)
      ? " Enter your Name"
      : "Enter your Name";

    var validationevent = isSSB(tmpId) ? "click" : "focus keypress.Validation";
    $("#t" + tmpId + "_q_first_nm" + obj.classCount)
      .off(validationevent)
      .on(
        validationevent,
        {
          obj: obj,
          todo: "removeError",
          tmpId: tmpId,
          ele: "_q_first_nm" + obj.classCount,
          errorlabel: "_name-lb" + obj.classCount,
          errorMainDiv: "_fname_errmsg" + obj.classCount,
          errorSubDiv: "_error_first_name" + obj.classCount,
          typeele: nametypeele,
          placehold: nameplaceholder,
        },
        obj.handleUI
      );
    $("#t" + tmpId + "_q_city_oth" + obj.classCount)
      .off("focus keypress.Validation")
      .on(
        "focus keypress.Validation",
        {
          obj: obj,
          todo: "removeError",
          tmpId: tmpId,
          ele: "_q_city_oth" + obj.classCount,
          errorlabel: "_for-city-lb" + obj.classCount,
          errorMainDiv: "_city_errmsg" + obj.classCount,
          errorSubDiv: "_error_city" + obj.classCount,
          typeele: "city",
        },
        obj.handleUI
      );
    $("#t" + tmpId + "_q_email_in" + obj.classCount)
      .off("focus keypress.Validation")
      .on(
        "focus keypress.Validation",
        {
          obj: obj,
          todo: "removeError",
          tmpId: tmpId,
          ele: "_q_email_in" + obj.classCount,
          errorlabel: "_email-lb" + obj.classCount,
          errorMainDiv: "_email_errmsg" + obj.classCount,
          errorSubDiv: "_err_email" + obj.classCount,
          typeele: "email",
        },
        obj.handleUI
      );
    $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
      .off("focus.Validation")
      .on(
        "focus.Validation",
        {
          obj: obj,
          todo: "removeError",
          tmpId: tmpId,
          ele: "_q_mobile_f" + obj.classCount,
          errorlabel: "_mobile-lb" + obj.classCount,
          errorMainDiv: "_mobile_errmsg" + obj.classCount,
          errorSubDiv: "_error_mobile" + obj.classCount,
        },
        obj.handleUI
      );

    /*---------------- BLUR ----------------------- */
    $("#t" + tmpId + "_q_first_nm" + obj.classCount)
      .off("blur")
      .on(
        "blur",
        {
          obj: obj,
          todo: "blurlabel",
          tmpId: tmpId,
          ele: "_q_first_nm" + obj.classCount,
          placehold: nameplaceholder,
          typeele: nametypeele,
        },
        obj.handleUI
      );
    $("#t" + tmpId + "_q_city_oth" + obj.classCount)
      .off("blur")
      .on(
        "blur",
        {
          obj: obj,
          todo: "blurlabel",
          tmpId: tmpId,
          ele: "_q_city_oth" + obj.classCount,
        },
        obj.handleUI
      );
    $("#t" + tmpId + "_q_email_in" + obj.classCount)
      .off("blur")
      .on(
        "blur",
        {
          obj: obj,
          todo: "blurlabel",
          tmpId: tmpId,
          ele: "_q_email_in" + obj.classCount,
        },
        obj.handleUI
      );
    $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
      .off("blur")
      .on(
        "blur",
        {
          obj: obj,
          todo: "blurlabel",
          tmpId: tmpId,
          ele: "_q_mobile_f" + obj.classCount,
        },
        obj.handleUI
      );

    /*---------------Others----------------------- */
    $("#t" + tmpId + "_detect_city" + obj.classCount)
      .off("click")
      .on(
        "click",
        {
          obj: obj,
          tmpId: tmpId,
        },
        obj.detectCity
      );
    $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
      .off("keypress.Validation")
      .on("keypress.Validation", validation.isNumberKey);

    if (IsChatbl(tmpId)) {
      $("#t" + tmpId + "_q_first_nm" + obj.classCount).focus();
    }
  }
};
ContactDetail.prototype.handleUI = function (event) {
  if (isSet(event) && isSet(event.data)) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode !== 13) {
      var obj = event.data.obj;
      var todo = event.data.todo;
      var tmpId = event.data.tmpId;
      if (todo === "nameUI") {
        if ($("#t" + tmpId + "_q_first_nm" + obj.classCount).val() !== "") {
          $("#t" + tmpId + "_q_first_nm" + obj.classCount).prop(
            "disabled",
            false
          );
          $("#t" + tmpId + "_q_first_nm" + obj.classCount).prop(
            "readonly",
            true
          );
        }
        $("#t" + tmpId + "_q_first_nm" + obj.classCount)
          .parent()
          .removeClass("eqIsf eqIsMn");
        if (isEnq(tmpId))
          $("#t" + tmpId + "_q_first_nm" + obj.classCount)
            .parent()
            .addClass("mb15");
      }
      if (todo === "default") {
        if ($("#t" + tmpId + "_q_city_oth" + obj.classCount).val() !== "") {
          $("#t" + tmpId + "_q_city_oth" + obj.classCount)
            .parents()
            .addClass("eqfcsed");
        }
      }
      if (todo === "focus") {
        if (IsChatbl(tmpId)) {
          setTimeout(function () {
            $("#t" + tmpId + "_q_first_nm" + obj.classCount).focus();
            $("#t" + tmpId + "_q_city_oth" + obj.classCount).focus();
            $("#t" + tmpId + "_q_mobile_f" + obj.classCount).focus();
            $("#t" + tmpId + "_q_email_in" + obj.classCount).focus();
          }, 1800);
        } else {
          $("#t" + tmpId + "_q_first_nm" + obj.classCount).focus();
          $("#t" + tmpId + "_q_city_oth" + obj.classCount).focus();
          $("#t" + tmpId + "_q_mobile_f" + obj.classCount).focus();
        }
      }
      if (todo === "removeError") {
        removechatblerror(tmpId);
        $("#t" + tmpId + event.data.errorSubDiv).addClass("bedsnone");
        $("#t" + tmpId + event.data.ele).removeClass(
          "highlight-err mb-erbrd nb-erbrd"
        );
        $("#t" + tmpId + event.data.errorlabel).removeClass("redc");
        $("#t" + tmpId + event.data.ele)
          .parents()
          .addClass("eqfcsed"); //
        if (event.data.typeele === "city" && keycode !== 0)
          ReqObj.Form[tmpId].cityTracking = 0;
        if (isOtherEnq(tmpId)) {
          if (isSet(event.data.typeele) && event.data.typeele === "email")
            $("#t" + tmpId + event.data.ele).attr(
              "placeholder",
              "For Example, abc@gmail.com"
            );
          else if (
            isSet(event.data.typeele) &&
            event.data.typeele === "inlinename"
          )
            $("#t" + tmpId + event.data.ele).attr(
              "placeholder",
              event.data.placehold
            );
          else $("#t" + tmpId + event.data.ele).attr("placeholder", "");
        }
        if (keycode === 8) {
          var retval = ModifyUserDetail(event.data.toupdate, "empty", keycode);
          if (retval === 1) {
            $("#t" + tmpId + "city_id_sugg" + obj.classCount).val("");
          }
        }
      }

      if (todo === "blurlabel") {
        if (isOtherEnq(tmpId)) {
          if ($("#t" + tmpId + event.data.ele).val().length === 0)
            $("#t" + tmpId + event.data.ele)
              .parents()
              .removeClass("eqfcsed");
          if (isSet(event.data.typeele) && event.data.typeele === "inlinename")
            $("#t" + tmpId + event.data.ele).attr(
              "placeholder",
              event.data.placehold
            );
          else $("#t" + tmpId + event.data.ele).attr("placeholder", "");
        }
      }

      if (todo === "cityOthers") {
        $("#t" + tmpId + "_q_city_oth" + obj.classCount).val(
          ReqObj.Form[tmpId].cityOth
        );
        $("#t" + tmpId + "_q_city_oth" + obj.classCount).prop(
          "disabled",
          false
        );
      }
      if (todo === "showError") {
        $("#t" + tmpId + event.data.elementhtml).html(
          event.data.validate["error"]
        );
        if (IsChatbl(tmpId)) {
          addChatblError(tmpId, event.data.validate["error"]);
        } else {
          $("#t" + tmpId + event.data.elementremoveClass).removeClass(
            "bedsnone"
          );
          if (!ReqObj.Form[tmpId].errorDivId)
            ReqObj.Form[tmpId].errorDivId =
              "t" + tmpId + event.data.elementremoveClass;
          var errorcls = isSSB(tmpId)
            ? isnewSSB(tmpId)
              ? "nb-erbrd"
              : "mb-erbrd"
            : "highlight-err";
          $("#t" + tmpId + event.data.elementaddClass).addClass(errorcls);
          isSSB(tmpId)
            ? $("#t" + tmpId + event.data.elementaddClass).focus
            : "";
          if (
            !isSSB(tmpId) &&
            (!isOtherEnq(tmpId) ||
              (isSet(event.data.isinline) && event.data.isinline === "inline"))
          )
            $("#t" + tmpId + event.data.chatelement).addClass("redc");
        }
      }
    }
  }
};


ContactDetail.prototype.handleHeading = function (tmpId) {
  if (ReqObj.Form[tmpId].OnCloseStep === true) {
    ReqObj.Form[tmpId].currentScreen = currentISO() === "IN" ? this.className + "onclosein" : this.className + "onclosenotin";
  }
  if (isSet(this.onlastscreen) && this.onlastscreen && isBl(tmpId)) {
    ReqObj.Form[tmpId].currentScreen = currentISO() === "IN" ? this.className + "_last" : this.className;
  }
  if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq"){
    if(isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0){
      $("#blheading").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
    else{
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
  }
  else {
    if (isSet(this.type) && this.type.step === "last") {
      ReqObj.Form[tmpId].currentScreen = currentISO() === "IN" ? this.className + "onclosein" : this.className + "onclosenotin";
    }
    if ( isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0 /*&& !((new RegExp('contactdetail').test(ReqObj.Form[tmpId].currentScreen.toLowerCase())) || (new RegExp('userlogin').test(ReqObj.Form[tmpId].currentScreen.toLowerCase())))*/ )
      $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
    else
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
  }
};

ContactDetail.prototype.handleButton = function (tmpId) {
  ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};

ContactDetail.prototype.enableCity = function (event) {
  if (isSet(event) && isSet(event.data)) {
    var obj = event.data.obj;
    var tmpId = event.data.tmpId;
    //var cityvalue = $("#" +tmpId + "_q_city_oth").val();
    // if(!isSSB(tmpId)) $("#t" + tmpId + "_q_city_oth" + obj.classCount).val("");
    // $("#t" + tmpId + "_q_city_oth" + obj.classCount).prop("disabled", false);
    // $("#t" + tmpId + "_q_city_oth" + obj.classCount).prop("readonly", false);
    // if(!isSSB(tmpId))$("#t" + tmpId + "_q_city_oth" + obj.classCount).focus();
    $("#t" + tmpId + "_detect_city" + obj.classCount).off("click");
    obj.showCitySuggestions(obj, tmpId);
  }
};
ContactDetail.prototype.detectCity = function (event) {
  if (isSet(event) && isSet(event.data)) {
    var obj = event.data.obj;
    var tmpId = event.data.tmpId;
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    blenqGATracking(form_type, "detectMyCity", getEventLabel(), 1, tmpId);
    ReqObj.cityId = [];
    ReqObj.cityId.push("#t" + tmpId + "_q_city_oth" + obj.classCount); //t0901city_id_sugg1
    ReqObj.cityId.push("#t" + tmpId + "city_id_" + obj.classCount);
    initGeolocationenq(tmpId);
  }
};
ContactDetail.prototype.showCitySuggestions = function (obj, tmpId) {
  var that = this;
  var iso = obj.usercountry;
  if (typeof Suggester === "undefined") {
    setTimeout(function () {
      that.showCitySuggestions(obj, tmpId);
    }, 50);
  } else {
    if (typeof Suggester !== "undefined") {
      var CitySuggSuffix = "_CitySuggestor";
      $(".t" + tmpId + CitySuggSuffix).each(function () {
        $(this).remove();
      });
      var row_num = BlAutoSuggRowNum(tmpId);
      var autocompleteClass = SetAutoCompleteClass(tmpId, CitySuggSuffix);
      if (IsChatBLInline(tmpId)) autocompleteClass += " smChtSg";
      main_city_sugg = new Suggester({
        element: "t" + tmpId + "_q_city_oth" + obj.classCount,
        onSelect: obj.selectCity,
        type: "city",
        fields: "std,state,id,stateid",
        minStringLengthToDisplaySuggestion: 1,
        rowsToDisplay: row_num,
        autocompleteClass: autocompleteClass,
        displayFields: "value,state",
        displaySeparator: " >> ",
        filters: "iso:" + iso,
        recentData: false,
        rowsToDisplay: IsChatBLInline(tmpId) ? 3 : "",
      });
    }
  }
};
ContactDetail.prototype.selectCity = function (event, ui) {
  var tmpId = $(this).attr("templateId");
  var classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail);
  $("#t" + tmpId + "_q_city_oth" + classCount).val(ui.item.value);
  $("#t" + tmpId + "city_id_sugg" + classCount).val(ui.item.data.id);
  ReqObj.UserDetail["statename"] = ui.item.data.state;
  ReqObj.UserDetail["stateid"] = ui.item.data.stateid;
  ReqObj.UserDetail["ctid"] = ui.item.data.id;
  ReqObj.UserDetail["cityname"] = ui.item.value;
  if (IsChatbl(tmpId)) {
    ReqObj.Form[tmpId].UserInputs["City"] = ui.item.value;
    ReqObj.Form[tmpId].UserInputs["CityId"] = ui.item.data.id;
  }
  ReqObj.Form[tmpId].cityTracking = 3;
};

function prefilSuggCity(tmpId, classCount, ctid, city) {
  $("#t" + tmpId + "_q_city_oth" + classCount).val(city);
  $("#t" + tmpId + "_q_city_oth" + classCount)
    .parent()
    .addClass("eqfcsed");
  $("#t" + tmpId + "city_id_sugg" + classCount).val(ctid);
  $("#t" + tmpId + "_q_city_oth" + classCount).focus();
  ReqObj.Form[tmpId].cityTracking = 2;
}

function fireCityTracking(tmpId, data) {
  var imesh = imeshExist();
  var _case =
    imesh === ""
      ? 1
      : usercookie.getParameterValue(imesh, "ctid") === ""
        ? 1
        : 0;
  if (_case !== 0 && isSet(data["s_city_name"]) && data["s_city_name"] !== "" && isSet(ReqObj.Form[tmpId].cityTracking)) {
    var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    if (ReqObj.Form[tmpId].cityTracking === 1)
      blenqGATracking(form_type, "City|Prefilled", getEventLabel(), 1, tmpId);
    else if (ReqObj.Form[tmpId].cityTracking === 2)
      blenqGATracking(form_type, "City|Suggestion", getEventLabel(), 1, tmpId);
    else if (ReqObj.Form[tmpId].cityTracking === 3)
      blenqGATracking(form_type, "City|Suggester", getEventLabel(), 1, tmpId);
    else if (ReqObj.Form[tmpId].cityTracking === 4)
      blenqGATracking(form_type, "City|GeoLocFilled", getEventLabel(), 1, tmpId);
    else blenqGATracking(form_type, "City|Manual", getEventLabel(), 1, tmpId);
  }
}

/*-------------------------------new Seq----------------------------------------- */
FormSeq.prototype._enq = function (tmpId, where) {
  var _that = this;
  ReqObj.Form[tmpId].waitFinServ = 1;
  var typeOfForm = returnTypeForSeq(tmpId).toLowerCase(); // inline enquiry changes
  updateEnrichShownKey(tmpId, true, false);
  if ( imeshExist() !== "" && isSecondEnq() && usercookie.getParameterValue(imeshExist(), "uv") !== "V" && currentISO() === "IN" ) {
    ReqObj.Form[tmpId].isOtpShownOnFirstStep = true;
  }
  if ( Enq04(tmpId) && ReqObj.Form[tmpId].modrefType.toLowerCase() === "product" && ReqObj.Form[tmpId].afflId === "-126" ) {
    $("#t" + tmpId + "_q_comp_sec").removeClass("bedsnone");
    $("#t" + tmpId + "_q_comp_name").val(ReqObj.Form[tmpId].rcvName);
  } 
  _that.screenSequence(tmpId, typeOfForm);
};

FormSeq.prototype._blFlow = function (tmpId, where) {
  var _that = this;
  var typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  ReqObj.Form[tmpId]._NCOnFrstScrn = false;
  ReqObj.Form[tmpId].isAttachmentShown = false;
  if (Bl01(tmpId)) {
    ReqObj.Form[tmpId].isBlQtutShown = false;
    ReqObj.Form[tmpId].screenNumber = -1;
  }
  if (Bl04(tmpId)) {
    ReqObj.Form[tmpId].isBlQtutShown = false;
    ReqObj.Form[tmpId].screenNumber = -1;
  }
  updateEnrichShownKey(tmpId, false, false);
  if ( imeshExist() !== "" && isSecondBl() && usercookie.getParameterValue(imeshExist(), "uv") !== "V" && currentISO() === "IN" ) {
    ReqObj.Form[tmpId].isOtpShownOnFirstStep = true;
  }
  _that.screenSequence(tmpId, typeOfForm);
};

FormSeq.prototype._classStringCode = function (classArray) {
  var str = "";
  for (let ele in classArray) {
    str += ReqObj.classCode[classArray[ele]];
  }
  return str;
};

FormSeq.prototype._returnClassCode = function (tmpId, typeOfForm, data) {
  var _that = this;
  var _case = null;
  if (typeOfForm === "inenquiry") {
    var typeCode = 0;
    var _default = { classArray: ["RequirementDtl"] };
    _default["numberOfClassCalled"] = 1;
    _default["code"] = _that._classStringCode(_default.classArray);
    if (isSet(data.iso) && data.iso === "IN") {
      _case = !data.imeshcookie ?
        {
          classArray: ["UserLogin", "RequirementDtl"],
          numberOfClassCalled: 3,
          type: "name",
          nonMandatory: { name: true },
        }
        : _default;
    } else {
      if (!data.imeshcookie)
        _case = {
          classArray: ["UserLogin", "ContactDetail", "RequirementDtl"],
          numberOfClassCalled: 3,
          type: "name",
          nonMandatory: { name: false },
        };
      else if (data.imeshcookie && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "")
        _case = {
          classArray: ["ContactDetail", "RequirementDtl"],
          numberOfClassCalled: 2,
          type: "name",
          nonMandatory: { name: false },
        };
      else _case = _default;
    }
    _case["code"] = _that._classStringCode(_case.classArray);
  }

  // for first fold
  else if (typeOfForm === "blfirstfold") {
    var typeCode = 1;
    var _default = { classArray: ["ProductName", "Isq"] };
    _default["numberOfClassCalled"] = 2;
    _default["code"] = _that._classStringCode(_default.classArray);

    if (isSet(data.iso) && data.iso === "IN") {
      // _case = (!data.imeshcookie) ? { classArray: ["ProductName", "UserLogin", "ContactDetail", "Isq"], numberOfClassCalled: 4, type: "name", nonMandatory: { name: true } } : _default;
      _case = !data.imeshcookie ? { code: "" } : _default; //this to this
      _case = data.imeshcookie && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "" && typeCode === 1 ?
        {
          classArray: ["ProductName", "ContactDetail", "Isq"],
          numberOfClassCalled: 3,
          type: "name",
          nonMandatory: { name: true },
        }
        : _case;
    } else {
      // if (!data.imeshcookie) _case = { classArray: ["ProductName", "UserLogin", "ContactDetail", "Isq"], numberOfClassCalled: 4, type: "name", nonMandatory: { name: false } };
      if (!data.imeshcookie) {
        _case = { code: "" };
      } //this to this
      else if (data.imeshcookie && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "")
        _case = {
          classArray: ["ProductName", "ContactDetail", "Isq"],
          numberOfClassCalled: 3,
          type: "name",
          nonMandatory: { name: false },
        };
      else _case = _default;
    }
    _case["code"] = _that._classStringCode(_case.classArray);
  } else if (typeOfForm === "imenquiry") {
    _case = data.imeshcookie && isSet(data.iso) && (!_contactScreen(data.iso) || (data.iso === "IN" && _contactScreen(data.iso) && _mandatDetailsFilled() && isSecondEnq(tmpId) && ReqObj.UserDetail.uv === "")) ? { code: "e", classArray: ["EnquireNow"], numberOfClassCalled: 1 } : { code: "" };
  } else if (typeOfForm === "bl") {
    var nonm = currentISO() !== "IN" || Bl09(tmpId) ? false : true;
    _case = data.imeshcookie && !NEC() ?
      {
        code: "b",
        classArray: ["ProductName", "Isq"],
        numberOfClassCalled: 2,
      }
      : data.imeshcookie ?
        {
          code: "b",
          classArray: ["ProductName", "ContactDetail"],
          numberOfClassCalled: 2,
          nonMandatory: { name: nonm },
        }
        : { code: "" };
    if (Bl01(tmpId)) {
      var nonm = currentISO() !== "IN" ? false : true;
      _case = data.imeshcookie ?
        {
          code: "b",
          classArray: isBlInlineFr(tmpId)
            ? ["ProductName", "ContactDetail", "RequirementDtl"]
            : ["ProductName", "ContactDetail", "Isq"],
          numberOfClassCalled: 3,
          type: "name",
          nonMandatory: { name: nonm },
        }
        : { code: "" };
    }
  } else _case = { code: "" };
  return _case;
};

FormSeq.prototype.updateNumberOfClassCalled = function (numberOfClassCalled) {
  this.NumberofClassCalled = numberOfClassCalled;
};
FormSeq.prototype.returnClassObjects = function (loop, _className, _classData) {
  var that = this;
  var _obj = that.classObjects(_className, _classData);
  return {
    object: {
      obj: _obj,
      toReplace: _classData.extraKeys[loop + 1].tr,
      isService: _classData.extraKeys[loop + 1].is,
      array: _classData.array[loop + 1],
      hooks: _classData.hooks[loop + 1],
    },
    tmpId: _classData.tmpId,
    that: _classData.that,
    AfterService: _classData.afterService[loop + 1],
    hasFallback: _classData.extraKeys[loop + 1].hf,
    FallbackObj: _classData.extraKeys[loop + 1].fobj,
    md: isSet(_classData.md) ? _classData.md[loop + 1] : null,
    message: isSet(_classData.message) ? _classData.message[loop + 1] : null,
    type: isSet(_classData.type) ? _classData.type : null,
    nonMandatory: isSet(_classData.nonMandatory)
      ? _classData.nonMandatory
      : null,
    additionalkey: isSet(_classData.additionalkey)
      ? _classData.additionalkey
      : null,
  };
};
FormSeq.prototype.classObjects = function (_className, _classData) {
  switch (_className.toLowerCase()) {
    case "enquirenow":
      return new EnquireNow();
    case "userlogin":
      return new UserLogin(_classData.tmpId);
    case "contactdetail":
      return isSet(_classData.type) && _classData.type.code === "name"
        ? new ContactDetail(1, 0, 0)
        : new ContactDetail(1, 1, 1);
    case "userverification":
      return new UserVerification(_classData.tmpId);
    case "isq":
      return ReqObj.Form[_classData.tmpId].GlobalIsqObject;
    case "requirementdtl":
      return new RequirementDtl(_classData.tmpId);
    case "moredetails":
      return new MoreDetails(_classData.tmpId);
    case "thankyou":
      return new ThankYou(_classData.tmpId);
    case "productname":
      return new ProductName(_classData.tmpId);
    case "blstaticques":
      return new BlStaticQues(_classData.tmpId);
    // default : return _that.returnDefaultObj(_classData)
  }
};
FormSeq.prototype.screenSequence = function (tmpId, typeOfForm) {
  var _that = this;
  _that._whichScreen(tmpId, typeOfForm);
};
FormSeq.prototype._objectSequence = function (tmpId, classObj) {
  var _that = this;
  var loop = classObj.numberOfClassCalled;
  if (loop > 0) {
    _that._stepCounter += 1;
    if (_that._stepCounter === 1 && isEnq(tmpId)) subsequentKeyUI(tmpId);
    for (var i = 0; i < loop; i++) {
      toShowBuyerInfo(tmpId, classObj.classArray[i]);
      _that.MakeSeq(_that.returnClassObjects(i, classObj.classArray[i], classObj));
      if ( isSet(classObj.leadServiceObj) && isSet(classObj.leadServiceObj[i + 1]) && classObj.leadServiceObj[i + 1] !== "" ) {
        var type = classObj.leadServiceObj[i + 1] === "intent" ? 1 : 0;
        var _hooks = isSet(classObj.copyhooks) && classObj.copyhooks === true ? classObj.hooks[i + 1] : { pre: [], post: [] };
        _that.MakeSeq( returnGenObject(tmpId, classObj.array[i + 1], _hooks, _that, type) );
      }
    }
  }
};
FormSeq.prototype._switchNext = function (tmpId, typeOfForm) {
  var _that = this;
  _that._screenCounter += 1;
  _that.screenSequence(tmpId, typeOfForm);
};
FormSeq.prototype._whichScreen = function (tmpId, typeOfForm) {
  var _that = this;
  switch (_that._screenCounter) {
    case 0:
      return _that._screen0(tmpId, typeOfForm);
    case 1:
      return _that._screen1(tmpId, typeOfForm);
    case 2:
      return _that._screen2(tmpId, typeOfForm);
    case 3:
      return _that._screen3(tmpId, typeOfForm);
    case 4:
      return _that._screen4(tmpId, typeOfForm);
    case 5:
      return _that._screen5(tmpId, typeOfForm);
    case 6:
      return _that._screen6(tmpId, typeOfForm);
    default:
      return _that._screen7(tmpId, typeOfForm);
  }
};
FormSeq.prototype._reqbox = function (tmpId, data) {
  var _that = this;
  var _rclassObj = {
    numberOfClassCalled: 1,
    hooks: { 1: { pre: [], post: [] } },
    classArray: ["RequirementDtl"],
    array: { 1: data.array },
    that: _that,
    tmpId: tmpId,
    afterService: { 1: [] },
    extraKeys: { 1: { tr: true, is: false, hf: false, fobj: null } },
    copyhooks: true,
    leadServiceObj: { 1: "generate" },
  };
  return _rclassObj;
};
FormSeq.prototype._screen0 = function (tmpId, typeOfForm) {
  currentscreen_no = 0;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var _classObj = null;
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
    emptyHook: { pre: [], post: [] },
  };
  var code = _that._returnClassCode(tmpId, typeOfForm, data);
  var _afterService = returnPostBlEnqObject(
    tmpId,
    data.array,
    data.emptyHook,
    _that,
    ""
  );
  var _rclassObj = _that._reqbox(tmpId, data);
  var _fallback =
    typeOfForm === "inenquiry"
      ? null
      : _that.returnClassObjects(0, _rclassObj.classArray[0], _rclassObj);
  if (Bl09(tmpId)) {
    _fallback = [];
    _fallback[0] = _that.returnClassObjects(
      0,
      _rclassObj.classArray[0],
      _rclassObj
    );
  }
  if (code.code !== "") {
    _classObj = {
      numberOfClassCalled: code.classArray.length,
      hooks:
        code.code === "e"
          ? { 1: { pre: [_that._screen1], post: [] } }
          : {
            1:
              code.code === "ur" ||
                code.code === "ucr" ||
                code.code === "pc" ||
                code.code === "p"
                ? { pre: [], post: [_that.InlineOpenForm, _that._screen1] }
                : code.code === "pu" || code.code === "puc"
                  ? data.emptyHook
                  : { pre: [_that.InlineOpenForm, _that._screen1], post: [] },
            2:
              code.code === "pu" || code.code === "puc"
                ? { pre: [], post: [_that.InlineOpenForm, _that._screen1] }
                : data.emptyHook,
            3: data.emptyHook,
          },
      classArray: code.classArray,
      array: _makeDataAndServiceArr(code.classArray, data.array, 1),
      that: _that,
      tmpId: tmpId,
      afterService: _makeDataAndServiceArr(code.classArray, _afterService, 2),
      extraKeys: _makeExtraKey(code.classArray, _fallback),
      leadServiceObj:
        code.code === "e"
          ? isSecondEnq(tmpId) === false ||
            (isSecondEnq(tmpId) && ReqObj.UserDetail.uv !== "")
            ? { 1: "generate" }
            : null
          : code.code === "puc" || code.code == "pu"
            ? { 2: "generate" }
            : { 1: "generate" },
      type: isSet(code.type) ? { code: code.type } : null,
      nonMandatory: isSet(code.nonMandatory) ? code.nonMandatory : null,
    };
    if (Bl04(tmpId)) {

      ReqObj.Form[tmpId].IsqStep1 = ReturnCorrectVal(
        ReqObj.Form[tmpId].IsqStep1,
        3
      );
      ReqObj.Form[tmpId].IsqStepN = ReturnCorrectVal(
        ReqObj.Form[tmpId].IsqStepN,
        3
      );
      _classObj.hooks = {
        1: { pre: [], post: [_that.InlineOpenForm, _that._screen2] },
        2: { pre: [], post: [] },
        3: { pre: [], post: [] },
      };
    }

    if (isBl(tmpId) && !Bl04(tmpId)) {
      ReqObj.Form[tmpId].IsqStep1 = ReturnCorrectVal(ReqObj.Form[tmpId].IsqStep1, 3);
      ReqObj.Form[tmpId].IsqStepN = ReturnCorrectVal(ReqObj.Form[tmpId].IsqStepN, 3);

      if (isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter == -1 && currentISO() == 'IN' && !NEC()) {
        ReqObj.Form[tmpId].IsqStep1 = 1;
        ReqObj.Form[tmpId].IsqStepN = 4;
      }
      _classObj.hooks = Bl01(tmpId)
        ? {
          1: { pre: [], post: [_that.InlineOpenForm, _that._screen2] },
          2: { pre: [], post: [] },
          3: { pre: [], post: [] },
        }
        : { 1: { pre: [], post: [_that._screen2] }, 2: { pre: [], post: [] } };
      _classObj.leadServiceObj =
        isSecondBl(tmpId) === false ||
          (isSecondBl(tmpId) && ReqObj.UserDetail.uv !== "")
          ? { 1: "generate" }
          : { 1: "generate" };
    }
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else _that._switchNext(tmpId, typeOfForm);
};

FormSeq.prototype._screen1 = function (tmpId, typeOfForm) {
  currentscreen_no = 1;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var _classObj = null;
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };
  var _case = !data.imeshcookie && isSet(data.iso) && data.iso === "IN" ? 0 : !data.imeshcookie && isSet(data.iso) && data.iso !== "IN" ? 1 : -1;
  var _rclassObj = _that._reqbox(tmpId, data);
  var _fallback = !Bl01(tmpId) && !Bl04(tmpId) ? null : _that.returnClassObjects(0, _rclassObj.classArray[0], _rclassObj);
  var classObj = ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId) ? { classArray: ["UserLogin"] } : Bl09(tmpId) ?
    {
      classArray:
        _case === 0
          ? ["ProductName", "UserLogin"]
          : ["ProductName", "UserLogin", "ContactDetail"],
    }
    : Bl01(tmpId) || Bl04(tmpId)
      ? {
        classArray: isBlInlineFr(tmpId)
          ? ["ProductName", "UserLogin", "ContactDetail", "RequirementDtl"]
          : ["ProductName", "UserLogin", "ContactDetail", "Isq"],
      }
      : {
        classArray:
          _case === 0 ? ["UserLogin"] : ["UserLogin", "ContactDetail"],
      };
  if (ReqObj.UserDetail.mb1 != "" && checkblockedUser() && (Bl04(tmpId) || Enq04(tmpId)))
    _case = -1;
  if (_case !== -1) {
    var _afterService = returnPostBlEnqObject(tmpId, data.array, { pre: [], post: [] }, _that, "");
    _classObj = {
      numberOfClassCalled: classObj.classArray.length,
      hooks: _case === 0 ? { 1: { pre: [], post: [_that._screen2] } }
        : {
          1: { pre: [], post: [_that._screen2] },
          2: { pre: [], post: [] },
        },
      classArray: classObj.classArray,
      array: _makeDataAndServiceArr(classObj.classArray, data.array, 1),
      that: _that,
      tmpId: tmpId,
      afterService: _makeDataAndServiceArr(
        classObj.classArray,
        _afterService,
        2
      ),
      extraKeys: _makeExtraKey(classObj.classArray, _fallback),
      leadServiceObj: _case === 0 ? { 1: "generate" } : { 1: "generate" },
      nonMandatory: { name: false },
    };
    if (typeOfForm === "bl") {
      var nonm = currentISO() !== "IN" ? false : true;
      ReqObj.Form[tmpId].IsqStep1 = ReturnCorrectVal(
        ReqObj.Form[tmpId].IsqStep1,
        3
      );
      ReqObj.Form[tmpId].IsqStepN = ReturnCorrectVal(
        ReqObj.Form[tmpId].IsqStepN,
        3
      );
      _classObj.hooks = Bl01(tmpId)
        ? {
          1: { pre: [], post: [] },
          2: { pre: [], post: [_that.InlineOpenForm, _that._screen2] },
          3: { pre: [], post: [] },
          4: { pre: [], post: [] },
          5: { pre: [], post: [] },
        }
        : _case === 0
          ? { 1: { pre: [], post: [] }, 2: { pre: [], post: [_that._screen2] } }
          : {
            1: { pre: [], post: [] },
            2: { pre: [], post: [_that._screen2] },
            3: { pre: [], post: [] },
          };
      _classObj.leadServiceObj = { 2: "generate" };
      _classObj.type = { code: Bl01(tmpId) ? "name" : "" };
      if (Bl01(tmpId)) _classObj.nonMandatory = { name: nonm };
    }
    if (typeOfForm === "blfirstfold") {

      var nonm = currentISO() !== "IN" ? false : true;
      ReqObj.Form[tmpId].IsqStep1 = ReturnCorrectVal(
        ReqObj.Form[tmpId].IsqStep1,
        3
      );
      ReqObj.Form[tmpId].IsqStepN = ReturnCorrectVal(
        ReqObj.Form[tmpId].IsqStepN,
        3
      );
      _classObj.hooks = {
        1: { pre: [], post: [] },
        2: { pre: [], post: [_that.InlineOpenForm, _that._screen2] },
        3: { pre: [], post: [] },
        4: { pre: [], post: [] },
        5: { pre: [], post: [] },
      };
      _classObj.leadServiceObj = { 2: "generate" };
      _classObj.type = { code: "name" };
      _classObj.nonMandatory = { name: nonm };
    }
    if (currentISO() !== "IN") _classObj.type = { code: "name" };
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else _that._switchNext(tmpId, typeOfForm);
};


FormSeq.prototype._returnLastScreen = function (tmpId) {
  var _that = this;
  var LastScreen = "";
  if (isSet(ReqObj.Form[tmpId].UiArray[_that.StepCounter])) {
    for (
      var j = 0;
      j < ReqObj.Form[tmpId].UiArray[_that.StepCounter].length;
      j++
    ) {
      LastScreen =
        LastScreen +
        ConstructorName(ReqObj.Form[tmpId].UiArray[_that.StepCounter][j].Obj);
    }
  }
  return LastScreen;
};
/*-------------------------------new Seq----------------------------------------- */

function FinishEnquiryService(tmpId, data_arr) {
  if (
    isSet(ReqObj.Form[tmpId].flags) &&
    ReqObj.Form[tmpId].flags.isFinishEnquiryHit
  )
    return;
  if (isSet(data_arr) && data_arr.sr === "gen") {
    var data = data_arr.data_res;
  } else {
    var ofr_id = ReqObj.Form[tmpId].generationId;
    var rfq_queryDestination = ReqObj.Form[tmpId].query_destination;
    var modId = modIdf;
    var data = {
      ofr_id: ofr_id,
      rfq_queryDestination: rfq_queryDestination,
      modId: modId,
    };
  }
  if (!(isSet(data_arr) && data_arr.sr === "gen"))
    ReqObj.Form[tmpId].flags.isFinishEnquiryHit = true;
  fireAjaxRequest({
    data: {
      ga: {
        s: true,
        f: true,
        gatype: "FinishEnqService",
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
      ajaxdata: data,
      ajaxtimeout: 0,
      type: 5,
      hitfinserv: "",
    },
  });
}
function finishEnqDependents(tmpId, etype) {
  var type = [1, 3, 8];
  if (isSet(ReqObj) && isSet(ReqObj.Form) && isSet(ReqObj.Form[tmpId]) && isEnq(tmpId) && type.includes(etype)) {
    ReqObj.Form[tmpId].waitFinServ -= 1;
    if (
      ReqObj.Form[tmpId].waitFinServ === 0 &&
      ReqObj.Form[tmpId].flags.isThankYouCalled
    )
      FinishEnquiryService(tmpId);
  }
}

function flagDetach(tmpId) {
  if ($("#t" + tmpId + "flagdiv2").length > 0) {
    var ele = $("#t" + tmpId + "country_dropd").detach();
    $("#t" + tmpId + "flagdiv2").append(ele);
  }
}

function addDetachedFlag(tmpId) {
  if (isSet(tmpId) && tmpId !== "") {
    flagDetach(tmpId);
  } else {
    var arr = template_array;
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      flagDetach(arr[i]);
    }
  }
}
function FlagSuggestor() {
  this.tmpId = "";
  this.fromwhere = "";
  this.hitObject = {};
}
FlagSuggestor.prototype.setFlagSuggestor = function (tmpId, fromwhere) {
  var that = this;
  that.tmpId = tmpId;
  that.fromwhere = fromwhere;
  var eleId = "t" + tmpId + "country_dropd";
  ReqObj["showcountry"] = false;

  addTemplates(tmpId, template_array);

  if (imeshExist() === "") {
    if (
      fromwhere !== "load" &&
      isSet(that.hitObject) &&
      isSet(that.hitObject[tmpId]) &&
      that.hitObject[tmpId] === true
    )
      return;
    else {
      if (
        fromwhere === "load" &&
        isSet(that.hitObject) &&
        isSet(that.hitObject[tmpId]) &&
        that.hitObject[tmpId] === true &&
        ReqObj["showcountry"]
      )
        return;
      else that.hitObject[tmpId] = true;
    }

    if (!$("#" + eleId).html()) {
      var dropdownText =
        '<dt><a><span></span><div class="as_arrow"></div></a><span class="value" ></span></dt>';
      dropdownText +=
        "<div class=\"eqAts\"><input type='text' name='" +
        tmpId +
        "' placeholder='Search..' onkeyup='javascript:filterFunction(event)' id='t" +
        tmpId +
        "_flagInput'><ul></ul></div>";
      $("#" + eleId).append(dropdownText);

      flagRes(tmpId);
      activateDropDownBl(eleId);
    }
  }
};
FlagSuggestor.prototype.setCountry = function (event, ui) {
  /* loop over templates to update the flag */
  var that = flagsugg;
  var len = isSet(template_array) ? template_array.length : 0;
  for (var i = 0; i < len; i++) {
    // if(!isSet(event)&&ui["data"].cname=="India"&&ReqObj.Form[template_array[i]]["flagcalling"]!=0){
    //     //this.valuesOnSelecting(template_array[i], ui);
    //     continue;}

    // ReqObj.Form[template_array[i]]["flagcalling"]++;
    that.selectCountryISO(template_array[i], ui);
    //if(!isSet(event))setCountryName(template_array[i]);
  }
};
FlagSuggestor.prototype.sequenceUpdate = function (event, ui) {
  /* sequence is updated, html will be formed again and suggestor will be called again as "load" */

  var toCheck = false;
  if (!imeshExist()) {
    ReqObj.TempName = "";
  }
  var len = isSet(template_array) ? template_array.length : 0;
  var isDetachCalled = false;
  for (var i = 0; i < len; i++) {
    if (isDetachCalled === false) {
      addDetachedFlag();
      isDetachCalled = true;
    }
    var id = template_array[i];
    //if ((Bl09(id) || Enq09(id)) && $("#t" + id + "flagdiv2").length) detachFlag2(id);
    if ($.inArray(template_array[i].substring(0, 2), BlPopup) === -1) {
      ReqObj.Form[template_array[i]].flags.isFlagSuggSet = false;
      //addBlLoader(template_array[i], "left"); /* when user changes from suggestor - loader must be shown check code */
      formToUpdate(template_array[i], "changeflag");
    }
    if (
      (template_array[i].substring(0, 2) === "09" &&
        $("#t" + template_array[i] + "_bewrapper").length > 0 &&
        $("#t" + template_array[i] + "_bewrapper").css("display") ===
        "block") ||
      template_array[i].substring(0, 2) === "08"
    ) {
      ReqObj.Form[template_array[i]].flags.isFlagSuggSet = false;
      // var clickid = isSet(event.path) ? event.path[4].id : event.explicitOriginalTarget.parentElement.parentElement.parentElement.parentElement.id;
      // ReqObj.Form[template_array[i]].flag_track = clickid.includes("country_dropd") ? 2 : 1;
      addBlLoader(template_array[i], "left");
      AfterFormDefaults(template_array[i], "changeflag");
      // OpenForm(ReqObj.Form[template_array[i]]);
    }
  }
};
FlagSuggestor.prototype.selectCountryISO = function (tmpId, ui) {
  var that = this;
  var formType = ReqObj.Form[tmpId].formType.toLowerCase();
  if (isSet(ui["data"]) && isSet(ui["data"].cname))
    ReqObj["CountryName"] = ui["data"].cname;
  // js errors t.data is undefined and can't read undefined reading cname
  if (isSet(ui["data"]) && isSet(ui["data"].icon_order))
    //js error cannot read properties of undefined (reading 'icon_order')
    $("#t" + tmpId + "flag dt a span").attr(
      "style",
      "background-position:0px -" + ui.data.icon_order * 11 + "px"
    ); /*  */
  that.valuesOnSelecting(tmpId, ui); /* On select values are updated */
  if (!isSet(validation)) createGlobalObject();
  if (ui.value) {
    var text = ui.data.cname === "India" ? "Mobile" : "Email";
    var maxlength = ui.data.cname === "India" ? "10" : "";
    var labeltext = ui.data.cname === "India" ? isBlInlineFr(tmpId) ? text + " Number*" : text + " Number" : isBlInlineFr(tmpId) ? text + " ID*" : text + " ID";
    if (isInactiveBL(tmpId)) {
      labeltext = ui.data.cname === "India" ? text + " Number <span class='redc'>*</span>" : text + " ID <span class='redc'>*</span>";
    }
    var label = IsChatbl(tmpId) ? "Okay, Please Share your " + labeltext : labeltext;
    var placeholder = "Enter your " + text.toLowerCase();
    if (!IsChatbl(tmpId)) {
      var helpmsg = ui.data.cname === "India" ? "number" : "email";
      $("#t" + tmpId + "_helpmsg").html(
        "Seller will contact you on this " + helpmsg
      );
    }
    pdpenqImage(tmpId) ? "" : $("#t" + tmpId + "_label-l").html(label);
    $("#t" + tmpId + "_login_field").attr("placeholder", placeholder);
    $("#t" + tmpId + "_login_field").attr("maxlength", maxlength);
    $("#t" + tmpId + "_login_field").val("");

    if (isSet(ui.data) && ui.data.cname === "India") {
      if (Enq04(tmpId)) $("#t" + tmpId + "_pdpPimg").removeClass("frUsr");
      if (isBlInlineFlag(tmpId)) {
        $("#t" + tmpId + "_blin").removeClass("flgn");
        $("#t" + tmpId + "_dliso").removeClass("bedsnone");
      }
      if (
        (tmpId.substring(0, 2) === "09" ||
          (tmpId.substring(0, 2) === "04" && isEnq(tmpId))) &&
        isSet(ReqObj.Form[tmpId].nec) &&
        isSet(ReqObj.Form[tmpId].nec.classCount)
      )
        $(
          "#t" + tmpId + "_contactinfo" + ReqObj.Form[tmpId].nec.classCount
        ).addClass("bedsnone");
      ReqObj.Form[tmpId].isTNCShownOnFirstStep = false;
      $("#t" + tmpId + "_iso")
        .attr("value", ReqObj.isoFlag)
        .removeClass("bedsnone");
      $("#t" + tmpId + "_tCond").addClass("bedsnone");
      if (!IsChatbl(tmpId) && !isSSB(tmpId)) {
        var clr =
          isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01"
            ? ""
            : isImageVidEnq(tmpId)
              ? ""
              : "background-color : rgb(0, 166, 153)";
        $("#t" + tmpId + "_submit")
          .removeAttr("disabled")
          .attr("style", clr);
      }
      // $("#t" + tmpId + "_submitdiv").attr("class", "befstgo");
      $("#t" + tmpId + "_login_field")
        .on("keypress", validation.isNumberKey)
        .removeClass("highlight-err")
        .removeClass("beemail");
      $("#t" + tmpId + "_msg_primary_info_err_login").addClass("bedsnone");
    } else {
      if (isBlInlineFlag(tmpId)) {
        $("#t" + tmpId + "_blin").addClass("flgn");
        //$("#t" + tmpId + "_dliso").addClass("bedsnone");
      }
      if (Enq04(tmpId)) $("#t" + tmpId + "_pdpPimg").addClass("frUsr");
      if (
        (tmpId.substring(0, 2) === "09" || tmpId.substring(0, 2) === "04") &&
        isSet(ReqObj.Form[tmpId].nec) &&
        isSet(ReqObj.Form[tmpId].nec.classCount)
      )
        $(
          "#t" + tmpId + "_contactinfo" + ReqObj.Form[tmpId].nec.classCount
        ).removeClass("bedsnone");
      $("#t" + tmpId + "clslog").addClass("eqFrUs");
      $("#t" + tmpId + "_iso").addClass("bedsnone");
      if (
        (isEnq(tmpId) || isBl(tmpId)) &&
        isSet(ReqObj.Form[tmpId].nec) &&
        $("#t" + tmpId + "_q_mobile_f" + ReqObj.Form[tmpId].nec.classCount)
          .length > 0
      )
        $("#t" + tmpId + "_iso")
          .attr("value", ReqObj.isoFlag)
          .removeClass("bedsnone");
      if(!IsChatBLInline(tmpId)){ // new chat bl unidentified
      ReqObj.Form[tmpId].isTNCShownOnFirstStep = true;
      ShowHideTNC(tmpId);
      }
      $("#t" + tmpId + "_login_field")
        .off("keypress")
        .removeClass("highlight-err")
        .addClass("beemail");
      $("#t" + tmpId + "_msg_primary_info_err_login").addClass("bedsnone");

      if (IsChatbl(tmpId)) {
        $("#t" + tmpId + "flag").removeClass("bedsnone");
      }
      if (isSSB(tmpId)) foreignUserTransition(tmpId, ui.data.iso);
    }
    if (IsChatbl(tmpId) && !IsChatBLInline(tmpId)) {  // new chat bl unidentified
      ShowHideTNC(tmpId);
    }
  }
};
FlagSuggestor.prototype.valuesOnSelecting = function (tmpId, ui) {
  var that = this;
  if (isSet(ui.data) && isSet(ui.data.iso) && isSet(ui.data.cname)) //js errors
    UpdateISO(ui.data.iso, ui.data.cname); /* updating ISO */
  if (isSet(ui.value)) {
    ReqObj.isoFlag =
      ui.value.substring(0, 1) === "+"
        ? ui.value
        : "+" + ui.value; /* mobile field user phcc */
  }
};

var filterFunction = function (event) {
  var tmpId = event.target.name;
  var eleId = "t" + tmpId + "country_dropd";
  var flagId = "t" + tmpId + "_flagInput";
  var input = document.getElementById(flagId);
  var filter = input.value.toUpperCase();
  var div = document.getElementById(eleId);
  var a = div.getElementsByTagName("li");

  for (var i = 0; i < a.length; i++) {
    var txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
};

var addScrollingInDdBl = function (eleId) {
  var d = "";
  $("#" + eleId + " div ul li").click(function () {
    return (
      (d = $("#" + eleId + " div ul li").index(this)),
      $("#" + eleId + " div ul li").removeClass("selected"),
      $("#" + eleId + " div ul li:eq(" + d + ")").addClass("selected"),
      $("#" + eleId)
        .children("div")
        .hide()
    );
  });
};

var activateDropDownBl = function (eleId) {
  $("#" + eleId + " dt a").click(function () {
    document.getElementById(eleId).getAttribute("disabled") ||
      ($("#" + eleId)
        .children("div")
        .toggle(),
        $("#" + eleId + " ul li:first-child").focus());
  });
  $(document).bind("click", function (e) {
    var t = $(e.target);
    if (t.context.id.substr(6) === "flagInput") return;
    t.parents().hasClass("dropdown") ||
      $("#" + eleId)
        .children("div")
        .hide();
  });
};

var flagRes = function (tmpId) {
  ReqObj.Form[tmpId].flagSuggCalledOnce = true;
  var eleId = "t" + tmpId + "country_dropd";
  var current_iso = currentISO();
  var countryText = "";
  var countryUi = "";

  $.each(flagResList, function (t) {
    flagResList[t].id = tmpId;
    if (isSet(flagResList[t].data.iso) && current_iso.toLowerCase() === flagResList[t].data.iso.toLowerCase()) {
      countryUi = flagResList[t];
    }
    countryText +=
      "<li onclick='javascript:setCountryISO(event," +
      JSON.stringify(flagResList[t]).replace(/'/g, "\xE2\u20AC\u2122") +
      ")'><span style=\"background-position:0px -" +
      11 * flagResList[t].data.icon_order +
      'px"></span><a>' +
      flagResList[t].label +
      "</a></li>";
  });

  $("#" + eleId + " ul").append(countryText);

  addScrollingInDdBl(eleId);

  if (isSet(ReqObj.Form[tmpId].flags)) {
    ReqObj.Form[tmpId].flags.isFlagSuggSet = true;
  }

  setCountryISO(undefined, countryUi);
};

function savelogin(tmpid, ui) {
  if (
    isSet(ui["data"].iso) && ui["data"].iso != "IN" &&
    $("#t" + tmpid + "_login_field")
      .attr("placeholder")
      .includes("email") &&
    notempty("#t" + tmpid + "_login_field")
  ) {
    savenem(tmpid);
  } else {
    ReqObj.Form[tmpid]["savevalue"] = { flogin: "" };
    ReqObj.Form[tmpid]["savevalue"]["fname"] = "";
  }
}

function saveQuantity(tmpid) {
  var qun = "",
    qununit = "";
  if (notempty("#t" + tmpid + "txtbx_option1")) {
    qun = $("#t" + tmpid + "txtbx_option1").val();
    qununit = $("#t" + tmpid + "txtbx_option2").val();
  }
  ReqObj.Form[tmpid].userFilledIsq = [
    { questionsDesc: "Quantity", optionsValue: qun },
    { questionsDesc: "Quantity Unit", optionsValue: qununit },
  ];
}

function notempty(id) {
  return isSet($(id).length) && $(id).val() != "";
}

function rvalue(tmpId, id) {
  if (
    isSet(ReqObj.Form[tmpId]["savevalue"]) &&
    isSet(ReqObj.Form[tmpId]["savevalue"][id]) &&
    ReqObj.Form[tmpId]["savevalue"][id] != ""
  ) {
    var loginv = ReqObj.Form[tmpId]["savevalue"][id];
    ReqObj.Form[tmpId]["savevalue"][id] = "";
    return loginv;
  } else return "";
}
function savemc(tmpid) {
  ReqObj.Form[tmpid]["savevalue"]["evalue"] = $("#t" + tmpid + "_q_email_in1")
    .length
    ? $("#t" + tmpid + "_q_email_in1").val()
    : "";
  ReqObj.Form[tmpid]["savevalue"]["cvalue"] = $("#t" + tmpid + "_q_city_oth1")
    .length
    ? $("#t" + tmpid + "_q_city_oth1").val()
    : "";
}
function savenem(tmpid) {
  ReqObj.Form[tmpid]["savevalue"] = {
    flogin: $("#t" + tmpid + "_login_field").length
      ? $("#t" + tmpid + "_login_field").val()
      : "",
  };
  ReqObj.Form[tmpid]["savevalue"]["fname"] = $("#t" + tmpid + "_q_first_nm1")
    .length
    ? $("#t" + tmpid + "_q_first_nm1").val()
    : "";
  if (isSSB(tmpid)) {
    ReqObj.Form[tmpid]["savevalue"]["mobval"] = $("#t" + tmpid + "_q_mobile_f1")
      .length
      ? $("#t" + tmpid + "_q_mobile_f1").val()
      : "";
  }
}

function setCountryISO(revent, ui) {
  var that = flagsugg;
  if (isSet(ui["data"]) && isSet(ui["data"].cname))
    ReqObj["CountryName"] = ui["data"].cname;
  // js errors t.data is undefined and can't read undefined reading cname
  if (isSet(revent) && isSet(revent.type) && revent.type == "click") {
    var tmid = ui.id;
    if (isBl(tmid) || isSSB(tmid)) {
      savelogin(tmid, ui);
      if (Bl01(tmid)) saveQuantity(tmid);
    }
  }
  that.setCountry(revent, ui);
  // if(!isSet(revent) && ui["data"].cname != "India" && ReqObj.setflag)
  if (
    !isSet(revent) &&
    isSet(ui["data"]) &&
    ui["data"].cname != "India" &&
    ReqObj.setflag
  ) {
    revent = { type: "click" };
    ReqObj.setflag = 0;
  }
  if (isSet(revent) && revent.type === "click") that.sequenceUpdate(revent, ui);
}

function UpdateISO(iso, countryName) {
  ReqObj.changeUserIso = iso;
  ReqObj.changeUserCountry = countryName;
}
function isSticky(tmpId) {
  return isSet(ReqObj.Form[tmpId].stickycss) &&
    ReqObj.Form[tmpId].stickycss === "1" &&
    ReqObj.Form[tmpId].FormSequence._stepCounter === 0
    ? true
    : false;
}
function isEnq(tmpId) {
  return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ? true : false;
}
function isBl(tmpId) {
  return Bl09(tmpId) || Bl01(tmpId) || Bl04(tmpId) ? true : false;
}
function Bl09(tmpId) {
  return tmpId.substring(0, 2) === "09" &&
    ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
    ? true
    : false;
}
function Bl04(tmpId) {
  return tmpId.substring(0, 2) === "04" &&
    ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
    ? true
    : false;
}
function isNotfoundBl(tmpId) {
  return Bl04(tmpId) && ReqObj["Form"][tmpId]["pageType"] === "Not Found";
}
function Bl01(tmpId) {
  return tmpId.substring(0, 2) === "01" &&
    ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
    isSet(ReqObj.Form[tmpId].isNewUI) &&
    ReqObj.Form[tmpId].isNewUI === "0"
    ? true
    : false;
}
function isIntentBlForm(tmpId) {
  return (Bl09(tmpId) || IsChatbl(tmpId)) &&
    isProdNamePresent(tmpId) &&
    imeshExist() !== ""
    ? true
    : false;
}

function EnqPopupDIR(tmpId) {    //next->submit
  return Enq09(tmpId) &&
    ReqObj.Form[tmpId].typeofform.toLowerCase() == "enquiry" &&
    (modIdf === "DIR" || modIdf === "STDPRD")
    ? true
    : false;
}

function Enq09(tmpId) {
  return tmpId.substring(0, 2) === "09" && isEnq(tmpId) ? true : false;
}
function Enq04(tmpId) {
  return tmpId.substring(0, 2) === "04" && isEnq(tmpId) ? true : false;
}

function ispdp(tmpId) {
  return modIdf === "PRODDTL";
}
function isDIR(tmpId) {      //inactive changes
  return (modIdf === "DIR" || modIdf === "STDPRD");
}
function isSeller(tmpId) {      //inactive changes
return modIdf === "SELLERS";
}
function recomOnInactive(tmpId){
  if(isDIR(tmpId) || ispdp(tmpId) || modIdf === "PDFIM" || isSeller(tmpId) || modIdf === "IMHOME" || modIdf === "FCP" || modIdf === "MDC" || modIdf === "CWSIM" || modIdf === "TDWIM" ){
    return true;
  }
  return false;
  }

function featOnInctive(tmpId){
  if(modIdf === "DIR" || modIdf === "IMHOME" || modIdf === "FCP"){
    return true;
  }
  return false;
}  

function pdpenq(tmpId) {
  return isEnq(tmpId) && ispdp(tmpId);
}

function pdpBL(tmpId) {
  return isBl(tmpId) && ispdp(tmpId);
}
function isLightbox(tmpId){      //lightbox
  return (                   
  isBl(tmpId) &&
 (ReqObj.Form[tmpId].ctaName.toLowerCase() === "lightbox")        
);
}

function isInactiveBL(tmpId) {     //lightbox
  return (                   //inactive changes 
    isBl(tmpId) &&
   (ReqObj.Form[tmpId].ctaName.toLowerCase() === "inactive" ||
   ReqObj.Form[tmpId].ctaName.toLowerCase() === "inactive-bl" || ReqObj.Form[tmpId].ctaName.toLowerCase() === "lightbox")       
  );
}
function getMorePh(tmpId) {     //new gmp
  return (        
    isSet(ReqObj.Form[tmpId].ctaName) && 
    (ReqObj.Form[tmpId].ctaName.toLowerCase() === "get more photos" ||
   ReqObj.Form[tmpId].ctaName.toLowerCase() === "get more photos_next" ||
   ReqObj.Form[tmpId].ctaName.toLowerCase() === "get more photos_pre") 
  );
}
function pdpenqImage(tmpId) {
  var resolution = window.innerWidth;
  return (
    resolution > 1024 &&
    isImageVidEnq(tmpId) &&
    isSet(ReqObj.Form[tmpId].isNewImage) &&
    ReqObj.Form[tmpId].isNewImage === "1"
  );
}
function direnqImage(tmpId) {
  return isImageVidEnq(tmpId) && (modIdf === "DIR");
}

function closeFormCond(tmpId) {
  return (isEnq(tmpId) || isBl(tmpId)) &&
    (!ReqObj.Form[tmpId].generationCalled ||
      !$("#t" + tmpId + "_thankDiv").hasClass("bedsnone"))
    ? true
    : false;
}

function setCountryName(tmpId) {
  if (isSet(ReqObj["CountryName"]) && $("#t" + tmpId + "country").length) {
    var ele = $("#t" + tmpId + "country_dropd").detach();
    if (ReqObj["CountryName"].includes("Lao People"))
      $("#t" + tmpId + "country").text("Lao People's Democratic Republic");
    else $("#t" + tmpId + "country").text(ReqObj["CountryName"]);
    $("#t" + tmpId + "country").append(ele);
    if ($("#t" + tmpId + "country").height() > 18) {
      $("#t" + tmpId + "country").addClass("eHcnty");
    } else {
      $("#t" + tmpId + "country").removeClass("eHcnty");
    }
  }
}

function FormCloseEnqBL(tmpId, event) {
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : (isInactiveBL(tmpId) && ispdp(tmpId)) ? "Post Buy Leads New" : "Post Buy Leads";   
       //inactive changes
  var that = ReqObj.Form[tmpId].FormSequence || {};
  var ClassesforTracking = "CloseStep:";
  ClassesforTracking += that.StepCounter + 1 + ":";
  var constructor = "";
  if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
    for (var i = 0;i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length;i++) {
      constructor += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
      if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length && i > 0)
        ClassesforTracking += "-";
      ClassesforTracking += ConstructorName( ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj );
    }
  }
  pnsCloseTrack(tmpId); 
  //inactive changes
  if(isInactiveBL(tmpId) && !ispdp(tmpId) && modIdf.toLowerCase() != "pdfim" ){
    inactiveblCloseTrack(tmpId);
  }
  
  if(isImageVidEnq(tmpId) && (that.StepCounter == 0 || that.StepCounter == 1)){   //image track
    var sampling = ReqObj.Form[tmpId].noSampling;
    ReqObj.Form[tmpId].noSampling=true;
    blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
    ReqObj.Form[tmpId].noSampling=sampling;
  }
  else
  blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
  
  if (constructor.toLowerCase() === "userverification" && Enq09(tmpId))
    blenqGATracking(form_type, "OTP1NotFilled", getEventLabel(), 1, tmpId);
  CloseForm(tmpId); // check !
}

function FormCloseStep(tmpId, event) {
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : (isInactiveBL(tmpId) && ispdp(tmpId)) ? "Post Buy Leads New" : "Post Buy Leads";     //inactive changes
  var that = ReqObj.Form[tmpId].FormSequence || {};
  var hasBedsnone = $("#t" + tmpId + "_thankDiv").hasClass("bedsnone");
  var ClassesforTracking = "CloseStep:";
  ReqObj.Form[tmpId].IsthroughClosebtn = true;
  if (ReqObj.Form[tmpId].IsbackClicked === true) {
    ReqObj.Form[tmpId].IsbackClicked = false;
    that.StepCounter += 1;
  }
  pnsCloseTrack(tmpId);
  if (!ReqObj.Form[tmpId].generationCalled || !hasBedsnone) {
    if (!ReqObj.Form[tmpId].generationCalled) {
      if (that.StepCounter > -1) {
        ClassesforTracking += that.StepCounter + 1 + ":";
        if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
          for (var i = 0; i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length; i++) {
            if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length && i > 0)
              ClassesforTracking += "-";
            ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
          }
        }
        blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
        CloseForm(tmpId);
      } else {
        CloseForm(tmpId);
      }
    } else if (!hasBedsnone) {
      that.OnCloseCounter = parseInt(that.OnCloseCounter, 10);
      that.StepCounter = parseInt(that.StepCounter, 10);
      if (that.OnCloseCounter > -1) {
        ClassesforTracking += that.StepCounter + 1 + (that.OnCloseCounter + 1) + ":";
        if (isSet(ReqObj.Form[tmpId].OnCloseArray) && isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
          for (var i = 0; i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length; i++) {
            if (i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length && i > 0)
              ClassesforTracking += "-";
            ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter][i].Obj);
          }
        }
        blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
        CloseForm(tmpId);
      } else {
        ClassesforTracking += that.StepCounter + 1 + 1 + ":ThankYou";
        CloseForm(tmpId);
      }
    }
  } else {
    var constructor = "";
    if (isSet(ReqObj.Form[tmpId].OnCloseStep) && !ReqObj.Form[tmpId].OnCloseStep) {
      ClassesforTracking += that.StepCounter + 1 + ":";
      if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
        for (var i = 0; i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length; i++) {
          if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length && i > 0)
            ClassesforTracking += "-";
          constructor += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
          ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
        }
      }
      blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
      if (isBl(tmpId) || isEnq(tmpId)) {

        // Get More Photos //new gmp
        if(ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
          if(ValidGenId(ReqObj.Form[tmpId].generationId)){
            if(getMorePh(tmpId) && (new RegExp("userverification").test(ReqObj.Form[tmpId].currentScreen.toLowerCase()) || new RegExp("requirementdtl").test(ReqObj.Form[tmpId].currentScreen.toLowerCase()) || new RegExp("isq").test(ReqObj.Form[tmpId].currentScreen.toLowerCase()) || (currentISO() !== "IN" && ReqObj.UserDetail.mb1 == "" && ( ReqObj.Form[tmpId].currentScreen.toLowerCase() == "contactdetail"|| new RegExp("requirementdtl").test(ReqObj.Form[tmpId].currentScreen.toLowerCase()))))){
              saveEnr(tmpId);
          }
        }          
        
      }


        // Get More Photos


        ReqObj.Form[tmpId].FormSequence._screen7(tmpId);
      } else ReqObj.Form[tmpId].FormSequence.OnCloseSeq(tmpId);
    } else {
      ClassesforTracking += that.StepCounter + 1 + (that.OnCloseCounter + 1) + ":";
      if (isSet(ReqObj.Form[tmpId].OnCloseArray) && isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
        if (isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
          for (var i = 0; i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length; i++) {
            if (i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length && i > 0)
              ClassesforTracking += "-";
            ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter][i].Obj);
          }
        }
      }
      blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
      ReqObj.Form[tmpId].FormSequence.OnClosegetStep(tmpId);
    }
  }
}

function Generation(arg, blIntent) {
  this.v4iilexCookie = "";
  this.imeshCookie = "";
  this.iplocCookie = "";
  this.imEqGlCookie = "";
  this.siteEntryPage = "";
  this.adcampCookie = "";
  this.emktgCookie = ""; /* */
  this.geoLocCookie = "";
  this.iso = "";
  this.arg = arg;
  this.className = "Generation";
  this.blIntent = blIntent;
}
function toFireGeneration(tmpId, type) {
  var toreturn = true;
  if (isEnq(tmpId)) {
    toreturn = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
    toreturn = isSet(type) && type === "intent" ? false : toreturn;
    if (toreturn === false && isSet(ReqObj.Form[tmpId].enqintentCalled) && ReqObj.Form[tmpId].enqintentCalled === false)
      toFireEnqIntent(tmpId);
    ReqObj.Form[tmpId].toFireIsq = toreturn === true || (toreturn === false && isSet(ReqObj.Form[tmpId].generationId) && parseInt(ReqObj.Form[tmpId].generationId) !== defaultGenerationId) ? true : false;
  } else if (isBl(tmpId)) {
    toreturn = Bl01(tmpId) && ReqObj.Form[tmpId].screenNumber < 2 && isSecondBl() && ReqObj.UserDetail["uv"] !== "V" && !ReqObj.Form[tmpId]._NCOnFrstScrn ? false : isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
    if (Bl09(tmpId) && isSecondBl() && ReqObj.UserDetail["uv"] !== "V" && _mandatDetailsFilled() && !ReqObj.Form[tmpId]._NCOnFrstScrn)
      toreturn = false;
    if (Bl04(tmpId) && isSecondBl() && ReqObj.UserDetail["uv"] !== "V") {
      if (!_mandatDetailsFilled() || (_mandatDetailsFilled() && !ReqObj.Form[tmpId]._NCOnFrstScrn && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false))
        toreturn = false;
    }

    if (toreturn === false && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false)
      toFireBLIntent(tmpId, "");
    ReqObj.Form[tmpId].toFireIsq = toreturn === true ? true : false;
  } else if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" || IsChatbl(tmpId)) {
    if (ReqObj.UserDetail["uv"] === "V" || (ReqObj.UserDetail["uv"] !== "V" && !isSecondBl()))
      toreturn = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
    if (ReqObj.UserDetail["uv"] !== "V" && isSecondBl()) toreturn = false;
    if (toreturn === false && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false)
      toFireBLIntent(tmpId, "");
    ReqObj.Form[tmpId].toFireIsq = toreturn === true ? true : false;
  } else toreturn = true;

  ReqObj.Form[tmpId].toFireIsq = isSet(ReqObj.Form[tmpId].generationId) && parseInt(ReqObj.Form[tmpId].generationId) !== defaultGenerationId ? true : ReqObj.Form[tmpId].toFireIsq;

  return toreturn;
}

function toFireBLIntent(tmpId, src) {
  var _case = IsChatbl(tmpId) && ReqObj.Form[tmpId].mcatId === "-1" && ReqObj.Form[tmpId].catId === "-1" ? 0 : 1;
  if (_case === 1 && ((isSet(src) && src === "i") || (isSet(ReqObj.Form[tmpId].FormSequence.StepCounter) && ReqObj.Form[tmpId].FormSequence.StepCounter > -2 && ReqObj.Form[tmpId].FormSequence.StepCounter < 2))) {
    new Generation(1, 1).onSubmit(tmpId);
    ReqObj.Form[tmpId].intentCalled = true;
  }
  else if (_case === 1 && IsChatBLInline(tmpId)){    // new chat bl unidentified
    var showIntent = isSet(ReqObj.Form[tmpId].FormSequence.StepCounter) && isSet(ReqObj.Form[tmpId].IsqLength) ? ReqObj.Form[tmpId].FormSequence.StepCounter - ReqObj.Form[tmpId].IsqLength + 1 : 11;
    if(ReqObj.Form[tmpId].isProdNameShown)
    showIntent-=1;
    if(showIntent > -2 && showIntent <2)
    new Generation(1, 1).onSubmit(tmpId);
    ReqObj.Form[tmpId].intentCalled = true;
  } else ReqObj.Form[tmpId].intentCalled = false;
}

function toFireEnqIntent(tmpId) {
  if ((Enq09(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0) || ((ReqObj.Form[tmpId].FormSequence._stepCounter === 1 || ReqObj.Form[tmpId].FormSequence._stepCounter === 0) && Enq04(tmpId))) {
    new Generation(1, 1).onSubmit(tmpId);
    ReqObj.Form[tmpId].enqintentCalled = true;
  } else ReqObj.Form[tmpId].enqintentCalled = false;
}
/*----------------------------------------------IntentGeneration------------------------------------------ */

function GenerateIntent(data) {
  var form_type =
    !isSet(data["form_type"]) || data["form_type"] === ""
      ? ""
      : data["form_type"];
  if (form_type === "")
    form_type =
      !isSet(data["formType"]) || data["formType"] === ""
        ? ""
        : data["formType"];
  data["form_type"] = form_type;
  var tmpId =
    parseInt(data["tmpId"]) === 0 || !isSet(data["tmpId"]) ? 0 : data["tmpId"];
  data["tmpId"] = "";
  if (
    data["form_type"].toLowerCase() !== "" &&
    data["form_type"].toLowerCase() === "bl"
  ) {
    var blIntent = data["BLIntent"].toLowerCase();
    if (isSet(blIntent) && blIntent !== "") {
      if (blIntent === "yes" && data["ctaName"].toLowerCase() === "mcat video")
        data["flag"] = 16;
      if (blIntent === "yes" && data["ctaName"].toLowerCase() !== "mcat video")
        data["flag"] = 14;
    }
  } //
  data = ObjectTrim(data);
  if (imeshExist() !== "") {
    var s = parseInt(data["flag"]) === 12 && tmpId !== 0 ? true : false;
    var f = tmpId !== 0 ? true : false;
    fireAjaxRequest({
      data: {
        ga: {
          gatype: "IntentGeneration",
          s: s,
          f: f,
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
        type: 0,
      },
    });
  }
}

function fireAjaxRequest(event) {
  var revent = event;
  var tmpId = revent.data.tmpId;
  var ajaxObj = revent.data.ajaxObj;
  var ajaxtimeout = revent.data.ajaxtimeout;
  var ajaxdata = revent.data.ajaxdata;
  var formtype = isSet(ReqObj.Form[tmpId]) ? ReqObj.Form[tmpId].formType : isSet(ajaxdata["formType"]) ? ajaxdata["formType"] : "BL";
  var form_type = formtype === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  if ((revent.data.type === 0 && isSet(ReqObj.Form[tmpId]) && isSet(modIdf) && modIdf === "PRODDTL") || (revent.data.type === 8 && pdpenq(tmpId))) {
    ajaxdata.pdp = true;
  }
  $.ajax({
    cache: false,
    url: getAjaxURL(revent),
    type: revent.data.type === 8 ? "POST" : "GET",
    timeout: ajaxtimeout,
    dataType: "json",
    crossOrigin: true,
    crossDomain: true,
    data: ajaxdata,
    success: function (res) {
      if (isSet(res)) {
        if ((isSet(res.CODE) && parseInt(res.CODE) === 200) || (isSet(res.Response) && parseInt(res.Response.Code) === 200) || (isSet(res.success) && parseInt(res.success) === 1) || (isSet(res.RESPONSE) && parseInt(res.RESPONSE.Code) === 200) || (isSet(res.RESP) && res.RESP !== "failure") || (isSet(res.queryid) && ValidGenId(res.queryid)) || (isSet(res.ofr) && ValidGenId(res.ofr)) || (isSet(res.msg) && isSet(res.msg.MESSAGE) && parseInt(res.msg.MESSAGE.CODE) === 200)) {
          OnAjaxSuccess(revent, res);
          if (revent.data.ga.s === true)
            blenqGATracking(form_type, "service:" + revent.data.ga.gatype + ":success " + revent.data.ga.source, getEventLabel(), 1, tmpId);
          if (ajaxObj !== "" && ajaxObj.s.ss === 1) {
            if (isSSB(tmpId))
              ReqObj.Form[tmpId].servicecalled.push(ConstructorName(ajaxObj.obj.fn));
            PostAjax(ajaxObj.obj, tmpId);
          }
          finishEnqDependents(tmpId, revent.data.type);
        } else {
          OnAjaxError(revent, res);
          if (revent.data.ga.f === true)
            blenqGATracking(form_type, "service:" + revent.data.ga.gatype + ":failure", res, 1, tmpId);
          if (ajaxObj !== "" && ajaxObj.s.sf.af === 1)
            Ajaxfailure(ajaxObj.obj, tmpId, revent.data.hitfinserv);
          if (ajaxObj !== "" && ajaxObj.s.sf.pa === 1)
            PostAjax(ajaxObj.obj, tmpId, revent.data.hitfinserv);
        }
      } else {
        OnAjaxError(revent, res);
        finishEnqDependents(tmpId, revent.data.type);
        if (revent.data.ga.f === true)
          blenqGATracking(form_type, "service:" + revent.data.ga.gatype + ":failure", "response undefined", 1, tmpId);
        if (ajaxObj !== "" && ajaxObj.s.f === 1)
          Ajaxfailure(ajaxObj.obj, tmpId, revent.data.hitfinserv);
        if (isSet(revent.data.key) && isSet(revent.data.key.appendedVal) && revent.data.key.appendedVal !== "")
          RemoveValFromImEqGl(revent.data.key.appendedVal);
      }
    },
    error: function (res) {
      if (ajaxObj !== "" && ajaxObj.f.f === 1)
        Ajaxfailure(ajaxObj.obj, tmpId, revent.data.hitfinserv);
      res = isSet(res) ? JSON.stringify(res) : "response undefined";
      if (revent.data.ga.f === true)
        blenqGATracking(form_type, "service:" + revent.data.ga.gatype + ":failure", res, 1, tmpId);
      OnAjaxError(revent, res);
      finishEnqDependents(tmpId, revent.data.type);
    },
    complete: function (res) {
      OnAjaxComplete(revent, res);
    },
  });
}

function getAjaxURL(event) {
  var webAddressLocation = location.hostname;
  var appsServerName = webAddressLocation.match(/^dev/)
    ? "//dev-apps.imimg.com/"
    : webAddressLocation.match(/^stg/)
      ? "//stg-apps.imimg.com/"
      : "//apps.imimg.com/";
  switch (event.data.type) {
    case 1:
      return appsServerName + "index.php?r=Newreqform/saveEnrichment";
    case 2:
      return appsServerName + "index.php?r=Newreqform/BLEnqUpdate";
    case 3:
      return appsServerName + "index.php?r=postblenq/saveIsqBlEnq";
    case 4:
      return appsServerName + "index.php?r=Newreqform/TermNCondition";
    case 5:
      return appsServerName + "index.php?r=Newreqform/FinishEnqService";
    case 6:
      return appsServerName + "index.php?r=Newreqform/GlusrUpdate";
    case 7:
      return appsServerName + "index.php?r=Newreqform/MiniDetails";
    case 0:
      return appsServerName + "index.php?r=Newreqform/IntentGeneration";
    case 8:
      return appsServerName + "index.php?r=Newreqform/Postreq";
    case 9:
      return appsServerName + "index.php?r=postblenq/McatDtl";
  }
}

function OnAjaxSuccess(revent, res) {
  switch (revent.data.type) {
    case 6:
      revent.data.ga.gatype === "GlusrUpdate"
        ? GlusrUpdateOnSuccess(revent, 0, res)
        : GlusrUpdateOnSuccess(revent, 1, res);
      break;
    case 7:
      MiniDetailsOnSuccess(revent, res);
      break;
    case 8:
      ReqObj.Form[revent.data.tmpId].formType.toLowerCase() === "enq"
        ? EnqGenOnSuccess(revent, res)
        : BLGenOnSuccess(revent, res);
      break;
    case 9:
      McatDtlOnSuccess(revent, res);
      break;
  }
}

function OnAjaxError(revent, res) {
  switch (revent.data.type) {
    case 6:
      revent.data.ga.gatype === "GlusrUpdate"
        ? GlusrUpdateOnError(revent, 0, res)
        : GlusrUpdateOnError(revent, 1, res);
      break;
    case 7:
      MiniDetailsOnError(revent, res);
      break;
    case 8:
      BlEnqOnError(revent, res);
      break;
  }
}

function OnAjaxComplete(revent, res) {
  switch (revent.data.type) {
    case 1:
      savenrflag = 1;
      break;
    case 9:
      McatDtlOnComplete(revent, res);
      break;
  }
}

/*--------------------------McatDtlOnSuccess----------------------- */

function McatDtlOnSuccess(revent, res) {
  ReqObj.mcatdtl.response = true;
  if (
    isSet(res.Response.Data) &&
    isSet(res.Response.Data.glcat_mcat_img1_250x250)
  ) {
    var img_url = res.Response.Data.glcat_mcat_img1_250x250;
    img_url = img_url.replace("http:", "");
    if (isSet(revent.data.key.cbObj) && revent.data.key.cbObj.hasCallback) {
      ReqObj.Form[revent.data.tmpId].displayImage = img_url;
    } else {
      ReqObj.mcatImage = img_url;
    }
    pushImage(ReqObj.Form[revent.data.tmpId].mcatId, img_url, "");
  }
  if (isSet(res.Response.Data) && isSet(res.Response.Data.glcat_mcat_name)) {
    var mcat_name = res.Response.Data.glcat_mcat_name;
    ReqObj.Form[revent.data.tmpId].mcatName = mcat_name;
    if (isBlInlineFr(revent.data.tmpId))
      $("#t" + revent.data.tmpId + "_mcatNameAdw").text(
        ReqObj.Form[revent.data.tmpId].mcatName
      );
    MakeRefText(revent.data.tmpId);
  }
}
/*--------------------------McatDtlOnComplete----------------------- */

function McatDtlOnComplete(revent, res) {
  ReqObj.mcatdtl.response = true;
  if (isSet(revent.data.key.cbObj) && revent.data.key.cbObj.hasCallback)
    revent.data.key.cbObj.cbfunc(revent.data.tmpId);
  $("#t" + revent.data.tmpId + "_imglodr").addClass("bedsnone");
  if (isSet(revent.data.key.left) && revent.data.key.left === 1)
    leftSideTransition(0, revent.data.tmpId, "fromservice");
}
/*-------------------------Mini Detail on Success---------------------- */
function MiniDetailsOnSuccess(revent, res) {
  ReqObj.miniDetailHit.ping = false;
  var cname =
    isSet(res.Response.Data.glusr_usr_companyname) &&
      res.Response.Data.glusr_usr_companyname !== ""
      ? false
      : true;
  ReqObj.UserDetail.cName =
    cname === false ? res.Response.Data.glusr_usr_companyname : "";
  ReqObj.UserDetail.isgst = res.Response.Data.IS_GST_AVAILABLE;
  ReqObj.UserDetail.isurl = res.Response.Data.IS_URL_AVAILABLE;
  ReqObj.gst.toask =
    isSet(res.Response.Data.IS_GST_AVAILABLE) &&
      parseInt(res.Response.Data.IS_GST_AVAILABLE) === 0
      ? true
      : false;
  ReqObj.url.toask =
    isSet(res.Response.Data.IS_URL_AVAILABLE) &&
      parseInt(res.Response.Data.IS_URL_AVAILABLE) === 0
      ? true
      : false;
  if (ReqObj.UserDetail.cName !== "") ReqObj.miniDetailHit.reply.success = true;
  else ReqObj.miniDetailHit.reply.failure = true;
  ReqObj.seller_cta = !toAskCname(revent.data.tmpId) && currentISO() == "IN";
  ReqObj.su_cta++;
  if (
    isSSB(revent.data.tmpId) &&
    ReqObj.UserDetail.cName === "" &&
    ((currentISO() === "IN" &&
      ReqObj.Form[revent.data.tmpId].prodName !== "") ||
      currentISO() !== "IN") &&
    cNameConditions(revent.data.tmpId) === true
  ) {
    onCName(revent.data.tmpId);
  } else if (!isEnq(revent.data.tmpId) && ReqObj.UserDetail.cName !== "") {
    $("#t" + revent.data.tmpId + "_cdiv").html("");
    $("#t" + revent.data.tmpId + "_cbx").addClass("bedsnone");
  }
  if (
    isSSB(revent.data.tmpId) &&
    ReqObj.url.toask === true &&
    currentISO() !== "IN" &&
    urlConditions(revent.data.tmpId).ask === true
  ) {
    onURLName(revent.data.tmpId);
  }
}

function MiniDetailsOnError(revent, res) {
  if (
    isSet(res) &&
    isSet(res.Response) &&
    isSet(res.Response.Code) &&
    parseInt(res.Response.Code) === 204 &&
    isSet(res.Response.Status) &&
    res.Response.Status.toLowerCase() === "failure"
  ) {
    ReqObj.gst.toask = true;
    ReqObj.url.toask = true;
    ReqObj.UserDetail.cName = "";
  }
}
/*-------------------------Communication Headings-------------------------------------------*/
function getEnqHeading(tmpId, fromscreen) {
  if (pdpenqImage(tmpId)) return "";
  var ctanamemodid = ReqObj.Form[tmpId].ctaName.toLowerCase().trim();
  if ( tmpId.substring(0, 2) !== "09" && ReqObj.Form[tmpId].FormSequence.StepCounter === 0 )
    return defaultCaseHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
  var fromscreen = fromscreen.toLowerCase();
  switch (fromscreen) {
    case "userlogin":
      return getLoginHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
    case "userlogincontactdetail":
      return getLoginHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
    case "contactdetail":
      return getContactHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
    case "isq":
      return getIsqHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
    case "isqrequirementdtl":
      return currentISO() === "IN" ? getBlStaticIsqReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName) : getIsqHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
    case "requirementdtl":
      return getReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
    case "blstaticques":
      return getBlStaticIsqReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
    case "contactdetailonclosein":
      return getContactDetailOnCloseInHeading( "all", tmpId, ReqObj.Form[tmpId].ctaName );
    case "contactdetailonclosenotin":
      return getContactDetailOnCloseNotInHeading( "all", tmpId, ReqObj.Form[tmpId].ctaName );
    case "userverification":
      return getUserVerificationHeading( "all", tmpId, ReqObj.Form[tmpId].ctaName );
    case "userverificationonclose":
      return getUserVerificationHeading( "all", tmpId, ReqObj.Form[tmpId].ctaName );
    case "moredetailscompanyname":
      return "Provide your company name to get quick response from supplier";
    case "moredetailsgst":
      return "Provide your GST number to get quick response from supplier";
    default:
      return defaultScreenMsg(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
  }
}

function getBLHeading(tmpId, fromscreen) {
  var iso = currentISO();
  if ( ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0)
    return "<div class='beclrW be-bgb cbl_p10 txt-cnt' style='font-size: 18px;'>Tell us what you need</div>";

  if ( tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId) && ReqObj.Form[tmpId].screenNumber < 0) {
    var heading = "Tell us what you need, and we'll help you get quotes";

    heading = iso != "IN" ? pdpBL(tmpId) ? "Save Time! Get <strong>verified exporters</strong> shipping to " + isoCountries[currentISO()] : "Save Time! Get verified sellers exporting to " + isoCountries[currentISO()] : heading;
    return heading;
  }

  var _case = (ReqObj.Form[tmpId].FormSequence._screenCounter === 0 || ReqObj.Form[tmpId].FormSequence._screenCounter === 1) && Bl04(tmpId) ? -1 : 0;

  if (iso === "IN" && _case !== -1) {
    var mainHeading = "";
    var subHeading = "";
    fromscreen = fromscreen.toLowerCase();
    if (fromscreen.includes("productname")) {
      mainHeading = "Looking to buy something?";
      subHeading = "Tell us your requirement and get free quotes from multiple sellers";
      if(isInactiveBL(tmpId)){
        mainHeading = "";
        subHeading = "Tell us your requirement and <strong>get free quotes</strong> from multiple sellers";
      }
    } else if (fromscreen === "contactdetail") {
      mainHeading = "We want to know more about you!";
      subHeading = "Please provide a few details to get quotes on your mobile";
    } else if (fromscreen === "isq") {
      mainHeading = "Share more details about your requirement";
      subHeading = "Add a few details to connect with relevant suppliers";
      if (ReqObj.Form[tmpId].prevCount > 3) {
        mainHeading = "Share more details about your requirement";
        subHeading = "Add a few more details to submit your requirement";
      }
    } else if ( fromscreen.includes("blstaticques") || fromscreen.includes("requirementdtl")) {
      mainHeading = "Few more details to get your requirement fulfilled";
      subHeading = "Share a few more information and get best quotes";
    } else if ( fromscreen.includes("contactdetail_last") || fromscreen.includes("moredetails") || fromscreen === "default") {
      mainHeading = "Just one step away to connect with verified sellers";
      subHeading = "Enter your remaining contact details";
    } else if (fromscreen === "userverification") {
      var imeshcookie = imeshExist();
      var phonenumber = "+" + usercookie.getParameterValue(imeshcookie, "phcc") + "-" + usercookie.getParameterValue(imeshcookie, "mb1");
      mainHeading = "Verify your mobile number to receive quotes";
      // subHeading = "Enter the 4 digit One Time Password (OTP) sent to your Mobile Number " + phonenumber;
    }
    let bemb = isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0 ? "befs16 beclr3 bemb8" : "befs16 blotp bemb20";
    let otphdg = isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0 ? "pdpotphdg" : "otphdg";
    return ( "<div class='"+ otphdg + "'>" + mainHeading + `</div><div class='${bemb}'>` + subHeading + "</div>" );
  } else {
    var blmsg = "Save Time! Get verified sellers ";
    blmsg += iso !== "IN" ? "exporting to " + isoCountries[iso] + "<div class='cbl_fs17 eqmb10 bemt10 beclr3'>Requirement for: <span class='befwt'>" + ReqObj.Form[tmpId].prodName + "</span></div>" : "for " + ReqObj.Form[tmpId].prodName;

    if ( tmpId.substring(0, 2) !== "09" && ReqObj.Form[tmpId].FormSequence.StepCounter === 0 && fromscreen !== "ContactDetailonclosenotin")
      return tmpId.substring(0, 2) === "04" ? "" : isSet(ReqObj.Form[tmpId].prodName) && ReqObj.Form[tmpId].prodName !== "" ? blmsg : "Tell us your requirement";
    else
      return currentISO() === "IN" ? tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId) ? "Adding few details can get you a quick response" : "Tell us what you need, and we'll help you get quotes" : pdpBL(tmpId) ? (isInactiveBL(tmpId)) ? '<div class="bemb20">Get free quotes from <strong>verified exporters</strong> shipping to ' + isoCountries[currentISO()] + '</div>' : "Receive quotations from <strong>verified exporters</strong> shipping to " + isoCountries[currentISO()] : (isInactiveBL(tmpId)) ? '<div class="bemb20">Get free quotes from <strong>verified exporters</strong> shipping to ' + isoCountries[currentISO()] + '</div>' : "Receive quotations from verified suppliers exporting to " + isoCountries[currentISO()];
  }    
}

function getChatBlHeading(tmpId, fromscreen) {
  return "Tell us your requirement to Get Best Price";
}

function getFormHeading(tmpId, fromscreen) {
  var formType = ReqObj.Form[tmpId].formType.toLowerCase();
  switch (formType) {
    case "enq":
      return getEnqHeading(tmpId, fromscreen);
    case "bl":
      return getBLHeading(tmpId, fromscreen);
    case "chatbl":
      return getChatBlHeading(tmpId, fromscreen);
  }
}
function loginGetmsg(tmpId, msg, addon) {
  var usertype = currentISO() !== "IN" ? "email" : "mobile";
  var hcls = "befwt";
  return ( returnSpan("", "", msg, hcls) + " " + addon + ' from "' + ReqObj.Form[tmpId].rcvName + '" on your ' + usertype + " quickly" );
}

function loginGetmsgSpecialCase(tmpId, msg, addon) {
  var usertype = currentISO() !== "IN" ? "email" : "mobile";
  return ( returnSpan("", "", msg, "befwt") + " " + addon + " on your " + usertype + " quickly" );
}

function loginDefaultmsg(tmpId, ctaname, msg) {
  if (isImageVidEnq(tmpId))
    return ( returnSpan("", "", "Get Best Quotes", "befwt") + " for " + ReqObj.Form[tmpId].prodName );
  else{
    if(ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e")
      return ( "<span> Please login to view Supplier's Mobile Number </span>" );
    return ( msg + '"' + returnSpan("", "", ReqObj.Form[tmpId].rcvName, "befwt") + '"' );
  }
    return ( msg + '"' + returnSpan("", "", ReqObj.Form[tmpId].rcvName, "befwt") + '"' );
}

function contactLogMsg(tmpId, ctaname, msg) {
  return msg + '"' + ReqObj.Form[tmpId].rcvName + '" for more information';
}

function contactMsg(tmpId, ctaname) {
  if (direnqImage(tmpId)) {
    return "";
  }
  else {
    if(isPnsEnq(tmpId)){
      let pnsno = isSet(ReqObj.Form[tmpId].pnsNumber) ? ReqObj.Form[tmpId].pnsNumber : "09XXXXXXXX";
      let pns_extn='';
      if(isSet(ReqObj.Form[tmpId].pns_extn) && ReqObj.Form[tmpId].pns_extn!='')
        pns_extn = `<span class="befs13">, Dial Ext. ${ReqObj.Form[tmpId].pns_extn}</span>`;
      if (ispdp(tmpId) && currentISO() === "IN"){
        pnsno = pnsno.slice(4);
        pnsno = '0' + pnsno;
      }
      if(ispdp(tmpId) && currentISO()!= "IN")
        // return "Please share more details so supplier can contact you";
        returnSpan("", "", "Please share more details so supplier can contact you", "befwt");
        //  + "<div class='mt5 vmngrey'>" + `<span class='cbl_fs17'>You can contact supplier on </span><span class='befwt cbl_fs17'>${pnsno}</span>${pns_extn}` +"</div>";
          
      // return "Supplier wants to know more about you";
      return returnSpan("", "", "Supplier wants to know more about you", "befwt");
      //  + "<div class='mt5 vmngrey'>" + `<span class='cbl_fs17'>You can contact supplier on </span><span class='befwt cbl_fs17'>${pnsno}</span>${pns_extn}` +"</div>";
    }
    return returnSpan("", "", "Supplier wants to know more about you", "befwt");
  }
}

function getLoginHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "get best quote":
      return loginGetmsg(tmpId, ctaname, "");
    case "get quote":
      return loginGetmsg(tmpId, ctaname, "");
    case "get latest price":
      return loginGetmsg(tmpId, ctaname, "and details");
    case "inlineenq":
      return loginDefaultmsg(tmpId, ctaname); //
    case "send email":
      return loginDefaultmsg(tmpId, ctaname, "Connect with "); //
    case "send sms":
      return loginDefaultmsg(tmpId, ctaname, "Connect with "); //
    case "contact seller":
      return loginGetmsgSpecialCase(tmpId, "Contact Seller", "and get details");
    case "contact seller_next":
      return loginGetmsgSpecialCase(tmpId, "Contact Seller", "and get details");
    case "contact seller_pre":
      return loginGetmsgSpecialCase(tmpId, "Contact Seller", "and get details");
    case "contact supplier":
      return loginGetmsgSpecialCase(tmpId,"Contact Supplier","and get details");
    case "click to call":
      return loginDefaultmsg(tmpId, ctaname, "Connect with "); //
    case "ask price":
      return loginGetmsg(tmpId, "Ask for price", "and details");
    case "ask for price":
      return loginGetmsg(tmpId, "Ask for price", "and details");
    case "no price":
      return loginGetmsg(tmpId, "Ask for price", "and details");
    case "request a call back":
      return loginGetmsg(tmpId, "", "Request a Call Back ");
    case "contact now":
      return contactLogMsg(tmpId, ctaname, "Contact ");

    // new case added for get more photos form  //new gmp
    case "get more photos":
      return loginGetmsg(tmpId, "Get More Photos", "and details");   
    case "get more photos_next":
      return loginGetmsg(tmpId, "Get More Photos", "and details");
    case "get more photos_pre":          
      return loginGetmsg(tmpId, "Get More Photos", "and details");      

    default:
      return loginDefaultmsg(tmpId, ctaname, "Connect with ");
  }
}

function getContactHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "all":
      return contactMsg(tmpId, ctaname);
    /*Do not remove this code*/
    // case "get best quote": return loginDefaultmsg(tmpId, ctaname);
    // case "get quote": return loginDefaultmsg(tmpId, ctaname);
    // case "get latest price": return loginDefaultmsg(tmpId, ctaname);
    // case "inlineenq": return loginDefaultmsg(tmpId, ctaname);
    // case "send email": return loginDefaultmsg(tmpId, ctaname);
    // case "send sms": return loginDefaultmsg(tmpId, ctaname);
    // case "contact seller": return loginDefaultmsg(tmpId, ctaname);
    // case "contact seller_next": return loginDefaultmsg(tmpId, ctaname);
    // case "contact seller_pre": return loginDefaultmsg(tmpId, ctaname);
    // case "click to call": return loginDefaultmsg(tmpId, ctaname);
    // case "ask price": return loginDefaultmsg(tmpId, "Ask Price");
    // case "ask for price": return loginDefaultmsg(tmpId, "Ask Price");
    // case "no price": return loginDefaultmsg(tmpId, "Ask Price");
    // case "request a call back": return loginGetmsg(tmpId, "", "get a Call Back");
    // case "contact now": return contactLogMsg(tmpId, ctaname, "Contact ");
    /* Do not remove this code*/
    default:
      return loginDefaultmsg(tmpId, ctaname, "Connect with ");
  }
}

function returnIsqHeading(tmpId, ctaname) {
  return isSet(ReqObj.Form[tmpId].ctaheadingappend) && ReqObj.Form[tmpId].ctaheadingappend === true ? returnSpan("", "", ctaname, "befwt") + "\n" + " by adding a few details of your requirement" : "Adding a few details of your requirement can get you quick response from the supplier";
}

function getIsqHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "get best quote":
      return returnIsqHeading(tmpId, "Get Best Quote");
    case "get quote":
      return returnIsqHeading(tmpId, "Get Quote");
    case "get latest price":
      return returnIsqHeading(tmpId, "Get Latest Price");
    case "contact seller":
      return returnIsqHeading(tmpId, "Contact Seller");
    case "contact seller_next":
      return returnIsqHeading(tmpId, "Contact Seller");
    case "contact seller_pre":
      return returnIsqHeading(tmpId, "Contact Seller");
    case "contact supplier":
      return returnIsqHeading(tmpId, "Contact Supplier");
    case "ask price":
      return returnIsqHeading(tmpId, "Ask Price");
    case "ask for price":
      return returnIsqHeading(tmpId, "Ask for price");
    //case 'all': return "Adding a few details of your requirement can get you quick response from the supplier";
    default:
      if (direnqImage(tmpId)) {
        return "";
      }
      else {
        if(isPnsEnq(tmpId)){
          let pnsno = isSet(ReqObj.Form[tmpId].pnsNumber) ? ReqObj.Form[tmpId].pnsNumber : "09XXXXXXXX";
          let pns_extn='';
          if(isSet(ReqObj.Form[tmpId].pns_extn) && ReqObj.Form[tmpId].pns_extn!='')
            pns_extn = `<span class="befs13">, Dial Ext. ${ReqObj.Form[tmpId].pns_extn}</span>`;
          if (ispdp(tmpId) && currentISO() === "IN"){
            pnsno = pnsno.slice(4)
            pnsno = '0' + pnsno;
          }
          return "Adding a few details of your requirement can get you quick response from the supplier";
          //  + "<div class='mt5 vmngrey'>" + `<span class='cbl_fs17'>You can contact supplier on </span><span class='befwt cbl_fs17'>${pnsno}</span>${pns_extn}` +"</div>";
        }
        //new gmp
        return getMorePh(tmpId) ? ReqObj.Form[tmpId].FormSequence.StepCounter === 0 ?"Add a few details of your requirement to <strong>get more photos</strong> and details from the seller quickly" : "Add a few details of your requirement to get more photos and details from the seller quickly" : "Adding a few details of your requirement can get you quick response from the supplier";
        // return "Adding a few details of your requirement can get you quick response from the supplier";
      }

  }
}
function defaultCaseHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "sticky right":
      return "";
    default:
      return isSet(ReqObj.Form[tmpId].heading) && ReqObj.Form[tmpId].heading.trim() !== "" ? ReqObj.Form[tmpId].heading : "Send Enquiry to the Seller";
  }
}

//
/*
 * DO NOT REMOVE
 * touch at your own risk
 */
var defaultGenerationId = 1;
var flagsugg = new FlagSuggestor();
var usercookie = new UserCookie();
/*
 * DO NOT REMOVE
 * touch at your own risk
 */

function ClearSeqArrays(tmpId) {
  ReqObj.Form[tmpId]["UiArray"] = [];
  ReqObj.Form[tmpId]["ServiceSequence"] = [];
  ReqObj.Form[tmpId]["HitArray"] = [];
  ReqObj.Form[tmpId]["OnCloseArray"] = [];
}

function IsqKeys(tmpId) {
  ReqObj.Form[tmpId].IsqArray = "";
  ReqObj.Form[tmpId].prevCount = 0;
  ReqObj.Form[tmpId].stopper = 0;
  ReqObj.Form[tmpId].IsqLength = 0;
  ReqObj.Form[tmpId].IsqDiv = 0;
  ReqObj.Form[tmpId].isqScreen = 0;
  ReqObj.Form[tmpId].isqSubmitted = 0;
  ReqObj.Form[tmpId].questionCount = 0;
  ReqObj.Form[tmpId].questionsId = [];
  ReqObj.Form[tmpId].questionsDesc = [];
  ReqObj.Form[tmpId].optionsId = [];
  ReqObj.Form[tmpId].optionsValue = [];
  ReqObj.Form[tmpId].Isq = {};
  ReqObj.Form[tmpId].Isq.CurrentPageQuestions = [];
  ReqObj.Form[tmpId].Isq.CurrentScreenAnswers = "";
  ReqObj.Form[tmpId].toGetCurrentPagestring = false;
  ReqObj.Form[tmpId].toGetQuestionsOnly = false;
  ReqObj.Form[tmpId].Isq.getIsqQuestionString = [];
  ReqObj.Form[tmpId].Isq.currentQuestionString = [];
  ReqObj.Form[tmpId].requireNow = false;
  ReqObj.Form[tmpId].isQuantIsq = false;
  ReqObj.Form[tmpId].isQtutShown = false;
  ReqObj.Form[tmpId].QtUtError = false;
  ReqObj.Form[tmpId].qutAnswers = [];
  ReqObj.Form[tmpId].IsqQtUtEvents = {
    onselect: false,
  };
  ReqObj.Form[tmpId].unitSuggester = []; // empty array while initialising
  ReqObj.Form[tmpId].qtutchange = {
    quantity: "empty",
    unit: "prefilled",
  }; // fine
  ReqObj.Form[tmpId].qtUtQuesPresent = false;
  ReqObj.Form[tmpId].noSampling = false;
}

function ContactDetailKeys(tmpId) {
  ReqObj.Form[tmpId].ContactDetail = {};
}

function RdBoxKeys(tmpId, reqBx) {
  ReqObj.Form[tmpId].ReqDtlBox = isSet(ReqObj.Form[tmpId].ReqDtlBox)
    ? ReqObj.Form[tmpId].ReqDtlBox
    : "";
  ReqObj.Form[tmpId].flags.isDescDivShown =
    isSet(reqBx) && reqBx !== "" ? reqBx : false;
  ReqObj.Form[tmpId].ReqDtl = {};

  // ReqObj.Form[tmpId].IsCheckboxChecked = false;
  // ReqObj.Form[tmpId].flags.isDescDivShown = false;
}

function EnrichKeys(tmpId) {
  ReqObj.Form[tmpId].EnrichmentVal = "";

  ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown = false;
  ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
  // ReqObj.Form[tmpId].IsCheckboxChecked = false;
  // ReqObj.Form[tmpId].flags.isDescDivShown = false;
}

function PropertyDefault(tmpId, templateDefaults) {
  ReqObj.Form[tmpId].mcatName = ReturnCorrectVal(templateDefaults.mcatName, "");
  ReqObj.Form[tmpId].mcatId = ReturnCorrectVal(templateDefaults.mcatId, "-1");
  ReqObj.Form[tmpId].catId = ReturnCorrectVal(templateDefaults.catId, "-1");
  ReqObj.Form[tmpId].modId = ReturnCorrectVal(templateDefaults.modId, "DIR");
  modIdf = ReqObj.Form[tmpId].modId;
  ReqObj.Form[tmpId].ctaType = ReturnCorrectVal(
    templateDefaults.ctaType,
    "other"
  );
  ReqObj.Form[tmpId].plsqArr = ReturnCorrectVal(templateDefaults.plsqArr, "");
  ReqObj.Form[tmpId].userFilledIsq = ReturnCorrectVal(
    templateDefaults.userFilledIsq,
    []
  );
  ReqObj.Form[tmpId].ordr_qnty_index = ReturnCorrectVal(
    templateDefaults.ordr_qnty_index,
    ""
  );
  ReqObj.Form[tmpId].currentclassCount = 0;
  ReqObj.Form[tmpId].pvTrackingFired = false;
  ReqObj.Form[tmpId].populate = true;
  ReqObj.Form[tmpId].intentCalled = false;
  ReqObj.Form[tmpId].enqintentCalled = false;
  ReqObj.Form[tmpId].glusrService = {
    times: 0,
    toCall: false,
    isPhone: false,
    isName: false,
  };
  ReqObj.Form[tmpId].nec = { classCount: 0 };
  ReqObj.Form[tmpId].defSubmit = {
    todo: true,
    eve: "",
    blurfired: false,
    subfired: false,
    loginfval: "",
  };
  ReqObj.Form[tmpId].showAttachment = isSet(templateDefaults.showAttachment)
    ? templateDefaults.showAttachment
    : "-1";
  ReqObj.Form[tmpId].toFireEscTracking = updateToFireEscTrackingKey(tmpId);
  (ReqObj.Form[tmpId].cName = {
    prodServ: "",
    toask: false,
    qtut: false, // qtut condition
    tov: false, // tov condition
    rb: false, // reselling/business condition
    tov1: false, // if user selects larger that 1 lac
    isIN: false, // if not not indian - don't ask
    isq: false, // if isq fails , ask company name
    isShown: false,
    cdiv: false,
    fs: false, // fireservice
    chtml: false,
    cnameId: "",
  }),
    (ReqObj.Form[tmpId].flagSuggCalledOnce = false);
  ReqObj.Form[tmpId].gst = {
    html: false,
    number: 0,
  };
  ReqObj.Form[tmpId].url = {
    html: false,
    name: "",
    isq: "",
    rbox: "",
  };
  ReqObj.Form[tmpId].isqMcat = -1;
  //set default afflid here for chat bl
  if (isSet(ReqObj.Form[tmpId].formType)) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl") {
      ReqObj.Form[tmpId].afflId = ReturnCorrectVal(templateDefaults.afflId, 0);
      ReqObj.Form[tmpId].BLIntent = ReturnCorrectVal(
        templateDefaults.BLIntent,
        ""
      );
    } else {
      ReqObj.Form[tmpId].reqSent = ReturnCorrectVal(
        templateDefaults.reqSent,
        ""
      );
    }
  }

  ReqObj.Form[tmpId].insert = ReturnCorrectVal(templateDefaults.insert, "I");
}

function StaticIsqKeys(tmpId) {
  ReqObj.Form[tmpId].Static = {
    questionsId: [],
    questionsDesc: [],
    optionsId: [],
    optionsValue: [],
  };
}

function ChatBlKeys(tmpId) {
  /* Should be POP-UP not inline change tmpIds accordingly */
  if (IsChatbl(tmpId)) {
    // ReqObj.Form[tmpId].classfortracking = "";
    // ReqObj.Form[tmpId].prevClass = "";
    ReqObj.Form[tmpId].UserInputs = {
      CountryName: "",
      IsCountry: "",
      IsProduct: "",
      ProductName: "",
      PrimaryInfo: "",
      Name: "",
      Mobile: "",
      Email: "",
      City: "",
      CityId: "",
      Requirement: "",
      OTP: "",
      toChange: "",
      Company: "",
      GST: "",
    };
  }
}

function setTemplateDefaultValue(tempId, instId, templateDefaults, reqBx) {
  var tmpId = tempId + instId;

  //should be called once
  PropertyDefault(tmpId, templateDefaults);

  //both times
  IsqKeys(tmpId);
  RdBoxKeys(tmpId, reqBx);
  EnrichKeys(tmpId);
  StaticIsqKeys(tmpId);
  ContactDetailKeys(tmpId);

  ReqObj.Form[tmpId].cityOth = "";
  ReqObj.Form[tmpId].generationCalled = false;
  // ReqObj.Form[tmpId].sequenceUpdate = false;

  ReqObj.userType = "";
  // ReqObj.Form[tmpId].customHeadline = ReturnCorrectVal(templateDefaults.customHeadline, "");
  // ReqObj.Form[tmpId].isGaSet = false;

  //once
  MakeRefText(tmpId);

  ReqObj.Form[tmpId].selectPrdTitle = function (event, ui) {
    selectTitle(tmpId, ui);
  };
  // if (isSet(ReqObj.Form[tmpId].flags) && !ReqObj.Form[tmpId].flags.isFlagSuggSet) {
  //   flagsugg.setFlagSuggestor(tmpId);
  // } /* No need after flag called from show step */
}

function initializeForm(formArray) {
  createGlobalObject();
  // var ImageCalled = false;
  //var iplocCalled = false;
  if(isSet(ReqObj)) ReqObj.isAddSlot = 0;
  if (isSet(formArray)) {
    for (var i = 0; i < formArray.length; i++) {
      if (isSet(formArray[i]) && formArray[i] !== "") {
        if ( $.inArray(formArray[i].tempId, BlPopup) === -1 || $.inArray(formArray[i].tempId, EnqPopup) === -1) {
          OpenForm(formArray[i]);
          if ( !(isSet(formArray[i].displayImage) && formArray[i].displayImage !== "") && ( isSet(ReqObj) && typeof ReqObj.ImageCalled === "undefined" && formArray[i].formType.toLowerCase() === "bl") ) {
            // if ( (isSet(formArray[i].displayImage) && formArray[i].displayImage !== "") || (isSet(formArray[i].zoomImage) && formArray[i].zoomImage !== "") || (!ImageCalled && formArray[i].formType.toLowerCase() === "bl") ) {
            ReqObj.ImageCalled = true;
            getMcatImage(formArray[i].tempId + formArray[i].instId, {
              hasCallback: false,
            });
          }
          // if (!iplocCalled) {
          //   iplocCalled = true;
          //   new IpLoc(formArray[i].tempId + formArray[i].instId);
          // }
        }
      } else continue;
    }
  }
}
function updateToFireEscTrackingKey(tmpId) {
  if (tmpId.substring(0, 2) === "09") {
    return true;
  } else if (IsChatbl(tmpId)) {
    return true;
  } else if ( tmpId.substring(0, 2) !== "09" && $("#t" + tmpId + "_enrichform_maindiv").html() === "" ) {
    return false;
  } else return true;
}
/**-------------------new seq----------------------------- */
function EnquireNow() {
  this.className = "EnquireNow";
  this.enquirehtml = "";
}
EnquireNow.prototype.hasHtml = function (EnquireObj) {
  var IsqBoxSuffixHtmlObj = {
    SuffixOuterHtml: "<div  id='t" + EnquireObj.tmpId + "_enqnow'>",
    SuffixClosingHtml: "</div>",
    suffix: "_isqBox",
  };
  this.enquirehtml = MakeWrapper(
    [[returnEnquireNowHtml(EnquireObj.tmpId)]],
    EnquireObj.tmpId,
    IsqBoxSuffixHtmlObj,
    ""
  );
  EnquireObj.that.NumberofClassCalled -= 1;
  if (this.enquirehtml !== "") {
    ReqObj.Form[EnquireObj.tmpId].currentclassCount++;
    this.ifHtmlPresent(EnquireObj);
  } else {
    this.ifHtmlNotPresent(EnquireObj);
  }
  if (this.enquirehtml !== "") return true;
  else return false;
};
EnquireNow.prototype.ifHtmlPresent = function (EnquireObj) {
  AttachObject(EnquireObj.object, EnquireObj.tmpId);
  if (isSet(EnquireObj.AfterService)) {
    for (var i = 0; i < EnquireObj.AfterService.length; i++) {
      EnquireObj.that.MakeSeq(EnquireObj.AfterService[i], EnquireObj.tmpId);
    }
  }
  if (EnquireObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(EnquireObj, EnquireObj.tmpId);
  }
};
EnquireNow.prototype.ifHtmlNotPresent = function (EnquireObj) {
  if (EnquireObj.hasFallback) {
    CreateSeq(EnquireObj.FallbackObj);
  }
};
EnquireNow.prototype.displayHtml = function (tmpId) {
  return this.enquirehtml;
};
EnquireNow.prototype.onSubmit = function (tmpId) {
  var enqNow = PreAjax("EnquireNow", tmpId);
};
EnquireNow.prototype.validate = function (tmpId) {
  return true;
};
EnquireNow.prototype.handleButton = function (tmpId) {
  ButtonNameUI("enquirenow", tmpId);
};

/**-------------------new seq----------------------------- */
function Isq(tmpId) {
  this.templateId = "t" + tmpId;
  this.className = "Isq";
  ReqObj.Form[tmpId].preFilledIsq = {};
  StructureIsq(tmpId); // to check for prefilled isq's
  this.IsqScreen = -1;
  this.countISQUpdated = false;
}

Isq.prototype.hasHtml = function (IsqObject) {
  if (isSet(IsqObject)) {
    ReqObj.Form[IsqObject.tmpId].Isq.HasHtmlCalled = true;
    GetIsqFromObj(IsqObject.tmpId);
    if (ReqObj.Form[IsqObject.tmpId].IsqArray === "") {
      ReqObj.Form[IsqObject.tmpId].GlobalIsqObject.IsqObject = IsqObject;
    } else {
      if (
        isSet(ReqObj.Form[IsqObject.tmpId].GlobalIsqObject) &&
        typeof ReqObj.Form[IsqObject.tmpId].GlobalIsqObject.AttachingObject ===
        "function"
      )
        ReqObj.Form[IsqObject.tmpId].GlobalIsqObject.AttachingObject(IsqObject);
    }
  }
};

Isq.prototype.defaultEvents = function (tmpId) {
  ChatblfooterAns(tmpId);

  qtutEvents(tmpId);
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ||ReqObj.Form[tmpId].formType.toLowerCase() === "enq")
    qtutUI(tmpId);
  if (ReqObj.Form[tmpId].locisqId.length) {
    for (var i = 0; i < ReqObj.Form[tmpId].locisqId.length; i++)
      citySugg(tmpId, ReqObj.Form[tmpId].locisqId[i]);
  }
  SelectBoxEvents(tmpId);
  InputBoxEvents(tmpId);
  InputBoxAutoFocus(tmpId);
  CheckBoxClick(tmpId);
  RadioClick(tmpId);
  if (isSSB(tmpId)) onCName(tmpId, "", "isq");
  $(".t" + tmpId + "other_radiotemp").off("click").on("click", function (event) {
      if ($(this).hasClass("t" + tmpId + "be-radioboxtemp")) {
        $(this).siblings().each(function () {
          if ($(this).parent().css("display") === "block") {
            isRadioOtherClicked(this);
          }
        });
      }
    });

  if (GenerationOnClick(tmpId)) this.validate(tmpId, 1);

  if (imeshExist() !== "" && !isInactiveBL(tmpId))
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");

  if ((ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||ReqObj.Form[tmpId].typeofform.toLowerCase() === "video") &&ReqObj.Form[tmpId].FormSequence.StepCounter === 0) {
    $("#t" + tmpId + "_question").addClass("qtunfrst");
    $("#t" + tmpId + "_question").addClass("mvta");
    $("#t" + tmpId + "ques2").addClass("bedsnone");
  } else {
    $("#t" + tmpId + "_question").removeClass("qtunfrst");
    $("#t" + tmpId + "_question").removeClass("mvta");
    $("#t" + tmpId + "ques2").removeClass("bedsnone");
  }
  get_buyer_info(tmpId);

  //hide pns unidentified user
  if (isPnsEnq(tmpId) ) $(".pnsEnq").show();
  //next->submit
  if ( EnqPopupDIR(tmpId) && ReqObj.Form[tmpId].toShowMsg && $("#yajaca").css("display") == "none" ) {
    $("#yajaca").show();
    $("#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input").addClass("toConv");
    // this.inputText=$("input.toConv").attr("value");
    $("input.toConv").attr("value", "Submit");
    ReqObj.Form[tmpId].toShowMsg = 0;
    ReqObj.Form[tmpId].msgFromOtp = 0;
  }
  //mob track  
  if(currentISO() === "IN"){
    if(isSet(ReqObj.Form[tmpId].mobEntered) && ReqObj.Form[tmpId].mobEntered==1){    
      mobEnteredTrack(tmpId,"ISQ");       
    }
  }
  else{
    if(isSet(ReqObj.Form[tmpId].emailEntered) && ReqObj.Form[tmpId].emailEntered==1){    
      emailEnteredTrack(tmpId,"ISQ");       
    }
  }

  this.handleUI({
    data: {
      tmpId: tmpId,
      obj: this,
    },
  });
};
Isq.prototype.handleUI = function (event) {
  if ( isSet(ReqObj.Form[event.data.tmpId].isQuantIsq) && ReqObj.Form[event.data.tmpId].isQuantIsq !== "" && ReqObj.Form[event.data.tmpId].isQuantIsq === true ) {
    $("#t" + event.data.tmpId + "_interested").html("Enter required quantity to ");
    $("#t" + event.data.tmpId + "_getbestrest").html("");
  }
};

Isq.prototype.handleHeading = function (tmpId) {
  ReqObj.Form[tmpId].ctaheadingappend = false;
  if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq"){
    if(isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0){
      $("#blheading").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
    else{
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
  }
  else {
    if (ReqObj.Form[tmpId].currentScreen.toLowerCase() === "isq" ||ReqObj.Form[tmpId].currentScreen.toLowerCase() === "isqmoredetails")  {
      if ( $("#isq_first_screen").attr("type") === "hidden" && $("#isq_first_screen").attr("value") === "Screen1") {
        ReqObj.Form[tmpId].ctaheadingappend = ReqObj.Form[tmpId].FormSequence.StepCounter === 0 ? true : false;
        if ( isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0)
          $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
        else
          $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "isq"));
      } else {
        if ( isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0 )
          $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
        else
          $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "IsqRequirementDtl"));
      }
    }
  }
};

Isq.prototype.handleButton = function (tmpId) {
  ButtonNameUI("isq", tmpId);
};

Isq.prototype.AttachingObject = function (IsqObject) {
  if (isSet(IsqObject)) {
    var type = currentISO() !== "IN" && Enq09(IsqObject.tmpId) ? false : true;
    if (Enq04(IsqObject.tmpId) || isBl(IsqObject.tmpId)) type = false;
    if (ReqObj.Form[IsqObject.tmpId].IsqArray !== null && ReqObj.Form[IsqObject.tmpId].prevCount !== ReqObj.Form[IsqObject.tmpId].IsqLength) {
      IsqObject.that.NumberofClassCalled -= 1;
      AttachObject(IsqObject.object, IsqObject.tmpId); // attach object to ui or service accordingly
      if (isSet(IsqObject.AfterService)) {
        for (var i = 0; i < IsqObject.AfterService.length; i++) {
          if (typeof IsqObject.that.MakeSeq === "function")
            IsqObject.that.MakeSeq(IsqObject.AfterService[i], IsqObject.tmpId);
        }
      }
      if (isImageVidEnq(IsqObject.tmpId) && ReqObj.Form[IsqObject.tmpId].FormSequence.StepCounter === -1) {
        // not yet 0
        if (IsqObject.that.NumberofClassCalled === 0) {
          // this is required because whenever NumberOfClassCalled is 0 sequnece is called to show steps
          makeFinalSeq(IsqObject, IsqObject.tmpId);
        }
      } else if (isSSB(IsqObject.tmpId)) {
        isqNextSequence(IsqObject);
      } else if (type === true && !isBlInline(IsqObject.tmpId) &&
        ((isImageVidEnq(IsqObject.tmpId) &&
          ReqObj.Form[IsqObject.tmpId].isQtutShown &&
          ReqObj.Form[IsqObject.tmpId].FormSequence.StepCounter === 0) ||
          (isSet(ReqObj.Form[IsqObject.tmpId].formType) &&
            (ReqObj.Form[IsqObject.tmpId].formType.toLowerCase() === "enq" ||
              ReqObj.Form[IsqObject.tmpId].formType.toLowerCase() === "bl") &&
            (ReqObj.Form[IsqObject.tmpId].IsqLength -
              ReqObj.Form[IsqObject.tmpId].prevCount <
              3 ||
              currentISO() !== "IN"))) &&
        (ShowReqBox(IsqObject.tmpId) || cNameConditions(IsqObject.tmpId))
      ) {
        // If 'to show' isq is less than 3 ; enq ; showreq return true show reqbox with it -
        if (currentISO() !== "IN") {
          ReqObj.Form[IsqObject.tmpId].currentclassCount++;
          this.countISQUpdated = true;
        } // for isq object
        var countlastUpdated =
          currentISO() !== "IN" && IsqObject.last === true ? true : false; // last is true
        IsqObject.that.NumberofClassCalled += 1; //change acc to condition
        var hooks = {
          pre: [],
          post: [],
        };
        if (IsqObject.last === true) {
          IsqObject.that.NumberofClassCalled += 1;
          if (currentISO() !== "IN")
            ReqObj.Form[IsqObject.tmpId].currentclassCount++;
        }
        var md = toAskMoreDetails(IsqObject.tmpId);
        var mdObj = returnmdtlObject(
          IsqObject.object.array,
          IsqObject.object.hooks,
          IsqObject.tmpId,
          IsqObject.that,
          countlastUpdated,
          md
        );
        var RdObj = {
          object: {
            obj: new RequirementDtl(IsqObject.tmpId),
            toReplace: true,
            isService: false,
            array: IsqObject.object.array,
            hooks: hooks,
            countlastUpdated: countlastUpdated,
          },
          tmpId: IsqObject.tmpId,
          that: IsqObject.that,
          AfterService: [],
          hasFallback: false,
          FallbackObj: null,
        };
        var cn = cNameConditions(IsqObject.tmpId);
        var toCall = true;
        if (IsqObject.last === true) {
          if (
            md.ask === false ||
            (md.ask === true &&
              ReqObj.Form[IsqObject.tmpId].currentclassCount === 4)
          ) {
            IsqObject.that.NumberofClassCalled -= 1;
            toCall = false;
          }
          if (ShowReqBox(IsqObject.tmpId)) CreateSeq(RdObj);
          else IsqObject.that.NumberofClassCalled -= 1;
          if (
            md.ask === true &&
            toCall === true &&
            ReqObj.Form[IsqObject.tmpId].currentclassCount < 5 &&
            !isEnq(IsqObject.tmpId) &&
            !isBl(IsqObject.tmpId)
          )
            CreateSeq(mdObj);
        } else if (ShowReqBox(IsqObject.tmpId)) {
          if (pdpenq(IsqObject.tmpId)) {
            if (ReqObj.Form[IsqObject.tmpId].onsuccess)
              makeFinalSeq(IsqObject, IsqObject.tmpId);
            IsqObject.that.NumberofClassCalled -= 1;
          } else CreateSeq(RdObj);
        } else if (
          md.ask === true &&
          toCall === true &&
          !isEnq(IsqObject.tmpId) &&
          !isBl(IsqObject.tmpId)
        ) {
          CreateSeq(mdObj);
        } else makeFinalSeq(IsqObject, IsqObject.tmpId);
      } else if (IsqObject.that.NumberofClassCalled === 0) {
        // this is required because whenever NumberOfClassCalled is 0 sequnece is called to show steps
        if ((isBlInline(IsqObject.tmpId) || ((Bl09(IsqObject.tmpId) || Bl04(IsqObject.tmpId)) && currentISO() !== "IN" && !isInactiveBL(IsqObject.tmpId))) && ShowReqBox(IsqObject.tmpId)) {
          if (Bl04(IsqObject.tmpId) || Bl09(IsqObject.tmpId)) {
            var flen = IsqObject.FallbackObj.length;
            IsqObject.that.NumberofClassCalled += flen + 1;
            for (i = 0; i < flen; i++) CreateSeq(IsqObject.FallbackObj[i]);
            IsqObject.that.NumberofClassCalled -= 1;
          } else {
            IsqObject.that.NumberofClassCalled += 2;
            CreateSeq(IsqObject.FallbackObj);
            IsqObject.that.NumberofClassCalled -= 1;
          }
        }
        if (isInactiveBL(IsqObject.tmpId) && currentISO() != 'IN') {
          let qut = 0;
          for (let i = 0; i < ReqObj.Form[IsqObject.tmpId].IsqArray.length; i++) {
            if (ReqObj.Form[IsqObject.tmpId].IsqArray[i].length > 1) {
              if (ReqObj.Form[IsqObject.tmpId].IsqArray[i][0].IM_SPEC_MASTER_DESC == "Quantity") {
                qut = 1;
                break;
              }
            }
          }
          if (qut == 0) {
            var flen = IsqObject.FallbackObj.length;
            IsqObject.that.NumberofClassCalled += flen + 1;
            for (i = 0; i < flen; i++) CreateSeq(IsqObject.FallbackObj[i]);
            IsqObject.that.NumberofClassCalled -= 1;
          }
        }
        makeFinalSeq(IsqObject, IsqObject.tmpId);
      }
    } else {
      if (IsqObject.hasFallback) {
        // abhi tk no use ???
        if (
          isBlInline(IsqObject.tmpId) &&
          ReqObj.Form[IsqObject.tmpId].IsqArray === null &&
          IsqObject.that.NumberofClassCalled > 1
        ) {
          IsqObject.that.NumberofClassCalled -= 1;
        }
        if (isSet(IsqObject.Thankyou) && IsqObject.Thankyou) {
          if (
            isSet(ReqObj.Form[IsqObject.tmpId].FormSequence) &&
            typeof ReqObj.Form[IsqObject.tmpId].FormSequence.OnCloseSeq ===
            "function"
          )
            ReqObj.Form[IsqObject.tmpId].FormSequence.OnCloseSeq(
              IsqObject.tmpId
            ); // on close sequence is called
        } else if (isSSB(IsqObject.tmpId)) {
          IsqObject.that.NumberofClassCalled -= 1;
          isqNextSequence(IsqObject);
        } else if (
          currentISO() !== "IN" &&
          (isEnq(IsqObject.tmpId) || Bl04(IsqObject.tmpId)) &&
          ReqObj.Form[IsqObject.tmpId].ReqDtl.HasHtmlCalled
        ) {
          IsqObject.that.NumberofClassCalled -= 1;
          makeFinalSeq(IsqObject, IsqObject.tmpId);
        }
        else if (Bl04(IsqObject.tmpId)) {
          IsqObject.that.NumberofClassCalled -= 1;
          makeFinalSeq(IsqObject, IsqObject.tmpId);
        }

        Bl09(IsqObject.tmpId)
          ? CreateSeq(IsqObject.FallbackObj[0])
          : CreateSeq(IsqObject.FallbackObj);
      } else {
        if (
          isSet(IsqObject.nextStep) &&
          typeof IsqObject.nextStep === "function"
        )
          IsqObject.nextStep.apply(ReqObj.Form[IsqObject.tmpId].FormSequence); // is next step available FormSequence for next step is called
      }
    }
  }
};
Isq.prototype.resetClass = function (tmpId) {
  if (ReqObj.Form[tmpId].prevCount > ReqObj.Form[tmpId].IsqStep1) {
    ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStepN;

    //isqstepn
  } else {
    ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStep1;
    //isqstep1
  }
};

Isq.prototype.validate = function (tmpId, updatedCounter) {
  if (updatedCounter !== 1 && (!ReqObj.Form[tmpId].isret || this.IsqScreen < 0))
    this.IsqScreen++;
  ReqObj.Form[tmpId].isret = 0;
  if (
    isImageVidEnq(tmpId) &&
    ReqObj.Form[tmpId].FormSequence.StepCounter === 0 &&
    ReqObj.Form[tmpId].qtUtQuesPresent === false
  )
    this.IsqScreen--;
  if (
    tmpId.substr(0, 2) === "01" &&
    isGlIdEven(tmpId) &&
    ReqObj.Form[tmpId].screenNumber <= 0 &&
    ReqObj.Form[tmpId].qtUtQuesPresent === false
  )
    this.IsqScreen--;
  if (
    tmpId.substr(0, 2) === "04" &&
    isGlIdEven(tmpId) &&
    ReqObj.Form[tmpId].screenNumber <= 0 &&
    ReqObj.Form[tmpId].qtUtQuesPresent === false
  )
    this.IsqScreen--;
  if (isSSB(tmpId)) this.IsqScreen = 0;
  var IsqScreen = this.IsqScreen;
  var Error = ValidateQuestions(tmpId, false, IsqScreen);
  if (!Error && updatedCounter !== 1) this.IsqScreen--;
  return Error;
};

Isq.prototype.displayHtml = function (tmpId) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
    if (
      (ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
        ReqObj.Form[tmpId].typeofform.toLowerCase() === "video") &&
      isSet(ReqObj.Form[tmpId].userFilledIsq) &&
      ReqObj.Form[tmpId].userFilledIsq !== "" &&
      ReqObj.Form[tmpId].FormSequence.StepCounter !== 0
    )
      StructureIsq(tmpId);
    if (isSSB(tmpId)) ReqObj.Form[tmpId].prevCount = 0;
    if (ReqObj.Form[tmpId].IsqArray === null) return null; // no isq available
    ReqObj.Form[tmpId].IsqStep1 = isSSB(tmpId)
      ? ReqObj.Form[tmpId].IsqLength
      : ReqObj.Form[tmpId].IsqStep1;
    var returnHtml =
      ReqObj.Form[tmpId].prevCount === 0
        ? this.makeIsq(ReqObj.Form[tmpId].IsqStep1, tmpId)
        : this.makeIsq(ReqObj.Form[tmpId].IsqStepN, tmpId);
    /*
              1. prev count = 0 || no isq shown || call makeIsq with isqStep1
              2. prev count > 0 || isq shown || call makeIsq with isqStepN --
              N - how many isq's on 2bd or 3rd or nth step
            */
    if (returnHtml !== "" && this.countISQUpdated === false)
      ReqObj.Form[tmpId].currentclassCount++;
    if (IsChatbl(tmpId)) {
      ReqObj.Form[tmpId].isqans = returnHtml !== "" ? true : false;
      return returnHtml !== "" ? [this.question, this.answer] : [""];
    }
    if (isOtherEnq(tmpId)) {
      if (
        isImageVidEnq(tmpId) &&
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0
      )
        ReqObj.Form[tmpId].calledClassName[
          ReqObj.Form[tmpId].FormSequence.StepCounter
        ] = this.className + "SP";
      else
        ReqObj.Form[tmpId].calledClassName[
          ReqObj.Form[tmpId].FormSequence.StepCounter
        ] = this.className;
    }
    return [returnHtml];
  }
  return [""];
};
Isq.prototype.makeIsq = function (MaxIsq, tmpId) {
  ReqObj.Form[tmpId].stopper =
    Math.min(
      MaxIsq,
      ReqObj.Form[tmpId].IsqLength - ReqObj.Form[tmpId].prevCount
    ) + ReqObj.Form[tmpId].prevCount;
  if (
    isImageVidEnq(tmpId) &&
    ReqObj.Form[tmpId].FormSequence.StepCounter > 0 &&
    ReqObj.Form[tmpId].isQtutShown === true
  )
    ReqObj.Form[tmpId].stopper++;
  return this.TraverseIsq(tmpId);
};

Isq.prototype.TraverseIsq = function (tmpId) {
  var whole_wrapper = "";
  var suffix = isBlFirstfold(tmpId)
    ? "_isqBox' class='eqF100 isq_ffmt'>"
    : "_isqBox'>";


  var IsqBoxSuffixOuterHtml = "<div  id='t" + tmpId + suffix;
  var CurrentPageQuestions = [];
  var finalIsqQuestions = [];
  ReqObj.Form[tmpId].locisqId = [];
  if (
    (isOtherEnq(tmpId) &&
      ReqObj.Form[tmpId].prevCount === 0 &&
      !isImageVidEnq(tmpId)) ||
    (isImageVidEnq(tmpId) &&
      ReqObj.Form[tmpId].prevCount === 0 &&
      ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
  ) {
    IsqBoxSuffixOuterHtml +=
      "<input type='hidden' id='isq_first_screen' value='Screen1'>";
  }
  if (
    (currentISO() !== "IN" && IsChatbl(tmpId)) ||
    (currentISO() === "IN" && pdpenq(tmpId))
  )
    ReqObj.Form[tmpId].stopper = ReqObj.Form[tmpId].IsqLength;
  for (
    var i = ReqObj.Form[tmpId].prevCount;
    i < ReqObj.Form[tmpId].stopper;
    i++
  ) {
    ReqObj.Form[tmpId].Isq.Question = [];
    if (
      isImageVidEnq(tmpId) &&
      ReqObj.Form[tmpId].FormSequence.StepCounter === 0
    ) {
      FindIsqObject(
        ReqObj.Form[tmpId].IsqArray[i],
        tmpId,
        0,
        false,
        finalIsqQuestions
      );
      ReqObj.ImageVideoIsqSeq = true;
      if (
        isSet(ReqObj.Form[tmpId].requireNow) &&
        ReqObj.Form[tmpId].requireNow === true &&
        finalIsqQuestions.length === 0
      ) {
        ReqObj.Form[tmpId].requireNow = false;
      }
    } else if (isBlInline(tmpId)) {
      if (showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)) {
        quantityshown = 1;
        FindIsqObject(
          ReqObj.Form[tmpId].quantityunit,
          tmpId,
          0,
          false,
          finalIsqQuestions
        );

        CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
        if (ReqObj.Form[tmpId].IsqArray.length === 1) {
          ReqObj.Form[tmpId].prevCount += 1;
        }
        // ReqObj.Form[tmpId].isBlQtutShown = true;
      } else if (isNewInlineBl(tmpId)) {
        for (var i = 0; i < ReqObj.Form[tmpId].IsqArray.length; i++) {
          if (
            ReqObj.Form[tmpId].IsqArray[i].length !== 2 ||
            (ReqObj.Form[tmpId].IsqArray[i].length === 2 &&
              ReqObj.Form[tmpId].IsqArray[i][0].toLowerCase() !== "quantity")
          ) {
            FindIsqObject(
              ReqObj.Form[tmpId].IsqArray[i],
              tmpId,
              0,
              false,
              finalIsqQuestions
            );
            displayedisq = 1;
            if (ReqObj.Form[tmpId].IsqArray.length === 1) {
              ReqObj.Form[tmpId].prevCount += 1;
            }

            break;
          }
        }
        CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
      }
      break;
    } else if (
      Bl01(tmpId) &&
      isNewInlineBl(tmpId) &&
      this.className == "Isq" &&
      this.IsqScreen == -1 &&
      displayedisq === 1 &&
      !isBlFirstfold(tmpId) &&
      !IsChatbl(tmpId) &&
      !IsChatBLInline(tmpId) &&
      !isBlInlineFr(tmpId)
    ) {
      for (var i = 0; i < ReqObj.Form[tmpId].IsqArray.length; i++) {
        // if((ReqObj.Form[tmpId].IsqArray)[i].length === 2 && (ReqObj.Form[tmpId].IsqArray)[i][0].toLowerCase() !== "quantity"){
        //     if(i === 0){
        //         blankscreenisq = 1;
        //         continue;
        //     }
        // }
        if (ReqObj.Form[tmpId].IsqArray[i].length !== 2) {
          if (i === 0) {
            // if only 1 isq is there
            blankscreenisq = 1;
            continue;
          } else {
            blankscreenisq = 0;
            FindIsqObject(
              ReqObj.Form[tmpId].IsqArray[i],
              tmpId,
              0,
              false,
              finalIsqQuestions
            );
            CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
          }
        }
      }
      break;
    } else if (isBlFirstfold(tmpId)) {
      //here
      if (showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)) {
        FindIsqObject(
          ReqObj.Form[tmpId].quantityunit,
          tmpId,
          0,
          false,
          finalIsqQuestions
        );
        CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
        if (ReqObj.Form[tmpId].IsqArray.length === 1) {
          ReqObj.Form[tmpId].prevCount += 1;
        }
      }
      break;
    } else
      FindIsqObject(
        ReqObj.Form[tmpId].IsqArray[i],
        tmpId,
        0,
        false,
        finalIsqQuestions
      );
    if (ReqObj.Form[tmpId].Isq.Question.length !== 0)
      CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
    if (
      isSet(ReqObj.ImageVideoIsqSeq) &&
      ReqObj.ImageVideoIsqSeq === true &&
      isSet(ReqObj.Form[tmpId].isQuantIsq) &&
      ReqObj.Form[tmpId].isQuantIsq === true
    ) {
      break;
    }
  }
  if (checkIsqHtmlCreation(finalIsqQuestions) === true) {
    if (
      isSSB(tmpId) &&
      ReqObj.Form[tmpId].Isq.CurrentPageQuestions.length !== 0
    ) {
      ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic = [];
      ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic.push(
        ReqObj.Form[tmpId].Isq.CurrentPageQuestions[0][0]
      );
      CurrentpageSSBIsq(tmpId, CurrentPageQuestions);
    } else if ((Bl09(tmpId) || Bl04(tmpId)) && currentISO() !== "IN") {
      ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic = [];
      ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic.push(
        ReqObj.Form[tmpId].Isq.CurrentPageQuestions[0]
      );
      ReqObj.Form[tmpId].Isq.CurrentPageQuestions = [];
    }
    // if (isSet(ReqObj.ImageVideoIsqSeq) && ReqObj.ImageVideoIsqSeq === true && isSet(ReqObj.Form[tmpId].isQuantIsq) && ReqObj.Form[tmpId].isQuantIsq === false)
    //   ReqObj.Form[tmpId].Isq.CurrentPageQuestions.pop();

    ReqObj.Form[tmpId].Isq.CurrentPageQuestions.push(CurrentPageQuestions);

    if (
      ReqObj.ImageVideoIsqSeq !== true &&
      !isBlInline(tmpId) &&
      !isBlFirstfold(tmpId)
    )
      ReqObj.Form[tmpId].prevCount = ReqObj.Form[tmpId].stopper;
    else if (
      ReqObj.ImageVideoIsqSeq === true &&
      ReqObj.Form[tmpId].FormSequence.StepCounter === 0
    )
      ReqObj.Form[tmpId].prevCount = 0;
    else if (
      ReqObj.ImageVideoIsqSeq === true &&
      ReqObj.Form[tmpId].FormSequence.StepCounter !== 0
    )
      ReqObj.Form[tmpId].prevCount = ReqObj.Form[tmpId].stopper;

    if (!IsChatbl(tmpId)) {
      var IsqBoxSuffixClosingHtml = "</div>";
      var IsqBoxSuffixHtmlObj = {
        SuffixOuterHtml: IsqBoxSuffixOuterHtml,
        SuffixClosingHtml: IsqBoxSuffixClosingHtml,
        suffix: "_isqBox",
      };
      if (
        isImageVidEnq(tmpId) &&
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0 &&
        finalIsqQuestions.length < 2 &&
        ReqObj.Form[tmpId].requireNow !== true
      ) {
        finalIsqQuestions.unshift([returnEnquireNowHtml(tmpId)]);
      }
      whole_wrapper = MakeWrapper(
        finalIsqQuestions,
        tmpId,
        IsqBoxSuffixHtmlObj,
        ""
      );
    } else {
      this.question = MakeWrapper(
        finalIsqQuestions,
        tmpId,
        WrapperObj(
          "<div  id='t" + tmpId + "_isqBox' class = 'cbl_ques cbl_vh' >",
          "</div>",
          "_isqBox"
        ),
        "ques"
      );

      if (!ReqObj.Form[tmpId].toAppendQues) {
        var FormId = "#t" + tmpId + "_newblchatReply";
        if ($(FormId).children(".cbl_resend.cbl_skip")) {
          $(FormId).children(".cbl_resend.cbl_skip").remove();
        }
        finalIsqQuestions[0][0]["UserInput"] += skipDiv1(tmpId); //chat bl bug
      }

      this.answer = MakeWrapper(
        finalIsqQuestions,
        tmpId,
        WrapperObj(
          "<div  id='t" +
          tmpId +
          "_isqBoxInput' class='cbl_isq_grp cbl_dtls cbl_df cbl_aic t" +
          tmpId +
          "_userInput cbl_br10 dn'>",
          "</div>",
          "_isqBox"
        ),
        "input"
      );

      whole_wrapper = this.question + this.answer;
    }
    return whole_wrapper;
  } else {
    if (!isBlInline(tmpId) && !isBlFirstfold(tmpId))
      ReqObj.Form[tmpId].prevCount = ReqObj.Form[tmpId].stopper;
    return "";
  }
};

Isq.prototype.BackButton = function (tmpId) {
  this.IsqScreen--;
  if (ReqObj.Form[tmpId].isret) {
    this.IsqScreen--;
    ReqObj.Form[tmpId].isret = 0;
  }
};

function UserType() {
  // checks whether is Indian or not.
  if (currentISO() === "IN") return "IN";
  else return "FR";
}

function returnIsq(tmpId) {
  var IsqCountry = currentISO() === "IN" ? "IN" : "F";
  var isqmdata = null;
  var isqcdata = null;
  try{
  isqmdata = $.parseJSON(sessionStorage.getItem("enqbl" + ReqObj.Form[tmpId].mcatId + "-" + IsqCountry));
  isqcdata = $.parseJSON(sessionStorage.getItem("enqbl" + ReqObj.Form[tmpId].catId + "-" + IsqCountry));
  }
  catch(err){
    isqmdata = null;
    isqcdata = null;
  }
  if (isSet(isqmdata) && isqmdata !== "") return isqmdata.DATA;
  if (
    isSet(savedMcatIsq[ReqObj.Form[tmpId].mcatId]) &&
    isSet(savedMcatIsq[ReqObj.Form[tmpId].mcatId][IsqCountry]) &&
    savedMcatIsq[ReqObj.Form[tmpId].mcatId][IsqCountry] !== ""
  )
    return savedMcatIsq[ReqObj.Form[tmpId].mcatId][IsqCountry];
  if (isSet(isqcdata) && isqcdata !== "") return isqcdata.DATA;
  if (
    isSet(savedCatIsq[ReqObj.Form[tmpId].catId]) &&
    isSet(savedCatIsq[ReqObj.Form[tmpId].catId][IsqCountry]) &&
    savedCatIsq[ReqObj.Form[tmpId].catId][IsqCountry] !== ""
  )
    return savedCatIsq[ReqObj.Form[tmpId].catId][IsqCountry];
  return null;
}

function IsqPopulate(todo) {
  var arr = template_array;
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (
      !isSet(ReqObj.Form[arr[i]].IsqArray) ||
      ReqObj.Form[arr[i]].IsqArray === "" ||
      ReqObj.Form[arr[i]].IsqArray === null
    ) {
      ReqObj.Form[arr[i]].IsqArray = todo === true ? returnIsq(arr[i]) : null;
      ReqObj.Form[arr[i]].IsqLength =
        isSet(ReqObj.Form[arr[i]].IsqArray) &&
          ReqObj.Form[arr[i]].IsqArray !== null
          ? ReqObj.Form[arr[i]].IsqArray.length
          : 0;
    }
    ReqObj.Form[arr[i]].onsuccess =
      todo === true && Enq09(arr[i]) ? true : false;
    onCompleteISQ(arr[i]);
  }
}

function GetIsqFromObj(tmpId) {
  // update IsqArray depending on mcatId /catId
  if (isSet(tmpId)) {
    var country = UserType(); // check for country
    ReqObj.Form[tmpId].IsqArray = ""; // initial value empty
    if (
      parseInt(ReqObj.Form[tmpId].mcatId) === -1 &&
      parseInt(ReqObj.Form[tmpId].catId) === -1
    ) {
      // if -1 isq array is null and length 0
      ReqObj.Form[tmpId].IsqArray = null;
      ReqObj.Form[tmpId].IsqLength = 0;
    } else {
      if (
        parseInt(ReqObj.Form[tmpId].mcatId) !== -1 &&
        ReqObj.Form[tmpId].mcatId !== ""
      ) {
        // mcatid !(-1) and not empty
        if (ReqObj.Form[tmpId].mcatId in savedMcatIsq) {
          // find mcatId in object
          if (country in savedMcatIsq[ReqObj.Form[tmpId].mcatId]) {
            // country --mcatid
            ReqObj.Form[tmpId].IsqArray =
              savedMcatIsq[ReqObj.Form[tmpId].mcatId][country]; // isqarray updated
          }
        }
      } else if (ReqObj.Form[tmpId].catId in savedCatIsq) {
        // same for savedCatIsq
        if (country in savedCatIsq[ReqObj.Form[tmpId].catId]) {
          ReqObj.Form[tmpId].IsqArray =
            savedCatIsq[ReqObj.Form[tmpId].catId][country];
        }
      }
      ReqObj.Form[tmpId].IsqLength = isSet(ReqObj.Form[tmpId].IsqArray)
        ? ReqObj.Form[tmpId].IsqArray.length
        : 0; // length of isq array
    }
  }
  // Why??
}

function GetIsq(tmpId) {
  // ti fetch Isq Service
  if (isSet(tmpId)) {
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    GetIsqFromObj(tmpId);
    if (
      ReqObj.Form[tmpId].IsqArray === "" ||
      ReqObj.Form[tmpId].IsqArray === null
    ) {
      if (
        parseInt(ReqObj.Form[tmpId].mcatId, 10) !== -1 &&
        ReqObj.Form[tmpId].mcatId !== ""
      ) {
        var mcatId = ReqObj.Form[tmpId].mcatId;
        var cat_type = 3;
      } else if (parseInt(ReqObj.Form[tmpId].catId, 10) !== -1) {
        var mcatId = ReqObj.Form[tmpId].catId;
        var cat_type = 2;
      }
      ReqObj.Form[tmpId].isqMcat = mcatId;
      var IsqCountry = currentISO() === "IN" ? "IN" : "F";
      if (
        isSet(document.referrer) &&
        document.referrer.includes("indianexporters")
      ) { // sessionStorage.removeItem("enqbl" + ReqObj.Form[tmpId].catId + "-" + IsqCountry);
        // sessionStorage.removeItem("enqbl" + mcatId + "-" + IsqCountry);          // js error Failed to read the sessionStorage
        try {
          sessionStorage.removeItem("enqbl" + ReqObj.Form[tmpId].catId + "-" + IsqCountry);
          sessionStorage.removeItem("enqbl" + mcatId + "-" + IsqCountry);
        }
        catch (err) {
          // js error Failed to read the sessionStorage
        }
      }
      var isq_mdata = null;
      var isq_cdata = null;
      try {
        isq_mdata = $.parseJSON(
          sessionStorage.getItem("enqbl" + mcatId + "-" + IsqCountry)
        );
      }
      catch (err) {
        isq_mdata = null;
        // js error Failed to read the sessionStorage
      }
      try {
        isq_cdata = $.parseJSON(
          sessionStorage.getItem(
            "enqbl" + ReqObj.Form[tmpId].catId + "-" + IsqCountry
          )
        );
      }
      catch (err) {
        isq_cdata = null;
        // js error Failed to read the sessionStorage
      }
      var isq_data = isSet(isq_mdata) ? isq_mdata : isq_cdata;
      var country = UserType();
      var isqCalled =
        isSet(ReqObj.IsqCalled[mcatId + IsqCountry]) &&
          ReqObj.IsqCalled[mcatId + IsqCountry] === true
          ? true
          : false;
      if (isq_mdata !== null && isq_mdata.DATA !== "")
        isq_data = showQuantityUnit(tmpId, isq_mdata.DATA, 1) ? isq_data : "";
      if (
        (isq_data === "" ||
          isq_data === null ||
          typeof isq_data === "undefined") &&
        isSet(mcatId) &&
        parseInt(mcatId, 10) !== -1 &&
        isqCalled === false
      ) {
        ReqObj.IsqCalled[mcatId + IsqCountry] = true;
        $.ajax({
          cache: true,
          url: appsServerName + "index.php?r=Newreqform/GetIsq",
          type: "GET",
          crossOrigin: true,
          crossDomain: true,
          data: {
            modid: modIdf,
            mcatid: mcatId,
            cat_type: cat_type,
            flag: 1,
            isq_format: 1,
            generic_flag: 1,
            country_iso: currentISO(),
          },
          dataType: "json",
          timeout: 3000,
          success: function (res) {
            if (
              isSet(res) &&
              isSet(res.DATA) &&
              !(
                typeof res.DATA === "string" &&
                res.DATA.toLowerCase() === "null"
              )
            ) {
              if (res.DATA.length > 0) {
                ReqObj.Form[tmpId].IsqArray = res.DATA;
                ReqObj.Form[tmpId].IsqLength =
                  ReqObj.Form[tmpId].IsqArray.length;
                // sessionStorage.setItem("enqbl" + mcatId + "-" + IsqCountry, JSON.stringify(res)); // js error Failed to execute 'setItem' on 'Storage': Setting the value of 'enqbl208665-IN' exceeded the quota.
                try {
                  sessionStorage.setItem(
                    "enqbl" + mcatId + "-" + IsqCountry,
                    JSON.stringify(res)
                  );
                } catch (err) {
                  // quota_exceeded_error
                }
                var PushArr = [];
                var PushId = "";
                if (
                  parseInt(ReqObj.Form[tmpId].mcatId) !== -1 &&
                  ReqObj.Form[tmpId].mcatId !== ""
                ) {
                  PushArr = savedMcatIsq;
                  PushId = ReqObj.Form[tmpId].mcatId;
                } else {
                  PushArr = savedCatIsq;
                  PushId = ReqObj.Form[tmpId].catId;
                }
                if (PushId in PushArr)
                  PushArr[PushId][country] = ReqObj.Form[tmpId].IsqArray;
                else {
                  PushArr[PushId] = {};
                  PushArr[PushId][country] = ReqObj.Form[tmpId].IsqArray;
                }
                isSet(ReqObj.Form[tmpId].populate) &&
                  ReqObj.Form[tmpId].populate === true
                  ? IsqPopulate(true)
                  : onCompleteISQ(tmpId);
                ReqObj.Form[tmpId].onsuccess = false;
                // PushArr[PushId] = ReqObj.Form[tmpId].IsqArray;
              } else {
                ReqObj.Form[tmpId].IsqArray = null;
                ReqObj.Form[tmpId].IsqLength = 0;
                ReqObj.Form[tmpId].isqMcat = -1;
                if (
                  parseInt(ReqObj.Form[tmpId].mcatId) !== -1 &&
                  ReqObj.Form[tmpId].mcatId !== ""
                ) {
                  if (!isSet(savedMcatIsq[ReqObj.Form[tmpId].mcatId]))
                    savedMcatIsq[ReqObj.Form[tmpId].mcatId] = [];
                  savedMcatIsq[ReqObj.Form[tmpId].mcatId][country] = null;
                } else {
                  // savedCatIsq[ReqObj.Form[tmpId].catId] = null;

                  savedCatIsq[ReqObj.Form[tmpId].catId][country] = null;
                }
                ReqObj.IsqCalled[mcatId + IsqCountry] = false;
                IsqPopulate(false);
              }
              (!isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled) &&
                imeshExist() !== ""
                ? toCallMiniDetails(tmpId)
                : "";
            } else {
              ReqObj.Form[tmpId].IsqArray = null;
              ReqObj.Form[tmpId].IsqLength = 0;
              ReqObj.Form[tmpId].isqMcat = -1;
              ReqObj.IsqCalled[mcatId + IsqCountry] = false;
              IsqPopulate(false);
            }
            var plapresent=null;
            try{
              plapresent = sessionStorage.getItem("plaWidget-" + ReqObj.Form[tmpId].mcatId);
            }
            catch(err){
              plapresent = null;
            }
            if (
              !isSSB(tmpId) &&
              currentISO() === "IN" &&

              !IsChatbl(tmpId) &&
              isSet(ReqObj.Form[tmpId].mcatId) &&
              parseInt(ReqObj.Form[tmpId].mcatId, 10) !== -1 &&
              ReqObj.Form[tmpId].mcatId != "" &&
              !isSet(plapresent)
            ) {
              plawidget(tmpId);
            }
          },
          error: function (res) {
            ReqObj.Form[tmpId].IsqArray = null;
            ReqObj.Form[tmpId].IsqLength = 0;
            ReqObj.IsqCalled[mcatId + IsqCountry] = false;
            IsqPopulate(false);
            res = isSet(res) ? res : "response undefined";
            blenqGATracking(form_type, "Get ISQ", res, 1, tmpId);
          },
          complete: function () {
        ReqObj.Form[tmpId].IsqComplete = true;  // new chat bl unidentified
            // if (isSet(tmpId) && isSet(ReqObj.Form[tmpId].Isq) && ReqObj.Form[tmpId].Isq.HasHtmlCalled) {
            //   if (isSet(ReqObj.Form[tmpId].GlobalIsqObject) && typeof ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject === "function")
            //     ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject(ReqObj.Form[tmpId].GlobalIsqObject.IsqObject); //// !!!!this is why GlobalIsqObject is used !!!!
            // }
            // if (isSet(tmpId) && isSet(ReqObj.Form[tmpId].ReqDtl) && ReqObj.Form[tmpId].ReqDtl.HasHtmlCalled) {
            //   if (isSet(ReqObj.Form[tmpId].GlobalRdObj) && typeof ReqObj.Form[tmpId].GlobalRdObj.AttachingObject === "function")
            //     ReqObj.Form[tmpId].GlobalRdObj.AttachingObject(ReqObj.Form[tmpId].GlobalRdObj.RdObj); //// !!!!this is why GlobalRdObj is used !!!!
            // }
          },
        });
      } else if (isSet(tmpId) && isSet(mcatId) && parseInt(mcatId, 10) === -1) {
        ReqObj.Form[tmpId].IsqArray = null;
        ReqObj.Form[tmpId].IsqLength = 0;
        delete HitMcatIsq[ReqObj.Form[tmpId].mcatId];
        if (ReqObj.Form[tmpId].Isq.HasHtmlCalled) {
          if (
            isSet(ReqObj.Form[tmpId].GlobalIsqObject) &&
            typeof ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject ===
            "function"
          )
            ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject(
              ReqObj.Form[tmpId].GlobalIsqObject.IsqObject
            ); //// !!!!this is why GlobalIsqObject is used !!!!
        }
      } else if (
        isq_data !== "" &&
        isq_data !== null &&
        typeof isq_data !== "undefined"
      ) {
        ReqObj.Form[tmpId].IsqArray = isq_data.DATA;
        ReqObj.Form[tmpId].IsqLength = isq_data.DATA.length;
        var PushArr = [];
        var PushId = "";
        if (
          parseInt(ReqObj.Form[tmpId].mcatId) !== -1 &&
          ReqObj.Form[tmpId].mcatId !== ""
        ) {
          PushArr = savedMcatIsq;
          PushId = ReqObj.Form[tmpId].mcatId;
        } else {
          PushArr = savedCatIsq;
          PushId = ReqObj.Form[tmpId].catId;
        }
        if (PushId in PushArr)
          PushArr[PushId][country] = ReqObj.Form[tmpId].IsqArray;
        else {
          PushArr[PushId] = {};
          PushArr[PushId][country] = ReqObj.Form[tmpId].IsqArray;
        }
        onCompleteISQ(tmpId);
      } else {
        if (isSet(tmpId)) {
          if (
            parseInt(ReqObj.Form[tmpId].mcatId) === -1 &&
            parseInt(ReqObj.Form[tmpId].catId) === -1
          ) {
            ReqObj.Form[tmpId].IsqArray = null;
          } else {
            ReqObj.Form[tmpId].IsqArray = "";
          }
          ReqObj.Form[tmpId].IsqLength = 0;
        }
      }
    } else {
      ReqObj.Form[tmpId].isqMcat =
        parseInt(ReqObj.Form[tmpId].mcatId) !== -1
          ? parseInt(ReqObj.Form[tmpId].mcatId)
          : parseInt(ReqObj.Form[tmpId].catId) !== -1
            ? parseInt(ReqObj.Form[tmpId].catId)
            : ReqObj.Form[tmpId].isqMcat;
    } // review
  }
}

function onCompleteISQ(tmpId) {
  if (
    isSet(tmpId) &&
    isSet(ReqObj.Form[tmpId].Isq) &&
    ReqObj.Form[tmpId].Isq.HasHtmlCalled
  ) {
    if (
      isSet(ReqObj.Form[tmpId].GlobalIsqObject) &&
      typeof ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject === "function"
    )
      ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject(
        ReqObj.Form[tmpId].GlobalIsqObject.IsqObject
      ); //// !!!!this is why GlobalIsqObject is used !!!!
  }

  if (
    isSet(tmpId) &&
    isSet(ReqObj.Form[tmpId].ReqDtl) &&
    ReqObj.Form[tmpId].ReqDtl.HasHtmlCalled
  ) {
    if (
      isSet(ReqObj.Form[tmpId].GlobalRdObj) &&
      typeof ReqObj.Form[tmpId].GlobalRdObj.AttachingObject === "function"
    )
      ReqObj.Form[tmpId].GlobalRdObj.AttachingObject(
        ReqObj.Form[tmpId].GlobalRdObj.RdObj
      ); //// !!!!this is why GlobalRdObj is used !!!!
  }
}


function isNewInlineBl(tmpId) {
  if (modIdf === "DIR") return true;
  else return false;
}



function checkIsqHtmlCreation(arr) {
  var len = arr.length;
  var count = 0;
  for (var i = 0; i < len; i++) {
    if (isSet(arr[i][0].flag) && arr[i][0].flag === false) count++;
  }
  return count === len ? false : true;
}

function addLine() {
  return '<div class="cbl_line"></div>';
}

function FindIsqObject(
  Collection,
  tmpId,
  ObjectPosition,
  isRecursion,
  arrayOfQues
) {
  // This function is used to get the object where data lies
  if (isSet(Collection)) {
    if (Collection instanceof Array) {
      var len = isSet(Collection) ? Collection.length : 0;
      var RecurOfQues = [];
      var toaddPartition = 0;
      var isqtut = false;
      for (var i = 0; i < len; i++) {
        if (
          1 === toaddPartition &&
          IsChatbl(tmpId) &&
          (currentISO() === "IN" ||
            (currentISO() !== "IN" &&
              (Collection[i].IM_SPEC_MASTER_DESC.toLowerCase() === "quantity" ||
                Collection[i].IM_SPEC_MASTER_DESC.toLowerCase() ===
                "quantity unit")))
        ) {
          QuesObj["UserInput"] += addLine();
        }
        if (len > 1) ObjectPosition++;
        var QuesObj = FindIsqObject(Collection[i], tmpId, ObjectPosition, true);
        RecurOfQues.push(QuesObj);
        toaddPartition = 1;
        isqtut =
          QuesObj.qtuttype === 5 || QuesObj.qtuttype === 6 ? true : false;
      }
      if (isqtut === true)
        return arrayOfQues.push(returnIsqHtmlObj(RecurOfQues, tmpId));
      else arrayOfQues.push(RecurOfQues);
      return arrayOfQues;
    } else {
      if (
        modIdf === "MDC" &&
        Collection.IM_SPEC_MASTER_DESC === "Brand"
      )
        ReqObj.Form[tmpId].stopper++;
      else {
        var qtisq = false;
        var sampisq = false;
        if (
          isSet(ReqObj.Form[tmpId].toGetCurrentPagestring) &&
          ReqObj.Form[tmpId].toGetCurrentPagestring
        )
          getIsqQuestions(Collection, "current", tmpId);
        if (
          Collection.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity" ||
          Collection.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit"
        ) {
          ReqObj.Form[tmpId].cName.qtut = true;
          qtisq = true;
          ReqObj.Form[tmpId].cName.qtracking = 1;
        }
        if (
          Collection.IM_SPEC_MASTER_DESC.toLowerCase() ===
          "total order value" ||
          Collection.IM_SPEC_MASTER_DESC.toLowerCase() ===
          "total order value(rs)"
        ) {
          ReqObj.Form[tmpId].cName.tov = true;
        }
        if (
          isSet(ReqObj.Form[tmpId].defaultIsq) &&
          ReqObj.Form[tmpId].defaultIsq === "1" &&
          isSet(
            Collection.IM_SPEC_MASTER_DESC.toLowerCase().match("sample order")
          )
        )
          sampisq = true;
        if (
          isImageVidEnq(tmpId) &&
          ReqObj.Form[tmpId].FormSequence.StepCounter === 0
        ) {
          if (
            Collection.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity" ||
            Collection.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit"
          ) {
            var htmlObj =
              qtisq === false && currentISO() !== "IN"
                ? {
                  clsNm: false,
                  flag: false,
                  ClosingWrapper: "",
                  Label: "",
                  OuterWrapper: "",
                  UserInput: "",
                }
                : convertHtml(Collection, tmpId, ObjectPosition); // if quantity call convert html
            ReqObj.Form[tmpId].previousFullDesc =
              Collection.IM_SPEC_MASTER_FULL_DESC;
            ReqObj.Form[tmpId].isQuantIsq = true;
            if (isRecursion) {
              return htmlObj;
            } else {
              return arrayOfQues.push([htmlObj]);
            }
          } else {
            ReqObj.Form[tmpId].requireNow = true;
            return returnEnquireNowHtml(tmpId); // return type must be object similar to htmlObj
          }
        } else {
          var htmlObj =
            qtisq === false &&
              sampisq === false &&
              (currentISO() !== "IN" || (currentISO() === "IN" && pdpenq(tmpId)))
              ? {
                clsNm: false,
                flag: false,
                ClosingWrapper: "",
                Label: "",
                OuterWrapper: "",
                UserInput: "",
              }
              : convertHtml(Collection, tmpId, ObjectPosition);
          ReqObj.Form[tmpId].previousFullDesc =
            Collection.IM_SPEC_MASTER_FULL_DESC;
        }

        // return html;
        if (isRecursion) {
          return htmlObj;
        } else {
          return arrayOfQues.push([htmlObj]);
        }
      }
    }
  }
}

function FindIsqObjectQuestions(
  Collection,
  tmpId,
  ObjectPosition,
  isRecursion,
  arrayOfQues
) {
  // This function is used to get the object where data lies
  if (isSet(Collection)) {
    if (Collection instanceof Array) {
      var len = isSet(Collection) ? Collection.length : 0;
      var RecurOfQues = [];
      for (var i = 0; i < len; i++) {
        if (len > 1) ObjectPosition++;
        var QuesObj = FindIsqObjectQuestions(
          Collection[i],
          tmpId,
          ObjectPosition,
          true
        );
        RecurOfQues.push(QuesObj);
      }
      arrayOfQues.push(RecurOfQues);
      return arrayOfQues;
    } else {
      if (
        isSet(ReqObj.Form[tmpId].toGetQuestionsOnly) &&
        ReqObj.Form[tmpId].toGetQuestionsOnly
      )
        getIsqQuestions(Collection, "allquestions", tmpId);
    }
  }
}

function msg_firimgvid(text, tmpId) {
  var msg =
    ReqObj.Form[tmpId].typeofform.toLowerCase() === "image"
      ? "images"
      : "videos";
  if (direnqImage(tmpId)) {
    return "";
  }
  else {
    return (
      "<div class='eqimvid'>" +
      returnSpan("", "", text, "befwt", "") +
      " to get latest " +
      msg +
      " & best quotes</div>"
    );
  }

}
function returnEnquireNowHtml(tmpId) {
  return {
    ClosingWrapper: "</div>",
    Label: "",
    OuterWrapper: returnContainer(
      "t" + tmpId,
      "_enquirenow",
      "eqs16",
      "",
      "",
      ""
    ),
    UserInput: /*returnButton("t" + tmpId, "_submit", "Enquire now!", "")*/ "",
    beforeInput: "",
    beforeLabel: "",
    isenquire: true,
  };
}

function updateUserFilledIsq(tmpId, isq_data) {
  for (var i = 0; i < 2; i++) {
    var isqobj = {
      optionsId: isq_data.b_id[i],
      optionsValue: isq_data.b_response[i],
      questionsDesc: isq_data.q_desc[i],
      questionsId: isq_data.q_id[i],
    };
    ReqObj.Form[tmpId].userFilledIsq.push(isqobj);
  }
}

function updateQtKey(tmpId, change) {
  ReqObj.Form[tmpId].qtutchange.quantity = change;
}

function updateUtKey(tmpId, change) {
  ReqObj.Form[tmpId].qtutchange.unit = change;
}

function qtutUI(tmpId) {
  if (isSet(ReqObj.Form[tmpId].preFilledUnitDetail)) {
    var invalue = ReqObj.Form[tmpId].preFilledUnitDetail.invalue;
    var inputid = ReqObj.Form[tmpId].preFilledUnitDetail.id;
    if (isSet(invalue) && invalue !== "" && isSet(inputid) && inputid !== "") {
      if (invalue.length > 18) {
        $("body").addClass("enqblsug");
      } else {
        $("body").removeClass("enqblsug");
      }
    }
  }
}

function qtutEvents(tmpId) {
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;

  var id2 = $(".unsug" + toappend).attr("id");
  var id = $(".qtut" + toappend).attr("id"); // delete sugg object before creating new !
  typeUnitSuggester(tmpId);
  typeQuantitySuggester(tmpId);
  $("#" + id).on("input", function (event) {
    ReqObj.Form[tmpId].errflag = false;
    var typedchar = $("#" + event.target.id).val();
    if (validateInputEvent(tmpId, event) === true) {
      if (!ReqObj.Form[tmpId].qtutsugg) {
        typeUnitSuggester(tmpId, "from-validate");
        typeQuantitySuggester(tmpId, "from-validate");
      }
      ReqObj.Form[tmpId].errflag = true;
      ReqObj.Form[tmpId].QtUtError = false;
      if (typedchar !== "") updateQtKey(tmpId, "filled");
      else updateQtKey(tmpId, "empty");
      handleErrorUI(
        {
          data: {
            r_data: {
              target: {
                id: id,
              },
            },
            tmpId: tmpId,
          },
        },
        false
      );
      var source = modifyqutAnswers(tmpId, typedchar);
      if (ReqObj.Form[tmpId].qtutsugg) {
        $("#" + id).autocomplete({
          source: source,
        });
      }
    }
    if (!isSet(ReqObj.Form[tmpId].errflag) || ReqObj.Form[tmpId].errflag)
      handleQuantityUi({
        data: {
          event: event,
          tmpId: tmpId,
          todo: "highlight",
        },
      });
  });

  $("#" + id).on("keydown", function (event) {
    // keydown events on numbers and letters only
    if (event.which === 40 || event.which === 38) updateQtUtFields(event, true);
  });

  $("#" + id + ", #" + id2)
    .focusout(function (event) {
      if (!isSet(ReqObj.Form[tmpId].errflag) || ReqObj.Form[tmpId].errflag) {
        handleQuantityUi({
          data: {
            event: event,
            tmpId: tmpId,
            todo: "removeFocus",
          },
        });
      }
    })
    .on("focus", function (event) {
      if (!isSet(ReqObj.Form[tmpId].errflag) || ReqObj.Form[tmpId].errflag) {
        handleQuantityUi({
          data: {
            event: event,
            tmpId: tmpId,
            todo: "highlight",
          },
        });
        if (
          $("#" + event.target.id).val() !== "" &&
          ReqObj.Form[tmpId].QtUtError === false
        ) {
          if (!ReqObj.Form[tmpId].qtutsugg) {
            typeUnitSuggester(tmpId);
            typeQuantitySuggester(tmpId);
          }
          var source = modifyqutAnswers(tmpId, $("#" + event.target.id).val());
          if (ReqObj.Form[tmpId].qtutsugg) {
            $("#" + id).autocomplete({
              source: source,
            });
          }
        }
      }
    });

  // $("#" + id).on("blur", function(event) {
  //   if (!isSet(ReqObj.Form[tmpId].errflag) || ReqObj.Form[tmpId].errflag)
  //     handleQuantityUi({
  //       data: {
  //         event: event,
  //         tmpId: tmpId,
  //         todo: "highlight"
  //       }
  //     });
  // });

  $("#" + $(".unsug" + toappend).attr("id")).on("keydown", function (event) {
    handleErrorUI(
      {
        data: {
          r_data: {
            target: {
              id: $(".unsug" + toappend).attr("id"),
            },
          },
          tmpId: tmpId,
        },
      },
      false
    );
    if (event.which === 8) {
      ReqObj.Form[tmpId].isUnitPrefilled = false;
      var pfval = $("#" + id).val();
      $("#" + id).val("");
      $("#" + id).val(pfval);
      if (returnType(pfval) === "num" && parseInt(pfval) !== 0) {
        if (!ReqObj.Form[tmpId].qtutsugg) {
          typeUnitSuggester(tmpId);
          typeQuantitySuggester(tmpId);
        }
        var source = modifyqutAnswers(tmpId, pfval);
        if (ReqObj.Form[tmpId].qtutsugg) {
          $("#" + id).autocomplete({
            source: source,
          });
        }
      }
    }
  });

  $("#" + $(".unsug" + toappend).attr("id")).on("input", function (event) {
    var val = $("#" + $(".unsug" + toappend).attr("id")).val();
    if (val !== "") updateUtKey(tmpId, "input");
    // else updateUtKey(tmpId, "empty");
    else {

      updateUtKey(tmpId, "empty");
      var arr = [];
      var sarr = [];

      for (var i = 0; i < ReqObj.Form[tmpId].IsqArray.length; i++) {
        if (ReqObj.Form[tmpId].IsqArray[i].length === 2) {
          for (var j = 0; j < 2; j++) {
            if (ReqObj.Form[tmpId].IsqArray[i][j].IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit") {
              arr = ReqObj.Form[tmpId].IsqArray[i][j].IM_SPEC_OPTIONS_DESC.split("##");
            }
          }
        }
        var len = arr.length;
        for (var i = 0; i < len; i++) {
          if (arr[i].toLowerCase() === "other" || arr[i].toLowerCase() === "others") {
            continue;
          }
          else {
            sarr.push(arr[i]);
          }
        }
        break;
      }
      $('#' + id2)
        .autocomplete({
          source: sarr,
          minLength: 0
        })
        .focus(function () {
          $(this).autocomplete('search', $(this).val())
        });

    }

  });

  if (IsChatbl(tmpId) && $(".qtut" + toappend).length > 0) {
    $("#t" + tmpId + "_isqBoxInput").addClass("cbl_odrq");
  }
}

function updateQtUtFields(event, keydownp) {
  var qt_element = $("#" + event.target.id);
  var tmpId = event.target.id.substring(1, 5);
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;
  var ut_element = $("#" + $(".unsug" + toappend).attr("id"));

  var value = $(qt_element).val();
  var len = value.length;
  if (len > 0) {
    var count = 0;
    for (var i = 0; i < len; i++) {
      if (returnType(value[i]) === "num") count++;
      else break;
    }
    $(qt_element).val(value.substring(0, count).trim());
    if (keydownp !== true) $(qt_element).blur(); // to remove focus
    $(ut_element).val(value.substring(count, len).trim());
    updateOptionId(tmpId, $(".unsug" + toappend).attr("id"));
  }
}

function updateOptionId(tmpId, ut_element_id) {
  var ut_element = $("#" + ut_element_id);
  var unit = $(ut_element).val().toLowerCase();
  newOptionId = getOptionId(tmpId, unit);
  $(ut_element).attr("optionid", newOptionId);
}

function getOptionId(tmpId, unit) {
  if (ReqObj.Form[tmpId].IdMapDesc.hasOwnProperty(unit.toLowerCase()))
    newOptionId = ReqObj.Form[tmpId].IdMapDesc[unit];
  else newOptionId = ReqObj.Form[tmpId].IdMapDesc["other"];

  return isSet(newOptionId) ? newOptionId : "";
}

function modifyqutAnswers(tmpId, typedchar) {
  //var typedchar = "" + parseInt(typedchar) + "";
  if (typedchar !== "" && typedchar.length > 0) {
    var getcharCode = typedchar[typedchar.length - 1].charCodeAt(0);
    if (
      (getcharCode >= 65 && getcharCode <= 90) ||
      (getcharCode >= 97 && getcharCode <= 122)
    ) {
      typedchar = typedchar.substring(0, typedchar.length - 1);
    }
    var arr = JSON.parse(JSON.stringify(removeRepeated(tmpId)));
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      if (arr[i].toLowerCase() !== "other" && arr[i].toLowerCase() !== "others")
        if (arr[i].toLowerCase() !== "none") arr[i] = typedchar + " " + arr[i];
    }
    return arr;
  }
}

function removeRepeated(tmpId, start) {
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;

  var arr = [];
  var len = ReqObj.Form[tmpId].qutAnswers.length;
  var ans = ReqObj.Form[tmpId].qutAnswers;
  var ut_element_value = $("#" + $(".unsug" + toappend).attr("id")).val();
  if (isSet(ut_element_value)) {
    ut_element_value = ut_element_value.trim();
    for (var i = 0; i < len; i++) {
      if (ans[i].toLowerCase() !== ut_element_value.toLowerCase()) {
        arr.push(ans[i]);
      }
    }
  }
  return arr;
}

function checkLastInput(tmpId, event) {
  var firstval = $("#" + event.target.id)
    .val()
    .substring(0, 1);
  var firstkeytype = returnType(firstval);
  return firstkeytype === "num" && parseInt(firstval) !== 0
    ? "valid"
    : "invalid";
}

function checkInBetween(tmpId, event) {
  // less than 2 - will be undefined !
  var totallen = $("#" + event.target.id).val().length;
  if (totallen === 2)
    var val = $("#" + event.target.id)
      .val()
      .substring(0, totallen);
  else if (totallen > 2)
    var val = $("#" + event.target.id)
      .val()
      .substring(1, totallen);
  return /^[a-zA-Z0-9 ]*$/.test(val) === false ? "invalid" : "valid"; // if not numbers/letters - invalid
}

function validateInputEvent(tmpId, event) {
  var r_data = event;
  var pressedKey = event.originalEvent["data"];
  var totallen = $("#" + event.target.id).val().length;
  var div_val = $("#" + event.target.id).val() * 1;
  var keyType = returnType(pressedKey);
  if (totallen === 1) {
    if (keyType === "char") {
      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: "Quantity must be numeric",
          type: false,
        },
      });
      return false;
    } else if (keyType === "num" && parseInt(pressedKey) === 0) {
      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: "Quantity should not be '0'",
          type: false,
        },
      });
      return false;
    }
    handleErrorUI(
      {
        data: {
          r_data: r_data,
          tmpId: tmpId,
        },
      },
      false
    );
    if (keyType === "spchar") {
      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: "Enter a valid Quantity",
        },
      });
      return false;
    }
    if (keyType === "backspace") {
      if (checkLastInput(tmpId, event) === "invalid") {
        var mssg =
          div_val === 0
            ? "Quantity should not be '0'"
            : "Enter a valid Quantity";
        handleQuantityUi({
          data: {
            r_data: r_data,
            tmpId: tmpId,
            toEmpty: "none",
            msg: mssg,
            type: false,
          },
        });
        return false;
      }
    }
    return true;
  } else {
    if (totallen === 0) return true;
    if (checkLastInput(tmpId, event) === "invalid") {
      var mssg =
        parseInt(pressedKey) === 0
          ? "Quantity should not be '0'"
          : "Enter a valid Quantity";

      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: mssg,
          type: false,
        },
      });
      return false;
    }
    if (keyType === "spchar") {
      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: "Enter a valid Quantity",
          type: false,
        },
      });
      return false;
    }
    if (keyType === "backspace") {
      if (checkInBetween(tmpId, event) === "invalid") {
        handleQuantityUi({
          data: {
            r_data: r_data,
            tmpId: tmpId,
            toEmpty: "none",
            msg: "Enter a valid Quantity",
            type: false,
          },
        });

        return false;
      }
      return true;
    }
    if (keyType === "char" || keyType === "num") {
      if (checkInBetween(tmpId, event) === "invalid") {
        handleQuantityUi({
          data: {
            r_data: r_data,
            tmpId: tmpId,
            toEmpty: "none",
            msg: "Enter a valid Quantity",
            type: false,
          },
        });
        return false;
      } else if (keyType === "char") {
        handleQuantityUi({
          data: {
            r_data: r_data,
            tmpId: tmpId,
            toEmpty: "lastChar",
            type: true,
            pressedKey: pressedKey,
          },
        });
        updateUtKey(tmpId, "input");
      }
    }
    handleErrorUI(
      {
        data: {
          r_data: r_data,
          tmpId: tmpId,
        },
      },
      false
    );
    return true;
  }
}

function returnType(pressedKey) {
  if (typeof pressedKey === "undefined" || pressedKey === null) {
    return "backspace";
  }
  var getcharCode = pressedKey.charCodeAt(0);
  if (
    (getcharCode >= 65 && getcharCode <= 90) ||
    (getcharCode >= 97 && getcharCode <= 122)
  ) {
    return "char";
  } else if (getcharCode >= 48 && getcharCode <= 57) {
    return "num";
  } else return "spchar";
}
/* ---------------CSS HANDLING-----------------------*/

function returnCharPos(typedChar, pressedKey) {
  var len = typedChar.length;
  for (var i = 0; i < len; i++) {
    if (typedChar.charAt(i) === pressedKey) {
      return i;
    }
  }
  return -1;
}

function handleQuantityUi(event) {
  if (event.data.toEmpty === "none") {
    ReqObj.Form[event.data.tmpId].QtUtError = true;
    handleErrorUI(event, true);
  }
  if (event.data.toEmpty === "lastChar") {
    var typedChar = $("#" + event.data.r_data.target.id).val();
    var len = $("#" + event.data.r_data.target.id).val().length;
    if (event.data.type === false) {
      $("#" + event.data.r_data.target.id).val(typedChar.substring(0, len - 1));
      ReqObj.Form[event.data.tmpId].QtUtError = true;
      handleErrorUI(event, true);
    } else {
      var pos = returnCharPos(typedChar, event.data.pressedKey);
      len = pos !== -1 ? pos : len;
      var toappend =
        event.data.tmpId.substr(0, 2) === "09" &&
          ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
          ? event.data.tmpId +
          "_" +
          (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
          : event.data.tmpId;

      $("#" + event.data.r_data.target.id).val(typedChar.substring(0, len));
      $("#" + $(".unsug" + toappend).attr("id")).focus();
      if ($("#" + $(".unsug" + toappend).attr("id")).is("focus")) {
        $("#" + $(".unsug" + toappend).attr("id")).val(event.data.pressedKey);
      } else {
        $("#" + $(".unsug" + toappend).attr("id"))
          .focus()
          .click();
        $("#" + $(".unsug" + toappend).attr("id")).val(event.data.pressedKey);
      }
    }
  }
  if (event.data.todo === "highlight") {
    var tmpId = event.data.tmpId;
    var toappendhr =
      event.data.tmpId.substr(0, 2) === "09" &&
        ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? event.data.tmpId +
        "_" +
        (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
        : event.data.tmpId;
    var cls =
      isSSB(tmpId) && isnewSSB(tmpId)
        ? "qut_cus_active nb_cus_qt"
        : tmpId.substr(0, 2) === "01" &&
          isGlIdEven(tmpId) &&
          ReqObj.Form[tmpId].screenNumber === 0
          ? "qut_cus_active inEql_cus_active"
          : "qut_cus_active";
    $(".qtut" + toappendhr)
      .parent()
      .addClass(cls);
    $("#t" + event.data.tmpId + "qut_id").addClass(cls);
  }

  if (event.data.todo === "removeFocus") {
    var tmpId = event.data.tmpId;
    var cls =
      isSSB(tmpId) && isnewSSB(tmpId)
        ? "qut_cus_active nb_cus_qt"
        : tmpId.substr(0, 2) === "01" &&
          isGlIdEven(tmpId) &&
          ReqObj.Form[tmpId].screenNumber === 0
          ? "qut_cus_active inEql_cus_active"
          : "qut_cus_active";
    $("#t" + event.data.tmpId + "qut_id").removeClass(cls);
  }
}

function handleErrorUI(event, showError) {
  var toappend =
    event.data.tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
      ? event.data.tmpId +
      "_" +
      (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
      : event.data.tmpId;
  var formType = ReqObj.Form[event.data.tmpId].formType.toLowerCase();
  var errorCls =
    formType === "bl"
      ? "redc"
      : "beerrp sper";
  if (IsChatbl(event.data.tmpId))
    showError
      ? addChatblError(event.data.tmpId, event.data.msg)
      : removechatblerror(event.data.tmpId);
  else if (showError === true) {
    $("#t" + toappend + "_validinev")
      .html(event.data.msg)
      .removeClass("bedsnone")
      .addClass(errorCls);
    $(".qtut" + toappend)
      .parent()
      .addClass("qut_cus_active");
    $("#" + event.data.r_data.target.id).removeClass("highlight-err");
    $("#t" + event.data.tmpId + "qut_id").removeClass("qut_cus_active");
  } else if (showError === false) {
    $("#t" + toappend + "_validinev")
      .html("")
      .addClass("bedsnone")
      .removeClass(errorCls);
    $("#" + event.data.r_data.target.id).removeClass("highlight-err");
  }
}

function handleQuantityUiErrorMsg(event) {
  if (IsChatbl(event.data.tmpId)) {
    addChatblError(event.data.tmpId, event.data.errorObject.msg);
  } else {
    var formType = ReqObj.Form[event.data.tmpId].formType.toLowerCase();
    var errorClass =
      formType === "enq"
        ? event.data.errorClass
        : "redc";
    if (
      event.data.option_type == "quantity" ||
      event.data.option_type == "quantity unit"
    ) {
      var toappend =
        event.data.tmpId.substr(0, 2) === "09" &&
          ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
          ? event.data.tmpId +
          "_" +
          (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
          : event.data.tmpId;
      $("#t" + toappend + "_validinev")
        .html(event.data.errorObject.msg)
        .removeClass("bedsnone")
        .addClass(errorClass);
    } else if (event.data.option_type == "text") {
      var inputid = $(event.data.errorSelect).attr("id");
      $("#" + inputid + "_err").removeClass("bedsnone");
    } else {
      $(event.data.errorSelect + "_err").removeClass("bedsnone");
    }
    $(event.data.errorSelect).addClass("highlight-err");
    if (isSSB(event.data.tmpId)) $(event.data.errorSelect).focus();
    $(event.data.errorSelect)
      .off("click keyup")
      .on("click keyup", function () {
        event.data.option_type == "quantity unit"
          ? $("#t" + toappend + "_validinev").addClass("bedsnone")
          : event.data.option_type == "text"
            ? $("#" + inputid + "_err").addClass("bedsnone")
            : $(event.data.errorSelect + "_err").addClass("bedsnone");
        $(event.data.errorSelect).removeClass("highlight-err");
      });
  }
}
/* ---------------CSS HANDLING-----------------------*/
function onSelectQtUt(event) {
  ReqObj.Form[event.target.id.substring(1, 5)].IsqQtUtEvents["onselect"] = true;
  updateUtKey(event.target.id.substring(1, 5), "isq");
  updateQtUtFields(event);
}

function typeQuantitySuggester(tmpId, where) {
  var imeshcookie = imeshExist();
  var qtut_sugg = "";
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;
  ReqObj.Form[tmpId].qtutsugg = false;
  if (typeof Suggester !== "undefined") {
    suggClass = IsChatbl(tmpId)
      ? IsChatBLInline(tmpId)
        ? "cus_qt smcbl_qt"
        : "cus_qt chatbl_qt"
      : isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "cus_qt nb-cus-qt"
          : "cus_qt mb-cus-qt"
        : isBlInline(tmpId) ||
          (isGlIdEven(tmpId) &&
            tmpId.substr(0, 2) === "01" &&
            where === "from-validate")
          ? "cus_qt inEql_cus_qt"
          : isBlFirstfold(tmpId)
            ? imeshcookie == "" && currentISO() == "IN"
              ? "cus_qt inEql_cus_qtun"
              : "cus_qt inEql_cus_qtid"
            : "cus_qt";
    qtut_sugg = new Suggester({
      onSelect: onSelectQtUt,
      element: $(".qtut" + toappend).attr("id"),
      minStringLengthToFetchSuggestion: 1,
      updateCache: false,
      autocompleteClass: suggClass,
      minStringLengthToDisplaySuggestion: 1,
      source: [],
      postValUpd: false,
      tmpId: false,
      rowsToDisplay: "5",
      type: "custom",
    });
    ReqObj.Form[tmpId].qtutsugg = true;
  }
}

function updateoption(event) {
  var tmpId = event.target.id.substr(1, 4);
  updateOptionId(tmpId, event.target.id);
  updateUtKey(tmpId, "sugg");
}

function typeUnitSuggester(tmpId, where) {
  var imeshcookie = imeshExist();
  var unit_sugg = "";
  let arr = [];

  for (var i = 0; i < ReqObj.Form[tmpId].IsqArray.length; i++) {
    if (ReqObj.Form[tmpId].IsqArray[i].length === 2) {
      for (var j = 0; j < 2; j++) {
        if (ReqObj.Form[tmpId].IsqArray[i][j].IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit") {

          arr = ReqObj.Form[tmpId].IsqArray[i][j].IM_SPEC_OPTIONS_DESC.split("##");
        }
      }

    }
  }
  // console.log(arr);
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;
  if (typeof Suggester !== "undefined") {
    suggClass = IsChatbl(tmpId)
      ? IsChatBLInline(tmpId)
        ? "cus_ut smcbl_ut"
        : "cus_ut chatbl_ut"
      : isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "cus_ut nb-cus-ut"
          : "cus_ut mb-cus-ut"
        : isBlInline(tmpId) ||
          (isGlIdEven(tmpId) &&
            tmpId.substr(0, 2) === "01" &&
            where === "from-validate")
          ? "cus_ut inEql_cus_ut"
          : isBlFirstfold(tmpId)
            ? imeshcookie == "" && currentISO() == "IN"
              ? "cus_ut inEql_cus_utun"
              : "cus_ut inEql_cus_utid"
            : "cus_ut";
    row_num_ut = IsChatbl(tmpId) ? "3" : "5";
    unit_sugg = new Suggester({
      element: $(".unsug" + toappend).attr("id"),
      onSelect: updateoption,
      placeholder: "",
      classPlaceholder: "",
      source: arr,
      minStringLengthToFetchSuggestion: 1,
      updateCache: false,
      autocompleteClass: suggClass,
      type: "custom",
      minStringLengthToDisplaySuggestion: 1,
      rowsToDisplay: row_num_ut,
    });
    ReqObj.Form[tmpId].unitSuggester.push(unit_sugg);

  }
}

function MakeLabel(labelObj, descriptionHtml, tmpId) {
  if (IsChatbl(tmpId)) {
    return ChatBlMsgs(labelObj.QuestionDesc);
  } else if (isSSB(tmpId))
    return MakeSSBLabel(labelObj, descriptionHtml, tmpId);
  else if (isBlInline(tmpId)) {
    var label =
      isBlInlineFr(tmpId) && labelObj.flag === "1"
        ? "<label class='" +
        labelObj.lblClass +
        "' id='" +
        labelObj.labelId +
        "'"
        : "<label class='fs15 cl11' id='" + labelObj.labelId + "'";
    if (isSet(labelObj.questionId) && labelObj.questionId !== "")
      Label += "quesid='" + labelObj.questionId + "'";
    label += ">" + labelObj.QuestionDesc + "</label>";
    return label;
  } else {
    var lbdiv = labelObj["lblin"] === true ? "tllb pr" : "";
    var Label =
      "<div class='" +
      lbdiv +
      "'><label class='" +
      labelObj.lblClass +
      "' id='" +
      labelObj.labelId +
      "'";
    if (isSet(labelObj.questionId) && labelObj.questionId !== "")
      Label += "quesid='" + labelObj.questionId + "'";
    Label += ">" + labelObj.QuestionDesc + "</label>";
    if (isSet(descriptionHtml)) Label += descriptionHtml;
    Label += "</div>";
    return Label;
  }
}

function LabelForCheckAndRadio(labelObj, descriptionHtml, tmpId, HelpLabel) {
  if (IsChatbl(tmpId)) {
    return ChatBlMsgs(labelObj.QuestionDesc, labelObj.type);
  } else if (isSSB(tmpId)) {
    return SSBChkBxAndRadButLabel(labelObj, descriptionHtml, tmpId, HelpLabel);
  } else if (isBlInline(tmpId)) {
    return (
      "<label id=" +
      labelObj.labelId +
      " quesid='" +
      labelObj.questionId +
      "' class = 'fs15 cl11'>" +
      labelObj.QuestionDesc +
      "</label>"
    );
  } else {
    return (
      "<div class='beclr'></div><div class='be-dvtxt bewauto bepr tllb'><label id=" +
      labelObj.labelId +
      " quesid='" +
      labelObj.questionId +
      "' class='" +
      (labelObj.lblClass || "") +
      "' >" +
      labelObj.QuestionDesc +
      "</label>" +
      HelpLabel +
      descriptionHtml +
      "</div><div class='beclr'></div>"
    );
  }
}

/**
 *@description takes input parameter and returns the HTML for the different error blocks
 *
 *
 * @returns HTML for the error block
 */
function errorBlockFunction(errorObject, tmpId) {
  if (!isSet(errorObject) || $.isEmptyObject(errorObject)) return "";
  else {
    if (IsChatbl(tmpId)) {
      addChatblError(tmpId, errorObject.msg);
      return "";
    } else {
      return (
        "<div  class='be-erbx isq_error_block " +
        errorObject.error_block_class +
        "'><div data-role='content'>" +
        errorObject.msg +
        "</div><a class='be-erarw " +
        errorObject.anchor_class +
        "'  data-role='arrow'></a></div>"
      );
    }
  }
}

function Tooltip(inputType, desc) {
  var descriptionHtml = "";
  if (isSet(inputType) && isSet(desc) && desc !== "") {
    if (inputType.toLowerCase() === "text") {
      descriptionHtml = FullDescHtml({
        div1Class: "int-ct1 info_iconeqbl",
        div2Class: "blnewform_sprit inft",
        div3Class: "nwarN bedsnone full_desc Tp8",
        fullDesc: desc,
      });
    } else if (inputType.toLowerCase() === "select") {
      descriptionHtml = FullDescHtml({
        div1Class: "int-ct3 info_iconeqbl",
        div2Class: "blnewform_sprit inft",
        div3Class: "nwarN bedsnone full_desc Tp8",
        fullDesc: desc,
      });
    } else if (inputType.toLowerCase() === "radio") {
      descriptionHtml += FullDescHtml({
        div1Class: "int-ct1 info_iconeqbl",
        div2Class: "blnewform_sprit inft tn6",
        div3Class: "nwarN bedsnone full_desc",
        fullDesc: desc,
      });
    } else if (inputType.toLowerCase() === "check") {
      descriptionHtml += FullDescHtml({
        div1Class: "int-ct1 info_iconeqbl",
        div2Class: "blnewform_sprit inft tn6",
        div3Class: "nwarN bedsnone full_desc",
        fullDesc: desc,
      });
    }
    if (isSet(descriptionHtml)) return descriptionHtml;
    else return "";
  }
  return descriptionHtml;
}

/**
 *@description returns the textbox html for the ISQ
 *
 *
 * @returns HTML for the text block
 */

function TextBoxHTML(textboxObject, desc) {
  var descriptionHtml = "";
  if (isSet(desc) && desc !== "") {
    textboxObject.lblClass += " bedbtip";
    descriptionHtml = FullDescHtml({
      div1Class: "int-ct3 info_iconeqbl",
      div2Class: "blnewform_sprit inft",
      div3Class: "nwarN bedsnone full_desc Tp8",
      fullDesc: desc,
    });
  }
  var textHTML =
    "<div class='" +
    textboxObject.divClass +
    "'>" +
    MakeLabel(textboxObject, descriptionHtml) +
    TextBoxIp(textboxObject);

  return textHTML;
}

function returnFirstPrefilledUnit(tmpId) {
  if (
    isSet(ReqObj.Form[tmpId].userFilledIsq) &&
    isSet(ReqObj.Form[tmpId].userFilledIsq[1]) &&
    isSet(ReqObj.Form[tmpId].userFilledIsq[1].optionsValue) &&
    ReqObj.Form[tmpId].userFilledIsq[1].optionsValue !== ""
  ) {
    return handleSpecialQuotes(
      ReqObj.Form[tmpId].userFilledIsq[1].optionsValue
    );
  } else return "";
}

function TextBoxIp(textboxObject, addLabel, addvalue) {
  var invalue =
    isSet(addvalue) && addvalue === true
      ? isSet(textboxObject.ans) && textboxObject.ans != ""
        ? textboxObject.ans[0]
        : ReqObj.Form[textboxObject.inputId.substring(1, 5)].qutAnswers[0]
      : typeof textboxObject.ans == "string"
        ? textboxObject.ans
        : textboxObject.ans.length === 0
          ? ""
          : textboxObject.ans[0];
  invalue = handleSpecialQuotes(invalue);
  invalue =
    textboxObject.type === "ut" &&
      (invalue.toLowerCase() === "none" ||
        invalue.toLowerCase() === "other" ||
        invalue.toLowerCase() === "others")
      ? ""
      : invalue;
  var tmpId = textboxObject.inputId.substring(1, 5);
  var prefil = returnFirstPrefilledUnit(tmpId);
  invalue =
    textboxObject.type === "ut" &&
      typeof prefil !== "undefined" &&
      prefil !== ""
      ? prefil
      : invalue;
  invalue =
    textboxObject.type === "ut"
      ? invalue.charAt(0).toUpperCase() + invalue.slice(1)
      : invalue;
  if (textboxObject.QuestionDesc.toLowerCase() === "quantity unit") {
    ReqObj.Form[tmpId].isUnitPrefilled = invalue !== "" ? true : false;
    ReqObj.Form[tmpId].preFilledUnitDetail = {
      invalue: invalue,
      id: textboxObject.inputId,
    };
  }
  var inhtml =
    isSet(addLabel) && addLabel === true
      ? "<label id='" +
      textboxObject.labelId +
      "' class='" +
      textboxObject.lblClass +
      "'>" +
      textboxObject.QuestionDesc +
      "</label>"
      : "";
  var locprop = "";
  var isq_msg = textboxObject["QuestionDesc"].toLowerCase();
  if (
    isq_msg == "pickup location" ||
    isq_msg == "drop location" ||
    isq_msg == "pickup city" ||
    isq_msg == "drop city"
  ) {
    locprop =
      '" maxlength = "100" autocomplete = "off" role = "textbox" aria-autocomplete="list" aria-haspopup="true"';
    textboxObject.inputClass += " ui-autocomplete-input";
    ReqObj.Form[tmpId].locisqId.push(textboxObject.inputId);
  }
  return (
    inhtml +
    "<input type='text' class='" +
    textboxObject.inputClass +
    "' id='" +
    textboxObject.inputId +
    "' name='" +
    textboxObject.inputName +
    "' optionid = '" +
    textboxObject.optionId +
    "' maxlength='" +
    textboxObject.maxlength +
    "' autocomplete='off' value='" +
    invalue +
    "' role='textbox' placeholder = '" +
    textboxObject.placeholder +
    "'" +
    locprop +
    "/>"
  );
}

/**
 *@description returns the selectbox html for the ISQ
 *
 *
 * @returns HTML for the select block
 */
function SelectBox(SelectObject, desc) {
  var descriptionHtml = "";
  if (isSet(desc) && desc !== "") {
    SelectObject.lblClass += " bedbtip";
    descriptionHtml = FullDescHtml({
      div1Class: "int-ct3 info_iconeqbl",
      div2Class: "blnewform_sprit inft",
      div3Class: "nwarN bedsnone full_desc Tp8",
      fullDesc: desc,
    });
  }

  var selectbox =
    "<div class='" +
    SelectObject.divClass +
    "'>" +
    MakeLabel(SelectObject, descriptionHtml) +
    "<select class='" +
    SelectObject.selectClass +
    "'";
  if (typeof SelectObject.onchange !== "undefined" && SelectObject.onchange) {
    selectbox += " onchange = 'funcOth(id)'";
  }
  selectbox +=
    " name='" +
    SelectObject.selectName +
    "' id='" +
    SelectObject.selectId +
    "'><option value=''>" +
    SelectObject.optionValue +
    "</option>";
  return selectbox;
}

function SelectBoxIp(SelectObject, tmpId) {
  var element = IsChatbl(tmpId) ? "ul" : "select";
  var htmlofsel = "<" + element + " class='" + SelectObject.selectClass + "'";
  if (typeof SelectObject.onchange !== "undefined" && SelectObject.onchange) {
    htmlofsel += " onchange = 'funcOth(id)'";
  }
  htmlofsel +=
    " name='" +
    SelectObject.selectName +
    "' id='" +
    SelectObject.selectId +
    "'>";
  htmlofsel += IsChatbl(tmpId)
    ? "<li value='' disabled = 'true'>" + SelectObject.optionValue + "</li>"
    : "<option value=''>" + SelectObject.optionValue + "</option>";
  return htmlofsel;
}

/**
 *@description returns the others box  html for checkoox and radio box
 *
 *
 * @returns string
 */

function OthersBox(OtherBoxObject, tmpId) {
  var html = "<div class='" + OtherBoxObject.divClass + "'><input type='text'";
  html += IsChatbl(tmpId)
    ? "class='cbl_othinpt be-input isq_txtbx isq-st2'"
    : isSSB(tmpId)
      ? " class='be-input'"
      : " class='be-input isq_txtbx isq-st2' ";
  html +=
    " name='" +
    OtherBoxObject.inputName +
    "' id='" +
    OtherBoxObject.inputId +
    "' placeholder='Other Option' value='" +
    OtherBoxObject.ans +
    "'>";
  html += isSSB(tmpId)
    ? "</div>"
    : "<label for='" +
    OtherBoxObject.inputId +
    "' optionid = " +
    OtherBoxObject.optionId +
    "></label></div>";
  return html;
}

function FullDescHtml(fullDescObject) {
  return (
    "<div class='" +
    fullDescObject.div1Class +
    "'><div class='" +
    fullDescObject.div2Class +
    "'></div><div class='" +
    fullDescObject.div3Class +
    "'>" +
    fullDescObject.fullDesc +
    "</div></div>"
  );
}

function CheckBox(tmpId, CheckboxObject, errorObject) {
  var html =
    "<div class='" +
    CheckboxObject.divClass1 +
    "'>" +
    errorBlockFunction(errorObject) +
    "<input type='checkbox' class='" +
    CheckboxObject.inputClass +
    " ' name='" +
    CheckboxObject.templateId +
    "checkbox_name" +
    CheckboxObject.questionCount +
    "' id='" +
    CheckboxObject.templateId +
    "checkbox_name" +
    CheckboxObject.questionCount +
    "_option" +
    parseInt(CheckboxObject.i + 1) +
    "' value='" +
    CheckboxObject.option_desc +
    "'" +
    CheckboxObject.checked +
    "><label optionid=" +
    CheckboxObject.option_id +
    "  for='" +
    CheckboxObject.templateId +
    "checkbox_name" +
    CheckboxObject.questionCount +
    "_option" +
    parseInt(CheckboxObject.i + 1) +
    "' class='" +
    CheckboxObject.labelClass +
    "'>";
  html +=
    IsChatbl(tmpId) || isSSB(tmpId)
      ? ""
      : "<div class='bechk-in bebr4'><div class='" +
      CheckboxObject.divClass2 +
      "'></div></div>";
  html += isSSB(tmpId)
    ? CheckboxObject.option_desc + "</label></div>"
    : "<span class='" +
    CheckboxObject.spanClass +
    "' >" +
    CheckboxObject.option_desc +
    "</span></label></div>";
  return html;
}

function RadioBox(tmpId, RadioboxObject, errorObject) {
  var screen_no =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? ReqObj.Form[tmpId].FormSequence.StepCounter + 1
      : "";
  var toadd =
    screen_no !== ""
      ? RadioboxObject.templateId + "_" + screen_no
      : RadioboxObject.templateId;

  var RadioDiv =
    "<div class='" +
    RadioboxObject.divClass1 +
    "'>" +
    errorBlockFunction(errorObject) +
    "<input type='radio' class='" +
    RadioboxObject.inputClass +
    "' name='" +
    RadioboxObject.templateId +
    "radio_name" +
    RadioboxObject.questionCount +
    screen_no +
    "' id='" +
    toadd +
    "_radio_name" +
    RadioboxObject.questionCount +
    "_option" +
    parseInt(RadioboxObject.i + 1) +
    "' value='" +
    RadioboxObject.option_desc +
    "'" +
    RadioboxObject.checked +
    "><label optionid=" +
    RadioboxObject.option_id +
    " for='" +
    toadd +
    "_radio_name" +
    RadioboxObject.questionCount +
    "_option" +
    parseInt(RadioboxObject.i + 1);
  RadioDiv += isSSB(tmpId)
    ? "' class='" + ssbClass("radlbl", tmpId) + "'"
    : "' class='bepr'";
  if (isSet(RadioboxObject.cityFunc)) {
    RadioDiv += RadioboxObject.cityFunc;
  }
  RadioDiv += ">";
  RadioDiv +=
    IsChatbl(tmpId) || isSSB(tmpId)
      ? ""
      : "<div class='bechk-in'><div class='" +
      RadioboxObject.divClass2 +
      "'></div></div>";
  RadioDiv +=
    "<span class='" +
    RadioboxObject.spanClass +
    "' id='" +
    toadd +
    "_rad_chk" +
    RadioboxObject.questionCount +
    "_option" +
    parseInt(RadioboxObject.i + 1) +
    "' >" +
    RadioboxObject.option_desc +
    "</span></label></div>";
  return RadioDiv;
}

function StructureIsq(tmpId, user) {
  if (isSet(ReqObj.Form[tmpId].plsqArr) && ReqObj.Form[tmpId].plsqArr !== "") {
    var res = ReqObj.Form[tmpId].plsqArr.split("#");
    res = isSet(res) ? res : "";
    for (var counter = 0; counter !== res.length; counter++) {
      var ques_arr = res[counter].split(":");
      ques_arr[0] = trimVal(unescape(ques_arr[0]).toLowerCase());
      if (BlEnqGenerated(tmpId)) {
        ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] = unescape(ques_arr[1]);
        if (
          isSet(ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]]) &&
          ques_arr[0] !== "preferred_location"
        ) {
          //to convert all the prefill isq in lower case
          ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] =
            ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]].split(", ");
        }
      } else {
        var updatedIsq = unescape(ques_arr[1]);
        if (isSet(updatedIsq)) {
          updatedIsq = updatedIsq.split(", ");
          updatedIsq = isSet(updatedIsq) ? updatedIsq : "";
          if (updatedIsq.length === 1)
            ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] = updatedIsq;
          else ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] = [];
        }
      }

      if (ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] instanceof Array) {
        for (
          var prefillIsqloop = 0;
          prefillIsqloop < ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]].length;
          prefillIsqloop++
        ) {
          ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]][prefillIsqloop] =
            trimVal(
              ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]][prefillIsqloop]
            );
        }
      }
    }

    //run a loop here to lowercase all values
  }
  for (var i = 0; i < ReqObj.Form[tmpId].userFilledIsq.length; i++) {
    if (
      notEmpty(ReqObj.Form[tmpId].userFilledIsq[i].questionsDesc) &&
      notEmpty(ReqObj.Form[tmpId].userFilledIsq[i].optionsValue)
    ) {
      var answer = ReqObj.Form[tmpId].userFilledIsq[i].optionsValue.split(", ");
      answer = isSet(answer) ? answer : "";
      for (var j = 0; j < answer.length; j++) {
        if (isSet(answer[j])) answer[j] = trimVal(answer[j]);
      }
      ReqObj.Form[tmpId].preFilledIsq[
        ReqObj.Form[tmpId].userFilledIsq[i].questionsDesc.toLowerCase()
      ] = answer;
    }
  }
  if (ReqObj.Form[tmpId].preFilledIsq.quantity) {
    //quantity '0' check
    if (ReqObj.Form[tmpId].preFilledIsq.quantity[0][0] == "0") {
      ReqObj.Form[tmpId].preFilledIsq.quantity[0] = "";
      ReqObj.Form[tmpId].userFilledIsq[0].optionsValue = "";
    }
  }

  if (isSet(ReqObj.Form[tmpId].preFilledIsq["preferred_location"])) {
    var prefilled = ReqObj.Form[tmpId].preFilledIsq["preferred_location"];
    if (isSet(prefilled.match(/Local Area/))) {
      ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"] = ["Local Only"];
    } else if (isSet(prefilled.match(/all over India can contact/))) {
      ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"] = [
        "Anywhere in India",
      ];
    } else if (isSet(prefilled.match(/will/))) {
      ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"] = [
        "Specific City",
      ];
    }
  }
}

function FillIsq(questionText, tmpId) {
  if (isSet(questionText)) {
    questionText = trimVal(questionText.toLowerCase());
    if (questionText === "quantity" || questionText === "quantity unit")
      return quantiyUnitPrefill(questionText, tmpId);
    var index = checkprop(questionText, tmpId);
    if (isSet(index)) {
      var value = ReqObj.Form[tmpId].preFilledIsq[index];
      delete ReqObj.Form[tmpId].preFilledIsq[index];
      return value;
    }
    return null;
  }
}

function quantiyUnitPrefill(questionText, tmpId) {
  if (ReqObj.Form[tmpId].preFilledIsq.hasOwnProperty(questionText)) {
    var value = ReqObj.Form[tmpId].preFilledIsq[questionText];
    delete ReqObj.Form[tmpId].preFilledIsq[questionText];
    return value;
  }
  return null;
}

function checkprop(questionText, tmpId) {
  var prop = Object.getOwnPropertyNames(ReqObj.Form[tmpId].preFilledIsq);
  for (var i = 0; i < prop.length; i++) {
    if (prop[i] !== "" && prop[i].toLowerCase().includes("usage") && questionText.toLowerCase().includes("age",0)) continue;   // usage-age autofill bug
    if (prop[i] !== "" && prop[i].includes(questionText)) return prop[i];
    if (
      questionText.toLowerCase().includes("usage") ||
      questionText.toLowerCase().includes("application")
    ) {
      if (
        prop[i] !== "" &&
        (prop[i].includes(questionText) || questionText.includes(prop[i]))
      )
        return prop[i];
    }
  }

  return null;
}

function SelBoxMSg(QuestionText, tmpId) {
  var defaultmsg =
    isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0
      ? "Unit"
      : "Select a Value";
  if (isSet(QuestionText)) {
    var QuestionTextMatch = trimVal(QuestionText.toLowerCase());
    if (QuestionTextMatch in SelectBoxStaticMsg) {
      var msg = SelectBoxStaticMsg[QuestionTextMatch];
      if (
        isSet(msg) &&
        isSet(tmpId) &&
        IsChatbl(tmpId) &&
        isSet(msg.chatbl) &&
        msg.chatbl !== ""
      ) {
        return msg.chatbl;
      } else {
        return isImageVidEnq(tmpId) &&
          ReqObj.Form[tmpId].FormSequence.StepCounter === 0
          ? msg.imgvidfrst
          : msg.default;
      }
    } else {
      return defaultmsg;
    }
  }
  return defaultmsg;
}

function getIsqQuestions(IsqObj, todo, tmpId) {
  // Object Position is necessary for classes
  //if (!isSet(ObjectPosition)) ObjectPosition = 0; // can be ignored here
  if (todo === "allquestions")
    ReqObj.Form[tmpId].Isq.getIsqQuestionString.push(
      IsqObj.IM_SPEC_MASTER_DESC
    );
  else if (todo === "current")
    ReqObj.Form[tmpId].Isq.currentQuestionString.push(
      IsqObj.IM_SPEC_MASTER_DESC
    );
}

function tov1(tmpId, tval) {
  var stval = tval.split(" ");
  var len = stval.length;
  ReqObj.Form[tmpId].cName.tov1 =
    stval[len - 1].toLowerCase() === "crore" ||
      (stval[len - 1].toLowerCase() === "lakh" && parseInt(stval[len - 2]) > 1)
      ? true
      : false;
}

function SelectBoxEvents(tmpId) {
  //(isSSB(tmpId) && isnewSSB(tmpId)) ? $("select.betextclr").parent().addClass("focused") :"";
  $("select.betextclr")
    .off("change click")
    .on("change click", function () {
      var SelBoxEl = $(this);
      if ($(this).val() === "") {
        SelBoxEl.css("color", "#9e9e9e");
        SelBoxEl.parent().siblings().children("label").removeClass("redc");
        SelBoxEl.parent().siblings().children(".isq_error_block").remove();
        SelBoxEl.parent()
          .siblings()
          .children(".be-input")
          .removeClass("highlight-err");
      } else {
        SelBoxEl.css("color", "#333");
        SelBoxEl.removeClass("highlight-err");
        SelBoxEl.siblings("label").removeClass("redc");
        SelBoxEl.siblings(".isq_error_block").remove();
      }
      if (
        !isEnq(tmpId) &&
        ReqObj.Form[$(this)[0].id.substring(1, 5)].cName.tov === true
      ) {
        tov1($(this)[0].id.substring(1, 5), $(this).val());
        onCName($(this)[0].id.substring(1, 5), true);
      }
    });
}

function InputBoxEvents(tmpId) {
  setTimeout(function () {
    $(".cbl_qunty").focus();
    isSet($(".cbl_isq_grp").children()[0])
      ? $(".cbl_isq_grp").children()[0].focus()
      : "";
  }, 1800);
  $(".cbl_qtut .cbl_unit .cbl_qtut")
    .off("click")
    .on("click", function () {
      removechatblerror(tmpId);
    });

  $(".inpt_errorbx")
    .off("click keyup")
    .on("click keyup", function () {
      var InputBoxEl = $(this);
      InputBoxEl.removeClass("highlight-err");
      InputBoxEl.siblings("label").removeClass("redc");

      InputBoxEl.siblings(".isq_error_block").remove();
      InputBoxEl.siblings("select.betextclr").removeClass("highlight-err");

      if (isSet(InputBoxEl.val()) && trimVal(InputBoxEl.val()) === "") {
        InputBoxEl.parent().siblings().children("label").removeClass("redc");
        InputBoxEl.parent().siblings().children(".isq_error_block").remove();
        InputBoxEl.parent()
          .siblings()
          .children(".be-input")
          .removeClass("highlight-err");
      }
    });
}

function InputBoxAutoFocus(tmpId) {
  var el = $("input[type=text]");
  var len = el.length;
  for (var i = 0; i < len; i++) {
    if ($(el[i]).hasClass("imgoneqty")) {
      var ele2 = $(el[i]).attr("id");
      $("#" + ele2).focus();
    }
  }
}
function IsqAlreadyPresent(tmpId, text) {
  if (
    isSet(tmpId) &&
    notEmpty(text) &&
    isSet(ReqObj.Form[tmpId].questionsDesc)
  ) {
    for (var i = 0; i < ReqObj.Form[tmpId].questionsDesc.length; i++) {
      if (
        text.toLowerCase() === ReqObj.Form[tmpId].questionsDesc[i].toLowerCase()
      )
        return i;
    }
  }
  return -1;
}

function GetAnswer(tmpId, type) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId].Isq.CurrentScreenAnswers)) {
    var Text = ReqObj.Form[tmpId].Isq.CurrentScreenAnswers;
    Text =
      Text !== "" && Text !== "Not Answered" && IsChatbl(tmpId)
        ? ReqObj.Form[tmpId].Isq.KeyQuestion + ": " + Text
        : Text;
    ReqObj.Form[tmpId].Isq.CurrentScreenAnswers = "";
    return Text;
  }
}

function returnValidateTypeError(optionValue, questionText) {
  if (questionText === "quantity") {
    if (parseInt(optionValue) === 0) return "1";
    if (isHindi(optionValue) === true || isAllNumbers(optionValue) === false)
      return "1";
  }
  if (questionText === "quantity unit") {
    if (
      isHindi(optionValue) === true ||
      /^[a-zA-Z0-9 ]*$/.test(optionValue) === false
    )
      return "1";
  }
  return "2";
}

var supplier = {
  1: { name: "Leading Supplier", class: "equLs" },
  2: { name: "Star Supplier", class: "equSs" },
};
var verified = {
  1: { name: "TrustSEAL Verified", class: "equTs" },
  2: { name: "Verified Supplier", class: "equVs" },
};

var verifiedexporter = {
  1: { name: "Verified Exporter", class: "equVe" }
};
function isPnsEnq(tmpId) {
  //PNS on enq form
  if (isSet(ReqObj.Form[tmpId].pnsNumber) && isSet(ReqObj.Form[tmpId].ctaName) && (ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call_next" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call_pre" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e"))
    return true;
  else return false;
}
function getProdDetailsHtml(tmpId, typeofform, step) {
  var html = pdpenqImage(tmpId) ? "<div class='epLf30'>" : "";

  html += returnContainer("t" + tmpId, "_Prodname" + step, "", "", "", "") + "</div>";

  var pprice = returnContainer("t" + tmpId, "_ProdPrice" + step, "befs16", "", "", "") + "<span id='t" + tmpId + "_price" + step + "'></span ><span id='t" + tmpId + "_unit" + step + "'></span > " + "</div > ";

  var pcom = returnContainer("t" + tmpId, "_Compname" + step, "befs16", "", "", "") + "</div>";

  var psold = returnContainer("t" + tmpId, "_soldBy" + step, "befs16", "", "", "") + "<span id='t" + tmpId + "_sold" + step + "'></span><span id='t" + tmpId + "_addr" + step + "'></span>" + "</div>";

  var pnsno = isSet(ReqObj.Form[tmpId].pnsNumber) ? ReqObj.Form[tmpId].pnsNumber : "09XXXXXXXX";

  if (currentISO() === "IN" )
    pnsno = [pnsno.slice(0, 11), " ", pnsno.slice(11)].join('');   // no breathing space in pns number

  var enqpns = returnContainer("t" + tmpId, "_pnsEnq" + step, "befs16", "", "", "") + "<span class='pnsEnq'  ><span id='pnsnoenq' class='pnsno'>" + pnsno + "</span></span>" + "</div>"; //pns on enq form

  html += pdpenqImage(tmpId) ? "</div><div class='ibgc epLf30 epB10 epT10'>" : direnqImage(tmpId) ? "<div >" : "";

  html = html + pprice + pcom + psold;

  if (isPnsEnq(tmpId) )
    //pns on enq form
    html += enqpns;
  if (pdpenqImage(tmpId) || direnqImage(tmpId)) {
    var review = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls.reviewCount) && ReqObj.Form[tmpId].additionalDtls.reviewCount !== 0 ? ReqObj.Form[tmpId].additionalDtls.reviewCount : -1;

    var starCount = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls.seller_rating) && ReqObj.Form[tmpId].additionalDtls.seller_rating !== 0 ? ReqObj.Form[tmpId].additionalDtls.seller_rating : 0;

    if (starCount && review && !(parseInt(starCount) <= 0 && parseInt(review) <= 0)) {
      html += '<div class="befs14 eqRC1 disp-inl bemt5">';
      if (parseInt(starCount) > 0) {
        var width_par = (starCount / 5) * 100;
        html += '<span class="befwt">' + starCount + '</span>/5 <div class="eqsRt disp-inl e_f18 txtl bepr"><div class="eqflsRt eqd_l0 beabult" style="width:' + width_par + '%"><span>★★★★★</span></div><div class="eqemsRt"><span>★★★★★</span></div></div>';
      }
      html += parseInt(review) > 0 ? '<span class="eqRC2 epf12">(' + review + " Review)</span>" : "";
      html += "</div>";
    }
    var verf = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls["verified"]) ? ReqObj.Form[tmpId].additionalDtls["verified"] : 0;
    var supp = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls["supplier"]) ? ReqObj.Form[tmpId].additionalDtls["supplier"] : 0;

    var verfexp = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls["VerifiedExporter"]) ? ReqObj.Form[tmpId].additionalDtls["VerifiedExporter"] : 0;

    if (direnqImage(tmpId)) {
      html += '<div class="idsf eflwp befs14 eqRC3 bemt5 sldby">';
    }
    else {
      html += '<div class="idsf eflwp befs14 eqRC3 bemt5 ">';
    }

    if (supp === "1" || supp === "2")
      html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + supplier[supp]["class"] + '"></i>' + supplier[supp]["name"] + "</div>";

    if (verf === "1" || verf === "2")
      html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + verified[verf]["class"] + '"></i>' + verified[verf]["name"] + "</div>";
    if (direnqImage(tmpId)) {
      if (verfexp === "1")
        html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + verifiedexporter[verfexp]["class"] + '"></i>' + verifiedexporter[verfexp]["name"] + "</div>";
    }
    //   if(verfexp === "1")
    //     html +=
    //       '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' +
    //       verifiedexporter[verfexp]["class"] +
    //       '"></i>' +
    //       verifiedexporter[verfexp]["name"] +
    //       "</div>";

    html += "</div>";
    html += "</div>";
  }
  var isq_class = pdpenqImage(tmpId) ? "befs16 mt20 content-centre idsf epLf30" : "";
  html += returnContainer("t" + tmpId, "_isqdetails" + step, isq_class, "", "", "") + "</div>";
  return html;
}

function prodDetailsData(event) {
  var datavalue = {};
  datavalue["locality"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].rcvLocality) &&
      ReqObj.Form[event.initialdata.tmpId].rcvLocality !== ""
      ? ReqObj.Form[event.initialdata.tmpId].rcvLocality
      : "";
  datavalue["city"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].rcvCity) &&
      ReqObj.Form[event.initialdata.tmpId].rcvCity !== ""
      ? ReqObj.Form[event.initialdata.tmpId].rcvCity
      : "";
  datavalue["state"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].rcvState) &&
      ReqObj.Form[event.initialdata.tmpId].rcvState !== ""
      ? ReqObj.Form[event.initialdata.tmpId].rcvState
      : "";
  datavalue["comp_name"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].rcvName) &&
      ReqObj.Form[event.initialdata.tmpId].rcvName !== ""
      ? ReqObj.Form[event.initialdata.tmpId].rcvName
      : "";
  datavalue["prod_name"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].prodDispName) &&
      ReqObj.Form[event.initialdata.tmpId].prodDispName !== ""
      ? ReqObj.Form[event.initialdata.tmpId].prodDispName
      : isSet(ReqObj.Form[event.initialdata.tmpId].prodName) &&
        ReqObj.Form[event.initialdata.tmpId].prodName !== ""
        ? ReqObj.Form[event.initialdata.tmpId].prodName
        : "";

  var price =
    isSet(ReqObj.Form[event.initialdata.tmpId].price) &&
      ReqObj.Form[event.initialdata.tmpId].price !== ""
      ? ReqObj.Form[event.initialdata.tmpId].price
      : "";
  var pr = "";
  var ut = "";
  if (isSet(price) && price !== "") {
    price = price.replace("₹", "");
    price = price.replace(/Approx(.*?)Rs/, "");
    price = price.replace(/Rs/, "");
    price = price.trim();
    //price = "Rs. " + price;
    pr = price.substring(0, price.indexOf("/")).trim();
    ut = price.substring(price.indexOf("/") + 1);
    if (pr !== "") {
      pr = "&#8377;" + " " + pr + "/"; // don't remove space or use char code
    } else {
      pr = "&#8377;" + ut;
      ut = "";
    }
  }
  //else price = price;

  datavalue["price"] = pr;
  datavalue["unit"] = ut;
  datavalue["modrefType"] = isSet(ReqObj.Form[event.initialdata.tmpId].modrefType) && ReqObj.Form[event.initialdata.tmpId].modrefType !== "" ? ReqObj.Form[event.initialdata.tmpId].modrefType : "";

  // datavalue["sellerIsq"] = (isSet(ReqObj.Form[event.initialdata.tmpId].sellerIsq) && ReqObj.Form[event.initialdata.tmpId].sellerIsq !== "") ? ReqObj.Form[event.initialdata.tmpId].sellerIsq : "";
  datavalue["plsqArr"] = isSet(ReqObj.Form[event.initialdata.tmpId].plsqArr) && ReqObj.Form[event.initialdata.tmpId].plsqArr !== "" ? ReqObj.Form[event.initialdata.tmpId].plsqArr : "";

  return datavalue;
}

function prodDetailsHtmlInsertion(event) {
  prodDetailsHtmlDefautls(event);
  prodNameHtmlInsertion(event);
  compNameHtmlInsertion(event);
  prodPriceHtmlInsertion(event);
  soldByHtmlInsertion(event);

  if (pdpenqImage(event.initialdata.tmpId) || (direnqImage(event.initialdata.tmpId))) {
    isqQuestionHtmlInsertion(event);
  } else if (event.initialdata.typeofform === "image" && isEcomProduct(event.initialdata.tmpId) && event.initialdata.step === "0R") {
  } else if ((event.initialdata.typeofform === "image" || event.initialdata.typeofform === "video") && event.initialdata.step === "0R") {
    if (imeshExist() !== "") {
      $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).html(msg_firimgvid("Enquire now", event.initialdata.tmpId));

      if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1" && event.initialdata.step == "0R")
        $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).append('<div id="t' + event.initialdata.tmpId + '_vcd" class="btmarg"></div>');
    }
  } else {
    isqQuestionHtmlInsertion(event);
  }
  if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1") {
    viewCompleteHtmlInsertion(event);
    $("#t" + event.initialdata.tmpId + "_vcd").on("click", function () {
      let sample = ReqObj.Form[event.initialdata.tmpId].noSampling;
      ReqObj.Form[event.initialdata.tmpId].noSampling = true;
      blenqGATracking("VCD_ImgForm", "Redirect:ProductUrl", getEventLabel(), 0, event.initialdata.tmpId);
      ReqObj.Form[event.initialdata.tmpId].noSampling = sample;
    });
  }
  prodDetailshandleCSS(event);
}
function viewCompleteHtmlInsertion(event) {
  if (isSet(ReqObj.Form[event.initialdata.tmpId].redirectUrl) && isSet(ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"]) && ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"] !== "") {

    let vcdfrm = ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"].endsWith(".html") ? ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"] + '?vcdimgform=1': ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"] + '&vcdimgform=1' ; 

    let vcd = "<a target='_blank' href='" + vcdfrm + "' class='view-c-details'>View Complete Details</a>"
    $("#t" + event.initialdata.tmpId + "_vcd").html(vcd);
  }
}
function prodDetailsHtmlDefautls(event) {
  // $('#t' + event.initialdata.tmpId + '_isqdetails' + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_Compname" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_price" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).html("");
}

function enqImghandleBuutton(tmpId) {
  var x = returnEnquireNowHtml(tmpId);
  var html = x["OuterWrapper"] + x["Label"] + x["ClosingWrapper"];
  $("#t" + tmpId + "_submitdiv").removeClass("befstgo2 bearrowN");
  $("#t" + tmpId + "_submit").removeClass("form-btn").addClass("befstgo2 hovsub").val("Enquire Now");
  $("#t" + tmpId + "_bl_form").html(html);
}

function returnProdCnameUrlHtml(tmpId, key, val, id, cls) {
  var svg = "";
  if (glmodid == "PRODDTL" && key == "produrl") {
    svg = `<svg fill="#2e3192" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -3 24 24" width="17px" height="17px"><path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"/></svg>`;
  }
  if (isImageVidEnq(tmpId) && isSet(ReqObj.Form[tmpId].redirectUrl) && isSet(ReqObj.Form[tmpId].redirectUrl[key]) && ReqObj.Form[tmpId].redirectUrl[key] !== "") {

    let prdnmfrm = ReqObj.Form[tmpId].redirectUrl[key];
    if(key == 'produrl')
      prdnmfrm = ReqObj.Form[tmpId].redirectUrl[key].endsWith(".html") ? ReqObj.Form[tmpId].redirectUrl[key] + '?prdnmfrm=1': ReqObj.Form[tmpId].redirectUrl[key] + '&prdnmfrm=1' ; 

    return ("<a href = '" + prdnmfrm + "' target = '_blank' class='enqa " + cls + "'id = 't" + tmpId + id + "'>" + val + " " + svg + "</a>");
  } else {
    return val;
  }
}

function urlTrack(tmpId, msg) {
  if (glmodid == "PRODDTL" && msg == "Redirect:ProductUrl") {
    var sampling = ReqObj.Form[tmpId].noSampling;
    ReqObj.Form[tmpId].noSampling = true;
    blenqGATracking("Product_Name_Clicked", msg, getEventLabel(), 0, tmpId);
    ReqObj.Form[tmpId].noSampling = sampling;

    return true;
  }
  var formtype = isSet(ReqObj.Form[tmpId].formType) && ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ? "Post Buy Leads" : "Send Enquiry";
  blenqGATracking(formtype, msg, getEventLabel(), 1, tmpId);
  return true;
}

function addZoomImageEvent(event) {
  var tmpId = event.target.id.substring(1, 5);

  var magnifying_area = $("#t" + tmpId + "_prodimg");
  var magnifying_img = $("#t" + tmpId + "_zoomimage");

  var offsetCor = magnifying_area.position();

  if (!isSet(offsetCor) || !isSet(offsetCor.left) || !isSet(offsetCor.top)) {
    return;
  }

  clientX = event.clientX - offsetCor.left;
  clientY = event.clientY - offsetCor.top;

  mWidth = magnifying_area.outerWidth();
  mHeight = magnifying_area.outerHeight();

  clientX = (clientX / mWidth) * 100;
  clientY = (clientY / mHeight) * 100;

  magnifying_img.css(
    "transform",
    "translate(-" + clientX + "%, -" + clientY + "%) scale(2)"
  );
}

function removeZoomImageEvent(event) {
  var tmpId = event.target.id.substring(1, 5);

  var magnifying_img = $("#t" + tmpId + "_zoomimage");

  magnifying_img.css("transform", "translate(-50%, -50%) scale(1)");
}

function addEventZoom(tmpId) {
  ReqObj.Form[tmpId].clicked = true;
  var magnifying_area = $("#t" + tmpId + "_prodimg");
  var magnifying_img = $("#t" + tmpId + "_zoomimage");

  magnifying_area.css("cursor", "zoom-out");
  magnifying_img.css("transform", "translate(-50%, -50%) scale(2)");

  magnifying_area.on("mousemove", addZoomImageEvent);
  magnifying_area.on("mouseleave", removeZoomImageEvent);
}

function removeEventZoom(tmpId) {
  ReqObj.Form[tmpId].clicked = false;
  var magnifying_area = $("#t" + tmpId + "_prodimg");
  var magnifying_img = $("#t" + tmpId + "_zoomimage");

  magnifying_area.css("cursor", "zoom-in");
  magnifying_img.css("transform", "translate(-50%, -50%) scale(1)");

  magnifying_area.off("mousemove", addZoomImageEvent);
  magnifying_area.off("mouseleave", removeZoomImageEvent);
}

function attachEvents(event) {
  var step = event.initialdata.step;
  var tmpId = event.initialdata.tmpId;
  $("a#t" + tmpId + "_ie_prod_" + step).on("click", function () {
    urlTrack(tmpId, "Redirect:ProductUrl", step);
  });
  $("a#t" + tmpId + "_ie_cmp_" + step).on("click", function () {
    urlTrack(tmpId, "Redirect:CompanyUrl");
  });

  var magnifying_area = $("#t" + tmpId + "_prodimg");
  if (isSet(magnifying_area) && step[1] === "L" && (pdpenqImage(tmpId) || direnqImage(tmpId))) {
    magnifying_area.css("cursor", "zoom-in");
    ReqObj.Form[tmpId].clicked = false;

    magnifying_area.on("click", function (event) {
      if(isImageVidEnq(tmpId) && typeof ReqObj.Form[tmpId].zoomtrack === "undefined"){  //image track
        blenqGATracking("Send Enquiry","Zoom Clicked", getEventLabel(), 1, tmpId);
        ReqObj.Form[tmpId].zoomtrack = true;
      }
      if (
        event.target.id === "" ||
        event.target.id.substring(5) === "_beleft" ||
        event.target.id.substring(5) === "_beright"
      ) {
      } else if (!ReqObj.Form[tmpId].clicked) {
        addEventZoom(tmpId);
      } else {
        removeEventZoom(tmpId);
      }
    });
  }
}

function prodNameHtmlInsertion(event) {
  if (
    event.datavalue["modrefType"] !== "company" &&
    event.datavalue["prod_name"] !== ""
  ) {
    $("#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step)
      .html(
        returnProdCnameUrlHtml(
          event.initialdata.tmpId,
          "produrl",
          event.datavalue["prod_name"],
          "_ie_prod_" + event.initialdata.step,
          "enqprd"
        ),
        "enqprd"
      )
      .removeClass("bedsnone")
      .addClass("be-pnm");
  }
}

function compNameHtmlInsertion(event) {
  if (
    event.datavalue["modrefType"] === "company" ||
    (event.datavalue["modrefType"] !== "company" &&
      event.datavalue["prod_name"] === "")
  ) {
    var class_name =
      event.datavalue["prod_name"] === "" ? "eprod be-pnm" : "be-pnm";
    $("#t" + event.initialdata.tmpId + "_Compname" + event.initialdata.step)
      .html(
        returnProdCnameUrlHtml(
          event.initialdata.tmpId,
          "produrl",
          event.datavalue["comp_name"]
        ),
        "_ie_prod_" + event.initialdata.step,
        "enqprd"
      )
      .removeClass("bedsnone befs14 be-inbl")
      .addClass(class_name);
  }
}

function prodPriceHtmlInsertion(event) {
  $("#t" + event.initialdata.tmpId + "_price" + event.initialdata.step).html(
    event.datavalue["price"]
  );
  $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).html(
    event.datavalue["unit"]
  );
}

function soldByHtmlInsertion(event) {
  // if (event.datavalue["modrefType"] !== "company" && event.datavalue["prod_name"] !== "") {
  if (
    event.datavalue["comp_name"] !== "" ||
    event.datavalue["city"] !== "" ||
    event.datavalue["state"] !== ""
  ) {
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html(
      "Sold By - "
    );
    if (event.datavalue["comp_name"] !== "") {
      $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).html(
        returnProdCnameUrlHtml(
          event.initialdata.tmpId,
          "cmpUrl",
          event.datavalue["comp_name"],
          "_ie_cmp_" + event.initialdata.step,
          "enqcmp"
        )
      );
    }
    if (event.datavalue["city"] !== "") {
      $(
        "#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step
      ).append(", " + event.datavalue["city"]);
    }
    if (event.datavalue["state"] !== "") {
      $(
        "#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step
      ).append(", " + event.datavalue["state"]);
    }
  } else
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html(
      ""
    );

  // }
}
//fsdgsdgsdhgs
function isqQuestionHtmlInsertion(event) {
  var plsqArr = decodeURIComponent(event.datavalue["plsqArr"]);
  if (isSet(plsqArr) && plsqArr !== "" ) {
    var count = 0;
    var keyVal = plsqArr.split("#");
    var len = keyVal.length;
    var total = 225;
    if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1" && event.initialdata.step == "0R") {
      $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).append("<div id='enqImgIsq'></div>");
    }
    for (var i = 0; i < len; i++) {
      var selisq = keyVal[i].split(":");
      var ques = selisq[0];
      var varr = selisq[1];
      if (isSet(ques) && ques !== "" && isSet(varr) && varr !== "") {
        var ans = ques + "" + varr;
        var count_val = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? 3 : 4;
        var col_cls1 = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? "eqRC4" : "col111";
        var col_cls2 = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? "eqRC3" : "col77";
        if (ans.length < total && count < count_val) {
          if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1" && event.initialdata.step == "0R") {
            $("#enqImgIsq").append("<p class='" + col_cls1 + "'>" + returnSpan("t" + event.initialdata.tmpId, "_isqkey" + i, ques + ": ", col_cls2, "") + varr + "</p>");
          } else {
            $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).append("<p class='" + col_cls1 + "'>" + returnSpan("t" + event.initialdata.tmpId, "_isqkey" + i, ques + ": ", col_cls2, "") + varr + "</p>");
          }
          total = total - ans.length;
          count++;
        }
        else {
          break;
        }
      }
    }
  }
  if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1" && event.initialdata.step == "0R")
    $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).append('<div id="t' + event.initialdata.tmpId + '_vcd" class="btmarg"></div>');
}

function prodDetailshandleCSS(event) {
  var cl = "eprod";
  var ppricecl = "eqprodpr";
  var pricecl = "eqpr";
  var unitcl = "";
  $("#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step).addClass(cl);
  $("#t" + event.initialdata.tmpId + "_price" + event.initialdata.step).addClass(pricecl);
  $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).addClass(unitcl);
  $("#t" + event.initialdata.tmpId + "_ProdPrice" + event.initialdata.step).removeClass().addClass(ppricecl);
  $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).addClass("eqsold");
  $("#t" + event.initialdata.tmpId + "_soldBy" + event.initialdata.step).removeClass().addClass("eqsoldby");
  if (direnqImage(event.initialdata.tmpId)) {
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).removeClass().addClass("sldby");
    $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).addClass("sldby");
  }
}
/*--------------------------------------------------------------ARROW UI and EVENTS--------------------------------------------------------- */
function hideAllArrows(event, type) {
  var clickeve = event;
  var append =
    isSet(clickeve.cttype) && clickeve.cttype.toLowerCase() === "video"
      ? "Video"
      : "";
  $("#t" + event.initialdata.tmpId + "_bedown").addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_beup").addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_beright" + append).addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_beleft" + append).addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_berightVideo").addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_beleftVideo").addClass("bedsnone");
}
function PostBlEnqUpdate() {
  this.className = "PostBlEnqUpdate";
}
PostBlEnqUpdate.prototype.onSubmit = function (tmpId) {
  if (isSet(tmpId)) {
    var postblenq = PreAjax("PostBlEnqUpdate", tmpId);
    this.sendRequest(postblenq, tmpId);
  }
};
//PostBlEnqUpdate.prototype.defaultEvents = function () {};
PostBlEnqUpdate.prototype.getData = function (tmpId) {
  var data = {};
  var imeshcookie = imeshExist();
  var iploccookie = usercookie.getCookie("iploc");

  data["modId"] = modIdf;
  data["s_ip"] = usercookie.getParameterValue(iploccookie, "gip");
  data["s_ip_country"] = usercookie.getParameterValue(iploccookie, "gcnnm");
  data["s_ip_country_iso"] = usercookie.getParameterValue(
    iploccookie,
    "gcniso"
  );
  var temp = usercookie.getParameterValue(imeshcookie, "fn");
  if (temp === "") {
    var name = ReqObj.UserDetail["fn"];
    if (name) {
      if (name.indexOf(" ") !== -1) {
        var fn = name.substr(0, name.indexOf(" "));
        var ln = name.substr(name.indexOf(" ") + 1);
      }
    }
    data["s_first_name"] = fn !== "" && typeof fn !== "undefined" ? fn : name;
    data["s_last_name"] = ln !== "" && typeof ln !== "undefined" ? ln : "";
  } else data["s_first_name"] = temp;

  temp = usercookie.getParameterValue(imeshcookie, "em");
  data["s_email"] = temp === "" ? ReqObj.UserDetail["em"] : temp;

  temp = usercookie.getParameterValue(imeshcookie, "mb1");
  data["s_mobile"] = temp === "" ? ReqObj.UserDetail["mb1"] : temp;

  data["s_city_name"] = ReqObj.UserDetail["cityname"];
  data["s_glusrid"] = usercookie.getParameterValue(imeshcookie, "glid");

  data["s_country_name"] = usercookie.getParameterValue(iploccookie, "gcnnm");
  data["generationId"] = ReqObj.Form[tmpId].generationId;
  data["s_city_id"] = ReqObj.UserDetail["ctid"];
  data["flag"] = IsChatbl(tmpId) ? "BL" : ReqObj.Form[tmpId].formType;

  if (currentISO() === "IN") {
    data["s_state_name"] =
      isSet(ReqObj.UserDetail["statename"]) &&
        ReqObj.UserDetail["statename"] !== ""
        ? ReqObj.UserDetail["statename"]
        : "";
  }
  if (ReqObj.Form[tmpId].formType === "Enq") {
    data["r_glusrid"] = ReqObj.Form[tmpId].rcvGlid;
    data["rfq_queryDestination"] = ReqObj.Form[tmpId].query_destination;
  }

  return ObjectTrim(data);
};
PostBlEnqUpdate.prototype.sendRequest = function (postblenq, tmpId) {
  var data = this.getData(tmpId);
  if (ValidGenId(ReqObj.Form[tmpId].generationId))
    fireAjaxRequest({
      data: {
        ga: {
          gatype: "PostBlenqUpdate",
          source: "",
          s: true,
          f: true,
        },
        tmpId: tmpId,
        ajaxObj: {
          obj: postblenq,
          s: {
            ss: 1,
            sf: {
              af: 0,
              pa: 1,
            },
            f: 1,
          },
          f: {
            f: 1,
          },
        },
        ajaxtimeout: 0,
        ajaxdata: data,
        hitfinserv: "",
        type: 2,
      },
    });
  else PostAjax(postblenq, tmpId);
};
function FormSeq() {
  this.arraySeq = [];
  this.ServiceSequence = [];
  this.ServiceSequenceBlocked = [];
  this.FullServiceArray = [];
  this.OnCloseServiceArray = [];
  this.OnCloseStep = false;
  this.OnCloseCounter = -1;
  this.NextStepsShown = [];
  /* new addition */
  this._screenCounter = 0;
  this._stepCounter = -1;
  this.journey = {};
}

FormSeq.prototype.GetExistingObject = function (objectName, tmpId) {
  if (isSet(objectName) && isSet(tmpId) && isSet(ReqObj.Form[tmpId].UiArray)) {
    for (var i = 0; i < ReqObj.Form[tmpId].UiArray.length; i++) {
      for (var j = 0; j < ReqObj.Form[tmpId].UiArray[i].length; j++) {
        if (
          ConstructorName(
            ReqObj.Form[tmpId].UiArray[i][j].Obj
          ).toLowerCase() === objectName
        )
          return [i, j];
      }
    }
  }

  return false;
};
FormSeq.prototype.FirstStepSequence = function (tmpId, where) {
  if (isSet(tmpId)) {
    var formType = isSet(ReqObj.Form[tmpId].formType) ? ReqObj.Form[tmpId].formType : "";
    if (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId)) {
      //POPUPCHATBL
      var type = "popup";
    } else var type = "inline";
    SetUserDetails(where);
    var formType = isSet(ReqObj.Form[tmpId].formType) ? ReqObj.Form[tmpId].formType : ""; // remove this!
    /*---------------------------------------------- */
    this.StepCounter = -1;
    ReqObj.Form[tmpId].OnCloseStep = false;
    ReqObj.Form[tmpId].IsthroughClosebtn = false;
    ReqObj.Form[tmpId].isTNCShownOnFirstStep = false;
    ReqObj.Form[tmpId].flags["IsFirstStep"] = true;
    ReqObj.Form[tmpId].PrevAnsPrint = true;
    if (parseInt(ReqObj.Form[tmpId].disableRd) === 1) {
      ReqObj.Form[tmpId].flags.isDescDivShown = true;
    }
    //addBlLoader(tmpId, "center");
    if (IsChatbl(tmpId)) {
      setTimeout(function () {
        addBlLoader(tmpId, "left");
      }, 400);
    } else addBlLoader(tmpId, "center");
    switch (type.trim().toLowerCase()) {
      case "popup":
        if (formType.toLowerCase() === "bl") {
          this._blFlow(tmpId, where);
        } else if (IsChatbl(tmpId)) {
          this.BLChat(tmpId, where);
        } else {
          //this.Enqpopup(tmpId,where);
          this._enq(tmpId, where);
        } /* chat bl pop up to be added here formtype is BL only how to distinguish ?*/
        break;
      case "inline":
        if (isSSB(tmpId)) {
          this.BLSingleStep(tmpId, where);
        } else if (Bl04(tmpId)) {
          this._blFlow(tmpId, where);
        } else if (formType.toLowerCase() === "bl") {
          this._blFlow(tmpId, where);
        } else {
          this._enq(tmpId, where);
        }
        break;
    }
  }
};

/* add a function to create sequence for chat like BL */

function imeshExist() {
  var imeshcookie = usercookie.getCookie("ImeshVisitor");
  return imeshcookie !== "" ? imeshcookie : "";
}

function im_issExist() {
  var cookie = usercookie.getCookie("im_iss");
  return cookie !== "" ? cookie : "";
}

function v4iilexExist() {
  var cookie = usercookie.getCookie("v4iilex");
  return cookie !== "" ? cookie : "";
}

function iplocExist() {
  var iploccookie = usercookie.getCookie("iploc");
  return iploccookie !== "" ? iploccookie : "";
}

function ElExists(el) {
  if (notEmpty(el) && $("#" + el).length > 0) {
    return true;
  } else return false;
}

function CounterScreenId(tmpId, adder) {
  if (isSet(tmpId) && IsPrevBtnImplemented(tmpId)) {
    if (!isSet(adder)) adder = 0;
    var that = ReqObj.Form[tmpId].FormSequence;
    var elId = "t" + tmpId;
    var counter = parseInt(adder, 10);
    var TypeofScreen = {
      type: "",
      counter: 0,
    };
    var type = "";
    var onClose = "onCloseScreen";
    var screen = "screen";
    if (!ValidNumber(counter)) counter = 0;
    if (that.OnCloseCounter > -1) {
      counter += that.OnCloseCounter + 1;
      elId += onClose + counter;
      type = onClose;
    } else {
      if (adder === 1) {
        if (that.StepCounter < ReqObj.Form[tmpId].UiArray.length - 1) {
          counter += that.StepCounter + 1;
          elId += screen + counter;
          type = screen;
        } else {
          counter += that.OnCloseCounter + 1;
          elId += onClose + counter;
          type = onClose;
        }
      } else {
        counter += that.StepCounter + 1;
        elId += screen + counter;
        type = screen;
      }
    }

    return {
      elid: elId,
      type: type,
    };
  } else {
    return "";
  }
}

FormSeq.prototype.prepareToRender = function (
  tmpId,
  FormId,
  HtmlArray,
  HtmlContactArray,
  HtmlProdArray,
  component,
  arrlen
) {
  var IdToHide = "";
  if (isSet(component.Obj.idToAppend) && component.Obj.idToAppend !== "") {
    FormId = component.Obj.idToAppend;
  }
  if (isSet(component.Obj.idToHide) && component.Obj.idToHide !== "") {
    IdToHide = component.Obj.idToHide;
  }
  // console.log(array[i].Obj.idToAppend);
  if (typeof component.Obj.displayHtml === "function") {
    var FormIdSel =
      isSSB(tmpId) && !isnewSSB(tmpId) ? $("#t" + tmpId + FormId) : $(FormId);

    var ReceivedArray = component.Obj.displayHtml(tmpId);
    if (
      arrlen === 1 &&
      ReceivedArray.length === 1 &&
      ReceivedArray[0].length === 0
    ) {
      //if(tmpId.substring(0,2) === "04" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq") ReqObj.Form[tmpId].FormSequence.NextStep(tmpId);
      if(IsChatBLInline(tmpId) && imeshExist() == "") 
      ReqObj.Form[tmpId].FormSequence.BLChatLogin(tmpId);  // new chat bl unidentified
      else if (IsChatbl(tmpId)) ReqObj.Form[tmpId].FormSequence.BLChatRd(tmpId);
    } else {
      if (!isSet(ReceivedArray)) ReceivedArray = [""];
      if (isSSB(tmpId)) {
        FormId === "_contact_detail"
          ? HtmlContactArray.push(ReceivedArray)
          : HtmlProdArray.push(ReceivedArray);
      } else if (isBlInlineFr(tmpId)) {
        FormId === "t" + tmpId + "_partition1"
          ? HtmlContactArray.push(ReceivedArray)
          : HtmlProdArray.push(ReceivedArray);
      } else HtmlArray.push(ReceivedArray);

      if (FormIdSel.hasClass("bedsnone")) {
        FormIdSel.removeClass("bedsnone");
      }
      if (isSet(IdToHide) && IdToHide !== "")
        $(IdToHide).css({
          display: "none",
        });

      return FormIdSel;
    }
  }
};

FormSeq.prototype.RenderUi = function (tmpId, ClassesforTracking, stepNumber) {
  if (isSet(tmpId)) {
    var array = [];
    var that = this;
    var counter = "";
    var type = CounterScreenId(tmpId, 0);
    var elId = type.elid;
    var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : (isInactiveBL(tmpId) && ispdp(tmpId)) ? "Post Buy Leads New" : "Post Buy Leads";
    //inactive changes

    array =
      that.OnCloseCounter > -1
        ? ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter]
        : ReqObj.Form[tmpId].UiArray[that.StepCounter];
    if (
      array.length == 2 &&
      array[0].Obj.className === "RequirementDtl" &&
      array[1].Obj.className === "Isq"
    ) {
      var a = array[0];
      array[0] = array[1];
      array[1] = a;
    }
    ReqObj.Form[tmpId].currentScreen = "";
    if (IsChatbl(tmpId) && ReqObj.Form[tmpId].ischangeProduct) {
      $(".t" + tmpId + "_userInput").each(function () {
        $(this).remove();
      });

      chatblHideTransition(tmpId);
      ReqObj.Form[tmpId].PrevAnsPrint = false;
      ReqObj.Form[tmpId].ischangeProduct = false;
    }

    if (ReqObj.Form[tmpId].PrevAnsPrint)
      questionTransition(ReqObj.Form[tmpId].formType, tmpId);
    if (
      isImageVidEnq(tmpId) &&
      !pdpenqImage(tmpId) &&
      ReqObj.Form[tmpId].FormSequence._stepCounter > 0
    ) {
      $("#t" + tmpId + "_mcont").addClass("eqImSec");
      $("#t" + tmpId + "_thankDiv").addClass("eqImSec");
    }

    if (!ElExists(elId)) {
      var postDisplayStepTracking = "";
      var HtmlArray = [];
      var HtmlContactArray = [];
      var HtmlProdArray = [];
      var len = array.length;
      for (var i = 0; i < array.length; i++) {
        if (isSet(array[i].Obj)) {
          ReqObj.Form[tmpId].currentScreen += array[i].Obj.className;
          var FormId = isSSB(tmpId)
            ? getFormId(ConstructorName(array[i].Obj).toLowerCase())
            : isBlInlineFr(tmpId)
              ? getFormIdMisc(ConstructorName(array[i].Obj).toLowerCase(), tmpId)
              : "#t" + tmpId + "_bl_form";
          var FormIdSel = this.prepareToRender(
            tmpId,
            FormId,
            HtmlArray,
            HtmlContactArray,
            HtmlProdArray,
            array[i],
            len
          );
          if (isSet(array)) {
            if (i < array.length && i > 0) postDisplayStepTracking += "-";
            postDisplayStepTracking += ConstructorName(array[i].Obj);
          }
        }
      }
      if (!IsChatbl(tmpId)) {
        if (isSSB(tmpId)) {
          createHTMLSSB(array, tmpId, HtmlContactArray, HtmlProdArray, counter);
        } else if (isBlInlineFr(tmpId)) {
          RenderHtmlMisc(
            array,
            tmpId,
            [HtmlContactArray, HtmlProdArray],
            counter
          );
        } else RenderHtml(FormIdSel, HtmlArray, tmpId, counter);
      } else {
        if (isSet(HtmlArray) && HtmlArray.length !== 0) {
          var FormId = "#t" + tmpId + "_new_chatbl";
          var FormIdSelQ = $(FormId);
          var htmlQ =
            isSet(ReqObj.Form[tmpId].toAppendQues) &&
              ReqObj.Form[tmpId].toAppendQues
              ? HtmlArray[0][0] + HtmlArray[0][1]
              : HtmlArray[0][0];
          RenderHtml(FormIdSelQ, htmlQ, tmpId, counter);

          ischatblnextquestionasked =
            IsChatBLInline(tmpId) && isChatBlSequenceUpdated ? true : false;
          if (
            IsChatBLInline(tmpId) &&
            !(isSet(ReqObj.audioAdded) && ReqObj.audioAdded)
          ) {
            url = "//apps.imimg.com/js/chatbl_audio.mp3";
            if (appsServerName == "//dev-apps.imimg.com/")
              url = "//dev-apps.imimg.com/js/chatbl_audio.mp3";
            else if (appsServerName == "//stg-apps.imimg.com/")
              url = "//stg-apps.imimg.com/js/chatbl_audio.mp3";
            ReqObj.audio = new Audio(url);
            ReqObj.audioAdded = true;
          }
          setTimeout(function () {
            if (
              IsChatBLInline(tmpId) &&
              !ReqObj.Form[tmpId].fromUpdate &&
              !ReqObj.Form[tmpId].toCloseChatBL &&
              (ReqObj.Form[tmpId].isAutoOpen !== "true" ||
                ReqObj.Form[tmpId].aftrFrmOpnd == "true")
            ) {
              ReqObj.audio.play();
            } else if (ReqObj.Form[tmpId].isAutoOpen === "true") {
              ReqObj.Form[tmpId].aftrFrmOpnd = "true";
            }
            $(".cbl_ques").removeClass("cbl_vh");
            if (ReqObj.Form[tmpId].toAppendQues) {
              $(".t" + tmpId + "_userInput").removeClass("dn");
              $("#t" + tmpId + "_submitNo2")
                .parent()
                .removeClass("dn"); //chat bl bug
              ReqObj.Form[tmpId].toAppendQues = false;
            }
          }, 750);

          FormId = "#t" + tmpId + "_newblchatReply";
          var FormIdSelIn = $(FormId);
          var htmlA =
            isSet(ReqObj.Form[tmpId].toAppendQues) &&
              ReqObj.Form[tmpId].toAppendQues
              ? ""
              : HtmlArray[0][1];
          RenderHtml(FormIdSelIn, htmlA, tmpId, counter);
          setTimeout(function () {   // new chat bl unidentified
            $(".t" + tmpId + "_userInput").removeClass("dn");
          }, 1700);
          setTimeout(function () {   // new chat bl unidentified
            $(".t" + tmpId + "_userInput").removeClass("dn");
            if($("#t" + tmpId + "_tCond").hasClass("bedsnone")){
            IsChatBLInline(tmpId) && ischatblnextquestionasked
              ? $("#t" + tmpId + "_submit").removeAttr("disabled")
              : "";
            }
          }, 2500);
          if (IsChatBLInline(tmpId)) {
            // firefox  bug
                const Elem = (navigator.userAgent.indexOf('Firefox') !== -1) ? 1 : 0 ;
            // 
            if (ReqObj.Form[tmpId].toAppendQues) {
              $("#t" + tmpId + "_isqBoxInput").addClass("cbl_rds");
              // if ($("#t" + tmpId + "_typehere").children()[0])
              //   $("#t" + tmpId + "_typehere").children()[0].placeholder =
              //     "Choose an option above";
              if($("#t" + tmpId + "_typehere").children()[0]){
                $("#t" + tmpId + "_typehere").children()[0].placeholder = "Choose an option above";
                if(Elem){
                  $("#t" + tmpId + "_typehere").children().first().css("width","100%");
                }

              }
              $("#t" + tmpId + "_typehere")
                .removeClass("dn")
                .addClass("cbl_br10");
              $("#t" + tmpId + "_newblchatReply").addClass("dn");
            } else {
              $("#t" + tmpId + "_newblchatReply").removeClass("dn");
              $("#t" + tmpId + "_submitNo2")
                .parent()
                .addClass("dn"); //chat bl bug
              $("#t" + tmpId + "_typehere")
                .addClass("dn")
                .removeClass("cbl_br10");
            }
          }
        }
      }
      if (
        ((isSet(ReqObj.UserDetail["em"]) && ReqObj.UserDetail["em"] !== "") ||
          (isSSB(tmpId) &&
            isSet(ReqObj.Form[tmpId].UserInputs["Email"]) &&
            ReqObj.Form[tmpId].UserInputs["Email"] !== "")) &&
        $("#t" + tmpId + "_thnkemdiv").hasClass("cbl_vh")
      ) {
        isSSB(tmpId)
          ? $("#t" + tmpId + "_thnkemdiv")
            .addClass("mb-fs14 mb-mt15 mb-lh16")
            .removeClass("cbl_vh")
          : $("#t" + tmpId + "_thnkemdiv")
            .addClass("be-grbg")
            .removeClass("cbl_vh");
        var email = isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["Email"]
          : ReqObj.UserDetail["em"];
        var html =
          "Verify your email <b>" +
          email +
          "</b> as suppliers are more likely to contact verified buyers.";
        $("#t" + tmpId + "_thnkemdiv").html(html);
      }

      //if(IsChatBLOverlay(tmpId))
      //$("#t" + tmpId + "_scroll").removeClass("cbl_srlIs");

      for (var i = 0; i < array.length; i++) {
        if (
          isSet(array[i].Obj) &&
          typeof array[i].Obj.defaultEvents === "function"
        )
          array[i].Obj.defaultEvents(tmpId, type);
        if (
          isSet(array[i].Obj) &&
          typeof array[i].Obj.handleButton === "function"
        )
          array[i].Obj.handleButton(tmpId);
        if (
          isSet(array[i].Obj) &&
          typeof array[i].Obj.handleHeading === "function"
        )
          array[i].Obj.handleHeading(tmpId);
      }

      imeshExist() !== "" || currentISO() === "IN"
        ? $("#t" + tmpId + "_gwrap").addClass("bedsnone")
        : $("#t" + tmpId + "_gwrap").removeClass("bedsnone");
      if (Enq04(tmpId) && imeshExist() !== "")
        $("#t" + tmpId + "_pdpPimg").removeClass("frUsr");

      HideSuggester();
      if (tmpId.substring(0, 2) === "09") {
        if (
          array.length === 0 &&
          currentISO() !== "IN" &&
          this.StepCounter === 0 &&
          isImageVidEnq(tmpId)
        )
          enqImghandleBuutton(tmpId);
        ReqObj.Form[tmpId].flags.isFlagSuggSet = false;
      }
      var iso = usercookie.getParameterValue(
        usercookie.getCookie("iploc"),
        "gcniso"
      );
      if (
        ReqObj.ipLoc.zoneISO === "IN" ||
        (iso !== "" && iso !== "IN") ||
        (ReqObj.ipLoc.zoneISO === "OTHER" && iso === "IN") ||
        ReqObj.ipLoc.callIpFlagSugg === true
      )
        callFlagSuggestor(tmpId, "load");
      if(!IsChatBLInline(tmpId))  // new chat bl unidentified
      ShowHideTNC(tmpId);
      IsChatBLInline(tmpId) && ischatblnextquestionasked
        ? $("#t" + tmpId + "_submit").attr("disabled", true)
        : "";

      IsChatbl(tmpId)
        ? setTimeout(function () {
          newchatblScroll("t" + tmpId + "_chatScroll", tmpId);
        }, 800)
        : scrollSmoothToBottom("t" + tmpId + "_chatScroll");

      IsChatbl(tmpId)
        ? setTimeout(function () {
          removeBLLoader(tmpId, "left");
        }, 750)
        : removeBLLoader(tmpId, "left");

      var TrackingClasses = ClassesforTracking + "|" + postDisplayStepTracking;
      if (IsChatbl(tmpId)) {
        ReqObj.Form[tmpId].classfortracking = TrackingClasses;
        if (IsChatBLInline(tmpId)) {
          ReqObj.Form[tmpId].source =
            isSet(ReqObj.Form[tmpId].isAutoOpen) &&
              ReqObj.Form[tmpId].isAutoOpen === "true"
              ? "From scroll"
              : "From click";
          ReqObj.Form[tmpId].classfortracking =
            TrackingClasses + "|" + ReqObj.Form[tmpId].source;
        }
      }
      if (this.StepCounter === 0 && IsChatbl(tmpId)) {
        var toappend = "";
        blenqGATracking(form_type, ReqObj.Form[tmpId].classfortracking, getEventLabel(), 0, tmpId); // 1 - why ?
        fireYandex(tmpId); // Yandex
        //console.log("on click chatbl");
      }
      if (tmpId.substr(0, 2) === "01") {
        blInlineTransition(tmpId);
        ReqObj.Form[tmpId].screenNumber += 1;
        if (isBlInline(tmpId)) {
          $("#t" + tmpId + "_belodr").removeAttr("style");
        }
      }

      if (tmpId.substr(0, 2) === "04") {
        ReqObj.Form[tmpId].screenNumber += 1;
      }

      if (!(this.StepCounter === 0 && tmpId.substring(0, 2) !== "09")) {
        if (
          stepNumber > 1 ||
          binaryArraySearch(
            ReqObj.Form[tmpId].TrackedDisplaySteps,
            stepNumber
          ) === -1
        ) {
          if (
            ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
            this.StepCounter === 0
          ) {
            if (ReqObj.Form[tmpId].pvTrackingFired === false)
              imInvokeRequestForGaCode(tmpId, "FormOpen:" + TrackingClasses);
            fireYandex(tmpId); // Yandex
          } else if (
            ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
            this.StepCounter === 0
          ) {
            fireYandex(tmpId); // Yandex
            blenqGATracking(form_type, TrackingClasses, getEventLabel(), 0, tmpId);
          } else
            blenqGATracking(form_type, TrackingClasses, getEventLabel(), 0, tmpId);

          ReqObj.Form[tmpId].TrackedDisplaySteps.push(stepNumber);
        }
      }
    } else {
      HideSuggester();
      removeBLLoader(tmpId, "left");
      modificationOnBack(tmpId);
      $("#" + elId).css("display", "block"); //
      if (isSet(array)) {
        for (var i = 0; i < array.length; i++) {
          ReqObj.Form[tmpId].currentScreen += array[i].Obj.className;
          if (
            isSet(array[i]) &&
            isSet(array[i].Obj) &&
            typeof array[i].Obj.EventIfScreenPresent === "function"
          )
            array[i].Obj.EventIfScreenPresent(tmpId);
        }
      }
      if (ReqObj.Form[tmpId].IsbackClicked) {
        var TrackingClasses = "Back_to_" + ClassesforTracking;
        if (IsChatbl(tmpId)) {
          ReqObj.Form[tmpId].classfortracking = TrackingClasses;
        }

        if (!(this.StepCounter === 0 && tmpId.substring(0, 2) !== "09")) {
          if (
            binaryArraySearch(
              ReqObj.Form[tmpId].BackwardDisplaySteps,
              stepNumber
            ) === -1
          ) {
            blenqGATracking(form_type, TrackingClasses, getEventLabel(), 0, tmpId); // 1 - why ?
            ReqObj.Form[tmpId].BackwardDisplaySteps.push(stepNumber);
          }
        }
      }

      return "";
    }
    setCountryName(tmpId);
  }
  return "";
};

FormSeq.prototype.ChatblTncSubmit = function (tmpId) {
  var that = this;
  $("#t" + tmpId + "_chatBL")
    .off("keypress.Submit")
    .on("keypress.Submit", function (event) {
      var keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode === 13) {
        if (isSet(event) && isSet(event.target)) {
          if (event.target.id === "t" + tmpId + "_tCondCheckBox") {
            beforeformsubmitaction(tmpId);
            ReqObj.Form[tmpId].isSkipOTPClicked =
              IsChatbl(tmpId) || isSSB(tmpId) ? false : "";
            that.FormSubmit(tmpId, event);
          }
        }
      }
    });
};

function beforeformsubmitaction(tmpId) {
  $("#t" + tmpId + "chngPrdDiv").addClass("dn");
  IsChatBLInline(tmpId)
    ? $("#t" + tmpId + "_submit").attr("disabled", true)
    : "";
}

function removechatblerror(tmpId) {
  $("#t" + tmpId + "verify_error").html("");
  $("#t" + tmpId + "cbl_bluline").removeClass("cbl_erred");
  $("#t" + tmpId + "verify_error").removeClass("cbl_errbg");
}

function addChatblError(tmpId, msg) {
  $("#t" + tmpId + "verify_error").html(msg);
  $("#t" + tmpId + "cbl_bluline").addClass("cbl_erred");
  $("#t" + tmpId + "verify_error").addClass("cbl_errbg");
}

FormSeq.prototype.ShowStep = function (tmpId) {
  if (isSet(tmpId)) {
    var that = this;
    var iso = currentISO();
    var stepNumber = parseInt(that.OnCloseCounter, 10) > -1 ? parseInt(this.StepCounter, 10) + 1 + (parseInt(that.OnCloseCounter, 10) + 1) : parseInt(this.StepCounter, 10) + 1;
    var ClassesforTracking = "DisplayStep|" + stepNumber;
    !isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled ? toCallMiniDetails(tmpId) : "";
    ReqObj.Form[tmpId].cName.isq = isSet(ReqObj.Form[tmpId].IsqArray) && ReqObj.Form[tmpId].IsqArray.length > 0 ? true : false;
    this.RenderUi(tmpId, ClassesforTracking, stepNumber);
    this.ChatblTncSubmit(tmpId);

    $("#t" + tmpId + "_changeProduct").off("click").on("click", function (event) {
      beforeformsubmitaction(tmpId);
      ReqObj.Form[tmpId].ischangeProduct = true;
      that.FireTracking(tmpId, event);
      that.BLChatProdName(tmpId);
    });

    $("#t0802_msgCls").on("click", function (event) {
      if (!isSet(ReqObj.popupClosed) || !ReqObj.popupClosed) {
        $("#t0802_msgDiv").addClass("bedsnone");
        $($("#scrollTop").children()[0]).removeClass("tpbCbl");
        pageType = "|PT=" + (isSet(ReqObj.Form[tmpId].pageType) ? ReqObj.Form[tmpId].pageType : "");
        blenqGATrackingMisc("Post Buy Leads", "popupClosed", getEventLabel(), 1, tmpId, "ctaName=msgPopup" + pageType);
        ReqObj.popupClosed = true;
      }
    });

    $(".cbl_txt").off("keyup").on("keyup", function () {
      if (isSet($(".cbl_txt").val()) && $(".cbl_txt").val().length === 0)
        $(".cbl_skip").removeClass("dn");
      else $(".cbl_skip").addClass("dn");
    });

    $(".cbl_radio")
      .off("click")
      .on("click", function (event) {
        var array = [];

        $(".t" + tmpId + "other_radiotemp")
          .off("click")
          .on("click", function (event) {
            if ($(this).hasClass("t" + tmpId + "be-radioboxtemp")) {
              $(this)
                .siblings()
                .each(function () {
                  if ($(this).parent().css("display") !== "none") {
                    isRadioOtherClicked(this);
                  }
                });
            }
          });

        $("input:checked").each(function () {
          $(this).hasClass("cbl_chekbx_btn") || $(this).hasClass("waschecked")
            ? array.push(this.id)
            : "";
        });
        $(".cbl_othinpt")
          .off("keyup")
          .on("keyup", function () {
            if (array.length === 0 && $(".cbl_othinpt").val() === "") {
              $(".cbl_skip").removeClass("dn");
            } else {
              $(".cbl_skip").addClass("dn");
            }
          });
        if (
          isSet($(".cbl_othinpt").val()) &&
          !$("#" + event.target.id).hasClass("cbl_othinpt")
        ) {
          if (array.length === 0 && $(".cbl_othinpt").val() === "") {
            $(".cbl_skip").removeClass("dn");
            $(".cbl_skip").removeClass("bedsnone");
          } else {
            $(".cbl_skip").addClass("dn");
          }
        } else if (!isSet($(".cbl_othinpt").val())) {
          if (array.length === 0) {
            $(".cbl_skip").removeClass("dn");
            $(".cbl_skip").removeClass("bedsnone");
          } else {
            $(".cbl_skip").addClass("dn");
          }
        }
      });

    $(".cbl_qtut")
      .off("keyup")
      .on("keyup", function () {
        if (
          isSet($(".cbl_qtut").val()) &&
          $(".cbl_qtut").val().length === 0 &&
          $(".cbl_qtut").val() === ""
        )
          $(".cbl_skip").removeClass("dn");
        else $(".cbl_skip").addClass("dn");
      });

    $("#t" + tmpId + "_blchatbody")
      .off("click")
      .on("click", function () {
        $(".cbl_selct_unit").addClass("dn");
        $(".cbl_sclBr").addClass("dn");
      });

    $(".cbl_unit")
      .off("focus", function (event) {
        $(".cbl_selct_unit").addClass("dn");
      })
      .on("focus", function (event) {
        var x = event.target.id;
        var count = x.charAt(x.length - 1);
        if ($("#t" + tmpId + "_selectDD" + count).prop("readonly")) {
          funcClick(event.currentTarget, tmpId, count);
        }
      });

    $(".t" + tmpId + "_radSubmit")
      .off("click")
      .on("click", function (event) {
        var imeshcookie = imeshExist();
        if (IsChatbl(tmpId))
          $("#t" + tmpId + "_submitNo2")
            .parent()
            .addClass("dn"); //chat bl bug
        var curEl = this;
        curEl = curEl.children[0];
        var name = $(curEl).attr("name");
        var isSelected = $(curEl).hasClass("waschecked");

        $("input[name='" + name + "']").each(function () {
          $(this).prop("checked", false).removeClass("waschecked");
          $(this).parent().removeClass("sl-box chksl");
          $(this).siblings("label").children(".bechk-in").children().hide();
        });
        $(curEl).prop("checked", true).addClass("waschecked");
        that.FormSubmit(tmpId, event);
      });
    $("#t" + tmpId + "_tCondCheckBox").removeAttr("onclick");

    $("#t" + tmpId + "_tCondCheckBox")
      .off("mousedown.Submit")
      .on("mousedown.Submit", function (event) {
        $(this).on("click", function (event) {
          event.preventDefault();
        });
        if ($("#t" + tmpId + "_tCondCheckBox").is(":checked"))
          $("#t" + tmpId + "_tCondCheckBox").prop("checked", false);
        else $("#t" + tmpId + "_tCondCheckBox").prop("checked", true);

        checkedTNC(tmpId);
      });

    $(".t" + tmpId + "_test1")
      .off("mousedown.Submit")
      .on("mousedown.Submit", function (event) {
        $(this).on("click", function (event) {
          event.preventDefault();
        });
        if ($("#t" + tmpId + "_tCondCheckBox").is(":checked"))
          $("#t" + tmpId + "_tCondCheckBox").prop("checked", false);
        else $("#t" + tmpId + "_tCondCheckBox").prop("checked", true);

        checkedTNC(tmpId);
      });

    $("#t" + tmpId + "_submit")
      .off("mousedown.Submit")
      .on("mousedown.Submit", function (event) {
        if (!$("#t" + tmpId + "_tCondCheckBox").is(":checked")) {
          //tcond highlight
          $(this).on("click", function (event) {
            event.preventDefault();
          });
          $("#t" + tmpId + "_tCond").addClass("tcond_bounce");
          setTimeout(function () {
            $("#t" + tmpId + "_tCond").removeClass("tcond_bounce");
          }, 1000);
        }

        var imeshCookie = imeshExist();
        if (imeshCookie === "" && !checkblockedUser()) {
          ReqObj.Form[tmpId].defSubmit.blurfired =
            ReqObj.Form[tmpId].defSubmit.loginfval !== "" &&
              ReqObj.Form[tmpId].defSubmit.loginfval.toLowerCase() !==
              $("#t" + tmpId + "_login_field")
                .val()
                .toLowerCase()
              ? false
              : ReqObj.Form[tmpId].defSubmit.blurfired;
          if (currentISO() === "IN" && tmpId.substring(0, 2) === "09") {
            ReqObj.Form[tmpId].defSubmit.blurfired = true;
            ReqObj.Form[tmpId].defSubmit.todo = true;
          }
          if (
            ReqObj.Form[tmpId].defSubmit.blurfired === false &&
            $("#t" + tmpId + "_login_field").length > 0 &&
            $("#t" + tmpId + "_login_field").val() !== "" &&
            $("#t" + tmpId + "_q_first_nm" + ReqObj.Form[tmpId].nec.classCount)
              .length > 0 &&
            $(
              "#t" + tmpId + "_q_first_nm" + ReqObj.Form[tmpId].nec.classCount
            ).val() === ""
          ) {
            ReqObj.Form[tmpId].defSubmit.todo = false;
            ReqObj.Form[tmpId].defSubmit.subfired = false;
            ReqObj.Form[tmpId].defSubmit.loginfval = $(
              "#t" + tmpId + "_login_field"
            ).val();
          } else ReqObj.Form[tmpId].defSubmit.todo = true;
        } else ReqObj.Form[tmpId].defSubmit.todo = true;
        ReqObj.Form[tmpId].defSubmit.eve = event;
        ReqObj.Form[tmpId].isSkipOTPClicked =
          IsChatbl(tmpId) || isSSB(tmpId) ? false : "";
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        if (ReqObj.Form[tmpId].defSubmit.todo === true)
          that.FormSubmit(tmpId, event);
      });
    //chat bl bug
    $("#t" + tmpId + "_submitNo1")
      .off("click.Submit")
      .on("click.Submit", function (event) {
        ReqObj.Form[tmpId].isSkipOTPClicked = IsChatbl(tmpId) ? false : "";
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        that.FormSubmit(tmpId, event);
      });

    //chat bl bug
    $("#t" + tmpId + "_submitNo2")
      .off("click.Submit")
      .on("click.Submit", function (event) {
        ReqObj.Form[tmpId].isSkipOTPClicked = IsChatbl(tmpId) ? false : "";
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        that.FormSubmit(tmpId, event);
      });

    $("#t" + tmpId + "_skipOTP")
      .off("click")
      .on("click", function (event) {
        var form_type =
          ReqObj.Form[tmpId].formType === "Enq"
            ? "Send Enquiry"
            : "Post Buy Leads";
        ReqObj.Form[tmpId].isSkipOTPClicked = true;
        ReqObj.Form[tmpId].flags.isSkipOTPClicked = true;
        ReqObj.Form[tmpId].showotpstep = 1;
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        blenqGATracking(form_type, "OTP1NotFilled", getEventLabel(), 1, tmpId);
        that.FormSubmit(tmpId, event);
      });

    $("#t" + tmpId + "_be-backbtn")
      .off("click")
      .on("click", function (event) {
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        that.Back(tmpId, event);
      });

    $("#t" + tmpId + "_backarr")
      .off("click")
      .on("click", function (event) {
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        that.Back(tmpId, event);
      });

    $("#t" + tmpId + "_skipOtpssb")
      .off("click")
      .on("click", function (event) {
        skipOTPSSB(tmpId, that, event);
      });

    $("#t" + tmpId + "_cntdiv").click(function (event) {
      controlDropDown(tmpId);
    });

    $("#t" + tmpId + "flag").click(function () {
      $("#t" + tmpId + "country_dropd .country_list").css("display", "none");
    });
    $("#t" + tmpId + "country_dropd").click(function () {
      $("#t" + tmpId + "flag .country_list").css("display", "none");
    });

    $("#t" + tmpId + "_bl_form")
      .off("keypress.Submit")
      .on("keypress.Submit", function (event) {
        /* enter func */ var keycode = event.keyCode
          ? event.keyCode
          : event.which;

        if (keycode === 13) {
          if (
            !(
              isSet(event) &&
              isSet(event.target) &&
              isSet(event.target.id) &&
              event.target.id === "t" + tmpId + "_reqBoxTemplates"
            )
          ) {
            if (!$("#t" + tmpId + "_submit").is(":disabled")) {
              $("#t" + tmpId + "_chatBL").off("keypress.Submit");
              if (isSSB(tmpId)) ReqObj.Form[tmpId].isEnterclicked = true;
              var imeshCookie = imeshExist();
              if (imeshCookie === "") {
                ReqObj.Form[tmpId].defSubmit.blurfired =
                  ReqObj.Form[tmpId].defSubmit.loginfval !== "" &&
                    ReqObj.Form[tmpId].defSubmit.loginfval.toLowerCase() !==
                    $("#t" + tmpId + "_login_field")
                      .val()
                      .toLowerCase()
                    ? false
                    : ReqObj.Form[tmpId].defSubmit.blurfired;
                if (
                  ReqObj.Form[tmpId].defSubmit.blurfired === false &&
                  $("#t" + tmpId + "_login_field").length > 0 &&
                  $("#t" + tmpId + "_login_field").val() !== "" &&
                  $(
                    "#t" +
                    tmpId +
                    "_q_first_nm" +
                    ReqObj.Form[tmpId].nec.classCount
                  ).length > 0 &&
                  $(
                    "#t" +
                    tmpId +
                    "_q_first_nm" +
                    ReqObj.Form[tmpId].nec.classCount
                  ).val() === ""
                ) {
                  ReqObj.Form[tmpId].defSubmit.todo = false;
                  ReqObj.Form[tmpId].defSubmit.subfired = false;
                  ReqObj.Form[tmpId].defSubmit.loginfval = $(
                    "#t" + tmpId + "_login_field"
                  ).val();
                }
              } else ReqObj.Form[tmpId].defSubmit.todo = true;
              ReqObj.Form[tmpId].defSubmit.eve = event;
              ReqObj.Form[tmpId].isEnterclicked = true;
              if (ReqObj.Form[tmpId].defSubmit.todo === true) {
                that.FormSubmit(tmpId, event);
              } else if (!that.FormSubmit(tmpId, event)) {
                that.ChatblTncSubmit(tmpId);
              }
            }
          }
        }
      });
    $("#t" + tmpId + "_newblchatReply")
      .off("keypress.Submit")
      .on("keypress.Submit", function (event) {
        /* enter func */ var keycode = event.keyCode
          ? event.keyCode
          : event.which;

        if (keycode === 13) {
          //x = "t" + tmpId + "_selectDD";
          // if(event.target.id === x){

          // }else{
          $("#t" + tmpId + "_blchatfooter").focus();

          if (!$("#t" + tmpId + "_submit").is(":disabled")) {
            $("#t" + tmpId + "_chatBL").off("keypress.Submit");
            if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
            if (!that.FormSubmit(tmpId, event)) {
              //attach event
              that.ChatblTncSubmit(tmpId);
            }
          }
        }

        if (keycode === 9) {
        }
      });
    var NotSureEl = $("#t" + tmpId + "_notSure");
    if (NotSureEl.length > 0) {
      NotSureEl.off("click").on("click", function (event) {
        ReqObj.Form[tmpId].NotSure = true;
        ReqObj.Form[tmpId].PrevAnsPrint = true;
        that.FireTracking(tmpId, event);
        var ServiceArray = [];
        var counter = "";
        if (that.OnCloseCounter > -1) {
          counter = that.OnCloseCounter;

          ServiceArray = that.OnCloseServiceArray[counter];
        } else {
          counter = that.StepCounter;
          ServiceArray = that.FullServiceArray[counter];
        }
        that.MoveToNext(tmpId);

        formatServices(ServiceArray, tmpId);
        ServiceSeqGeneration(tmpId);
      });
    }

    if (ispdp(tmpId) && isImageVidEnq(tmpId) && isSet(ReqObj.Form[tmpId].isNewImage) && ReqObj.Form[tmpId].isNewImage === "1" && ReqObj.Form[tmpId].FormSequence._stepCounter > 0)
      $("#t" + tmpId + "_vcd").css({
        display: "none"
      });
  }
};

FormSeq.prototype.getStep = function (tmpId, isOnclose) {
  /*
      we assume that since getstep for onclose will only be called from onclosegetstep so
      if it is true specifically then only it is from on close sequence.
      */
  var that = this;
  if (isOnclose) {
    ReqObj.Form[tmpId].OnCloseStep = true;
    this.OnCloseCounter += 1;
    var CurrentUiArray = ReqObj.Form[tmpId].OnCloseArray;
    var counter = this.OnCloseCounter;
  } else {
    this.StepCounter += 1;
    var CurrentUiArray = ReqObj.Form[tmpId].UiArray;
    var counter = this.StepCounter;
  }
  if (isSet(CurrentUiArray)) {
    if (counter < CurrentUiArray.length) {
      if (IsChatbl(tmpId))
        that.ShowStep(
          tmpId
        ); //setTimeout(function () { that.ShowStep(tmpId); }, 350);
      else that.ShowStep(tmpId);
    }
  }
};

FormSeq.prototype.MakeSeq = function (Objconfig) {
  if (isSet(Objconfig)) {
    ReplaceObject(Objconfig.object, Objconfig.tmpId, this);
    if (Objconfig.object.isService) {
      AttachObject(Objconfig.object, Objconfig.tmpId);
    } else {
      if (typeof Objconfig.object.obj.hasHtml === "function")
        Objconfig.object.obj.hasHtml(Objconfig);
    }
  }
};

function ClearInlineBlTag(tmpId) {
  var InlineEl = $("#t" + tmpId + "_bl_form").parent();
  addDetachedFlag(tmpId);
  ReqObj.Form[tmpId].InlineformParentEl = InlineEl;
  ReqObj.Form[tmpId].InlineformHtml = InlineEl.html();
  InlineEl.html("");
}

FormSeq.prototype.InlineOpenForm = function (tmpId) {
  if (isSet(tmpId)) {
    var that = this;
    ClearInlineBlTag(tmpId);

    $("#t" + tmpId + "_enrichform_maindiv").html(GetPopUpHtml(tmpId)).css({
      display: "table",
    });

    // InlineDefault(tmpId);

    ReqObj.Form[tmpId].btn = $("#t" + tmpId + "_q_send_req_button").html();
    $("#t" + tmpId + "_q_send_req_button").html("");
    if ( ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && isSet(ReqObj.Form[tmpId].displayImage) && ReqObj.Form[tmpId].displayImage === "" && isSet(ReqObj.Form[tmpId].zoomImage) && ReqObj.Form[tmpId].zoomImage === "" ) {
      ReqObj.Form[tmpId].displayImage = isSet(ReqObj.mcatImage) && ReqObj.mcatImage !== "" ? ReqObj.mcatImage : "";
    }

    // leftSideTransition(1, tmpId);

    // $("#t" + tmpId + "_hdg").text(ReturnCorrectVal(ReqObj.Form[tmpId].heading, StaticMessage()));
    OpenBLEnqPopup(tmpId);

    FormCloseButtons(tmpId);
  }
};
function makeObj(Obj, hooks) {
  if (ConstructorName(Obj) !== "") {
    var returnObj = {};
    var KeysArray = GetObjectKeys(hooks);
    if (isSet(Obj)) returnObj["fn"] = Obj;
    for (var i in KeysArray) {
      if (isSet(hooks[KeysArray[i]]))
        returnObj[KeysArray[i]] = hooks[KeysArray[i]];
      else returnObj[KeysArray[i]] = [];
    }
    returnObj["cb"] = [];
    return returnObj;
  } else {
    return {};
    // debugger;
  }
}

function ReplaceObject(Objconfig, tmpId, that) {
  if (!Objconfig.isService) {
    if (Objconfig.toReplace && !(that.GetExistingObject(ConstructorName(Objconfig.obj), tmpId) === false)) {
      Objconfig.obj = Objconfig.arrays.UiArray[i][j].Obj;
    }
  }
}
function FindObject(arr, name, obj) {
  if (isSet(arr) && isSet(name)) {
    for (var i = 0; i < arr.length; i++) {
      if (isSet(arr[i]) && isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === name.toLowerCase()) {
        if (obj.toReplace) {
          arr[i] = obj.ReplaceObj;
        }
        return false;
      } else {
        if (isSet(arr[i]) && FindObject(arr[i].cb, name, obj) === false) {
          return false;
        }
      }
      // }
    }
  }
}
//upto here

function FindCorrectSpot(arr, PushObject, parent) {
  if (isSet(arr)) {
    for (var i = 0; i < arr.length; i++) {
      if (isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === parent.toLowerCase()) {
        arr[i].cb.push(PushObject);
        return true;
      } else {
        if (FindCorrectSpot(arr[i].cb, PushObject, parent) === true) {
          return true;
        }
      }
      // }
    }
  }
}

function ExistsInArray(arr, parent) {
  if (isSet(arr)) {
    for (var i = 0; i < arr.length; i++) {
      if (isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === parent.toLowerCase()) {
        return true;
      } else {
        if (ExistsInArray(arr[i].cb, parent) === true) {
          return true;
        }
      }
      // }
    }
  }
}

function findParent(name) {
  var parent = "";
  for (var key in TreeConfig) {
    if (key.toLowerCase() === name.toLowerCase()) {
      parent = TreeConfig[key];
      break;
    }
  }
  return parent;
}

function AttachObject(Objconfig) {
  // console.log("Attach obj " + Objconfig);
  if (isSet(Objconfig)) {
    if (!Objconfig.isService)
      Objconfig.array.UiArray.push({
        id: Objconfig.objHtmlId,
        Obj: Objconfig.obj,
      });

    if (
      FindObject( Objconfig.array.ServiceArray, ConstructorName(Objconfig.obj), Objconfig ) === false ) {
      // console.log("duplicate", Objconfig.obj);
    } else {
      var parent = findParent(ConstructorName(Objconfig.obj));
      parent = isSet(parent) ? parent : [];

      Objconfig.obj = makeObj(Objconfig.obj, Objconfig.hooks);
      var ObjInsertedOnce = false;

      if (parent.length > 0) {
        for (var i = 0; i < parent.length; i++) {
          if ( FindCorrectSpot( Objconfig.array.ServiceArray, Objconfig.obj, parent[i] ) === true )
            ObjInsertedOnce = true;
          else if (i === parent.length - 1 && !ObjInsertedOnce)
            Objconfig.array.ServiceArray.push(Objconfig.obj);
        }
      } else Objconfig.array.ServiceArray.push(Objconfig.obj);
    }
  }
}

function SetBLEnqDefaultFlags(tempId, instId) {
  if (isSet(tempId) && isSet(instId))
    ReqObj.Form[tempId + instId].flags = CopyObject(Templateconfig[tempId]);
  else ReqObj.Form[tempId + instId].flags = {};
}

function GenOnClick(tmpId) {
  if (GenerationOnClick(tmpId) && UserFilledIsq(tmpId)) {
    if ( isSecondBlEnq(tmpId) && usercookie.getParameterValue(imeshExist(), "uv") !== "V" ) {
      return false;
    }
    return true;
  } else return false;
}

function GenerationOnClick(tmpId) {
  if ( isSet(tmpId) && isSet(ReqObj.Form[tmpId].genOnClick) && ReqObj.Form[tmpId].genOnClick.toLowerCase() === "yes" && tmpId.substring(0, 2) === "09" && isSet(ReqObj.Form[tmpId].formType) && (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" || ReqObj.Form[tmpId].formType.toLowerCase() === "bl") && !isImageVidEnq(tmpId) && usercookie.getParameterValue(imeshExist(), "iso") === "IN" )
    return true;
  else return false;
}

function CallIntentGen(tmpId) {
  if ( isSet(tmpId) && (tmpId.substring(0, 2) === "09" || isIntentBlForm(tmpId)) ) {
    if ( isSet(ReqObj.Form[tmpId].reqSent) && isSet(ReqObj.Form[tmpId].formType) && ReqObj.Form[tmpId].formType.toLowerCase() !== "bl" && !IsChatbl(tmpId) ) {
      if (trimVal(ReqObj.Form[tmpId].reqSent.toLowerCase()) !== "no")
        new Generation(1).onSubmit(tmpId);
    } else {
      if ( isSet(ReqObj.Form[tmpId].formType) && isIntentBlForm(tmpId) && isSet(ReqObj.Form[tmpId].BLIntent) && trimVal(ReqObj.Form[tmpId].BLIntent.toLowerCase()) === "yes" )
        toFireBLIntent(tmpId, "i");
    }
  }
}

function SetDefaultUserInputKeys(tmpId) {
  ReqObj.Form[tmpId].UserInputs = {
    CountryName: "",
    IsCountry: "",
    IsProduct: "",
    ProductName: "",
    PrimaryInfo: "",
    Name: "",
    Mobile: "",
    Email: "",
    City: "",
    CityId: "",
    Requirement: "",
    OTP: "",
    ChangeCountry: "",
    toChange: "",
  };
}

function SetBLEnqDefaultKeys(tmpId) {
  ReqObj.Form[tmpId].cityOth = "";
  ReqObj.Form[tmpId].generationCalled = false;
  ReqObj.userType = "";
  SetDefaultUserInputKeys(tmpId);

  ReqObj.Form[tmpId].generationId = isSet(ReqObj.Form[tmpId].generationId) && ReqObj.Form[tmpId].generationId !== "" && (ReqObj.Form[tmpId].insert === "R" || ReqObj.Form[tmpId].insert === "U") ? parseInt(ReqObj.Form[tmpId].generationId) : defaultGenerationId;
  ReqObj.Form[tmpId].query_destination = -1;
  ReqObj.Form[tmpId].TrackedDisplaySteps = [];
  ReqObj.Form[tmpId].TrackedSubmitSteps = [];
  ReqObj.Form[tmpId].BackwardDisplaySteps = [];
  ReqObj.Form[tmpId].IsbackClicked = false;
  ReqObj.Form[tmpId].IsqUnitArray = [];
  ReqObj.Form[tmpId].IsProdNameChanged = false;
}

function CreateFormObject(tmpId, ReceivedReqObj) {
  ReqObj.Form[tmpId] = CopyObject(ReceivedReqObj);
  ReqObj.Original[tmpId] = CopyObject(ReceivedReqObj);
  if (isSSB(tmpId) && isSet(ReqObj.Original[tmpId]["loginv"]))
    ReqObj.Form[tmpId]["savevalue"] = ReqObj.Original[tmpId]["loginv"];
}

function FormDefaultsFromProperty(LocalReqObj) {
  var tmpId = LocalReqObj.tempId + LocalReqObj.instId;
  if(isSet(ReqObj)) ReqObj.su_cta = 0;
  CreateFormObject(tmpId, LocalReqObj);
  setIplocCookie(tmpId);
  addTemplates(tmpId, template_array);
  updateKeyTypeOfForm(tmpId);
  SetBLEnqDefaultFlags(ReqObj.Form[tmpId].tempId, ReqObj.Form[tmpId].instId);
  PropertyDefault(tmpId, ReqObj.Form[tmpId]);
  SetBLEnqDefaultKeys(tmpId);

  MakeRefText(tmpId);
  if (!GenOnClick(tmpId) && !isEcomProduct(tmpId)) {
    CallIntentGen(tmpId);
  }
  if ( (ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId)) || (isSet(ReqObj.Form[tmpId].isFrInline) && ReqObj.Form[tmpId].isFrInline === "1") ) {
    blinlineDefaults(tmpId);
  }
  if (tmpId.substring(0, 2) === "09") {
    BLEnqPopUpDefault(tmpId);
  }
  if (IsChatbl(tmpId)) {
    OpenChatBLPopup(tmpId);
  }

  return ReqObj.Form[tmpId];
}
function blinlineDefaults(tmpId) {
  if ( isSet(ReqObj.Form[tmpId].isFrInline) && ReqObj.Form[tmpId].isFrInline === "1") {
    html = "<div class='df'><div class='w50 fpr30' id='t" + tmpId + "_partition1'></div><div class='w50 fpr10' id='t" + tmpId + "_partition2'></div></div>";
    $("#t" + tmpId + "_bl_form").html(html);
    $("#t" + tmpId + "_inlineBL").addClass("be-mdleWrap");
  } else {
    $("#t" + tmpId + "_hdg").html( "<div class='beclrW be-bgb cbl_p10 txt-cnt' style='font-size: 18px;'>Tell us what you need</div>" );
    $("#t" + tmpId + "_hdg").removeClass("bedsnone");
  }
}
function blInlineTransition(tmpId) {

  if (isBlInlineFr(tmpId)) {
    var pgtp = "Exporters";
    if ( typeof ims !== "undefined" && isSet(ims) && isSet(ims.pageType) && ims.pageType !== "" ) {
      pgtp = ims.pageType === "Service" ? "Service Providers" : "Exporters";
    }

    $("#t" + tmpId + "_sidePanel").html('<p class="fs18">Looking to source <span id="t' +tmpId +'_mcatNameAdw" class="bo fstit">' +ReqObj.Form[tmpId].mcatName +'</span> from India?</p><p class="fs16 fmt15">Verified ' +pgtp +' are just a click away <span>→</span></p><hr class="spt"> <p class="fs13 bo">IndiaMART is India\'s largest online B2B marketplace<br>Connecting Global Buyers with Indian Exporters</p>').removeClass().addClass("fAdl fs0 wf");

    $("#t" + tmpId + "_contactdiv").remove();
    $("#t" + tmpId + "_wrpDiv").removeClass().addClass("fAdm df");
    $("#t" + tmpId + "_sidePanel").siblings().removeClass().addClass("fAdr flx1");
    $("#t" + tmpId + "_hdg").html("");
    $("#t" + tmpId + "_inlineBL").removeClass();
    return;
  }
  if (isGlIdEven(tmpId)) {
    var contact_html = "";
    if (imeshExist() != "") {
      var name = isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail !== "" ? ReqObj.UserDetail["fn"].length <= 15 ? ReqObj.UserDetail["fn"] : ReqObj.UserDetail["fn"].substr(0, 12) + "..." : "";
      var gdClass = ReqObj.UserDetail["fn"] !== "" ? "inCrl pdinb ml5 gd" : "inCrl pdinb ml5 gd dn";
      var primary_info = currentISO() !== "IN" ? ReqObj.UserDetail["em"] : "+91-" + ReqObj.UserDetail["mb1"];
      var secondary_info = currentISO() !== "IN" ? ReqObj.UserDetail["mb1"] : ReqObj.UserDetail["em"];
      contact_html = '<div class="be-fhdg clr_blue" id="t' + tmpId + '_hdg1">' + getBLHeading(tmpId, "") + '</div><div class="idsf id_aic inUsrh icrP pr ipb10 ml5 bemt5"><span class="' + gdClass + '"></span> <span class="pdinb ml5 befs14">' + name + '</span> <span class="pdinb ml5 inAr"></span><div class="inUsrM p15"><div><b>Your Contact Information</b></div><span class="idb">' + ReqObj.UserDetail["fn"] + '</span> <span class="idb">' + primary_info + '</span> <span class="idb">' + secondary_info + "</span></div></div>";
    } else {
      contact_html = '<div class="be-fhdg clr_blue" id="t' + tmpId + '_hdg1">' + getBLHeading(tmpId, "") + "</div>";
    }
    $("#t" + tmpId + "_sidePanel").addClass("bedsnone");
    $("#t" + tmpId + "_inlineBL").removeClass().addClass("inEql mr20 ibgc p15_25 bdr5 inBxSh iwd100 pr");
    $("#t" + tmpId + "_contactdiv").html(contact_html);
    $("#t" + tmpId + "_wrpDiv").removeClass("betbl");
    ReqObj.Form[tmpId].screenNumber < 0? $("#t" + tmpId + "_hdg").addClass("bedsnone"): ReqObj.Form[tmpId].currentScreen.toLowerCase() !== "userverification"? $("#t" + tmpId + "_hdg").removeClass("bedsnone"): "";
    $("#t" + tmpId + "_belodr").css("width", "100%");
  } else  {
    $("#t" + tmpId + "_sidePanel").removeClass("bedsnone");
    $("#t" + tmpId + "_inlineBL").removeClass().addClass("be-mdleWrap belft betbl bebxs bebdr1");
    $("#t" + tmpId + "_contactdiv").html("");
    $("#t" + tmpId + "_belodr").removeAttr("style");
    $("#t" + tmpId + "_hdg").removeClass("bedsnone");
  }
}
function InitiateSequence(tmpId, where) {
  GetIsqFromService(tmpId);
  if(featOnInctive(tmpId)){      //recoms
    setTimeout(function() {
      GetFeaturedData(tmpId);
    }, 5000);   
  }  
  ReqObj.Form[tmpId].FormSequence = new FormSeq();
  ReqObj.Form[tmpId].FormSequence.FirstStepSequence(tmpId, where);
  FormCloseButtons(tmpId);
}

function OpenBLEnqPopup(tmpId) {
  isBLFormOpen = true;
  var imeshcookie = imeshExist();
  $("#t" + tmpId + "_leftS").removeAttr("style");
  if (!pdpenqImage(tmpId)) {
    $("#t" + tmpId + "_thankDiv").removeClass("eqTst eqRes");
    $("#t" + tmpId + "_mcont").removeClass("eqTst eqRes");
  }
  $("#t" + tmpId + "_bewrapper").removeClass("lightboxwrap");
  if(isLightbox(tmpId)){
    $("#t" + tmpId + "_bewrapper").addClass("lightboxwrap");
  }
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
    if (imeshcookie === "") $("#t" + tmpId + "_leftR").addClass("lftMgn");
    else if (!isInactiveBL(tmpId))
      $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    $("#t" + tmpId + "_thankDiv").addClass("oEq");
    $("#t" + tmpId + "_mcont").addClass("oEq");
    $("#t" + tmpId + "_mcont").removeClass("eqImSec");
    $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
    if (currentISO() !== "IN") $("#t" + tmpId + "_thankDiv").addClass("fnUser");
  } else {
    if ( ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && tmpId.substring(0, 2) === "09" ) {
      $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
      $("#t" + tmpId + "_mcont").addClass("blder");
    } else {
      $("#t" + tmpId + "_mcont").removeClass("blder");
    }
    $("#t" + tmpId + "_mcont").removeClass("oEq");
    $("#t" + tmpId + "_thankDiv").removeClass("oEq");
    if (currentISO() !== "IN")
      $("#t" + tmpId + "_thankDiv").removeClass("fnUser");
    if (imeshcookie === "") $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    else $("#t" + tmpId + "_leftR").removeClass("lftMgn");
  } // resizing
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && tmpId.substring(0, 2) === "01") {
    $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
  }
  if (currentISO() === "IN") $("#t" + tmpId + "_thankDiv").removeClass("nfusr");
  $("#t" + tmpId + "_thankDiv").removeClass("BL_Thnky");
  $("#t" + tmpId + "_bewrapper").removeClass("bedsnone").css({
      display: "block",
    });

    $("#t" + tmpId + "_blkwrap").removeClass("e_bgc");
    $("#t" + tmpId + "_bewrapper").removeClass("e_opn");
    if ($("#t" + tmpId + "OtpMainHeading").hasClass("e_hdg"))
      $("#t" + tmpId + "OtpMainHeading").remove();
    if ($("#t" + tmpId + "_mcont").parent().hasClass("e_whm"))
      $("#t" + tmpId + "_mcont").parent().removeClass().addClass("be-frmcont");
    if (!recomOnInactive(tmpId)) {    //inactive changes 
      $("#t" + tmpId + "_mcont").removeClass("bedsnone").css({
        display: "flex",
      });
    } else {
      $("#t" + tmpId + "_mcont").css({
        display: "block",
      });
    }
    $("#t" + tmpId + "_leftsection").removeClass();
    if ($("#t" + tmpId + "_leftR").hasClass("e_p20")) {
      $("#t" + tmpId + "_leftR").removeClass().addClass("be-Rsc be-frmpop");
    }
    if (isInactiveBL(tmpId)) {
      $("#t" + tmpId + "_leftR").removeClass().addClass("be-Rsc be-frmpop lftMgn be-Rsc2 cbl_br8");
    }


  updateKeyTypeOfForm(tmpId);
  initialiseOuterSection(tmpId); // left and right sections initialisation
  sectionInitialisationStepWise(tmpId, 0); // step wise intialisation
  if ( !( isSet(ReqObj.Form[tmpId].zoomImage) && ReqObj.Form[tmpId].zoomImage !== "" ) && ReqObj.mcatdtl.ping === true && ReqObj.mcatdtl.response === false )
    $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
  else $("#t" + tmpId + "_imglodr").addClass("bedsnone");
  $("#search_string").blur();
  if(isInactiveBL(tmpId)){
    $("#t" + tmpId + "_leftsection").prepend('<div id="blheading" class="txt-cnt mt6 fs16 mb8"></div>');
  }
  stopBgScroll();
}

function BLEnqPopUpDefault(tmpId) {
  ReqObj.updateImage = 0;
  window.googletag = window.googletag || {
      cmd: [],
    };
    var conv = usercookie.getCookie("conv");
    var adult = isSet(ReqObj.Form[tmpId].isAdult) && ReqObj.Form[tmpId].isAdult !== "" ? ReqObj.Form[tmpId].isAdult: 2;
    var gtag = window.googletag && googletag.apiReady && googletag.pubadsReady && typeof (googletag.defineSlot) === "function";
    if(isInactiveBL(tmpId) && conv === "true"  &&
    (parseInt(adult) === 2 || parseInt(adult) === 0) && ReqObj.Form[tmpId].ctaName.toLowerCase() !== "lightbox" && document.visibilityState !== "hidden" && gtag){
    showAdInact(tmpId);
    }
    else
  OpenBLEnqPopup(tmpId);
}
function ClearBLEnqFormUI(tmpId) {
  if (tmpId.substring(0, 2) === "09") ClearBLEnqPopUpUI(tmpId);
  else ClearBLEnqInlineUI(tmpId);
}

function AfterFormDefaults(tmpId, flagsugg) {
  ClearSeqArrays(tmpId);
  SetUIElKeys(tmpId, flagsugg);
  ClearBLEnqFormUI(tmpId);
  ReqObj.Form[tmpId].currentclassCount = 0;
  // if ((tmpId.substring(0, 2) === "09" && ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && ReqObj.Form[tmpId].IsProdNameChanged === false) || IsChatbl(tmpId)) {
  if ( (tmpId.substring(0, 2) === "09" && ReqObj.Form[tmpId].formType.toLowerCase() === "bl") || IsChatbl(tmpId) ) {
    leftSideTransition(0, tmpId);
  }
  if (typeof flagsugg === "undefined") {
    ReqObj.changeFlag = false;
  } else ReqObj.changeFlag = true;
  InitiateSequence(tmpId, flagsugg);
}

function UserFilledIsq(tmpId) {
  if ( isSet(ReqObj.Form[tmpId].userFilledIsq) && ReqObj.Form[tmpId].userFilledIsq instanceof Array ) {
    var userFilledIsq = ReqObj.Form[tmpId].userFilledIsq;
    var flag = true;
    if (userFilledIsq.length === 2) {
      for (var j = 0; j < userFilledIsq.length; j++) {
        if ( notEmpty(userFilledIsq[j].questionsId) && notEmpty(userFilledIsq[j].questionsDesc) && notEmpty(userFilledIsq[j].optionsId) && notEmpty(userFilledIsq[j].optionsValue) ) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
    } else flag = false;

    return flag;
  } else return false;
}

function callGlobalFunction() {
  if ( typeof ims !== "undefined" && isSet(ims) && isSet(ims.dirTypeFull) && ims.dirTypeFull !== "" ) {
    var dirTypeFull = ims.dirTypeFull.toLowerCase();
    if ( dirTypeFull === "impcat" || dirTypeFull === "city" || dirTypeFull === "search" ) {
      if (typeof block_softask === "function") block_softask();
    }
  }
}

function paywithHideShow(tmpId) {
  if (currentISO() !== "IN") {
    $("#t" + tmpId + "_paywithdiv").addClass("dn");
    $(".be-hlpd").addClass("h120");
    $("#t" + tmpId + "_paywithcon").addClass("dn");
  } else {
    $(".be-hlpd").removeClass("h120");
    $("#t" + tmpId + "_paywithcon").removeClass("dn");
    $("#t" + tmpId + "_paywithdiv").removeClass("dn");
  }
}

function checktoCall(tmpId) {
  var imesh = imeshExist();
  var glid = usercookie.getParameterValue(imesh, "glid");
  if (
    (glid !== "" && typeof ReqObj.CNSerCalled === "undefined") ||
    (typeof ReqObj.CNSerCalled !== "undefined" && ReqObj.CNSerCalled === false)
  ) {
    toCallMiniDetails(tmpId);
    ReqObj.CNSerCalled = true;
  }
}

function isEcomProduct(tmpId) {
  return isSet(ReqObj.Form[tmpId].isEcom) && ReqObj.Form[tmpId].isEcom === 1
    ? true
    : false;
}

function OpenForm(LocalReqObj, flagsugg) {
  // don't change the sequence of functions

  if(isSet(ReqObj)){
  var UpdatedReceivedReqObj = FormDefaultsFromProperty(LocalReqObj);
  var tmpId = UpdatedReceivedReqObj.tempId + UpdatedReceivedReqObj.instId;
  paywithHideShow(tmpId);
  checktoCall(tmpId);
  addDetachedFlag(tmpId);
  var imEqGl = usercookie.getCookie("imEqGl");
  ReqObj.Form[tmpId].toShowOtpStepenq = imEqGl !== "" && imEqGl.substring(0, 1).toLowerCase() === "d" ? true : false;
  ReqObj.Form[tmpId].toShowOtpStepbl = imEqGl !== "" && imEqGl.substring(0, 1).toLowerCase() === "b" ? true : false;
  ReqObj.Form[tmpId].toFireGaTracking = isSSB(tmpId) ? true : getTimeStamp();
  updateReceivedImage(UpdatedReceivedReqObj);
  if (isSSB(tmpId) && isSet(flagsugg) && flagsugg === "changeflag")
    ReqObj.Form[tmpId].flags.prodSecNochange = true;
  ReqObj.Form[tmpId].cName.prodServ = isSet(ReqObj.Form[tmpId].cName.prodServ) && ReqObj.Form[tmpId].cName.prodServ !== "" ? ReqObj.Form[tmpId].cName.prodServ : ReqObj.Form[tmpId].prodServ;
  //ReqObj.Form[tmpId].cName.prodServ = ReqObj.Form[tmpId].prodServ
  AfterFormDefaults(tmpId, flagsugg);
  callGlobalFunction();
  CallGenService(tmpId);
  HideSuggester();
  }
}

function updateKeyTypeOfForm(tmpId) {
  if (
    !(
      isSet(ReqObj.Form[tmpId].typeofform) &&
      ReqObj.Form[tmpId].typeofform !== ""
    )
  ) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
      if (ReqObj.Form[tmpId].ctaType.toLowerCase() === "image")
        ReqObj.Form[tmpId].typeofform = "image";
      if (ReqObj.Form[tmpId].ctaType.toLowerCase() === "video")
        ReqObj.Form[tmpId].typeofform = "video";
      if (
        ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" &&
        ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video"
      )
        ReqObj.Form[tmpId].typeofform = "enquiry";
    } else if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl") {
      ReqObj.Form[tmpId].typeofform = "bl";
    } else if (IsChatbl(tmpId)) {
      ReqObj.Form[tmpId].typeofform = "popupchatbl";
    }
  }
}

function checkblockedUser() {
  return usercookie.getParameterValue(imeshExist(), "usts") === "2"
    ? true
    : isSet(ReqObj.UserDetail["blusrdtl"]) &&
      isSet(ReqObj.UserDetail["blusrdtl"]["blkUsr"]) &&
      ReqObj.UserDetail["blusrdtl"]["blkUsr"] === 1 &&
      ReqObj.UserDetail["uv"] !== "V"
      ? true
      : false;
}

function returnTypeForSeq(tmpId) {
  // inline enq changes
  if (
    tmpId.substring(0, 2) === "04" &&
    ReqObj.Form[tmpId].typeofform === "enquiry"
  )
    return "inenquiry";
  if (Bl04(tmpId)) return "blfirstfold";
  return ReqObj.Form[tmpId].typeofform === "image" ||
    ReqObj.Form[tmpId].typeofform === "video"
    ? "imenquiry"
    : isSet(ReqObj.Form[tmpId].typeofform)
      ? ReqObj.Form[tmpId].typeofform
      : "";
}

function updateReceivedImage(UpdatedReceivedReqObj) {
  var mcatimage = getImage(UpdatedReceivedReqObj.mcatId);
  if (UpdatedReceivedReqObj.formType.toLowerCase() === "bl") {
    if (UpdatedReceivedReqObj.displayImage !== "") {
      pushImage(
        UpdatedReceivedReqObj.mcatId,
        UpdatedReceivedReqObj.displayImage,
        UpdatedReceivedReqObj.zoomImage
      );
    } else if (mcatimage === "" || typeof mcatimage === "undefined")
      pushImage(
        UpdatedReceivedReqObj.mcatId,
        UpdatedReceivedReqObj.displayImage,
        UpdatedReceivedReqObj.zoomImage
      );
  }
}

function CallGenService(tmpId) {
  if (GenOnClick(tmpId)) {
    var that = ReqObj.Form[tmpId].FormSequence;
    var array = {
      UiArray: [],
      ServiceArray: [],
    };
    hooks = {
      pre: [],
      post: [],
    };
    var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
    that.MakeSeq(GenObject);
    var IsqObject = {
      object: {
        obj: ReqObj.Form[tmpId].GlobalIsqObject,
        array: array,
        hooks: hooks,
        isService: true,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
    };
    that.MakeSeq(IsqObject);

    SavePropIsq(tmpId);

    formatServices(array.ServiceArray, tmpId);
    ServiceSequenceHit(tmpId, false);
  }
}

function notEmpty(val) {
  if (isSet(val) && val !== "") {
    return true;
  } else return false;
}

function SavePropIsq(tmpId) {
  if (
    isSet(ReqObj.Form[tmpId].userFilledIsq) &&
    ReqObj.Form[tmpId].userFilledIsq instanceof Array
  ) {
    var userFilledIsq = ReqObj.Form[tmpId].userFilledIsq;

    for (var j = 0; j < userFilledIsq.length; j++) {
      ReqObj.Form[tmpId].questionsId.push(userFilledIsq[j].questionsId);
      ReqObj.Form[tmpId].questionsDesc.push(userFilledIsq[j].questionsDesc);
      ReqObj.Form[tmpId].optionsId.push(userFilledIsq[j].optionsId);
      ReqObj.Form[tmpId].optionsValue.push(userFilledIsq[j].optionsValue);
    }
  }
}
function SetUIElKeys(tmpId, where) {
  IsqKeys(tmpId);
  RdBoxKeys(tmpId);
  if (where !== "from-Form") EnrichKeys(tmpId);
  StaticIsqKeys(tmpId);
  ContactDetailKeys(tmpId);
  ReqObj.Form[tmpId].calledClassName = {};
}

function GetIsqFromService(tmpId) {
  ReqObj.Form[tmpId].mcatId !== "-1" || ReqObj.Form[tmpId].catId !== "-1"
    ? GetIsq(tmpId)
    : "";
  ReqObj.Form[tmpId].GlobalIsqObject = new Isq(tmpId);
  ReqObj.Form[tmpId].GlobalRdObj = new RequirementDtl(tmpId); // check
}
function GetFeaturedData(tmpId){   //recoms
  var recompresent=null;
  var f_data=null;
  var g_data=null;
  try{
    recompresent = sessionStorage.getItem("featCats");
  }
  catch(err){
    recompresent = null;
  }
  if(!isSet(recompresent) || typeof(recompresent) == 'undefined' || recompresent == ''){
    if (typeof(sugg) != 'undefined' && sugg != '' && typeof(sugg.recent) != 'undefined' && typeof(sugg.recent) == "function") {
      if (IMStore.localStorageLoaded == true) {
        f_data = sugg.recent('keyw_data');
        g_data = sugg.recent('mcat_data');
      } 
      else {
          var handler = setInterval(function() {
            if (IMStore.localStorageLoaded == true) {
              f_data = sugg.recent('keyw_data');
              g_data = sugg.recent('mcat_data'); 
              clearInterval(handler);                        
            }
          }, 1000);
      }
            
      var mcatsArr=[];  
      var mcats = ''; 
      if(isSet(f_data) && f_data !== null && f_data.length >= 1){ 
        var mcat_len= f_data.length >= 5 ? 5 : f_data.length;        
        for (j = 0; j < mcat_len; j++) {
          if (f_data[j].mcatid == -1)
          continue;
          mcats += f_data[j].mcatid + ',';
        }          
      }
      else{
        if(isSet(g_data) && g_data !== null && g_data.length >= 1){
          var mcat_len= g_data.length >= 5 ? 5 : g_data.length;
          for (j = 0; j < mcat_len; j++) {
            if (g_data[j].id == -1)
            continue;
            mcats += g_data[j].id + ',';
          }
        }     
      }
      if (mcats != '') {
        mcats = mcats.replace(/,\s*$/, "");
         mcatsArr = mcats.split(",");
      }  
      // console.log(f_data);
      // console.log(g_data);
      // console.log(mcatsArr);     //hhhh 
      if(mcatsArr.length>0){
        getDataServHit(mcatsArr);    
      }    
    }
    else{
      setTimeout(function() {
        GetFeaturedData(tmpId);
      }, 250);
    }    
  }
}

function getDataServHit(mcats){    //recoms
  var url = "https://recommend.imutils.com/Related/GetData/?token=imobile@15061981&MCAT_ID1=" + mcats[0] + "&MCAT_ID2=" + mcats[1] + "&MCAT_ID3=" + mcats[2] + "&count=" + 15 + "&Modid=" + modIdf + "&TYPE=M"    
  var result = '';    
  $.ajax({
      type: "GET",
      url: url,
      async: false,
      success: function(rel) {
          result=JSON.parse(rel)                                   
          if (
            isSet(rel) &&
            result["Status"] == 200 &&
            isSet(result["RECOMMENDED MCAT DATA"]) &&
            result["RECOMMENDED MCAT DATA"].length > 1
          ) {      
            featSessionSave(result["RECOMMENDED MCAT DATA"]);  
          }       
          
      },
      timeout: 3000,
      error: function(rel) {
        res = isSet(rel) ? JSON.stringify(rel) : "response undefined";
        // console.log(res);
      }
  })        
}

function featSessionSave(featArr){      //recoms
  var dataFinal=[];
  var cntdt=0;
  for (j=0; j<featArr.length && cntdt<6; j++){
    var catName=isSet(featArr[j]['GLCAT_MCAT_NAME']) ? featArr[j]['GLCAT_MCAT_NAME']: "";
    var catImg=isSet(featArr[j]['GLCAT_MCAT_IMG1_125X125']) ? featArr[j]['GLCAT_MCAT_IMG1_125X125'] : isSet(featArr[j]['GLCAT_MCAT_IMG1_250X250']) ? featArr[j]['GLCAT_MCAT_IMG1_250X250'] : "";
    var catUrl=isSet(featArr[j]['URL']) ? featArr[j]['URL']: "";
    if(catName!="" && catImg!="" && catUrl!=""){  
      var arr={'catName':catName,'catImg':catImg,'catUrl':catUrl};       
      dataFinal.push(arr);
      cntdt=cntdt+1;
    }        
  }
  try {
    sessionStorage.setItem(
      "featCats",
      JSON.stringify(dataFinal)
    );
  } catch (err) {
      // quota_exceeded_error
    } 
}
function CloseForm(tmpId) {
  if (
    (tmpId.substring(0, 2) === "09" &&
      $("#t" + tmpId + "_bewrapper").css("display") === "block") ||
    (tmpId.substring(0, 2) !== "09" &&
      $("#t" + tmpId + "_enrichform_maindiv").css("display") !== "none")
  ) {
    if (
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
      !ValidGenId(ReqObj.Form[tmpId].generationId)
    ) {
      ReqObj.finEnq = tmpId;
    } else
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
        ValidGenId(ReqObj.Form[tmpId].generationId) &&
        !ReqObj.Form[tmpId].flags["isThankYouCalled"]
        ? FinishEnquiryService(tmpId)
        : "";
    // (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && ((ValidGenId(ReqObj.Form[tmpId].generationId) && !ReqObj.Form[tmpId].flags["isThankYouCalled"]) || ReqObj.Form[tmpId].hitFinishEnquiryService)) ? FinishEnquiryService(tmpId): "";
    if (!isEcomProduct(tmpId)) ServiceSequenceHit(tmpId, false);
    ReqObj.TempMobile = "";
    ReqObj.Form[tmpId].pvTrackingFired = false;
    ReqObj.TempEmail = "";
    ReqObj.ImageVideoIsqSeq = false;
    closeVideo(tmpId);
    SetUserDetails();
    updateToAsk(tmpId);
    addDetachedFlag();
    //detachFlag2(tmpId);
    if (tmpId.substring(0, 2) === "09") {
      if (recomOnInactive(tmpId)) {       //inactive changes
        $("#recommendProd").css({
          display: "none",
        });
      }
      $("#t" + tmpId + "_bewrapper").css({
        display: "none",
      });
      ClearBLEnqPopUpUI(tmpId);
    } else if (tmpId.substring(0, 2) === "08") {
      if (IsChatBLInline(tmpId)) {
        $("#t" + tmpId + "_chatBL")
          .addClass("cbl_vh")
          .removeClass("cbl_vv");
        updateChatWidgetGlobalVar(tmpId);
        chatwidgetTransitions(tmpId);
      } else {
        $("#t" + tmpId + "_chatBL").css({
          display: "none",
        });
      }
      ClearBLEnqPopUpUI(tmpId);
      $(".t" + tmpId + "blk_scrn").addClass("dn");
    } else {
      $("#t" + tmpId + "_enrichform_maindiv")
        .html("")
        .css({
          display: "none",
        });
      $("#t" + tmpId + "_q_send_req_button").html(ReqObj.Form[tmpId].btn);
      isSet(ReqObj.Form[tmpId].InlineformParentEl)
        ? ReqObj.Form[tmpId].InlineformParentEl.html(
          ReqObj.Form[tmpId].InlineformHtml
        )
        : "";
      $("#t" + tmpId + "_q_send_req_button")
        .parent()
        .removeClass("bedsnone");
      ReqObj.Form[tmpId].btn = "";
    }

    if (!IsChatbl(tmpId)) {
      HideSuggester();
      var HitArray = ReqObj.Form[tmpId].HitArray;
      var enqclose = ReqObj.Form[tmpId].enqSentCallBack;
      if (!(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)))
        ReqObj.Form[tmpId] = CopyObject(ReqObj.Original[tmpId]);
      ReqObj.Form[tmpId].HitArray = HitArray;
      ReqObj.Form[tmpId].enqSentCallBack = enqclose;
    }
    ReqObj.ipLoc.onClose = true;
    UpdateSeq();
    ReqObj.loginMode = 0;
    ReqObj.userType = "";
    resumeBgScroll();
    SetUserDetails();
    isBLFormOpen = false;
    $(document).trigger(FormCloseEvent, [ReqObj.Form[tmpId].ordr_qnty_index]);
    $(document).trigger(OnBlEnqClose);
    if (checkblockedUser()) ReqObj.UserDetail.blusrdtl = {};
  }
}

function closeVideo(tmpId) {
  if ($("#t" + tmpId + "_prodVideo").is("iframe"))
    $("#t" + tmpId + "_prodVideo")[0].contentWindow.postMessage(
      '{"event":"command","func":"' + "stopVideo" + '","args":""}',
      "*"
    );
}

function SetFormHtmlDefaultValue(tmpId) {
  isnewSSB(tmpId)
    ? ""
    : $("#t" + tmpId + "_thankDiv")
      .html("")
      .addClass("bedsnone");
  // $("#t" + tmpId + "_beprevious").addClass("bedsnone");
  // $("#t" + tmpId + "_qnextbtn").addClass("bedsnone");
}

function leftSideEmpty(tmpId) {
  $("#t" + tmpId + "_Prodname").html("");
  $("#t" + tmpId + "_Compname").html("");
  $("#t" + tmpId + "_ProdPrice").html("");
  $("#t" + tmpId + "_state").html("");
  $("#t" + tmpId + "_locality").html("");
  $("#t" + tmpId + "_city").html("");
  $("#t" + tmpId + "parent_iframe").html(
    "<div id='t" + tmpId + "_prodVideo' class='belft bepr pdpHg'></div>"
  );
  $(".proctname").html("");
}

function ClearBLEnqPopUpUI(tmpId) {
  //leftSideEmpty(tmpId);
  if (IsChatbl(tmpId)) {
    $("#t" + tmpId + "_new_chatbl").html("");
    IsChatBLInline(tmpId)
      ? $("#t" + tmpId + "_newblchatReply")
        .html("")
        .addClass("cbl_br10 cbl_bgf1")
        .removeClass("cbl_bg1")
      : $("#t" + tmpId + "_newblchatReply").html("");
    chatblHideTransition(tmpId);
    $("#t" + tmpId + "_blchatfooter").removeClass("focus");
    $("#t" + tmpId + "_changeProduct")
      .removeAttr("disabled")
      .css({
        opacity: "1",
        cursor: "pointer",
      });
    removechatblerror(tmpId);
    //$("#t" + tmpId + "_helptext").addClass("dn");
    // $("#t" + tmpId +"hi").html("");
    $("#t" + tmpId + "hi").addClass("dn");
  }
  $("#t" + tmpId + "_bl_form").html("");
  $("#t" + tmpId + "_byrinfo")
    .addClass("bedsnone")
    .html("");
  $("#t" + tmpId + "_tCond").addClass("bedsnone");
  SetFormHtmlDefaultValue(tmpId);
}

function ClearBLEnqInlineUI(tmpId) {
  if (isSSB(tmpId)) $("#t" + tmpId + "_thankDiv").html("");
  if (isnewSSB(tmpId))
    $("#t" + tmpId + "_thankDiv")
      .parent()
      .addClass("bedsnone");
  if (IsChatbl(tmpId)) {
    $("#t" + tmpId + "_new_chatbl").html("");
    //$("#t" + tmpId + "_newblchatReply").html("");
  }
  if (!isSSB(tmpId) && !(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)))
    $("#t" + tmpId + "_bl_form").html("");

  $("#t" + tmpId + "_byrinfoIn")
    .html("")
    .addClass("bedsnone");

  $("#t" + tmpId + "_tCond").addClass("bedsnone");
  if (!IsChatbl(tmpId) && !isSSB(tmpId))
    var clr =
      isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01"
        ? ""
        : "background-color : rgb(0, 166, 153)";
  $("#t" + tmpId + "_submit")
    .removeAttr("disabled")
    .attr("style", clr);
  $("#t" + tmpId + "_submit")
    .removeAttr("disabled")
    .attr("style", clr);
  $("#t" + tmpId + "_submitdiv").attr("class", "befstgo1");
}
function ShowEmail() {
  return !usercookie.getParameterValue(imeshExist(), "em") &&
    currentISO() === "IN"
    ? true
    : false;
}
function ShowMobile() {
  return !usercookie.getParameterValue(imeshExist(), "mb1") &&
    currentISO() != "IN"
    ? true
    : false;
} 
function EmailAfterReqbox(tmpId) {
  return isSet(ReqObj.Form[tmpId].emailAfterReqbox) &&
    ReqObj.Form[tmpId].emailAfterReqbox
    ? true
    : false;
}

if (typeof isIframeApiloaded === "undefined") window["isIframeApiloaded"] = 0;

var new_player = "";

function loadScript() {
  if (isIframeApiloaded === 0) {
    /* global ReqObj.video_url agr enquiry pr aaya then. */ isIframeApiloaded = 1;
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}
//loadScript();
function CreateSeq(NewObjConf) {
  if (isSet(NewObjConf)) {
    ReplaceObject(NewObjConf.object, NewObjConf.tmpId, NewObjConf.that);
    if (typeof NewObjConf.object.obj.hasHtml === "function")
      NewObjConf.object.obj.hasHtml(NewObjConf);
  }
}

function getFormIdMisc(element, tmpId) {
  var array2 = ["requirementdtl", "isq"];
  if (imeshExist() === "") array2 = ["userlogin", "contactdetail"];

  if ($.inArray(element, array2) !== -1) return "t" + tmpId + "_partition2";
  else return "t" + tmpId + "_partition1";
}

function RenderHtmlMisc(array, tmpId, htmlArray, counter) {
  var FormIdSel = $("#t" + tmpId + "_partition1");
  RenderHtml(FormIdSel, htmlArray[0], tmpId, counter);
  FormIdSel = $("#t" + tmpId + "_partition2");
  RenderHtml(FormIdSel, htmlArray[1], tmpId, counter);
}

function RenderHtml(FormIdSel, HtmlArray, tmpId, screenNumber) {
  if (!isSet(HtmlArray)) HtmlArray = [];
  var DisplayHtml = "";
  for (var u = 0; u < HtmlArray.length; ++u) {
    for (var i = 0; i < HtmlArray[u].length; i++) {
      DisplayHtml += HtmlArray[u][i];
    }
  }
  if (DisplayHtml !== "") {
    var html = "";
    if (IsPrevBtnImplemented(tmpId)) {
      html += "<div id='" + CounterScreenId(tmpId, 0).elid + "'>";
      html += DisplayHtml;
      html += "</div>";
    } else {
      html += DisplayHtml;
    }
    isBlInline(tmpId) ? FormIdSel.html(html) : FormIdSel.append(html);
  }
  if (
    isInactiveBL(tmpId) &&
    ReqObj.Form[tmpId].FormSequence._screenCounter === 1
  ) {
    if (
      document.getElementById("t0901_contactinfo1") &&
      currentISO() !== "IN"
    ) {
      $("#t0901_contactinfo1").remove();
      $("#name_email").append(ReqObj.Form[tmpId].ContactDetail["1"]);
      $("#name_email").addClass("NameEmail");
      $("#name_email").css({
        width: "600px",
      });
    }
  }
}

function questionTransition(formType, tmpId) {
  if (
    isSet(formType) &&
    $.inArray(formType.toLowerCase(), showElemonForm) === -1
  ) {
    if (IsPrevBtnImplemented(tmpId)) {
      $($("#t" + tmpId + "_bl_form").children()).each(function () {
        $(this).css("display", "none");
      });
    } else {
      if (!isSSB(tmpId) && !isBlInline(tmpId))
        $("#t" + tmpId + "_bl_form").html("");
    }
  } else if (
    isSet(formType) &&
    $.inArray(formType.toLowerCase(), showElemonForm) !== -1
  ) {
    $(".t" + tmpId + "_userInput").each(function () {
      $(this).remove();
      chatblHideTransition(tmpId);
    });
    if (!ReqObj.Form[tmpId].NotSure) ShowUserAns(tmpId);
    else {
      var classtotest = chatBlClass(tmpId, "right");
      var leftright = IsChatbl(tmpId) ? "message-right1" : "";
      $("#t" + tmpId + "_bl_form").append(
        ConversationRightWrapper(tmpId, NotFilled, {
          classtotest: classtotest,
          leftright: leftright,
        })
      );
    }
  }
}

function IsPrevBtnImplemented(tmpId) {
  if (notEmpty(tmpId)) {
    var tmpIdArr = ["09"];
    var tmpId = tmpId.substring(0, 2);
    if ($.inArray(tmpId, tmpIdArr) !== -1) return true;
    return false;
  }
  return false;
}

function makeFinalSeq(AttachingObj, tmpId) {
  if (
    isSet(AttachingObj) &&
    isSet(AttachingObj.that) &&
    isSet(AttachingObj.that.FullServiceArray) &&
    isSet(ReqObj.Form[tmpId].UiArray)
  ) {
    AttachingObj.that.FullServiceArray.push(
      AttachingObj.object.array.ServiceArray
    );
    ReqObj.Form[tmpId].UiArray.push(AttachingObj.object.array.UiArray);
    AttachingObj.that.getStep(tmpId);
  }
}

function formatServices(arr, tmpId) {
  if (isSet(ReqObj.Form[tmpId].ServiceSequence) && isSet(ReqObj.Form[tmpId].HitArray) && isSet(arr)) {
    for (var i = 0; i < arr.length; i++) {
      var parent = findParent(ConstructorName(arr[i].fn));
      parent = isSet(parent) ? parent : [];
      var ObjAttached = false;
      if (parent.length > 0) {
        for (var j = 0; j < parent.length; j++) {
          if (FindCorrectSpot(ReqObj.Form[tmpId].ServiceSequence, arr[i], parent[j])) {
            ObjAttached = true;
          } else if (
            FindCorrectSpot(ReqObj.Form[tmpId].HitArray, arr[i], parent[j])
          ) {
            ObjAttached = true;
          } else if (j === parent.length - 1 && !ObjAttached)
            ReqObj.Form[tmpId].ServiceSequence.push(arr[i]);
        }
      } else {
        ReqObj.Form[tmpId].ServiceSequence.push(arr[i]);
      }
    }
  }
}

function ServiceSequenceHit(tmpId, showLoader) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId]) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
    if (isSet(showLoader) && showLoader) IsChatbl(tmpId) && ReqObj.Form[tmpId].currentScreen.toLowerCase() === "userverification" ? ReqObj.Form[tmpId].isSkipOTPClicked ? "" : $("#t" + tmpId + "cbl_msg").parent().removeClass("dn") : addBlLoader(tmpId, "right");

    while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
      if (isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit === "function")
        ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit(tmpId);
      else {
        if (IsProduction()) {
          ReqObj.Form[tmpId].ServiceSequence.pop();
        } else if (IsProduction()) console.err("something is wrong");
      }
    }
  }
}

function ServiceSeqGeneration(tmpId) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId]) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
    while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
      if (isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit === "function" && isSet(ConstructorName(ReqObj.Form[tmpId].ServiceSequence[0].fn)) && ConstructorName(ReqObj.Form[tmpId].ServiceSequence[0].fn).toLowerCase() === "generation")
        ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit(tmpId);
      else {
        ReqObj.Form[tmpId].ServiceSequence.pop();
      }
    }
  }
}

function subsequentKeyUI(tmpId) {
  var imeshcookie = imeshExist();
  ReqObj.Form[tmpId].flags["IsFirstStep"] = false;
  ReqObj.Form[tmpId].isQuantIsq = false;
  sectionInitialisationStepWise(tmpId, 1);
  if (!pdpenqImage(tmpId))
    new LeftSide(tmpId, ReqObj.Form[tmpId].typeofform, 1);
  if (ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" && ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && imeshcookie !== "" && !isInactiveBL(tmpId)) {
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    if (currentISO() !== "IN") $("#t" + tmpId + "_thankDiv").addClass("fnUser");
  }
  if (ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" && ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && imeshcookie === "")
    $("#t" + tmpId + "_leftR").addClass("lftMgn");
  else if (!isInactiveBL(tmpId))
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl") {
    ReqObj.updateImage = 0;
    leftSideTransition(1, tmpId);
  }
  if (parseInt(ReqObj.Form[tmpId].disableRd) === 1) {
    ReqObj.Form[tmpId].flags.isDescDivShown = !ReqObj.Form[tmpId].flags.isDescDivShown;
  }
  $("#t" + tmpId + "_byrinfo").html(get_buyer_info(tmpId)).removeClass("bedsnone");
  $("#t" + tmpId + "_hdg").removeClass("bedsnone");
  $("#t" + tmpId + "_login").addClass("bedsnone");
}
if (typeof blpage === "undefined" || blpage === null) {
  var blpage = {};
  blpage.toIdentifiedQ = new Array();
  blpage.toIdentified = function () {
    if (isSet(blpage.toIdentifiedQ)) {
      for (var j = 0; j < blpage.toIdentifiedQ.length; j++) {
        if (
          isSet(blpage.toIdentifiedQ[j]) &&
          typeof blpage.toIdentifiedQ[j] === "function"
        )
          blpage.toIdentifiedQ[j].apply();
      }
    }
  };
}

function UpdateSeq(tmpId, where) {
  for (var key in ReqObj.Form) {
    if (key !== tmpId) {
      formToUpdate(key, where);
    }
  }
}

function formToUpdate(key, flagsugg) {
  if (IsChatbl(key)) {
    if (IsChatBLInline(key)) ReqObj.Form[key].fromUpdate = true;
    UpdateCurrentStep(key, flagsugg);
  } else {
    if (flagsugg == "changeflag" && isSSB(key))
      ReqObj.Original[key]["loginv"] = ReqObj.Form[key]["savevalue"];
    CallFormFunc(key, flagsugg);
  }
}

function CallFormFunc(key, flagsugg) {
  if (isSSB(key) && !isnewSSB(key) && !ReqObj.Form[key].flags.toCallUpdateSeq) {
    return;
  } else if (isGlIdEven(key) && key.substr(0, 2) === "01") {
    OpenForm(ReqObj.Form[key], flagsugg);
  } else if (IsChatbl(key)) {
    OpenForm(ReqObj.Original[key], flagsugg);
  } else if ($.inArray(key.substring(0, 2), BlPopup) === -1) {
    if (Bl04(key)) OpenForm(ReqObj.Form[key], flagsugg);
    else OpenForm(ReqObj.Original[key], flagsugg);
  } else if ($.inArray(key.substring(0, 2), EnqPopup) === -1) {
    OpenForm(ReqObj.Original[key], flagsugg);
  }
}

function callToIdentifiedQ(tmpId, fromwhere, update) {
  // if (typeof fromwhere === "undefined") {
  //   update = 1; // to update from header
  // }
  if (typeof fromwhere === "undefined") {
    // which means login from header
    UpdateUserDetailKey();
    ReqObj.CNSerCalled = false;
  }
  if (update !== 0) UpdateSeq(tmpId, fromwhere);
  if (isSet(blpage)) {
    if (isSet(blpage.toIdentified)) {
      if (typeof blpage.toIdentified === "function") blpage.toIdentified();
    }
  } else if (isSet(window.parent.blpage)) {
    if (isSet(window.parent.blpage.toIdentified)) {
      if (typeof window.parent.blpage.toIdentified === "function")
        window.parent.blpage.toIdentified();
    }
  }
  if (typeof page !== "undefined") {
    if (isSet(page.Identified)) {
      if (typeof page.Identified === "function") page.Identified();
    }
  } else if (isSet(window.parent.page)) {
    if (isSet(window.parent.page.Identified)) {
      if (typeof window.parent.page.Identified === "function")
        window.parent.page.Identified();
    }
  }
}

function ResetClass(ClassRemoved, tmpId) {
  if (isSet(ClassRemoved)) {
    for (var i = 0; i < ClassRemoved.length; i++) {
      if (isSet(ClassRemoved[i].Obj)) {
        if (typeof ClassRemoved[i].Obj.resetClass === "function") {
          ClassRemoved[i].Obj.resetClass(tmpId);
        }
      }
    }
  }
}

function UpdateCurrentStep(tmpId, flagsugg) {
  if (isSet(tmpId)) {
    if(!IsChatBLInline(tmpId)) // new chat bl unidentified
    ShowHideTNC(tmpId);
    var that = ReqObj.Form[tmpId].FormSequence;
    if (that.OnCloseCounter > -1) {
      that.OnCloseCounter -= 1;
      var serviceSplittedArray = that.OnCloseServiceArray.splice(
        that.OnCloseCounter,
        1
      );
      ReqObj.Form[tmpId].OnCloseArray =
        ReqObj.Form[tmpId].OnCloseArray[this.OnCloseCounter];
    } else {
      var ClassRemoved = ReqObj.Form[tmpId].UiArray[that.StepCounter];
      if (BlReloadRequired(ClassRemoved, tmpId)) {
        if (RemoveLastQuestion(tmpId)) {
          ReqObj.Form[tmpId].PrevAnsPrint = false;
          ResetClass(ClassRemoved, tmpId);
          var serviceSplittedArray = that.FullServiceArray.splice(
            that.StepCounter,
            1
          )[0];
          Getprepost(serviceSplittedArray, tmpId);

          //if generating generation id if user signs in from some other place
          //SubmitCallback(serviceSplittedArray, tmpId);
          //

          var count = that.StepCounter;
          that.StepCounter -= 1;
          if (that.StepCounter > -1) {
            ReqObj.Form[tmpId].UiArray.splice(count, 1);
          } else {
            ReqObj.Form[tmpId].UiArray = [];
          }
          if (
            isSet(ReqObj.Form[tmpId].LastPrePost) &&
            ReqObj.Form[tmpId].LastPrePost instanceof Array
          ) {
            for (var t = 0; t < ReqObj.Form[tmpId].LastPrePost.length; ++t) {
              PrePostService(ReqObj.Form[tmpId].LastPrePost[t], tmpId);
            }
            ReqObj.Form[tmpId].LastPrePost = [];
          }
        }
      } else if (
        flagsugg !== "changeflag" &&
        imeshExist() === "" &&
        $("#t" + tmpId + "_chatBL").hasClass("cbl_vv") &&
        $("#t" + tmpId + "_flagC").html() === ""
      ) {
        var ele = $("#t" + tmpId + "country_dropd").detach();
        $("#t" + tmpId + "country").prepend(ele);
      }
    }
  }
}

function RemoveLastQuestion(tmpId) {
  if (IsChatbl(tmpId)) {
    return RemoveLastPopupQuestion(tmpId);
  }
}

function RemoveLastInlineQuestion() {
  var lastQuestion = $(".message-left").last();
  // if (lastQuestion.length > 0 && lastQuestion.next().length > 0 && !lastQuestion.next().hasClass("message-right")) {
  if (!lastQuestion.next().hasClass("message-right")) {
    lastQuestion.remove();
    return true;
  } else return false;
}

function RemoveLastPopupQuestion(tmpId) {
  if (IsChatBLInline(tmpId)) {
    var lastQuestion = $(".cbl_ques").last();
    var questionCount = lastQuestion.siblings;
    var isStatic = $(".cbl_ques").last().attr("isStatic");
    if (
      isSet(ReqObj.closebtnclicked) &&
      ReqObj.closebtnclicked &&
      questionCount <= 2
    ) {
      ReqObj.closebtnclicked = false;
      return false;
    }
    if (!lastQuestion.next().hasClass("cbl_ansr") && isStatic !== "yes") {
      lastQuestion.remove();
      IsChatBLInline(tmpId)
        ? $("#t" + tmpId + "_newblchatReply")
          .html("")
          .addClass("cbl_br10 cbl_bgf1")
          .removeClass("cbl_bg1")
        : $("#t" + tmpId + "_newblchatReply").html("");
      removechatblerror(tmpId);
      return true;
    } else return false;
  } else return false;
}

function BlReloadRequired(ClassRemoved, tmpId) {
  if (isSet(ClassRemoved)) {
    if (ClassRemoved instanceof Array) {
      {
        for (var h = 0; h < ClassRemoved.length; ++h) {
          if (typeof ClassRemoved[h].Obj.toUpdate === "function") {
            return ClassRemoved[h].Obj.toUpdate(tmpId);
          }
        }
        return false;
      }
    } else {
      if ($.inArray(ConstructorName(ClassRemoved.Obj), ReloadReqClass) !== -1) {
        return true;
      } else return false;
    }
  }
  return false;
}

function Getprepost(serviceSplittedArray, tmpId) {
  if (isSet(serviceSplittedArray)) {
    for (var y = 0; y < serviceSplittedArray.length; ++y) {
      if (
        !isSet(ReqObj.Form[tmpId].LastPrePost) ||
        (isSet(ReqObj.Form[tmpId].LastPrePost) &&
          ReqObj.Form[tmpId].LastPrePost.length === 0)
      ) {
        var PrepostVal = CheckPrepost(serviceSplittedArray[y]);
        if (PrepostVal !== "") ReqObj.Form[tmpId].LastPrePost = PrepostVal;
      }
    }
  }
}

function CheckPrepost(CurrentRemovedClassHooks) {
  if (isSet(CurrentRemovedClassHooks)) {
    if (
      isSet(CurrentRemovedClassHooks.current) &&
      CurrentRemovedClassHooks.current.length > 0
    ) {
      return CurrentRemovedClassHooks.current;
    } else if (
      isSet(CurrentRemovedClassHooks.pre) &&
      CurrentRemovedClassHooks.pre.length > 0
    ) {
      return CurrentRemovedClassHooks.pre;
    } else if (
      isSet(CurrentRemovedClassHooks.post) &&
      CurrentRemovedClassHooks.post.length > 0
    ) {
      return CurrentRemovedClassHooks.post;
    }
    return "";
  }
  return "";
}

function UpdateUserDetailKey() {
  // Imesh must be considered when user logs in from header not Key.
  var imeshCookie = imeshExist();
  var iploc = iplocExist();
  ReqObj.UserDetail["fn"] = usercookie.getParameterValue(imeshCookie, "fn");
  ReqObj.UserDetail["em"] = usercookie.getParameterValue(imeshCookie, "em");
  ReqObj.UserDetail["mb1"] = usercookie.getParameterValue(imeshCookie, "mb1");
  ReqObj.UserDetail["ctid"] = usercookie.getParameterValue(imeshCookie, "ctid");
  ReqObj.UserDetail["uv"] = usercookie.getParameterValue(imeshCookie, "uv");
  ReqObj.UserDetail["glid"] = usercookie.getParameterValue(imeshCookie, "glid");
  ReqObj.UserDetail["statename"] = "";
  ReqObj.UserDetail["stateid"] = "";
  ReqObj.UserDetail["cityname"] = "";
  ReqObj.UserDetail["ctoth"] = "";
  ReqObj.UserDetail["suggesCity"] = {
    geoloc: [
      usercookie.getParameterValue(iploc, "lg_ct"),
      usercookie.getParameterValue(iploc, "lg_ctid"),
    ],
    hdcity: [
      usercookie.getParameterValue(usercookie.getCookie("xnHist"), "city"),
      "",
    ],
    iploc: [
      usercookie.getParameterValue(iploc, "gctnm"),
      usercookie.getParameterValue(iploc, "gctid"),
    ],
  };
}

function ModifyUserDetail(arr, todo) {
  var toret = 0;
  var len = isSet(arr) ? arr.length : -1; // js error undefined is not an object, reading e.length
  var valtoupdate = isSet(todo) && todo === "empty" ? "" : "";
  for (var i = 0; i < len; i++) {
    ReqObj.UserDetail[arr[i]] = valtoupdate;
    if (arr[i] === "ctid") toret = 1;
  }

  return toret;
}
function flagDropdTracking(tmpId) {
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  if (isSet(ReqObj.Form[tmpId].flag_track)) {
    if (ReqObj.Form[tmpId].flag_track === 1)
      blenqGATracking(form_type, "Flag|First", getEventLabel(), 1, tmpId);
    else if (ReqObj.Form[tmpId].flag_track === 2)
      blenqGATracking(form_type, "Flag|Second", getEventLabel(), 1, tmpId);
  } else blenqGATracking(form_type, "Flag|Nochange", getEventLabel(), 1, tmpId);
}

function UserCookie() { }
UserCookie.prototype.getCookie = function (cookie_Name) {
  var documentCookie = document.cookie;
  var search = cookie_Name + "=";
  if (isSet(documentCookie) && documentCookie.length > 0) {
    var offset = documentCookie.indexOf(search);
    if (offset !== -1) offset += search.length;
    else return "";

    var end = documentCookie.indexOf(";", offset);
    if (end === -1) end = documentCookie.length;

    //return unescape(documentCookie.substring(offset, end));
    try {
      return decodeURIComponent(documentCookie.substring(offset, end));
    } catch (err) {
      return unescape(documentCookie.substring(offset, end));
    }
  }
  return "";
};

UserCookie.prototype.getParameterValue = function (cookie, key) {
  if (isSet(cookie) && cookie !== "") {
    var cookie_arr = cookie.split("|");
    var len = isSet(cookie_arr) ? cookie_arr.length : 0;
    for (var i = 0; i < len; i++) {
      var sub_cookie_arr = cookie_arr[i].split("=");
      if (sub_cookie_arr[0] === key)
        return isSet(sub_cookie_arr[1]) && sub_cookie_arr[1] !== ""
          ? sub_cookie_arr[1]
          : "";
    }
    return ""; /* will return null if key doesn't exists */
  }
  return "";
};

UserCookie.prototype.setCookie = function (name, value, days, modId) {
  /* modID iploc */

  var expires = "";
  var loc = window.location.href;
  if (days && value) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  }
  if (isSet(modId) && modId === "TDW") {
    var dom = document.location.hostname;

    document.cookie =
      name + "=" + value + expires + "; domain=" + dom + ";path=/";
  } else {
    if (loc.match("hellotrade.com")) {
      document.cookie =
        name +
        "=" +
        escape(value) +
        expires +
        "; domain=.hellotrade.com;path=/";
    } else if (loc.match("indianindustry.com")) {
      document.cookie =
        name +
        "=" +
        escape(value) +
        expires +
        "; domain=.indianindustry.com;path=/";
    } else if (name == "ImeshVisitor") {
      document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        expires +
        "; domain=.indiamart.com;path=/";
    } else {
      document.cookie =
        name + "=" + escape(value) + expires + "; domain=.indiamart.com;path=/";
    }
  }
};
UserCookie.prototype.deleteCookie = function (cookie_Name) {
  document.cookie = cookie_Name + "=;expires=;domain=.indiamart.com;path=/";
};

var usercookie = new UserCookie();function UserLogin(what) {
    this.tmpId = "";
    this.imeshCookie = "";
    this.iplocCookie = "";
    this.userCountry = "";
    this.loginhtml = "";
    this.tid = "";
    this.username = "";
    this.blurcalled = false;
  
    this.className = "UserLogin";
    this.what = what;
    this.UserLoginCssObj = {};
    this.UserloginHtmlObj = {
      Label: "",
      UserInput: "",
      OuterWrapper: "",
      ClosingWrapper: "",
    };
    this.UserloginHtmlObjArray = [];
    this.toChange = false;
    this.isNotCalled = false;
  
    this.cookies();
    this.classCount = 0;
  }
  UserLogin.prototype.toUpdate = function (tmpId) {
    if (imeshExist()) return true;
    else if (this.isNotCalled === true) return true;
    return false;
  };
  UserLogin.prototype.cookies = function () {
    this.imeshCookie = imeshExist();
    this.iplocCookie = usercookie.getCookie("iploc");
    this.userCountry = usercookie.getParameterValue(this.iplocCookie, "gcniso");
    ReqObj.changeUserCountry =
      isSet(ReqObj.changeUserCountry) && ReqObj.changeUserCountry !== ""
        ? ReqObj.changeUserCountry
        : usercookie.getParameterValue(this.iplocCookie, "gcnnm");
  }; 
  
  UserLogin.prototype.defaultEvents = function (tmpId) {
    if (isSet(tmpId)) {
  
      //next->submit
      //hide pns unidentified user
      var pnsno = ReqObj.Form[tmpId].pnsNumber;
      if (isPnsEnq(tmpId) ) {
        if(isSet(ReqObj.Form[tmpId].ctaName) && ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e"){
        
        if(pnsno[0]!='+'){
        pnsno = pnsno.substring(0,4) + "xxxxxxx ";
        }
        else
        pnsno = pnsno.substring(0,7) + "xxxxxxx ";
        $("#pnsnoenq").html(pnsno);
      }
      else{
      $(".pnsEnq").hide();
      }
      
      }
      if (currentISO() !== "IN") {
        if (EnqPopupDIR(tmpId) && $("#yajaca").css("display") != "block") {
          $("#yajaca").show();
          $("#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input").addClass("toConv");
          $("input.toConv").attr("value", "Submit");
          ReqObj.Form[tmpId].toShowMsg = 0;
          ReqObj.Form[tmpId].msgFromOtp = 0;
        }
      }
      else {
        if ($("#yajaca").css("display") == "block") {
          hideClickMsg(tmpId);
          ReqObj.Form[tmpId].toShowMsg = 1;
        }
      }
  
  
  
      ReqObj.Form[tmpId].flags.isFlagSuggSet = false;
      if (IsChatbl(tmpId)) {
        this.handleUI({
          data: {
            todo: "default",
            obj: this,
            tmpId: tmpId,
          },
        });
        this.handleUI({
          data: {
            todo: "transition",
            obj: this,
            tmpId: tmpId,
          },
        });
      } // PBRENQFORM - 3620
      if (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09")
        this.handleUI({
          data: {
            todo: "focus",
            obj: this,
            tmpId: tmpId,
          },
        });
      this.handleEvents(this, tmpId);
      this.handleUI({
        data: {
          todo: "isoFlag",
          obj: this,
          tmpId: tmpId,
        },
      });
      //   this.handleUI({
      //     data: {
      //       todo: "chatblFlag",
      //       obj: this,
      //       tmpId: tmpId
      //     }
      //   });
      get_buyer_info(tmpId);
      if (imeshExist() === "") $("#t" + tmpId + "_leftR").addClass("lftMgn");
    }
  
    if (
      !(isSSB(tmpId) || Bl01(tmpId) || Bl04(tmpId) || IsChatbl(tmpId)) &&
      currentISO() !== "IN" &&
      $("#t" + tmpId + "_gSignInWrapper").length === 0
    ) {
      var stylo =
        Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl"
          ? "4px;"
          : "10px;";
      var styl =
        Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl"
          ? "0;"
          : "10px 0px 15px 0px;";
      var cls =
        Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl"
          ? "pdlr10"
          : "";
      var orline = (isInactiveBL(tmpId)) ? "orline" : "";
      var customG = (isInactiveBL(tmpId)) ? "customG2" : "customG";
      var ghtml =
        '<div id = "t' +
        tmpId +
        '_gwrap"> <p style="font-size:14px;font-weight:600;text-align: center;margin-top: ' +
        stylo +
        '" class=' + orline + '>OR</p> <div id="t' +
        tmpId +
        '_gSignInWrapper" style="text-align:center; margin: ' +
        styl +
        '" > <div id="t' +
        tmpId +
        'signinBtnFr" class="' + customG + '"> <span class="Gicon"> </span> <span class="buttonTextfr ' +
        cls +
        '"> Login with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
      var ele = $("#t" + tmpId + "_submit");
      if (isSet(ele)) $("#" + ele.parent()[0].id).append(ghtml);
      this.registerForm(tmpId);
    }
    if (IsChatbl(tmpId) && currentISO() != "IN") this.registerForm(tmpId);
  };   
  
  
  
  UserLogin.prototype.handleHeading = function (tmpId) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq"){
      if(isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0){
        $("#blheading").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
      }
      else{
        $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
      }
    }
    else if (isImageVidEnq(tmpId) &&ReqObj.Form[tmpId].FormSequence.StepCounter === 0)
      $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
    else
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
  };
  
  UserLogin.prototype.handleButton = function (tmpId) {
    ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
  };
  
  
  
  
  UserLogin.prototype.addHtmlObjToArray = function (htmlObj) {
    this.UserloginHtmlObjArray.push(htmlObj);
  };
  
  UserLogin.prototype.displayHtml = function (tmpId) {
    /* common for all classes */
    if (isSet(tmpId)) {
      $("#t" + tmpId + "_byrinfo").removeClass("bedsnone");
      $("#t" + tmpId + "_hdg").removeClass("bedsnone");
      $("#t" + tmpId + "_login").removeClass("bedsnone");
      var chathelpmsg = "";
      if (IsChatbl(tmpId)) {
        var helpiso = currentISO() === "IN" ? "number" : "email";
        chathelpmsg = "<div class='t" + tmpId + "_userInput cbl_br10 dn'><div class='befs11 beclr'><i class='chat-elip'>i</i>Seller Details are sent on this " + helpiso + "</div></div>";
        return [this.loginhtmlQues, this.loginhtmlInput];
      }
      if (isOtherEnq(tmpId)) {
        ReqObj.Form[tmpId].calledClassName[
          ReqObj.Form[tmpId].FormSequence.StepCounter
        ] = this.className;
      }
      return [this.loginhtml, chathelpmsg];
    }
  };
  
  UserLogin.prototype.hasHtml = function (UserloginObj) {
    if (isSet(UserloginObj)) {
      this.classCount = returnObjectSize(
        ReqObj.Form[UserloginObj.tmpId].ContactDetail
      );
      ReqObj.Form[UserloginObj.tmpId].nec.classCount = this.classCount;
      this.addHtmlObjToArray(this.getLoginHTML(UserloginObj.tmpId));
      var UserLoginSuffixHtmlObj = {};
      if (!IsChatbl(UserloginObj.tmpId)) {
        var tmpId = UserloginObj.tmpId;
        var sticky = isSticky(UserloginObj.tmpId) ? "FM_bedvh" : Bl04(tmpId) && currentISO() !== "IN" ? "bedvh fruflg" : "bedvh";
        if (ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0)
          sticky = "bedvh nflgm";
        var UserLoginSuffixOuterHtml = isSSB(UserloginObj.tmpId) ? "<div><div  id='t" + UserloginObj.tmpId + "_login' class='" + ssbClass("wrprClass", UserloginObj.tmpId) + "'>" : "<div  id='t" + UserloginObj.tmpId + "_login' class='" + sticky + "'>";
        var countryDiv = this.countryDiv(UserloginObj.tmpId);
        var cntflg = flagd(countryDiv, UserloginObj.tmpId);
        var UserLoginSuffixClosingHtml = isSSB(UserloginObj.tmpId)
          ? "</div>" : Enq04(UserloginObj.tmpId) || (Bl04(tmpId) && !(ReqObj["Form"][UserloginObj.tmpId].modId === "DIR" && !isNotfoundBl(UserloginObj.tmpId)))
            ? "</div>" + cntflg : "</div>";
        UserLoginSuffixHtmlObj = {
          SuffixOuterHtml: UserLoginSuffixOuterHtml,
          SuffixClosingHtml: UserLoginSuffixClosingHtml,
          suffix: "_login",
        };
        this.loginhtml = MakeWrapper([this.UserloginHtmlObjArray], UserloginObj.tmpId, UserLoginSuffixHtmlObj, "");
      } else {
        var countryDiv = this.countryDiv(UserloginObj.tmpId);
        var world_img = '<i class="oeWicn"></i>';
        var cls = "bepr oeCnty";
        ReqObj.Form[UserloginObj.tmpId].ctn = ReqObj.IPDetails["countryname"] == "" ? "India" : ReqObj.IPDetails["countryname"];
        var html = "<div id='t" + UserloginObj.tmpId + "mflag'class='oeChng'>" + world_img + "<div class='oef0'>Your Country is </div><div id='t" + UserloginObj.tmpId + "country' class='" + cls + "'>" + ReqObj.Form[UserloginObj.tmpId].ctn + countryDiv + "</div></div>";
        this.loginhtmlQues = MakeWrapper([this.UserloginHtmlObjArray], UserloginObj.tmpId, WrapperObj("<div id='t" + UserloginObj.tmpId + "_login' class = 'cbl_ques cbl_vh'>", "</div>", "_login"), "ques");
        this.loginhtmlInput = MakeWrapper([this.UserloginHtmlObjArray], UserloginObj.tmpId, WrapperObj("<div id = 't" + UserloginObj.tmpId + "_login_input' class ='cbl_dtls cbl_mobile cbl_df cbl_aic t" + UserloginObj.tmpId + "_userInput cbl_br10 dn'>", "</div>", "_login"), "input");
        this.loginhtml = this.loginhtmlQues + this.loginhtmlInput;
        if ($("#t" + UserloginObj.tmpId + "mflag").length == 0) {
          $("#t" + UserloginObj.tmpId + "_tCond").before(html);
          ReqObj.Form[UserloginObj.tmpId]["flagcalling"] = 0;
        }
      }
  
      UserloginObj.that.NumberofClassCalled -= 1;
      if (this.loginhtml !== "") {
        ReqObj.Form[UserloginObj.tmpId].currentclassCount++;
        this.ifHtmlPresent(UserloginObj);
      } else {
        this.ifHtmlNotPresent(UserloginObj);
      }
      if (this.loginhtml !== "") return true;
      else return false;
    }
  };
  
  UserLogin.prototype.ifHtmlPresent = function (UserloginObj) {
    AttachObject(UserloginObj.object, UserloginObj.tmpId);
    if (isSet(UserloginObj.AfterService)) {
      for (var i = 0; i < UserloginObj.AfterService.length; i++) {
        UserloginObj.that.MakeSeq(
          UserloginObj.AfterService[i],
          UserloginObj.tmpId
        );
      }
    }
    if (UserloginObj.that.NumberofClassCalled === 0) {
      makeFinalSeq(UserloginObj, UserloginObj.tmpId);
    }
  };
  
  UserLogin.prototype.ifHtmlNotPresent = function (UserloginObj) {
    if (UserloginObj.hasFallback) {
      CreateSeq(UserloginObj.FallbackObj);
    }
  };
  
  UserLogin.prototype.validate = function (tmpId, event) {
    /* terms and condition if required */
    if (isSet(tmpId)) {
      var that = this;
      if (isSet(event.target.textContent) && event.target.textContent !== "") {
        ReqObj.Form[tmpId].UserInputs["toChange"] = event.target.textContent; //  to test
        that.toChange = true;
      } else that.toChange = false;
      if (that.toChange === false) {
        var iso_change = currentISO();
        that.captureDetails(iso_change, tmpId);
        if (!isSet(validation)) createGlobalObject();
        that.username = $("#t" + tmpId + "_login_field").val();
        var validlogin =
          iso_change === "IN"
            ? validation.isMobileValid(that.username)
            : validation.isEmailFilled(that.username);
        // remove if error already present
        if (
          !$("#t" + tmpId + "_msg_primary_info_err_login").hasClass("bedsnone")
        ) {
          that.handleUI({
            data: {
              tmpId: tmpId,
              todo: "removeError",
              obj: that,
            },
          });
        }
        if (
          $("#t" + tmpId + "_login").html() !== "" &&
          validlogin["type"] === false
        ) {
          if (
            !(ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId))
          ) {
            that.handleUI({
              data: {
                tmpId: tmpId,
                errormsg: validlogin["error"],
                todo: "validationError",
                obj: that,
              },
            });
          }
          ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
          return false;
        } else if (isGDPRCountry() && imeshExist() === "") {
          if (isSet(event.data) && event.data.todo.toLowerCase() === "blurlogin")
            return true;
          if (
            isSet(ReqObj.Form[tmpId].IsCheckboxChecked) &&
            ReqObj.Form[tmpId].IsCheckboxChecked !== ""
          ) {
            if (ReqObj.Form[tmpId].IsCheckboxChecked === false) {
              ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
              return false;
            } else {
              return true;
            }
          } else return false;
        }
        return true;
      } else return true;
    }
  };
  
  UserLogin.prototype.captureDetails = function (iso_change, tmpId) {
    if (iso_change === "IN") {
      ReqObj.UserDetail["mb1"] = $("#t" + tmpId + "_login_field").val();
      ReqObj.TempMobile = ReqObj.UserDetail["mb1"];
    } else {
      ReqObj.UserDetail["em"] = $("#t" + tmpId + "_login_field").val();
      ReqObj.TempEmail = ReqObj.UserDetail["em"];
    }
  };
  UserLogin.prototype.returnText = function (iso_change, tmpId) {
    // if (isOtherEnq(tmpId) && isImageVidEnq(tmpId) && imeshExist() === "") {
    //   return (iso_change === "IN") ? "Enter your mobile" : "For example abc@gmail.com";
    // }
  
    return iplocExist() === "" &&
      ReqObj.ipLoc.zoneISO === "OTHER" &&
      ReqObj.ipLoc.onClose === false
      ? ""
      : iso_change === "IN"
        ? "Enter your mobile"
        : "Enter your email";
  };
  
  UserLogin.prototype.returnLoginFieldClass = function (iso_change, tmpId) {
    var sticky = isSticky(tmpId) ? "FM_benords" : "benords";
    var mob_html = isInactiveBL(tmpId) ? "mob-input" : "";
    var inputCls = IsChatbl(this.what)
      ? ""
      : isSSB(this.what)
        ? "mb-mNm"
        : iso_change === "IN"
          ? "be-input " + sticky + " beW3 beh32 " + mob_html
          : "be-input " + sticky + " beW3 beh32 beemail " + mob_html;
    inputCls = isBlInline(this.what)
      ? iso_change === "IN"
        ? "be-input beW3 beh32"
        : "be-input beW3 beh32 beemail"
      : inputCls;
    return inputCls;
  };
  
  UserLogin.prototype.returnLoginValue = function (iso_change, tmpId) {
    return rvalue(tmpId, "flogin");
  };
  
  UserLogin.prototype.returnErrorDiv = function (tmpId, formType) {
    if (isSSB(tmpId)) return loginErrorDivSSB(tmpId);
    var html = "";
    var sticky = isSticky(tmpId) ? "FM_beerrp" : "beerrp";
    var errorclass = IsChatbl(tmpId)
      ? "bltperor bedsnone"
      : "be-erbx " + sticky + " bedsnone";
    html += returnContainer(
      "t" + tmpId,
      "_msg_primary_info_err_login",
      errorclass,
      "",
      "",
      ""
    );
    html += returnContainer(
      "t" + tmpId,
      "_primary_info_errmsg_login",
      "",
      "content",
      "",
      ""
    );
    if (IsChatbl(tmpId)) html += "</div></div>";
    else {
      if (
        !isOtherEnq(tmpId) ||
        (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09")
      )
        html += '</div><a class="be-erarw" data-role="arrow"></a></div>';
      else if (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09")
        html += "</div></div>";
    }
    return html;
  };
  
  UserLogin.prototype.getLabel = function (tmpId, formType, iso_change) {
    var that = this;
    var label = pdpenqImage(tmpId) ? "" : isEcomProduct(tmpId) ? iso_change === "IN" ? "Mobile Number" : "Email ID" : isFirstImgVidCTA(tmpId)
      ? "Get customised quotes from seller" : iso_change === "IN" ? "Mobile Number" : "Email ID";
    if (isInactiveBL(tmpId)) {
      label = (currentISO() == 'IN') ? "Mobile Number <span class='redc'>*</span>" : "Email ID <span class='redc'>*</span>";
    }
    if (isBlInlineFr(tmpId)) label += "*";
    label = iplocExist() === "" && ReqObj.ipLoc.zoneISO === "OTHER" && ReqObj.ipLoc.onClose === false ? "" : label;
    var sticky = isSticky(tmpId) ? "FM_be-lbl" : "be-lbl";
    var frcls = isBlInlineFr(tmpId) ? " fadLbl" : "";
    var boldcls = pdpenqImage(tmpId) ? "" : "befwt ";
    var labelclass = isFirstImgVidCTA(tmpId) ? boldcls + sticky + " beml-50 fsciv eqmb20" : isSSB(tmpId) ? ssbClass("label", tmpId) : isBlInline(tmpId) ? "fs15 cl11 wf" + frcls : sticky + " beml-50";
    if (ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0)
      labelclass += " nflblm";
    var text = label;
    var html = ""; /* Do not change the html sequence */
    if (IsChatbl(tmpId)) {
      html += "Please share your ";
      html += returnSpan("t" + tmpId, "login_span_bold", label, "befwt");
      html += " to receive quotes from sellers";
      html += iso_change === "IN" ? "" : '<div id = "t' + tmpId + '_gwrap"> <p style="font-size:14px;font-weight:600;text-align: center;margin-top: 10px; ">OR</p> <div id="t' + tmpId + '_gSignInWrapper" style="text-align:center; margin: 10px 0px 15px 0px;" > <div id="t' + tmpId + 'signinBtnFr" class="customG"> <span class="Gicon"> </span> <span class="buttonTextfr "> Login with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
    } else {
      if ((!isBlInline(tmpId) && !isSSB(tmpId) && !isOtherEnq(tmpId)) || (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09"))
        html += that.returnErrorDiv(tmpId, formType);
  
      html += returnLabel("t" + tmpId, text, "_label-l", labelclass);
  
      if (!(isEcomProduct(tmpId) || pdpenqImage(tmpId)) && isFirstImgVidCTA(tmpId)) {
        text = "Contact seller";
        html = msg_firimgvid(text, tmpId);
      }
    }
    that.UserloginHtmlObj["Label"] = html;
  };
  UserLogin.prototype.flagDiv = function (tmpId) {
    var cls = IsChatbl(tmpId) ? "dropdown" : "dropdown bebdr be-flg";
    return $("#t" + tmpId + "flag").length > 0
      ? ""
      : "<dl id='t" + tmpId + "flag' class='" + cls + "'></dl>";
  };
  UserLogin.prototype.countryDiv = function (tmpId) {
    return $("#t" + tmpId + "flagdiv2").length > 0 && !IsChatBLInline(tmpId)  // new chat bl unidentified
      ? ""
      : "<dl id='t" +
      tmpId +
      "country_dropd' class='dropdown bebdr be-flg'></dl>";
  };
  
  ContactDetail.prototype.countryDiv = function (tmpId) {
    return $("#t" + tmpId + "flagdiv2").length > 0
      ? ""
      : "<dl id='t" +
      tmpId +
      "country_dropd' class='dropdown bebdr be-flg'></dl>";
  };
  UserLogin.prototype.getInput = function (tmpId, formType, iso_change) {
    var iploccookie = usercookie.getCookie("iploc");
    ReqObj.IPDetails["countryname"] = usercookie.getParameterValue(
      iploccookie,
      "gcnnm"
    );
    this.UserloginHtmlObj["UserInput"] = IsChatbl(tmpId)
      ? this.getmobhtml(tmpId, formType, iso_change)
      : this.getBlEnqInput(tmpId, formType, iso_change);
  };
  UserLogin.prototype.getNewSSbInput = function (
    tmpId,
    formType,
    iso_change,
    inputLogin
  ) {
    var that = this;
    var flagDiv = "";
    var html = '<div class="nb-flex">';
    html += isnewSSB(tmpId)
      ? currentISO() === "IN"
        ? "<div class='nb-w80 nb-lgn'>"
        : "<div class='nb-w80 nb-lgn nb-lgnf'>"
      : "";
    html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";
    html += "<div id='t" + tmpId + "_dliso' class='mb-mIso'>";
    if (iso_change === "IN")
      html += isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? returnIsoHtml(tmpId, "") + "</div></div>"
          : returnIsoHtml(tmpId, "") + "</div>"
        : returnIsoHtml(tmpId, "be-flisq iso") + "</div>";
    else html += "</div></div>";
    html += "<div class='nb-frm nb-ml5 nb-flx1'>" + inputLogin + "</div>";
    //that.UserloginHtmlObj["Label"] = "";
    return html;
  };
  function flagd(countryDiv, tmpId) {
    ReqObj.Form[tmpId].ctn =
      ReqObj.IPDetails["countryname"] == ""
        ? "India"
        : ReqObj.IPDetails["countryname"];
    if ((Enq04(tmpId)) && $("#t" + tmpId + "flag").length)
      $("#t" + tmpId + "flag").removeClass();
    var world_img = '<i class="oeWicn"></i>';
    var cls = isFirstImgVidCTA(tmpId) ? "oeCnty oeCdrp" : "bepr oeCnty";
    var fcls = isNotfoundBl(tmpId) ? "oeChng fmcnf" : "oeChng";
    var cntflg =
      "<div id='t" +
      tmpId +
      "mflag' class='" +
      fcls +
      "'>" +
      world_img +
      "<div class='oef0'>Your Country is </div><div id='t" +
      tmpId +
      "country' class='" +
      cls +
      "'>" +
      ReqObj.Form[tmpId].ctn +
      countryDiv +
      "</div></div>";
    return cntflg;
  }
  UserLogin.prototype.getBlEnqInput = function (tmpId, formType, iso_change) {
    var html = isBlInline(tmpId)
      ? iso_change === "IN"
        ? "<div class='pflx1 pr'><div id='t" +
        tmpId +
        "_blin' class='idsf ilgn inW240'>"
        : "<div class='pflx1 pr'><div id='t" +
        tmpId +
        "_blin' class='idsf ilgn inW240 flgn'>"
      : "";
    if (isSSB(tmpId)) html = ssbLoginHtml(tmpId, "startDiv", iso_change);
    var style =
      iso_change !== "IN" && tmpId.substring(0, 2) === "09"
        ? "width : 282px"
        : "";
  
    var eqcntyClass = isSSB(tmpId) ? "mb-mIso"
      : Bl09(tmpId) && iso_change !== "IN" ? isInactiveBL(tmpId) ? "eqCnty be-flg bebdr brdlft8" : "eqCnty be-flg bebdr"
        : isNotfoundBl(tmpId) && iso_change !== "IN" ? "eqCnty pr nfblf" : "eqCnty pr";
  
    var flagDiv = "";
    var brdlft = (isInactiveBL(tmpId)) ? "be-flisq iso brdlft8" : "be-flisq iso";
    if (formType.toLowerCase() === "bl") {
      //html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";
      html += "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
      if (iso_change === "IN")
        html += isSSB(tmpId)
          ? returnIsoHtml(tmpId, "") + "</div>"
          : returnIsoHtml(tmpId, brdlft) + "</div>";
      else html += "</div>";
    } else {
  
      html += "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
      html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";
  
      if (iso_change === "IN")
        html += returnIsoHtml(tmpId, brdlft) + "</div>";
      else html += "</div>";
    }
    //html = "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
    //html += returnDl("t" + tmpId, "_Country_dropdown", "dropdown bebdr be-flg", "");/* Pass nothing if field to be enabled */
  
    var maxlength = iso_change === "IN" ? "10" : "";
  
    if (isOtherEnq(tmpId)) {
      html += returnInput(
        "t" + tmpId,
        "_login_field",
        "text",
        "login_field",
        this.returnText(iso_change, tmpId),
        this.returnLoginFieldClass(iso_change, tmpId) + " inPlace",
        this.returnLoginValue(iso_change, tmpId),
        "",
        maxlength,
        "request"
      );
      if (tmpId.substring(0, 2) === "09")
        html += this.returnErrorDiv(tmpId, formType);
    } else {
      var inputLogin = returnInput(
        "t" + tmpId,
        "_login_field",
        "text",
        "login_field",
        this.returnText(iso_change, tmpId),
        this.returnLoginFieldClass(iso_change, tmpId),
        this.returnLoginValue(iso_change, tmpId),
        style,
        maxlength,
        "request"
      );
      html += inputLogin;
    }
    var countryDiv = this.countryDiv(tmpId);
    var cntflg = flagd(countryDiv, tmpId);
    html += !isBlInline(tmpId) && !Enq04(tmpId) && !Bl04(tmpId) ? cntflg : "";
    ReqObj.Form[tmpId].flag = Enq04(tmpId) || Bl04(tmpId) ? 1 : 0;
    html = isnewSSB(tmpId)
      ? this.getNewSSbInput(tmpId, formType, iso_change, inputLogin)
      : html;
    var helpmsg = iso_change === "IN" ? "number" : "email";
    var helptextclass = isSSB(tmpId) ? "mb-mbuTxt mb-mt10 " : "be-msghlp";
    if (isSSB(tmpId) || isBlInline(tmpId))
      html += "</div>" + this.returnErrorDiv(tmpId, formType);
  
    var helpmsgDiv = returnContainer(
      "t" + tmpId,
      "_helpmsg",
      helptextclass,
      "",
      "Seller will contact you on this " + helpmsg,
      ""
    );
    html +=
      isBlInline(tmpId) && !ReqObj.Form[tmpId].isFrInline
        ? helpmsgDiv + "</div>"
        : "";
    html += isBlInline(tmpId) ? cntflg : "";
  
    if (isSSB(tmpId)) html += ssbLoginHtml(tmpId, "loader", iso_change);
  
    html += "</div>";
    html += isnewSSB(tmpId) ? cntflg : "";
    if (isFirstImgVidCTA(tmpId)) html = "<div class='enumpr'>" + html + "</div>";
    return html;
  };
  UserLogin.prototype.getmobhtml = function (tmpId, formType, iso_change) {
    var html = "";
    var style = iso_change !== "IN" && !IsChatbl(tmpId) ? "width :282px" : "";
    var classTobeAdded = iso_change === "IN" ? "bedsnone" : "cbl_flag";
    html = returnContainer("t" + tmpId, "_flagC", classTobeAdded, "", html, "");
    html += "</div>";
    var brdlft = (isInactiveBL(tmpId)) ? "be-flisq iso brdlft8" : "be-flisq iso";
    if (iso_change === "IN") {
      html +=
        returnContainer(
          "t" + tmpId,
          "_isoC",
          "cbl_iso",
          "",
          returnIsoHtml(tmpId, brdlft),
          ""
        ) + "</div>";
    }
  
    var maxlength = iso_change === "IN" ? "10" : "";
    html += returnInput(
      "t" + tmpId,
      "_login_field",
      "text",
      "login_field",
      this.returnText(iso_change, tmpId),
      this.returnLoginFieldClass(iso_change, tmpId),
      this.returnLoginValue(iso_change, tmpId),
      style,
      maxlength,
      "request"
    );
    if (IsChatbl(tmpId)) ReqObj.Form[tmpId].flags.isCountryFlagSuggSet = true;
    return html;
  };
  UserLogin.prototype.getLoginHTML = function (tmpId) {
    /* Do not change the html sequence */
    if (isSet(tmpId)) {
      var that = this;
      var formType = ReqObj.Form[tmpId].formType.toLowerCase();
      var iso_change =
        IsChatbl(tmpId) &&
          ReqObj.Form[tmpId].UserInputs["Country"] === "Change my Country".trim()
          ? ""
          : currentISO(); /* check if iploc not indian and user says yes */
      that.getLabel(tmpId, formType, iso_change);
      that.getInput(tmpId, formType, iso_change);
      if (isOtherEnq(tmpId)) {
        var clsnm = "";
        if (isImageVidEnq(tmpId) && imeshExist() === "") {
          clsnm = currentISO(tmpId) !== "IN" ? "enqLogInp eqFnu imgfv" : "enqLogInp imgfv";
          $("#t" + tmpId + "_question").addClass("mvta");
        } else {
          clsnm = "enqLogInp";
          if (iso_change !== "IN") clsnm += " eqFrUs";
          $("#t" + tmpId + "_question").removeClass("mvta");
        }
        if (tmpId.substring(0, 2) !== "09") clsnm = clsnm + " inllog";
        if (isFirstImgVidCTA(tmpId)) clsnm = clsnm + " eqimgvidm";
        that.UserloginHtmlObj["OuterWrapper"] = IsChatbl(tmpId) ? "" : "<div id='t" + tmpId + "clslog' class='" + clsnm + "'>";
        that.UserloginHtmlObj["ClosingWrapper"] = IsChatbl(tmpId) ? "" : "</div>";
      } else {
        var frcls = Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl" && currentISO() != "IN" ? "mb10imp" : Bl09(tmpId) && !isInactiveBL(tmpId) && currentISO() !== "IN" && imeshExist() === "" ? "blfr" : "";
        var clss = isBlInlineFr(tmpId) ? "fmb15" : "idsf pfstrt mb20";
        that.UserloginHtmlObj["OuterWrapper"] = IsChatbl(tmpId) || isSSB(tmpId) ? "" : isBlInline(tmpId) ? '<div class="' + clss + '">' : isInactiveBL(tmpId) ? "<div class='idsf' id='name_email'><div class='belft bepr bT1-st3 " + frcls + "'>" : "<div class='belft bepr bemgb15 bT1-st3 " + frcls + "'>";
  
        that.UserloginHtmlObj["ClosingWrapper"] = IsChatbl(tmpId) || isSSB(tmpId) ? "" : isInactiveBL(tmpId) ? "</div></div>" : "</div>";
      }
      return that.UserloginHtmlObj;
    }
  };
  UserLogin.prototype.getData = function (tmpId, userlogin, todo) {
    var what = isSet(todo) ? todo : "";
    var iso = currentISO();
    var loginflag = new LoginFlag().returnLoginFlag(what);
  
    if (typeof imesh_obj === "undefined" && typeof userDataCookie === "function")
      /*  imesh_obj global var of header.js */
      imesh_obj = new userDataCookie();
  
    var data = {
      s_country_iso: iso,
      modid: modIdf,
      curr_page_url: window.location.href,
      s_ip_address: usercookie.getParameterValue(userlogin.iplocCookie, "gip"),
      s_ip_country: usercookie.getParameterValue(userlogin.iplocCookie, "gcnnm"),
      s_ip_country_iso: usercookie.getParameterValue(
        userlogin.iplocCookie,
        "gcniso"
      ),
      loginflag: loginflag,
    };
  
    data["flag"] = ReqObj.Form[tmpId].formType;
    if (IsChatbl(tmpId)) data["flag"] = "BL";
  
    if (typeof userlogin.username === "undefined" || userlogin.username === "") {
      data["username"] =
        iso === "IN"
          ? usercookie.getParameterValue(userlogin.imeshCookie, "mb1")
          : usercookie.getParameterValue(userlogin.imeshCookie, "em");
    } else data["username"] = userlogin.username;
  
    return ObjectTrim(data);
  };
  UserLogin.prototype.getLoginAjaxURL = function () {
    var url = "";
    if (
      appsServerName == "//dev-apps.imimg.com/" ||
      appsServerName == "//stg-apps.imimg.com/"
    )
      url = "//dev1-login.indiamart.com/user/identify/";
    else url = "//login.indiamart.com/user/identify/";
    return url;
  };
  
  UserLogin.prototype.getGoogleLoginAjaxURL = function () {
    var url = "";
    if (
      appsServerName == "//dev-apps.imimg.com/" ||
      appsServerName == "//stg-apps.imimg.com/"
    )
      url = "//dev1-login.indiamart.com/user/loginwithgoogle_first/";
    else url = "//login.indiamart.com/user/loginwithgoogle_first/";
    return url;
  };
  
  UserLogin.prototype.getajaxData = function (data) {
    var ajaxData = {
      username: ReturnCorrectVal(data["username"], ""),
      iso: ReturnCorrectVal(data["s_country_iso"], ""),
      identified: 1,
      modid: ReturnCorrectVal(data["modid"], ""),
      token: "imobile@15061981",
      format: "JSON",
      screen_name:
        ReturnCorrectVal(data["flag"], "") +
        " Form on " +
        ReturnCorrectVal(data["modid"], ""),
      IP: ReturnCorrectVal(data["s_ip_address"], ReqObj.IPDetails["ipaddress"]),
      USER_IP: ReturnCorrectVal(
        data["s_ip_address"],
        ReqObj.IPDetails["ipaddress"]
      ),
      ip: ReturnCorrectVal(data["s_ip_address"], ReqObj.IPDetails["ipaddress"]),
      USER_IP_COUNTRY: ReturnCorrectVal(
        data["s_ip_country"],
        ReqObj.IPDetails["countryname"]
      ),
      GEOIP_COUNTRY_ISO: ReturnCorrectVal(
        data["s_ip_country_iso"],
        ReqObj.IPDetails["countryiso"]
      ),
      IPADDRESS: ReturnCorrectVal(
        data["s_ip_country"],
        ReqObj.IPDetails["countryname"]
      ),
    };
  
    if (
      data["loginflag"] === 1 ||
      data["loginflag"] === 4 ||
      data["loginflag"] === 5
    ) {
      ajaxData["originalreferer"] = ReturnCorrectVal(data["curr_page_url"], "");
      ajaxData["create_user"] = 1;
    }
    return ajaxData;
  };
  UserLogin.prototype.returnBool = function (event) {
    var tmpId = event.data.tmpId;
    var userlogin = event.data.userlogin;
    var blureve = event.data.blureve;
    if (isSet(event.data.iso)) var iso = event.data.iso;
    var bool = blureve === true && (isEnq(tmpId) || Bl09(tmpId)) && iso === "IN" ? false : isSet(blureve) && blureve === true ? userlogin.validate(tmpId, event) : true;
    return bool;
  };
  
  UserLogin.prototype.beforHitDefaults = function (logObject, todo, tmpId, userlogin) {
    if ((isSet(logObject) && logObject !== "") || (logObject === "" && todo === "blurlogin")) {
      if (IsChatbl(tmpId)) {
        userlogin.handleUI({
          data: {
            tmpId: tmpId,
            todo: "chatblur",
            fromwhere: "beforehit",
            obj: userlogin,
          },
        });
      } else {
        userlogin.handleUI({
          data: {
            tmpId: tmpId,
            todo: "disableNameField",
            fromwhere: "beforehit",
            obj: userlogin,
          },
        });
        isSSB(tmpId) ? addBlLoaderSSB(tmpId, "ssblogin") : addBlLoader(tmpId, "left");
      }
    }
  };
  UserLogin.prototype.reAuthenticate = function (event) {
    var tmpId = event.data.tmpId;
    var userlogin = event.data.userlogin;
    var imesh = imeshExist();
    var iploc = iplocExist();
    var data = {
      imesh: imesh,
      im_iss: im_issExist(),
      v4iilex: v4iilexExist(),
      s_glusrid: usercookie.getParameterValue(imesh, "glid"),
      username:
        currentISO() === "IN"
          ? ReqObj.UserDetail["mb1"]
          : ReqObj.UserDetail["em"],
      country: usercookie.getParameterValue(iploc, "gcnm"),
      IP: usercookie.getParameterValue(iploc, "gip"),
      loginmode:
        ReqObj.loginMode !== 0
          ? ReqObj.loginMode
          : new LoginMode().getLoginMode(),
      ph_country: usercookie.getParameterValue(imesh, "phcc"),
      iso: currentISO(),
      modid: modIdf,
    };
    $.ajax({
      cache: false,
      url: appsServerName + "index.php?r=Newreqform/Reauthenticate",
      type: "GET",
      crossOrigin: true,
      crossDomain: true,
      data: data,
      dataType: "json",
      success: function (res) {
        userlogin.updateUserDetails(data.loginmode, res, "reauth");
        userlogin.updateFlagDetails(data.loginmode, res);
        callToIdentifiedQ(tmpId, "from-Form", 0);
      },
    });
  };
  
  UserLogin.prototype.sendRequest = function (event) {
    var that = this;
    var logObject = event.data.logObject;
    var tmpId = event.data.tmpId;
    var userlogin = event.data.userlogin;
    var todo = event.data.todo;
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var bool = userlogin.returnBool(event);
    that.userBlocked = 0;
    if (
      isSSB(tmpId) &&
      !isSet(event.data.source) &&
      $.inArray(ConstructorName(this), ReqObj.Form[tmpId].servicecalled) !== -1
    ) {
      PostAjax(logObject, tmpId);
      return;
    }
    if (bool === true) {
      if (isSet(ReqObj.Form[tmpId].defSubmit))
        ReqObj.Form[tmpId].defSubmit.blurfired =
          todo === "blurlogin" ? true : false;
      if (todo === "blurlogin" && isSet(ReqObj.Form[tmpId].defSubmit))
        ReqObj.Form[tmpId].defSubmit.loginfval = $(
          "#t" + tmpId + "_login_field"
        ).val();
      userlogin.classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail);
      userlogin.beforHitDefaults(logObject, todo, tmpId, userlogin);
      var data = userlogin.getData(tmpId, userlogin, todo);
      var ajaxdata = userlogin.getajaxData(data);
      var ajaxURL = userlogin.getLoginAjaxURL();
      $.ajax({
        cache: false,
        url: ajaxURL,
        type: "POST",
        crossOrigin: true,
        crossDomain: true,
        data: ajaxdata,
        dataType: "json",
        success: function (res) {
          // if(data.username == "manisince1999@gmail.com"){
          //     res = {"message":"ISO MisMatch","access":"0","code":"204","msg":"You seem to be from India. Select India as Country"};
          // }
          // res={"DataCookie":{"fn":"","em":"","phcc":"","iso":"IN","mb1":"","ctid":"","glid":"","cd":"","cmid":"","utyp":"","ev":"","uv":"","usts":"2","admln":"","admsales":""},"access":"0","code":"204","msg":"User blocked for Identification"}
          if (isSet(res)) {
            /* ::If response set ::*/
            if (data.loginflag === 3) {
              userlogin.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "defaultFlag3",
                  obj: userlogin,
                },
              });
            }
            if (
              (isSet(logObject) && logObject !== "") ||
              (logObject === "" && todo === "blurlogin")
            ) {
              /* logObject not empty - Login Hit :: blurlogin - blur Hit */
              IsChatbl(tmpId)
                ? removeBLLoader(tmpId, "left")
                : isSSB(tmpId)
                  ? removeBLLoaderSSB(tmpId, "ssblogin")
                  : removeBLLoader(tmpId, "center");
              userlogin.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "enableNameField",
                  obj: userlogin,
                },
              });
            }
  
            // ecom, first we have to save details and then redirect, before handling ui part
            if (
              ReqObj.Form[tmpId].typeofform === "image" &&
              isEcomProduct(tmpId)
            ) {
              if (isSet(res.code) && parseInt(res.code) === 200) {
                userlogin.updateUserDetails(data.loginflag, res);
                userlogin.updateFlagDetails(data.loginflag, res);
  
                if (isSet(logObject) && isSet(tmpId) && logObject !== "") {
                  callToIdentifiedQ(tmpId, "from-Form");
                } else {
                  callToIdentifiedQ(tmpId, "from-Form", 0); /* Blur Hit */
                }
              }
              var isUserBlocked = 0;
              if (
                isSet(res.msg) &&
                res.msg.toLowerCase().trim() ===
                "user blocked for identification" &&
                res.DataCookie["iso"] === "IN"
              ) {
                isUserBlocked = 1;
              }
              var isIsoMismatch = 0;
              if (
                isSet(res.message) &&
                res.message.toLowerCase().trim() === "iso mismatch"
              ) {
                isIsoMismatch = 1;
              }
              if (
                imeshExist() !== "" ||
                isUserBlocked === 1 ||
                isIsoMismatch === 1
              ) {
                CloseForm(tmpId);
                window.open(ReqObj.Form[tmpId].ecomUrl, "_blank");
              }
            }
            userlogin.afterLoginHit({
              data: {
                tmpId: tmpId,
                res: res,
                obj: userlogin,
              },
            }); /* The Ui part is handled in afterLoginHit for 200/204 with saving necessary details  */
            if (
              (isSet(res.code) && parseInt(res.code) === 200) ||
              (isSet(that.userBlocked) && that.userBlocked === 1)
            ) {
              userlogin.updateUserDetails(data.loginflag, res);
              userlogin.updateFlagDetails(data.loginflag, res);
  
              if (isSet(logObject) && isSet(tmpId) && logObject !== "") {
                /* Post Ajax */
                if (isSSB(tmpId)) afterLoginSSBstep(tmpId, todo, that);
                PostAjax(logObject, tmpId);
                callToIdentifiedQ(tmpId, "from-Form");
              } else {
                callToIdentifiedQ(tmpId, "from-Form", 0); /* Blur Hit */
              }
            } else if (isSet(res.code) && parseInt(res.code) === 204) {
              blenqGATracking(form_type, "service:EtoGlusrLogin:" + res.message, res, 1, tmpId);
              userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
              userlogin.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "showemail",
                  obj: userlogin,
                },
              });
              userlogin.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "showcity",
                  obj: userlogin,
                },
              });
            } else {
              /* Track Error if code not 200/204 */
              blenqGATracking(form_type, "service:EtoGlusrLogin:failure", res, 1, tmpId);
              userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
            }
          } else {
            /* If response not set :: empty/null/undefined */
            blenqGATracking(form_type, "service:EtoGlusrLogin:failure", "response undefined", 1, tmpId);
            userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
          }
        },
        error: function (res) {
          if (ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId)) {
            CloseForm(tmpId);
            window.open(ReqObj.Form[tmpId].ecomUrl, "_blank");
          }
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              todo: "tryagain",
              obj: userlogin,
              msg: "",
            },
          });
          res = isSet(res) ? JSON.stringify(res) : "response undefined";
          blenqGATracking(form_type, "service:EtoGlusrLogin:failure", res, 1, tmpId);
          userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit */
          if (logObject === "" && todo === "blurlogin") {
            // removeBLLoader(tmpId, "center");
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "enableNameField",
                obj: userlogin,
              },
            });
          }
        },
        complete: function (res) {
          if (IsChatbl(tmpId))
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "chatblur",
                fromwhere: "aftercomplete",
                obj: userlogin,
              },
            });
          if (logObject === "" && todo === "blurlogin") {
            removeBLLoader(tmpId, "center");
          }
        },
      });
    } else {
      if (
        $("#t" + tmpId + "_tCondCheckBox").length > 0 &&
        isSet(ReqObj.Form[tmpId].defSubmit)
      ) {
        ReqObj.Form[tmpId].defSubmit.blurfired = true;
        ReqObj.Form[tmpId].defSubmit.loginfval = $(
          "#t" + tmpId + "_login_field"
        ).val();
      }
    }
  };
  UserLogin.prototype.logObjectNoPostAjax = function (logObject, tmpId) {
    if (isSet(logObject) && isSet(tmpId) && logObject !== "") {
      /* Not Blur Hit. */
      removeBLLoader(tmpId, "center");
      RemoveObjFromHit(logObject, tmpId);
    }
  };
  //fdsfgsf
  UserLogin.prototype.afterLoginHit = function (event) {
    var tmpId = event.data.tmpId;
    var userlogin = event.data.obj;
    var res = event.data.res;
  
    if (parseInt(res.code) === 200) {
      if (isSet(res.DataCookie) && Object.keys(res.DataCookie).length > 0) {
        if ($("#t" + tmpId + "_q_first_nm" + userlogin.classCount).length > 0) {
          if (isSet(res.DataCookie["fn"]) && res.DataCookie["fn"] !== "") {
            if (IsChatbl(tmpId))
              ReqObj.Form[tmpId].UserInputs["Name"] = res.DataCookie["fn"];
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["fn"],
                todo: "disableNameField",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
            if (
              ReqObj.Form[tmpId].defSubmit.todo === false &&
              ReqObj.Form[tmpId].defSubmit.subfired === false
            ) {
              ReqObj.Form[tmpId].defSubmit.subfired = true;
              ReqObj.Form[tmpId].FormSequence.FormSubmit(
                tmpId,
                ReqObj.Form[tmpId].defSubmit.eve
              );
            }
          } else if (isSet(res.DataCookie["fn"]) && res.DataCookie["fn"] === "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "enableNameField",
                fromwhere: "emptyTempName",
                obj: userlogin,
              },
            });
            if (
              ReqObj.Form[tmpId].defSubmit.todo === false &&
              ReqObj.Form[tmpId].defSubmit.subfired === false
            ) {
              ReqObj.Form[tmpId].defSubmit.subfired = true;
              ReqObj.Form[tmpId].FormSequence.FormSubmit(
                tmpId,
                ReqObj.Form[tmpId].defSubmit.eve
              );
            }
          } else if (Object.keys(res.DataCookie).length === 0) {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "enableNameField",
                fromwhere: "code",
                obj: userlogin,
              },
            });
          }
        }
        if ($("#t" + tmpId + "_q_email_in" + userlogin.classCount).length > 0) {
          if (isSet(res.DataCookie["em"]) && res.DataCookie["em"] !== "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["em"],
                todo: "hideemail",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          } else if (isSet(res.DataCookie["em"]) && res.DataCookie["em"] === "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["em"],
                todo: "showemail",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          }
        }
        if ($("#t" + tmpId + "_q_city_oth" + userlogin.classCount).length > 0) {
          if (isSet(res.DataCookie["ctid"]) && res.DataCookie["ctid"] !== "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["ctid"],
                todo: "hidecity",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          } else if (
            isSet(res.DataCookie["ctid"]) &&
            res.DataCookie["ctid"] === ""
          ) {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["ctid"],
                todo: "showcity",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          }
        }
        if ($("#t" + tmpId + "_q_mobile_f" + userlogin.classCount).length > 0) {
          if (isSet(res.DataCookie["mb1"]) && res.DataCookie["mb1"] !== "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["mb1"],
                todo: "hidemobile",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          } else if (
            isSet(res.DataCookie["ctid"]) &&
            res.DataCookie["ctid"] === ""
          ) {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["ctid"],
                todo: "showmobile",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          }
        }
      } else
        userlogin.handleUI({
          data: {
            tmpId: tmpId,
            todo: "tryagain",
            obj: userlogin,
            msg: "Something went wrong.Please try again.",
          },
        });
  
      if (isSet(res.DataCookie["glid"]) && res.DataCookie["glid"] !== "") {
        ReqObj.glid = res.DataCookie["glid"];
        !isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled
          ? toCallMiniDetails(tmpId)
          : "";
      }
    } else if (parseInt(res.code) === 204) {
      $("#t" + tmpId + "_q_first_nm" + userlogin.classCount).val("");
      $("#t" + tmpId + "_q_mobile_f" + userlogin.classCount).val("");
      if (
        isSet(res.msg) &&
        (res.msg.trim() === "Email is not registered with Indiamart." ||
          res.msg.trim() === "Mobile Number is not registered with Indiamart.") &&
        isSet(ReqObj.Form[tmpId].defSubmit.todo) &&
        ReqObj.Form[tmpId].defSubmit.todo === false &&
        ReqObj.Form[tmpId].defSubmit.subfired === false
      ) {
        ReqObj.Form[tmpId].defSubmit.subfired = true;
        ReqObj.Form[tmpId].FormSequence.FormSubmit(
          tmpId,
          ReqObj.Form[tmpId].defSubmit.eve
        );
      }
      userlogin.handleUI({
        data: {
          tmpId: tmpId,
          todo: "enableNameField",
          fromwhere: "emptyTempName",
          obj: userlogin,
        },
      });
      userlogin.handleUI({
        data: {
          tmpId: tmpId,
          value: "",
          todo: "showcity",
          fromwhere: "afterhit",
          obj: userlogin,
        },
      });
      userlogin.handleUI({
        data: {
          tmpId: tmpId,
          value: "",
          todo: "showemail",
          fromwhere: "afterhit",
          obj: userlogin,
        },
      });
      if (
        isSet(res.msg) &&
        ((isSet(res.message) && res.message.trim() === "ISO MisMatch".trim()) ||
          res.msg.trim() === "Unable to Create User".trim() ||
          res.msg.trim() ===
          "Please use your registered Mobile Number to Login".trim() ||
          res.msg.trim() === "Invalid mobile Number".trim() ||
          res.msg.trim() === "GLUSER creation service unavailable".trim())
      ) {
        if (
          !(ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId))
        ) {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              todo: "tryagain",
              obj: userlogin,
              msg: res.msg,
            },
          });
        }
      }
      if (
        isSet(res.msg) &&
        res.msg.toLowerCase().trim() === "user blocked for identification" &&
        res.DataCookie["iso"] === "IN"
      ) {
        this.userBlocked = 1;
        ReqObj.UserDetail["blusrdtl"] = {
          blkUsr: 1,
          blk_mb: event.data.obj.username,
          blk_iso: "91",
        };
      }
    }
  };
  
  UserLogin.prototype.updateUserDetails = function (loginflag, res, mode) {
    if (loginflag !== 3 && isSet(res.DataCookie) && res.DataCookie !== "") {
      if (
        mode === "reauth" ||
        !(isSet(res.DataCookie["usts"]) && res.DataCookie["usts"] === "2")
      ) {
        if (typeof imesh_obj !== "undefined")
          imesh_obj.set(res.DataCookie); /* to set imesh cookie */
      }
    }
    UpdateAfterLogin("fn");
    UpdateAfterLogin("em");
    UpdateAfterLogin("ctid");
    UpdateAfterLogin("mb1");
    UpdateAfterLogin("uv");
    if (
      imeshExist() !== "" &&
      usercookie.getParameterValue(imeshExist(), "ctid") === ""
    ) {
      ReqObj.UserDetail.cityname = "";
      ReqObj.UserDetail.ctoth = "";
    }
  };
  
  UserLogin.prototype.updateFlagDetails = function (loginflag, res) {
    if (loginflag === 3 || loginflag === 1) {
      ReqObj.userType = "UnIdentified";
      if (isSet(res.msg) && res.msg !== "") {
        ReqObj.loginMode =
          res.msg.trim() === "Mobile Number found in Primary Mobile".trim() ||
            res.msg.trim() === "Email found in Primary Email".trim()
            ? 4
            : res.msg.trim() ===
              "New User created via User creation service".trim()
              ? 3
              : 0;
      }
    } else if (isSet(loginflag) && loginflag !== 3 && loginflag !== 1) {
      ReqObj.userType = "Identified";
      ReqObj.loginMode = 2;
    }
  };
  UserLogin.prototype.handleEvents = function (obj, tmpId) {
    var addEvents = setInterval(function () {
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        $("#t" + tmpId + "_login_field").attr("request", 0);
        if (!isSet(validation)) createGlobalObject();
        var iso_change = currentISO();
        if (iso_change !== "IN") {
          $("#t" + tmpId + "_submit").hover(
            function () {
              ReqObj.Form[tmpId].subhover = true;
            },
            function () {
              ReqObj.Form[tmpId].subhover = false;
            }
          );
        }
        $("#t" + tmpId + "flag")
          .off("click.Validation")
          .on(
            "click.Validation",
            {
              todo: "show",
              obj: obj,
              tmpId: tmpId,
            },
            obj.handleUI
          );
  
        isSSB(tmpId)
          ? $("#t" + tmpId + "_login_field")
            .off("keyup.Validation")
            .on(
              "keyup.Validation",
              {
                todo: "removeError",
                obj: obj,
                tmpId: tmpId,
              },
              obj.handleUI
            )
          : $("#t" + tmpId + "_login_field")
            .off("focus.Validation keypress.Validation")
            .on(
              "focus.Validation keypress.Validation",
              {
                todo: "removeError",
                obj: obj,
                tmpId: tmpId,
              },
              obj.handleUI
            );
  
        if (iso_change === "IN")
          $("#t" + tmpId + "_login_field")
            .off("keypress.Validation")
            .on("keypress.Validation", validation.isNumberKey);
  
        if (tmpId.substring(0, 2) === "09")
          obj.handleUI({
            data: {
              tmpId: tmpId,
              todo: "09defaultcss",
              obj: obj,
            },
          });
  
        //var prev_key = -1;
        if (!IsChatbl(tmpId)) {
          $("#t" + tmpId + "_login_field").on("keydown", function (event) {
            if (
              event.ctrlKey === true &&
              (event.keyCode === 67 ||
                event.keyCode === 65 ||
                event.keyCode === 90)
            ) {
            } else if (
              event.keyCode === 8 ||
              (event.keyCode >= 96 && event.keyCode <= 105) ||
              (event.keyCode >= 48 && event.keyCode <= 57) ||
              (event.keyCode >= 65 && event.keyCode <= 90)
            ) {
              if (obj.classCount == 0) {
                obj.classCount = 1;
                $("#t" + tmpId + "_q_first_nm" + obj.classCount).attr(
                  "readonly",
                  false
                );
              }
              $("#t" + tmpId + "_q_first_nm" + obj.classCount).val("");
              ReqObj.CNSerCalled = false;
              obj.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "enableNameField",
                  obj: obj,
                },
              });
              obj.handleUI({
                data: {
                  tmpId: tmpId,
                  value: "",
                  todo: "showemail",
                  obj: obj,
                  task: "toempty",
                },
              });
              obj.handleUI({
                data: {
                  tmpId: tmpId,
                  value: "",
                  todo: "showmobile",
                  obj: obj,
                  task: "toempty",
                },
              });
              obj.handleUI({
                data: {
                  tmpId: tmpId,
                  value: "",
                  todo: "showcity",
                  obj: obj,
                },
              });
            }
            //prev_key = event.keyCode;
          });
          $("#t" + tmpId + "_login_field").on(
            "change",
            {
              logObject: "",
              tmpId: tmpId,
              userlogin: obj,
              blureve: true,
              todo: "blurlogin",
              iso: iso_change,
            },
            obj.sendRequest
          );
        }
        clearInterval(addEvents);
      }
    }, 200);
  };
  UserLogin.prototype.handleUI = function (event) {
    if (isSet(event)) {
      var keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode !== 13) {
        var todo = event.data.todo;
        var tmpId = event.data.tmpId;
        var obj = event.data.obj;
        if (todo === "transition") {
          if (isSet($("#t" + tmpId + "_login"))) {
            ChatblfooterAns(tmpId);
          }
        }
        if (todo === "focus") {
          $("#t" + tmpId + "_login_field").focus();
        }
        if (todo === "default") {
          IsChatbl(tmpId)
            ? setTimeout(function () {
              $("#t" + tmpId + "_login_field").focus();
            }, 1800)
            : $("#t" + tmpId + "_login_field").focus();
        }
        if (todo === "isoFlag") {
          var iso_change = currentISO();
          var toAppend = IsChatbl(tmpId) ? "_flagC" : "jsflagdiv";
          $("#t" + tmpId + "flag").removeAttr("disabled");
          var ele = $("#t" + tmpId + "flag").detach();
          $("#t" + tmpId + toAppend).prepend(ele);
          var elel = $("#t" + tmpId + "country_dropd").detach();
          $("#t" + tmpId + "country").prepend(elel);
  
          if (IsChatbl(tmpId) && $("#t" + tmpId + "_chatBL").hasClass("cbl_vh")) {
            $("#t" + tmpId + "flagdiv")
              .prepend(ele)
              .addClass("bedsnone");
          }
          if (ReqObj.isoFlag !== "" && iso_change === "IN") {
            $("#t" + tmpId + "_iso").attr("value", ReqObj.isoFlag);
          }
        } else if (todo === "removeError") {
          $("#t" + tmpId + "_msg_primary_info_err_login").addClass("bedsnone");
          $("#t" + tmpId + "_login_field").removeClass("highlight-err");
          $("#t" + tmpId + "_label-l").removeClass("redc");
          removechatblerror(tmpId);
          $(".cbl_error").removeClass("cbl_frnerr");
          if (IsChatBLInline(tmpId)) {
            $("#t" + tmpId + "mflag").removeClass("mb25");
            if (toShowTnc(tmpId)) $("#t" + tmpId + "_tCond").removeClass("bt142");
          }
          if (isSSB(tmpId)) $("#t" + tmpId + "_helpmsg").removeClass("bedsnone");
        } else if (todo === "tryagain") {
          if (isSet(event.data.msg) && event.data.msg !== "") {
            $("#t" + tmpId + "_primary_info_errmsg_login").html(event.data.msg);
            $("#t" + tmpId + "_msg_primary_info_err_login").removeClass(
              "bedsnone"
            );
            if (IsChatbl(tmpId)) {
              $(".cbl_error").addClass("cbl_frnerr");
              if (IsChatBLInline(tmpId)) {
                $("#t" + tmpId + "mflag").addClass("mb25");
                if (toShowTnc(tmpId))
                  $("#t" + tmpId + "_tCond").addClass("bt142");
              }
              addChatblError(tmpId, event.data.msg);
            }
            if (isSSB(tmpId)) $("#t" + tmpId + "_helpmsg").addClass("bedsnone");
          }
        } else if (todo === "defaultFlag3") {
          $("#t" + tmpId + "_q_first_nm" + obj.classCount)
            .removeClass("highlight-err mb-erbrd nb-erbrd")
            .siblings(".redc")
            .removeClass("redc");
          $("#t" + tmpId + "_error_first_name" + obj.classCount).addClass(
            "bedsnone"
          );
        } else if (todo === "enableNameField") {
          $("#t" + tmpId + "_q_first_nm" + obj.classCount)
            .prop("disabled", false)
            .removeClass(ssbClass("disable", tmpId));
          if (
            event.data.fromwhere === "code" ||
            event.data.fromwhere === "emptyTempName"
          )
            ReqObj.TempName = "";
        } else if (todo === "disableNameField") {
          if (isSet(event.data.value)) {
            $("#t" + tmpId + "_q_first_nm" + obj.classCount).val(
              event.data.value
            );
            $("#t" + tmpId + "_name-lb1").removeClass("redc");
            isSSB(tmpId)
              ? ""
              : $("#t" + tmpId + "_q_first_nm" + obj.classCount)
                .parents()
                .addClass("eqfcsed");
            //(isnewSSB(tmpId)) ? $("#t" + tmpId + "_q_first_nm" + obj.classCount).parents().addClass('focused') :
          }
          if (event.data.fromwhere === "afterhit") {
            ReqObj.TempName = event.data.value;
            $("#t" + tmpId + "_q_first_nm" + obj.classCount).attr(
              "disabled",
              "disabled"
            );
            isSSB(tmpId)
              ? $("#t" + tmpId + "_q_first_nm" + obj.classCount).addClass(
                ssbClass("disable", tmpId)
              )
              : "";
          }
        } else if (todo === "validationError") {
          var errormsg = event.data.errormsg;
          $("#t" + tmpId + "_primary_info_errmsg_login").html(errormsg);
          $("#t" + tmpId + "_msg_primary_info_err_login").removeClass("bedsnone");
          if (IsChatbl(tmpId)) {
            $(".cbl_error").addClass("cbl_frnerr");
            if (IsChatBLInline(tmpId)) {
              $("#t" + tmpId + "mflag").addClass("mb25");
              if (toShowTnc(tmpId)) $("#t" + tmpId + "_tCond").addClass("bt142");
            }
            addChatblError(tmpId, errormsg);
          } else $("#t" + tmpId + "_login_field").addClass("highlight-err");
          if (isSSB(tmpId)) {
            $("#t" + tmpId + "_login_field").focus();
            $("#t" + tmpId + "_helpmsg").addClass("bedsnone");
          }
          if (
            !IsChatbl(tmpId) &&
            !isSSB(tmpId) &&
            (!isOtherEnq(tmpId) ||
              (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09"))
          )
            $("#t" + tmpId + "_label-l").addClass("redc");
        } else if (todo === "09defaultcss") {
          $("#t" + tmpId + "_login_field").focus();
          if (!isOtherEnq(tmpId))
            $("#t" + tmpId + "_login_field").css({
              border: "1px solid #43bfb3 ",
              boxShadow: "1px 0px 4px #43bfb3 ",
            });
        } else if (todo === "chatblur") {
          if (event.data.fromwhere === "beforehit") {
            $("#t" + tmpId + "_login_field")
              .prop("disabled", true)
              .addClass("chatblur");
            $("#t" + tmpId + "_submit")
              .prop("disabled", true)
              .addClass("chatblur");
          } else if (event.data.fromwhere === "aftercomplete") {
            $("#t" + tmpId + "_login_field")
              .prop("disabled", false)
              .removeClass("chatblur");
            $("#t" + tmpId + "_submit")
              .prop("disabled", false)
              .removeClass("chatblur");
          }
        } else if (todo === "hideemail") {
          $("#t" + tmpId + "_q_email_in" + obj.classCount)
            .val(event.data.value)
            .prop("disabled", true)
            .addClass(ssbClass("disable", tmpId));
        } else if (todo === "hidecity") {
          isSSB(tmpId) && isnewSSB(tmpId)
            ? $("#t" + tmpId + "_q_city_oth" + obj.classCount)
              .parent()
              .addClass("cbl_vh")
            : $("#t" + tmpId + "_q_city_oth" + obj.classCount)
              .parent()
              .parent()
              .addClass("cbl_vh");
        } else if (todo === "showemail") {
          var inputval =
            event.data.task === "toempty"
              ? ""
              : isSet(event.value) && event.value !== ""
                ? event.value
                : $("#t" + tmpId + "_q_email_in" + obj.classCount).val();
          $("#t" + tmpId + "_q_email_in" + obj.classCount)
            .val(inputval)
            .prop("disabled", false)
            .removeClass(ssbClass("disable", tmpId));
        } else if (todo === "showcity") {
          isSSB(tmpId) && isnewSSB(tmpId)
            ? $("#t" + tmpId + "_q_city_oth" + obj.classCount)
              .parent()
              .removeClass("cbl_vh")
            : $("#t" + tmpId + "_q_city_oth" + obj.classCount)
              .parent()
              .parent()
              .removeClass("cbl_vh");
        } else if (todo === "hidemobile") {
          $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
            .val(event.data.value)
            .prop("disabled", true)
            .addClass(ssbClass("disable", tmpId));
          if (isEnq(tmpId))
            $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
              .parent()
              .addClass("eqfcsed");
        } else if (todo === "showmobile") {
          var inputval =
            event.data.task === "toempty"
              ? ""
              : isSet(event.value) && event.value !== ""
                ? event.value
                : $("#t" + tmpId + "_q_email_in" + obj.classCount).val();
          $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
            .val(inputval)
            .prop("disabled", false)
            .removeClass(ssbClass("disable", tmpId));
        }
      }
    }
  };
  
  
function Validation() {
    var usercookie = new UserCookie(); //hatadena
    this.result = {
      type: true,
      error: "",
    };
    this.usercountry = currentISO();
  }

function checkJunkCname(cname) {
    var junkCname = [
      /\b(no company)\b/,
      /\b(no name)\b/,
      /\b(not applicable)\b/,
      /\b(person)\b/,
      /\b(personal)\b/,
      /\b(individual)\b/,
    ];
  
    for (var x in junkCname) {
      var re = new RegExp(junkCname[x]);
      if (isSet(cname.match(re))) return true;
    }
    return false;
  }
  
  var validation = new Validation();
  var isBlEnqLoaded = true;
  var isChatBlSequenceUpdated = false;
  var ischatblnextquestionasked = false;
  var isChatWidgetOpen = false;
  // for generating event
  var FormCloseEvent = jQuery.Event("formClose");
  var OnBlEnqClose = jQuery.Event("onBLEnqClose");
  //form load event
  var ReqFormScriptLoaded = jQuery.Event("ReqFormLoaded");
  $("body").trigger(ReqFormScriptLoaded);
  
function DescMapWithId(tmpId, optionDesc, optionId) {
    ReqObj.Form[tmpId].IdMapDesc = {};
    for (i = 0; i < optionDesc.length; i++) {
      ReqObj.Form[tmpId].IdMapDesc[optionDesc[i].toLowerCase()] = optionId[i];
    }
  }
  
  function convertHtml(IsqObj, tmpId, ObjectPosition) {
    if (!isSet(ObjectPosition)) ObjectPosition = 0;
    ReqObj.Form[tmpId].questionCount += 1;
    var option_desc = IsqObj.IM_SPEC_OPTIONS_DESC
      ? IsqObj.IM_SPEC_OPTIONS_DESC.split(IsqSeperator)
      : [];
    var option_id = IsqObj.IM_SPEC_OPTIONS_ID
      ? IsqObj.IM_SPEC_OPTIONS_ID.split(IsqSeperator)
      : [];
    var IsOptionIdEmpty = isSet(option_id) && option_id.length > 0 ? true : false;
    IsqObj.IM_SPEC_MASTER_FULL_DESC =
      isSet(IsqObj.IM_SPEC_MASTER_FULL_DESC) &&
        IsqObj.IM_SPEC_MASTER_FULL_DESC !== "" &&
        IsqObj.IM_SPEC_MASTER_FULL_DESC.length > 40
        ? IsqObj.IM_SPEC_MASTER_FULL_DESC.substr(0, 60) + "..."
        : IsqObj.IM_SPEC_MASTER_FULL_DESC;
    var prefilledAns = FillIsq(IsqObj.IM_SPEC_MASTER_DESC, tmpId);
    prefilledAns = prefilledAns === null ? "" : prefilledAns;
    var type = returnIsqObjType(tmpId, IsqObj);
    switch (type) {
      case 1:
        return typeText({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 2:
        return typeRadio({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 3:
        return typeSelect({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 4:
        return typeCheckBox({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 5:
        return typeQuantity({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
              type: "qt",
            },
          },
        });
      case 6:
        return typeQuantity({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
              type: "ut",
            },
          },
        });
    }
  }
  
  function returnIsqObjType(tmpId, IsqObj) {
    if (IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity") return 5;
    else if (IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit")
      return 6;
    else return parseInt(IsqObj.IM_SPEC_MASTER_TYPE);
  }
  /*---------------------------------------return Empty Object--------------------------------------------*/
  
  function returnEmptyObject() {
    return {
      OuterWrapper: "<div>",
      beforeLabel: "",
      Label: "",
      beforeInput: "",
      UserInput: "",
      ClosingWrapper: "</div>",
    };
  }
  /* ---------------------------------------------------TYPE : text ---------------------------------------------------- */
  
  function typeText(event) {
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "TEXTBOX",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var textboxObject = returnIsqHtmlObject(event, QuestionObject);
    textboxObject["optionId"] = event.data.keys.IsOptionIdEmpty
      ? event.data.keys.option_id
      : false;
    textboxObject["inputId"] =
      event.data.tmpId.substr(0, 2) === "09" &&
        ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? "t" +
        event.data.tmpId +
        "txtbx_option" +
        ReqObj.Form[event.data.tmpId].questionCount +
        (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
        : "t" +
        event.data.tmpId +
        "txtbx_option" +
        ReqObj.Form[event.data.tmpId].questionCount;
    textboxObject["inputName"] =
      "t" +
      event.data.tmpId +
      "text_name" +
      ReqObj.Form[event.data.tmpId].questionCount;
    textboxObject["ans"] = event.data.keys.prefilledAns;
    textboxObject["placeholder"] = IsChatbl(event.data.tmpId)
      ? " Enter " + QuestionObject.questionText
      : "";
  
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
      ReqObj.Form[event.data.tmpId].isQtutShown === true &&
      textboxObject.QuestionDesc.toLowerCase() === "quantity"
    )
      return returnEmptyObject();
    ReqObj.Form[event.data.tmpId].isQtutShown =
      isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? true
        : false;
    QuestionObject.optionSelector =
      "input[name='" + textboxObject.inputName + "']";
    /* CSS related */
    textboxObject["divClass"] =
      event.data.keys.ObjectPosition > 0 && !IsChatbl(event.data.tmpId)
        ? "bepr beclr isq-st19"
        : "bepr beclr";
    textboxObject["lblClass"] = " be-lbl";
    textboxObject["inputClass"] = !IsChatbl(event.data.tmpId)
      ? isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? "be-input beisq-tbx bg-white inpt_errorbx imgoneqty"
        : isSSB(event.data.tmpId)
          ? ""
          : (isInactiveBL(event.data.tmpId)) ? "be-w50 lgcont be-input beisq-tbx bg-white inpt_errorbx cbl_br10 cpNm" : "be-input beisq-tbx bg-white inpt_errorbx"
      : "cbl_txt"; /* WARNING - Don't use imgoneqty class anywhere else */
    textboxObject["inputClass"] =
      isOtherEnq(event.data.tmpId) &&
        textboxObject.QuestionDesc.toLowerCase() !== "quantity"
        ? textboxObject["inputClass"] + " txtblng"
        : textboxObject["inputClass"];
    if (event.data.keys.ObjectPosition > 0 && IsChatbl(event.data.tmpId)) {
      textboxObject["inputClass"] = !IsChatbl(event.data.tmpId)
        ? textboxObject["inputClass"] + " be-chatW"
        : "cbl_qunty";
    }
    var descriptionHtml =
      isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? ""
        : Tooltip("text", event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC);
    var lblClass = "lbtool";
    textboxObject["lblin"] = true;
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
    ) {
      lblClass = "";
      textboxObject["lblin"] = false;
    }
    var typetextHtmlObj = {
      OuterWrapper:
        isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
          ? ""
          : "<div class='" + textboxObject.divClass + "'>",
      beforeLabel: "",
      Label: isSSB(event.data.tmpId)
        ? "<label class = '" +
        ssbClass("label", event.data.tmpId) +
        "'>" +
        textboxObject.QuestionDesc +
        "</label>"
        : "<div class='" +
        lblClass +
        "'>" +
        MakeLabel(textboxObject, descriptionHtml, event.data.tmpId) +
        "</div>",
      beforeInput: "",
      UserInput: isSSB(event.data.tmpId)
        ? isnewSSB(event.data.tmpId)
          ? TextBoxIp(textboxObject)
          : '<div class="mb-InCon">' + TextBoxIp(textboxObject) + "</div>"
        : TextBoxIp(textboxObject),
      ClosingWrapper: "</div>",
    };
    var html = "";
    html += returnContainer(
      textboxObject["inputId"],
      "_err",
      "texterr errpdg bedsnone",
      "",
      ""
    );
    html += returnContainer(
      textboxObject["inputId"],
      "_errmsg",
      "",
      "content",
      ""
    );
    html += "</div>Please enter valid input</div>";
    typetextHtmlObj["UserInput"] = typetextHtmlObj["UserInput"] + "" + html;
    //typetextHtmlObj["UserInput"] = typetextHtmlObj["UserInput"] + "</div>" + html; // isq disappear backbutton
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    return typetextHtmlObj;
  }
  /* ---------------------------------------------------TYPE : Radio ---------------------------------------------------- */
  
  function typeRadio(event) {
    ReqObj.Form[event.data.tmpId].toAppendQues = IsChatBLInline(event.data.tmpId)
      ? true
      : false;
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "RADIO",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var screen_no =
      event.data.tmpId.substr(0, 2) === "09" &&
        ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1
        : "";
    var RadioboxObject = returnIsqHtmlObject(event, QuestionObject);
    // ReqObj.Form[event?.data?.tmpId].isNewImage=="1" && (RadioboxObject["lblClass"] = " be-lbl");  js error unexpected token '.'
    isSet(ReqObj.Form[event.data.tmpId].isNewImage) &&
      ReqObj.Form[event.data.tmpId].isNewImage == "1" &&
      (RadioboxObject["lblClass"] = " be-lbl");
    var descriptionHtml = Tooltip(
      "radio",
      event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC
    );
    QuestionObject.optionSelector =
      "input[name='" +
      "t" +
      event.data.tmpId +
      "radio_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      screen_no +
      "']";
    var typeRadioHtmlObj = {
      OuterWrapper:
        isSSB(event.data.tmpId) &&
          event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers"
          ? "<div class='" + ssbClass("wrprClass", event.data.tmpId) + "'>"
          : "",
      Label: isSSB(event.data.tmpId)
        ? LabelForCheckAndRadio(
          RadioboxObject,
          descriptionHtml,
          event.data.tmpId,
          ""
        )
        : "<div class='lbtool'>" +
        LabelForCheckAndRadio(
          RadioboxObject,
          descriptionHtml,
          event.data.tmpId,
          ""
        ) +
        "</div>",
      ClosingWrapper:
        isSSB(event.data.tmpId) &&
          event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers"
          ? "</div>"
          : "",
    };
  
    typeRadioHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
      ? "<div class = 'cbl_radio'>"
      : isBlInline(event.data.tmpId)
        ? "<div class='iwChk'>"
        : isSSB(event.data.tmpId) && isnewSSB(event.data.tmpId)
          ? "<div class='nb-flex nb-aic nb-flwp nb-mt10'>"
          : "<div class=''>";
  
    if (isSet(event.data.keys.option_desc)) {
      var len = event.data.keys.option_desc.length;
      for (var i = 0; i < len; i++) {
        var indexofAns = -1;
        var optionDesc = event.data.keys.option_desc[i];
        if (isSet(optionDesc)) {
          optionDesc = trimVal(optionDesc);
        }
        if (event.data.keys.prefilledAns.length > 0) {
          //indexofAns = $.inArray(optionDesc, event.data.keys.prefilledAns); // 1 Kg and kg case mismatch issue
          var defaultResult = -1;
          var indexofAns = defaultResult;
          $.each(event.data.keys.prefilledAns, function (index, value) {
            if (
              indexofAns == defaultResult &&
              value.toLowerCase() == optionDesc.toLowerCase()
            ) {
              indexofAns = index;
            }
          });
  
          if (indexofAns !== -1)
            event.data.keys.prefilledAns.splice(indexofAns, 1);
        }
        if (
          checkdefaultIsq(
            event.data.tmpId,
            QuestionObject.questionText,
            QuestionObject.type,
            optionDesc
          )
        ) {
          indexofAns = 1;
          typeRadioHtmlObj["WrapClass"] = "dn";
        }
        if (
          optionDesc.trim().toLowerCase() === "others" ||
          optionDesc.trim().toLowerCase() === "other"
        ) {
          var cbl_br = (isInactiveBL(event.data.tmpId)) ? "cbl_br10" : "";
          var OtherObject = {
            divClass: isSSB(event.data.tmpId)
              ? "t" +
              event.data.tmpId +
              "be-radioboxtemp be-radiobox t" +
              event.data.tmpId +
              "other_radiotemp"
              : "t" +
              event.data.tmpId +
              "be-radioboxtemp be-radiobox oth_bx other_radio t" +
              event.data.tmpId +
              "other_radiotemp " + cbl_br,
            optionId: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            inputName:
              "t" +
              event.data.tmpId +
              "other_radio_name" +
              ReqObj.Form[event.data.tmpId].questionCount,
            inputId:
              "t" +
              event.data.tmpId +
              "other_radio_name" +
              ReqObj.Form[event.data.tmpId].questionCount +
              "_option" +
              (i + 1),
            ans: indexofAns === -1 ? event.data.keys.prefilledAns : "",
          };
          typeRadioHtmlObj["UserInput"] += OthersBox(
            OtherObject,
            event.data.tmpId
          );
          QuestionObject["others"].push(
            "#" +
            "t" +
            event.data.tmpId +
            "other_radio_name" +
            ReqObj.Form[event.data.tmpId].questionCount +
            "_option" +
            (i + 1)
          );
        } else {
          var RadioBoxObject = {
            option_id: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            templateId: "t" + event.data.tmpId,
            questionCount: ReqObj.Form[event.data.tmpId].questionCount,
            option_desc: event.data.keys.option_desc[i],
            i: i,
          };
          var radSubmit = IsChatBLInline(event.data.tmpId)
            ? " t" + event.data.tmpId + "_radSubmit"
            : "";
          RadioBoxObject["inputClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_btn"
            : "bevT bedblk";
          RadioBoxObject["labelClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_label CheckboxClick"
            : "bepr CheckboxClick";
          RadioBoxObject["divClass1"] =
            indexofAns !== -1
              ? "t" +
              event.data.tmpId +
              "be-radioboxtemp be-radiobox sl-box chksl be-chckbox"
              : IsChatbl(event.data.tmpId)
                ? IsChatBLInline(event.data.tmpId)
                  ? "cbl_rdon cbl_df cbl_aic cbl_ml20" + radSubmit
                  : "cbl_chekbx cbl_df cbl_aic cbl_ml20" + radSubmit
                : isSSB(event.data.tmpId)
                  ? ssbClass("radin", event.data.tmpId)
                  : (isInactiveBL(event.data.tmpId)) ? "be-chckbox cbl_br10" : "be-chckbox";
          RadioBoxObject["divClass2"] =
            indexofAns !== -1 ? "berdio-sl" : "berdio-sl bedsnone";
          RadioBoxObject["inputClass"] =
            indexofAns !== -1
              ? "eqVam bedblk radioClick waschecked"
              : isSSB(event.data.tmpId)
                ? ssbClass("radio", event.data.tmpId)
                : "eqVam bedblk radioClick";
          RadioBoxObject["checked"] = indexofAns !== -1 ? "checked" : "";
          RadioBoxObject["spanClass"] =
            indexofAns !== -1
              ? IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3 w-txt"
              : IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3";
          if (event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers") {
            RadioBoxObject["cityFunc"] = "onclick = radCheck(this)";
            if (
              indexofAns !== -1 &&
              RadioBoxObject.option_desc.toLowerCase() === "specific city"
            )
              RadioBoxObject["spanClass"] += " specCity";
          }
          typeRadioHtmlObj["UserInput"] += RadioBox(
            event.data.tmpId,
            RadioBoxObject
          );
        }
      }
    }
    typeRadioHtmlObj["UserInput"] +=
      RadioboxObject["QuestionDesc"].toLowerCase() === "why do you need this" &&
        isSSB(event.data.tmpId)
        ? "</div></div>"
        : "</div>";
    // changes for ssb (single page)
    if (isSet(OtherObject) && isSet(OtherObject["inputId"])) {
      var html = "";
      html += returnContainer(
        OtherObject["inputId"],
        "_err",
        "texterr bedsnone",
        "",
        ""
      );
      html += returnContainer(
        OtherObject["inputId"],
        "_errmsg",
        "",
        "content",
        ""
      );
      html += "</div>Please enter valid input</div>";
      typeRadioHtmlObj["UserInput"] =
        typeRadioHtmlObj["UserInput"] + "</div>" + html;
    }
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    return typeRadioHtmlObj;
  }
  
  /* ---------------------------------------------------TYPE : Select ---------------------------------------------------- */
  
  function typeSelect(event) {
    var typeSelectHtmlObj = {};
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "SELECT",
        questionText: isSet(event.data.IsqObj.IM_SPEC_MASTER_DESC)
          ? event.data.IsqObj.IM_SPEC_MASTER_DESC
          : "",
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var tmpId = event.data.tmpId;
    var selectObject = returnIsqHtmlObject(event, QuestionObject);
    selectObject["onchange"] = false;
    selectObject["optionValue"] = "Select a value";
    selectObject["selectName"] =
      "t" +
      event.data.tmpId +
      "select_name" +
      ReqObj.Form[event.data.tmpId].questionCount;
    selectObject["selectId"] =
      "t" +
      event.data.tmpId +
      "select_name" +
      ReqObj.Form[event.data.tmpId].questionCount;
    QuestionObject.optionSelector = IsChatbl(event.data.tmpId)
      ? "#t" +
      event.data.tmpId +
      "_selectDD" +
      ReqObj.Form[event.data.tmpId].questionCount
      : "select[name='" + selectObject.selectName + "']";
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
      ReqObj.Form[event.data.tmpId].isQtutShown === true &&
      selectObject.QuestionDesc.toLowerCase() === "quantity unit"
    )
      return returnEmptyObject();
  
    selectObject["divClass"] =
      currentISO() !== "IN" &&
        QuestionObject.questionText.toLowerCase() === "total order value"
        ? "bedblk bepr mr20"
        : "bedblk bepr";
    selectObject["lblClass"] = "be-lbl";
    selectObject["selectClass"] = IsChatbl(event.data.tmpId)
      ? "cbl_selct_unit _ul_select dn"
      : isSSB(event.data.tmpId)
        ? isnewSSB(tmpId)
          ? "nb-selct betextclr"
          : "mb-selct mb-w230 betextclr"
        : isBlInline(tmpId)
          ? ""
          : (isInactiveBL(event.data.tmpId)) ? "be-input bewfull betextclr cbl_br10 cpNm" : "be-input bewfull betextclr";
    selectObject["selectClass"] =
      event.data.keys.ObjectPosition > 0 &&
        IsChatbl(event.data.tmpId) &&
        !IsChatbl(event.data.tmpId)
        ? selectObject["selectClass"] + " be-chatW slt-styl"
        : selectObject["selectClass"];
    selectObject["divClass"] = !IsChatbl(event.data.tmpId)
      ? selectObject["divClass"] + " be-w50 lgcont"
      : selectObject["divClass"];
    selectObject["optionValue"] = SelBoxMSg(
      selectObject.QuestionDesc,
      event.data.tmpId
    );
    if (isBlInline(tmpId)) selectObject["divClass"] = "";
    var optionHtml = ""; //
    var selBoxPrefilled = false;
    var OtherOptionId = "";
    var OtherOptionDesc = "";
    var OtherOptionVal = "";
    var chatBlSpecificObject = {
      readonly:
        '<input type="text" value = "" readonly="" class="cbl_unit" id = "t' +
        event.data.tmpId +
        "_selectDD" +
        ReqObj.Form[event.data.tmpId].questionCount +
        '" name="select_unit" maxlength="1000" autocomplete="off" placeholder= "' +
        selectObject["optionValue"] +
        '">',
      arrow:
        "<div onclick = \"funcClick(this,'" +
        event.data.tmpId +
        "', " +
        ReqObj.Form[event.data.tmpId].questionCount +
        ' )"><svg class="cbl_arw" id = "t' +
        event.data.tmpId +
        '_select_box"><use xlink:href="#t' +
        event.data.tmpId +
        'dwnarow"></use></svg></div>',
      chatblOuterdiv:
        selectObject.QuestionDesc === "Currency"
          ? '<div class="cbl_selct cbl_pr cbl_df cbl_aic cbl_curr">'
          : '<div class="cbl_selct cbl_pr cbl_df cbl_aic">',
      chatblClosingdiv: "</div>",
    };
  
    if (isSet(event.data.keys.option_desc)) {
      var len = event.data.keys.option_desc.length;
      for (var i = 0; i < len; i++) {
        var selected = "";
        var optionDesc = isSet(event.data.keys.option_desc[i])
          ? trimVal(event.data.keys.option_desc[i])
          : "";
        var str = handleSpecialQuotes(optionDesc);
        if ($.inArray(optionDesc, event.data.keys.prefilledAns) !== -1) {
          // maps!
          selected = " selected";
          selectObject["selectClass"] += " beclr3";
          selBoxPrefilled = true;
        }
        if (
          optionDesc.toLowerCase() === "others" ||
          optionDesc.toLowerCase() === "other"
        ) {
          selectObject["onchange"] = true;
          OtherOptionVal = str;
          OtherOptionId = event.data.keys.option_id[i];
          OtherOptionDesc = event.data.keys.option_desc[i];
        } else {
          var element = IsChatbl(event.data.tmpId) ? "li" : "option";
          optionHtml += returnCustomElement(
            event.data.tmpId,
            "",
            element,
            str,
            event.data.keys.option_id[i],
            selected,
            event.data.keys.option_desc[i]
          );
        }
      }
    }
    var descriptionHtml = Tooltip("text", selectObject.questionText);
    if (
      !isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      selectObject.questionText !== ""
    ) {
      selectObject["lblClass"] + " bedbtip";
    }
    var OtherIpField = "";
    var OtherBoxAnswer = "";
    if (selectObject["onchange"]) {
      var OtherClasses = "be-slbox beisq-tbx be-othr othrwd inpt_errorbx";
      var OtherBoxAnswer =
        !selBoxPrefilled && notEmpty(event.data.keys.prefilledAns[0])
          ? event.data.keys.prefilledAns[0]
          : "";
      var OtherSelected = notEmpty(OtherBoxAnswer) ? "selected" : "";
      OtherClasses = !notEmpty(OtherBoxAnswer)
        ? OtherClasses + " bedsnone"
        : OtherClasses;
      // var OtherIpField = "<input type = 'text' id = 'other_" + "t" + event.data.tmpId + "select_name" + ReqObj.Form[event.data.tmpId].questionCount + "_1' class='" + OtherClasses + "' value ='" + OtherBoxAnswer + "'/>";
  
      var OtherIpField = isBlInline(tmpId)
        ? "<input type = 'text' id = 'other_" +
        "t" +
        event.data.tmpId +
        "select_name" +
        ReqObj.Form[event.data.tmpId].questionCount +
        "_1' class= bedsnone'" +
        OtherClasses +
        "' value ='" +
        OtherBoxAnswer +
        "'/>"
        : "<input type = 'text' id = 'other_" +
        "t" +
        event.data.tmpId +
        "select_name" +
        ReqObj.Form[event.data.tmpId].questionCount +
        "_1' class= '" +
        OtherClasses +
        "' value ='" +
        OtherBoxAnswer +
        "'/>";
      // box changes
  
      var element = IsChatbl(event.data.tmpId) ? "li" : "option";
      optionHtml += returnCustomElement(
        event.data.tmpId,
        "",
        element,
        OtherOptionVal,
        OtherOptionId,
        OtherSelected,
        OtherOptionDesc
      );
      QuestionObject["others"].push(
        "#other_" +
        "t" +
        event.data.tmpId +
        "select_name" +
        ReqObj.Form[event.data.tmpId].questionCount +
        "_1"
      );
    }
    var element = IsChatbl(event.data.tmpId) ? "ul" : "select";
    var popupChatUserInput =
      chatBlSpecificObject["chatblOuterdiv"] +
      chatBlSpecificObject["readonly"] +
      chatBlSpecificObject["arrow"] +
      "<div class='cbl_sclBr cbl_pa dn'>" +
      SelectBoxIp(selectObject, event.data.tmpId) +
      optionHtml +
      "</" +
      element +
      ">" +
      OtherIpField +
      chatBlSpecificObject["chatblClosingdiv"] +
      chatBlSpecificObject["chatblClosingdiv"];
    var lblClass = "lbtool";
    selectObject["lblin"] = true;
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
    ) {
      lblClass = "";
      selectObject["lblin"] = false;
    }
    typeSelectHtmlObj["OuterWrapper"] =
      isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
        ? ""
        : "<div class='" + selectObject.divClass + "'>";
    typeSelectHtmlObj["Label"] =
      isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
        ? MakeLabel(selectObject, descriptionHtml, event.data.tmpId)
        : "<div class='" +
        lblClass +
        "'>" +
        MakeLabel(selectObject, descriptionHtml, event.data.tmpId) +
        "</div>";
    typeSelectHtmlObj["ClosingWrapper"] = isSSB(event.data.tmpId) ? "" : "</div>";
    // typeSelectHtmlObj["UserInput"] = (IsChatbl(event.data.tmpId)) ? popupChatUserInput : SelectBoxIp(selectObject, event.data.tmpId) + optionHtml + "</" + element + ">" + OtherIpField;
    if (isBlInline(tmpId)) {
      typeSelectHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
        ? popupChatUserInput
        : SelectBoxIp(selectObject, event.data.tmpId) +
        optionHtml +
        "</" +
        element +
        ">";
    } else {
      typeSelectHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
        ? popupChatUserInput
        : SelectBoxIp(selectObject, event.data.tmpId) +
        optionHtml +
        "</" +
        element +
        ">" +
        OtherIpField;
    }
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    if (
      isSSB(event.data.tmpId) &&
      selectObject.QuestionDesc.toLowerCase() === "currency"
    ) {
      typeSelectHtmlObj["UserInput"] =
        "<div>" +
        typeSelectHtmlObj["UserInput"] +
        " <div class = 'mb-ertxt mb-mt10' id = 't" +
        event.data.tmpId +
        "_curr_err'> </div></div>";
    }
    return typeSelectHtmlObj;
  }
  /* ---------------------------------------------------TYPE : CheckBox ---------------------------------------------------- */
  
  function typeCheckBox(event) {
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "CHECKBOX",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var CheckboxObject = returnIsqHtmlObject(event, QuestionObject);
    // ReqObj.Form[event?.data?.tmpId].isNewImage=="1" && (CheckboxObject["lblClass"] = " be-lbl"); js error Unexpected token '.'
    isSet(ReqObj.Form[event.data.tmpId].isNewImage) &&
      ReqObj.Form[event.data.tmpId].isNewImage == "1" &&
      (CheckboxObject["lblClass"] = " be-lbl");
    var descriptionHtml = Tooltip(
      "check",
      event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC
    );
    var type4HtmlObj = {
      OuterWrapper: "",
      Label: isSSB(event.data.tmpId)
        ? LabelForCheckAndRadio(
          CheckboxObject,
          descriptionHtml,
          event.data.tmpId,
          ""
        )
        : "<div class='lbtool'>" +
        LabelForCheckAndRadio(
          CheckboxObject,
          descriptionHtml,
          event.data.tmpId,
          ""
        ) +
        "</div>",
      ClosingWrapper: "",
    };
    var closedivcls = isSSB(event.data.tmpId)
      ? isnewSSB(event.data.tmpId)
        ? "nb-flex nb-aic nb-flwp nb-mt10"
        : "mb-flex"
      : isBlInline(event.data.tmpId)
        ? "iwChk"
        : "bemgb15 nwDt";
    type4HtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
      ? ""
      : "<div class='" + closedivcls + "'>";
    QuestionObject.optionSelector =
      "input[name='" +
      "t" +
      event.data.tmpId +
      "checkbox_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      "']";
    type4HtmlObj["UserInput"] += !IsChatbl(event.data.tmpId)
      ? ""
      : "<div class = 'cbl_radio'>";
  
    if (isSet(event.data.keys.option_desc)) {
      for (var i = 0; i < event.data.keys.option_desc.length; i++) {
        var indexofAns = -1;
        if (event.data.keys.prefilledAns.length > 0) {
          var optionDesc = event.data.keys.option_desc[i];
          if (isSet(optionDesc)) {
            optionDesc = trimVal(optionDesc);
          }
          indexofAns = $.inArray(optionDesc, event.data.keys.prefilledAns);
          if (indexofAns !== -1)
            event.data.keys.prefilledAns.splice(indexofAns, 1);
        }
  
        if (
          event.data.keys.option_desc[i].trim().toLowerCase() === "others" ||
          event.data.keys.option_desc[i].trim().toLowerCase() === "other"
        ) {
          QuestionObject["others"].push(
            "#" +
            "t" +
            event.data.tmpId +
            "other_checkbox_name" +
            ReqObj.Form[event.data.tmpId].questionCount +
            "_option" +
            (i + 1)
          );
          var OthersBoxObject = {
            divClass: isSSB(event.data.tmpId)
              ? isnewSSB(event.data.tmpId)
                ? "nb-pr15"
                : ""
              : "be-chckbox oth_bx other_check",
            optionId: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            inputName:
              "t" +
              event.data.tmpId +
              "other_checkbox_name" +
              ReqObj.Form[event.data.tmpId].questionCount,
            inputId:
              "t" +
              event.data.tmpId +
              "other_checkbox_name" +
              ReqObj.Form[event.data.tmpId].questionCount +
              "_option" +
              (i + 1),
            ans: "",
          };
          if (indexofAns === -1)
            OthersBoxObject["ans"] = event.data.keys.prefilledAns;
          type4HtmlObj["UserInput"] += OthersBox(
            OthersBoxObject,
            event.data.tmpId
          );
        } else {
          var CheckBoxObject = {
            option_id: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            templateId: "t" + event.data.tmpId,
            questionCount: ReqObj.Form[event.data.tmpId].questionCount,
            option_desc: event.data.keys.option_desc[i],
            i: i,
          };
          CheckBoxObject["inputClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_btn"
            : "bevT bedblk";
          CheckBoxObject["labelClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_label CheckboxClick"
            : isSSB(event.data.tmpId)
              ? "CheckboxClick"
              : "bepr CheckboxClick";
  
          if (indexofAns !== -1) {
            CheckBoxObject["divClass1"] = isOtherEnq(event.data.tmpId)
              ? "be-chckbox sl-box chksl eqchkbx"
              : "be-chckbox sl-box chksl";
            CheckBoxObject["divClass2"] = "betick-sl";
            CheckBoxObject["checked"] = "checked";
            CheckBoxObject["spanClass"] =
              IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3 w-txt";
          } else {
            CheckBoxObject["divClass1"] = IsChatbl(event.data.tmpId)
              ? "cbl_chekbx cbl_df cbl_aic cbl_ml20"
              : isSSB(event.data.tmpId)
                ? isnewSSB(event.data.tmpId)
                  ? "nb-chk nb-pr nb-dib nb-pr15"
                  : "mb-chk mb-pr mb-dib"
                : isOtherEnq(event.data.tmpId)
                  ? "be-chckbox eqchkbx"
                  : (isInactiveBL(event.data.tmpId)) ? "be-chckbox cbl_br10" : "be-chckbox";
            CheckBoxObject["divClass2"] = "betick-sl bedsnone";
            CheckBoxObject["checked"] = "";
            CheckBoxObject["spanClass"] =
              IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3";
          }
          type4HtmlObj["UserInput"] += CheckBox(event.data.tmpId, CheckBoxObject);
        }
      }
    }
    type4HtmlObj["UserInput"] +=
      IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId) ? "</div>" : "";
    // changes for ssb (single page)
    if (isSet(OthersBoxObject) && isSet(OthersBoxObject["inputId"])) {
      var html = "";
      html += returnContainer(
        OthersBoxObject["inputId"],
        "_err",
        "texterr bedsnone",
        "",
        ""
      );
      html += returnContainer(
        OthersBoxObject["inputId"],
        "_errmsg",
        "",
        "content",
        ""
      );
      html += "</div>Please enter valid input</div>";
      type4HtmlObj["UserInput"] = type4HtmlObj["UserInput"] + "</div>" + html;
    }
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    return type4HtmlObj;
  }
  
/* -------------------------------------------- TYPE : Quantity & Unit ------------------------------------------------------- */

function typeQuantity(event) {
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "TEXTBOX",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    event.data.IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit"
      ? DescMapWithId(
        event.data.tmpId,
        event.data.keys.option_desc,
        event.data.keys.option_id
      )
      : "";
    if (event.data.keys.type === "ut") {
      ReqObj.Form[event.data.tmpId].qutAnswers =
        event.data.IsqObj.IM_SPEC_OPTIONS_DESC.split("##");
    }
    var firstqut =
      isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? true
        : false;
    if (
      (isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
        isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
        ReqObj.Form[event.data.tmpId].isQtutShown === true &&
        (event.data.keys.type === "ut" || event.data.keys.type === "qt")) ||
      (isSet(ReqObj.Form[event.data.tmpId].isBlQtutShown) &&
        ReqObj.Form[event.data.tmpId].isBlQtutShown)
    ) {
      event.data.tmpId.substr(0, 2) === "01" ||
        event.data.tmpId.substr(0, 2) === "04"
        ? (ReqObj.Form[event.data.tmpId].stopper += 1)
        : "";
      return returnEmptyObject();
    }
    var screen_no =
      event.data.tmpId.substr(0, 2) === "09" &&
        ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1
        : "";
    var iden_class =
      screen_no !== ""
        ? "qtut" + event.data.tmpId + "_" + screen_no
        : "qtut" + event.data.tmpId;
    var unsugg_class =
      screen_no !== ""
        ? "unsug" + event.data.tmpId + "_" + screen_no
        : "unsug" + event.data.tmpId;
  
    var brdlft = (isInactiveBL(event.data.tmpId)) ? " brdlft8" : "";
    var brdrgt = (isInactiveBL(event.data.tmpId)) ? " brdrgt8" : "";
  
    var textboxObject = {
      // to return html
      labelId:
        "t" +
        event.data.tmpId +
        "ques" +
        ReqObj.Form[event.data.tmpId].questionCount,
      questionId: QuestionObject.questionId,
      optionId: event.data.keys.IsOptionIdEmpty
        ? event.data.keys.option_id[0]
        : false,
      QuestionDesc: QuestionObject.questionText,
      inputId:
        "t" +
        event.data.tmpId +
        "txtbx_option" +
        ReqObj.Form[event.data.tmpId].questionCount +
        screen_no,
      inputName:
        "t" +
        event.data.tmpId +
        "text_name" +
        ReqObj.Form[event.data.tmpId].questionCount +
        screen_no,
      ans: event.data.keys.prefilledAns,
  
      placeholder: IsChatbl(event.data.tmpId)
        ? " Enter " + QuestionObject.questionText
        : isBlFirstfold(event.data.tmpId)
          ? QuestionObject.questionText
          : firstqut === true && event.data.keys.type === "qt"
            ? ""
            : "",
  
      // lblClass: (event.data.keys.type === "qt") ? (isSSB(event.data.tmpId)) ? ssbClass("label", event.data.tmpId) : "qt_lbl" : "",
  
      lblClass:
        event.data.keys.type === "qt"
          ? isSSB(event.data.tmpId)
            ? ssbClass("label", event.data.tmpId)
            : isBlFirstfold(event.data.tmpId)
              ? "be-lbl dn"
              : "qt_lbl"
          : "",
  
      divClass:
        event.data.keys.type === "qt" ? "bepr isq-st19" : "bedblk bepr be-w50",
      inputClass:
        event.data.keys.type === "qt"
          ? "be-input in_cus " + iden_class + brdlft
          : "be-input " + unsugg_class + " inut_cus" + brdrgt,
      maxlength: event.data.keys.type === "qt" ? "12" : "1000",
      type: event.data.keys.type,
    };
    textboxObject.inputClass +=
      IsChatbl(event.data.tmpId) && event.data.keys.type === "qt"
        ? " cbl_qtut"
        : "";
    textboxObject.ans =
      event.data.keys.type === "qt" && !isAllNumbers(textboxObject.ans[0])
        ? ""
        : textboxObject.ans;
    if (event.data.keys.type === "qt" && textboxObject.ans !== "") {
      updateQtKey(event.data.tmpId, "prefilled");
      textboxObject.ans = textboxObject.ans[0].substring(0, 12);
    }
    textboxObject["inputClass"] =
      event.data.keys.type === "qt" &&
        isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? textboxObject["inputClass"] + " imgoneqty"
        : textboxObject["inputClass"];
    QuestionObject.optionSelector =
      "input[name='" + textboxObject.inputName + "']";
    var addvalue = event.data.keys.type === "ut" ? true : false;
    if (event.data.IsqObj.IM_CAT_SPEC_CATEGORY_TYPE === "2") addvalue = false;
    textboxObject["optionId"] =
      addvalue && isSet(textboxObject.ans) && textboxObject.ans != ""
        ? getOptionId(event.data.tmpId, textboxObject.ans[0])
        : textboxObject["optionId"];
    var error_div =
      event.data.keys.type === "qt"
        ? screen_no !== ""
          ? '<div id="t' +
          event.data.tmpId +
          "_" +
          screen_no +
          '_validinev"' +
          screen_no +
          ' class="bedsnone" value=""></div>'
          : '<div id="t' +
          event.data.tmpId +
          '_validinev"' +
          screen_no +
          ' class="bedsnone" value=""></div>'
        : "";
    var typetextHtmlObj = {
      OuterWrapper: "<div class='" + textboxObject.divClass + "'>",
      beforeLabel: "",
      Label: "",
      beforeInput: "",
      UserInput: TextBoxIp(textboxObject, false, addvalue),
      ClosingWrapper: "</div>",
      qtuttype: event.data.keys.type === "ut" ? 6 : 5,
      error_div: error_div,
      label_div:
        firstqut === true
          ? ""
          : "<label id='" +
          textboxObject.labelId +
          "' class='" +
          textboxObject.lblClass +
          "'>" +
          textboxObject.QuestionDesc +
          "</label>",
    };
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    ReqObj.Form[event.data.tmpId].isQtutShown =
      event.data.keys.type === "ut" &&
        isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? true
        : ReqObj.Form[event.data.tmpId].isQtutShown;
    ReqObj.Form[event.data.tmpId].qtUtQuesPresent = true;
    if (
      (isBlInline(event.data.tmpId) || isBlFirstfold(event.data.tmpId)) &&
      event.data.keys.type === "ut"
    )
      ReqObj.Form[event.data.tmpId].isBlQtutShown = true;
    return typetextHtmlObj;
  }

/*--------------------------------------------------------------------------------------------------------------------- */
/*----------- City Suggester for location ISQ  -------------*/
function citySugg(tmpId, id) {
    var iso = currentISO();
    if (typeof Suggester === "undefined") {
      setTimeout(function () {
        citySugg(tmpId);
      }, 50);
    } else {
      if (typeof Suggester !== "undefined") {
        var CitySuggSuffix = "_citySugg";
        var row_num = BlAutoSuggRowNum(tmpId);
        var autocompleteClass = SetAutoCompleteClass(tmpId, CitySuggSuffix);
        if (IsChatBLInline(tmpId)) autocompleteClass += " smChtSg";
        main_city_sugg = new Suggester({
          element: id,
          onSelect: "",
          type: "city",
          fields: "std,state,id,stateid",
          minStringLengthToDisplaySuggestion: 1,
          rowsToDisplay: row_num,
          autocompleteClass: autocompleteClass,
          displayFields: "value,state",
          displaySeparator: " >> ",
          filters: "iso:" + iso,
          recentData: false,
          rowsToDisplay: IsChatBLInline(tmpId) ? 3 : "",
        });
      }
    }
  }
  function returnIsqQuestionObject(event) {
    return {
      type: event.data.type,
      questionText: event.data.questionText,
      questionId: event.data.questionId,
      optionSelector: event.data.optionSelector,
      others: event.data.others,
    };
  }
  
  function returnIsqHtmlObject(event, QuestionObject) {
    return {
      labelId:
        "t" +
        event.data.tmpId +
        "ques" +
        ReqObj.Form[event.data.tmpId].questionCount,
      questionId: QuestionObject.questionId,
      QuestionDesc: QuestionObject.questionText,
      type: QuestionObject.type,
    };
  }
  
  function handleSpecialQuotes(str) {
    if (typeof str !== "undefined" && str !== "") {
      if (str.indexOf("'") > 0) {
        str = str.replace(/'/g, "&#39");
      } else if (str.indexOf('"') > 0) {
        str = str.replace(/"/g, "&quot");
      }
      return str;
    }
    return "";
  }
  
  var webAddressLocation = location.hostname;
  var appsServerName = webAddressLocation.match(/^dev/)
    ? "//dev-apps.imimg.com/"
    : webAddressLocation.match(/^stg/)
      ? "//stg-apps.imimg.com/"
      : "//apps.imimg.com/"; 

  
  function isFirstImgVidCTA(tmpId) {
    return isImageVidEnq(tmpId) &&
      ((ReqObj.Form[tmpId].FormSequence.StepCounter < 1 && imeshExist() === "") ||
        (Enq09(tmpId) &&
          imeshExist() &&
          NEC() &&
          ReqObj.Form[tmpId].FormSequence._stepCounter < 1))
      ? true
      : false;
  }
  function isFirstImgVidCTAFR(tmpId) {
    return isImageVidEnq(tmpId) &&
      ReqObj.Form[tmpId].FormSequence.StepCounter < 1 &&
      (imeshExist() === "" || currentISO() !== "IN")
      ? true
      : false;
  }
  
  function returnSubmitInnerHtml(tmpId) {
    var html = returnContainer(
      "t" + tmpId,
      "_fBtn",
      "bepr eqClearfx",
      "",
      "",
      ""
    );
    html +=
      "<div class='backdiv bedsnone' id='t" +
      tmpId +
      "_backdiv'><input value='' class='be-backbtn' id='t" +
      tmpId +
      "_be-backbtn' type='submit'><div id='t" +
      tmpId +
      "_backarr'></div></div><div class='' id='t" +
      tmpId +
      "_submitdiv'><input value='Next' class='form-btn' id='t" +
      tmpId +
      "_submit' type='submit' style='background-color: #00a699'></div>";
    html += "</div>";
  
    if (isInactiveBL(tmpId)) {
      $("#t" + tmpId, "_fBtn").css({
        "margin-right": "25%",
      });
    }
    return html;
  }
  
  function getMcatImage(tmpId, cbObj, left) {
    if (
      isSet(tmpId) && isSet(ReqObj) && isSet(ReqObj.Form) &&
      isSet(ReqObj.Form[tmpId]) &&
      isSet(ReqObj.Form[tmpId].formType)
    ) {
      if (
        isSet(ReqObj.Form[tmpId].mcatId) &&
        parseInt(ReqObj.Form[tmpId].mcatId) > -1 &&
        isSet(modIdf) &&
        modIdf !== -1 &&
        modIdf !== ""
      ) {
        $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
        ReqObj.Form[tmpId].displayImage =
          isSet(ReqObj.Form[tmpId].displayImage) &&
            ReqObj.Form[tmpId].displayImage === ""
            ? ""
            : ReqObj.Form[tmpId].displayImage;
        ReqObj.Form[tmpId].zoomImage = "";
        ReqObj.mcatImage = "";
        ReqObj.mcatdtl.ping = true;
        fireAjaxRequest({
          data: {
            ga: {
              s: false,
              f: true,
              gatype: "McatDtl",
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
            ajaxtimeout: 3000,
            ajaxdata: {
              modid: modIdf,
              mcatid: parseInt(ReqObj.Form[tmpId].mcatId),
            },
            hitfinserv: "",
            type: 9,
            key: {
              cbObj: cbObj,
              left: left,
            },
          },
        });
      }
    }
  }
  
  function ShowOtp(tmpId) {
    var imeshcookie = imeshExist();
    if (
      imeshcookie &&
      usercookie.getParameterValue(imeshcookie, "uv") !== "V" &&
      usercookie.getParameterValue(imeshcookie, "iso") === "IN"
    )
      return true;
    else return false;
  }
  function toAddSkipOtp(tmpId, message) {
    return checkblockedUser()
      ? false
      : (isEnq(tmpId) &&
        (isSecondEnq() === false || (message === "" && isSecondEnq()))) ||
        (isBl(tmpId) &&
          (isSecondBl() === false || (message === "" && isSecondBl())))
        ? true
        : false;
  }
  
function ObjectTrim(object) {
    var trimmedObject = {};
    for (var key in object) {
      if (typeof object[key] === "string") object[key] = object[key].trim();
      if (object[key] !== "") trimmedObject[key] = object[key];
    }
    return trimmedObject;
  }
  
/*
 * maybe class not required
 * Class     : LoginFlag
 * Usage     : returns the login flag.
 *
 * @function : returnLoginFlag - returns the login flag
 */
function LoginFlag() { }
LoginFlag.prototype.returnLoginFlag = function (todo) {
  if (todo === "glusrupdate" && todo !== "") return 2;
  if (todo === "verifyusr" && todo !== "") return 5;
  if (todo === "login" && todo !== "") return 1;
  if (todo === "blurlogin" && todo !== "") return 3;
};

/*
 * Class     : LoginMode
 * Usage     : returns the login mode
 *
 * @function : cookies      - read required cookies
 * @function : getLoginMode - return login mode
 */
function LoginMode() { }
LoginMode.prototype.getLoginMode = function () {
  var v4iilexCookie = usercookie.getCookie("v4iilex");
  var imissCookie = usercookie.getCookie("im_iss");
  var imEqGlCookie = usercookie.getCookie("imEqGl");
  var imeshCookie = imeshExist();
  var loginmode = 0;
  if (imeshCookie === "" && v4iilexCookie !== "") {
    usercookie.deleteCookie("v4iilex"); /* */
    v4iilexCookie = "";
  }
  if (imeshCookie === "" && imEqGlCookie !== "") {
    /* logout kiya user ne and for mozilla*/
    usercookie.deleteCookie("imEqGl");
  }

  if (isSet(imissCookie) && imissCookie !== "") {
    /* when v4iilex cookie is set */
    loginmode = 1;
  } else if (isSet(imeshCookie) && imeshCookie !== "") {
    /* when imesh cookie is set */
    loginmode = 2;
  } else loginmode = 3; //new user /* nothing is set */

  return loginmode;
};
/*
 * Usage : to check for European Countries
 *
 */

// function isEuroCountry(country_iso) {
//   var len = isSet(global_euroArr) ? global_euroArr.length : 0;
//   for (var i = 0; i < len; i++) {
//     if (global_euroArr[i] === country_iso)
//       return true;
//   }
//   return false;
// }
/*
 * Usage :
 */
function isSet(checkVar) {
  return typeof checkVar !== "undefined" && checkVar !== null ? true : false;
}
/*
 * Usage : To move to next fieldbfbfdbdfbdbd
 */
function movetoNext(event) {
  var tmpId = event.data.tmpId;
  if ($("#t" + tmpId + event.data.param1).val() !== "") {
    $("#t" + tmpId + event.data.param2).focus();
  }
}
/*
 * Usage : To move to previous field
 */
function movetoPrevious(event) {
  var tmpId = event.data.tmpId;
  if (event.keyCode == 8) {
    if ($("#t" + tmpId + event.data.param1).val() === "") {
      $("#t" + tmpId + event.data.param2).focus();
      $("#t" + tmpId + event.data.param2).html("");
    }
  }
}
/*
 * Usage : String to Key,Value pairs
 */
function stringToObject(query, seperator) /* a or b required ? */ {
  var query_arr = query.split(seperator);
  var len = isSet(query_arr) ? query_arr.length : 0;
  var obj = {};
  for (var i = 0; i < len; i++) {
    var sub_query_arr = query_arr[i].split("=");
    obj[sub_query_arr[0]] = sub_query_arr[1];
  }
  return obj;
}

/*
 *  Change and check tracking
 */

function MakeRefText(tmpId) {
  ReqObj.Form[tmpId].refText =
    "ctaName=" +
    (isSet(ReqObj.Form[tmpId].ctaName) ? ReqObj.Form[tmpId].ctaName : "");
  ReqObj.Form[tmpId].refText +=
    "|ctaType=" +
    (isSet(ReqObj.Form[tmpId].ctaType) ? ReqObj.Form[tmpId].ctaType : "");
  ReqObj.Form[tmpId].refText +=
    "|PT=" +
    (isSet(ReqObj.Form[tmpId].pageType) ? ReqObj.Form[tmpId].pageType : "");
  ReqObj.Form[tmpId].refText +=
    "|Section=" +
    (isSet(ReqObj.Form[tmpId].section) ? ReqObj.Form[tmpId].section : "");
  ReqObj.Form[tmpId].refText +=
    "|Position=" +
    (isSet(ReqObj.Form[tmpId].position) ? ReqObj.Form[tmpId].position : "");
  ReqObj.Form[tmpId].refText +=
    "|ScriptVer=" +
    (isSet(ReqObj.Form[tmpId].scriptVersion)
      ? ReqObj.Form[tmpId].scriptVersion
      : "");
  ReqObj.Form[tmpId].refText +=
    "|compRank=" +
    (isSet(ReqObj.Form[tmpId].FCPRank) ? ReqObj.Form[tmpId].FCPRank : "");
  ReqObj.Form[tmpId].refText +=
    "|searchTerm=" +
    (isSet(ReqObj.Form[tmpId].mcatName) ? ReqObj.Form[tmpId].mcatName : "");
}

function imInvokeRequestForGaCode(tmpId, eventAction) {
  //<!--google analytics async code start-->
  // var script = trackScript;
  // _gaq.push(['_trackPageview', script]);
  //<!--google analytics async code end-->
  // if(ReqObj.Form[tmpId].toFireGaTracking === true){
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var imeshcookie = imeshExist();

  var virtualPageURL =
    "/cgi/" +
    modIdf +
    "/" +
    form_type +
    "/" +
    getEventLabel();
  virtualPageURL += imeshcookie === "" ? "-new.mp" : ".mp";

  imgtm.push({
    event: "VirtualPageview",
    virtualPageURL: virtualPageURL,
    virtualPageTitle: "Send Enquiry -" + eventAction,
    CD_Additional_Data: ReqObj.Form[tmpId].refText,
  });
  ReqObj.Form[tmpId].pvTrackingFired = true;
  // }
}
//inactive changes
// isinteraactive==1 -> not interactive
// isinteraactive==0 ->  interactive

function blenqGATracking(eventCategory, eventAction, eventLabel, isinteraactive, tmpId) {
  if (isSet(ReqObj.Form[tmpId]) && (ReqObj.Form[tmpId].toFireGaTracking === true || ReqObj.Form[tmpId].noSampling === true || isinteraactive === 1 || ReqObj.Form[tmpId].inactiveBL)) {
    var event_type = isinteraactive === 0 ? "IMEvent" : "IMEvent-NI";
    if (glmodid == "PRODDTL" && eventAction == "Redirect:ProductUrl") event_type = "IMEvent";
    var modid = eventCategory === "iploc" ? glmodid : modIdf;
    var CD_Additional_Data = tmpId === 0 ? modid : modid + "-" + ReqObj.Form[tmpId].refText;
    eventLabel = ReqObj.seller_cta && (ReqObj.su_cta == 0 || ReqObj.su_cta == 1) ? eventLabel + " |SA" : eventLabel;

    //_gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, 0, true]);
    imgtm.push({
      event: event_type,
      eventCategory: eventCategory,
      eventAction: eventAction,
      eventLabel: eventLabel,
      CD_Additional_Data: CD_Additional_Data,
    });
  }
}

function blenqGATrackingMisc(eventCategory, eventAction, eventLabel, isinteraactive, tmpId, refText) {
  // ReqObj.Form[tmpId].modId,  ReqObj.Form[tmpId].form_type
  var event_type = isinteraactive === 0 ? "IMEvent" : "IMEvent-NI";
  var modid = glmodid;
  var CD_Additional_Data = modid + "-" + refText;
  //_gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, 0, true]);
  imgtm.push({
    event: event_type,
    eventCategory: eventCategory,
    eventAction: eventAction,
    eventLabel: eventLabel,
    CD_Additional_Data: CD_Additional_Data,
  });
}

function labelNEC(iso) {
  var nec = "";
  if(isSet(ReqObj) && isSet(ReqObj.UserDetail)){
  if (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "") nec += "N";
  if (iso === "IN") {
    if (ReqObj.UserDetail.em !== "") nec += "E";
    if (ReqObj.UserDetail.ctid !== "") nec += "C";
    if (nec === "") nec = "NO-NEC";
  } else {
    if (ReqObj.UserDetail.mb1 !== "") nec += "M";
    if (nec === "") nec = "NO-NM";
  }
}
  return nec;
}

/* no idea about this */
function ServiceGATrack(TracName, TracEvent, FileName) {
    if (isSet(_gaq)) {
      _gaq.push(["_trackEvent", TracName, TracEvent, FileName, 0, true]);
    }
  }
  
  function addTemplates(templateid, template_array) {
    if ($.inArray(templateid, template_array) === -1) {
      template_array.push(templateid);
    }
  }
  
  function UpdateAfterLogin(key) {
    if (usercookie.getParameterValue(imeshExist(), key) !== "") {
      ReqObj.UserDetail[key] = setDetail(key);
    }
  }
  
  function isGDPRCountry() {
    var GdprCountries = [
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
    if ($.inArray(currentISO(), GdprCountries) !== -1) return true;
    return false;
  }
  /*--------------------To show Tnc-------------------- */
  function toShowTnc(tmpId) {
    if (imeshExist() === "") {
      return isGDPRCountry() === true ? true : false;
    }
    return false;
  }
  /*--------------------Hov - onSubmit Tnc-------------------- */
  function onHovSub(tmpId) {
    var isGDPR = isGDPRCountry();
    if (currentISO() !== "IN") {
      if (isGDPR === true) {
        isSet(ReqObj.Form[tmpId].IsCheckboxChecked) &&
          ReqObj.Form[tmpId].IsCheckboxChecked === true
          ? $("#t" + tmpId + "_submit").addClass("hovsub")
          : $("#t" + tmpId + "_submit").removeClass("hovsub");
      } else $("#t" + tmpId + "_submit").addClass("hovsub");
    } else $("#t" + tmpId + "_submit").addClass("hovsub");
  }
  /*--------------------Checked Tnc-------------------- */
  function checkedTNC(tmpId) {
    if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
      if ($("#t" + tmpId + "_tCondCheckBox").prop("checked")) {
        ReqObj.Form[tmpId].IsCheckboxChecked = true;
        $("#t" + tmpId + "_error_tCond")
          .text("Please agree to the terms and conditions")
          .addClass("bedsnone");
        submitTncUI(tmpId, 1);
      } else {
        ReqObj.Form[tmpId].IsCheckboxChecked = false;
        submitTncUI(tmpId, 0);
      }
      onHovSub(tmpId);
    }
  }
  /*--------------------To show or hide-------------------- */
  function ShowHideTNC(tmpId) {
    toShowTnc() === true ? ShowTncBox(tmpId) : HideTncBox(tmpId);
  }
  /*--------------------To show-------------------- */
  function ShowTncBox(tmpId) {
    if (IsChatBLInline(tmpId)) {
      if (toShowTnc(tmpId) && $("#t" + tmpId + "verify_error").is(":visible"))
        $("#t" + tmpId + "_tCond").addClass("bt142");
    }
    $("#t" + tmpId + "_tCond").removeClass("bedsnone");
    if (Enq09(tmpId)) {
      $("#t" + tmpId + "_tCond").addClass("pd_b");
      if (direnqImage(tmpId)) {
        $("#t" + tmpId + "_tCond").addClass("pdtop");
      }
  
    }
    if (Bl01(tmpId)) $("#t" + tmpId + "_tCond").addClass("bemb5");
    $("#t" + tmpId + "_tCondCheckBox").prop("checked", false);
    if (isBlInlineFr(tmpId)) {
      $("#t" + tmpId + "_tCond").addClass("mar_bemb");
      $("#t" + tmpId + "_tCond").removeClass("bemt10");
    }
    submitTncUI(tmpId, 0);
  }
  /*--------------------To hide-------------------- */
  function HideTncBox(tmpId) {
    $("#t" + tmpId + "_tCond").addClass("bedsnone");
    $("#t" + tmpId + "_tCondCheckBox").prop("checked", true);
    submitTncUI(tmpId, 1);
  }
  /*--------------------UI- show/hide-------------------- */
  function submitTncUI(tmpId, todo) {
    var dv = isEcomProduct(tmpId) ? false : todo === 0 ? true : false;
    var dc = isEcomProduct(tmpId)
      ? "#00a699"
      : todo === 0
        ? "#b2b2b2"
        : "#00a699";
    $("#t" + tmpId + "_submit").prop("disabled", dv);
    if (isImageVidEnq(tmpId)) {
      isEcomProduct(tmpId)
        ? $("#t" + tmpId + "_submit").removeAttr("style")
        : todo === 0
          ? $("#t" + tmpId + "_submit")
            .prop("disabled", dv)
            .attr("style", "background:" + dc + "; box-shadow:none")
          : $("#t" + tmpId + "_submit").removeAttr("style");
    } else if (!IsChatbl(tmpId))
      (isSSB(tmpId) || (isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01")) && !dv
        ? $("#t" + tmpId + "_submit")
          .prop("disabled", false)
          .attr("style", "")
        : $("#t" + tmpId + "_submit")
          .prop("disabled", false)
          .css("background-color", dc);
    else {
      if (todo === 1) $(".cbl_sbmt_btn").removeClass("cbl_dsbl");
      else {
        $(".cbl_error").addClass("cbl_frnerr"); // popup
        $(".cbl_sbmt_btn").addClass("cbl_dsbl");
      }
    }
  }
  
  function toShowOtpFlagCondition(tmpId) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" || IsChatbl(tmpId)) {
      return (
        isSet(ReqObj.Form[tmpId].toShowOtpStepbl) &&
        ReqObj.Form[tmpId].toShowOtpStepbl !== false
      );
    } else if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
      return (
        isSet(ReqObj.Form[tmpId].toShowOtpStepenq) &&
        ReqObj.Form[tmpId].toShowOtpStepenq !== false
      );
    }
  }
  
  function disableEnquiryButton(tmpId) {
    if (typeof ReqObj.Form[tmpId].enqSentCallBack === "function") {
      var value =
        isSet(ReqObj.Form[tmpId].enquiryDivID) &&
          ReqObj.Form[tmpId].enquiryDivID !== ""
          ? ReqObj.Form[tmpId].enquiryDivID
          : "dispid" + ReqObj.Form[tmpId].pDispId;
  
      var passVal = ReturntoProp(tmpId);
      ReqObj.Form[tmpId].enqSentCallBack(passVal);
    }
  }
  
  function appendImEqGlCookie(tmpId, createstep) {
    if (isSet(tmpId)) {
      ReqObj.Form[tmpId].toShowOtpStep =
        isSet(createstep) && createstep === "firsttimecreation" ? false : true;
      var value = "";
      if (
        isSet(ReqObj.Form[tmpId].formType) &&
        ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
      ) {
        value =
          isSet(ReqObj.Form[tmpId].enquiryDivID) &&
            ReqObj.Form[tmpId].enquiryDivID !== ""
            ? ReqObj.Form[tmpId].enquiryDivID
            : "dispid" + ReqObj.Form[tmpId].pDispId;
      } else {
        value = "BL" + usercookie.getParameterValue(imeshExist(), "glid");
      }
  
      if (isSet(value) && value !== "") {
        var imEqGlCookie = usercookie.getCookie("imEqGl");
        var len = usercookie.getCookie("imEqGl").length;
        if (len === 0) {
          usercookie.setCookie("imEqGl", value, "1", modIdf);
        } else {
          if (imEqGlCookie.substring(0, len - 2) === ",") {
            value = imEqGlCookie + value + ",";
          } else {
            value = imEqGlCookie + "," + value;
          }
  
          usercookie.setCookie("imEqGl", value, "1", modIdf);
        }
      }
      return value;
    }
    return "";
  }
  
  function RemoveValFromImEqGl(val) {
    if (isSet(val) && val !== "") {
      var imEqgl = usercookie.getCookie("imEqGl");
      if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
        var arr = imEqgl.split(",");
        for (var s = arr.length - 1; s >= 0; s--) {
          if (isSet(arr[s])) {
            if (arr[s] === val) arr.splice(s, 1);
          }
        }
      }
    }
  }
  
  function toShowBuyerInfo(tmpId, screen_name) {
    if (
      imeshExist() !== "" && 
      !isInactiveBL(tmpId) &&
      !pdpenqImage(tmpId) &&
      screen_name.toLowerCase() !== "userverification" &&
      screen_name.toLowerCase() !== "thankyou"
    ) {
      $("#t" + tmpId + "_byrinfo")
        .html(get_buyer_info(tmpId))
        .removeClass("bedsnone");
    } else {
      $("#t" + tmpId + "_byrinfo")
        .html(get_buyer_info(tmpId))
        .addClass("bedsnone");
    }
    // Not found BL
    if (Bl04(tmpId) && imeshExist() !== "")
      $("#t" + tmpId + "_byrinfoIn")
        .html(get_buyer_info(tmpId))
        .removeClass("bedsnone");
  }
  
  function get_buyer_info(tmpId) {
    var details = "";
    var imeshcookie = imeshExist();
    if (imeshcookie === "") return "";
    var sections = {};
    sections["main"] = "Your Contact Information :";
    sections["buyername"] =
      isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail["fn"] !== ""
        ? ReqObj.UserDetail["fn"]
        : "";
    sections["buyermobile"] =
      isSet(ReqObj.UserDetail["mb1"]) && ReqObj.UserDetail["mb1"] !== ""
        ? "+" +
        usercookie.getParameterValue(imeshcookie, "phcc") +
        "-" +
        ReqObj.UserDetail["mb1"]
        : "";
    sections["buyeremail"] =
      isSet(ReqObj.UserDetail["em"]) && ReqObj.UserDetail["em"] !== ""
        ? ReqObj.UserDetail["em"]
        : "";
    var cls = isImageVidEnq(tmpId) ? "epUstxt" : "";
    var details = "<b class='" + cls + "'>" + sections["main"] + "</b><br/>";
    if (sections["buyername"] !== "") {
      details += sections["buyername"];
      details += pdpenqImage(tmpId)
        ? returnSpan("", "", "   |   ", "befwt", "")
        : "</br>";
    }
    if (isOtherEnq(tmpId)) {
      if (sections["buyermobile"] !== "" && sections["buyeremail"] !== "") {
        details +=
          sections["buyermobile"] +
          returnSpan("", "", "   |   ", "befwt", "") +
          sections["buyeremail"];
      } else if (sections["buyermobile"] !== "") {
        details += sections["buyermobile"];
      } else if (sections["buyeremail"] !== "") {
        details += sections["buyeremail"];
      }
    } else {
      if (sections["buyermobile"] !== "") {
        details += sections["buyermobile"] + "</br>";
      }
      if (sections["buyeremail"] !== "") {
        details += sections["buyeremail"] + "</br>";
      }
    }
  
    if (
      sections["buyername"] === "" &&
      sections["buyermobile"] === "" &&
      sections["buyeremail"] === ""
    )
      return "";
  
    if (details !== "" && !isInactiveBL(tmpId)) {
      $("#t" + tmpId + "_leftR").addClass("btPd");
    }
    return details;
  }
  
  function ReturntoProp(tmpId) {
    var returnValue = JSON.parse(JSON.stringify(ReqObj.Original[tmpId]));
    returnValue.IsqArray = ReqObj.Form[tmpId].IsqArray;
    returnValue.displayImage = ReqObj.Form[tmpId].displayImage;
    returnValue.prodName = ReqObj.Form[tmpId].prodName;
    returnValue.generationId = ReqObj.Form[tmpId].generationId;
    returnValue.mcatName = ReqObj.Form[tmpId].mcatName;
    return returnValue;
  }
  
  function changeProd(event) {
    if (isSet(event) && isSet(event.data)) {
      ReqObj.changeProdClick = true;
      var tmpId = event.data.tmpId;
      var todo = event.data.todo;
      if (imeshExist() === "") {
        addDetachedFlag();
        //detachFlag2(tmpId);
      }
      $(".be-prdimg").children("img").attr("src", "");
      if (todo === "prev" && isSet(ReqObj.Form[tmpId].prev)) {
        ReqObj.ImageVideoIsqSeq = false;
        var returnObj = ReturntoProp(tmpId);
        ReqObj.Form[tmpId].prev(returnObj);
      } else if (todo === "next" && isSet(ReqObj.Form[tmpId].next)) {
        ReqObj.ImageVideoIsqSeq = false;
        var returnObj = ReturntoProp(tmpId);
        ReqObj.Form[tmpId].next(returnObj);
      }
    }
  }
  
  function BlEnqGenerated(tmpId) {
    if (
      isSet(tmpId) &&
      isSet(ReqObj.Form[tmpId].generationId) &&
      parseInt(ReqObj.Form[tmpId].generationId) > 1
    )
      return true;
    else return false;
  }
  
  function ShowProdName(tmpId) {
    if (
      ReqObj.Form[tmpId].modrefType.toLowerCase() === "product" &&
      !BlEnqGenerated(tmpId) &&
      (ReqObj.Form[tmpId].prodName === "" ||
        (ReqObj.Form[tmpId].prodName === "" && IsChatbl(tmpId)) ||
        (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
          (tmpId.substring(0, 2) === "09" || tmpId.substring(0, 2) === "04")) ||
        (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
          (tmpId.substring(0, 2) === "04" || tmpId.substring(0, 2) === "01")))
    ) {
      ReqObj.Form[tmpId].flags.WasProdNamePresent = true;
      ReqObj.Form[tmpId].isproductshown = true;
      return true; //
    } else {
      return ReqObj.Form[tmpId].flags.WasProdNamePresent;
    }
  }
    
function isProdNamePresent(tmpId) {
    return ReqObj.Form[tmpId].modrefType.toLowerCase() === "product" &&
      ReqObj.Form[tmpId].prodName !== ""
      ? true
      : false;
  }
  
  //improve logic for this function
  function ShowReqBox(tmpId) {
    if (
      isBlInline(tmpId) &&
      currentISO() !== "IN" &&
      isNewInlineBl(tmpId) &&
      showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)
    ) {
      return false;
    }
    if (
      isBlInline(tmpId) &&
      currentISO() !== "IN" &&
      isNewInlineBl(tmpId) &&
      !showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)
    ) {
      return true;
    }
    if (isBlInline(tmpId) && isNewInlineBl(tmpId)) return false;
    if (ReqObj.Form[tmpId].flags.isDescDivShown === true) return false;
    else return true;
  }
  
  function GetPopUpHtml(tmpId) {
    loadOverlay();
    var regex = /0901/gi;
    return ReqObj.OverlayHtml.replace(regex, tmpId);
  }
  
  function loadOverlay() {
    if (
      isSet($("#t0901_bewrapper").html()) &&
      $("#t0901_bewrapper").html() !== ""
    ) {
      ReqObj.OverlayHtml = $("#t0901_bewrapper").html();
    }
  }
  /*-----------------new proposed seq---------------------- */
  function _makeExtraKey(_classArray, _fallback) {
    var extraKey = {};
    var count = 0;
    for (var ele in _classArray) {
      count += 1;
      extraKey[count] = _extraKey(_classArray[ele], _fallback);
    }
    return extraKey;
  }
  function _extraKey(_className, _fallback) {
    switch (
    _className.toString().toLowerCase() // tr : toReplace, is:Service, hf:hasFallback, fObj : fallbackObj
    ) {
      case "enquirenow":
        return { tr: false, is: false, hf: true, fobj: null };
      case "userlogin":
        return { tr: true, is: false, hf: false, fobj: null };
      case "contactdetail":
        return { tr: false, is: false, hf: false, fobj: null };
      case "userverification":
        return { tr: false, is: false, hf: false, fobj: null };
      case "isq":
        return { tr: false, is: false, hf: true, fobj: _fallback };
      case "requirementdtl":
        return { tr: true, is: false, hf: false, fobj: null };
      case "moredetails":
        return { tr: true, is: false, hf: false, fobj: null };
      case "thankyou":
        return { tr: false, is: false, hf: false, fobj: null };
      case "productname":
        return { tr: true, is: false, hf: false, fobj: null };
      case "blstaticques":
        return { tr: true, is: false, hf: false, fobj: null };
    }
  }
  
  function _makeDataAndServiceArr(_classArray, attribute, type) {
    var array = {};
    var count = 0;
    for (var ele in _classArray) {
      count += 1;
      array[count] =
        type === 1 ||
          (type === 2 &&
            isSet(_classArray[ele]) &&
            _classArray[ele].toString().toLowerCase() === "contactdetail")
          ? attribute
          : [];
    }
    return array;
  }
/**-------------------new seq----------------------------- */
function _mandatDetailsFilled() {
    var ct = ReqObj.UserDetail.ctid || ReqObj.UserDetail.cityname || ReqObj.UserDetail.ctoth ? true : false;
    return ct === true && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn ? true : false; // if city and name not present return true else false
  }
  function userCity() {
    if (ReqObj.UserDetail.ctid === "" && ReqObj.UserDetail.cityname === "" && ReqObj.UserDetail.ctoth === "")
      return "";
    else return "notEmpty";
  }
  function _contactScreen(iso) {
    if (iso === "IN") {
      var ct = userCity();
      return (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "") || ReqObj.UserDetail.em === "" || ct === "" ? true : false;
    } else {
      return (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "") || ReqObj.UserDetail.mb1 === "" ? true : false;
    }
  }
  
/**-------------------new seq----------------------------- */
function NEC() {
    if (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn) {
      if (currentISO() === "IN") {
        if (ReqObj.UserDetail.em && (ReqObj.UserDetail.ctid || ReqObj.UserDetail.cityname || ReqObj.UserDetail.ctoth))
          return false;
        else return true;
      } else {
        if (ReqObj.UserDetail.mb1) return false;
        else return true;
      }
    } else {
      return true;
    }
  }
  function ReturnCorrectVal(val, defaultvalue) {
    if (isSet(val) && val !== "") {
      return val;
    } else {
      return isSet(defaultvalue) ? (defaultvalue !== "" ? defaultvalue : "") : "";
    }
  }
  
  function setDetail(key) {
    return ReturnCorrectVal(
      usercookie.getParameterValue(imeshExist(), key),
      ReturnCorrectVal(ReqObj.UserDetail[key], "")
    );
  }
  
  function SetUserDetails(where) {
    createGlobalObject();
    var imeshcookie = imeshExist();
    ReqObj.UserDetail["fn"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "fn"),
          ReqObj.UserDetail["fn"]
        );
    ReqObj.UserDetail["em"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "em"),
          ReqObj.UserDetail["em"]
        );
    ReqObj.UserDetail["ctid"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "ctid"),
          ReqObj.UserDetail["ctid"]
        );
    ReqObj.UserDetail["mb1"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "mb1"),
          ReqObj.UserDetail["mb1"]
        );
    ReqObj.UserDetail["uv"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "uv"),
          ReqObj.UserDetail["uv"]
        );
  }
  
  SetUserDetails();
  
  function setIPDetails(resp) {
    ReqObj.IPDetails["countryiso"] = resp.geoip_countryiso;
    ReqObj.IPDetails["countryname"] = resp.geoip_countryname;
    ReqObj.IPDetails["ipaddress"] = resp.geoip_ipaddress;
  }
  function currentISO() {
    var imeshiso = usercookie.getParameterValue(imeshExist(), "iso");
    var ipiso = usercookie.getParameterValue(
      usercookie.getCookie("iploc"),
      "gcniso"
    );
    var iso =
      imeshiso !== ""
        ? imeshiso
        : isSet(ReqObj) && ReqObj.changeUserIso !== ""
          ? ReqObj.changeUserIso
          : ipiso !== ""
            ? ipiso
            : "IN";
    return iso;
  }
  
function tofindindexfn(array, component, obj) {
    for (var i = 0; i < array.length; i++) {
      if (ConstructorName(array[i][obj]).toLowerCase() === component) {
        return i;
      }
    }
  
    return -1;
  }
  
  function ConstructorName(obj) {
    if (isSet(obj)) {
      if (obj.constructor.name) {
        return obj.constructor.name;
      } else {
        if (isSet(obj.className) && obj.className !== "") {
          return obj.className;
        } else {
          var regex = new RegExp(/s*function\s*(.*?)\s*\{/);
          var fun = obj.constructor.toString().match(regex)[1];
  
          var index = fun.indexOf("(");
          if (index !== -1) {
            return fun.substr(0, index);
          }
        }
      }
    }
  }
  function FormCloseButtons(tmpId) {
    $(document).off("keydown.BlEnqForm").on("keydown.BlEnqForm", function (event) {
        if (
          event.keyCode === 27 &&
          ReqObj.Form[tmpId].toFireEscTracking === true &&
          (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ||
            ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ||
            IsChatBLOverlay(tmpId))
        ) {
          if (closeFormCond(tmpId)) FormCloseEnqBL(tmpId, event);
          else FormCloseStep(tmpId, event);
        }
      });
    $("#t" + tmpId + "_cls")
      .off("click")
      .on("click", function (event) {
        removeYTLoader(tmpId);
        if (closeFormCond(tmpId)) FormCloseEnqBL(tmpId, event);
        else FormCloseStep(tmpId, event);
      });
  }
  
  function trimVal(val) {
    var trimmedVal = "";
    if (isSet(val) && typeof val === "string") trimmedVal = val.trim();
    return trimmedVal;
  }

$(document).ready(function () {
    var window_width1 = $(window).width();
    ReqObj[windowctrlscroll] = window_width1;
  });

function resumeBgScroll() {
    $("html").removeClass("scroll_layout");
    $(".gl-wrapper").css("width", 100 + "%");
  }
//all global variable should be in one place
loadOverlay();

function createGlobalObject() {
    /* USE ONLY IF OBJECTS CAN BE REINITIALIZED, WITH NO HARM ! */
    validation = new Validation();
    usercookie = new UserCookie();
  }

//this function takes object (strictly)
function isObjectEmpty(obj) {
    if (isSet(obj) && typeof obj === "object") {
      obj = ObjectTrim(obj);
      return !$.isEmptyObject(obj);
    } else return false;
  }
  
  function returnObjectSize(obj) {
    var count = 0;
  
    if (obj instanceof Object) {
      $.each(obj, function () {
        count = count + 1;
      });
    }
    return count;
  }

function HideSuggester() {
    $("ul.ui-autocomplete").each(function () {
      $(this).hide();
    });
    var ul = $("ul.ui-autocomplete");
    // ul.css("display", "none");
    ul.parent().css("display", "none");
    // $(".be-sugg").css("display")
  }
  
function callFlagSuggestor(tmpId, fromwhere) {
    if (
      $("#t" + tmpId + "flagdiv2").length == 0 ||
      $("#t" + tmpId + "country_dropd").html() === "" ||
      (isSet(ReqObj.setflag) && ReqObj.setflag)
    ) {
      if ($("#t" + tmpId + "flagdiv2").length == 0) {
        var ele = "<div id='t" + tmpId + "flagdiv2' class='bedsnone'></div>";
        $("#t" + tmpId + "flagdiv").after(ele);
        ReqObj.Form[tmpId]["flagcalling"] = 0;
      }
      ReqObj["showcountry"] = true;
      flagsugg.setFlagSuggestor(tmpId, fromwhere);
    }
  }
  
  function ipFlagSuggestor() {
    var len = template_array.length;
    for (var i = 0; i < len; i++) {
      callFlagSuggestor(template_array[i], "load");
    }
  }

function WrapperObj(outerHtml, closingHtml, suffix) {
    var wrapObj = {
      SuffixOuterHtml: outerHtml,
      SuffixClosingHtml: closingHtml,
      suffix: suffix,
    };
    return wrapObj;
  }
  function MakeWrapper(arrayofQues, tmpId, SuffixHtmlObj, type) {
    if (isSet(ReqObj.Form[tmpId].formType) && IsChatbl(tmpId)) {
      var Questext = IsChatbl(tmpId)
        ? "<div class = 'txt_area cbl_bg1'>"
        : "<div class='Question'>";
      var userInput = IsChatbl(tmpId)
        ? ""
        : "<div class='t" + tmpId + "_userInput' class='bewbg'>";
      for (var i = 0; i < arrayofQues.length; i++) {
        for (var j = 0; j < arrayofQues[i].length; j++) {
          Questext += arrayofQues[i][j].Label;
          // userInput += "<span class='bepr'>" + arrayofQues[i][j].UserInput + "</span>";
          userInput += arrayofQues[i][j].UserInput;
        }
      }
      Questext += "</div>";
      userInput += "</div>";
      var textToWrap = !IsChatbl(tmpId)
        ? Questext + userInput
        : type === "ques"
          ? Questext
          : userInput;
  
      var classtotest = chatBlClass(tmpId, "left");
      var leftright = IsChatbl(tmpId) ? SuffixHtmlObj.SuffixOuterHtml : "";
      return ConversationLeftWrapper(tmpId, textToWrap, {
        classtotest: classtotest,
        leftright: leftright,
      });
    } else {
      var normalHtml = SuffixHtmlObj.SuffixOuterHtml;
      var beRowHtml = "";
      var closingRowDiv = "";
      var ClearBothDiv = "";
  
      if (isSet(SuffixHtmlObj)) {
        if (isSet(SuffixHtmlObj.suffix) && SuffixHtmlObj.suffix !== "") {
          if (SuffixHtmlObj.suffix === "_isqBox" || SuffixHtmlObj.suffix === "_contactinfo" || SuffixHtmlObj.suffix === "_Prodname") {
            var clsName = currentISO() !== "IN" && SuffixHtmlObj.isPhone === true ? "eqflot eqIsf eqIsMn mt19"
              : "eqflot bepr";
  
            var wrapClass = isSSB(tmpId) ? ssbClass("wrprClass", tmpId) : isBlInline(tmpId) ? isBlInlineFr(tmpId) ? " fmb15" : " idsf pfstrt mb20" : isInactiveBL(tmpId) ? SuffixHtmlObj.suffix === "_contactinfo" ? "" : " be-row2" : " be-row";
  
            beRowHtml += SuffixHtmlObj.suffix === "_contactinfo" && isOtherEnq(tmpId) ? "<div class='" + clsName + "'>" : "<div class='" + wrapClass + "'>"; closingRowDiv += "</div>";
          }
  
          if (SuffixHtmlObj.suffix === "_contactinfo") {
            if (isBlFirstfold(tmpId))
              ClearBothDiv += "<div class='beclr'></div>";
            else {
              if (currentISO() === "IN")
                ClearBothDiv += "<div class='beclr'></div>";
            }
          }
  
        }
      }
  
      if (isInactiveBL(tmpId) && SuffixHtmlObj.suffix === "_contactinfo" && arrayofQues.length == 3) {
        normalHtml += '<div class="NameEmail">';
      }
  
      for (var i = 0; i < arrayofQues.length; i++) {
        for (var j = 0; j < arrayofQues[i].length; j++) {
  
          if (isSet(arrayofQues[i][j].WrapClass) && arrayofQues[i][j].WrapClass != "" && SuffixHtmlObj.suffix === "_isqBox")
            beRowHtml = "<div class='" + wrapClass + " " + arrayofQues[i][j].WrapClass + "'>";
  
          if (!isSSB(tmpId) || (isSSB(tmpId) && SuffixHtmlObj.suffix !== "_isqBox")) {
            if (isInactiveBL(tmpId) && SuffixHtmlObj.suffix === "_contactinfo" && arrayofQues.length == 3 && i == 2) {
              normalHtml += "</div>";
            }
            normalHtml += beRowHtml;
          }
  
          if (isSet(arrayofQues[i][j].WrapClass) && arrayofQues[i][j].WrapClass != "" && SuffixHtmlObj.suffix === "_isqBox")
            beRowHtml = "<div class='" + wrapClass + "'>";
  
          if (isSSB(tmpId) && SuffixHtmlObj.suffix === "_isqBox") {
            beRowHtml = (isSet(arrayofQues[i].clsNm) && arrayofQues[i].clsNm === false) || (isSet(arrayofQues[i][j].clsNm) && arrayofQues[i][j].clsNm === false)
              ? "<div class=''>"
              : "<div class='" + ssbClass("wrprClass", tmpId) + "'>";
            normalHtml += beRowHtml;
          }
  
          if (isSet(arrayofQues[i][j].isenquire) && arrayofQues[i][j].isenquire === true) {
            normalHtml = SuffixHtmlObj.SuffixOuterHtml + "<div class='eqmb5 eqmt20'>";
          }
  
          normalHtml +=
            arrayofQues[i][j].OuterWrapper +
            arrayofQues[i][j].Label +
            arrayofQues[i][j].UserInput +
            arrayofQues[i][j].ClosingWrapper;
        }
        normalHtml += closingRowDiv;
      }
  
      normalHtml += SuffixHtmlObj.SuffixClosingHtml;
      normalHtml += ClearBothDiv;
      return normalHtml;
    }
  }
  function checkdefaultIsq(tmpId, QuestionText, type, option) {
    if (
      isSet(ReqObj.Form[tmpId].defaultIsq) &&
      ReqObj.Form[tmpId].defaultIsq === "1" &&
      isSet(type) &&
      type.toLowerCase() === "radio"
    ) {
      QuestionText = QuestionText.toLowerCase();
      for (var isq in DefaultIsqAns)
        return (
          isSet(QuestionText.match(isq.toLowerCase())) &&
          option.toLowerCase() === DefaultIsqAns[isq].toLowerCase()
        );
    }
    return false;
  } 

function getTimeStamp() {
    var date = new Date();
    var time = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
    return time % 10 === 0 ? true : false;
  }
  
  function returnIsoHtml(tmpId, isoclass, isovalue) {
    /* add attributes at end */
    if (!isSet(isovalue)) isovalue = "";
    return (
      '<input type="text" value="' +
      isovalue +
      '" readonly="" name="iso" id="t' +
      tmpId +
      '_iso" class="' +
      isoclass +
      '" tabindex="-1" disabled="disabled">'
    );
  }
  
  function returnInput(
    tmpId,
    element,
    type,
    name,
    placeholder,
    inputclass,
    value,
    inlinestyle,
    maxlength,
    attribute
  ) {
    /* add attributes at end  */
    return (
      '<input id="' +
      tmpId +
      element +
      '" type="' +
      type +
      '" name="' +
      name +
      '" value="' +
      value +
      '" class="' +
      inputclass +
      '" placeholder="' +
      placeholder +
      '" maxlength="' +
      maxlength +
      '" style="' +
      inlinestyle +
      '"' +
      attribute +
      '="">'
    );
  }
  
  function returnButton(tmpId, element, buttontext, buttonclass, bstyle) {
    /* add attributes at end  */
    return (
      '<button id="' +
      tmpId +
      element +
      '" class="' +
      buttonclass +
      '" style="' +
      bstyle +
      '">' +
      buttontext +
      "</button>"
    );
  }
  
  function returnContainer(
    tmpId,
    element,
    containerclass,
    datarole,
    divtext,
    style
  ) {
    /* add attributes at end  */
    if (!isSet(divtext)) divtext = "";
    return (
      '<div id="' +
      tmpId +
      element +
      '" class="' +
      containerclass +
      '" data-role="' +
      datarole +
      '" style="' +
      style +
      '">' +
      divtext
    );
  }
  
  function returnTextarea(tmpId, element, containerclass, placeholder) {
    /* add attributes at end  */
    return (
      '<textarea id="' +
      tmpId +
      element +
      '" class="' +
      containerclass +
      '" placeholder="' +
      placeholder +
      '" />'
    );
  }
  
function returnSpan(tmpId, element, text, spanclass, style) {
    /* add attributes at end  */
    return ('<span id="' +tmpId +element +'" class="' +spanclass +'" style="' +style +'" >' +text +"</span>");
  }
  
  function returnLabel(tmpId, text, element, labelclass) {
    /* add attributes at end  */
    return (
      '<label id="' +
      tmpId +
      element +
      '" class="' +
      labelclass +
      '">' +
      text +
      "</label>"
    );
  }
  
  function returnDl(tmpId, element, dlclass, disabled) {
    /* add attributes at end  */
    return (
      '<dl id="' +
      tmpId +
      element +
      '" class="' +
      dlclass +
      '" disabled="' +
      disabled +
      '"></dl>'
    );
  }
  
function returnCustomElement(
    tmpId,
    element,
    customele,
    value,
    optionid,
    selected,
    optiontext
  ) {
    return (
      "<" +
      customele +
      ' value="' +
      value +
      '" optionid="' +
      optionid +
      '"' +
      selected +
      " >" +
      optiontext +
      "</" +
      customele +
      ">"
    );
  }
  
  function returnAnswer(tmpId, key) {
    return ReqObj.Form[tmpId].UserInputs[key];
  }
function addLine() {
    return '<div class="cbl_line"></div>';
  }

function returnIsqHtmlObj(RecurOfQues, tmpId) {
    var imeshcookie = imeshExist();
  
    if (isSSB(tmpId)) return returnSSBIsqHtml(RecurOfQues, tmpId);
    // var qtcls = (isBlInline(tmpId)) ? "qut_cus iqutm" : "qut_cus";
    var qtcls = isBlInline(tmpId)
      ? "qut_cus iqutm"
      : isBlFirstfold(tmpId)
        ? imeshcookie == "" && currentISO() == "IN"
          ? "qut_cus qut_ffun qtmt"
          : "qut_cus qut_ffid qtmt"
        : "qut_cus";
    var blfrcls = isBlInlineFr(tmpId) ? " flx1" : "";
    var outrdiv = isBlInline(tmpId)
      ? RecurOfQues[0].label_div +
      "<div class='inW240" +
      blfrcls +
      "'>" +
      RecurOfQues[0].error_div +
      "<div id='t" +
      tmpId +
      "qut_id' class='" +
      qtcls +
      "'>"
      : RecurOfQues[0].error_div +
      RecurOfQues[0].label_div +
      "<div id='t" +
      tmpId +
      "qut_id' class='" +
      qtcls +
      "'>";
    return [
      {
        ClosingWrapper: isBlInline(tmpId) ? "</div></div>" : "</div>",
        Label: IsChatbl(tmpId) ? "<div>" + ChatBlMsgs("Quantity") + "</div>" : "",
        OuterWrapper: outrdiv,
        UserInput: RecurOfQues[0].UserInput + RecurOfQues[1].UserInput,
        beforeInput: "",
        beforeLabel: "",
        qtuttype: 6,
      },
    ];
  }
  
  //Scroll Bottom
  function scrollSmoothToBottom(id) {
    var scrollDiv = document.getElementById(id);
    if (isSet(scrollDiv)) {
      $("#" + id).animate(
        {
          scrollTop: scrollDiv.scrollHeight - scrollDiv.clientHeight,
        },
        500
      );
    }
  }

  
  function SetAutoCompleteClass(tmpId, suffix) {
    var autocompleteClass = "be-sugg t" + tmpId + suffix;
    if (IsChatbl(tmpId)) {
      autocompleteClass += " bl-chat";
    } else if (isSSB(tmpId)) autocompleteClass += " mb-prod-sugg" + " suggz";
  
    return autocompleteClass;
  } 

  
  function showQuantityUnit(tmpId, arr, type) {
    var isq = arr;
    var isq_length = isSet(isq) ? isq.length : 0;
    for (var i = 0; i < isq_length; i++) {
      if (isq[i].length === 2) {
        var isqtype = [
          isq[i][0].IM_SPEC_MASTER_DESC.toLowerCase(),
          isq[i][1].IM_SPEC_MASTER_DESC.toLowerCase(),
        ];
        if (
          $.inArray("quantity", isqtype) ||
          $.inArray("quantity unit", isqtype)
        ) {
          ReqObj.Form[tmpId].quantityunit = isq[i];
          if (type === 1) {
            return ReqObj.Form[tmpId].quantityunit[0]
              .IM_CAT_SPEC_CATEGORY_TYPE === "2"
              ? false
              : true;
          }
          return true;
        }
        return false;
      }
    }
    return false;
  }
function GetObjectKeys(obj) {
    if (!Object.keys) {
      var keys = [];
  
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
    } else {
      return Object.keys(obj);
    }
  }
  
  function updateChatWidgetGlobalVar(tmpId) {
    if (IsChatBLInline(tmpId) && tmpId.substring(0, 2) === "08") {
      isChatWidgetOpen = $("#t" + tmpId + "_chatBL").hasClass("cbl_vh")
        ? false
        : true;
    }
  }
  
  function BlAutoSuggRowNum(tmpId) {
    if (isSet(tmpId)) {
      var row_num = 5;
      if (tmpId === "202") row_num = 3;
      if (IsChatbl(tmpId)) row_num = 4;
      return row_num;
    }
    return 5;
  }
  
  function ReturnBlUserName(tmpId) {
    var BLname = "";
    var firstName = "";
    if (isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail["fn"] !== "")
      firstName = ReqObj.UserDetail["fn"];
    else firstName = usercookie.getParameterValue(imeshExist(), "fn");
    if (IsChatbl(tmpId) && isSet(firstName) && firstName !== "") {
      var classtotest = !IsChatbl(tmpId)
        ? chatBlClass(tmpId, "left")
        : "txt_area cbl_bg1";
      var leftright = IsChatbl(tmpId) ? "cbl_ques cbl_vh" : "";
      BLname = ConversationLeftWrapper(
        tmpId,
        "Welcome " + firstName,
        {
          classtotest: classtotest,
          leftright: leftright,
        },
        "name"
      );
    }
    return BLname;
  }
  
  function IsChatbl(tmpId) {
    return isSet(tmpId) && tmpId.substr(0, 2) === "08" ? true : false;
  }
  
  function IsChatBLInline(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "chatbl-inline"
      ? true
      : false;
  }
  
  function IsChatBLOverlay(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "chatbl" ? true : false;
  }
  
  function isSSB(tmpId) {
    return tmpId.substr(0, 2) === "06" ? true : false;
  }
  
  function isnewSSB(tmpId) {
    return tmpId.substr(0, 2) === "06" &&
      isSet(ReqObj.Form[tmpId].isnewssb) &&
      ReqObj.Form[tmpId].isnewssb === "1"
      ? true
      : false;
  }
  
  function isBlInline(tmpId) {
    return isGlIdEven(tmpId) &&
      ReqObj.Form[tmpId].typeofform === "bl" &&
      tmpId.substr(0, 2) === "01" &&
      ReqObj.Form[tmpId].screenNumber < 0
      ? true
      : false;
  }
  
  function isBlFirstfold(tmpId) {
    return ReqObj.Form[tmpId].typeofform === "bl" &&
      tmpId.substr(0, 2) === "04" &&
      ReqObj.Form[tmpId].screenNumber < 0
      ? true
      : false;
  }
  
  function isScriptTag(name) {
    name = name.toLowerCase();
    if (
      name.includes("<script>") ||
      name.includes("</script>") ||
      name.includes("script&gt") ||
      name.includes("%3cscript") ||
      name.includes("script%253e") ||
      (name.includes("<") && name.includes(">"))
    )
      return true;
    else false;
  }
  
  function isBlInlineFlag(tmpId) {
    return isGlIdEven(tmpId) &&
      ReqObj.Form[tmpId].typeofform === "bl" &&
      tmpId.substr(0, 2) === "01"
      ? true
      : false;
  }
  
  function isGlIdEven(tmpId) {
    if (isSet(ReqObj.Form[tmpId].isNewUI) && ReqObj.Form[tmpId].isNewUI === "0") {
      return true;
    }
    return false;
  }
  function isBlInlineFr(tmpId) {
    if (
      ReqObj.Form[tmpId].screenNumber <= 0 &&
      ReqObj.Form[tmpId].FormSequence._stepCounter <= 0 &&
      isGlIdEven(tmpId) &&
      isSet(ReqObj.Form[tmpId].isFrInline) &&
      ReqObj.Form[tmpId].isFrInline === "1"
    ) {
      return true;
    }
    return false;
  }
  
function IsProduction() {
    var isProd = webAddressLocation.match(/^dev/)
      ? false
      : webAddressLocation.match(/^stg/)
        ? false
        : true;
    return isProd;
  }
  
  function CopyObject(Obj) {
    var CopyObj = Obj || {};
    var returnObj = {};
    for (var prop in CopyObj) {
      if (CopyObj.hasOwnProperty(prop)) {
        returnObj[prop] = CopyObj[prop];
      }
    }
    return returnObj;
  }
  
/**
for future if we need to replace all duplicate tracking fired
then replace numberToFind with number
*/
function binaryArraySearch(array, number) {
    if (isSet(array)) {
      var numberToFind = number;
      var start = 0,
        end = array.length - 1;
      while (start <= end) {
        var mid = Math.floor((start + end) / 2);
        if (array[mid] === numberToFind) return mid;
        else if (array[mid] > numberToFind) {
          end = mid - 1;
        } else if (array[mid] < numberToFind) {
          start = mid + 1;
        }
      }
      return -1;
    }
    return -1;
  }
  
  function StaticQuesForeignUser(tmpId) {
    // if (currentISO() !== "IN" && (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId))) return true;
    // else false;
  
    return false;
  }
  
  function updateEnrichShownKey(tmpId, isStatic, isAttachment) {
    ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown = isStatic;
    ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = isAttachment;
  
    //is showAttachment is 1 we need to show the attachment
    if (ReqObj.Form[tmpId].showAttachment === "1") {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
    } else if (ReqObj.Form[tmpId].showAttachment === "0") {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
    } else if (
      ReqObj.Form[tmpId].showAttachment === "-1" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
    ) {
      if (StaticQuesForeignUser(tmpId)) {
        ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
      } else ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
    } else if (
      ReqObj.Form[tmpId].showAttachment === "-1" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
    ) {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
    }
  }
  
  
function ChatblfooterAns(tmpId) {
    $("#t" + tmpId + "_blchatfooter").hasClass("focus")
      ? ""
      : setTimeout(function () {
        $("#t" + tmpId + "_blchatfooter").addClass("focus");
      }, 1000);
    $("#t" + tmpId + "_typhere").hasClass("dn")
      ? ""
      : setTimeout(function () {
        $("#t" + tmpId + "_typhere").addClass("dn");
        $("#t" + tmpId + "_newblchatReply").removeClass("cbl_vh");
      }, 1099);
  }
  
function isSecondEnq() {
    var imEqgl = usercookie.getCookie("imEqGl");
    if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
      var arr = imEqgl.split(",");
      for (var s = 0; s < arr.length; s++) {
        if (isSet(arr[s]) && trimVal(arr[s]) !== "") {
          if (arr[s].substring(0, 6) === "dispid") return true;
        }
      }
      return false;
    } else return false;
  }
  
  function isSecondBl() {
    var imEqgl = usercookie.getCookie("imEqGl");
    if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
      var arr = imEqgl.split(",");
      for (var s = 0; s < arr.length; s++) {
        if (isSet(arr[s]) && trimVal(arr[s]) !== "") {
          if (arr[s].substring(0, 2) === "BL") return true;
        }
      }
      return false;
    } else return false;
  }
  
  function isSecondBlEnq(tmpId) {
    if (isSet(tmpId)) {
      if (isSet(ReqObj.Form[tmpId].formType)) {
        if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && isSecondBl())
          return true;
        else if (
          ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
          isSecondEnq()
        )
          return true;
        return false;
      } else {
        return false;
      }
    } else return false;
  }
/*
 *
 * To maintain mcatId and related image
 *
 */

function pushImage(mcatID, dispImgUrl, zoomImgUrl) {
    ReqObj.ImageKey[mcatID] =
      isSet(dispImgUrl) && dispImgUrl !== ""
        ? dispImgUrl
        : isSet(zoomImgUrl) && zoomImgUrl !== ""
          ? zoomImgUrl
          : "";
  }

function isOtherEnq(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ? true : false;
  }
  
function isImageVidEnq(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
      isSet(ReqObj.Form[tmpId].typeofform) &&
      (ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
        ReqObj.Form[tmpId].typeofform.toLowerCase() === "video")
      ? true
      : false;
  }
function isAllNumbers(str) {
    var exp = /^[0-9]*$/;
    return exp.test(str);
  }

function setIplocCookie(tmpId) {
    if (!(Enq04(tmpId) || Bl04(tmpId) || Bl01(tmpId) || isSSB(tmpId))) {
      var imcoockie = usercookie.getCookie("ImeshVisitor");
      var ipcookie = usercookie.getCookie("iploc");
      if (imcoockie == "" && ipcookie == "") new IpLoc(tmpId);
    }
  }
  
  function flagsugcall(tmpId, ctname, ciso) {
    if (ctname != "India" && ctname !== ReqObj.Form[tmpId].ctn) {
      $("#t" + tmpId + "country_dropd").html("");
      ReqObj.changeUserIso = ciso;
      ReqObj.setflag = 1;
      flagsugg.setFlagSuggestor(tmpId, "load");
    }
  }
  
function IpLoc(tmpId) {
    var tempipLoc = usercookie.getCookie("iploc");
    if (
      (tempipLoc === "" ||
        (tempipLoc !== "" &&
          usercookie.getParameterValue(tempipLoc, "gip") === "")) &&
      !navigator.userAgent.match(/googlebot|mediapartners/)
    ) {
      this.getIp(tmpId);
    } else {
      this.captureDetailsOfIploc();
    }
  }
IpLoc.prototype.getIp = function (tmpId) {
    var that = this;
    //var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var appSName = location.hostname.match(/^dev/)
      ? "//geoip.imimg.com/"
      : location.hostname.match(/^stg/)
        ? "//geoip.imimg.com/"
        : "//geoip.imimg.com/";
    if (typeof glmodid !== "undefined" && glmodid !== null && glmodid !== "") {
      $.ajax({
        cache: false,
        url: appSName + "api/location.php",
        //url: 'https://geoip.imimg.com/api/location.php',
        timeout: 3000,
        data: {
          modid: glmodid,
          token: "imobile@15061981",
        },
        type: "POST",
        dataType: "json",
        success: function (s) {
          ReqObj.ipLoc.response = true;
          if (isSet(s) && isSet(s.Response)) {
            if (
              isSet(s.Response.Code) &&
              parseInt(s.Response.Code) === 200 &&
              isSet(s.Response.Status) &&
              s.Response.Status === "Success"
            ) {
              //s={"Response":{"Data":{"geoip_countryiso":"JP","geoip_countryname":"Japan","geoip_stateiso":"13","geoip_statename":"Tokyo","geoip_accuracy":1000,"geoip_ipaddress":"84.17.34.18"},"Code":200,"Status":"Success","Message":"Successfully returning data"}};
              var resp = s.Response.Data;
              if (isSet(resp)) {
                ReqObj.IPDetails = [];
                resp.geoip_cityname = isSet(resp.geoip_cityname)
                  ? resp.geoip_cityname
                  : "";
                resp.geoip_cityid = isSet(resp.geoip_cityid)
                  ? resp.geoip_cityid
                  : "";
                resp.geoip_countryiso = isSet(resp.geoip_countryiso)
                  ? resp.geoip_countryiso
                  : "";
                resp.geoip_countryname = isSet(resp.geoip_countryname)
                  ? resp.geoip_countryname
                  : "";
                resp.geoip_accuracy = isSet(resp.geoip_accuracy)
                  ? resp.geoip_accuracy
                  : "";
                resp.geoip_ipaddress = isSet(resp.geoip_ipaddress)
                  ? resp.geoip_ipaddress
                  : "";
                resp.geoip_statename = isSet(resp.geoip_statename)
                  ? resp.geoip_statename
                  : "";
                that.setIpLoc(resp, glmodid, tmpId);
                setIPDetails(resp);
                if (isSet(tmpId))
                  setTimeout(function () {
                    flagsugcall(
                      tmpId,
                      resp.geoip_countryname,
                      resp.geoip_countryiso
                    );
                  }, 1000);
              }
            } else {
              blenqGATracking("iploc", "service:location:failure", s.Response, 1, 0);
              ReqObj.ipLoc.isFailed = true;
              that.failSafe();
            } /* last parameter = 0 denotes ip req */
          } else {
            blenqGATracking("iploc", "service:location:failure", "response undefined", 1, 0);
            ReqObj.ipLoc.isFailed = true;
            that.failSafe();
          }
        },
        error: function (res) {
          ReqObj.ipLoc.response = true;
          ReqObj.ipLoc.isFailed = true;
          that.failSafe();
          res = isSet(res) ? res : "response undefined";
          blenqGATracking("iploc", "service:location:failure", JSON.stringify(res), 1, 0);
        },
      });
    }
  };
  /*
  this method makes iploc cookie using setCookie() method of UserCookie class
  */
  IpLoc.prototype.setIpLoc = function (resp, glmodid, tmpId) {
    var tempipLoc =
      "gcniso=" +
      resp.geoip_countryiso +
      "|gcnnm=" +
      resp.geoip_countryname +
      "|gctnm=" +
      resp.geoip_cityname +
      "|gctid=" +
      resp.geoip_cityid +
      "|gacrcy=" +
      resp.geoip_accuracy +
      "|gip=" +
      resp.geoip_ipaddress +
      "|gstnm=" +
      resp.geoip_statename;
    usercookie.setCookie("iploc", tempipLoc, 0.125, glmodid); /* glmodid */
    this.captureDetailsOfIploc(tmpId);
  };
IpLoc.prototype.captureDetailsOfIploc = function (tmpId) {
    var iploccookie = usercookie.getCookie("iploc");
    ReqObj.UserDetail["ipctid"] = usercookie.getParameterValue(
      iploccookie,
      "gctid"
    );
    ReqObj.UserDetail["ipcityname"] = usercookie.getParameterValue(
      iploccookie,
      "lg_ct"
    );
    if (!isSet(ReqObj.IPDetails)) {
      ReqObj.IPDetails = [];
      ReqObj.IPDetails["countryiso"] = usercookie.getParameterValue(
        iploccookie,
        "gcniso"
      );
      ReqObj.IPDetails["countryname"] = usercookie.getParameterValue(
        iploccookie,
        "gcnnm"
      );
      ReqObj.IPDetails["ipaddress"] = usercookie.getParameterValue(
        iploccookie,
        "gip"
      );
    }
    if (
      usercookie.getParameterValue(iploccookie, "gcniso") !== "IN" ||
      (usercookie.getParameterValue(iploccookie, "gcniso") === "IN" &&
        ReqObj.ipLoc.zoneISO === "OTHER")
    ) {
      if (!isSet(tmpId)) {
        ipFlagSuggestor();
      }
    }
    ReqObj.UserDetail["suggesCity"] = {
      geoloc: [
        usercookie.getParameterValue(iploccookie, "lg_ct"),
        usercookie.getParameterValue(iploccookie, "lg_ctid"),
      ],
      hdcity: [
        usercookie.getParameterValue(usercookie.getCookie("xnHist"), "city"),
        "",
      ],
      iploc: [
        usercookie.getParameterValue(iploccookie, "gctnm"),
        usercookie.getParameterValue(iploccookie, "gctid"),
      ],
    };
  };
  IpLoc.prototype.failSafe = function () {
    if (ReqObj.ipLoc.zoneISO !== "IN") {
      ReqObj.ipLoc.callIpFlagSugg = true;
      ipFlagSuggestor();
    }
  };
  new IpLoc();
  ReqObj.ipLoc.pinged = true;
/*--------------------------------------- Pass mcat id to get image if available---------------------------------------------- */
function getImage(key) {
    return ReqObj.ImageKey[key];
  }

function toCallMiniDetails(tmpId) {
    // cname
    //if(currentISO() === "IN") { // check
    if (
      (!isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled) &&
      (imeshExist() !== "" || (isSet(ReqObj.glid) && ReqObj.glid != ""))
    ) {
      ReqObj.CNSerCalled = true;
      miniDetailService(tmpId);
    } else ReqObj.Form[tmpId].cName.toask = false;
    //}
  }
  
function toAskCname(tmpId) {
    return typeof ReqObj.UserDetail.cName === "undefined" ||
      (isSet(ReqObj.UserDetail.cName) && ReqObj.UserDetail.cName === "")
      ? true
      : false;
  }
  
function RadioClick(tmpId) {
    $(".radioClick")
      .off("click")
      .on("click", function (event) {
        var tempId = event.target.id;
        tempId = tempId.substr(1, 4);
        var imeshcookie = imeshExist();
        if (IsChatbl(tmpId))
          $("#t" + tmpId + "_submitNo2") //chat bl bug
            .parent()
            .addClass("dn");
        var curEl = this;
        var name = $(this).attr("name");
        var isSelected = $(curEl).hasClass("waschecked");
  
        $("input[name='" + name + "']").each(function () {
          $(this).prop("checked", false).removeClass("waschecked");
          $(this).parent().removeClass("sl-box chksl");
          $(this).siblings("label").children(".bechk-in").children().hide();
        });
        var crb = false;
        if (!isSelected) {
          if (
            $("#t" + tmpId + "ques" + name.charAt(name.length - 1))
              .text()
              .toLowerCase() === "why do you need this"
          )
            crb = true;
          if (
            $("#" + curEl.id)
              .val()
              .toLowerCase() === "for reselling" ||
            $("#" + curEl.id)
              .val()
              .toLowerCase() === "for business use"
          ) {
            ReqObj.Form[tempId].cName.rb = true;
          } else {
            ReqObj.Form[tempId].cName.rb = false;
          }
          $(curEl).prop("checked", true).addClass("waschecked");
          $(curEl).parent().siblings(".oth_bx").children("input").val("");
          IsChatbl(tempId) || isSSB(tempId)
            ? ""
            : $(curEl).parent().addClass("sl-box chksl");
          $(curEl).siblings("label").children(".bechk-in").children().show();
          if (crb === true && !isEnq(tmpId)) onCName(tmpId, true);
        } else if (!IsChatbl(tmpId) && crb === true && !isEnq(tmpId)) {
          ReqObj.Form[tempId].cName.rb = false;
          onCName(tmpId, true);
        }
      });
  }

//This will be available as global variable
var webAddressLocation = location.hostname;
var appsServerName = webAddressLocation.match(/^dev/)
  ? "//dev-apps.imimg.com/"
  : webAddressLocation.match(/^stg/)
    ? "//stg-apps.imimg.com/"
    : "//apps.imimg.com/";

function ProductName(tmpId, from) {
  this.ProductNameHTML = "";
  this.onselect = 0;
  this.tmpId = "";
  ReqObj.Form[tmpId].productObject = this;
  if (
    !isSSB(tmpId) &&
    !(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)) &&
    from !== "enter"
  )
    $("#t" + tmpId + "_prodtitle").html("");
  this.className = "ProductName";
  this.isProdNameChanged = false;
  this.ProductNameHtmlObj = {
    Label: "",
    UserInput: "",
    OuterWrapper: "",
    ClosingWrapper: "",
  };
  this.ProductNameHtmlObjArray = [];
}

ProductName.prototype.addHtmlObjToArray = function (htmlObj) {
  this.ProductNameHtmlObjArray.push(htmlObj);
};


ProductName.prototype.hasHtml = function (ProductNameObj) {
  if (isSet(ProductNameObj)) {
    this.tmpId = ProductNameObj.tmpId;
    var tmpId = ProductNameObj.tmpId;
    // if (isSet(ReqObj.UserHtml[tmpId])) {
    // ReqObj.UserHtml[tmpId]["ProductSugg"] = true;
    this.addHtmlObjToArray(this.getProductHtml(tmpId));
    // var ProductNameSuffixObj = {
    //   "suffix": "_prodtitle",
    //   "class": ""
    // };
    if (!IsChatbl(tmpId)) {
      var clasnm = isSSB(tmpId) ? ssbClass("wrprClass", tmpId) : isBlInline(tmpId) ? isBlInlineFr(tmpId) ? "fmb15" : "idsf pfstrt mb20" : isInactiveBL(tmpId) ? "porlt bemb5":"porlt";
      var ProductNameSuffixOuterHtml = "<div  id='t" + tmpId + "_prodtitle' class='" + clasnm + "'>";
      var ProductNameSuffixClosingHtml = "</div>";
      var ProductNameSuffixHtmlObj = {
        SuffixOuterHtml: ProductNameSuffixOuterHtml,
        SuffixClosingHtml: ProductNameSuffixClosingHtml,
        suffix: "_prodtitle",
      };

      this.ProductNameHTML = MakeWrapper(
        [this.ProductNameHtmlObjArray],
        tmpId,
        ProductNameSuffixHtmlObj,
        ""
      );
    } else {
      this.ProductNameHTMLQues = MakeWrapper(
        [this.ProductNameHtmlObjArray],
        tmpId,
        WrapperObj(
          "<div  id='t" + tmpId + "_prodtitle' class = 'cbl_ques cbl_vh'>",
          "</div>",
          "_prodtitle"
        ),
        "ques"
      );

      this.ProductNameHTMLInput = MakeWrapper(
        [this.ProductNameHtmlObjArray],
        tmpId,
        WrapperObj(
          "<div class = 'cbl_dtls cbl_prdchng cbl_df t" +
          tmpId +
          "_userInput cbl_br10 dn'>",
          "</div>",
          "_prodtitle"
        ),
        "input"
      );

      this.ProductNameHTML =
        this.ProductNameHTMLQues + this.ProductNameHTMLInput;
    }
    // var ProdNameHtml = this.ProductNameHTML;
    // ReqObj.UserHtml[tmpId] = {
    //   "ProductSugg": true,
    //   "ProductName": ProdNameHtml
    // };
    // }
    // else {
    //   ReqObj.UserHtml[tmpId]["ProductSugg"] = false;

    //   this.ProductNameHTML = ReqObj.UserHtml[tmpId]["ProductName"];
    // }
    if (this.ProductNameHTML !== "") {
      ReqObj.Form[tmpId].currentclassCount++;
      this.ifHtmlPresent(ProductNameObj, tmpId);
    } else {
      this.ifHtmlNotPresent(ProductNameObj, tmpId);
    }
  }
};

ProductName.prototype.ifHtmlPresent = function (ProductNameObj, tmpId) {
  ProductNameObj.that.NumberofClassCalled -= 1;
  AttachObject(ProductNameObj.object, tmpId);
  if (isSet(ProductNameObj.AfterService)) {
    for (var i = 0; i < ProductNameObj.AfterService.length; i++) {
      ProductNameObj.that.MakeSeq(ProductNameObj.AfterService[i], tmpId);
    }
  }
  if (ProductNameObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(ProductNameObj, tmpId);
  }
};

ProductName.prototype.ifHtmlNotPresent = function (ProductNameObj, tmpId) {
  if (ProductNameObj.hasFallback) {
    CreateSeq(ProductNameObj.FallbackObj);
  } else ProductNameObj.that.NumberofClassCalled -= 1;
};

ProductName.prototype.returnProductInput = function (tmpId, inputclass) {
  var placehold = "Enter Product / Service name";
  var html = '<input templateId="' + tmpId + '" class="' + inputclass + '" type="text" name="q_title" id="t' + tmpId + 'prodtitle" onblur="" maxlength="100" placeholder="' + placehold + '" autocomplete="off" spellcheck="true" role="textbox" aria-autocomplete="list" aria-haspopup="true">';
  if (isSSB(tmpId) && !isnewSSB(tmpId)) return '<div class="mb-InCon">' + html;
  return html;
};

ProductName.prototype.returnProductError = function (tmpId,formType,errorclass) {
  var div = '<div class="' + errorclass + '" id="t' + tmpId + '_error_title"><div data-role="content"';
  div += isSSB(tmpId) ? 'class="mb-ertxt mb-mt10">Enter product/service name</div>' : ">Enter product/service name</div>";
  return div;
};

ProductName.prototype.getInput = function (tmpId, formType) {
  this.ProductNameHtmlObj["UserInput"] = IsChatbl(tmpId) ? this.returnProductInput(tmpId, "") + "</div>" : this.getBlEnqInputHtml(tmpId, formType);
};

ProductName.prototype.getBlEnqInputHtml = function (tmpId, formType) {
  var html = "";
  html += isSSB(tmpId) || isBlInline(tmpId) ? this.returnProductInput(tmpId, "") : !isInactiveBL(tmpId) ? this.returnProductInput(tmpId, "be-slbox inpt_errorbx be-row") : this.returnProductInput( tmpId, "be-slbox inpt_errorbx be-row bed_input cpNm wid_600" );
  var errorcls = isSSB(tmpId) ? "" : "beerrp4 bedsnone be-erbx";
  html += this.returnProductError(tmpId, formType, errorcls);
  html += isSSB(tmpId) ? isnewSSB(tmpId) ? "</div>" : "</div></div>" : '<a class="be-erarw" data-role="arrow"></a></div>';
  if (isBlInline(tmpId)) {
    var cls = isBlInlineFr(tmpId) ? "flx1" : "pr pflx1";
    html = "<div class = '" + cls + "'>" + html + "</div>";
  }
  return html;
};

ProductName.prototype.getLabel = function (tmpId, formType) {
  var cls = isBlInline(tmpId) ? isBlInlineFr(tmpId) ? "fs0 wf" : "fs15 cl11" : "be-lbl";
  if (isInactiveBL(tmpId)) {
    cls = "be-lbl";
  }
  var label = isBlInline(tmpId) || (isSSB(tmpId) && isnewSSB(tmpId)) ? "I want quotes for" : isSSB(tmpId) ? "Product/Service name" : (isInactiveBL(tmpId)) ? "Enter Product/Service name <span class='redc'>*</span>" : "Enter Product/Service name";
  this.ProductNameHtmlObj["Label"] = IsChatbl(tmpId) ? returnLabel("t" + tmpId, "Please enter Product/Service name", "_name-l", "") : isSSB(tmpId) ? returnLabel("t" + tmpId, label, "_name-l", ssbClass("label", tmpId)) : returnLabel("t" + tmpId, label, "_name-l", cls);
};

ProductName.prototype.getProductHtml = function (tmpId) {
  this.getLabel(tmpId, ReqObj.Form[tmpId].formType.toLowerCase());
  this.getInput(tmpId, ReqObj.Form[tmpId].formType.toLowerCase());
  this.ProductNameHtmlObj["ClosingWrapper"] = "";
  this.ProductNameHtmlObj["OuterWrapper"] = "";
  return this.ProductNameHtmlObj;
};

ProductName.prototype.displayHtml = function () {
  return IsChatbl(this.tmpId)
    ? [this.ProductNameHTMLQues, this.ProductNameHTMLInput]
    : [this.ProductNameHTML];
};

ProductName.prototype.handleUI = function (event) {
  var tmpId = event.data.tmpId;
  var todo = event.data.todo;
  if (todo === "default") {
    // if (ReqObj.UserHtml[tmpId]["ProductSugg"])
    this.setTitleSuggester(tmpId);
    $("#t" + tmpId + "_error_title").addClass("bedsnone");
    isSSB(tmpId)
      ? $("#t" + tmpId + "prodtitle").removeClass("mb-erbrd nb-erbrd")
      : $("#t" + tmpId + "prodtitle").removeClass("highlight-err");
    $("#t" + tmpId + "_name-l").removeClass("redc");
    this.showMcatFilled(tmpId);
  }
};

ProductName.prototype.handleHeading = function (tmpId) {
  if (isOtherEnq(tmpId)) ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};

ProductName.prototype.defaultEvents = function (tmpId) {
  this.handleUI({
    data: {
      tmpId: tmpId,
      todo: "default",
    },
  });
  this.handleEvents(tmpId);
  $(document)
    .off("click.prodName keypress.prodName keydown.prodName")
    .on(
      "click.prodName keypress.prodName keydown.prodName",
      ".inpt_errorbx",
      function () {
        $("#t" + tmpId + "_error_title").addClass("bedsnone");
        $("#t" + tmpId + "prodtitle").removeClass("highlight-err");
        $("#t" + tmpId + "_name-l").removeClass("redc");
      }
    );

  isSSB(tmpId)
    ? $("#t" + tmpId + "prodtitle")
      .off("keyup")
      .on("keyup", function () {
        $("#t" + tmpId + "_error_title").addClass("bedsnone");
        $("#t" + tmpId + "prodtitle").removeClass("mb-erbrd nb-erbrd");
      })
    : "";
};

ProductName.prototype.handleButton = function (tmpId) {
  if (Bl04(tmpId)) ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};

ProductName.prototype.AddBlur = function (tmpId) {
  var that = this;
  $("#t" + tmpId + "prodtitle")
    .off("blur.blEnqProdNameBlur")
    .on(
      "blur.blEnqProdNameBlur",
      {
        param1: tmpId,
        param2: "blur",
        pnObject: that,
      },
      that.checkMcatIDJquery
    );
};

ProductName.prototype.RemoveBlur = function (tmpId) {
  $("#t" + tmpId + "prodtitle").off("blur.blEnqProdNameBlur");
};

ProductName.prototype.handleEvents = function (tmpId) {
  this.IsEnterPressed = false;
  var that = this;
  var BLurEvents = [];
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    ChatblfooterAns(tmpId);

    if (ReqObj.Form[tmpId].flags.autofocusPName) {
      $("#t" + tmpId + "prodtitle").focus();
    }
    if (IsChatbl(tmpId)) {
      setTimeout(function () {
        $("#t" + tmpId + "prodtitle").focus();
      }, 1800);
    } else {
      that.AddBlur(tmpId);

      // $('#t' + tmpId + 'prodtitle').off("blur.BlEnqEvent").on("blur.BlEnqEvent", { param1: tmpId, param2: "blur", pnObject: that }, that.checkMcatIDJquery);

      $("#t" + tmpId + "prodtitle")
        .off("mouseleave.BlEnqEvent")
        .on("mouseleave.BlEnqEvent", function () {
          $("#t" + tmpId + "_cls").each(function () {
            if (
              $(this).css("display") === "block" ||
              $(this).css("display") === "inline-block"
            ) {
              $(this)
                .off("mouseenter.BlEnqEvent")
                .on("mouseenter.BlEnqEvent", function (event) {
                  that.RemoveBlur(tmpId);
                });
              $(this)
                .off("mouseleave.BlEnqEvent")
                .on("mouseleave.BlEnqEvent", function () {
                  that.AddBlur(tmpId);
                });
            }
          });
        });

      $(document)
        .off("mouseenter.BlEnqEvent")
        .on(
          "mouseenter.BlEnqEvent",
          ".t" + tmpId + "_prodName",
          function (event) {
            if (
              $(this).css("display") === "block" ||
              $(this).css("display") === "inline-block"
            ) {
              that.RemoveBlur(tmpId);
            }
          }
        );

      $(document)
        .off("mouseleave.BlEnqEvent")
        .on("mouseleave.BlEnqEvent", ".t" + tmpId + "_prodName", function () {
          if (
            $(this).css("display") === "block" ||
            $(this).css("display") === "inline-block"
          ) {
            that.AddBlur(tmpId);
          }
        });

      var SubmitDisplay = $("#t" + tmpId + "_submit").css("display");
      if (SubmitDisplay === "block" || SubmitDisplay === "inline-block") {
        $("#t" + tmpId + "_submit")
          .off("mouseenter.BlEnqEvent")
          .on("mouseenter.BlEnqEvent", function () {
            that.RemoveBlur(tmpId);
          });

        $("#t" + tmpId + "_submit")
          .off("mouseleave.SubmitBtn")
          .on("mouseleave.SubmitBtn", function () {
            that.AddBlur(tmpId);
          });
      }
    }

    $("#t" + tmpId + "prodtitle")
      .off("keypress.BlEnqEvent")
      .on("keypress.BlEnqEvent", function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode === 13) {
          // if (that.isProdNameChanged)
          //   // RefactorFormArrays(tmpId);
          if (!$("#t" + tmpId + "_submit").is(":disabled")) {
            that.IsEnterPressed = true;
            $("#t" + tmpId + "prodtitle").off("blur");
            HideSuggester();
          }
        }
      });
  }
};

ProductName.prototype.setTitleSuggester = function (tmpId) {
  // $("#t" + tmpId + "prodtitle").html("");
  var that = this;
  var title_sugg = "sugg_title_" + tmpId;

  var title_count = setInterval(function () {
    if (typeof Suggester !== "undefined") {
      var ProductNameSuffix = "_prodName";
      //remove all existing product name suggestor
      $(".t" + tmpId + ProductNameSuffix).each(function () {
        $(this).remove();
      });
      //upto here
      var autocompleteClass = SetAutoCompleteClass(tmpId, ProductNameSuffix);
      var row_num = BlAutoSuggRowNum(tmpId);
      window[title_sugg] = new Suggester({
        element: "t" + tmpId + "prodtitle",
        getQuotation: false,
        onSelect: that.selectTitle,
        fields: "",
        type: "product",
        module: "BL-FORM",
        rowsToDisplay: row_num,
        recentData: 1,
        autocompleteClass: autocompleteClass,
      });
      if (JSON.stringify(title_sugg)) {
        if (
          isSet(tmpId) && isSet(ReqObj) && isSet(ReqObj.Form) &&
          isSet(ReqObj.Form[tmpId]) &&
          isSet(ReqObj.Form[tmpId].flags)
        )
          ReqObj.Form[tmpId].flags.isTitleSuggSet = true;
        clearInterval(title_count);
      }
    }
  }, 1000);
};


/***
 * Function ID - 2
 *
 * Usage: Function to fetch mcat detail
 *
 * Output: It will set Mcat-ID, Cat-ID, Type in global object
 ***/

ProductName.prototype.showMcatFilled = function (tmpId) {
  var name = "";
  if (ReqObj.Form[tmpId].prodName !== "") {
    if (
      typeof ReqObj.Form[tmpId].prodServ !== "undefined" &&
      ReqObj.Form[tmpId].prodServ !== "C"
    ) {
      name = ReqObj.Form[tmpId].prodName;
    } else if (
      ReqObj.Form[tmpId].prodServ === "C" &&
      ReqObj.Form[tmpId].formType === "BL"
    )
      name = ReqObj.Form[tmpId].prodName;
  }
  if (!IsChatbl(tmpId))
    if (isSSB(tmpId) && ReqObj.Form[tmpId].flags.prodSecNochange) {
      ReqObj.Form[tmpId].flags.prodSecNochange = false;
    } else {
      $("#t" + tmpId + "prodtitle").val(name);
      /*if(isSSB(tmpId) && isnewSSB(tmpId) && $('#t' + tmpId + 'prodtitle').val() !== "")
      $('#t' + tmpId + 'prodtitle').parent().addClass("focused");*/
    }
};

function RequirementDtl(tmpId) {
  this.className = "RequirementDtl";
  this.RequirementDtlObj = {
    OuterWrapper: "",
    UserInput: "",
    ClosingWrapper: "",
    Label: "",
  };
  this.Rdbox = "";
  this.setValue = "";
  this.countclick = 0;
  this.QuestionArray = [];
}
RequirementDtl.prototype.hasHtml = function (RdObj) {
  if (isSet(RdObj)) {
    ReqObj.Form[RdObj.tmpId].ReqDtl.HasHtmlCalled = true; // whether hashtml called or not.
    if (this.getHtml(RdObj.tmpId) !== "") {
      ReqObj.Form[RdObj.tmpId].flags.isReqHtmlPresent = true;
      if (
        isSet(RdObj.object.countlastUpdated) &&
        RdObj.object.countlastUpdated === false
      )
        ReqObj.Form[RdObj.tmpId].currentclassCount++;
      this.ifHtmlPresent(RdObj);
    } else {
      ReqObj.Form[RdObj.tmpId].flags.isReqHtmlPresent = false;
      this.ifHtmlNotPresent(RdObj);
    }
  }
};

RequirementDtl.prototype.displayHtml = function (tmpId) {
  if (isSet(tmpId)) {
    ReqObj.Form[tmpId].flags.isDescDivShown = true;
    this.getHtml(tmpId);
    if (!IsChatbl(tmpId)) {
      var clsnm = isSSB(tmpId)
        ? ssbClass("wrprClass", tmpId)
        : isBlInline(tmpId)
          ? isBlInlineFr(tmpId)
            ? "fmb15"
            : "idsf pfstrt mb20 inTxAr"
          : isInactiveBL(tmpId)
            ? "bepdpreq bemb10 bemt5"
            : "bepdpreq bemt15 ";
      var cdiv =
        isSSB(tmpId) ||
          (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
            tmpId.substring(0, 2) === "09")
          ? "<div id='t" + tmpId + "_cdiv'></div>"
          : "";
      if (
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0 &&
        isImageVidEnq(tmpId)
      )
        cdiv = "";
      var RequirementDtlSuffixHtmlObj = {
        SuffixOuterHtml:
          "<div  id='t" + tmpId + "_reqbox' class='" + clsnm + "'>",
        SuffixClosingHtml: "</div>" + cdiv,
        suffix: "_reqbox",
      };
      this.Rdbox = MakeWrapper(
        [[this.RequirementDtlObj]],
        tmpId,
        RequirementDtlSuffixHtmlObj,
        ""
      );
    } else {
      this.RdboxQues = MakeWrapper(
        [[this.RequirementDtlObj]],
        tmpId,
        WrapperObj(
          "<div  id='t" + tmpId + "_reqbox' class='cbl_ques cbl_vh'>",
          "</div>",
          "_reqbox"
        ),
        "ques"
      );

      this.RdboxInput = MakeWrapper(
        [[this.RequirementDtlObj]],
        tmpId,
        WrapperObj(
          "<div  id='t" +
          tmpId +
          "_reqboxInput ' class='cbl_dtls cbl_name cbl_df t" +
          tmpId +
          "_userInput cbl_br10 dn'>",
          "</div>",
          "_reqbox"
        ),
        "input"
      );

      this.Rdbox = this.RdboxQues + this.RdboxInput;

      return [this.RdboxQues, this.RdboxInput];
    }

    return [this.Rdbox];
  }
};
RequirementDtl.prototype.ifHtmlPresent = function (RdObj) {
  RdObj.that.NumberofClassCalled -= 1;
  AttachObject(RdObj.object, RdObj.tmpId);
  if (isSet(RdObj.AfterService)) {
    for (var i = 0; i < RdObj.AfterService.length; i++) {
      RdObj.that.MakeSeq(RdObj.AfterService[i], RdObj.tmpId);
    }
  }
  if (RdObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(RdObj, RdObj.tmpId);
  }
};

RequirementDtl.prototype.ifHtmlNotPresent = function (RdObj) {
  if (RdObj.hasFallback) {
    CreateSeq(RdObj.FallbackObj);
  }
};

RequirementDtl.prototype.getHtml = function (tmpId) {
  this.getInput(tmpId);
  this.getLabel(tmpId);
};

RequirementDtl.prototype.getInput = function (tmpId) {
  //fghdjhggg
  var input = "";
  var placeholdertext = this.getPlaceHolderText(tmpId);
  if (IsChatbl(tmpId)) {
    input +=
      "<input class='cbl_name cbl_txt' id = 't" +
      tmpId +
      "_reqBoxTemplates' placeholder='" +
      placeholdertext +
      "'></input>";
    // only for RequirementDtl input
    if (ReqObj.Form[tmpId].currentScreen === "RequirementDtl") {
      var FormId = "#t" + tmpId + "_newblchatReply";
      if ($(FormId).children(".cbl_resend.cbl_skip")) {
        $(FormId).children(".cbl_resend.cbl_skip").remove();
      }
      input += skipDiv1(tmpId); //chat bl bug
    }
  } else {
    var stickycss = isSticky(tmpId) ? "FM_be-slbox" : "be-slbox";
    var cls =
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
        tmpId.substr(0, 2) !== "01" &&
        currentISO() !== "IN"
        ? stickycss + " be-txtarea blFh90"
        : stickycss + " be-txtarea";

    if (isInactiveBL(tmpId)) {
      cls += " cpNm cbl_br8 wid_600"
    }
    input += isSSB(tmpId)
      ? isnewSSB(tmpId)
        ? "<textarea type='text'  id='t" +
        tmpId +
        "_reqBoxTemplates' placeholder='" +
        placeholdertext +
        "'></textarea>"
        : "<div class='mb-InCon'><textarea type='text'  id='t" +
        tmpId +
        "_reqBoxTemplates' placeholder='" +
        placeholdertext +
        "'></textarea></div>"
      : isBlInline(tmpId) && !isBlInlineFr(tmpId)
        ? returnContainer("", "", "pflx1", "", "", "") +
        returnContainer("", "", "pr", "", "", "") +
        "<textarea  id='t" +
        tmpId +
        "_reqBoxTemplates' placeholder='" +
        placeholdertext +
        "'></textarea></div>"
        : returnContainer("", "", "betarea", "", "", "") +
        returnTextarea("t" + tmpId, "_reqBoxTemplates", cls, placeholdertext);
  }

  input += "</div>";
  this.RequirementDtlObj["UserInput"] = input;
};

RequirementDtl.prototype.getPlaceHolderText = function (tmpId) {
  if (isBlInline(tmpId) || (isSSB(tmpId) && isnewSSB(tmpId))) {
    return "Additional details about your requirement...";
  }
  if (currentISO() !== "IN") {
    /*if(isSSB(tmpId) && isnewSSB(tmpId))
    return "";*/
    if (IsChatBLInline(tmpId)) return "You can enter specific details here..";
    return "Briefly describe what you are looking to buy...";
  }
  if (isOtherEnq(tmpId)) {
    return "Additional details about your requirement...";
  }
  if (IsChatbl(tmpId)) {
    return "You can enter specific details here...";
  } else if (currentISO() === "IN") {
    return "";
  }
  return "";
};

RequirementDtl.prototype.getLabel = function (tmpId) {
  if (!IsChatbl(tmpId))
    this.RequirementDtlObj["Label"] =
      "<div class='be-erbx beerrp6 bedsnone' id='t" +
      tmpId +
      "_textarea_error'><div id='t" +
      tmpId +
      "_textarear_cont' data-role='content'>Please enter your requirement in Detail</div><a class='be-erarw' data-role='arrow'></a></div>";
  var LabelObj = {
    lblClass: isBlInline(tmpId)
      ? isBlInlineFr(tmpId)
        ? "fs15 cl11 wf"
        : ""
      : isSticky(tmpId)
        ? "FM_be-lbl"
        : "be-lbl",
    labelId: "t" + tmpId + "_textarea",
    QuestionDesc: isBlInline(tmpId)
      ? "Briefly describe your requirement"
      : "Requirement Details",
    flag: "1",
  };
  if (
    isOtherEnq(tmpId) &&
    tmpId.substring(0, 2) === "09" &&
    (ReqObj.Form[tmpId].disableIsq === "1" ||
      ReqObj.Form[tmpId].IsqArray === [] ||
      ReqObj.Form[tmpId].IsqArray === null)
  )
    LabelObj["QuestionDesc"] = "Write your message here";
  this.RequirementDtlObj["Label"] = isSSB(tmpId)
    ? "<label class='" +
    ssbClass("reqBxLbl", tmpId) +
    "'>" +
    LabelObj["QuestionDesc"] +
    "</label>"
    : MakeLabel(LabelObj, "", tmpId);
};

RequirementDtl.prototype.defaultEvents = function (tmpId) {
  if (isSet(tmpId)) {
    //next->submit
    //hide pns unidentified user
    if (isPnsEnq(tmpId) ) $(".pnsEnq").show();
    if ( EnqPopupDIR(tmpId) && ReqObj.Form[tmpId].toShowMsg && $("#yajaca").css("display") == "none" ) {
      $("#yajaca").show();
      $( "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input" ).addClass("toConv");
      $("input.toConv").attr("value", "Submit");
      ReqObj.Form[tmpId].toShowMsg = 0;
      ReqObj.Form[tmpId].msgFromOtp = 0;
    }
    //mob track
    if(currentISO() === "IN"){
      if(isSet(ReqObj.Form[tmpId].mobEntered) && ReqObj.Form[tmpId].mobEntered==1){    
        mobEnteredTrack(tmpId,"ISQ");       
      }
    }
    else{
      if(isSet(ReqObj.Form[tmpId].emailEntered) && ReqObj.Form[tmpId].emailEntered==1){    
        emailEnteredTrack(tmpId,"ISQ");       
      }
    }

    this.handleUI({
      data: {
        tmpId: tmpId,
        todo: "defaults",
        obj: this,
      },
    });
    ChatblfooterAns(tmpId);
    var RdEl = $("#t" + tmpId + "_reqBoxTemplates");
    if (StaticQuesForeignUser(tmpId) && !IsChatbl(tmpId)) {
      var attrdiv = $("#t" + tmpId + "_reqBoxTemplates").attr("isqattr");
      if (attrdiv === "true") {
        RdEl.height(100);
        RdEl.css("line-height", "16px");
      } else RdEl.height(80);
    }

  // get more photos form changes //new gmp
    var pdname = typeof ReqObj.Form[tmpId].prodDispName !== "undefined" &&
                 ReqObj.Form[tmpId].prodDispName !== "" &&
                 ReqObj.Form[tmpId].prodDispName !== null &&
                 ReqObj.Form[tmpId].prodDispName !== "null"
                 ? ReqObj.Form[tmpId].prodDispName
                 : isSet(ReqObj.Form[tmpId].prodName)? ReqObj.Form[tmpId].prodName : "";

    if (isSet(ReqObj.Form[tmpId].ReqDtlBox)){

          if(getMorePh(tmpId)){
              RD_prefilled = "Please share the latest Photos of " + pdname ;
              RdEl.text("Please share the latest Photos of " + pdname);
          }
          else{
              RdEl.text(ReqObj.Form[tmpId].ReqDtlBox);
          }

    }
    else{
          if(getMorePh(tmpId)){
              RD_prefilled = "Please share the latest Photos of " + pdname ;
              RdEl.text("Please share the latest Photos of " + pdname);
          }
          else{
              ReqObj.Form[tmpId].ReqDtlBox = "";
          }
    }

  //ends here 

    RdEl.off("blur").on("blur", function (event) {
      ReqObj.Form[tmpId].ReqDtlBox = $("#t" + tmpId + "_reqBoxTemplates").val();
    });
    if (ReqObj.Form[tmpId].afflId === "-126")
      currentISO() !== "IN" ? RdEl.attr("placeholder","Briefly describe what you are looking to buy...") : RdEl.attr("placeholder", "Type your message here...");
    RdEl.on("focus", function () {
      var errorcls = isSSB(tmpId) ? isnewSSB(tmpId) ? "nb-erbrd" : "mb-erbrd" : "highlight-err";
      RdEl.removeClass(errorcls);
      $("#t" + tmpId + "_reqBoxTemplates_err").addClass("bedsnone");
      $("#t" + tmpId + "_textarea").removeClass("redc");
      $("#t" + tmpId + "_textarea_error").addClass("bedsnone");
    });
    if (IsChatbl(tmpId)) {
      setTimeout(function () {
        RdEl.focus();
      }, 1800);
    }
  }
  if ( !Enq09(tmpId) || (Enq09(tmpId) && $("#t" + tmpId + "_reqbox").length > 0 && currentISO() !== "IN") )
    manipulateWidth(tmpId, ReqObj.Form[tmpId].cName.cnameId);
  if ( (isSSB(tmpId) || (isImageVidEnq(tmpId) && (ReqObj.Form[tmpId].isQtutShown === true || (ReqObj.Form[tmpId].isQtutShown === false && ReqObj.Form[tmpId].cName.qtut === false)))) && currentISO() !== "IN")
    if (!Enq09(tmpId)) onCName(tmpId, "", "rbox");
  if (isSSB(tmpId)) onURLName(tmpId);
  get_buyer_info(tmpId);
  if (imeshExist() !== "" && !isInactiveBL(tmpId))
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");
};

RequirementDtl.prototype.handleHeading = function (tmpId) {
  ReqObj.Form[tmpId].ctaheadingappend = false;
  if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq"){
    if(isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0){
      $("#blheading").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
    else{
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
  }
  else {

    if ( ReqObj.Form[tmpId].currentScreen.toLowerCase() === "isqrequirementdtl" || ReqObj.Form[tmpId].currentScreen.toLowerCase() === "isqrequirementdtlmoredetails") {
      if ( $("#isq_first_screen").attr("type") === "hidden" && $("#isq_first_screen").attr("value") === "Screen1" ) {
        if (ReqObj.Form[tmpId].IsqLength < 3) {
          ReqObj.Form[tmpId].ctaheadingappend = ReqObj.Form[tmpId].FormSequence.StepCounter === 0 ? true : false;
          if ( isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0 )
            $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
          else
            $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "Isq"));
        } else {
          if ( isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0)
            $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
          else {
            $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "isqrequirementdtl"));
          }
        }
      } else
        $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "isqrequirementdtl"));
    } else if ( ReqObj.Form[tmpId].currentScreen.toLowerCase() === "requirementdtl" || ReqObj.Form[tmpId].currentScreen.toLowerCase() === "requirementdtlrequirementdtl" || ReqObj.Form[tmpId].currentScreen.toLowerCase() === "requirementdtlmoredetails" ) {
      if ( $("#isq_first_screen").attr("type") === "hidden" && $("#isq_first_screen").attr("value") === "Screen1")
        $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "isqrequirementdtl"));
      else
        $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "requirementdtl"));
    }
  }
};

RequirementDtl.prototype.handleButton = function (tmpId) {
  ButtonNameUI("requirementdtl", tmpId);
};

RequirementDtl.prototype.handleEvents = function (event) { };

RequirementDtl.prototype.handleUI = function (event) {
  var tmpId = event.data.tmpId;
  var todo = event.data.todo;
  var obj = event.data.obj;
  if (todo === "defaults") {
    if (obj.setValue === "yes") {
      if ($("#t" + tmpId + "_reqBoxTemplates").val() === "") {
      }
    }
  }
};

function addBlLoader(tmpId, type) {
  var NewTempId = tmpId;
  if (NewTempId !== "" && IsChatbl(NewTempId)) {
    if (!($("#t" + tmpId + "_typing").length > 0)) {
      if (IsChatbl(tmpId)) {
        // $("#t" + NewTempId + "_bl_form").append(appendChatLoader(tmpId, type, "blchat-lodr2"));
        $("#t" + NewTempId + "_new_chatbl").append(
          appendChatLoader(tmpId, type, "txt_area  cbl_bg1")
        );
      }
    }
    //$("#t" + NewTempId + "_bl_form").append(appendChatLoader(tmpId, type));
  } else {
    // if (isSet(ReqObj.Form[tmpId].FormSequence) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) {
    //   var templateId = tmpId.substring(0, 2);
    //   var NewTempId = tmpId.replace(templateId, "09");
    // }
    var el = $("#t" + NewTempId + "_belodr");
    if (el.hasClass("bedsnone")) {
      el.removeClass("bedsnone");
    }
  }
}
function removeBLLoader(tmpId, type) {
  var NewTempId = isSet(tmpId) ? tmpId : "";
  if (NewTempId !== "" && IsChatbl(NewTempId)) {
    if (isSet(type) && type.toLowerCase() === "left")
      var ClassName = IsChatbl(tmpId) ? "cbl_ques" : "";
    else var ClassName = "txt-cnt";
    var element = $("#t" + NewTempId + "_typing");
    if (element.hasClass(ClassName)) element.remove();
  } else {
    // if (isSet(ReqObj.Form[tmpId].FormSequence) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) {
    //   var templateId = tmpId.substring(0, 2);
    //   NewTempId = tmpId.replace(templateId, "09");
    // }

    var el = $("#t" + NewTempId + "_belodr");
    if (!el.hasClass("bedsnone")) {
      el.addClass("bedsnone");
    }
  }
}