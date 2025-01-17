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
};

export const ampangLine: Line = {
    id: "AG",
    type: "LRT",
    name: "Ampang",
    color: "bg-lrt-ag",
    stations: [
        { id: "AG18", name: "Ampang", lat: 3.150318, lng: 101.760049 },
        { id: "AG17", name: "Cahaya", lat: 3.140575, lng: 101.756677 },
        { id: "AG16", name: "Cempaka", lat: 3.138324, lng: 101.752979 },
        { id: "AG15", name: "Pandan Indah", lat: 3.134581, lng: 101.746509 },
        { id: "AG14", name: "Pandan Jaya", lat: 3.130141, lng: 101.739122 },
        { id: "AG13", name: "Maluri", lat: 3.12329, lng: 101.727283 },
        { id: "AG12", name: "Miharja", lat: 3.120973, lng: 101.717922 },
        { id: "AG11", name: "Chan Sow Lin", lat: 3.128105, lng: 101.715637 },
        { id: "AG10", name: "Pudu", lat: 3.134879, lng: 101.711957 },
        { id: "AG9", name: "Hang Tuah", lat: 3.140012, lng: 101.705984 },
        { id: "AG8", name: "Plaza Rakyat", lat: 3.144049, lng: 101.702105 },
        { id: "AG7", name: "Masjid Jamek", lat: 3.14927, lng: 101.696377 },
        { id: "AG6", name: "Bandaraya", lat: 3.155567, lng: 101.694485 },
        { id: "AG5", name: "Sultan Ismail", lat: 3.161245, lng: 101.694109 },
        { id: "AG4", name: "PWTC", lat: 3.166333, lng: 101.693586 },
        { id: "AG3", name: "Titiwangsa", lat: 3.173497, lng: 101.695367 },
        { id: "AG2", name: "Sentul", lat: 3.178484, lng: 101.695542 },
        { id: "AG1", name: "Sentul Timur", lat: 3.185897, lng: 101.695217 },
    ],
};

