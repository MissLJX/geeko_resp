import React from 'react';
import './App.css';
import _ from 'lodash'

const __countrycode = {
    "AW":"ARUBA",
    "GL":"GREENLAND",
    "GE":"GEORGIA",
    "CO":"COLOMBIA",
    "GP":"GUADELOUPE",
    "GU":"GUAM",
    "CU":"CUBA",
    "OM":"OMAN",
    "GY":"GUYANA",
    "HT":"HAITI",
    "AD":"ANDORRA",
    "HN":"HONDURAS",
    "AO":"ANGOLA",
    "GH":"GHANA",
    "KH":"CAMBODIA",
    "GA":"GABON",
    "DJ":"DJIBOUTI",
    "ZW":"ZIMBABWE",
    "GN":"GUINEA",
    "KY":"CAYMAN ISLANDS",
    "CM":"CAMEROON",
    "QA":"QATAR",
    "KM":"COMOROS",
    "KE":"KENYA",
    "CI":"COTE D'IVOIRE",
    "KW":"KUWAIT",
    "CK":"COOK ISLANDS",
    "LV":"LATVIA",
    "AG":"ANTIGUA AND BARBUDA",
    "LB":"LEBANON",
    "LR":"LIBERIA",
    "LY":"LIBYA",
    "RE":"REUNION ISLAND",
    "RW":"RWANDA",
    "MV":"MALDIVES",
    "MT":"MALTA",
    "MW":"MALAWI",
    "ML":"MALI",
    "MU":"MAURITIUS",
    "MK":"MACEDONIA",
    "MQ":"MARTINIQUE",
    "MN":"MONGOLIA",
    "BD":"BANGLADESH",
    "PE":"PERU",
    "DM":"DOMINICA",
    "MD":"MOLDOVA",
    "MA":"MOROCCO",
    "MC":"MONACO",
    "MZ":"MOZAMBIQUE",
    "AZ":"AZERBAIJAN",
    "NA":"NAMIBIA",
    "ZA":"SOUTH AFRICA",
    "BB":"BARBADOS",
    "NP":"NEPAL",
    "NI":"NICARAGUA",
    "NE":"NIGER",
    "NG":"NIGERIA",
    "PW":"PALAU",
    "BS":"BAHAMAS",
    "SV":"EL SALVADOR",
    "RS":"SERBIA",
    "SL":"SIERRA LEONE",
    "SN":"SENEGAL",
    "CY":"CYPRUS",
    "SC":"SEYCHELLES",
    "WS":"SAMOA",
    "BM":"BERMUDA",
    "NULL":"SAINT KITTS",
    "SM":"SAN MARINO",
    "LK":"SRI LANKA",
    "PK":"PAKISTAN",
    "SR":"SURINAME",
    "AF":"AFGHANISTAN",
    "PY":"PARAGUAY",
    "TO":"TONGA",
    "TZ":"TANZANIA",
    "NULL":"TAHITI",
    "PS":"PALESTINE",
    "VU":"VANUATU",
    "GT":"GUATEMALA",
    "VE":"VENEZUELA",
    "UG":"UGANDA",
    "BH":"BAHRAIN",
    "PA":"PANAMA",
    "SY":"SYRIAN ARAB REPUBLIC",
    "JM":"JAMAICA",
    "BG":"BULGARIA",
    "AM":"ARMENIA",
    "YE":"YEMEN",
    "IQ":"IRAQ",
    "IR":"IRAN",
    "IL":"ISRAEL",
    "JO":"JORDAN",
    "TD":"CHAD",
    "ZM":"ZAMBIA",
    "GI":"GIBRALTAR",
    "CF":"CENTRAL AFRICAN REPUBLIC",
    "BJ":"BENIN",
    "BW":"BOTSWANA",
    "BA":"BOSNIA AND HERZEGOVINA",
    "BZ":"BELIZE",
    "BT":"BHUTAN",
    "BI":"BURUNDI",
    "EG":"EGYPT",
    "TG":"TOGO",
    "EC":"ECUADOR",
    "FO":"FAROE ISLANDS",
    "FJ":"FIJI",
    "GM":"GAMBIA",
    "AL":"ALBANIA",
    "CR":"COSTA RICA",
    "KZ":"KAZAKHSTAN",
    "AN":"NETHERLANDS ANTILLES",
    "KG":"KYRGYZSTAN",
    "LI":"LIECHTENSTEIN",
    "MG":"MADAGASCAR",
    "DZ":"ALGERIA",
    "MR":"MAURITANIA",
    "MH":"MARSHALL ISLANDS",
    "AS":"AMERICAN SAMOA",
    "VI":"UNITED STATES VIRGIN ISLANDS",
    "FM":"MICRONESIA",
    "PG":"PAPUA NEW GUINEA",
    "PM":"SAINT PIERRE AND MIQUELON",
    "SI":"SLOVENIA",
    "TT":"TRINIDAD AND TOBAGO",
    "UZ":"UZBEKISTAN",
    "NC":"NEW CALEDONIA",
    "ID":"INDONESIA",
    "VG":"THE BRITISH VRIGIN ISLANDS",
    "PF":"POLYNESIA",
    "BF":"BURKINA FASO",
    "ET":"ETHIOPIA",
    "PF":"FRENCH POLYNESIA",
    "GF":"FRENCH GUIANA",
    "KI":"KIRIBATI",
    "SO":"SOMALIA",
    "ER":"ERITREA",
    "GD":"GRENADA",
    "AI":"ANGUILLA",
    "GW":"GUINEA-BISSAU",
    "LC":"SAINT LUCIA",
    "JE":"JERSEY",
    "PT":"MADEIRA ISLANDS",
    "PT":"AZORES",
    "ES":"BALEARIC ISLANDS",
    "MF":"SAINT MARTIN",
    "LS":"LESOTHO",
    "WF":"WALLIS AND FUTUNA",
    "MP":"NORTHERN MARIANA ISLANDS",
    "ME":"MONTENEGRO",
    "IC":"CANARY ISLANDS",
    "VA":"VATICAN CITY STATE",
    "FK":"ISLAS MALVINAS",
    "TJ":"TAJIKISTAN",
    "GQ":"EQUATORIAL GUINEA",
    "VC":"SAINT VINCENT AND THE GRENADINES",
    "YT":"TERRITORIAL COLLECTIVITY OF MAYOTTE",
    "TC":"TURKS AND CAICOS ISLANDS",
    "SB":"SOLOMON ISLANDS",
    "NULL":"THE FEDERATION OF NEVIS",
    "EH":"WESTERN SAHARA",
    "TM":"TURKMENISTAN",
    "CV":"CAPE VERDE",
    "NR":"NAURU",
    "NULL":"SAIPAN LSLAND",
    "NF":"NORFOLK ISLAND",
    "KS":"KOSOVO",
    "CW":"CURACAO",
    "GG":"GUERNSEY",
    "KN":"SAINT KITTS AND NEVIS",
    "MS":"MONTSERRAT",
    "CD":"THE DEMOCRATIC REPUBLIC OF THE CONGO",
    "CG":"CONGO",
    "Z2":"ASCENSION ISLAND",
    "TL":"TIMOR-LESTE",
    "NU":"NIUE",
    "PN":"PITCAIRN ISLANDS",
    "CX":"CHRISTMAS ISLAND",
    "ST":"SAO TOME AND PRINCIPE",
    "SH":"SAINT HELENA",
    "TV":"TUVALU",
    "TK":"TOKELAU",
    "IM":"ISLE OF MAN",
    "NULL":"MARIANA LSLANDS",
    "DO":"DOMINICAN REPUBLIC",
    "GS":"SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",
    "IO":"BRITISH INDIAN OCEAN TERRITORY",
    "MX":"MEXICO",
    "HK":"HONG KONG CHINA",
    "KR":"REPUBLIC OF KOREA",
    "NL":"NETHERLANDS",
    "CA":"CANADA",
    "CZ":"CZECH REPUBLIC",
    "HR":"CROATIA",
    "LA":"LAOS",
    "AU":"AUSTRALIA",
    "LT":"LITHUANIA",
    "RO":"ROMANIA",
    "LU":"LUXEMBOURG",
    "AT":"AUSTRIA",
    "MY":"MALAYSIA",
    "MO":"MACAO CHINA",
    "US":"UNITED STATES",
    "MM":"MYANMAR",
    "NO":"NORWAY",
    "PT":"PORTUGAL",
    "JP":"JAPAN",
    "SE":"SWEDEN",
    "CH":"SWITZERLAND",
    "BY":"BELARUS",
    "SK":"SLOVAKIA",
    "SZ":"SWAZILAND",
    "TH":"THAILAND",
    "TW":"TAIWAN CHINA",
    "TR":"TURKEY",
    "TN":"TUNISIA",
    "BN":"BRUNEI DARUSSALAM",
    "UA":"UKRAINE",
    "UY":"URUGUAY",
    "ES":"SPAIN",
    "GR":"GREECE",
    "SG":"SINGAPORE",
    "NZ":"NEW ZEALAND",
    "HU":"HUNGARY",
    "IT":"ITALY",
    "IN":"INDIA",
    "GB":"UNITED KINGDOM",
    "BR":"BRAZIL",
    "VN":"VIETNAM",
    "CL":"CHILE",
    "AR":"ARGENTINA",
    "BE":"BELGIUM",
    "IS":"ICELAND",
    "PR":"PUERTO RICO",
    "PL":"POLAND",
    "IE":"IRELAND",
    "BO":"BOLIVIA",
    "DK":"DENMARK",
    "DE":"GERMANY",
    "EE":"ESTONIA",
    "RU":"RUSSIAN FEDERATION",
    "FR":"FRANCE",
    "PH":"PHILIPPINES",
    "AE":"UNITED ARAB EMIRATES",
    "FI":"FINLAND",
    "SA":"SAUDI ARABIA",
}


