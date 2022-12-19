//"use strict";
var isoCountries = { "AF": "Afghanistan", "DZ": "Algeria", "AL": "Albania", "AS": "American Samoa", "AI": "Anguilla", "AG": "Antigua And Barbuda", "AO": "Angola", "AD": "Andorra", "AQ": "Antarctica", "AW": "Aruba", "AM": "Armenia", "AR": "Argentina", "AT": "Austria", "AU": "Australia", "AZ": "Azerbaijan", "BS": "Bahamas", "BB": "Barbados", "BD": "Bangladesh", "BH": "Bahrain", "BM": "Bermuda", "BJ": "Benin", "BE": "Belgium", "BY": "Belarus", "BZ": "Belize", "BT": "Bhutan", "BW": "Botswana", "BA": "Bosnia And Herzegovina", "BV": "Bouvet Island", "BO": "Bolivia", "IO": "British Indian Ocean Territory", "BR": "Brazil", "BN": "Brunei", "BF": "Burkina Faso", "BI": "Burundi", "BG": "Bulgaria", "CA": "Canada", "KY": "Cayman Islands", "CM": "Cameroon", "CV": "Cape Verde", "KH": "Cambodia", "CF": "Central African Republic", "TD": "Chad", "CL": "Chile", "CX": "Christmas Islands", "HK": "China (Hong Kong S.A.R.)", "MO": "China (Macau S.A.R.)", "CN": "China", "CI": "Cote D Ivoire", "CG": "Congo", "KM": "Comoros", "CR": "Costa Rica", "CO": "Colombia", "CC": "Cocos Islands", "CK": "Cook Islands", "HR": "Croatia", "CU": "Cuba", "CY": "Cyprus", "CZ": "Czech Republic", "CD": "Democractic Republic Of Congo", "DK": "Denmark", "DJ": "Djibouti", "DM": "Dominica", "DO": "Dominican Republic", "TL": "East Timor", "EC": "Ecuador", "EG": "Egypt", "SV": "El Salvador", "GQ": "Equatorial Guinea", "ER": "Eritrea", "EE": "Estonia", "ET": "Ethiopia", "FO": "Faroe Islands", "FK": "Falkland Islands", "FI": "Finland", "FJ": "Fiji Islands", "TF": "French Southern Territories", "FR": "France", "GF": "French Guiana", "PF": "French Polynesia", "GA": "Gabon", "DE": "Germany", "GE": "Georgia", "GH": "Ghana", "GI": "Gibraltar", "GD": "Grenada", "GL": "Greenland", "GR": "Greece", "GU": "Guam", "GN": "Guinea", "GW": "Guinea-Bissau", "GT": "Guatemala", "GP": "Guadeloupe", "GY": "Guyana", "HT": "Haiti", "HM": "Heard And Mcdonald Islands", "VA": "Holy See", "HN": "Honduras", "HU": "Hungary", "IS": "Iceland", "ID": "Indonesia", "IN": "India", "IE": "Ireland", "IQ": "Iraq", "IR": "Iran", "IL": "Israel", "IT": "Italy", "JM": "Jamaica", "JP": "Japan", "JO": "Jordan", "KZ": "Kazakhstan", "KE": "Kenya", "KI": "Kiribati", "KR": "Korea", "KP": "Korea, North", "KW": "Kuwait", "KG": "Kyrgyzstan", "LV": "Latvia", "LA": "Lao People's Democratic Republic", "LS": "Lesotho", "LB": "Lebanon", "LY": "Libya", "LR": "Liberia", "LT": "Lithuania", "LI": "Liechtenstein", "LU": "Luxembourg", "MR": "Mauritania", "ML": "Mali", "MU": "Mauritius", "MG": "Madagascar", "MW": "Malawi", "YT": "Mayotte", "MT": "Malta", "MK": "Macedonia", "MQ": "Martinique", "MY": "Malaysia", "MH": "Marshall Islands", "MV": "Maldives", "MX": "Mexico", "FM": "Micronesia", "MS": "Montserrat", "MA": "Morocco", "MZ": "Mozambique", "MD": "Moldova", "MC": "Monaco", "ME": "Montenegro", "MN": "Mongolia", "MM": "Myanmar", "NA": "Namibia", "NR": "Nauru", "AN": "Netherlands Antilles", "NZ": "New Zealand", "NC": "New Caledonia", "NP": "Nepal", "NE": "Niger", "NG": "Nigeria", "NI": "Nicaragua", "NU": "Niue", "MP": "Northern Mariana Islands", "NO": "Norway", "NF": "Norfolk Island", "OM": "Oman", "PA": "Panama", "PY": "Paraguay", "PG": "Papua New Guinea", "PW": "Palau", "PK": "Pakistan", "PS": "Palestinian National Authority", "PE": "Peru", "PH": "Philippines", "PN": "Pitcairn Island", "PT": "Portugal", "PL": "Poland", "PR": "Puerto Rico", "QA": "Qatar", "RE": "Reunion", "RO": "Romania", "RU": "Russia", "RW": "Rwanda", "LC": "Saint Lucia", "VC": "Saint Vincent And The Grenadin", "KN": "Saint Kitts And Nevis", "ST": "Sao Tome And Principe", "SH": "Saint Helena", "SM": "San Marino", "PM": "Saint Pierre And Miquelon", "WS": "Samoa", "SA": "Saudi Arabia", "SN": "Senegal", "SC": "Seychelles", "RS": "Serbia", "CS": "Serbia And Montenegro", "SL": "Sierra Leone", "SG": "Singapore", "SI": "Slovenia", "SK": "Slovakia", "SS": "South Sudan", "SO": "Somalia", "ZA": "South Africa", "SB": "Solomon Islands", "GS": "South Georgia", "ES": "Spain", "LK": "Sri Lanka", "SD": "Sudan", "SR": "Suriname", "SJ": "Svalbard And Jan Mayen Islands", "SZ": "Swaziland", "CH": "Switzerland", "SE": "Sweden", "SY": "Syria", "TZ": "Tanzania", "TW": "Taiwan", "TJ": "Tajikistan", "GM": "The Gambia", "NL": "The Netherlands", "TH": "Thailand", "TG": "Togo", "TO": "Tonga", "TK": "Tokelau", "TT": "Trinidad And Tobago", "TC": "Turks And Caicos Islands", "TN": "Tunisia", "TV": "Tuvalu", "TR": "Turkey", "TM": "Turkmenistan", "UG": "Uganda", "UA": "Ukraine", "UM": "United States Minor Outlying Islands", "US": "United States Of America", "GB": "United Kingdom", "UK": "United Kingdom","AE": "United Arab Emirates", "UY": "Uruguay", "UZ": "Uzbekistan", "VU": "Vanuatu", "VE": "Venezuela", "VG": "Virgin Islands (British)", "VI": "Virgin Islands (Us)", "VN": "Vietnam", "WF": "Wallis And Futuna Islands", "EH": "Western Sahara", "YE": "Yemen", "YU": "Yugoslavia", "ZM": "Zambia", "ZW": "Zimbabwe" };

