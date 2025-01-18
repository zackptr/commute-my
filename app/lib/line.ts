export type LineType = "LRT" | "MR" | "MRT" ;

export type Line = {
    id: string;
    type: LineType;
    name: string;
    color: string;
    stations: Station[];
};

export type Station = {
    id: string;
    name: string;
    lat: number;
    lng: number;
    nearby?: string[] | undefined;
    connectingStations?: string[] | undefined;
    interchangeStations?: string[] | undefined;
};

export const ampangLine: Line = {
    id: "AG",
    type: "LRT",
    name: "Ampang",
    color: "bg-lrt-ag",
    stations: [
        { id: "AG18", name: "Ampang", lat: 3.150318, lng: 101.760049, interchangeStations: ["KG22"] },
        { id: "AG17", name: "Cahaya", lat: 3.140575, lng: 101.756677 },
        { id: "AG16", name: "Cempaka", lat: 3.138324, lng: 101.752979 },
        { id: "AG15", name: "Pandan Indah", lat: 3.134581, lng: 101.746509 },
        { id: "AG14", name: "Pandan Jaya", lat: 3.130141, lng: 101.739122 },
        { id: "AG13", name: "Maluri", lat: 3.12329, lng: 101.727283, nearby: ["Sunway Velocity"] },
        { id: "AG12", name: "Miharja", lat: 3.120973, lng: 101.717922 },
        { id: "AG11", name: "Chan Sow Lin", lat: 3.128105, lng: 101.715637, interchangeStations: ["PY24", "SP11"] },
        { id: "AG10", name: "Pudu", lat: 3.134879, lng: 101.711957, interchangeStations: ["SP10"] },
        { id: "AG9", name: "Hang Tuah", lat: 3.140012, lng: 101.705984, nearby: ["Berjaya Times Square", "The Mitsui Shopping Park LaLaport Bukit Bintang City Centre"], interchangeStations: ["SP9", "MR4"] },
        { id: "AG8", name: "Plaza Rakyat", lat: 3.144049, lng: 101.702105, interchangeStations: ["SP8", "KG17"] },
        { id: "AG7", name: "Masjid Jamek", lat: 3.14927, lng: 101.696377, interchangeStations: ["KJ13", "SP7"] },
        { id: "AG6", name: "Bandaraya", lat: 3.155567, lng: 101.694485, interchangeStations: ["SP6"] },
        { id: "AG5", name: "Sultan Ismail", lat: 3.161245, lng: 101.694109, interchangeStations: ["SP5"], connectingStations: ["MR9"] },
        { id: "AG4", name: "PWTC", lat: 3.166333, lng: 101.693586, interchangeStations: ["SP4"] },
        { id: "AG3", name: "Titiwangsa", lat: 3.173497, lng: 101.695367, interchangeStations: ["PY17", "SP3", "MR11"] },
        { id: "AG2", name: "Sentul", lat: 3.178484, lng: 101.695542, interchangeStations: ["SP2"] },
        { id: "AG1", name: "Sentul Timur", lat: 3.185897, lng: 101.695217, interchangeStations: ["SP1"] },
    ],
};

