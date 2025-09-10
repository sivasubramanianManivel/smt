// app/api/products/route.js
import { NextResponse } from "next/server";


const kidsNoveltyNames = [
    "Magic Boom Beast",
    "Magic Boom Teen Titan",
    "Magic Hypersonic",
    "7'' Rainbow",
    "Festivity Glitter",
    "Shooting Rider(12 star)",
    "Candle War Silver",
    "Music Hits",
    "Chiikoo & Bonity",
    "RK-47 Gun",
    "Colour Smoke Peacock",
    "Colour Smoke Candle",
    "Mick Stick",
    "VIOLET MARIX",
    "BINGO-Mix",
    "EMU EGG",
    "Musical Rocket",
    "Bada Peacock",
    "Lollipop",
    "90 Watty",
    "4*4 wheel",
    "Water Falls",
    "Dora",
    "Mini Pearl",
    "Tim Tim",
    "Ko Ko",
    "Gift Pack",
    "Digital war cone (cracker)",
    "2 color (Super Deleuxe)",
    "Mega Siren (3pcs)",
    "ButterFly (10 pcs)",
    "Tricolor Fountain(5pcs)",
    "Bus Fountain",
    "Guitar Tone",
    "Mini Peacock",
    "Candle Photo Flash",
    "Hanuman Gada"
    // keep adding until 50 names...
];

const kidsNoveltyRates = [
    130, 160, 160, 160, 130,
    140, 120, 130, 250, 300, 220, 180, 380, 430, 390, 140, 150, 330, 200, 170, 180, 190, 190, 200, 220, 240, 770, 260, 260, 250, 80, 200, 200, 220, 140, 140, 160
    // ... match same length as names
];

const sparklerNames = [
    "10cm Electric Sparklers",
    "10cm Colour Sparklers",
    "10cm Green Sparklers",
    "10cm Red Sparklers",
    "15cm Electric Sparklers",
    "15cm Colour Sparklers",
    "15cm Red Sparklers",
    "15cm Electric Sparklers",
    "30cm Electric Sparklers",
    "30cm Colour Sparklers",
    "30cm Red Sparklers",
    "30cm Electric Sparklers",
    "50cm Electric Sparklers",
    "50cm Colour Sparklers",
    "ROTATING Sparklers"

];

const sparklerRates = [
    15, 16, 17, 20, 35, 37, 39, 47, 35, 37, 39, 47, 145, 160, 195
];


