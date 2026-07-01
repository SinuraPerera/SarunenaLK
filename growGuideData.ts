export interface CropGuide {
  id: string;
  name: { en: string; si: string; ta: string };
  category: string;
  suitability: string[];
  stages: { name: string; duration: string; work: string }[];
  soil: string;
  water: string;
  seeds: string;
  fertilizer: string;
  pests: { name: string; symptoms: string; organicControl: string }[];
  harvesting: string;
  yieldPerAcre: string;
}

export const CROP_GROW_GUIDES: CropGuide[] = [
  {
    id: 'paddy-rice',
    name: {
      en: 'Paddy Rice (වී / நெல்)',
      si: 'පැඩි වී (Bg 300 / කීරි සම්බා)',
      ta: 'நெல் (Bg 300 / கீரி சம்பா)'
    },
    category: 'Cereal / Staple',
    suitability: ['Anuradhapura', 'Polonnaruwa', 'Kurunegala', 'Ampara', 'Hambantota'],
    stages: [
      { name: 'Seed Germination & Nursery', duration: '14-21 days', work: 'Soak seeds for 24 hrs, incubate for 48 hrs. Sow in wet nursery beds. Apply light organic compost.' },
      { name: 'Transplanting / Tillering', duration: '20-40 days', work: 'Keep water at 2cm. Keep field free of weeds. Hand weed or run rotary weeders.' },
      { name: 'Panicle Initiation & Flowering', duration: '45-75 days', work: 'Raise water depth to 5cm. Apply crucial split-dose of Potash (MOP) and Urea.' },
      { name: 'Grain Filling & Harvesting', duration: '80-110 days', work: 'Drain water completely 10 days before harvesting to encourage uniform grain drying and mechanical harvesting.' }
    ],
    soil: 'Impervious heavy clay loam soils with high organic matter. Prefers a pH range of 5.5 to 6.5.',
    water: 'High requirement: 1,200 to 1,500 mm per crop cycle. Daily water cover of 2-5 cm during vegetative phases.',
    seeds: 'Broadcasting: 40-50 kg per acre. Row seeding / Transplanting: 25-30 kg per acre.',
    fertilizer: 'Apply 75 kg Urea, 40 kg TSP (Triple Superphosphate), and 35 kg MOP (Muriate of Potash) per acre. Split application into basal, 1st top dressing (21 days), and 2nd top dressing (45-50 days). Incorporate Gliricidia leaves for natural nitrogen.',
    pests: [
      {
        name: 'Brown Planthopper (BPH)',
        symptoms: 'Yellowing of leaves, followed by "hopper burn" patches where paddy completely dries up.',
        organicControl: 'Drain standing water for 3-4 days. Release predatory mirid bugs and spiders. Spray neem oil (3%) at the base of stems.'
      },
      {
        name: 'Paddy Stem Borer',
        symptoms: 'Dead hearts (withered central shoots in young plants) and white heads (empty white grains).',
        organicControl: 'Set up light traps (60W bulb) 50m apart to trap moths. Clip leaf tips before transplanting to destroy egg masses.'
      }
    ],
    harvesting: 'Harvest when 85-90% of the panicles turn golden yellow. Thresh immediately, dry grains to 14% moisture level for storage.',
    yieldPerAcre: '80 - 120 Bushels (approx. 1,600 - 2,400 kg) per acre under standard conditions.'
  },
  {
    id: 'ceylon-cinnamon',
    name: {
      en: 'Ceylon Cinnamon (කුරුඳු / இலவங்கப்பட்டை)',
      si: 'සැබෑ කුරුඳු (Alba / C5 / M5)',
      ta: 'இலவங்கப்பட்டை (Alba / C5)'
    },
    category: 'Export Agriculture',
    suitability: ['Galle', 'Matara', 'Hambantota', 'Kalutara', 'Ratnapura'],
    stages: [
      { name: 'Nursery & Propagation', duration: '6-10 months', work: 'Raise cinnamon seeds in polybags under 50% shade. Water daily.' },
      { name: 'Establishment', duration: '1-2 years', work: 'Plant in 1.2m x 0.9m spacing. Mulch around base with coir dust. Prune central shoot to stimulate bushiness.' },
      { name: 'Mature Maintenance', duration: 'Ongoing', work: 'Prune weak shoots twice annually. Apply compost and mineral fertilizers. Control weeds.' },
      { name: 'Harvesting & Peeling', duration: 'Every 6-9 months', work: 'Cut brown stems of 1.5-2.5cm diameter. Scrap, peel, and roll inner bark into quills.' }
    ],
    soil: 'Deep, rich, sandy loam soils or alluvial soils with high humus content. Ideal pH is 4.5 to 6.5 (highly acid-tolerant).',
    water: 'Moderate to high: 1,500 - 2,500 mm rainfall annually. Requires well-drained slopes; hates waterlogging.',
    seeds: 'Direct seed sowing: 15,000-20,000 seeds/seedlings per acre. Spacing: 1.2m between rows.',
    fertilizer: 'Apply annual mix of 50 kg Urea, 25 kg TSP, and 40 kg MOP per acre. Apply immediately after pruning to trigger new stems.',
    pests: [
      {
        name: 'Cinnamon Gall Mite',
        symptoms: 'Warty gall structures on leaves, twisting leaf shapes, reduced shoot growth.',
        organicControl: 'Prune infected branches and bury/burn them. Spray sulfur-formulated natural sprays or bio-neem extract.'
      }
    ],
    harvesting: 'Cut stems early morning when bark peels easily. Scrape the outer corky skin, rub with a brass rod to loosen bark, peel, and sun-shade dry.',
    yieldPerAcre: '350 - 500 kg of cured quills (Alba/C5 grades) per acre annually.'
  },
  {
    id: 'coconut-palm',
    name: {
      en: 'Coconut (පොල් / தேங்காய்)',
      si: 'පොල් ගස (Maha / Tall x Dwarf)',
      ta: 'தென்னை (மகா / நெட்டையானது)'
    },
    category: 'Commercial Plantation',
    suitability: ['Kurunegala', 'Puttalam', 'Gampaha', 'Chilaw', 'Hambantota'],
    stages: [
      { name: 'Seedling Nursery', duration: '8-12 months', work: 'Embed selected mature seed-nuts horizontally in nursery soil. Keep moist under coconut-leaf shade.' },
      { name: 'Youth Phase (Pre-bearing)', duration: '1-4 years', work: 'Dig 1m x 1m x 1m pits. Mix topsoil with 50kg organic compost. Water weekly in dry spells.' },
      { name: 'Bearing & Production', duration: '5-60+ years', work: 'Harvesters climb palms every 45-60 days. Apply trench fertilizer. Grow intercrops (ginger/turmeric).' }
    ],
    soil: 'Well-drained gravelly or sandy loams. Extremely tolerant to Kalpitiya sand, coastal soils. Ideal pH is 5.5 to 7.0.',
    water: 'Requires 1,250 - 2,300 mm rainfall. Susceptible to extended drought; benefit immensely from coir-dust moisture traps.',
    seeds: '64 palms per acre (Standard spacing of 8m x 8m in triangular or square layout).',
    fertilizer: 'Annual dosage of 2.5 kg Urea, 1.5 kg Rock Phosphate (ERP), and 3.5 kg MOP per mature palm. Dig circular trenches 1.5m from trunk and bury.',
    pests: [
      {
        name: 'Red Palm Weevil',
        symptoms: 'Holes in the trunk with squeezed-out fibrous material and thick brown liquid. Crown may look dry or collapse.',
        organicControl: 'Insert pheromone traps (using coconut yeast + sugarcane). Inject natural neem seed oil or pyrethrins into infected entry holes.'
      },
      {
        name: 'Black Beetle (Rhinoceros Beetle)',
        symptoms: 'V-shaped cuts on newly opened coconut fronds, reducing leaf canopy photosynthetic area.',
        organicControl: 'Keep estate clear of rotting cattle manure or decaying logs (breeding grounds). Apply Metarhizium anisopliae fungus.'
      }
    ],
    harvesting: 'Harvest mature bunches (11-12 months old) every 8 weeks. Pile nuts in shade for 2 weeks before dehusking to boost copra density.',
    yieldPerAcre: '3,500 - 5,500 nuts per acre annually under good agronomic practice.'
  },
  {
    id: 'red-onion',
    name: {
      en: 'Red Onion (රතු ළූණු / வெங்காயம்)',
      si: 'රතු ළූණු (Jaffna / Kalpitiya Loam)',
      ta: 'வெங்காயம் (யாழ்ப்பாணம் / கற்பிட்டி)'
    },
    category: 'Vegetable / Condiment',
    suitability: ['Jaffna', 'Vavuniya', 'Puttalam', 'Kalpitiya', 'Mannar'],
    stages: [
      { name: 'Soil Preparation', duration: '7 days', work: 'Plough field to fine tilth. Erect raised beds (1m width) and apply poultry manure or compost.' },
      { name: 'Planting & Sowing', duration: '1-3 days', work: 'Sort healthy bulbs. Trim root tips. Plant bulbs with 10cm x 10cm spacing.' },
      { name: 'Bulb Expansion', duration: '15-50 days', work: 'Water daily in morning. Weed regularly. Earth up soil around bulbs to encourage swelling.' },
      { name: 'Maturation & Curing', duration: '55-75 days', work: 'Stop watering 10 days before harvest. Pull bulbs when tops dry and fall. Field cure for 3 days.' }
    ],
    soil: 'Loose, friable sandy loams, alluvial or red latosols rich in organic matter. Soil pH must be 6.0 to 7.0.',
    water: 'Frequent light waterings. Requires 400-500 mm. Highly sensitive to water-logging which causes bulb rot.',
    seeds: 'Bulb sets: 550-600 kg of bulbs per acre. True onion seed: 3-4 kg per acre raised in a nursery first.',
    fertilizer: 'Basal: 35 kg Urea, 55 kg TSP, 30 kg MOP. Top dressing (21 days): 35 kg Urea + 30 kg MOP. Sulphur additions increase flavor/pungency.',
    pests: [
      {
        name: 'Onion Thrips',
        symptoms: 'Silver streaks and dry white spots on leaves. Leaves dry up from tips downward.',
        organicControl: 'Use blue sticky cards. Spray garlic-chilli extract or neem seed kernel extract (5%). Introduce ladybug predators.'
      }
    ],
    harvesting: 'Harvest when 75% of foliage falls down. Field dry (cure) under shade with leaves intact to dry necks, preventing bulb rots.',
    yieldPerAcre: '4,000 - 6,000 kg per acre under irrigation.'
  },
  {
    id: 'green-chilli',
    name: {
      en: 'Green Chilli (මිරිස් / பச்சை மிளகாய்)',
      si: 'කොළ මිරිස් (M3 / MI-2 / KA2)',
      ta: 'மிளகாய் (M3 / MI-2 / KA2)'
    },
    category: 'Vegetable / Cash Crop',
    suitability: ['Anuradhapura', 'Kurunegala', 'Mahaweli H', 'Matale', 'Vavuniya'],
    stages: [
      { name: 'Nursery Seeding', duration: '28 days', work: 'Sow treated seeds in nursery trays. Shade with net. Spray copper fungicide if damping-off appears.' },
      { name: 'Field Transplanting', duration: '1-5 days', work: 'Transplant seedlings when 4-6 leaves appear. Distance: 60cm x 45cm. Irrigate immediately.' },
      { name: 'Flowering & Fruiting', duration: '35-70 days', work: 'Apply Urea and MOP. Maintain moderate soil moisture. Tie plants to stakes if heavy with fruit.' },
      { name: 'Continuous Pickings', duration: '75-150 days', work: 'Harvest green pods every 5-7 days. Apply organic compost after every 3 pickings to rejuvenate.' }
    ],
    soil: 'Well-aerated, rich loam soil with good drainage. Extremely sensitive to water accumulation. Ideal pH is 5.5 to 6.8.',
    water: 'Requires regular moderate watering. Drip irrigation is highly recommended to prevent soil-borne fungal leaf spots.',
    seeds: 'Nursery rate: 150-200 grams of hybrid seed (or 500g open-pollinated seed) per acre.',
    fertilizer: 'Basal: 45 kg Urea, 60 kg TSP, 25 kg MOP. Top dressings applied every 3-4 weeks: 30 kg Urea and 15 kg MOP per acre.',
    pests: [
      {
        name: 'Chilli Leaf Curl Complex',
        symptoms: 'Upward or downward leaf curling, crinkled foliage, stunted growth (caused by Thrips, Mites, and Whiteflies).',
        organicControl: 'Grow 4 rows of maize/sorghum around chilli plot as vector barriers. Spray soap emulsion, neem extract, or tobacco brew.'
      }
    ],
    harvesting: 'Pick when chillies are fully grown, dark green, and firm. Keep 1-2 cm of stem on the chilli to prolong storage shelf life.',
    yieldPerAcre: '3,000 - 5,000 kg of fresh green chilli per acre.'
  },
  {
    id: 'dairy-cow-rearing',
    name: {
      en: 'Dairy Cow (කිරි ගවයන් / பால் மாடு)',
      si: 'කිරි ගව පාලනය (Jersey / Friesian / Sahiwal)',
      ta: 'பால் பண்ணை (ஜெர்சி / பிரீசியன் / சஹிவால்)'
    },
    category: 'Animal Husbandry',
    suitability: ['Nuwara Eliya', 'Badulla', 'Kurunegala', 'Galle', 'Anuradhapura'],
    stages: [
      { name: 'Calving & Newborn Care', duration: '1-3 months', work: 'Feed colostrum within 2 hours. House in warm, dry calf pens. Deworm at 2 weeks.' },
      { name: 'Heifer Growth', duration: '4-15 months', work: 'Provide highly nutritious CO-3/CO-4 pasture grasses. Vaccinate against Foot & Mouth Disease (FMD).' },
      { name: 'Lactation & Milking Cycle', duration: '10 months', work: 'Clean udder with warm water before milking. Feed concentrates during milking. Maintain clean cement floors.' }
    ],
    soil: 'Not crop-applicable. Farm sheds require sloped concrete bedding with proper drainage channels and rubber cow mats.',
    water: 'Extremely high: 60 - 100 liters of clean, fresh drinking water per mature cow daily. Essential for high milk yield.',
    seeds: 'For forage crops: Sow 8-10 kg of Napier (CO-3/CO-4) or Guinea grass slips per acre to feed a herd of 3-4 cows.',
    fertilizer: 'Feed concentrates (coconut cake, rice bran, mineral lick) at a ratio of 1 kg feed per 2 liters of milk produced.',
    pests: [
      {
        name: 'Mastitis (Udder Infection)',
        symptoms: 'Swollen, painful, warm udders; watery, blood-tinged, or clotted milk.',
        organicControl: 'Dip teats in iodine solution (0.5%) after milking. Keep milking sheds dry and sanitized. Clean with lime wash.'
      },
      {
        name: 'Ticks and Flies',
        symptoms: 'Restlessness, skin lesions, drop in milk, transmit tick-borne fever.',
        organicControl: 'Spray stable walls with garlic-neem solution. Apply herbal tick repellents containing lemongrass oil.'
      }
    ],
    harvesting: 'Milking twice daily (5:00 AM and 4:00 PM). Store fresh milk immediately in sanitized stainless-steel cans below 4°C.',
    yieldPerAcre: '15 - 35 Liters of fresh milk per cow daily depending on breed and high-quality feed intake.'
  }
];