export const kelanaJayaLine: Line = {
    id: "KJ",
    type: "LRT",
    name: "Kelana Jaya",
    color: "bg-lrt-kj",
    stations: [
        { id: "KJ37", name: "Putra Heights", lat: 2.996227, lng: 101.575462 },
        { id: "KJ36", name: "Subang Alam", lat: 3.009421, lng: 101.572281 },
        { id: "KJ35", name: "Alam Megah", lat: 3.023151, lng: 101.572029 },
        { id: "KJ34", name: "USJ 21", lat: 3.029881, lng: 101.581711 },
        { id: "KJ33", name: "Wawasan", lat: 3.035062, lng: 101.588348 },
        { id: "KJ32", name: "Taipan", lat: 3.04815, lng: 101.590233 },
        { id: "KJ31", name: "USJ 7", lat: 3.054956, lng: 101.592194 },
        { id: "KJ30", name: "SS 18", lat: 3.067182, lng: 101.585945 },
        { id: "KJ29", name: "SS 15", lat: 3.075972, lng: 101.585983 },
        { id: "KJ28", name: "Subang Jaya", lat: 3.08466, lng: 101.588127 },
        { id: "KJ27", name: "Cgc Glenmarie", lat: 3.094732, lng: 101.590622 },
        { id: "KJ26", name: "Ara Damansara", lat: 3.108643, lng: 101.586372 },
        { id: "KJ25", name: "Lembah Subang", lat: 3.112094, lng: 101.591034 },
        { id: "KJ24", name: "Kelana Jaya", lat: 3.112497, lng: 101.6043 },
        { id: "KJ23", name: "Taman Bahagia", lat: 3.11079, lng: 101.612856 },
        { id: "KJ22", name: "Taman Paramount", lat: 3.104716, lng: 101.623192 },
        { id: "KJ21", name: "Asia Jaya", lat: 3.104343, lng: 101.637695 },
        { id: "KJ20", name: "Taman Jaya", lat: 3.104086, lng: 101.645248 },
        { id: "KJ19", name: "Universiti", lat: 3.114616, lng: 101.661639 },
        { id: "KJ18", name: "Kerinchi", lat: 3.115506, lng: 101.668572 },
        { id: "KJ17", name: "Abdullah Hukum", lat: 3.118735, lng: 101.672897, nearby: ["Mid Valley Megamall"] },
        { id: "KJ16", name: "Bank Rakyat Bangsar", lat: 3.127588, lng: 101.679062 },
        { id: "KJ15", name: "KL Sentral", lat: 3.13442, lng: 101.68625 },
        { id: "KJ14", name: "Pasar Seni", lat: 3.142439, lng: 101.69531 },
        { id: "KJ13", name: "Masjid Jamek", lat: 3.149714, lng: 101.696815 },
        { id: "KJ12", name: "Dang Wangi", lat: 3.156942, lng: 101.701975 },
        { id: "KJ11", name: "Kampung Baru", lat: 3.161386, lng: 101.706608 },
        { id: "KJ10", name: "KLCC", lat: 3.158935, lng: 101.713287 },
        { id: "KJ9", name: "Ampang Park", lat: 3.159894, lng: 101.719017 },
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

export const sriPetalingLine: Line = {
    id: "SP",
    type: "LRT",
    name: "Sri Petaling",
    color: "bg-lrt-sp",
    stations: [
        { id: "SP31", name: "Putra Heights", lat: 2.996016, lng: 101.575521 },
        { id: "SP29", name: "Puchong Prima", lat: 2.999808, lng: 101.596692 },
        { id: "SP28", name: "Puchong Perdana", lat: 3.007913, lng: 101.605021 },
        { id: "SP27", name: "Bandar Puteri", lat: 3.017111, lng: 101.612855 },
        { id: "SP26", name: "Taman Perindustrian Puchong", lat: 3.022814, lng: 101.613514 },
        { id: "SP25", name: "Pusat Bandar Puchong", lat: 3.033194, lng: 101.616057 },
        { id: "SP24", name: "IOI Puchong Jaya", lat: 3.048101, lng: 101.62095 },
        { id: "SP22", name: "Kinrara", lat: 3.050506, lng: 101.644294 },
        { id: "SP21", name: "Alam Sutera", lat: 3.0547, lng: 101.656468 },
        { id: "SP20", name: "Muhibbah", lat: 3.062229, lng: 101.662552 },
        { id: "SP19", name: "Awan Besar", lat: 3.062131, lng: 101.670555 },
        { id: "SP18", name: "Sri Petaling", lat: 3.061445, lng: 101.687074 },
        { id: "SP17", name: "Bukit Jalil", lat: 3.058196, lng: 101.692125 },
        { id: "SP16", name: "Sungai Besi", lat: 3.063842, lng: 101.708062 },
        { id: "SP15", name: "Bandar Tasik Selatan", lat: 3.076058, lng: 101.711107 },
        { id: "SP14", name: "Bandar Tun Razak", lat: 3.089576, lng: 101.712466 },
        { id: "SP13", name: "Salak Selatan", lat: 3.102201, lng: 101.706179 },
        { id: "SP12", name: "Cheras", lat: 3.112609, lng: 101.714178 },
        { id: "SP11", name: "Chan Sow Lin", lat: 3.128105, lng: 101.715637 },
        { id: "SP10", name: "Pudu", lat: 3.134879, lng: 101.711957 },
        { id: "SP9", name: "Hang Tuah", lat: 3.140012, lng: 101.705984 },
        { id: "SP8", name: "Plaza Rakyat", lat: 3.144049, lng: 101.702105 },
        { id: "SP7", name: "Masjid Jamek", lat: 3.14927, lng: 101.696377 },
        { id: "SP6", name: "Bandaraya", lat: 3.155567, lng: 101.694485 },
        { id: "SP5", name: "Sultan Ismail", lat: 3.161245, lng: 101.694109 },
        { id: "SP4", name: "Pwtc", lat: 3.166333, lng: 101.693586 },
        { id: "SP3", name: "Titiwangsa", lat: 3.173497, lng: 101.695367 },
        { id: "SP2", name: "Sentul", lat: 3.178484, lng: 101.695542 },
        { id: "SP1", name: "Sentul Timur", lat: 3.185897, lng: 101.695217 },
    ],
};

export const monorailKlLine: Line = {
    id: "MR",
    type: "MR",
    name: "Monorail KL",
    color: "bg-mr-kl",
    stations: [],
};

export const kajangLine: Line = {
    id: "KG",
    type: "MRT",
    name: "Kajang",
    color: "bg-mrt-kg",
    stations: [],
};

export const putrajayaLine: Line = {
    id: "PY",
    type: "MRT",
    name: "Putrajaya",
    color: "bg-mrt-py",
    stations: [],
};

export const lines: Line[] = [ampangLine, kelanaJayaLine, sriPetalingLine, monorailKlLine, kajangLine, putrajayaLine];

export function getLinesByType(type: LineType): Line[] {
    return lines.filter((line) => line.type === type);
}

export function getLineById(id: string): Line | undefined {
    return lines.find((line) => line.id === id);
}