export const sriPetalingLine: Line = {
    id: "SP",
    type: "LRT",
    name: "Sri Petaling",
    color: "bg-lrt-sp",
    stations: [
        { id: "SP31", name: "Putra Heights", lat: 2.996016, lng: 101.575521, interchangeStations: ["KJ37"] },
        { id: "SP29", name: "Puchong Prima", lat: 2.999808, lng: 101.596692 },
        { id: "SP28", name: "Puchong Perdana", lat: 3.007913, lng: 101.605021 },
        { id: "SP27", name: "Bandar Puteri", lat: 3.017111, lng: 101.612855 },
        { id: "SP26", name: "Taman Perindustrian Puchong", lat: 3.022814, lng: 101.613514 },
        { id: "SP25", name: "Pusat Bandar Puchong", lat: 3.033194, lng: 101.616057 },
        { id: "SP24", name: "IOI Puchong Jaya", lat: 3.048101, lng: 101.62095, nearby: ["IOI Mall Puchong"] },
        { id: "SP22", name: "Kinrara", lat: 3.050506, lng: 101.644294 },
        { id: "SP21", name: "Alam Sutera", lat: 3.0547, lng: 101.656468 },
        { id: "SP20", name: "Muhibbah", lat: 3.062229, lng: 101.662552 },
        { id: "SP19", name: "Awan Besar", lat: 3.062131, lng: 101.670555 },
        { id: "SP18", name: "Sri Petaling", lat: 3.061445, lng: 101.687074 },
        { id: "SP17", name: "Bukit Jalil", lat: 3.058196, lng: 101.692125 },
        { id: "SP16", name: "Sungai Besi", lat: 3.063842, lng: 101.708062, interchangeStations: ["PY29"] },
        { id: "SP15", name: "Bandar Tasik Selatan", lat: 3.076058, lng: 101.711107 },
        { id: "SP14", name: "Bandar Tun Razak", lat: 3.089576, lng: 101.712466 },
        { id: "SP13", name: "Salak Selatan", lat: 3.102201, lng: 101.706179 },
        { id: "SP12", name: "Cheras", lat: 3.112609, lng: 101.714178 },
        { id: "SP11", name: "Chan Sow Lin", lat: 3.128105, lng: 101.715637, interchangeStations: ["PY24", "AG11"] },
        { id: "SP10", name: "Pudu", lat: 3.134879, lng: 101.711957, interchangeStations: ["AG10"] },
        { id: "SP9", name: "Hang Tuah", lat: 3.140012, lng: 101.705984, nearby: ["Berjaya Times Square", "The Mitsui Shopping Park LaLaport Bukit Bintang City Centre"], interchangeStations: ["MR4", "AG9"] },
        { id: "SP8", name: "Plaza Rakyat", lat: 3.144049, lng: 101.702105, interchangeStations: ["AG8", "KG17"] },
        { id: "SP7", name: "Masjid Jamek", lat: 3.14927, lng: 101.696377, interchangeStations: ["AG7", "KJ13"] },
        { id: "SP6", name: "Bandaraya", lat: 3.155567, lng: 101.694485, interchangeStations: ["AG6"] },
        { id: "SP5", name: "Sultan Ismail", lat: 3.161245, lng: 101.694109, interchangeStations: ["AG5"], connectingStations: ["MR9"] },
        { id: "SP4", name: "PWTC", lat: 3.166333, lng: 101.693586, interchangeStations: ["AG4"]},
        { id: "SP3", name: "Titiwangsa", lat: 3.173497, lng: 101.695367, interchangeStations: ["PY17", "AG3", "MR11"] },
        { id: "SP2", name: "Sentul", lat: 3.178484, lng: 101.695542, interchangeStations: ["AG2"] },
        { id: "SP1", name: "Sentul Timur", lat: 3.185897, lng: 101.695217, interchangeStations: ["AG1"] },
    ],
};