var flagResList = [{value:"93",label:"Afghanistan  +93",data:{cname:"Afghanistan",iso:"AF",icon_order:"210"}},{value:"213",label:"Algeria  +213",data:{cname:"Algeria",iso:"DZ",icon_order:"48"}},{value:"355",label:"Albania  +355",data:{cname:"Albania",iso:"AL",icon_order:"94"}},{value:"1-684",label:"American Samoa  +1-684",data:{cname:"American Samoa",iso:"AS",icon_order:"142"}},{value:"1-264",label:"Anguilla  +1-264",data:{cname:"Anguilla",iso:"AI",icon_order:"180"}},{value:"1-268",label:"Antigua And Barbuda  +1-268",data:{cname:"Antigua And Barbuda",iso:"AG",icon_order:"79"}},{value:"244",label:"Angola  +244",data:{cname:"Angola",iso:"AO",icon_order:"177"}},{value:"376",label:"Andorra  +376",data:{cname:"Andorra",iso:"AD",icon_order:"54"}},{value:"672",label:"Antarctica  +672",data:{cname:"Antarctica",iso:"AQ",icon_order:"254"}},{value:"297",label:"Aruba  +297",data:{cname:"Aruba",iso:"AW",icon_order:"72"}},{value:"374",label:"Armenia  +374",data:{cname:"Armenia",iso:"AM",icon_order:"16"}},{value:"54",label:"Argentina  +54",data:{cname:"Argentina",iso:"AR",icon_order:"216"}},{value:"43",label:"Austria  +43",data:{cname:"Austria",iso:"AT",icon_order:"121"}},{value:"61",label:"Australia  +61",data:{cname:"Australia",iso:"AU",icon_order:"156"}},{value:"994",label:"Azerbaijan  +994",data:{cname:"Azerbaijan",iso:"AZ",icon_order:"113"}},{value:"1-242",label:"Bahamas  +1-242",data:{cname:"Bahamas",iso:"BS",icon_order:"33"}},{value:"1-246",label:"Barbados  +1-246",data:{cname:"Barbados",iso:"BB",icon_order:"143"}},{value:"880",label:"Bangladesh  +880",data:{cname:"Bangladesh",iso:"BD",icon_order:"161"}},{value:"973",label:"Bahrain  +973",data:{cname:"Bahrain",iso:"BH",icon_order:"136"}},{value:"1-441",label:"Bermuda  +1-441",data:{cname:"Bermuda",iso:"BM",icon_order:"174"}},{value:"229",label:"Benin  +229",data:{cname:"Benin",iso:"BJ",icon_order:"118"}},{value:"32",label:"Belgium  +32",data:{cname:"Belgium",iso:"BE",icon_order:"0"}},{value:"375",label:"Belarus  +375",data:{cname:"Belarus",iso:"BY",icon_order:"100"}},{value:"501",label:"Belize  +501",data:{cname:"Belize",iso:"BZ",icon_order:"44"}},{value:"975",label:"Bhutan  +975",data:{cname:"Bhutan",iso:"BT",icon_order:"168"}},{value:"267",label:"Botswana  +267",data:{cname:"Botswana",iso:"BW",icon_order:"246"}},{value:"387",label:"Bosnia And Herzegovina  +387",data:{cname:"Bosnia And Herzegovina",iso:"BA",icon_order:"144"}},{value:"47",label:"Bouvet Island  +47",data:{cname:"Bouvet Island",iso:"BV",icon_order:"76"}},{value:"591",label:"Bolivia  +591",data:{cname:"Bolivia",iso:"BO",icon_order:"150"}},{value:"246",label:"British Indian Ocean Territory  +246",data:{cname:"British Indian Ocean Territory",iso:"IO",icon_order:"5"}},{value:"55",label:"Brazil  +55",data:{cname:"Brazil",iso:"BR",icon_order:"70"}},{value:"673",label:"Brunei  +673",data:{cname:"Brunei",iso:"BN",icon_order:"153"}},{value:"226",label:"Burkina Faso  +226",data:{cname:"Burkina Faso",iso:"BF",icon_order:"66"}},{value:"257",label:"Burundi  +257",data:{cname:"Burundi",iso:"BI",icon_order:"172"}},{value:"359",label:"Bulgaria  +359",data:{cname:"Bulgaria",iso:"BG",icon_order:"235"}},{value:"1",label:"Canada  +1",data:{cname:"Canada",iso:"CA",icon_order:"125"}},{value:"1-345",label:"Cayman Islands  +1-345",data:{cname:"Cayman Islands",iso:"KY",icon_order:"28"}},{value:"237",label:"Cameroon  +237",data:{cname:"Cameroon",iso:"CM",icon_order:"187"}},{value:"238",label:"Cape Verde  +238",data:{cname:"Cape Verde",iso:"CV",icon_order:"241"}},{value:"855",label:"Cambodia  +855",data:{cname:"Cambodia",iso:"KH",icon_order:"22"}},{value:"236",label:"Central African Republic  +236",data:{cname:"Central African Republic",iso:"CF",icon_order:"167"}},{value:"235",label:"Chad  +235",data:{cname:"Chad",iso:"TD",icon_order:"74"}},{value:"56",label:"Chile  +56",data:{cname:"Chile",iso:"CL",icon_order:"122"}},{value:"61",label:"Christmas Islands  +61",data:{cname:"Christmas Islands",iso:"CX",icon_order:"255"}},{value:"852",label:"China (Hong Kong S.A.R.)  +852",data:{cname:"China (Hong Kong S.A.R.)",iso:"HK",icon_order:"245"}},{value:"853",label:"China (Macau S.A.R.)  +853",data:{cname:"China (Macau S.A.R.)",iso:"MO",icon_order:"236"}},{value:"86",label:"China  +86",data:{cname:"China",iso:"CN",icon_order:"75"}},{value:"225",label:"Cote D Ivoire  +225",data:{cname:"Cote D Ivoire",iso:"CI",icon_order:"151"}},{value:"242",label:"Congo  +242",data:{cname:"Congo",iso:"CG",icon_order:"163"}},{value:"269",label:"Comoros  +269",data:{cname:"Comoros",iso:"KM",icon_order:"130"}},{value:"506",label:"Costa Rica  +506",data:{cname:"Costa Rica",iso:"CR",icon_order:"190"}},{value:"57",label:"Colombia  +57",data:{cname:"Colombia",iso:"CO",icon_order:"30"}},{value:"891",label:"Cocos Islands  +891",data:{cname:"Cocos Islands",iso:"CC",icon_order:"256"}},{value:"682",label:"Cook Islands  +682",data:{cname:"Cook Islands",iso:"CK",icon_order:"206"}},{value:"385",label:"Croatia  +385",data:{cname:"Croatia",iso:"HR",icon_order:"82"}},{value:"53",label:"Cuba  +53",data:{cname:"Cuba",iso:"CU",icon_order:"68"}},
{value:"357",label:"Cyprus  +357",data:{cname:"Cyprus",iso:"CY",icon_order:"51"}},{value:"420",label:"Czech Republic  +420",data:{cname:"Czech Republic",iso:"CZ",icon_order:"205"}},{value:"243",label:"Democractic Republic Of Congo  +243",data:{cname:"Democractic Republic Of Congo",iso:"CD",icon_order:"138"}},{value:"45",label:"Denmark  +45",data:{cname:"Denmark",iso:"DK",icon_order:"126"}},{value:"253",label:"Djibouti  +253",data:{cname:"Djibouti",iso:"DJ",icon_order:"191"}},{value:"1-767",label:"Dominica  +1-767",data:{cname:"Dominica",iso:"DM",icon_order:"221"}},{value:"1-809",label:"Dominican Republic  +1-809",data:{cname:"Dominican Republic",iso:"DO",icon_order:"139"}},{value:"670",label:"East Timor  +670",data:{cname:"East Timor",iso:"TL",icon_order:"253"}},{value:"593",label:"Ecuador  +593",data:{cname:"Ecuador",iso:"EC",icon_order:"108"}},{value:"20",label:"Egypt  +20",data:{cname:"Egypt",iso:"EG",icon_order:"200"}},{value:"503",label:"El Salvador  +503",data:{cname:"El Salvador",iso:"SV",icon_order:"149"}},{value:"240",label:"Equatorial Guinea  +240",data:{cname:"Equatorial Guinea",iso:"GQ",icon_order:"137"}},{value:"291",label:"Eritrea  +291",data:{cname:"Eritrea",iso:"ER",icon_order:"65"}},{value:"372",label:"Estonia  +372",data:{cname:"Estonia",iso:"EE",icon_order:"219"}},{value:"251",label:"Ethiopia  +251",data:{cname:"Ethiopia",iso:"ET",icon_order:"222"}},{value:"298",label:"Faroe Islands  +298",data:{cname:"Faroe Islands",iso:"FO",icon_order:"101"}},{value:"500",label:"Falkland Islands  +500",data:{cname:"Falkland Islands",iso:"FK",icon_order:"251"}},{value:"358",label:"Finland  +358",data:{cname:"Finland",iso:"FI",icon_order:"173"}},{value:"679",label:"Fiji Islands  +679",data:{cname:"Fiji Islands",iso:"FJ",icon_order:"169"}},{value:"262",label:"French Southern Territories  +262",data:{cname:"French Southern Territories",iso:"TF",icon_order:"257"}},{value:"33",label:"France  +33",data:{cname:"France",iso:"FR",icon_order:"92"}},{value:"594",label:"French Guiana  +594",data:{cname:"French Guiana",iso:"GF",icon_order:"261"}},{value:"689",label:"French Polynesia  +689",data:{cname:"French Polynesia",iso:"PF",icon_order:"155"}},{value:"241",label:"Gabon  +241",data:{cname:"Gabon",iso:"GA",icon_order:"80"}},{value:"49",label:"Germany  +49",data:{cname:"Germany",iso:"DE",icon_order:"228"}},{value:"995",label:"Georgia  +995",data:{cname:"Georgia",iso:"GE",icon_order:"78"}},{value:"233",label:"Ghana  +233",data:{cname:"Ghana",iso:"GH",icon_order:"192"}},{value:"350",label:"Gibraltar  +350",data:{cname:"Gibraltar",iso:"GI",icon_order:"25"}},{value:"1-473",label:"Grenada  +1-473",data:{cname:"Grenada",iso:"GD",icon_order:"218"}},{value:"299",label:"Greenland  +299",data:{cname:"Greenland",iso:"GL",icon_order:"160"}},{value:"30",label:"Greece  +30",data:{cname:"Greece",iso:"GR",icon_order:"15"}},{value:"1-671",label:"Guam  +1-671",data:{cname:"Guam",iso:"GU",icon_order:"215"}},{value:"224",label:"Guinea  +224",data:{cname:"Guinea",iso:"GN",icon_order:"234"}},{value:"245",label:"Guinea-Bissau  +245",data:{cname:"Guinea-Bissau",iso:"GW",icon_order:"175"}},{value:"502",label:"Guatemala  +502",data:{cname:"Guatemala",iso:"GT",icon_order:"85"}},{value:"590",label:"Guadeloupe  +590",data:{cname:"Guadeloupe",iso:"GP",icon_order:"37"}},{value:"592",label:"Guyana  +592",data:{cname:"Guyana",iso:"GY",icon_order:"73"}},{value:"509",label:"Haiti  +509",data:{cname:"Haiti",iso:"HT",icon_order:"29"}},{value:"672",label:"Heard And Mcdonald Islands  +672",data:{cname:"Heard And Mcdonald Islands",iso:"HM",icon_order:"156"}},{value:"379",label:"Holy See  +379",data:{cname:"Holy See",iso:"VA",icon_order:"211"}},{value:"504",label:"Honduras  +504",data:{cname:"Honduras",iso:"HN",icon_order:"196"}},{value:"36",label:"Hungary  +36",data:{cname:"Hungary",iso:"HU",icon_order:"62"}},{value:"354",label:"Iceland  +354",data:{cname:"Iceland",iso:"IS",icon_order:"181"}},{value:"62",label:"Indonesia  +62",data:{cname:"Indonesia",iso:"ID",icon_order:"178"}},{value:"91",label:"India  +91",data:{cname:"India",iso:"IN",icon_order:"154"}},{value:"353",label:"Ireland  +353",data:{cname:"Ireland",iso:"IE",icon_order:"179"}},{value:"964",label:"Iraq  +964",data:{cname:"Iraq",iso:"IQ",icon_order:"59"}},{value:"98",label:"Iran  +98",data:{cname:"Iran",iso:"IR",icon_order:"183"}},{value:"972",label:"Israel  +972",data:{cname:"Israel",iso:"IL",icon_order:"31"}},{value:"39",label:"Italy  +39",data:{cname:"Italy",iso:"IT",icon_order:"13"}},{value:"1-876",label:"Jamaica  +1-876",data:{cname:"Jamaica",iso:"JM",icon_order:"157"}},{value:"81",label:"Japan  +81",data:{cname:"Japan",iso:"JP",icon_order:"39"}},{value:"962",label:"Jordan  +962",data:{cname:"Jordan",iso:"JO",icon_order:"133"}},{value:"7",label:"Kazakhstan  +7",data:{cname:"Kazakhstan",iso:"KZ",icon_order:"110"}},{value:"254",label:"Kenya  +254",data:{cname:"Kenya",iso:"KE",icon_order:"239"}},{value:"686",label:"Kiribati  +686",data:{cname:"Kiribati",iso:"KI",icon_order:"34"}},{value:"82",label:"Korea  +82",data:{cname:"Korea",iso:"KR",icon_order:"204"}},
{value:"850",label:"Korea, North  +850",data:{cname:"Korea, North",iso:"KP",icon_order:"164"}},{value:"965",label:"Kuwait  +965",data:{cname:"Kuwait",iso:"KW",icon_order:"226"}},{value:"996",label:"Kyrgyzstan  +996",data:{cname:"Kyrgyzstan",iso:"KG",icon_order:"147"}},{value:"371",label:"Latvia  +371",data:{cname:"Latvia",iso:"LV",icon_order:"176"}},{value:"856",label:"Lao People's Democratic Republic  +856",data:{cname:"Lao People's Democratic Republic",iso:"LA",icon_order:"41"}},{value:"266",label:"Lesotho  +266",data:{cname:"Lesotho",iso:"LS",icon_order:"199"}},{value:"961",label:"Lebanon  +961",data:{cname:"Lebanon",iso:"LB",icon_order:"114"}},{value:"218",label:"Libya  +218",data:{cname:"Libya",iso:"LY",icon_order:"12"}},{value:"231",label:"Liberia  +231",data:{cname:"Liberia",iso:"LR",icon_order:"188"}},{value:"370",label:"Lithuania  +370",data:{cname:"Lithuania",iso:"LT",icon_order:"102"}},{value:"423",label:"Liechtenstein  +423",data:{cname:"Liechtenstein",iso:"LI",icon_order:"89"}},{value:"352",label:"Luxembourg  +352",data:{cname:"Luxembourg",iso:"LU",icon_order:"134"}},{value:"222",label:"Mauritania  +222",data:{cname:"Mauritania",iso:"MR",icon_order:"23"}},{value:"223",label:"Mali  +223",data:{cname:"Mali",iso:"ML",icon_order:"229"}},{value:"230",label:"Mauritius  +230",data:{cname:"Mauritius",iso:"MU",icon_order:"198"}},{value:"261",label:"Madagascar  +261",data:{cname:"Madagascar",iso:"MG",icon_order:"117"}},{value:"265",label:"Malawi  +265",data:{cname:"Malawi",iso:"MW",icon_order:"195"}},{value:"269",label:"Mayotte  +269",data:{cname:"Mayotte",iso:"YT",icon_order:"24"}},{value:"356",label:"Malta  +356",data:{cname:"Malta",iso:"MT",icon_order:"141"}},{value:"389",label:"Macedonia  +389",data:{cname:"Macedonia",iso:"MK",icon_order:"123"}},{value:"596",label:"Martinique  +596",data:{cname:"Martinique",iso:"MQ",icon_order:"18"}},{value:"60",label:"Malaysia  +60",data:{cname:"Malaysia",iso:"MY",icon_order:"170"}},{value:"692",label:"Marshall Islands  +692",data:{cname:"Marshall Islands",iso:"MH",icon_order:"104"}},{value:"960",label:"Maldives  +960",data:{cname:"Maldives",iso:"MV",icon_order:"56"}},{value:"52",label:"Mexico  +52",data:{cname:"Mexico",iso:"MX",icon_order:"184"}},{value:"691",label:"Micronesia  +691",data:{cname:"Micronesia",iso:"FM",icon_order:"158"}},{value:"1-664",label:"Montserrat  +1-664",data:{cname:"Montserrat",iso:"MS",icon_order:"53"}},{value:"212",label:"Morocco  +212",data:{cname:"Morocco",iso:"MA",icon_order:"212"}},{value:"258",label:"Mozambique  +258",data:{cname:"Mozambique",iso:"MZ",icon_order:"58"}},{value:"373",label:"Moldova  +373",data:{cname:"Moldova",iso:"MD",icon_order:"244"}},{value:"377",label:"Monaco  +377",data:{cname:"Monaco",iso:"MC",icon_order:"83"}},{value:"382",label:"Montenegro  +382",data:{cname:"Montenegro",iso:"ME",icon_order:"197"}},{value:"976",label:"Mongolia  +976",data:{cname:"Mongolia",iso:"MN",icon_order:"232"}},{value:"95",label:"Myanmar  +95",data:{cname:"Myanmar",iso:"MM",icon_order:"1"}},{value:"264",label:"Namibia  +264",data:{cname:"Namibia",iso:"NA",icon_order:"171"}},{value:"674",label:"Nauru  +674",data:{cname:"Nauru",iso:"NR",icon_order:"159"}},{value:"599",label:"Netherlands Antilles  +599",data:{cname:"Netherlands Antilles",iso:"AN",icon_order:"24"}},{value:"64",label:"New Zealand  +64",data:{cname:"New Zealand",iso:"NZ",icon_order:"140"}},{value:"687",label:"New Caledonia  +687",data:{cname:"New Caledonia",iso:"NC",icon_order:"116"}},{value:"977",label:"Nepal  +977",data:{cname:"Nepal",iso:"NP",icon_order:"10"}},{value:"227",label:"Niger  +227",data:{cname:"Niger",iso:"NE",icon_order:"50"}},{value:"234",label:"Nigeria  +234",data:{cname:"Nigeria",iso:"NG",icon_order:"225"}},{value:"505",label:"Nicaragua  +505",data:{cname:"Nicaragua",iso:"NI",icon_order:"14"}},{value:"683",label:"Niue  +683",data:{cname:"Niue",iso:"NU",icon_order:"189"}},{value:"1-670",label:"Northern Mariana Islands  +1-670",data:{cname:"Northern Mariana Islands",iso:"MP",icon_order:"64"}},{value:"47",label:"Norway  +47",data:{cname:"Norway",iso:"NO",icon_order:"76"}},{value:"672",label:"Norfolk Island  +672",data:{cname:"Norfolk Island",iso:"NF",icon_order:"19"}},{value:"968",label:"Oman  +968",data:{cname:"Oman",iso:"OM",icon_order:"223"}},{value:"507",label:"Panama  +507",data:{cname:"Panama",iso:"PA",icon_order:"77"}},{value:"595",label:"Paraguay  +595",data:{cname:"Paraguay",iso:"PY",icon_order:"213"}},{value:"675",label:"Papua New Guinea  +675",data:{cname:"Papua New Guinea",iso:"PG",icon_order:"135"}},{value:"680",label:"Palau  +680",data:{cname:"Palau",iso:"PW",icon_order:"21"}},{value:"92",label:"Pakistan  +92",data:{cname:"Pakistan",iso:"PK",icon_order:"185"}},{value:"970",label:"Palestinian National Authority  +970",data:{cname:"Palestinian National Authority",iso:"PS",icon_order:"109"}},{value:"51",label:"Peru  +51",data:{cname:"Peru",iso:"PE",icon_order:"86"}},{value:"63",label:"Philippines  +63",data:{cname:"Philippines",iso:"PH",icon_order:"165"}},{value:"872",label:"Pitcairn Island  +872",data:{cname:"Pitcairn Island",iso:"PN",icon_order:"258"}},
{value:"351",label:"Portugal  +351",data:{cname:"Portugal",iso:"PT",icon_order:"47"}},{value:"48",label:"Poland  +48",data:{cname:"Poland",iso:"PL",icon_order:"107"}},{value:"1",label:"Puerto Rico  +1",data:{cname:"Puerto Rico",iso:"PR",icon_order:"43"}},{value:"974",label:"Qatar  +974",data:{cname:"Qatar",iso:"QA",icon_order:"42"}},{value:"262",label:"Reunion  +262",data:{cname:"Reunion",iso:"RE",icon_order:"24"}},{value:"40",label:"Romania  +40",data:{cname:"Romania",iso:"RO",icon_order:"61"}},{value:"7",label:"Russia  +7",data:{cname:"Russia",iso:"RU",icon_order:"60"}},{value:"250",label:"Rwanda  +250",data:{cname:"Rwanda",iso:"RW",icon_order:"243"}},{value:"1-758",label:"Saint Lucia  +1-758",data:{cname:"Saint Lucia",iso:"LC",icon_order:"127"}},{value:"1-784",label:"Saint Vincent And The Grenadin  +1-784",data:{cname:"Saint Vincent And The Grenadin",iso:"VC",icon_order:"238"}},{value:"1-869",label:"Saint Kitts And Nevis  +1-869",data:{cname:"Saint Kitts And Nevis",iso:"KN",icon_order:"9"}},{value:"239",label:"Sao Tome And Principe  +239",data:{cname:"Sao Tome And Principe",iso:"ST",icon_order:"217"}},{value:"290",label:"Saint Helena  +290",data:{cname:"Saint Helena",iso:"SH",icon_order:"45"}},{value:"378",label:"San Marino  +378",data:{cname:"San Marino",iso:"SM",icon_order:"193"}},{value:"508",label:"Saint Pierre And Miquelon  +508",data:{cname:"Saint Pierre And Miquelon",iso:"PM",icon_order:"98"}},{value:"685",label:"Samoa  +685",data:{cname:"Samoa",iso:"WS",icon_order:"209"}},{value:"966",label:"Saudi Arabia  +966",data:{cname:"Saudi Arabia",iso:"SA",icon_order:"3"}},{value:"221",label:"Senegal  +221",data:{cname:"Senegal",iso:"SN",icon_order:"194"}},{value:"248",label:"Seychelles  +248",data:{cname:"Seychelles",iso:"SC",icon_order:"95"}},{value:"381",label:"Serbia  +381",data:{cname:"Serbia",iso:"RS",icon_order:"224"}},{value:"381",label:"Serbia And Montenegro  +381",data:{cname:"Serbia And Montenegro",iso:"CS",icon_order:"224"}},{value:"232",label:"Sierra Leone  +232",data:{cname:"Sierra Leone",iso:"SL",icon_order:"67"}},{value:"65",label:"Singapore  +65",data:{cname:"Singapore",iso:"SG",icon_order:"2"}},{value:"386",label:"Slovenia  +386",data:{cname:"Slovenia",iso:"SI",icon_order:"111"}},{value:"421",label:"Slovakia  +421",data:{cname:"Slovakia",iso:"SK",icon_order:"201"}},{value:"211",label:"South Sudan  +211",data:{cname:"South Sudan",iso:"SS",icon_order:"249"}},{value:"252",label:"Somalia  +252",data:{cname:"Somalia",iso:"SO",icon_order:"124"}},{value:"27",label:"South Africa  +27",data:{cname:"South Africa",iso:"ZA",icon_order:"214"}},{value:"677",label:"Solomon Islands  +677",data:{cname:"Solomon Islands",iso:"SB",icon_order:"97"}},{value:"995",label:"South Georgia  +995",data:{cname:"South Georgia",iso:"GS",icon_order:"78"}},{value:"34",label:"Spain  +34",data:{cname:"Spain",iso:"ES",icon_order:"105"}},{value:"94",label:"Sri Lanka  +94",data:{cname:"Sri Lanka",iso:"LK",icon_order:"240"}},{value:"249",label:"Sudan  +249",data:{cname:"Sudan",iso:"SD",icon_order:"32"}},{value:"597",label:"Suriname  +597",data:{cname:"Suriname",iso:"SR",icon_order:"242"}},{value:"47",label:"Svalbard And Jan Mayen Islands  +47",data:{cname:"Svalbard And Jan Mayen Islands",iso:"SJ",icon_order:"76"}},{value:"268",label:"Swaziland  +268",data:{cname:"Swaziland",iso:"SZ",icon_order:"207"}},{value:"41",label:"Switzerland  +41",data:{cname:"Switzerland",iso:"CH",icon_order:"120"}},{value:"46",label:"Sweden  +46",data:{cname:"Sweden",iso:"SE",icon_order:"35"}},{value:"963",label:"Syria  +963",data:{cname:"Syria",iso:"SY",icon_order:"166"}},{value:"255",label:"Tanzania  +255",data:{cname:"Tanzania",iso:"TZ",icon_order:"208"}},{value:"886",label:"Taiwan  +886",data:{cname:"Taiwan",iso:"TW",icon_order:"46"}},{value:"992",label:"Tajikistan  +992",data:{cname:"Tajikistan",iso:"TJ",icon_order:"17"}},{value:"220",label:"The Gambia  +220",data:{cname:"The Gambia",iso:"GM",icon_order:"57"}},{value:"31",label:"The Netherlands  +31",data:{cname:"The Netherlands",iso:"NL",icon_order:"131"}},{value:"66",label:"Thailand  +66",data:{cname:"Thailand",iso:"TH",icon_order:"87"}},{value:"228",label:"Togo  +228",data:{cname:"Togo",iso:"TG",icon_order:"55"}},{value:"676",label:"Tonga  +676",data:{cname:"Tonga",iso:"TO",icon_order:"99"}},{value:"690",label:"Tokelau  +690",data:{cname:"Tokelau",iso:"TK",icon_order:"250"}},{value:"1-868",label:"Trinidad And Tobago  +1-868",data:{cname:"Trinidad And Tobago",iso:"TT",icon_order:"40"}},{value:"1-649",label:"Turks And Caicos Islands  +1-649",data:{cname:"Turks And Caicos Islands",iso:"TC",icon_order:"119"}},{value:"216",label:"Tunisia  +216",data:{cname:"Tunisia",iso:"TN",icon_order:"49"}},{value:"688",label:"Tuvalu  +688",data:{cname:"Tuvalu",iso:"TV",icon_order:"26"}},{value:"90",label:"Turkey  +90",data:{cname:"Turkey",iso:"TR",icon_order:"146"}},{value:"993",label:"Turkmenistan  +993",data:{cname:"Turkmenistan",iso:"TM",icon_order:"231"}},{value:"256",label:"Uganda  +256",data:{cname:"Uganda",iso:"UG",icon_order:"106"}},{value:"380",label:"Ukraine  +380",data:{cname:"Ukraine",iso:"UA",icon_order:"182"}},
{value:"246",label:"United States Minor Outlying Islands  +246",data:{cname:"United States Minor Outlying Islands",iso:"UM",icon_order:"4"}},{value:"1",label:"United States Of America  +1",data:{cname:"United States Of America",iso:"US",icon_order:"4"}},{value:"44",label:"United Kingdom  +44",data:{cname:"United Kingdom",iso:"GB",icon_order:"5"}},{value:"971",label:"United Arab Emirates  +971",data:{cname:"United Arab Emirates",iso:"AE",icon_order:"202"}},{value:"598",label:"Uruguay  +598",data:{cname:"Uruguay",iso:"UY",icon_order:"237"}},{value:"998",label:"Uzbekistan  +998",data:{cname:"Uzbekistan",iso:"UZ",icon_order:"91"}},{value:"678",label:"Vanuatu  +678",data:{cname:"Vanuatu",iso:"VU",icon_order:"115"}},{value:"58",label:"Venezuela  +58",data:{cname:"Venezuela",iso:"VE",icon_order:"96"}},{value:"1-284",label:"Virgin Islands (British)  +1-284",data:{cname:"Virgin Islands (British)",iso:"VG",icon_order:"128"}},{value:"1-340",label:"Virgin Islands (Us)  +1-340",data:{cname:"Virgin Islands (Us)",iso:"VI",icon_order:"162"}},{value:"84",label:"Vietnam  +84",data:{cname:"Vietnam",iso:"VN",icon_order:"88"}},{value:"681",label:"Wallis And Futuna Islands  +681",data:{cname:"Wallis And Futuna Islands",iso:"WF",icon_order:"92"}},{value:"212",label:"Western Sahara  +212",data:{cname:"Western Sahara",iso:"EH",icon_order:"109"}},{value:"967",label:"Yemen  +967",data:{cname:"Yemen",iso:"YE",icon_order:"152"}},{value:"38",label:"Yugoslavia  +38",data:{cname:"Yugoslavia",iso:"YU",icon_order:"260"}},{value:"260",label:"Zambia  +260",data:{cname:"Zambia",iso:"ZM",icon_order:"145"}},{value:"263",label:"Zimbabwe  +263",data:{cname:"Zimbabwe",iso:"ZW",icon_order:"186"}}];

