"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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


const products = [
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


const PriceList = () => {
  const [quantities, setQuantities] = useState({});

const handleQuantityChange = (id, value) => {
  setQuantities((prev) => ({
    ...prev,
    [id]: value, // store as string
  }));
};


  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
      <div className="relative flex items-center justify-center mb-8">
  {/* Left blasting cracker */}
  <div className="absolute left-0 w-16 h-16">
    <Image
      src="/images/fancy.gif"
      alt="cracker left"
      width={94}
      height={94}
      unoptimized // keeps GIF working
    />
  </div>

  {/* Heading */}
  <h2 className="text-3xl font-bold text-gray-800 text-center">
    SMT Traders Price List{" "}
    <motion.span
      className="text-red-600"
      animate={{ opacity: [1, 0.2, 1], color: ["#dc2626", "#fbbf24", "#dc2626"] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
    >
      (75% Discount)
    </motion.span>
  </h2>

  {/* Right blasting cracker */}
  <div className="absolute right-0 w-16 h-16">
    <Image
      src="/images/fancy.gif"
      alt="cracker right"
      width={94}
      height={94}
      unoptimized
    />
  </div>
</div>


        <p className="text-center text-gray-600 text-lg mb-6">
          No. 1/6 R, Keela Tiruthangal Road, Sivakasi – 626189 <br />
          📞 +91 9080247608 | ✉️ smttraders@gmail.com
        </p>

        <div className="overflow-x-auto bg-white text-black rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-black border">S No</th>
                <th className="px-4 py-3 border">Product Name</th>
                <th className="px-4 py-3 border">Content</th>
                <th className="px-4 py-3 border">Rate (Original)</th>
                <th className="px-4 py-3 border">Quantity</th>
                <th className="px-4 py-3 border">Final Rate (After 75% Off)</th>
              </tr>
            </thead>
            <tbody>
              {["ONE SOUND CRACKERS", "PAPER BOMB", "BIJILI CRACKERS", "GIANT AND DELUXE CRACKERS", "GARLAND CRACKERS", "GROUND CHAKKAR", "FLOWER POTS", "ATOM BOMB", "ROCKET BOMB", "TWINKLING STAR", "KIDS SPECIAL NOVELTY LIGHT", "NIGHT ARRIVAL ATTRACTIONS", "NIGHT ARRIVAL MULTI COLOR SHOTS", "GIFT BoxES", "FAMILY PACK", "SPARKLERS"].map((category) => (
                <React.Fragment key={category}>
                  <tr className="bg-gray-200">
                    <td
                      colSpan="6"
                      className="px-4 py-2 font-semibold text-gray-800 text-center"
                    >
                      {category} (75% Discount Applied)
                    </td>
                  </tr>
                  {products
                    .filter((p) => p.category === category)
                    .map((p, i) => {
                     const qty = parseInt(quantities[p.id]) || 0;
                      const finalRate = (p.rate * qty ).toFixed(2); // apply 75% discount

                      return (
                        <tr
                          key={p.id}
                          className={i % 2 === 0 ? "bg-green-50" : "bg-blue-50"}
                        >
                          <td className="px-4 py-2 border text-gray-700 font-medium">
                            {p.id}
                          </td>
                          <td className="px-4 py-2 border text-purple-700 font-semibold">
                            {p.name}
                          </td>
                          <td className="px-4 py-2 border text-center text-indigo-600 font-semibold">
                            {p.content}
                          </td>
                          {/* Show original rate */}
                          <td className="px-4 py-2 border text-center text-red-600 font-semibold">
                            {p.rate.toFixed(2)}
                          </td>
                          <td className="px-4 py-2 border text-center">
                            <div className="relative group inline-block">
                              <input
                                type="number"
                                min="0"
                                value={quantities[p.id] || ""}
                                onChange={(e) =>
                                  handleQuantityChange(p.id, e.target.value)
                                }
                                  className="w-20 p-1 border rounded text-center text-black caret-black focus:outline-none focus:ring-2 focus:ring-blue-500"

                              />
                              {/* Tooltip */}
                              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                Enter quantity here
                              </span>
                            </div>
                          </td>

                          {/* Show discounted final rate */}
                          <td className="px-4 py-2 border text-center text-green-700 font-bold">
                            {finalRate}
                          </td>
                        </tr>
                      );
                    })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PriceList;