export const kelanaJayaLine: Line = {
    id: "KJ",
    type: "LRT",
    name: "Kelana Jaya",
    color: "bg-lrt-kj",
    stations: [
        { id: "KJ37", name: "Putra Heights", lat: 2.996227, lng: 101.575462, interchangeStations: ["SP31"] },
        { id: "KJ36", name: "Subang Alam", lat: 3.009421, lng: 101.572281 },
        { id: "KJ35", name: "Alam Megah", lat: 3.023151, lng: 101.572029 },
        { id: "KJ34", name: "USJ 21", lat: 3.029881, lng: 101.581711 },
        { id: "KJ33", name: "Wawasan", lat: 3.035062, lng: 101.588348 },
        { id: "KJ32", name: "Taipan", lat: 3.04815, lng: 101.590233 },
        { id: "KJ31", name: "USJ 7", lat: 3.054956, lng: 101.592194 },
        { id: "KJ30", name: "SS 18", lat: 3.067182, lng: 101.585945 },
        { id: "KJ29", name: "SS 15", lat: 3.075972, lng: 101.585983, nearby: ["SS15 Courtyard"] },
        { id: "KJ28", name: "Subang Jaya", lat: 3.08466, lng: 101.588127, nearby: ["Nu Empire Shopping Gallery", "Subang Parade Shopping Centre", "AEON BiG Subang Jaya"] },
        { id: "KJ27", name: "CGC Glenmarie", lat: 3.094732, lng: 101.590622 },
        { id: "KJ26", name: "Ara Damansara", lat: 3.108643, lng: 101.586372 },
        { id: "KJ25", name: "Lembah Subang", lat: 3.112094, lng: 101.591034 },
        { id: "KJ24", name: "Kelana Jaya", lat: 3.112497, lng: 101.6043 },
        { id: "KJ23", name: "Taman Bahagia", lat: 3.11079, lng: 101.612856 },
        { id: "KJ22", name: "Taman Paramount", lat: 3.104716, lng: 101.623192 },
        { id: "KJ21", name: "Asia Jaya", lat: 3.104343, lng: 101.637695 },
        { id: "KJ20", name: "Taman Jaya", lat: 3.104086, lng: 101.645248 },
        { id: "KJ19", name: "Universiti", lat: 3.114616, lng: 101.661639, nearby: ["KL Gateway Mall"] },
        { id: "KJ18", name: "Kerinchi", lat: 3.115506, lng: 101.668572 },
        { id: "KJ17", name: "Abdullah Hukum", lat: 3.118735, lng: 101.672897, nearby: ["Mid Valley Megamall", "The Gardens Mall", "KL Eco City"] },
        { id: "KJ16", name: "Bank Rakyat Bangsar", lat: 3.127588, lng: 101.679062 },
        { id: "KJ15", name: "KL Sentral", lat: 3.13442, lng: 101.68625, nearby: ["NU Sentral"], connectingStations: ["MR1"] },
        { id: "KJ14", name: "Pasar Seni", lat: 3.142439, lng: 101.69531, interchangeStations: ["PY14"] },
        { id: "KJ13", name: "Masjid Jamek", lat: 3.149714, lng: 101.696815, interchangeStations: ["AG7", "SP7"] },
        { id: "KJ12", name: "Dang Wangi", lat: 3.156942, lng: 101.701975, connectingStations: ["MR8"] },
        { id: "KJ11", name: "Kampung Baru", lat: 3.161386, lng: 101.706608 },
        { id: "KJ10", name: "KLCC", lat: 3.158935, lng: 101.713287, nearby: ["Petronas Twin Towers", "Suria KLCC", "Avenue K"] },
        { id: "KJ9", name: "Ampang Park", lat: 3.159894, lng: 101.719017, connectingStations: ["PY20"] },
        { id: "KJ8", name: "Damai", lat: 3.164406, lng: 101.724489 },
        { id: "KJ7", name: "Dato' Keramat", lat: 3.16509, lng: 101.73184 },
        { id: "KJ6", name: "Jelatek", lat: 3.167204, lng: 101.735344 },
        { id: "KJ5", name: "Setiawangsa", lat: 3.17576, lng: 101.73584 },
        { id: "KJ4", name: "Sri Rampai", lat: 3.199176, lng: 101.73747 },
        { id: "KJ3", name: "Wangsa Maju", lat: 3.205751, lng: 101.731796 },
        { id: "KJ2", name: "Taman Melati", lat: 3.219558, lng: 101.72197 },
        { id: "KJ1", name: "Gombak", lat: 3.231793, lng: 101.724427 },
    ],
};

export const monorailKlLine: Line = {
    id: "MR",
    type: "MR",
    name: "Monorail KL",
    color: "bg-mr-kl",
    stations: [
        { id: "MR1", name: "KL Sentral", lat: 3.132852, lng: 101.687817, nearby: ["NU Sentral"], connectingStations: ["KJ15"] },
        { id: "MR2", name: "Tun Sambanthan", lat: 3.13132, lng: 101.69085 },
        { id: "MR3", name: "Maharajalela", lat: 3.138743, lng: 101.699268 },
        { id: "MR4", name: "Hang Tuah", lat: 3.140511, lng: 101.706029, nearby: ["Berjaya Times Square", "The Mitsui Shopping Park LaLaport Bukit Bintang City Centre"], interchangeStations: ["AG9", "SP9"] },
        { id: "MR5", name: "Imbi", lat: 3.14283, lng: 101.70945, nearby: ["Berjaya Times Square"] },
        { id: "MR6", name: "Bukit Bintang", lat: 3.146022, lng: 101.7115, connectingStations: ["KG18A"] },
        { id: "MR7", name: "Raja Chulan", lat: 3.150878, lng: 101.710432 },
        { id: "MR8", name: "Bukit Nanas", lat: 3.156214, lng: 101.704809, connectingStations: ["KJ12"] },
        { id: "MR9", name: "Medan Tuanku", lat: 3.15935, lng: 101.69888, connectingStations: ["AG5", "SP5"] },
        { id: "MR10", name: "Chow Kit", lat: 3.167358, lng: 101.698379 },
        { id: "MR11", name: "Titiwangsa", lat: 3.173192, lng: 101.696022, interchangeStations: ["AG3", "SP3", "PY17"] },
    ],
};