$.getScript("https://apis.google.com/js/platform.js");
  
var otpcounter = 0;
var quantityshown = 0;
var displayedisq = 0;
var windowctrlscroll = 0;
var blankscreenisq = 0;
var dirimgscreencount = 0;

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
var global_euroArr = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","GB","UK",];
var savedMcatIsq = {};
var savedCatIsq = {};
var HitMcatIsq = {};
var isBLFormOpen = false;
var IsqSeperator = "##";

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
  function Enq09(tmpId) {
    return tmpId.substring(0, 2) === "09" && isEnq(tmpId) ? true : false;
  }
  function Enq04(tmpId) {
    return tmpId.substring(0, 2) === "04" && isEnq(tmpId) ? true : false;
  }
  
  function ispdp(tmpId) {
    return ReqObj.Form[tmpId].modId === "PRODDTL";
  }
  
  function pdpenq(tmpId) {
    return isEnq(tmpId) && ispdp(tmpId);
  }
  
  function pdpBL(tmpId) {
    return isBl(tmpId) && ispdp(tmpId);
  }
  
  function pdpInactiveBL(tmpId) {
    return (
      isBl(tmpId) &&
      ReqObj.Form[tmpId].ctaName.toLowerCase() === "inactive" &&
      ispdp(tmpId)
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
    return isImageEnqDIR(tmpId) && (ReqObj.Form[tmpId].modId === "DIR" );
  }
  
  function isMoglixUi(tmpId) {
    return isSet(ReqObj.Form[tmpId].New_UI) && ReqObj.Form[tmpId].New_UI === "1";
  }
  function IsChatbl(tmpId) {
    return isSet(tmpId) && tmpId.substr(0, 2) === "08" ? true : false;
  }
  function isSet(checkVar) {
    return typeof checkVar !== "undefined" && checkVar !== null ? true : false;
  }
  function isSSB(tmpId) {
    return tmpId.substr(0, 2) === "06" ? true : false;
  }
  function isImageVidEnq(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
      isSet(ReqObj.Form[tmpId].typeofform) &&
      (ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
        ReqObj.Form[tmpId].typeofform.toLowerCase() === "video")
      ? true
      : false;
  }
  function imeshExist() {
    var imeshcookie = usercookie.getCookie("ImeshVisitor");
    return imeshcookie !== "" ? imeshcookie : "";
  }
  
function initializeForm(formArray) {
    createGlobalObject();
    var ImageCalled = false;
    //var iplocCalled = false;
    ReqObj.isAddSlot = 0;
    if (isSet(formArray)) {
      for (var i = 0; i < formArray.length; i++) {
        if (isSet(formArray[i]) && formArray[i] !== "") {
          if (
            $.inArray(formArray[i].tempId, BlPopup) === -1 ||
            $.inArray(formArray[i].tempId, EnqPopup) === -1
          ) {
            OpenForm(formArray[i]);
            if (
              (isSet(formArray[i].displayImage) &&
                formArray[i].displayImage !== "") ||
              (isSet(formArray[i].zoomImage) && formArray[i].zoomImage !== "") ||
              (!ImageCalled && formArray[i].formType.toLowerCase() === "bl")
            ) {
              ImageCalled = true;
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

  function FormDefaultsFromProperty(LocalReqObj) {
    var tmpId = LocalReqObj.tempId + LocalReqObj.instId;
    ReqObj.su_cta = 0;
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
    if (
      (ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId)) ||
      (isSet(ReqObj.Form[tmpId].isFrInline) &&
        ReqObj.Form[tmpId].isFrInline === "1")
    ) {
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
    if (
      isSet(ReqObj.Form[tmpId].isFrInline) &&
      ReqObj.Form[tmpId].isFrInline === "1"
    ) {
      html =
        "<div class='df'><div class='w50 fpr30' id='t" +
        tmpId +
        "_partition1'></div><div class='w50 fpr10' id='t" +
        tmpId +
        "_partition2'></div></div>";
      $("#t" + tmpId + "_bl_form").html(html);
      $("#t" + tmpId + "_inlineBL").addClass("be-mdleWrap");
    } else {
      $("#t" + tmpId + "_hdg").html(
        "<div class='beclrW be-bgb cbl_p10 txt-cnt' style='font-size: 18px;'>Tell us what you need</div>"
      );
      $("#t" + tmpId + "_hdg").removeClass("bedsnone");
    }
  }
  function CallIntentGen(tmpId) {
    if ( isSet(tmpId) && (tmpId.substring(0, 2) === "09" || isIntentBlForm(tmpId))) {
      if ( isSet(ReqObj.Form[tmpId].reqSent) && isSet(ReqObj.Form[tmpId].formType) 
      && ReqObj.Form[tmpId].formType.toLowerCase() !== "bl" && !IsChatbl(tmpId)
      ) {
        if (trimVal(ReqObj.Form[tmpId].reqSent.toLowerCase()) !== "no")
          new Generation(1).onSubmit(tmpId);  //tocheck
      } else {
        if (
          isSet(ReqObj.Form[tmpId].formType) &&
          isIntentBlForm(tmpId) &&
          isSet(ReqObj.Form[tmpId].BLIntent) &&
          trimVal(ReqObj.Form[tmpId].BLIntent.toLowerCase()) === "yes"
        )
          toFireBLIntent(tmpId, "i");
      }
    }
  }
  function toFireBLIntent(tmpId, src) {
    var _case = IsChatbl(tmpId) && ReqObj.Form[tmpId].mcatId === "-1" && ReqObj.Form[tmpId].catId === "-1" ? 0 : 1;
    if ( _case === 1 && ((isSet(src) && src === "i") || (isSet(ReqObj.Form[tmpId].FormSequence.StepCounter) && ReqObj.Form[tmpId].FormSequence.StepCounter > -2 && ReqObj.Form[tmpId].FormSequence.StepCounter < 2))) {
      new Generation(1, 1).onSubmit(tmpId); //tocheck
      ReqObj.Form[tmpId].intentCalled = true;
    } else ReqObj.Form[tmpId].intentCalled = false;
  }
  function trimVal(val) {
    var trimmedVal = "";
    if (isSet(val) && typeof val === "string") trimmedVal = val.trim();
    return trimmedVal;
  }
  function isEcomProduct(tmpId) {
    return isSet(ReqObj.Form[tmpId].isEcom) && ReqObj.Form[tmpId].isEcom === 1
      ? true
      : false;
  }
  function GenOnClick(tmpId) {
    if (GenerationOnClick(tmpId) && UserFilledIsq(tmpId)) {
      if (
        isSecondBlEnq(tmpId) &&
        usercookie.getParameterValue(imeshExist(), "uv") !== "V"
      ) {
        return false;
      }
      return true;
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
  function UserFilledIsq(tmpId) {
    if (
      isSet(ReqObj.Form[tmpId].userFilledIsq) &&
      ReqObj.Form[tmpId].userFilledIsq instanceof Array
    ) {
      var userFilledIsq = ReqObj.Form[tmpId].userFilledIsq;
      var flag = true;
      if (userFilledIsq.length === 2) {
        for (var j = 0; j < userFilledIsq.length; j++) {
          if (
            notEmpty(userFilledIsq[j].questionsId) &&
            notEmpty(userFilledIsq[j].questionsDesc) &&
            notEmpty(userFilledIsq[j].optionsId) &&
            notEmpty(userFilledIsq[j].optionsValue)
          ) {
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
  function notEmpty(val) {
    if (isSet(val) && val !== "") {
      return true;
    } else return false;
  }
  function GenerationOnClick(tmpId) {
    if (
      isSet(tmpId) &&
      isSet(ReqObj.Form[tmpId].genOnClick) &&
      ReqObj.Form[tmpId].genOnClick.toLowerCase() === "yes" &&
      tmpId.substring(0, 2) === "09" &&
      isSet(ReqObj.Form[tmpId].formType) &&
      (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ||
        ReqObj.Form[tmpId].formType.toLowerCase() === "bl") &&
      !isImageVidEnq(tmpId) &&
      usercookie.getParameterValue(imeshExist(), "iso") === "IN"
    )
      return true;
    else return false;
  }
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
  function SetBLEnqDefaultKeys(tmpId) {
    ReqObj.Form[tmpId].cityOth = "";
    ReqObj.Form[tmpId].generationCalled = false;
    ReqObj.userType = "";
    SetDefaultUserInputKeys(tmpId);
    ReqObj.Form[tmpId].generationId =
      isSet(ReqObj.Form[tmpId].generationId) &&
      ReqObj.Form[tmpId].generationId !== "" &&
      (ReqObj.Form[tmpId].insert === "R" || ReqObj.Form[tmpId].insert === "U")
        ? parseInt(ReqObj.Form[tmpId].generationId)
        : defaultGenerationId;
    ReqObj.Form[tmpId].query_destination = -1;
    ReqObj.Form[tmpId].TrackedDisplaySteps = [];
    ReqObj.Form[tmpId].TrackedSubmitSteps = [];
    ReqObj.Form[tmpId].BackwardDisplaySteps = [];
    ReqObj.Form[tmpId].IsbackClicked = false;
    ReqObj.Form[tmpId].IsqUnitArray = [];
    ReqObj.Form[tmpId].IsProdNameChanged = false;
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
  function PropertyDefault(tmpId, templateDefaults) {
    ReqObj.Form[tmpId].mcatName = ReturnCorrectVal(templateDefaults.mcatName, "");
    ReqObj.Form[tmpId].mcatId = ReturnCorrectVal(templateDefaults.mcatId, "-1");
    ReqObj.Form[tmpId].catId = ReturnCorrectVal(templateDefaults.catId, "-1");
    ReqObj.Form[tmpId].modId = ReturnCorrectVal(templateDefaults.modId, "DIR");
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
  function ReturnCorrectVal(val, defaultvalue) {
    if (isSet(val) && val !== "") {
      return val;
    } else {
      return isSet(defaultvalue) ? (defaultvalue !== "" ? defaultvalue : "") : "";
    }
  }
  function updateToFireEscTrackingKey(tmpId) {
    if (tmpId.substring(0, 2) === "09") {
      return true;
    } else if (IsChatbl(tmpId)) {
      return true;
    } else if (
      tmpId.substring(0, 2) !== "09" &&
      $("#t" + tmpId + "_enrichform_maindiv").html() === ""
    ) {
      return false;
    } else return true;
  }
  function SetBLEnqDefaultFlags(tempId, instId) {
    if (isSet(tempId) && isSet(instId))
      ReqObj.Form[tempId + instId].flags = CopyObject(Templateconfig[tempId]);
    else ReqObj.Form[tempId + instId].flags = {};
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
  function addTemplates(templateid, template_array) {
    if ($.inArray(templateid, template_array) === -1) {
      template_array.push(templateid);
    }
  }
  function setIplocCookie(tmpId) {
    if (!(Enq04(tmpId) || Bl04(tmpId) || Bl01(tmpId) || isSSB(tmpId))) {
      var imcoockie = usercookie.getCookie("ImeshVisitor");
      var ipcookie = usercookie.getCookie("iploc");
      if (imcoockie == "" && ipcookie == "") new IpLoc(tmpId);
    }
  }
  function CreateFormObject(tmpId, ReceivedReqObj) {
    ReqObj.Form[tmpId] = CopyObject(ReceivedReqObj);
    ReqObj.Original[tmpId] = CopyObject(ReceivedReqObj);
    if (isSSB(tmpId) && isSet(ReqObj.Original[tmpId]["loginv"]))
      ReqObj.Form[tmpId]["savevalue"] = ReqObj.Original[tmpId]["loginv"];
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
  function miniDetailService(tmpId) {
    var data = {};
    var imeshcookie = imeshExist();
    data["s_glusrid"] =
      imeshcookie === ""
        ? ReqObj.glid
        : usercookie.getParameterValue(imeshcookie, "glid");
    data["modid"] = ReqObj.Form[tmpId].modId;
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
  function fireAjaxRequest(event) {
    var revent = event;
    var tmpId = revent.data.tmpId;
    var ajaxObj = revent.data.ajaxObj;
    var ajaxtimeout = revent.data.ajaxtimeout;
    var ajaxdata = revent.data.ajaxdata;
    var formtype = isSet(ReqObj.Form[tmpId]) ? ReqObj.Form[tmpId].formType : isSet(ajaxdata["formType"]) ? ajaxdata["formType"] : "BL";
    var form_type = formtype === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    if ( (revent.data.type === 0 && isSet(ReqObj.Form[tmpId]) && isSet(ReqObj.Form[tmpId].modId) && ReqObj.Form[tmpId].modId === "PRODDTL") || (revent.data.type === 8 && pdpenq(tmpId))) {
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
          if ( (isSet(res.CODE) && parseInt(res.CODE) === 200) || (isSet(res.Response) && parseInt(res.Response.Code) === 200) || (isSet(res.success) && parseInt(res.success) === 1) || (isSet(res.RESPONSE) && parseInt(res.RESPONSE.Code) === 200) || (isSet(res.RESP) && res.RESP !== "failure") || (isSet(res.queryid) && ValidGenId(res.queryid)) || (isSet(res.ofr) && ValidGenId(res.ofr)) || (isSet(res.msg) && isSet(res.msg.MESSAGE) && parseInt(res.msg.MESSAGE.CODE) === 200) ) {
            OnAjaxSuccess(revent, res);
            if (revent.data.ga.s === true)
              blenqGATracking(form_type,"service:"+revent.data.ga.gatype +":success "+revent.data.ga.source,getEventLabel(),1,tmpId);
            if (ajaxObj !== "" && ajaxObj.s.ss === 1) {
              if (isSSB(tmpId))
                ReqObj.Form[tmpId].servicecalled.push( ConstructorName(ajaxObj.obj.fn));
              PostAjax(ajaxObj.obj, tmpId);
            }
            finishEnqDependents(tmpId, revent.data.type);
          } else {
            OnAjaxError(revent, res);
            if (revent.data.ga.f === true)
              blenqGATracking(form_type,"service:" + revent.data.ga.gatype + ":failure",res,1,tmpId);
            if (ajaxObj !== "" && ajaxObj.s.sf.af === 1)
              Ajaxfailure(ajaxObj.obj, tmpId, revent.data.hitfinserv);
            if (ajaxObj !== "" && ajaxObj.s.sf.pa === 1)
              PostAjax(ajaxObj.obj, tmpId, revent.data.hitfinserv);
          }
        } else {
          OnAjaxError(revent, res);
          finishEnqDependents(tmpId, revent.data.type);
          if (revent.data.ga.f === true)
            blenqGATracking(form_type,"service:" + revent.data.ga.gatype + ":failure","response undefined",1,tmpId);
          if (ajaxObj !== "" && ajaxObj.s.f === 1)
            Ajaxfailure(ajaxObj.obj, tmpId, revent.data.hitfinserv);
          if ( isSet(revent.data.key) && isSet(revent.data.key.appendedVal) && revent.data.key.appendedVal !== "" )
            RemoveValFromImEqGl(revent.data.key.appendedVal);
        }
      },
      error: function (res) {
        if (ajaxObj !== "" && ajaxObj.f.f === 1)
          Ajaxfailure(ajaxObj.obj, tmpId, revent.data.hitfinserv);
        res = isSet(res) ? JSON.stringify(res) : "response undefined";
        if (revent.data.ga.f === true)
          blenqGATracking(form_type,"service:" + revent.data.ga.gatype + ":failure",res,1,tmpId);
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
      case 9:
        McatDtlOnComplete(revent, res);
        break;
    }
  }
  function OpenForm(LocalReqObj, flagsugg) {
    // don't change the sequence of functions
    var UpdatedReceivedReqObj = FormDefaultsFromProperty(LocalReqObj);
    var tmpId = UpdatedReceivedReqObj.tempId + UpdatedReceivedReqObj.instId;
    paywithHideShow(tmpId);
    checktoCall(tmpId);
    addDetachedFlag(tmpId);
    var imEqGl = usercookie.getCookie("imEqGl");
    ReqObj.Form[tmpId].toShowOtpStepenq =
      imEqGl !== "" && imEqGl.substring(0, 1).toLowerCase() === "d"
        ? true
        : false;
    ReqObj.Form[tmpId].toShowOtpStepbl =
      imEqGl !== "" && imEqGl.substring(0, 1).toLowerCase() === "b"
        ? true
        : false;
    ReqObj.Form[tmpId].toFireGaTracking = isSSB(tmpId) ? true : getTimeStamp();
    updateReceivedImage(UpdatedReceivedReqObj);
    if (isSSB(tmpId) && isSet(flagsugg) && flagsugg === "changeflag")
      ReqObj.Form[tmpId].flags.prodSecNochange = true;
    ReqObj.Form[tmpId].cName.prodServ =
      isSet(ReqObj.Form[tmpId].cName.prodServ) &&
      ReqObj.Form[tmpId].cName.prodServ !== ""
        ? ReqObj.Form[tmpId].cName.prodServ
        : ReqObj.Form[tmpId].prodServ;
    //ReqObj.Form[tmpId].cName.prodServ = ReqObj.Form[tmpId].prodServ
    AfterFormDefaults(tmpId, flagsugg);
    callGlobalFunction();
    CallGenService(tmpId);
    HideSuggester();
  }

  function UserCookie() {}
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
  
  var usercookie = new UserCookie();
  
//   ulscreen
  function UserLogin(what) {
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
  
  UserLogin.prototype.displayAnswer = function (tmpId) {
    var name = this.toChange === true ? "" : ReturnBlUserName(tmpId);
    var toget = this.toChange === true ? "toChange" : "PrimaryInfo";
    var classtotest = chatBlClass(tmpId, "right");
    var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
    $("#t" + tmpId + "mflag").css("display", "none");
    return [
      ConversationRightWrapper(tmpId, returnAnswer(tmpId, toget), {
        classtotest: classtotest,
        leftright: leftright,
      }),
      name,
    ];
  };
  
  UserLogin.prototype.defaultEvents = function (tmpId) {
    if (isSet(tmpId)) {
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
      var orline = (pdpInactiveBL(tmpId)) ? "orline" : "";
      var customG = (pdpInactiveBL(tmpId)) ? "customG2" : "customG";
      var ghtml =
        '<div id = "t' +
        tmpId +
        '_gwrap"> <p style="font-size:14px;font-weight:600;text-align: center;margin-top: ' +
        stylo +
        '" class='+orline+'>OR</p> <div id="t' +
        tmpId +
        '_gSignInWrapper" style="text-align:center; margin: ' +
        styl +
        '" > <div id="t' +
        tmpId +
        'signinBtnFr" class="'+customG+'"> <span class="Gicon"> </span> <span class="buttonTextfr ' +
        cls +
        '"> Login with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
      var ele = $("#t" + tmpId + "_submit");
      if (isSet(ele)) $("#" + ele.parent()[0].id).append(ghtml);
      this.registerForm(tmpId);
    }
    if (IsChatbl(tmpId) && currentISO() != "IN") this.registerForm(tmpId);
  };
  
  UserLogin.prototype.registerForm = function (tmpId) {
    var meta2 = document.createElement("script");
    meta2.src = "https://apis.google.com/js/platform.js";
    document.getElementsByTagName("head")[0].appendChild(meta2);
    var clientID = "";
    var that = this;
    if (
      appsServerName == "//dev-apps.imimg.com/" ||
      appsServerName == "//stg-apps.imimg.com/"
    ) {
      clientID =
        "335658149809-o25hpstdu2tdo43j8ppg8l6n6i0dtfl0.apps.googleusercontent.com";
    } else {
      clientID =
        "432055510365-4for8jpqviklkgt2lssm41sfhhfo0ovs.apps.googleusercontent.com";
    }
    meta2.onload = function () {
      if (typeof gapi !== "undefined") {
        gapi.load("auth2", function () {
          auth2 = gapi.auth2.init({
            client_id: clientID,
            //cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
          });
          googleSigninFr(
            document.getElementById("t" + tmpId + "signinBtnFr"),
            tmpId,
            that
          );
        });
      }
    };
  };
  
  function googleSigninFr(element, tmpId, userlogin) {
    auth2.attachClickHandler(
      element,
      {},
  
      function (googleUser) {
        var form_type =
          ReqObj.Form[tmpId].formType === "Enq"
            ? "Send Enquiry"
            : "Post Buy Leads";
  
        var id_token = googleUser.getAuthResponse().id_token;
        gusrname = googleUser.getBasicProfile().getName();
        gusremail = googleUser.getBasicProfile().getEmail();
        blenqGATracking(form_type,"GoogleSigninClicked",getEventLabel(),1,tmpId);
        if (gusremail != "") {
          userlogin.checkEmailExistOrNotFR(gusremail,id_token,gusrname,tmpId,userlogin);
        }
      },
      function (error) {}
    );
  }
  
  UserLogin.prototype.checkEmailExistOrNotFR = function (gusremail,id_token,gusrname,tmpId,userlogin) {
    var that = userlogin;
    var iso = currentISO();
    var ph_country = ReqObj.isoFlag;
    var url = this.getGoogleLoginAjaxURL();
    if (typeof country_ip === "undefined" || country_ip === null) {
      // country_ip not defined
      var iploc = usercookie.getCookie("iploc");
      var country_ip = usercookie.getParameterValue(iploc, "gip");
    }
    var params_request = {
      username: gusremail,
      iso: iso,
      modid: ReqObj.Form[tmpId].modId,
      format: "JSON",
      create_user: 1,
      originalreferer: window.location.href,
      GEOIP_COUNTRY_ISO: iso,
      ip: country_ip,
      screen_name: "BL/Enq Forms",
      id_token: id_token,
      gusername: gusrname,
      guseremail: gusremail,
      ph_country: ph_country,
    };
    var form_type =ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var msg_ga = "failure";
    $.ajax({
      url: url,
      type: "POST",
      data: params_request,
      jsonpCallback: "create_callback",
      crossDomain: true,
      success: function (jsonResult) {
        // if(gusremail == "manisince1999@gmail.com"){
        //     jsonResult = '{"code":"204","message":"We have multiple account linked with this Email ID","access":"0","data_num":"7008439239,8456093931,1946948846,1658845666,7978532529","msg":"Multiple accounts are linked with this Email ID.  Please enter your registered mobile number to continue"}'
        // }
  
        // remove if error already present
        if (!$("#t" + tmpId + "_msg_primary_info_err_login").hasClass("bedsnone")) {
          that.handleUI({
            data: {
              tmpId: tmpId,
              todo: "removeError",
              obj: that,
            },
          });
        }
        if (!$("#t" + tmpId + "_error_first_name1").hasClass("bedsnone")) {
          $("#t" + tmpId + "_q_first_nm" + "1")
            .removeClass("highlight-err mb-erbrd nb-erbrd")
            .siblings(".redc")
            .removeClass("redc");
          $("#t" + tmpId + "_error_first_name" + "1").addClass("bedsnone");
        }
  
        $("#t" + tmpId + "_login_field").val(gusremail);
        $("#t" + tmpId + "_q_first_nm1").val(gusrname);
        $("#t" + tmpId + "_q_first_nm1").parent().addClass("eqfcsed");
        var jsonResult = $.parseJSON(jsonResult);
        if (jsonResult["code"] == 200) {
          var access = jsonResult.access;
          if (access != undefined && access == "2") {
            document.cookie ="ImeshVisitor=; domain=.indiamart.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.reload();
            return;
          }
          if (isSet(jsonResult.DataCookie.iso) && jsonResult.DataCookie.iso == "IN") {
            that.handleUI({
              data: {
                tmpId: tmpId,
                todo: "tryagain",
                obj: userlogin,
                msg: "You seem to be from India. Select India as Country",
              },
            });
          } else {
            var msg = jsonResult["msg"];
            if (msg == "Unique Email found in Primary Email") {
              var glid = jsonResult["GLID"];
              var data1 = jsonResult.DataCookie;
              verifyEmailViaLWG(gusremail, glid);
              var loginSet = jsonResult.LoginCookie;
              var tokenSet = jsonResult.im_iss;
              imesh_obj.set(data1, "ImeshVisitor");
              v4iilex_obj.set(loginSet, "v4iilex");
              im_iss_obj.set(tokenSet, "im_iss");
              msg_ga = "success";
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
              $("#t" + tmpId + "_q_first_nm1")
                .parent()
                .addClass("eqfcsed");
              ReqObj.Form[tmpId].FormSequence.FormSubmit(tmpId, {
                source: "google-login",
                target: "google",
              });
            }
          }
        } else {
          if (jsonResult["code"] == "204") {
            var err_msg = jsonResult["msg"];
            if (jsonResult["message"] == "ISO MisMatch") {
              invalidMsgLogin(err_msg);
              $("#country-dropdown").css("pointer-events", "auto");
            } else if (jsonResult["message"].match(/suspicious/g)) {
              var msg = jsonResult["message"];
              invalidMsgLogin(err_msg);
            } else if (
              jsonResult["message"] ==
              "We have multiple account linked with this Email ID"
            ) {
              var var_msg = jsonResult["message"];
              var mobile_numbers = jsonResult["data_num"];
              that.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "tryagain",
                  obj: userlogin,
                  msg: var_msg,
                },
              });
            } else if (
              jsonResult["message"] == "No Email found in Primary Email"
            ) {
              $("#t" + tmpId + "_q_first_nm1")
                .parent()
                .addClass("eqfcsed");
              if (!isGDPRCountry()) {
                ReqObj.Form[tmpId].FormSequence.FormSubmit(tmpId, {
                  source: "google-login",
                  target: "google",
                  code: "204",
                });
                msg_ga = "success";
              }
            } else if (jsonResult["message"] == "Invalid Token ID") {
              invalidMsgLogin("Invalid token request");
            } else {
              invalidMsgLogin(err_msg);
            }
          }
        }
      },
      error: function (event) {
        msg_ga = "failure";
      },
      complete: function (event) {
        blenqGATracking(form_type,"GoogleSignin : " + msg_ga,getEventLabel(),1,tmpId);
      },
    });
  };
  
  UserLogin.prototype.EventIfScreenPresent = function (tmpId) {
    if (isOtherEnq(tmpId)) {
      this.handleHeading(tmpId);
      ButtonNameUI("isq", tmpId);
    }
  };
  
  UserLogin.prototype.handleHeading = function (tmpId) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq")
      $("#t" + tmpId + "_hdg")
        .removeClass("bedsnone")
        .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    else if (
      isImageVidEnq(tmpId) &&
      ReqObj.Form[tmpId].FormSequence.StepCounter === 0
    )
      $("#t" + tmpId + "_hdg")
        .addClass("bedsnone")
        .html("");
    else
      $("#t" + tmpId + "_hdg")
        .removeClass("bedsnone")
        .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
  };
  
  UserLogin.prototype.handleButton = function (tmpId) {
    ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
  };
  
  UserLogin.prototype.onSubmit = function (tmpId) {
    $("#yajaca").hide(); // click away message on pns form
    if (isSet(tmpId)) {
      var logObject = PreAjax("UserLogin", tmpId);
      if (this.toChange === false) {
        this.sendRequest({
          data: {
            logObject: logObject,
            tmpId: tmpId,
            userlogin: this,
            blureve: false,
            todo: "login",
          },
        });
      } else {
        PostAjax(logObject, tmpId);
      }
    }
  };
  
  UserLogin.prototype.SaveDetails = function (tmpId, event) {
    if (IsChatbl(tmpId)) {
      ReqObj.Form[tmpId].UserInputs["PrimaryInfo"] = $(
        "#t" + tmpId + "_login_field"
      ).val(); /* change using event target Id */
      if (isSet(event.target.textContent) && event.target.textContent !== "")
        ReqObj.Form[tmpId].UserInputs["toChange"] = event.target.textContent;
    }
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
        chathelpmsg =
          "<div class='t" +
          tmpId +
          "_userInput cbl_br10 dn'><div class='befs11 beclr'><i class='chat-elip'>i</i>Seller Details are sent on this " +
          helpiso +
          "</div></div>";
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
        if ( ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0 )
          sticky = "bedvh nflgm";
        var UserLoginSuffixOuterHtml = isSSB(UserloginObj.tmpId)? "<div><div  id='t" +UserloginObj.tmpId + "_login' class='" + ssbClass("wrprClass", UserloginObj.tmpId) + "'>" : "<div  id='t" + UserloginObj.tmpId + "_login' class='" + sticky + "'>";
        var countryDiv = this.countryDiv(UserloginObj.tmpId);
        var cntflg = flagd(countryDiv, UserloginObj.tmpId);
        var UserLoginSuffixClosingHtml = isSSB(UserloginObj.tmpId)
          ? "</div>" : Enq04(UserloginObj.tmpId) || (Bl04(tmpId) && !( ReqObj["Form"][UserloginObj.tmpId].modId === "DIR" && !isNotfoundBl(UserloginObj.tmpId)))
          ? "</div>" + cntflg: "</div>";
        UserLoginSuffixHtmlObj = {
          SuffixOuterHtml: UserLoginSuffixOuterHtml,
          SuffixClosingHtml: UserLoginSuffixClosingHtml,
          suffix: "_login",
        };
        this.loginhtml = MakeWrapper( [this.UserloginHtmlObjArray], UserloginObj.tmpId,UserLoginSuffixHtmlObj,"");
      } else {
        var countryDiv = this.countryDiv(UserloginObj.tmpId);
        var world_img = '<i class="oeWicn"></i>';
        var cls = "bepr oeCnty";
        ReqObj.Form[UserloginObj.tmpId].ctn = ReqObj.IPDetails["countryname"] == "" ? "India" : ReqObj.IPDetails["countryname"];
        var html = "<div id='t" + UserloginObj.tmpId + "mflag'class='oeChng'>" + world_img + "<div class='oef0'>Your Country is </div><div id='t" + UserloginObj.tmpId + "country' class='" + cls + "'>" + ReqObj.Form[UserloginObj.tmpId].ctn + countryDiv + "</div></div>";
        this.loginhtmlQues = MakeWrapper( [this.UserloginHtmlObjArray], UserloginObj.tmpId, WrapperObj( "<div id='t" + UserloginObj.tmpId + "_login' class = 'cbl_ques cbl_vh'>", "</div>", "_login" ), "ques" );
        this.loginhtmlInput = MakeWrapper( [this.UserloginHtmlObjArray], UserloginObj.tmpId, WrapperObj( "<div id = 't" + UserloginObj.tmpId + "_login_input' class ='cbl_dtls cbl_mobile cbl_df cbl_aic t" + UserloginObj.tmpId + "_userInput cbl_br10 dn'>","</div>", "_login"), "input" );
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
    var mob_html = pdpInactiveBL(tmpId) ? "mob-input" : "";
    var inputCls = IsChatbl(this.what)
      ? ""
      : isSSB(this.what)
      ? "mb-mNm"
      : iso_change === "IN"
      ? isMoglixUi(tmpId)
        ? "be-input beW3 beh32"
        : "be-input " + sticky + " beW3 beh32 " + mob_html
      : isMoglixUi(tmpId)
      ? "be-input beW3 beh32 beemail"
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
    if(pdpInactiveBL(tmpId)){
        label = (currentISO()=='IN') ? "Mobile Number <span class='redc'>*</span>" : "Email ID <span class='redc'>*</span>";
    }
    if (isBlInlineFr(tmpId)) label += "*";
    label = iplocExist() === "" && ReqObj.ipLoc.zoneISO === "OTHER" && ReqObj.ipLoc.onClose === false ? "" : label;
    var sticky = isSticky(tmpId) ? "FM_be-lbl" : "be-lbl";
    var frcls = isBlInlineFr(tmpId) ? " fadLbl" : "";
    var boldcls = pdpenqImage(tmpId) ? "" : "befwt ";
    var labelclass = isFirstImgVidCTA(tmpId) ? boldcls + sticky + " beml-50 fsciv eqmb20" : isSSB(tmpId) ? ssbClass("label", tmpId) : isBlInline(tmpId) ? "fs15 cl11 wf" + frcls : sticky + " beml-50";
    if ( ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0)
      labelclass += " nflblm";
    var text = label;
    var html = ""; /* Do not change the html sequence */
    if (IsChatbl(tmpId)) {
      html += "Please share your ";
      html += returnSpan("t" + tmpId, "login_span_bold", label, "befwt");
      html += " to receive quotes from sellers";
      html += iso_change === "IN" ? "" : '<div id = "t' +tmpId + '_gwrap"> <p style="font-size:14px;font-weight:600;text-align: center;margin-top: 10px; ">OR</p> <div id="t' +tmpId +'_gSignInWrapper" style="text-align:center; margin: 10px 0px 15px 0px;" > <div id="t' + tmpId + 'signinBtnFr" class="customG"> <span class="Gicon"> </span> <span class="buttonTextfr "> Login with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
    } else {
      if ( (!isBlInline(tmpId) && !isSSB(tmpId) && !isOtherEnq(tmpId)) || (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09"))
        html += that.returnErrorDiv(tmpId, formType);
  
      html += isMoglixUi(tmpId)? "" : returnLabel("t" + tmpId, text, "_label-l", labelclass);
  
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
    return $("#t" + tmpId + "flagdiv2").length > 0
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
    if ((Enq04(tmpId) || isMoglixUi(tmpId)) && $("#t" + tmpId + "flag").length)
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
      : Bl09(tmpId) && iso_change !== "IN" ? pdpInactiveBL(tmpId) ? "eqCnty be-flg bebdr brdlft8" : "eqCnty be-flg bebdr"
      : isNotfoundBl(tmpId) && iso_change !== "IN" ? "eqCnty pr nfblf" : "eqCnty pr";
  
    var flagDiv = "";
    var brdlft = (pdpInactiveBL(tmpId)) ? "be-flisq iso brdlft8" : "be-flisq iso";
    if (formType.toLowerCase() === "bl") {
      //html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";
      html += "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
      if (iso_change === "IN")
        html += isSSB(tmpId)
          ? returnIsoHtml(tmpId, "") + "</div>"
          : returnIsoHtml(tmpId, brdlft) + "</div>";
      else html += "</div>";
    } else {
      if (isMoglixUi(tmpId)) eqcntyClass = eqcntyClass + " beabult";
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
    var brdlft = (pdpInactiveBL(tmpId))? "be-flisq iso brdlft8" : "be-flisq iso";
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
        var frcls = Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl" && currentISO() != "IN" ? "mb10imp" : Bl09(tmpId) && !pdpInactiveBL(tmpId) && currentISO() !== "IN" && imeshExist() === "" ? "blfr" : "";
        var clss = isBlInlineFr(tmpId) ? "fmb15" : "idsf pfstrt mb20";
        that.UserloginHtmlObj["OuterWrapper"] = IsChatbl(tmpId) || isSSB(tmpId) ? "" : isBlInline(tmpId) ? '<div class="' + clss + '">' : pdpInactiveBL(tmpId) ? "<div class='idsf' id='name_email'><div class='belft bepr bT1-st3 " + frcls + "'>" : "<div class='belft bepr bemgb15 bT1-st3 " + frcls + "'>";
  
        that.UserloginHtmlObj["ClosingWrapper"] = IsChatbl(tmpId) || isSSB(tmpId) ? "" : pdpInactiveBL(tmpId)? "</div></div>" : "</div>";
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
      modid: ReqObj.Form[tmpId].modId,
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
    if(isSet(event.data.iso)) var iso = event.data.iso;
    var bool = blureve === true && (isEnq(tmpId) || Bl09(tmpId)) && iso === "IN" ? false : isSet(blureve) && blureve === true ? userlogin.validate(tmpId, event) : true;
    return bool;
  };
  
  UserLogin.prototype.beforHitDefaults = function ( logObject, todo, tmpId, userlogin) {
    if ( (isSet(logObject) && logObject !== "") || (logObject === "" && todo === "blurlogin")) {
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
      modid: ReqObj.Form[tmpId].modId,
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
              blenqGATracking(form_type,"service:EtoGlusrLogin:" + res.message,res,1,tmpId);
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
              blenqGATracking(form_type,"service:EtoGlusrLogin:failure",res,1,tmpId);
              userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
            }
          } else {
            /* If response not set :: empty/null/undefined */
            blenqGATracking(form_type,"service:EtoGlusrLogin:failure","response undefined",1,tmpId);
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
          blenqGATracking(form_type,"service:EtoGlusrLogin:failure",res,1,tmpId);
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
// ulscreen

//form seq screen switch prototypes


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
      _that.MakeSeq(
        _that.returnClassObjects(i, classObj.classArray[i], classObj)
      );
      if (
        isSet(classObj.leadServiceObj) &&
        isSet(classObj.leadServiceObj[i + 1]) &&
        classObj.leadServiceObj[i + 1] !== ""
      ) {
        var type = classObj.leadServiceObj[i + 1] === "intent" ? 1 : 0;
        var _hooks =
          isSet(classObj.copyhooks) && classObj.copyhooks === true
            ? classObj.hooks[i + 1]
            : { pre: [], post: [] };
        _that.MakeSeq(
          returnGenObject(tmpId, classObj.array[i + 1], _hooks, _that, type)
        );
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

//form seq screen switch prototypes

//FORM close prototype
function FormCloseEnqBL(tmpId, event) {
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : (pdpInactiveBL(tmpId)) ? "Post Buy Leads New" : "Post Buy Leads";
  var that = ReqObj.Form[tmpId].FormSequence || {};
  var ClassesforTracking = "CloseStep:";
  ClassesforTracking += that.StepCounter + 1 + ":";
  var constructor = "";
  if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
    for (
      var i = 0;
      i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length;
      i++
    ) {
      constructor += ConstructorName(
        ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj
      );
      if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length && i > 0)
        ClassesforTracking += "-";
      ClassesforTracking += ConstructorName(
        ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj
      );
    }
  }
  blenqGATracking(form_type,ClassesforTracking,getEventLabel(),0,tmpId);
  if (constructor.toLowerCase() === "userverification" && Enq09(tmpId))
    blenqGATracking(form_type, "OTP1NotFilled", getEventLabel(), 1, tmpId);
  CloseForm(tmpId); // check !
}

// screen 0  and screen 1 

FormSeq.prototype._screen0 = function (tmpId, typeOfForm) {
  dirimgscreencount = 0;
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
      //ff_here
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
      ReqObj.Form[tmpId].IsqStep1 = ReturnCorrectVal(ReqObj.Form[tmpId].IsqStep1,3);
      ReqObj.Form[tmpId].IsqStepN = ReturnCorrectVal(ReqObj.Form[tmpId].IsqStepN,3);

      if(pdpInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter==-1 && currentISO()=='IN' && !NEC()){
        ReqObj.Form[tmpId].IsqStep1=1;
        ReqObj.Form[tmpId].IsqStepN=4;
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
  dirimgscreencount = 1;
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
  var _fallback = !Bl01(tmpId) && !Bl04(tmpId) ? null : _that.returnClassObjects(0, _rclassObj.classArray[0], _rclassObj); //ff_here
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
        }; //ff_here
  if ( ReqObj.UserDetail.mb1 != "" && checkblockedUser() && (Bl04(tmpId) || Enq04(tmpId)))
    _case = -1;
  if (_case !== -1) {
    var _afterService = returnPostBlEnqObject( tmpId, data.array, { pre: [], post: [] }, _that, "");
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
      //ff_here
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
// screen 0  and screen 1 

//iploc
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
            blenqGATracking("iploc","service:location:failure",s.Response,1,0);
            ReqObj.ipLoc.isFailed = true;
            that.failSafe();
          } /* last parameter = 0 denotes ip req */
        } else {
          blenqGATracking("iploc","service:location:failure","response undefined",1,0);
          ReqObj.ipLoc.isFailed = true;
          that.failSafe();
        }
      },
      error: function (res) {
        ReqObj.ipLoc.response = true;
        ReqObj.ipLoc.isFailed = true;
        that.failSafe();
        res = isSet(res) ? res : "response undefined";
        blenqGATracking("iploc","service:location:failure",JSON.stringify(res),1,0);
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
//iploc