const __getcountry = c => __countrycode[c]


const _shipping_infos = [
    {
        country: 'ARUBA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GREENLAND',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GEORGIA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'COLOMBIA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GUADELOUPE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GUAM',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CUBA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'OMAN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GUYANA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'HAITI',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ANDORRA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'HONDURAS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ANGOLA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GHANA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CAMBODIA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GABON',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'DJIBOUTI',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ZIMBABWE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GUINEA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CAYMAN ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CAMEROON',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'QATAR',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'COMOROS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'KENYA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'COTE D\'IVOIRE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'KUWAIT',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'COOK ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'LATVIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ANTIGUA AND BARBUDA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'LEBANON',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'LIBERIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'LIBYA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'REUNION ISLAND',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'RWANDA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MALDIVES',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MALTA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MALAWI',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MALI',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MAURITIUS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MACEDONIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MARTINIQUE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MONGOLIA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BANGLADESH',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PERU',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'DOMINICA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MOLDOVA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MOROCCO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MONACO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MOZAMBIQUE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'AZERBAIJAN',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NAMIBIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SOUTH AFRICA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BARBADOS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NEPAL',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NICARAGUA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NIGER',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NIGERIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PALAU',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BAHAMAS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'EL SALVADOR',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SERBIA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SIERRA LEONE',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SENEGAL',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CYPRUS',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SEYCHELLES',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAMOA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BERMUDA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAINT KITTS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAN MARINO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SRI LANKA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PAKISTAN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SURINAME',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'AFGHANISTAN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PARAGUAY',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TONGA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TANZANIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TAHITI',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PALESTINE',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'VANUATU',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GUATEMALA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'VENEZUELA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'UGANDA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BAHRAIN',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PANAMA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SYRIAN ARAB REPUBLIC',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'JAMAICA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BULGARIA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ARMENIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'YEMEN',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'IRAQ',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'IRAN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ISRAEL',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'JORDAN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CHAD',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ZAMBIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GIBRALTAR',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CENTRAL AFRICAN REPUBLIC',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BENIN',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BOTSWANA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BOSNIA AND HERZEGOVINA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BELIZE',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BHUTAN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BURUNDI',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'EGYPT',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TOGO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ECUADOR',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'FAROE ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'FIJI',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GAMBIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ALBANIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'COSTA RICA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'KAZAKHSTAN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NETHERLANDS ANTILLES',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'KYRGYZSTAN',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'LIECHTENSTEIN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MADAGASCAR',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ALGERIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MAURITANIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MARSHALL ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'AMERICAN SAMOA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'UNITED STATES VIRGIN ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MICRONESIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PAPUA NEW GUINEA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAINT PIERRE AND MIQUELON',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SLOVENIA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TRINIDAD AND TOBAGO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'UZBEKISTAN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NEW CALEDONIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'INDONESIA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'THE BRITISH VRIGIN ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'POLYNESIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BURKINA FASO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ETHIOPIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'FRENCH POLYNESIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'FRENCH GUIANA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'KIRIBATI',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SOMALIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ERITREA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GRENADA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ANGUILLA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GUINEA-BISSAU',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAINT LUCIA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'JERSEY',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MADEIRA ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'AZORES',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BALEARIC ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAINT MARTIN',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'LESOTHO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'WALLIS AND FUTUNA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NORTHERN MARIANA ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MONTENEGRO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CANARY ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'VATICAN CITY STATE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ISLAS MALVINAS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TAJIKISTAN',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'EQUATORIAL GUINEA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAINT VINCENT AND THE GRENADINES',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TERRITORIAL COLLECTIVITY OF MAYOTTE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TURKS AND CAICOS ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SOLOMON ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'THE FEDERATION OF NEVIS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'WESTERN SAHARA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TURKMENISTAN',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CAPE VERDE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NAURU',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAIPAN LSLAND',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NORFOLK ISLAND',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'KOSOVO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CURACAO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GUERNSEY',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAINT KITTS AND NEVIS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MONTSERRAT',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'THE DEMOCRATIC REPUBLIC OF THE CONGO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CONGO',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ASCENSION ISLAND',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TIMOR-LESTE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NIUE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PITCAIRN ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CHRISTMAS ISLAND',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAO TOME AND PRINCIPE',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAINT HELENA',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TUVALU',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TOKELAU',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ISLE OF MAN',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MARIANA LSLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'DOMINICAN REPUBLIC',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BRITISH INDIAN OCEAN TERRITORY',
        standard: {
            time: '20-60',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '3-7',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MEXICO',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'HONG KONG CHINA',
        standard: {
            time: '3-7',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'REPUBLIC OF KOREA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NETHERLANDS',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CANADA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CZECH REPUBLIC',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CROATIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'LAOS',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'AUSTRALIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'LITHUANIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ROMANIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'LUXEMBOURG',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'AUSTRIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MALAYSIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MACAO CHINA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'UNITED STATES',
        standard: {
            time: '5-10',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'MYANMAR',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NORWAY',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PORTUGAL',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'JAPAN',
        standard: {
            time: '5-10',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SWEDEN',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SWITZERLAND',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BELARUS',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SLOVAKIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SWAZILAND',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'THAILAND',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TAIWAN CHINA',
        standard: {
            time: '3-7',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TURKEY',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'TUNISIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BRUNEI DARUSSALAM',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'UKRAINE',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'URUGUAY',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SPAIN',
        standard: {
            time: '5-10',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GREECE',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SINGAPORE',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'NEW ZEALAND',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'HUNGARY',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ITALY',
        standard: {
            time: '5-10',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'INDIA',
        standard: {
            time: '5-10',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'UNITED KINGDOM',
        standard: {
            time: '3-7',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BRAZIL',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'VIETNAM',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'CHILE',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ARGENTINA',
        standard: {
            time: '15-30',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BELGIUM',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ICELAND',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PUERTO RICO',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'POLAND',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'IRELAND',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'BOLIVIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'DENMARK',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'GERMANY',
        standard: {
            time: '3-7',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'ESTONIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'RUSSIAN FEDERATION',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'FRANCE',
        standard: {
            time: '3-7',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'PHILIPPINES',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'UNITED ARAB EMIRATES',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'FINLAND',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    },
    {
        country: 'SAUDI ARABIA',
        standard: {
            time: '7-15',
            free: 'FREE for orders over $49USD'
        },
        express:{
            time: '1-3',
            free: 'Calculated by weight and distance'
        }
    }
]


const getGroupCountries = (infos) => {
    return _.groupBy(infos, info => info.country.substr(0, 1).toUpperCase())
}



class FilterInpunt extends React.Component {
    render() {
        return (
            <div className="x-filter-input">
                <i className="iconfont">&#xe71c;</i>
                <input placeholder="Please choose your country" value={this.props.ds} onMouseOver={(e) => {this.props.focusHandle(e, true)}} onChange={this.props.filterHandle}/>
            </div>

        )
    }
}

class LiCountry extends React.Component {
    render() {
        return <li onClick={this.props.liClickHandle} className="x-country-li" value={this.props.li.country}>{this.props.li.country}</li>
    }
}

class LiFirstLetter extends React.Component {
    render() {
        return <li className="x-group-letter">{this.props.k}</li>
    }
}


class Lis extends React.Component {
    render() {
        return (
            <React.Fragment>
                <LiFirstLetter key={this.props.k} k={this.props.k}/>
                {

                    this.props.lis.map((v,i) => <LiCountry liClickHandle={this.props.liClickHandle} key={v.country} li={v}/>)
                }
            </React.Fragment>
        )

    }
}


class LiDisplayer extends React.Component {

    render() {
        const groupCountry = getGroupCountries(this.props.infos)

        const sortedKeys = Object.keys(groupCountry).sort()

        return (
            <ul className={'x-countries'+(this.props.isShow ? ' active' : '')}>
                {

                    sortedKeys.map((k) => {
                        return <Lis liClickHandle={this.props.liClickHandle} key={k} k={k} lis={groupCountry[k]}/>
                    })

                }
            </ul>
        )
    }
}

class ShippingCell extends React.Component {
    render() {
        return <td rowSpan={this.props.col || 1}>{this.props.value}</td>
    }
}

class ShippingRow extends React.Component {
    render() {
        return (
            <tr>
                {/*{this.props.isFirst && <ShippingCell col={this.props.col} value={this.props.row.region}/>}*/}
                <ShippingCell value={this.props.row.country}/>
                <ShippingCell value={this.props.row.standard.time}/>
                <ShippingCell value={this.props.row.standard.free}/>
                <ShippingCell value={this.props.row.express.time}/>
                <ShippingCell value={this.props.row.express.free}/>
            </tr>
        )
    }
}

class ShippingRows extends React.Component {
    render() {
        const stateGroup = this.props.stateGroup
        const stateKeys = Object.keys(stateGroup).sort()
        const result = stateKeys.map((sk) => {
            let rows = stateGroup[sk]
            return rows.map((row, index) => {
                return <ShippingRow col={rows.length} key={row.country} isFirst={index === 0} row={row}/>
            })
        })
        return result
    }
}


class ShippingTable extends React.Component {
    render() {

        if(!this.props.infos || !this.props.infos.length)
            return <div className="x-shipping-empty"></div>



        const stateGroup = _.groupBy(this.props.infos, info => info.region)

        return (
            <table className="x-shipping-table">
                <thead>
                <tr>
                    {/*<th rowSpan='2'>REGION</th>*/}
                    <th rowSpan='2'>COUNTRY</th>
                    <th colSpan='2'>Standard Shipping</th>
                    {/*<th colSpan='2'>Expedited Shipping</th>*/}
                    <th colSpan='2'>Express Shipping</th>
                </tr>

                <tr className="x-shipping-back-grey">
                    <th>Shipping Time</th>
                    <th>Fee</th>
                    {/*<th>Shipping Time</th>
                    <th>Fee</th>*/}
                    <th>Shipping Time</th>
                    <th>Fee</th>
                </tr>
                </thead>

                <tbody>
                <ShippingRows stateGroup={stateGroup} />
                </tbody>

            </table>



        )
    }
}
class ShippingFilter extends React.Component {

    constructor(props) {
        super(props)

        let searchkey = __getcountry(window.__searchkey__)


        this.state = {
            searchValue: searchkey || '',
            displayValue: searchkey || '',
            filteredInfos: this.props.infos,
            filteredDisplyInfos: searchkey ? this.props.infos.filter(p => _.startsWith(p.country.toLowerCase(), searchkey.toLowerCase())) :this.props.infos,
            focused: false
        }

        this.changeHandle = this.changeHandle.bind(this)
        this.focusHandle = this.focusHandle.bind(this)
        this.filterHandle = this.filterHandle.bind(this)
        this.liClickHandle = this.liClickHandle.bind(this)



    }


    componentDidMount(){
        window.addEventListener('click', (e) => {
            this.setState({focused: false})
        }, false);
    }


    changeHandle(e) {
        e.preventDefault()
        this.setState({
            searchValue: e.target.value
        })


    }


    focusHandle(event, f){
        event.preventDefault()
        this.setState({
            focused: f,
            searchValue: '',
            filteredInfos: this.props.infos
        })
    }


    filterHandle(e){
        e.preventDefault()
        let f = e.target.value
        this.setState(
            {
                filteredInfos: this.props.infos.filter(p => _.startsWith(p.country.toLowerCase(), f.toLowerCase())  ),
                searchValue: f,
                displayValue: f
            }

        )

        if(!f){

            this.setState({
                filteredDisplyInfos: this.props.infos
            })
        }
    }


    liClickHandle(e){
        e.preventDefault()
        let f = e.target.getAttribute('value')
        this.setState(
            {
                filteredDisplyInfos: this.props.infos.filter(p => _.startsWith(p.country.toLowerCase(), f.toLowerCase())),
                searchValue: f,
                focused: false,
                displayValue: f
            }
        )

    }


    render() {
        return (
            <div className="x-country-filter">
                <div className="hd" onClick={(e) => { e.nativeEvent.stopImmediatePropagation()}}>
                    <div className="x-filter-putor">
                        <FilterInpunt focused={this.state.focused} sv={this.state.searchValue} ds={this.state.displayValue} changeHandle={this.changeHandle} focusHandle={this.focusHandle} filterHandle={this.filterHandle}/>
                        <LiDisplayer liClickHandle={this.liClickHandle} isShow={this.state.focused} infos={this.state.filteredInfos}/>
                    </div>

                </div>
                <div className="bd">
                    <ShippingTable infos={this.state.filteredDisplyInfos}/>
                </div>

            </div>

        )
    }
}

export default {ShippingFilter,_shipping_infos}