export const kajangLine: Line = {
    id: "KG",
    type: "MRT",
    name: "Kajang",
    color: "bg-mrt-kg",
    stations: [
        { id: "KG04", name: "Kwasa Damansara", lat: 3.176146, lng: 101.572052, interchangeStations: ["PY01"] },
        { id: "KG05", name: "Kwasa Sentral", lat: 3.170112, lng: 101.564651 },
        { id: "KG06", name: "Kota Damansara", lat: 3.150134, lng: 101.57869 },
        { id: "KG07", name: "Surian", lat: 3.14948, lng: 101.593925, nearby: ["IOI Mall Damansara", "Sunway Giza"] },
        { id: "KG08", name: "Mutiara Damansara", lat: 3.155301, lng: 101.609077, nearby: ["The Curve", "IPC Shopping Centre", "IKEA Damansara"] },
        { id: "KG09", name: "Bandar Utama", lat: 3.14671, lng: 101.618599, nearby: ["1 Utama Shopping Centre"] },
        { id: "KG10", name: "Taman Tun Dr Ismail", lat: 3.13613, lng: 101.630539 },
        { id: "KG12", name: "Phileo Damansara", lat: 3.129864, lng: 101.642471 },
        { id: "KG13", name: "Pusat Bandar Damansara", lat: 3.143444, lng: 101.662857, nearby: ["Pavilion Damansara Heights"] },
        { id: "KG14", name: "Semantan", lat: 3.150977, lng: 101.665497 },
        { id: "KG15", name: "Muzium Negara", lat: 3.137317, lng: 101.687336, nearby: ["NU Sentral"], connectingStations: ["KJ15"] },
        { id: "KG16", name: "Pasar Seni", lat: 3.142293265, lng: 101.6955642, interchangeStations: ["KJ14"] },
        { id: "KG17", name: "Merdeka", lat: 3.141969, lng: 101.70205, interchangeStations: ["AG8", "SP8"] },
        { id: "KG18A", name: "Bukit Bintang", lat: 3.146503, lng: 101.710947, nearby: ["Pavilion Kuala Lumpur", "Fahrenheit88", "Lot 10 Shopping Centre", "Low Yat Plaza", "Sungei Wang Plaza", "Starhill Gallery"], connectingStations: ["MR6"] },
        { id: "KG20", name: "Tun Razak Exchange", lat: 3.142403, lng: 101.720156, nearby: ["The Exchange TRX", "Apple The Exchange TRX"], interchangeStations: ["PY23"] },
        { id: "KG21", name: "Cochrane", lat: 3.132829, lng: 101.722962, nearby: ["MyTOWN Shopping Centre", "IKEA Cheras", "Sunway Velocity"] },
        { id: "KG22", name: "Maluri", lat: 3.123623, lng: 101.727809, nearby: ["Sunway Velocity"], interchangeStations: ["AG13"] },
        { id: "KG23", name: "Taman Pertama", lat: 3.112547, lng: 101.729371 },
        { id: "KG24", name: "Taman Midah", lat: 3.104505, lng: 101.732186 },
        { id: "KG25", name: "Taman Mutiara", lat: 3.090989, lng: 101.740453 },
        { id: "KG26", name: "Taman Connaught", lat: 3.079172, lng: 101.74522 },
        { id: "KG27", name: "Taman Suntex", lat: 3.071578, lng: 101.763552 },
        { id: "KG28", name: "Sri Raya", lat: 3.062273, lng: 101.772899 },
        { id: "KG29", name: "Bandar Tun Hussien Onn", lat: 3.048223, lng: 101.775109 },
        { id: "KG30", name: "Batu 11 Cheras", lat: 3.041339, lng: 101.773383 },
        { id: "KG31", name: "Bukit Dukung", lat: 3.026413, lng: 101.771072 },
        { id: "KG33", name: "Sungai Jernih", lat: 3.000948, lng: 101.783857 },
        { id: "KG34", name: "Stadium Kajang", lat: 2.994514, lng: 101.786338 },
        { id: "KG35", name: "Kajang", lat: 2.982778, lng: 101.790278 },
    ],
};

