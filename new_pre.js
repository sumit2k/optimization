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

ContactDetail.prototype.displayAnswer = function (tmpId) {
  var key = this.returnKey(tmpId);
  var name = "";

  if (this.name === 1 && this.email === 0 && this.city === 0) {
    name = ReturnBlUserName(tmpId);
  }
  var classtotest = chatBlClass(tmpId, "right");
  var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
  return [
    ConversationRightWrapper(tmpId, returnAnswer(tmpId, key), {
      classtotest: classtotest,
      leftright: leftright,
    }),
    name,
  ];
};
ContactDetail.prototype.SaveDetails = function (tmpId, event) {
  if (IsChatbl(tmpId) || isSSB(tmpId)) {
    ReqObj.Form[tmpId].UserInputs["Name"] = $(
      "#t" + tmpId + "_q_first_nm" + this.classCount
    ).val();
    ReqObj.Form[tmpId].UserInputs["Mobile"] = $(
      "#t" + tmpId + "_q_mobile_f" + this.classCount
    ).val();
    ReqObj.Form[tmpId].UserInputs["Email"] = $(
      "#t" + tmpId + "_q_email_in" + this.classCount
    ).val()
      ? $("#t" + tmpId + "_q_email_in" + this.classCount)
        .val()
        .trim()
      : "";
    ReqObj.Form[tmpId].UserInputs["City"] =
      isSet(ReqObj.Form[tmpId].UserInputs["City"]) &&
        ReqObj.Form[tmpId].UserInputs["City"] !== ""
        ? ReqObj.Form[tmpId].UserInputs["City"]
        : $("#t" + tmpId + "_q_city_oth" + this.classCount).val();
    IsChatBLInline(tmpId) &&
      isSet($("#t" + tmpId + "_q_city_oth" + this.classCount).val()) &&
      isSet($(".t0801_CitySuggestor"))
      ? $(".t0801_CitySuggestor").css("display", "none")
      : "";
    /* OptiNeeded-this change is not related to save details functions - write it in appropriate place */
  }
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
ContactDetail.prototype.validate = function (tmpId) {
  this.classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail);
  ReqObj.Form[tmpId].nec.classCount = this.classCount;
  this.cookies(tmpId);
  var isValid = this.validateUserDetails(tmpId);
  if (isValid === true) this.captureDetails(tmpId);
  return isValid;
};
ContactDetail.prototype.onSubmit = function (tmpId) {
  // $("#yajaca").hide(); // click away message
  var CDObject = PreAjax("ContactDetail", tmpId);
  this.sendRequest(CDObject, tmpId);
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

ContactDetail.prototype.validateUserDetails = function (tmpId) {
  if (!isSet(validation)) createGlobalObject();
  var validate = "";
  var that = this;
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var StepNumber =
    ReqObj.Form[tmpId].OnCloseStep && isSet(ReqObj.Form[tmpId].FormSequence)
      ? ReqObj.Form[tmpId].FormSequence.StepCounter +
      1 +
      ReqObj.Form[tmpId].FormSequence.OnCloseCounter +
      1
      : ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
  ReqObj.Form[tmpId].errorDivId = "";
  if (
    $("#t" + tmpId + "_q_first_nm" + that.classCount).length > 0 &&
    (that.nonMandatory === "" ||
      (isSet(that.nonMandatory) && that.nonMandatory["name"] === false) ||
      $("#t" + tmpId + "_q_first_nm" + that.classCount).val() !== "" ||
      isSSB(tmpId))
  ) {
    validate = validation.isNameValid(
      $("#t" + tmpId + "_q_first_nm" + that.classCount).val()
    );
    if (!validate["type"]) {
      ReqObj.Form[tmpId].validateArray.push(
        "t" + tmpId + "_q_first_nm" + that.classCount
      );
      var nametypeele =
        isOtherEnq(tmpId) &&
          tmpId.substring(0, 2) !== "09" &&
          ReqObj.Form[tmpId].FormSequence.StepCounter < 1
          ? "inline"
          : "";
      blenqGATracking(form_type, "Validation_Error_Name|" + StepNumber + "|ContactDetail", getEventLabel(), 0, tmpId);
      that.handleUI({
        data: {
          tmpId: tmpId,
          elementhtml: "_fname_errmsg" + that.classCount,
          elementremoveClass: "_error_first_name" + that.classCount,
          elementaddClass: "_q_first_nm" + that.classCount,
          validate: validate,
          todo: "showError",
          formType: ReqObj.Form[tmpId].formType.toLowerCase(),
          chatelement: "_name-lb" + that.classCount,
          isinline: nametypeele,
        },
      });
      if (isSet(validate["specialcase"]) && validate["specialcase"] === true) {
        ReqObj.UserDetail["fn"] = "";
      }
      var err_obj = validate;
    }
  }

  if (that.usercountry === "IN") {
    if ($("#t" + tmpId + "_q_email_in" + that.classCount).length > 0) {
      var email_val = $("#t" + tmpId + "_q_email_in" + that.classCount).val();
      validate = validation.isEmailValid(email_val);
      if (!validate["type"]) {
        ReqObj.Form[tmpId].validateArray.push(
          "t" + tmpId + "_q_email_in" + that.classCount
        );
        var nametypeele =
          isOtherEnq(tmpId) &&
            tmpId.substring(0, 2) !== "09" &&
            ReqObj.Form[tmpId].FormSequence.StepCounter < 1
            ? "inline"
            : "";
        blenqGATracking(form_type, "Validation_Error_Email|" + StepNumber + "|ContactDetail", getEventLabel(), 0, tmpId);
        that.handleUI({
          data: {
            tmpId: tmpId,
            elementhtml: "_email_errmsg" + that.classCount,
            elementremoveClass: "_err_email" + that.classCount,
            elementaddClass: "_q_email_in" + that.classCount,
            validate: validate,
            todo: "showError",
            formType: ReqObj.Form[tmpId].formType.toLowerCase(),
            chatelement: "_email-lb" + that.classCount,
            isinline: nametypeele,
          },
        });
        if (
          isSet(validate["specialcase"]) &&
          validate["specialcase"] === true
        ) {
          ReqObj.UserDetail["em"] = "";
        }
        err_obj = validate;
      }
    }
    if ($("#t" + tmpId + "_q_city_oth" + that.classCount).length > 0) {
      if (
        isSSB(tmpId) &&
        $("#t" + tmpId + "_q_city_oth" + that.classCount)
          .parent()
          .parent()
          .hasClass("cbl_vh")
      ) {
        return true;
      }
      validate = validation.isCityValid(
        $("#t" + tmpId + "_q_city_oth" + that.classCount).val()
      );
      if (!validate["type"]) {
        ReqObj.Form[tmpId].validateArray.push(
          "t" + tmpId + "_q_city_oth" + that.classCount
        );
        var nametypeele =
          isOtherEnq(tmpId) &&
            tmpId.substring(0, 2) !== "09" &&
            ReqObj.Form[tmpId].FormSequence.StepCounter < 1
            ? "inline"
            : "";
        blenqGATracking(form_type, "Validation_Error_City |" + StepNumber + "|ContactDetail", getEventLabel(), 0, tmpId);
        that.handleUI({
          data: {
            tmpId: tmpId,
            elementhtml: "_city_errmsg" + that.classCount,
            elementremoveClass: "_error_city" + that.classCount,
            elementaddClass: "_q_city_oth" + that.classCount,
            validate: validate,
            todo: "showError",
            formType: ReqObj.Form[tmpId].formType.toLowerCase(),
            chatelement: "_for-city-lb" + that.classCount,
            isinline: nametypeele,
          },
        });
        if (
          isSet(validate["specialcase"]) &&
          validate["specialcase"] === true
        ) {
          ReqObj.UserDetail["cityname"] = "";
        }
        err_obj = validate;
      }
    }
  } else {
    if ($("#t" + tmpId + "_q_mobile_f").length > 0) {
      validate = validation.isMobileChValid(
        $("#t" + tmpId + "_q_mobile_f").val()
      );
      if (!validate["type"]) {
        var nametypeele =
          isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter < 1
            ? "inline"
            : "";
        that.handleUI({
          data: {
            tmpId: tmpId,
            elementhtml: "_mobile_errmsg" + that.classCount,
            elementremoveClass: "_error_mobile" + that.classCount,
            elementaddClass: "_q_mobile_f" + that.classCount,
            validate: validate,
            todo: "showError",
            formType: ReqObj.Form[tmpId].formType.toLowerCase(),
            chatelement: "_mobile-lb" + that.classCount,
            isinline: nametypeele,
          },
        });
        if (
          isSet(validate["specialcase"]) &&
          validate["specialcase"] === true
        ) {
          ReqObj.UserDetail["mb1"] = "";
        }
        err_obj = validate;
      }
    }
  }
  if (isSet(err_obj) && !err_obj["type"]) return false;
  else return true;
};

ContactDetail.prototype.getData = function (tmpId, which) {
  var that = this;
  this.cookies(tmpId);
  var formType = ReqObj.Form[tmpId].formType.toLowerCase();
  var data = {};
  var iso = currentISO();
  var cityid = usercookie.getParameterValue(this.imeshCookie, "ctid");
  var ctid =
    IsChatbl(tmpId) || isSSB(tmpId)
      ? ReqObj.Form[tmpId].UserInputs["CityId"]
      : ReqObj.UserDetail["ctid"];
  data["s_city_id"] = isSet(ctid) && ctid !== "" ? ctid : cityid;
  if (!isSet(data["s_city_id"]) || data["s_city_id"] === "") {
    ReqObj.Form[tmpId].cityOth =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["City"]
        : ReqObj.UserDetail["ctoth"];
  }
  var name =
    IsChatbl(tmpId) || isSSB(tmpId)
      ? ReqObj.Form[tmpId].UserInputs["Name"]
      : ReqObj.UserDetail["fn"] !== ""
        ? ReqObj.UserDetail["fn"]
        : $(
          "#t" + tmpId + "_q_first_nm" + ReqObj.Form[tmpId].nec.classCount
        ).val();
  name = isSet(name) ? name.trim() : "";
  if (name) {
    if (name.indexOf(" ") !== -1) {
      var fn = name.substr(0, name.indexOf(" "));
      fn.trim();
      $("#t" + tmpId + "_q_first_nm_hidden").val(fn);
      var ln = name.substr(name.indexOf(" ") + 1);
    } else $("#t" + tmpId + "_q_first_nm_hidden").val(name);
  }
  data["s_first_name"] = isSet(fn) && fn !== "" ? fn : name;
  data["s_last_name"] = isSet(ln) && ln !== "" ? ln : "";

  if (iso === "IN") {
    data["s_email"] =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["Email"]
        : ReqObj.UserDetail["em"];
    data["s_city_name"] =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["City"]
        : ReqObj.UserDetail["cityname"];
    var primary = usercookie.getParameterValue(this.imeshCookie, "mb1");
    data["s_mobile"] =
      primary !== ""
        ? primary
        : IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["PrimaryInfo"]
          : ReqObj.UserDetail["mb1"];
  } else {
    data["s_mobile"] =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["Mobile"]
        : ReqObj.UserDetail["mb1"]; // check for foreign users..
    var primary = usercookie.getParameterValue(this.imeshCookie, "em");
    data["s_email"] =
      primary !== ""
        ? primary
        : IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["PrimaryInfo"]
          : ReqObj.UserDetail["em"];
  }
  data["s_glusrid"] = usercookie.getParameterValue(this.imeshCookie, "glid");
  data["curr_page_url"] = window.location.href;
  data["s_ip"] = usercookie.getParameterValue(this.iplocCookie, "gip");
  data["s_ip_country"] = usercookie.getParameterValue(
    this.iplocCookie,
    "gcnnm"
  );
  data["s_ip_country_iso"] = this.geoip_country_iso;
  data["flag"] = ReqObj.Form[tmpId].formType;
  data["modid"] = modIdf;
  data["s_companyName"] =
    isSet(ReqObj.Form[tmpId].mdObjErr) &&
      $.inArray(0, ReqObj.Form[tmpId].mdObjErr) !== -1
      ? ""
      : isSet(ReqObj.Form[tmpId].companyName) &&
        ReqObj.Form[tmpId].companyName !== ""
        ? ReqObj.Form[tmpId].companyName
        : "";
  data["gst"] =
    isSet(ReqObj.Form[tmpId].gst.number) &&
      parseInt(ReqObj.Form[tmpId].gst.number) !== 0
      ? ReqObj.Form[tmpId].gst.number
      : "";
  data["url"] =
    isSet(ReqObj.Form[tmpId].mdObjErr) &&
      $.inArray(2, ReqObj.Form[tmpId].mdObjErr) !== -1
      ? ""
      : isSet(ReqObj.Form[tmpId].url.name) &&
        parseInt(ReqObj.Form[tmpId].url.name) !== ""
        ? ReqObj.Form[tmpId].url.name
        : "";
  data["s_country_iso"] =
    iso !== ""
      ? iso
      : usercookie.getParameterValue(usercookie.getCookie("iploc"), "gcniso");
  data["s_email"] =
    isSet(data["s_email"]) && data["s_email"].match(/\*/) !== null
      ? ""
      : data["s_email"];
  data["s_mobile"] =
    isSet(data["s_mobile"]) && data["s_mobile"].match(/\*/) !== null
      ? ""
      : data["s_mobile"];
  data["replica"] = {
    mobile: data["s_mobile"],
    email: data["s_email"],
    cname: data["s_companyName"],
    url: data["url"],
    name: data["s_first_name"],
    city: data["s_city_name"],
    gst: data["gst"],
  };
  return ObjectTrim(data);
};

ContactDetail.prototype.sendRequest = function (CDObject, tmpId, type) {
  var data = this.getData(tmpId);
  var iso = currentISO();
  var toFire = false;
  fireCityTracking(tmpId, data);
  if (
    (iso !== "IN" &&
      (data["s_first_name"] !== "" ||
        data["s_mobile"] !== "" ||
        data["url"] !== "" ||
        data["s_companyName"] !== "")) ||
    (iso === "IN" &&
      (data["s_first_name"] !== "" ||
        data["s_email"] !== "" ||
        data["s_city_name"] !== "" ||
        data["gst"] !== "" ||
        data["s_companyName"] !== ""))
  ) {
    toFire = true;
  }
  if (toFire) {
    var _data = this.multipleHitCases(data, type);
    data = isEnq(tmpId) || isBl(tmpId) ? _data.data : data;
    data["replica"] = "";
    data = ObjectTrim(data);
    fireAjaxRequest({
      data: {
        ga: {
          s: true,
          f: true,
          gatype: "GlusrUpdate",
          source: "",
        },
        tmpId: tmpId,
        ajaxObj: {
          obj: CDObject,
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
        type: 6,
      },
    });
    if ((isEnq(tmpId) || isBl(tmpId) || IsChatbl(tmpId)) && _data.hitagain === true) {
      this.sendRequest(CDObject, tmpId, "again");
    }
  }
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

ContactDetail.prototype.EventIfScreenPresent = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    this.handleHeading(tmpId);
    ButtonNameUI("isq", tmpId);
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

//please correct this code for ecom product
FormSeq.prototype._screen2 = function (tmpId, typeOfForm) {
  currentscreen_no = 2;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  // firefox  bug
  const Elem = EnqPopupDIR(tmpId) && (navigator.userAgent.indexOf('Firefox') !== -1) ? 1 : 0 ;
  if(Elem){
    $("#t" + tmpId + "_submitdiv").css({
      "text-align": "center",
    });
  } 
  else{
    "";
  }
  // 
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };
  var _classObj = null;
  var _case = data.imeshcookie && isSet(data.iso) && _contactScreen(data.iso) && (data.iso === "IN" || (data.iso !== "IN" && (ReqObj.Form[tmpId].FormSequence._stepCounter < 0 || (Enq04(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter < 1)))) ? 0 : -1;

  if (!Bl09(tmpId) && ((!isImageVidEnq(tmpId) && _that._stepCounter === -1) || ((isImageVidEnq(tmpId) || Enq04(tmpId) || Bl01(tmpId) || Bl04(tmpId)) && _that._stepCounter === 0)) && isSet(data.iso) && data.iso === "IN" && _mandatDetailsFilled() && ((isEnq(tmpId) && isSecondEnq(tmpId)) || ((Bl01(tmpId) || Bl04(tmpId)) && isSecondBl())) && ReqObj.UserDetail.uv === "")
    _case = -1;
  if ((Enq04(tmpId) || Bl04(tmpId)) && isSet(data.iso) && data.iso !== "IN" && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "")
    _case = -1;
  if (currentISO() !== "IN" && ReqObj.UserDetail.mb1 === "") _case = 0;
  if (!(checkblockedUser() && im_issExist() === "") && _case !== -1 && ReqObj.Form[tmpId].flags.isNECShown === false) {
    classObj = isBl(tmpId) && data.imeshcookie !== "" && ReqObj.Form[tmpId].FormSequence._stepCounter < 0
      ? isImageVidEnq(tmpId) && isEcomProduct(tmpId)
        ? { classArray: ["ProductName"] }
        : { classArray: ["ProductName", "ContactDetail"] }
      : isImageVidEnq(tmpId) && isEcomProduct(tmpId)
        ? { classArray: ["enquirenow"] }
        : { classArray: ["ContactDetail"] };
    _classObj = {
      numberOfClassCalled: classObj.classArray.length,
      hooks: { 1: { pre: [_that._screen3], post: [] } },
      classArray: classObj.classArray,
      array: _makeDataAndServiceArr(classObj.classArray, data.array, 1),
      that: _that,
      tmpId: tmpId,
      afterService: _makeDataAndServiceArr(classObj.classArray, [], 2),
      extraKeys: _makeExtraKey(classObj.classArray, null),
      leadServiceObj:
        isImageVidEnq(tmpId) &&
          ReqObj.UserDetail.uv === "" &&
          isSecondEnq(tmpId) &&
          _that._stepCounter === -1 &&
          _mandatDetailsFilled()
          ? null
          : { 1: "generate" },
      nonMandatory: { name: false },
      additionalkey: { onlastscreen: false },
    };
    if (typeOfForm === "bl" && !Bl04(tmpId) && data.imeshcookie !== "" && ReqObj.Form[tmpId].FormSequence._stepCounter < 0) {
      _classObj.hooks = {
        1: { pre: [], post: [_that._screen3] },
        2: { pre: [], post: [] },
      };
      _classObj.leadServiceObj = isSecondBl(tmpId) === false || (isSecondBl(tmpId) && ReqObj.UserDetail.uv !== "") ? { 1: "generate" } : { 1: "generate" };
    }
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else _that._switchNext(tmpId, typeOfForm);
};
FormSeq.prototype._screen3 = function (tmpId, typeOfForm) {
  currentscreen_no = 3;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  // firefox  bug
  const Elem = EnqPopupDIR(tmpId) && (navigator.userAgent.indexOf('Firefox') !== -1) ? 1 : 0 ;
  if(Elem){
    $("#t" + tmpId + "_submitdiv").css({
      "text-align": "",
    });
  } 
  else{
    "";
  }
  // 
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };
  var _classObj = null;
  var message = currentISO() === "IN" && ((isEnq(tmpId) && isSecondEnq()) || (isBl(tmpId) && isSecondBl())) && usercookie.getParameterValue(imeshExist(), "uv") !== "V" && ReqObj.Form[tmpId].isOtpShownOnFirstStep ? "second" : "";
  var _case = checkblockedUser() && im_issExist() === "" ? 2 : data.imeshcookie && isSet(data.iso) && data.iso === "IN" && usercookie.getParameterValue(data.imeshcookie, "uv") === "" ? 0 : -1;
  if (_case !== -1 && ReqObj.Form[tmpId].flags.isOtpShown === false) {
    _classObj = {
      numberOfClassCalled: 1,
      hooks: _case === 2 ? { 1: { pre: [], post: [_that._screen2] } } : { 1: { pre: [], post: [_that._screen4] } },
      classArray: ["UserVerification"],
      array: { 1: data.array },
      that: _that,
      tmpId: tmpId,
      afterService: { 1: [] },
      extraKeys: { 1: { tr: false, is: false, hf: false, fobj: null } },
      leadServiceObj: { 1: "generate" },
      message: { 1: message },
    };
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else _that._switchNext(tmpId, typeOfForm);
};
FormSeq.prototype._screen4 = function (tmpId, typeOfForm) {

  currentscreen_no = 4;
  if (direnqImage(tmpId)) {
    $("#t" + tmpId + "_isqdetails" + "0R").addClass("bedsnone");
  }
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
    md: { ask: true, what: "Company Name", key: 0, ui: "old", suffix: "ocbx" },
  };
  ReqObj.Form[tmpId].IsqStep1 = ReturnCorrectVal(
    ReqObj.Form[tmpId].IsqStep1,
    3
  );
  ReqObj.Form[tmpId].IsqStepN = ReturnCorrectVal(
    ReqObj.Form[tmpId].IsqStepN,
    3
  );
  var toask = toAskCname(tmpId);
  var _classObj = null;
  var _rclassObj = {
    numberOfClassCalled: 1,
    hooks: { 1: { pre: [_that._screen5], post: [] }, 2: { pre: [], post: [] } },
    classArray: ["RequirementDtl", "MoreDetails", "BlStaticQues"],
    array: { 1: data.array, 2: data.array },
    that: _that,
    tmpId: tmpId,
    afterService: { 1: [], 2: [] },
    extraKeys: {
      1: { tr: true, is: false, hf: false, fobj: null },
      2: { tr: true, is: false, hf: false, fobj: null },
    },
    copyhooks: true,
    leadServiceObj: { 1: "generate" },
    md: { 2: data.md },
  };
  var _fallback =
    typeOfForm === "inenquiry"
      ? null
      : _that.returnClassObjects(0, _rclassObj.classArray[0], _rclassObj);
  if (Bl04(tmpId) || Bl09(tmpId)) {
    _fallback = [];
    _fallback[0] = _that.returnClassObjects(
      0,
      _rclassObj.classArray[0],
      _rclassObj
    );
    if (currentISO() !== "IN") {
      for (i = 1; i < _rclassObj.classArray.length; i++) {
        if (toask)
          _fallback[i] = _that.returnClassObjects(
            1,
            _rclassObj.classArray[i],
            _rclassObj
          );
        else {
          _fallback[i] = _that.returnClassObjects(
            1,
            _rclassObj.classArray[2],
            _rclassObj
          );
          break;
        }
      }
    }
  }
  var toCheckIsq =
    typeOfForm === "bl" &&
      ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown === true
      ? false
      : true;
  if (
    toCheckIsq &&
    ShowIsq(tmpId) &&
    parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 &&
    parseInt(ReqObj.Form[tmpId].isqMcat) !== -1
  ) {
    var specialCase =
      isImageVidEnq(tmpId) && _that._stepCounter === -1 ? true : false;
    var _case = data.imeshcookie && isSet(data.iso) && data.iso !== "IN" ? 1 : 0;
    var classObj = {
      classArray:
        specialCase === true
          ? ["EnquireNow"]
          : _case === 0
            ? pdpenq(tmpId) && !Enq04(tmpId)
              ? ["Isq", "RequirementDtl"]
              : ["Isq"]
            : isBl(tmpId)
              ? _case === 1 && ReqObj.Form[tmpId].isProdNameChanged
                ? ["Isq"]
                : toask
                  ? ShowReqBox(tmpId)
                    ? ["Isq", "RequirementDtl", "MoreDetails", "BlStaticQues"]
                    : ["Isq", "MoreDetails", "BlStaticQues"]
                  : ShowReqBox(tmpId)
                    ? ["Isq", "RequirementDtl", "BlStaticQues"]
                    : ["Isq", "BlStaticQues"]
              : typeOfForm !== "inenquiry"
                ? toask
                  ? ["Isq", "RequirementDtl", "MoreDetails"]
                  : ["Isq", "RequirementDtl"]
                : toask
                  ? ["Isq", "MoreDetails"]
                  : ["Isq"],
    };
    _classObj = {
      numberOfClassCalled: classObj.classArray.length,
      hooks:
        (_case === 0 && !pdpenq(tmpId)) || specialCase === true
          ? { 1: { pre: [_that._screen5], post: [] } }
          : {
            1: { pre: [_that._screen5], post: [] },
            2: { pre: [], post: [] },
            3: { pre: [], post: [] },
            4: { pre: [], post: [] },
          },
      classArray: classObj.classArray,
      array: _makeDataAndServiceArr(classObj.classArray, data.array, 1),
      that: _that,
      tmpId: tmpId,
      afterService: { 1: [], 2: [], 3: [] },
      extraKeys: _makeExtraKey(classObj.classArray, _fallback),
      copyhooks: true,
      leadServiceObj: { 1: "generate" },
      md:
        _case === 1 &&
          toask &&
          !(
            typeOfForm === "inenquiry" ||
            (typeOfForm == "bl" && ReqObj.Form[tmpId].isFrInline == 1)
          )
          ? { 3: data.md }
          : _case === 1 &&
            toask &&
            (typeOfForm === "inenquiry" ||
              (typeOfForm == "bl" && ReqObj.Form[tmpId].isFrInline == 1))
            ? { 2: data.md }
            : null,
    };
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else {
    _that._switchNext(tmpId, typeOfForm);
  }
};
FormSeq.prototype._screen5 = function (tmpId, typeOfForm) {
  currentscreen_no = 5;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };

  var totalisqlength = ReqObj.Form[tmpId].IsqLength;

  if (
    (showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2) || displayedisq) &&
    isNewInlineBl(tmpId)
  ) {
    totalisqlength -= 1;
  }

  if ( !pdpenq(tmpId) && !(isBl(tmpId) && ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown) && parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 && isSet(data.iso) && data.iso === "IN" && ReqObj.Form[tmpId].IsqArray !== null && ReqObj.Form[tmpId].prevCount < totalisqlength )
    _that._screen4(tmpId, typeOfForm);
  else if (ShowReqBox(tmpId)) {
    var toask = toAskCname(tmpId) && currentISO() !== "IN" ? true : false;
    var classObj = isBl(tmpId)
      ? {
        classArray: toask
          ? ["RequirementDtl", "MoreDetails", "BlStaticQues"]
          : ["RequirementDtl", "BlStaticQues"],
      }
      : {
        classArray: toask
          ? ["RequirementDtl", "MoreDetails"]
          : ["RequirementDtl"],
      };
    var _classObj = {
      numberOfClassCalled: classObj.classArray.length,
      hooks: {
        1: { pre: [_that._screen6], post: [] },
        2: { pre: [], post: [] },
        3: { pre: [], post: [] },
      },
      classArray: classObj.classArray,
      array: _makeDataAndServiceArr(classObj.classArray, data.array, 1),
      that: _that,
      tmpId: tmpId,
      afterService: { 1: [], 2: [], 3: [] },
      extraKeys: _makeExtraKey(classObj.classArray, null),
      leadServiceObj: { 1: "generate" },
      md: toask
        ? {
          2: {
            ask: true,
            what: "Company Name",
            key: 0,
            ui: "old",
            suffix: "ocbx",
          },
        }
        : null,
    };
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else if (
    isBl(tmpId) &&
    !ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown
  ) {
    if (
      currentISO() !== "IN" &&
      (Bl04(tmpId) || Bl01(tmpId)) &&
      ReqObj.Form[tmpId].isAttachmentShown === true
    )
      _that._switchNext(tmpId, typeOfForm);
    else {
      var toask = toAskCname(tmpId) && currentISO() !== "IN" ? true : false;
      var _classObj = {
        numberOfClassCalled: currentISO() !== "IN" && toask ? 2 : 1,
        hooks:
          currentISO() !== "IN" && toask
            ? {
              1: { pre: [_that._screen6], post: [] },
              2: { pre: [], post: [] },
            }
            : { 1: { pre: [_that._screen6], post: [] } },
        classArray:
          currentISO() !== "IN" && toask
            ? ["MoreDetails", "BlStaticQues"]
            : ["BlStaticQues"],
        array:
          currentISO() !== "IN" && toask
            ? { 1: data.array, 2: data.array }
            : { 1: data.array },
        that: _that,
        tmpId: tmpId,
        afterService:
          currentISO() !== "IN" && toask ? { 1: [], 2: [] } : { 1: [] },
        extraKeys:
          currentISO() !== "IN" && toask
            ? {
              1: { tr: true, is: false, hf: false, fobj: null },
              2: { tr: true, is: false, hf: false, fobj: null },
            }
            : { 1: { tr: true, is: false, hf: false, fobj: null } },
        leadServiceObj: { 1: "generate" },
        md:
          currentISO() !== "IN" && toask
            ? {
              1: {
                ask: true,
                what: "Company Name",
                key: 0,
                ui: "old",
                suffix: "ocbx",
              },
            }
            : null,
      };
      _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
      _that._objectSequence(tmpId, _classObj);
    }
  } else _that._switchNext(tmpId, typeOfForm);
};
FormSeq.prototype._screen6 = function (tmpId, typeOfForm) {
  currentscreen_no = 6;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var LastScreen = _that._returnLastScreen(tmpId);
  var contactScreen = false;
  var _extraDefault = { tr: false, is: false, hf: false, fobj: null };
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
    emptyHook: { pre: [], post: [] },
  };
  var _classObj = {
    numberOfClassCalled: 0,
    hooks: {
      1: { pre: [_that._screen7], post: {} },
      2: data.emptyHook,
      3: data.emptyHook,
    },
    classArray: [],
    array: { 1: data.array, 2: data.array, 3: data.array },
    that: _that,
    tmpId: tmpId,
    afterService: {},
    extraKeys: { 1: _extraDefault, 2: _extraDefault, 3: _extraDefault },
    md: {},
    nonMandatory: {},
  };
  if (isSet(data.iso) && _contactScreen(data.iso)) {
    contactScreen = true;
    _classObj.numberOfClassCalled += 1;
    _classObj.classArray.push("ContactDetail");
    _classObj.afterService[_classObj.numberOfClassCalled] = [
      returnPostBlEnqObject(tmpId, data.array, data.emptyHook, _that, ""),
    ];
    _classObj.md[_classObj.numberOfClassCalled] = null;
    _classObj.nonMandatory = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "" ? { name: false } : null;
    _classObj.additionalkey = { onlastscreen: true };
  }
  if (toAskCname(tmpId) && (typeof ReqObj.Form[tmpId].companyName === "undefined" || (isSet(ReqObj.Form[tmpId].companyName) && ReqObj.Form[tmpId].companyName === ""))) {
    _classObj.numberOfClassCalled += 1;
    _classObj.classArray.push("MoreDetails");
    _classObj.afterService[_classObj.numberOfClassCalled] = [];
    _classObj.md[_classObj.numberOfClassCalled] = {
      ask: true,
      what: "Company Name",
      key: 0,
      ui: "new",
      suffix: "ncbx",
    };
  }
  if (isSet(data.iso) && data.iso === "IN" && ReqObj.gst.toask === true) {
    _classObj.numberOfClassCalled += 1;
    _classObj.classArray.push("MoreDetails");
    _classObj.afterService[_classObj.numberOfClassCalled] = [];
    _classObj.md[_classObj.numberOfClassCalled] = {
      ask: true,
      what: "GST Number",
      key: 1,
      ui: "new",
      suffix: "cgst",
    };
  }
  if (isSet(data.iso) && data.iso !== "IN" && ReqObj.url.toask === true) {
    _classObj.numberOfClassCalled += 1;
    _classObj.classArray.push("MoreDetails");
    _classObj.afterService[_classObj.numberOfClassCalled] = [];
    _classObj.md[_classObj.numberOfClassCalled] = {
      ask: true,
      what: "Website Url",
      key: 2,
      ui: "new",
      suffix: "curl",
    };
  }
  if (LastScreen === "ContactDetail" && contactScreen === true && _classObj.numberOfClassCalled === 1)
    _classObj.numberOfClassCalled = 0;
  if (_classObj.numberOfClassCalled !== 0) {
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else _that._switchNext(tmpId, typeOfForm);
};

FormSeq.prototype._screen7 = function (tmpId, typeOfForm) {
  currentscreen_no = 7;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };
  var _classObj = {
    numberOfClassCalled: 1,
    hooks: { 1: { pre: [], post: [] } },
    classArray: ["ThankYou"],
    array: { 1: data.array },
    that: _that,
    tmpId: tmpId,
    afterService: { 1: [] },
    extraKeys: { 1: { tr: false, is: false, hf: false, fobj: null } },
  };
  _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
  _that._objectSequence(tmpId, _classObj);
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
  return isImageEnqDIR(tmpId) && (modIdf === "DIR");
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

Isq.prototype.EventIfScreenPresent = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    this.handleHeading(tmpId);
    ButtonNameUI("isq", tmpId);
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
Isq.prototype.SaveDetails = function (tmpId) {
  var IsqScreen = this.IsqScreen;
  SaveIsq(tmpId, "isq", IsqScreen);
  if (
    !isSSB(tmpId) &&
    ReqObj.Form[tmpId].intentCalled === false &&
    imeshExist() !== ""
  )
    toFireGeneration(tmpId);
};

Isq.prototype.BackButton = function (tmpId) {
  this.IsqScreen--;
  if (ReqObj.Form[tmpId].isret) {
    this.IsqScreen--;
    ReqObj.Form[tmpId].isret = 0;
  }
};

Isq.prototype.displayAnswer = function (tmpId) {
  if (
    IsChatbl(tmpId) &&
    isSet(ReqObj.Form[tmpId].isqans) &&
    ReqObj.Form[tmpId].isqans === false
  ) {
  } else {
    var classtotest = chatBlClass(tmpId, "right");
    var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
    return [
      ConversationRightWrapper(tmpId, GetAnswer(tmpId, "isq"), {
        classtotest: classtotest,
        leftright: leftright,
      }),
    ];
  }
};

Isq.prototype.onSubmit = function (tmpId, after) {
  var IsqObject = isSet(after) && after === true ? "" : PreAjax("Isq", tmpId);
  var hitfinserv = "";

  var isq_data = {
    modid: modIdf,
    ofr_id: ReqObj.Form[tmpId].generationId,
    b_response: ReqObj.Form[tmpId].optionsValue,
    q_desc: ReqObj.Form[tmpId].questionsDesc,
    UPDIP: "India",
    UPDURL: window.document.URL.toString().substr(0, 450),
    UPDIP_COUNTRY: "India",
    UPDATESCREEN:
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
        ? "DESKTOP ENQUIRY FORM"
        : "DESKTOP BL FORM",
    glusr_id: usercookie.getParameterValue(imeshExist(), "glid"),
    q_id: ReqObj.Form[tmpId].questionsId,
    b_id: ReqObj.Form[tmpId].optionsId,
  };

  // $("#yajaca").hide(); // click away message on pns form

  if (ReqObj.Form[tmpId].mcatId === "-1" || ReqObj.Form[tmpId].mcatId === "") {
    isq_data.mcat_id = ReqObj.Form[tmpId].catId;
  } else {
    isq_data.mcat_id = ReqObj.Form[tmpId].mcatId;
  }
  isq_data.glusr_email = "";
  if (ReqObj.Form[tmpId].formType === "Enq") {
    isq_data.enq = 1;
    isq_data.funcToCall = "Enq";
  }
  if (
    (!isSet(ReqObj.Form[tmpId].toFireIsq) || ReqObj.Form[tmpId].toFireIsq) &&
    isSet(ReqObj.Form[tmpId].optionsValue) &&
    (ReqObj.Form[tmpId].IsqUpdated ||
      ReqObj.Form[tmpId].optionsValue.length > 0) &&
    isSet(ReqObj.Form[tmpId].Isq.newIsqAdded) &&
    ReqObj.Form[tmpId].Isq.newIsqAdded &&
    ValidGenId(ReqObj.Form[tmpId].generationId)
  ) {
    ReqObj.Form[tmpId].waitFinServ += 1;
    if (ReqObj.Form[tmpId].typeofform === "bl")
      ReqObj.Form[tmpId].Isq.newIsqAdded = false;
    fireAjaxRequest({
      data: {
        ga: {
          gatype: "saveIsqBlEnq",
          source: "",
          s: true,
          f: true,
        },
        tmpId: tmpId,
        ajaxObj: {
          obj: IsqObject,
          s: {
            ss: 1,
            sf: {
              af: 0,
              pa: 0,
            },
            f: 1,
          },
          f: {
            f: 1,
          },
        },
        ajaxtimeout: 0,
        ajaxdata: isq_data,
        hitfinserv: hitfinserv,
        type: 3,
      },
    });
  } else {
    PostAjax(IsqObject, tmpId);
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