let products = [
    // --- ONE SOUND CRACKERS (6 rows) ---
    { id: 1, category: "ONE SOUND CRACKERS", name: "3''1/2 LAKSHMI CRACKERS", content: "1 Pkt", rate: 10 },
    { id: 2, category: "ONE SOUND CRACKERS", name: "2''3/4 KURUVI", content: "1 Pkt", rate: 7 },
    { id: 3, category: "ONE SOUND CRACKERS", name: "4''1/2 LAKSHMI CRACKERS", content: "1 Pkt", rate: 14 },
    { id: 4, category: "ONE SOUND CRACKERS", name: "GOLD LAKSHMI", content: "1 Pkt", rate: 28 },
    { id: 5, category: "ONE SOUND CRACKERS", name: "5''LAKSHMI", content: "1 Pkt", rate: 40 },
    { id: 6, category: "ONE SOUND CRACKERS", name: "5''LAKSHMI (20 PLY)", content: "10 pcs", rate: 70 },

    // --- PAPER BOMB (3 rows) ---
    { id: 7, category: "PAPER BOMB", name: " 1/4 KG Paper Bomb", content: "1 Box", rate: 35 },
    { id: 8, category: "PAPER BOMB", name: "1/2 KG Paper Bomb", content: "1 Box", rate: 70 },
    { id: 9, category: "PAPER BOMB", name: "1 KG Paper Bomb", content: "1 Box", rate: 140 },

    // --- BIJILI CRACKERS (2 rows) ---
    { id: 10, category: "BIJILI CRACKERS", name: " RED Bijili (100PCS)", content: "1 Pkt", rate: 35 },
    { id: 11, category: "BIJILI CRACKERS", name: " STRIPED Bijili ", content: "1 Pkt", rate: 39 },

    // --- GIANT AND DELUXE CRACKERS (5 rows) ---
    { id: 12, category: "GIANT AND DELUXE CRACKERS", name: "28 GIANT", content: "1 Pkt", rate: 24 },
    { id: 13, category: "GIANT AND DELUXE CRACKERS", name: "56 GIANT", content: "1 Pkt", rate: 48 },
    { id: 14, category: "GIANT AND DELUXE CRACKERS", name: "24 DELUXE", content: "1 Pkt", rate: 45 },
    { id: 15, category: "GIANT AND DELUXE CRACKERS", name: "50 Deluxe ", content: "1 Pkt", rate: 110 },
    { id: 16, category: "GIANT AND DELUXE CRACKERS", name: " 100 Deluxe", content: "1 Pkt", rate: 220 },

    // --- GARLAND CRACKERS (6 rows) ---
    { id: 17, category: "GARLAND CRACKERS", name: "100 WALA", content: "1 Pkt", rate: 48 },
    { id: 18, category: "GARLAND CRACKERS", name: "200 WALA", content: "1 Pkt", rate: 80 },
    { id: 19, category: "GARLAND CRACKERS", name: "1K DIGITAL", content: "1 Box", rate: 135 },
    { id: 20, category: "GARLAND CRACKERS", name: "2K DIGITAL", content: "1 Box", rate: 270 },
    { id: 21, category: "GARLAND CRACKERS", name: "5K DIGITAL", content: "1 Box", rate: 675 },
    { id: 22, category: "GARLAND CRACKERS", name: "10K DIGITAL", content: "1 Box", rate: 1350 },

    // --- GROUND CHAKKAR (4 rows) ---
    { id: 23, category: "GROUND CHAKKAR", name: "Ground Chakkar BIG", content: "1 Box", rate: 30 },
    { id: 24, category: "GROUND CHAKKAR", name: "Ground Chakkar Special", content: "1 Box", rate: 60 },
    { id: 25, category: "GROUND CHAKKAR", name: "Ground Chakkar Deluxe", content: "1 Box", rate: 115 },
    { id: 26, category: "GROUND CHAKKAR", name: "WIRE Chakkar", content: "10 Box", rate: 130 },

    // --- FLOWER POTS (5 rows) ---
    { id: 27, category: "FLOWER POTS", name: "Flower Pots Big", content: "1 Box", rate: 60 },
    { id: 28, category: "FLOWER POTS", name: "Flower Pots Special", content: "1 Box", rate: 80 },
    { id: 29, category: "FLOWER POTS", name: "Flower Pots Asoka", content: "1 Box", rate: 110 },
    { id: 30, category: "FLOWER POTS", name: "Flower Pots Color KOTI", content: "1 Box", rate: 130 },
    { id: 31, category: "FLOWER POTS", name: "BONANZA SD", content: "1 Box", rate: 440 },
    { id: 32, category: "FLOWER POTS", name: "FAST R&G", content: "1 Box", rate: 270 },

    // --- ATOM BOMB (6 rows) ---
    { id: 33, category: "ATOM BOMB", name: "Bullet Bomb ", content: "1 Box", rate: 25 },
    { id: 34, category: "ATOM BOMB", name: "Hydro Bomb ", content: "1 Box", rate: 55 },
    { id: 35, category: "ATOM BOMB", name: "King of King ", content: "1 Box", rate: 75 },
    { id: 36, category: "ATOM BOMB", name: "Classic Bomb ", content: "1 Box", rate: 95 },
    { id: 37, category: "ATOM BOMB", name: "Dinosaur Bomb ", content: "1 Box", rate: 155 },
    { id: 38, category: "ATOM BOMB", name: "Agni Bomb ", content: "1 Box", rate: 175 },

    // --- ROCKET BOMB (3 rows) ---
    { id: 39, category: "ROCKET BOMB", name: "Rocket Bomb", content: "1 Box", rate: 55 },
    { id: 40, category: "ROCKET BOMB", name: " LUNIK Rocket", content: "1 Box", rate: 65 },
    { id: 41, category: "ROCKET BOMB", name: " CLASSIC Rocket", content: "1 Box", rate: 105 },

    // --- TWINKLING STAR (2 rows) ---
    { id: 42, category: "TWINKLING STAR", name: "1'' 1/2 Twinkling Star", content: "1 Box", rate: 25 },
    { id: 43, category: "TWINKLING STAR", name: " 4'' Twinkling Star", content: "1 Box", rate: 65 },

    // --- KIDS SPECIAL NOVELTY LIGHT (50 rows) ---
    ...kidsNoveltyNames.map((name, i) => ({
        id: 44 + i,
        category: "KIDS SPECIAL NOVELTY LIGHT",
        name: name,
        content: "1 Box",
        rate: kidsNoveltyRates[i], // 👈 pick rate from ra
    })),
    // --- NIGHT ARRIVAL ATTRACTIONS (7 rows) ---
    { id: 94, category: "NIGHT ARRIVAL ATTRACTIONS", name: "Chotta Fancy", content: "1 Box", rate: 50 },
    { id: 95, category: "NIGHT ARRIVAL ATTRACTIONS", name: "2'' Single Fancy", content: "1 Box", rate: 100 },
    { id: 96, category: "NIGHT ARRIVAL ATTRACTIONS", name: "3'' Pipe Fancy", content: "1 Box", rate: 200 },
    { id: 97, category: "NIGHT ARRIVAL ATTRACTIONS", name: "3.5'' Pipe Fancy", content: "1 Box", rate: 240 },
    { id: 98, category: "NIGHT ARRIVAL ATTRACTIONS", name: "7 Shot", content: "1 Box", rate: 90 },
    { id: 99, category: "NIGHT ARRIVAL ATTRACTIONS", name: "4'' Pipe Fancy", content: "1 Box", rate: 400 },
    { id: 100, category: "NIGHT ARRIVAL ATTRACTIONS", name: "SKY Daneer 5*5 SHOT", content: "1 Box", rate: 1200 },
    { id: 101, category: "NIGHT ARRIVAL ATTRACTIONS", name: "3''1/2 Single Double Ball", content: "1 Box", rate: 500 },
    { id: 102, category: "NIGHT ARRIVAL ATTRACTIONS", name: "3''1/2 Single Triple Ball", content: "1 Box", rate: 700 },
    { id: 103, category: "NIGHT ARRIVAL ATTRACTIONS", name: "4'' Nayagara Single Ball", content: "1 Box", rate: 450 },
    { id: 104, category: "NIGHT ARRIVAL ATTRACTIONS", name: "2'' Fancy (Peacock)(Setout) ", content: "1 Box", rate: 4000 },

    // Night Arrival Multicolor Shots

    { id: 105, category: "NIGHT ARRIVAL MULTI COLOR SHOTS", name: "12 SHOT Rider", content: "1 Box", rate: 90 },
    { id: 106, category: "NIGHT ARRIVAL MULTI COLOR SHOTS", name: "15 SHOT SHORT [SMT]", content: "1 Box", rate: 200 },
    { id: 107, category: "NIGHT ARRIVAL MULTI COLOR SHOTS", name: "30 SHOT SHORT", content: "1 Box", rate: 300 },
    { id: 108, category: "NIGHT ARRIVAL MULTI COLOR SHOTS", name: "30 SHOT LONG [SMT]", content: "1 Box", rate: 350 },
    { id: 109, category: "NIGHT ARRIVAL MULTI COLOR SHOTS", name: "60 SHOT [SMT]", content: "1 Box", rate: 700 },
    { id: 110, category: "NIGHT ARRIVAL MULTI COLOR SHOTS", name: "120 SHOT", content: "1 Box", rate: 1400 },
    { id: 111, category: "NIGHT ARRIVAL MULTI COLOR SHOTS", name: "240 SHOT", content: "1 Box", rate: 2800 },



    // --- GIFT BoxES (5 rows) ---
    { id: 112, category: "GIFT BoxES", name: "MOTU PATLU (23 items)", content: "1 Box", rate: 300 },
    { id: 113, category: "GIFT BoxES", name: "GOOGLE & HAPPY DIWALI (33 items)", content: "1 Box", rate: 400 },
    { id: 114, category: "GIFT BoxES", name: "MARVEL & MINIONS (41 items)", content: "1 Box", rate: 580 },
    { id: 115, category: "GIFT BoxES", name: "MAHALAKSHMI (52 items)", content: "1 Box", rate: 800 },
    { id: 116, category: "GIFT BoxES", name: "ANDAL (72 items)", content: "1 Box", rate: 1100 },

    // --- FAMILY PACK (5 rows) ---
    { id: 117, category: "FAMILY PACK", name: "VIP BOX", content: "1 Pack", rate: 1000 },
    { id: 118, category: "FAMILY PACK", name: "Royal Pack", content: "1 Pack", rate: 2000 },
    { id: 119, category: "FAMILY PACK", name: " Star Family Pack", content: "1 Pack", rate: 3000 },
    { id: 120, category: "FAMILY PACK", name: "SMT Family Pack", content: "1 Pack", rate: 4000 },
    { id: 121, category: "FAMILY PACK", name: "Golden Family Pack", content: "1 Pack", rate: 5000 },

    // --- SPARKLERS (15 rows) ---
    ...sparklerNames.map((name, i) => ({
        id: 122 + i,
        category: "SPARKLERS",
        name: name,
        content: "10 pcs",
        rate: sparklerRates[i],
    })),
];


// get product api

export async function GET() {
    return NextResponse.json(products);
}


// add new product api


// POST new product
export async function POST(req) {
    try {
        const { category, name, content = "1 Box", rate } = await req.json();
        if (!category || !name || rate === undefined) {
            return NextResponse.json({ error: "Category, name, and rate are required" }, { status: 400 });
        }

        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: newId, category, name, content, rate: Number(rate) };
        products.push(newProduct);

        return NextResponse.json({ message: "Product added", product: newProduct });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 500 });
    }
}

// PUT and DELETE for admin actions (optional)
export async function PUT(req) {
    try {
        const updated = await req.json();
        const index = products.findIndex((p) => p.id === updated.id);
        if (index === -1) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        products[index] = { ...products[index], ...updated };
        return NextResponse.json({ message: "Product updated", product: products[index] });
    } catch {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = parseInt(searchParams.get("id"));
        products = products.filter((p) => p.id !== id); 
        return NextResponse.json({ message: "Product deleted" });
    } catch {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