export const putrajayaLine: Line = {
    id: "PY",
    type: "MRT",
    name: "Putrajaya",
    color: "bg-mrt-py",
    stations: [
        { id: "PY01", name: "Kwasa Damansara", lat: 3.1763324, lng: 101.5721456, interchangeStations: ["KG04"] },
        { id: "PY03", name: "Kampung Selamat", lat: 3.197266, lng: 101.578499, nearby: ["Anytime Fitness SqWhere"] },
        { id: "PY04", name: "Sungai Buloh", lat: 3.206429, lng: 101.581779 },
        { id: "PY05", name: "Damansara Damai", lat: 3.199892, lng: 101.592623 },
        { id: "PY06", name: "Sri Damansara Barat", lat: 3.198197, lng: 101.608302, nearby: ["Anytime Fitness Sri Damansara"] },
        { id: "PY07", name: "Sri Damansara Sentral", lat: 3.198815, lng: 101.621396 },
        { id: "PY08", name: "Sri Damansara Timur", lat: 3.207832, lng: 101.628716 },
        { id: "PY09", name: "Metro Prima", lat: 3.214438, lng: 101.639402 },
        { id: "PY10", name: "Kepong Baru", lat: 3.211663, lng: 101.648193 },
        { id: "PY11", name: "Jinjang", lat: 3.209544, lng: 101.655829 },
        { id: "PY12", name: "Sri Delima", lat: 3.207108, lng: 101.665749 },
        { id: "PY13", name: "Kampung Batu", lat: 3.205521, lng: 101.675473 },
        { id: "PY14", name: "Kentomen", lat: 3.19563, lng: 101.6797 },
        { id: "PY15", name: "Jalan Ipoh", lat: 3.189319, lng: 101.681145 },
        { id: "PY16", name: "Sentul Barat", lat: 3.179369, lng: 101.684742 },
        { id: "PY17", name: "Titiwangsa", lat: 3.17408, lng: 101.69581, interchangeStations: ["AG3", "SP3", "MR11"] },
        { id: "PY18", name: "Hospital Kuala Lumpur", lat: 3.17405, lng: 101.70239, nearby: ["Hospital Kuala Lumpur", "KPJ Tawakkal KL Specialist Hospital"] },
        { id: "PY19", name: "Raja Uda", lat: 3.16794, lng: 101.71017 },
        { id: "PY20", name: "Ampang Park", lat: 3.16225, lng: 101.71781, connectingStations: ["KJ9"] },
        { id: "PY21", name: "Persiaran KLCC", lat: 3.15712, lng: 101.71834 },
        { id: "PY22", name: "Conlay", lat: 3.15145, lng: 101.71801 },
        { id: "PY23", name: "Tun Razak Exchange", lat: 3.14289, lng: 101.72034, nearby: ["The Exchange TRX", "Apple The Exchange TRX"], interchangeStations: ["KG20"] },
        { id: "PY24", name: "Chan Sow Lin", lat: 3.12839, lng: 101.71663, interchangeStations: ["AG11", "SP11"] },
        { id: "PY27", name: "Kuchai", lat: 3.089546, lng: 101.694124 },
        { id: "PY28", name: "Taman Naga Emas", lat: 3.077688, lng: 101.699867 },
        { id: "PY29", name: "Sungai Besi", lat: 3.063737, lng: 101.7084, interchangeStations: ["SP16"] },
        { id: "PY31", name: "Serdang Raya Utara", lat: 3.041674, lng: 101.704928 },
        { id: "PY32", name: "Serdang Raya Selatan", lat: 3.028463, lng: 101.707514 },
        { id: "PY33", name: "Serdang Jaya", lat: 3.0216, lng: 101.709 },
        { id: "PY34", name: "UPM", lat: 3.008489, lng: 101.705396 },
        { id: "PY36", name: "Taman Equine", lat: 2.98942, lng: 101.67244 },
        { id: "PY37", name: "Putra Permai", lat: 2.98339, lng: 101.66099 },
        { id: "PY38", name: "16 Sierra", lat: 2.964974, lng: 101.654812 },
        { id: "PY39", name: "Cyberjaya Utara", lat: 2.95, lng: 101.6573 },
        { id: "PY40", name: "Cyberjaya City Centre", lat: 2.9384, lng: 101.6659 },
        { id: "PY41", name: "Putrajaya Sentral", lat: 2.9313, lng: 101.6715, nearby: ["Terminal Putrajaya Sentral"] },
    ],
};

export const lines: Line[] = [ampangLine, sriPetalingLine, kelanaJayaLine, monorailKlLine, kajangLine, putrajayaLine];

export function getLinesByType(type: LineType): Line[] {
    return lines.filter((line) => line.type === type);
}

export function getLineById(id: string): Line | undefined {
    return lines.find((line) => line.id === id);
}

export function getStation(id: string): Station | undefined {
    return lines.flatMap(line => line.stations).find(station => station.id === id);
}

export function getLineByStation(id: string): Line | undefined {
    return lines.find(line => line.stations.some(station => station.id === id));
}