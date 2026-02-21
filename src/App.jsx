import { useState, useMemo, useEffect } from "react";

function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

const dishes = [
  // ══════════════════════════════════════════════
  // ULTRA HIGH PROTEIN SECTION (30g+)
  // ══════════════════════════════════════════════
  {
    id: 1, name: "Overnight Oats + Whey Protein", cuisine: "Western", type: "veg",
    prep: "5 min", cook: "0 min (overnight)", protein: 38, cal: 420,
    nutrients: "Beta-glucan, B vitamins, Iron, Calcium, Probiotics",
    benefits: ["Muscle", "Gut", "Debloat", "Brain"],
    tier: "ultra",
    why: "Adding 1 scoop whey to overnight oats is the single highest protein breakfast. Beta-glucan from oats feeds gut microbiome.",
    recipe: "https://www.bbcgoodfood.com/recipes/overnight-oats",
    youtube: "https://www.youtube.com/results?search_query=overnight+oats+high+protein+recipe"
  },
  {
    id: 2, name: "Cottage Cheese + Tofu Scramble", cuisine: "Fusion", type: "veg",
    prep: "5 min", cook: "10 min", protein: 36, cal: 320,
    nutrients: "Complete protein x2, Calcium, B12, Selenium, Isoflavones",
    benefits: ["Muscle", "Skin", "Brain"],
    tier: "ultra",
    why: "Blending cottage cheese into scrambled tofu doubles protein without changing texture much. One of the highest plant protein meals possible.",
    recipe: "https://minimalistbaker.com/tofu-scramble/",
    youtube: "https://www.youtube.com/results?search_query=high+protein+tofu+cottage+cheese+scramble"
  },
  {
    id: 3, name: "Greek Yogurt Protein Bowl (yogurt + cottage cheese + nuts + seeds)", cuisine: "Western", type: "veg",
    prep: "3 min", cook: "0 min", protein: 35, cal: 380,
    nutrients: "Probiotics, Casein, Whey, Calcium, B12, Omega-3, Zinc",
    benefits: ["Muscle", "Gut", "Skin", "Brain", "Debloat"],
    tier: "ultra",
    why: "Combining Greek yogurt AND cottage cheese gives you both fast (whey) and slow (casein) proteins. Top with hemp seeds for Omega-3.",
    recipe: "https://www.eatwell101.com/greek-yogurt-protein-bowl",
    youtube: "https://www.youtube.com/results?search_query=high+protein+greek+yogurt+bowl+recipe"
  },
  {
    id: 4, name: "Edamame + Tofu Miso Ramen", cuisine: "Japanese", type: "veg",
    prep: "10 min", cook: "15 min", protein: 34, cal: 480,
    nutrients: "Complete protein, Probiotics (miso), Iodine, Isoflavones, B vitamins, Iron",
    benefits: ["Muscle", "Gut", "Brain", "Debloat"],
    tier: "ultra",
    why: "Firm tofu + edamame in one bowl = 34g complete soy protein. Miso adds probiotics. Most complete single bowl on this list.",
    recipe: "https://www.pickuplimes.com/recipe/miso-ramen-476",
    youtube: "https://www.youtube.com/results?search_query=high+protein+tofu+miso+ramen+vegetarian"
  },
  {
    id: 5, name: "3-Egg Frittata + Feta + Spinach", cuisine: "Italian/Greek", type: "egg",
    prep: "5 min", cook: "15 min", protein: 32, cal: 360,
    nutrients: "Complete protein, Choline, Vitamin K, Calcium, Iron, B12, Selenium",
    benefits: ["Muscle", "Skin", "Brain", "Bones"],
    tier: "ultra",
    why: "3 whole eggs + feta cheese = 32g protein. Spinach adds iron and vitamin K. Bake once, eat across multiple meals.",
    recipe: "https://www.bbcgoodfood.com/recipes/spinach-feta-frittata",
    youtube: "https://www.youtube.com/results?search_query=spinach+feta+frittata+recipe"
  },
  {
    id: 6, name: "Egg White Omelette + Cottage Cheese + Spinach", cuisine: "Western", type: "egg",
    prep: "5 min", cook: "8 min", protein: 30, cal: 220,
    nutrients: "Very high protein, Calcium, Iron, Vitamin K, Folate",
    benefits: ["Muscle", "Skin", "Debloat"],
    tier: "ultra",
    why: "Highest protein-to-calorie egg dish. Best for muscle cutting. Spinach iron + K for skin renewal.",
    recipe: "https://www.allrecipes.com/recipe/egg-white-omelette/",
    youtube: "https://www.youtube.com/results?search_query=egg+white+cottage+cheese+omelette+high+protein"
  },
  {
    id: 7, name: "Paneer Bhurji (Indian — keep this one!)", cuisine: "Indian", type: "veg",
    prep: "5 min", cook: "10 min", protein: 30, cal: 380,
    nutrients: "Complete protein, Calcium, B12, Phosphorus, Vitamin A",
    benefits: ["Muscle", "Bones", "Brain", "Skin"],
    tier: "ultra",
    why: "200g paneer = 30g protein. Your highest-protein Indian dish. Use minimal oil, add bell peppers and tomatoes for vitamins.",
    recipe: "https://www.vegrecipesofindia.com/paneer-bhurji-recipe/",
    youtube: "https://www.youtube.com/results?search_query=healthy+paneer+bhurji+high+protein"
  },
  {
    id: 8, name: "Soya Chunk Curry", cuisine: "Indian", type: "veg",
    prep: "10 min", cook: "20 min", protein: 52, cal: 340,
    nutrients: "Complete protein (soy), Iron, Calcium, Fiber, Omega-3, Isoflavones",
    benefits: ["Muscle", "Brain", "Gut", "Skin"],
    tier: "ultra",
    why: "100g dry soya chunks = 52g protein — the HIGHEST plant protein density on this entire list. Absorbs any curry flavour perfectly.",
    recipe: "https://www.vegrecipesofindia.com/soya-chunks-curry/",
    youtube: "https://www.youtube.com/results?search_query=soya+chunks+curry+high+protein+vegetarian"
  },

  // ══════════════════════════════════════════════
  // VEGETARIAN DISHES
  // ══════════════════════════════════════════════
  {
    id: 9, name: "Ethiopian Misir Wat", cuisine: "Ethiopian", type: "veg",
    prep: "5 min", cook: "20 min", protein: 18, cal: 280,
    nutrients: "Iron, Folate, Fiber, B6, Zinc, Potassium",
    benefits: ["Debloat", "Skin", "Brain", "Gut"],
    tier: "high",
    why: "Red lentils are among the most complete plant proteins. Berbere spice is deeply anti-inflammatory. Tastes like smoky masoor dal.",
    recipe: "https://www.thespruceeats.com/ethiopian-red-lentils-misir-wat-2395565",
    youtube: "https://www.youtube.com/results?search_query=ethiopian+misir+wat+recipe"
  },
  {
    id: 10, name: "Lebanese Mujaddara", cuisine: "Middle Eastern", type: "veg",
    prep: "5 min", cook: "25 min", protein: 15, cal: 320,
    nutrients: "Complete protein (lentil+rice), Iron, B vitamins, Fiber, Zinc",
    benefits: ["Debloat", "Brain", "Gut"],
    tier: "high",
    why: "Lentil + rice = near-complete amino acid profile. Caramelized onion adds quercetin for brain protection.",
    recipe: "https://cookieandkate.com/mujaddara-recipe/",
    youtube: "https://www.youtube.com/results?search_query=mujaddara+Lebanese+lentil+rice+recipe"
  },
  {
    id: 11, name: "Moroccan Chickpea Tagine", cuisine: "Moroccan", type: "veg",
    prep: "10 min", cook: "25 min", protein: 14, cal: 340,
    nutrients: "Fiber, Iron, B6, Folate, Magnesium, Vitamin C, Zinc",
    benefits: ["Debloat", "Skin", "Brain", "Gut"],
    tier: "high",
    why: "Chickpeas + tomatoes + turmeric + ginger = anti-inflammatory powerhouse. Very similar flavor logic to Gujarati chole.",
    recipe: "https://www.bbcgoodfood.com/recipes/moroccan-chickpea-soup",
    youtube: "https://www.youtube.com/results?search_query=moroccan+chickpea+tagine+recipe"
  },
  {
    id: 12, name: "Moroccan Harira Soup", cuisine: "Moroccan", type: "veg",
    prep: "10 min", cook: "25 min", protein: 16, cal: 290,
    nutrients: "Lentils+chickpeas, Iron, Folate, Fiber, Vitamin C",
    benefits: ["Debloat", "Gut", "Brain", "Skin"],
    tier: "high",
    why: "Dual legume base = high protein and fiber. Lemon + coriander add vitamin C for better iron absorption.",
    recipe: "https://www.196flavors.com/morocco-harira/",
    youtube: "https://www.youtube.com/results?search_query=harira+soup+recipe+moroccan"
  },
  {
    id: 13, name: "Greek Yogurt Bowl (nuts + berries)", cuisine: "Mediterranean", type: "veg",
    prep: "3 min", cook: "0 min", protein: 20, cal: 280,
    nutrients: "Probiotics, Calcium, B12, Protein, Antioxidants, Omega-3 (walnuts)",
    benefits: ["Debloat", "Skin", "Brain", "Gut"],
    tier: "high",
    why: "Probiotics directly reduce bloating. Walnuts = #1 brain nut. Berries = top skin + brain antioxidant foods.",
    recipe: "https://www.loveandlemons.com/greek-yogurt/",
    youtube: "https://www.youtube.com/results?search_query=high+protein+greek+yogurt+bowl+breakfast"
  },
  {
    id: 14, name: "Hummus + Whole Grain Pita + Raw Veggies", cuisine: "Mediterranean", type: "veg",
    prep: "5 min", cook: "0 min", protein: 12, cal: 320,
    nutrients: "Tahini (calcium, zinc), Olive oil (polyphenols), Fiber, B vitamins, Iron",
    benefits: ["Debloat", "Skin", "Brain"],
    tier: "high",
    why: "Chickpeas + tahini = complete protein. Olive oil polyphenols protect brain neurons. Zero cooking.",
    recipe: "https://cookieandkate.com/best-hummus-recipe/",
    youtube: "https://www.youtube.com/results?search_query=homemade+hummus+recipe"
  },
  {
    id: 15, name: "Turkish Red Lentil Soup (Mercimek)", cuisine: "Turkish", type: "veg",
    prep: "5 min", cook: "20 min", protein: 14, cal: 240,
    nutrients: "Iron, Fiber, B6, Folate, Potassium, Protein",
    benefits: ["Debloat", "Gut", "Skin"],
    tier: "high",
    why: "Blended lentil soup = easiest form for gut absorption. Very similar to masoor dal. Lemon juice boosts iron uptake.",
    recipe: "https://www.themediterraneandish.com/turkish-lentil-soup/",
    youtube: "https://www.youtube.com/results?search_query=turkish+red+lentil+soup+mercimek+corbasi"
  },
  {
    id: 16, name: "Miso Soup with Tofu + Seaweed", cuisine: "Japanese", type: "veg",
    prep: "3 min", cook: "5 min", protein: 10, cal: 120,
    nutrients: "Probiotics, Iodine, B12 (seaweed), Isoflavones, Calcium, Zinc",
    benefits: ["Debloat", "Gut", "Skin", "Brain"],
    tier: "medium",
    why: "Fermented miso = live probiotics. Seaweed = rare plant source of iodine + B12. Best debloating soup.",
    recipe: "https://www.justonecookbook.com/homemade-miso-soup/",
    youtube: "https://www.youtube.com/results?search_query=homemade+miso+soup+tofu+seaweed"
  },
  {
    id: 17, name: "Tofu Stir Fry (soy + ginger + garlic)", cuisine: "Asian", type: "veg",
    prep: "10 min", cook: "10 min", protein: 22, cal: 280,
    nutrients: "Complete protein, Calcium, Iron, Isoflavones, Ginger, Garlic (allicin)",
    benefits: ["Muscle", "Skin", "Brain"],
    tier: "high",
    why: "Tofu = highest plant protein density. Ginger = top anti-inflammatory for bloating. Garlic allicin = immune powerhouse.",
    recipe: "https://minimalistbaker.com/crispy-tofu-stir-fry/",
    youtube: "https://www.youtube.com/results?search_query=crispy+tofu+stir+fry+recipe+high+protein"
  },
  {
    id: 18, name: "Korean Dubu Jorim (Spicy Braised Tofu)", cuisine: "Korean", type: "veg",
    prep: "5 min", cook: "15 min", protein: 20, cal: 260,
    nutrients: "Complete protein, Calcium, Iron, Capsaicin, Selenium, Isoflavones",
    benefits: ["Muscle", "Skin", "Debloat"],
    tier: "high",
    why: "Capsaicin boosts metabolism. Tofu is muscle-building gold. Very easy and deeply satisfying.",
    recipe: "https://www.koreanbapsang.com/dubu-jorim-spicy-braised-tofu/",
    youtube: "https://www.youtube.com/results?search_query=dubu+jorim+spicy+braised+tofu+korean"
  },
  {
    id: 19, name: "Tabbouleh", cuisine: "Middle Eastern", type: "veg",
    prep: "10 min", cook: "0 min", protein: 5, cal: 180,
    nutrients: "Vitamin K (parsley), Vitamin C, Folate, Iron, Fiber",
    benefits: ["Skin", "Debloat", "Brain"],
    tier: "medium",
    why: "Parsley = most vitamin K and C dense food. Massive detox + skin benefits. Zero cooking ever.",
    recipe: "https://cookieandkate.com/tabbouleh-recipe/",
    youtube: "https://www.youtube.com/results?search_query=tabbouleh+recipe+authentic"
  },
  {
    id: 20, name: "Spanish Gazpacho", cuisine: "Spanish", type: "veg",
    prep: "10 min", cook: "0 min", protein: 3, cal: 120,
    nutrients: "Lycopene, Vitamin C, Vitamin E, Beta-carotene, Potassium",
    benefits: ["Skin", "Debloat"],
    tier: "medium",
    why: "Lycopene from raw tomatoes = #1 food for skin radiance. All raw = maximum enzyme retention. Zero cooking.",
    recipe: "https://www.seriouseats.com/gazpacho-recipe",
    youtube: "https://www.youtube.com/results?search_query=authentic+gazpacho+recipe+spanish"
  },
  {
    id: 21, name: "Ribollita (Tuscan White Bean Soup)", cuisine: "Italian", type: "veg",
    prep: "10 min", cook: "25 min", protein: 14, cal: 310,
    nutrients: "Fiber, Protein, Iron, Folate, B vitamins, Potassium, Kale",
    benefits: ["Gut", "Brain", "Skin"],
    tier: "high",
    why: "White beans + kale + olive oil = triple threat for gut, brain, and skin. One of Italy's most nutritious soups.",
    recipe: "https://www.bbcgoodfood.com/recipes/ribollita",
    youtube: "https://www.youtube.com/results?search_query=ribollita+tuscan+bean+soup+recipe"
  },
  {
    id: 22, name: "Edamame with Sea Salt", cuisine: "Japanese", type: "veg",
    prep: "2 min", cook: "8 min", protein: 17, cal: 190,
    nutrients: "Complete protein, Folate, Vitamin K, Iron, Calcium, Fiber, Omega-3",
    benefits: ["Muscle", "Skin", "Brain", "Debloat"],
    tier: "high",
    why: "One of very few plant foods with complete protein. High folate for cell repair and skin renewal.",
    recipe: "https://www.justonecookbook.com/edamame/",
    youtube: "https://www.youtube.com/results?search_query=how+to+cook+edamame"
  },
  {
    id: 23, name: "Pad Thai with Tofu", cuisine: "Thai", type: "veg",
    prep: "10 min", cook: "15 min", protein: 20, cal: 380,
    nutrients: "Complete protein, B vitamins, Tamarind (antioxidants), Bean sprouts, Peanuts",
    benefits: ["Muscle", "Brain", "Skin"],
    tier: "high",
    why: "Balanced macros + micronutrients. Bean sprouts add live enzymes. Tamarind supports liver detox.",
    recipe: "https://www.recipetineats.com/tofu-pad-thai/",
    youtube: "https://www.youtube.com/results?search_query=vegetarian+tofu+pad+thai+recipe"
  },
  {
    id: 24, name: "Thai Green Curry with Tofu", cuisine: "Thai", type: "veg",
    prep: "5 min", cook: "20 min", protein: 18, cal: 360,
    nutrients: "Coconut milk (MCT fats), Lemongrass, Galangal, Tofu protein",
    benefits: ["Brain", "Skin", "Gut"],
    tier: "high",
    why: "MCT fats directly fuel the brain. Lemongrass is anti-microbial and debloating. Easy coconut curry.",
    recipe: "https://www.recipetineats.com/thai-green-curry/",
    youtube: "https://www.youtube.com/results?search_query=thai+green+curry+tofu+vegetarian"
  },
  {
    id: 25, name: "Tom Kha Soup with Tofu", cuisine: "Thai", type: "veg",
    prep: "5 min", cook: "15 min", protein: 12, cal: 240,
    nutrients: "MCT fats, Galangal, Lemongrass, Coconut, Mushrooms (beta-glucans)",
    benefits: ["Gut", "Brain", "Debloat"],
    tier: "high",
    why: "Mushroom beta-glucans = powerful immune boost. Galangal stronger than ginger for digestion.",
    recipe: "https://www.thespruceeats.com/thai-coconut-soup-tom-kha-recipe-3217315",
    youtube: "https://www.youtube.com/results?search_query=tom+kha+soup+tofu+vegan+recipe"
  },
  {
    id: 26, name: "Pasta e Fagioli", cuisine: "Italian", type: "veg",
    prep: "5 min", cook: "20 min", protein: 16, cal: 380,
    nutrients: "Fiber, Iron, Protein, B vitamins, Rosemary (antioxidant), Olive oil",
    benefits: ["Gut", "Debloat", "Brain"],
    tier: "high",
    why: "Beans + pasta = complete amino acids. Rosemary has strong cognitive benefits. Italian peasant food at its best.",
    recipe: "https://www.seriouseats.com/pasta-e-fagioli-recipe",
    youtube: "https://www.youtube.com/results?search_query=pasta+e+fagioli+recipe"
  },
  {
    id: 27, name: "Avocado Toast (whole grain)", cuisine: "Western", type: "veg",
    prep: "5 min", cook: "3 min", protein: 8, cal: 310,
    nutrients: "Omega-9, Vitamin E, Folate, Potassium, Fiber, B vitamins",
    benefits: ["Skin", "Brain", "Debloat"],
    tier: "medium",
    why: "Avocado's oleic acid + vitamin E protect skin cell membranes. Top food for skin glow and radiance.",
    recipe: "https://cookieandkate.com/avocado-toast-recipe/",
    youtube: "https://www.youtube.com/results?search_query=avocado+toast+recipe+healthy"
  },
  {
    id: 28, name: "Black Bean Burrito Bowl", cuisine: "Mexican", type: "veg",
    prep: "5 min", cook: "10 min", protein: 18, cal: 420,
    nutrients: "Anthocyanins, Fiber, Iron, Magnesium, Resistant starch, Vitamin C",
    benefits: ["Gut", "Debloat", "Brain", "Muscle"],
    tier: "high",
    why: "Black beans = highest anthocyanin of any bean — brain + heart protection. Resistant starch feeds gut bacteria.",
    recipe: "https://minimalistbaker.com/black-bean-burrito-bowls/",
    youtube: "https://www.youtube.com/results?search_query=black+bean+burrito+bowl+vegetarian"
  },
  {
    id: 29, name: "Israeli Sabich Bowl", cuisine: "Israeli", type: "veg",
    prep: "10 min", cook: "15 min", protein: 13, cal: 350,
    nutrients: "Nasunin (eggplant antioxidant), Tahini, Chickpeas, Olive oil, Parsley",
    benefits: ["Brain", "Skin", "Debloat"],
    tier: "high",
    why: "Nasunin in eggplant skin specifically protects brain cell membranes. Tahini is a calcium powerhouse.",
    recipe: "https://www.thespruceeats.com/sabich-sandwich-recipe-4583009",
    youtube: "https://www.youtube.com/results?search_query=sabich+bowl+recipe+israeli"
  },
  {
    id: 30, name: "Ethiopian Gomen (Collard Greens)", cuisine: "Ethiopian", type: "veg",
    prep: "5 min", cook: "15 min", protein: 6, cal: 140,
    nutrients: "Vitamin K, Vitamin C, Iron, Calcium, Folate, Beta-carotene",
    benefits: ["Skin", "Brain", "Bones"],
    tier: "medium",
    why: "Collard greens are top vitamin K and calcium greens. Ethiopian spices add anti-inflammatory power.",
    recipe: "https://www.thespruceeats.com/ethiopian-collard-greens-gomen-recipe-2395575",
    youtube: "https://www.youtube.com/results?search_query=ethiopian+gomen+collard+greens+recipe"
  },

  // ══════════════════════════════════════════════
  // EGG DISHES
  // ══════════════════════════════════════════════
  {
    id: 31, name: "Shakshuka", cuisine: "Middle Eastern", type: "egg",
    prep: "5 min", cook: "15 min", protein: 16, cal: 280,
    nutrients: "Complete protein, Lycopene, Vitamin C, Iron, Choline, Vitamin D, B12",
    benefits: ["Muscle", "Skin", "Brain", "Debloat"],
    tier: "high",
    why: "Vitamin C from tomatoes + iron from eggs = best iron absorption combo. Choline in yolk = #1 brain nutrient for memory.",
    recipe: "https://cookieandkate.com/shakshuka-recipe/",
    youtube: "https://www.youtube.com/results?search_query=shakshuka+recipe+easy"
  },
  {
    id: 32, name: "Egg Muffins / Mini Frittatas (meal prep)", cuisine: "Western", type: "egg",
    prep: "10 min", cook: "20 min", protein: 18, cal: 240,
    nutrients: "Complete protein, Choline, B12, Selenium, Vitamin D, Iron",
    benefits: ["Muscle", "Brain", "Skin"],
    tier: "high",
    why: "Make 12 on Sunday, eat all week. Each egg = 6g complete protein + most essential vitamins. Most efficient prep.",
    recipe: "https://www.wellplated.com/egg-muffins/",
    youtube: "https://www.youtube.com/results?search_query=egg+muffins+meal+prep+recipe"
  },
  {
    id: 33, name: "Turkish Menemen", cuisine: "Turkish", type: "egg",
    prep: "5 min", cook: "10 min", protein: 14, cal: 260,
    nutrients: "Complete protein, Vitamin C, Lycopene, Choline, B12, Capsaicin",
    benefits: ["Skin", "Brain", "Muscle"],
    tier: "high",
    why: "Quicker than shakshuka. Capsicum + tomato = massive vitamin C hit. Great for collagen production.",
    recipe: "https://www.thespruceeats.com/menemen-turkish-scrambled-eggs-4684573",
    youtube: "https://www.youtube.com/results?search_query=turkish+menemen+recipe"
  },
  {
    id: 34, name: "Protein Pancakes (egg + banana + oats)", cuisine: "Western", type: "egg",
    prep: "3 min", cook: "7 min", protein: 16, cal: 320,
    nutrients: "Complete protein, Potassium, B6, Beta-glucan, Choline, Magnesium",
    benefits: ["Muscle", "Brain", "Gut"],
    tier: "high",
    why: "3 ingredients, 10 minutes. Magnesium supports muscle function. B6 crucial for neurotransmitter production.",
    recipe: "https://www.bbcgoodfood.com/recipes/banana-protein-pancakes",
    youtube: "https://www.youtube.com/results?search_query=3+ingredient+protein+pancakes+egg+banana+oats"
  },
  {
    id: 35, name: "Scrambled Eggs + Greek Yogurt", cuisine: "Western", type: "egg",
    prep: "3 min", cook: "5 min", protein: 22, cal: 260,
    nutrients: "Complete protein x2, Probiotics, Calcium, Choline, B12, Selenium",
    benefits: ["Muscle", "Gut", "Brain", "Skin"],
    tier: "high",
    why: "Mixing Greek yogurt into eggs = creamier texture, 8g extra protein, adds probiotics. Best protein-per-minute meal.",
    recipe: "https://www.seriouseats.com/the-best-scrambled-eggs-recipe",
    youtube: "https://www.youtube.com/results?search_query=scrambled+eggs+greek+yogurt+high+protein"
  },
  {
    id: 36, name: "Baked Eggs in Avocado", cuisine: "Western", type: "egg",
    prep: "3 min", cook: "15 min", protein: 12, cal: 280,
    nutrients: "Complete protein, Oleic acid, Vitamin E, Choline, Folate, Potassium, B12",
    benefits: ["Skin", "Brain", "Debloat"],
    tier: "high",
    why: "Avocado + egg = ultimate skin + brain combo. Oleic acid + choline + vitamin E in one meal.",
    recipe: "https://www.allrecipes.com/recipe/238789/baked-eggs-in-avocado/",
    youtube: "https://www.youtube.com/results?search_query=baked+eggs+in+avocado+recipe"
  },
  {
    id: 37, name: "Korean Gyeran Bap (Egg Rice Bowl)", cuisine: "Korean", type: "egg",
    prep: "2 min", cook: "5 min", protein: 14, cal: 380,
    nutrients: "Complete protein, Choline, B12, Sesame (calcium, zinc, sesamol antioxidant)",
    benefits: ["Brain", "Muscle"],
    tier: "medium",
    why: "Fastest high-protein hot meal on this entire list. Fried egg over rice + sesame oil + soy sauce. Unbeatable speed.",
    recipe: "https://www.maangchi.com/recipe/gyeranjjim",
    youtube: "https://www.youtube.com/results?search_query=korean+egg+rice+bowl+gyeran+bap"
  },
  {
    id: 38, name: "Breakfast Burrito (egg + beans + cheese + salsa)", cuisine: "Mexican", type: "egg",
    prep: "5 min", cook: "8 min", protein: 22, cal: 450,
    nutrients: "Complete protein, Iron, Fiber, Calcium, Vitamin C, B vitamins, Choline",
    benefits: ["Muscle", "Gut", "Brain"],
    tier: "high",
    why: "Egg + bean combo = complete amino acids. High fiber keeps you full. Best post-workout breakfast.",
    recipe: "https://www.loveandlemons.com/breakfast-burrito/",
    youtube: "https://www.youtube.com/results?search_query=high+protein+breakfast+burrito+recipe"
  },
  {
    id: 39, name: "Egg Drop Soup", cuisine: "Chinese", type: "egg",
    prep: "3 min", cook: "7 min", protein: 10, cal: 120,
    nutrients: "Complete protein, Choline, B12, Ginger (anti-inflammatory)",
    benefits: ["Debloat", "Gut", "Brain"],
    tier: "medium",
    why: "Gentlest egg dish for your gut. Perfect when bloated. Ginger soothes digestion. Extremely light.",
    recipe: "https://www.seriouseats.com/egg-drop-soup-recipe",
    youtube: "https://www.youtube.com/results?search_query=egg+drop+soup+recipe+easy"
  },
  {
    id: 40, name: "Thai Basil Fried Egg over Rice", cuisine: "Thai", type: "egg",
    prep: "3 min", cook: "7 min", protein: 14, cal: 380,
    nutrients: "Complete protein, Choline, B12, Holy basil (eugenol), Capsaicin",
    benefits: ["Brain", "Muscle"],
    tier: "medium",
    why: "Holy basil has powerful eugenol — anti-inflammatory and antimicrobial. Crispy egg edges are incredible.",
    recipe: "https://www.seriouseats.com/thai-fried-egg-recipe",
    youtube: "https://www.youtube.com/results?search_query=thai+basil+fried+egg+over+rice"
  },
  {
    id: 41, name: "Vietnamese Banh Mi Egg Sandwich", cuisine: "Vietnamese", type: "egg",
    prep: "10 min", cook: "8 min", protein: 16, cal: 360,
    nutrients: "Complete protein, Choline, Probiotics (pickled daikon), Vitamin C, B vitamins",
    benefits: ["Gut", "Skin", "Brain", "Muscle"],
    tier: "high",
    why: "Pickled daikon = probiotics + vitamin C. One of the most nutritionally interesting sandwiches on this list.",
    recipe: "https://www.seriouseats.com/banh-mi-recipe",
    youtube: "https://www.youtube.com/results?search_query=banh+mi+egg+sandwich+recipe"
  },
  {
    id: 42, name: "Huevos Rancheros", cuisine: "Mexican", type: "egg",
    prep: "5 min", cook: "10 min", protein: 18, cal: 380,
    nutrients: "Complete protein, Lycopene, Vitamin C, Iron, Fiber, Choline, Capsaicin",
    benefits: ["Skin", "Muscle", "Brain"],
    tier: "high",
    why: "Eggs + salsa + beans on tortilla. Vitamin C from salsa dramatically boosts iron absorption.",
    recipe: "https://cookieandkate.com/huevos-rancheros-recipe/",
    youtube: "https://www.youtube.com/results?search_query=huevos+rancheros+recipe+easy"
  },
];

const benefitColors = {
  "Muscle": "#ef4444",
  "Skin": "#ec4899",
  "Brain": "#8b5cf6",
  "Gut": "#10b981",
  "Debloat": "#06b6d4",
  "Bones": "#f59e0b",
};

const tierConfig = {
  ultra: { label: "🔥 ULTRA HIGH PROTEIN (30g+)", color: "#ff4500", bg: "#1a0a00" },
  high: { label: "💪 HIGH PROTEIN (14–22g)", color: "#22c55e", bg: "#0a1a0a" },
  medium: { label: "🌿 NUTRITIOUS (5–13g)", color: "#60a5fa", bg: "#0a0f1a" },
};

export default function NutritionGuide() {
  const width = useWindowSize();
  const isMobile = width < 640;
  const isTablet = width < 900;

  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [benefitFilter, setBenefitFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [activeSection, setActiveSection] = useState("dishes");

  const filtered = useMemo(() => {
    return dishes.filter(d => {
      if (filter !== "all" && d.tier !== filter) return false;
      if (typeFilter !== "all" && d.type !== typeFilter) return false;
      if (benefitFilter !== "all" && !d.benefits.includes(benefitFilter)) return false;
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) &&
          !d.cuisine.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, typeFilter, benefitFilter, search]);

  const grouped = useMemo(() => {
    const g = {};
    ["ultra", "high", "medium"].forEach(t => {
      const items = filtered.filter(d => d.tier === t);
      if (items.length) g[t] = items;
    });
    return g;
  }, [filtered]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050508",
      color: "#e8e0d0",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative",
      overflowX: "hidden"
    }}>
      {/* Ambient background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 20% 10%, rgba(255,69,0,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(34,197,94,0.06) 0%, transparent 50%)"
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 12px 40px" : "0 20px 60px" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", padding: isMobile ? "32px 0 20px" : "48px 0 32px" }}>
          <div style={{ fontSize: 10, letterSpacing: isMobile ? 3 : 6, color: "#ff4500", textTransform: "uppercase", marginBottom: 12, fontFamily: "monospace" }}>
            BUILT FOR YOUR GOALS
          </div>
          <h1 style={{
            fontSize: isMobile ? 28 : isTablet ? 38 : 52,
            fontWeight: 400, lineHeight: 1.15,
            background: "linear-gradient(135deg, #fff5e6 0%, #ff4500 50%, #22c55e 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 10, marginTop: 0
          }}>
            The Global Vegetarian{isMobile ? " " : <br />}Nutrition Bible
          </h1>
          <p style={{ color: "#888", fontSize: isMobile ? 11 : 14, letterSpacing: 1, fontFamily: "monospace", margin: 0 }}>
            {dishes.length} dishes · Muscle · Skin · Brain · Debloat
          </p>
        </div>

        {/* NAV */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {[["dishes", "🍽 Dishes"], ["tips", "💡 Tips"], ["stock", "🛒 Stock"]].map(([key, label]) => (
            <button key={key} onClick={() => setActiveSection(key)} style={{
              padding: isMobile ? "8px 16px" : "8px 22px",
              borderRadius: 999, border: "1px solid",
              borderColor: activeSection === key ? "#ff4500" : "#333",
              background: activeSection === key ? "rgba(255,69,0,0.15)" : "transparent",
              color: activeSection === key ? "#ff4500" : "#888",
              cursor: "pointer", fontSize: isMobile ? 12 : 13,
              fontFamily: "monospace", letterSpacing: 1, transition: "all 0.2s"
            }}>{label}</button>
          ))}
        </div>

        {activeSection === "dishes" && (
          <>
            {/* FILTERS */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a",
              borderRadius: 12, padding: isMobile ? "14px" : "20px 24px", marginBottom: 24
            }}>
              {/* Search */}
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search dish or cuisine..."
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(255,255,255,0.05)", border: "1px solid #2a2a2a",
                  borderRadius: 8, padding: "9px 14px", color: "#e8e0d0",
                  fontFamily: "monospace", fontSize: 12, outline: "none", marginBottom: 12
                }}
              />

              {/* Tier filter */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>PROTEIN TIER</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[["all", "All"], ["ultra", "🔥 30g+"], ["high", "💪 14g+"], ["medium", "🌿 5g+"]].map(([v, l]) => (
                    <button key={v} onClick={() => setFilter(v)} style={{
                      padding: "5px 10px", borderRadius: 999, border: "1px solid",
                      borderColor: filter === v ? "#ff4500" : "#2a2a2a",
                      background: filter === v ? "rgba(255,69,0,0.2)" : "transparent",
                      color: filter === v ? "#ff4500" : "#666",
                      cursor: "pointer", fontSize: 11, fontFamily: "monospace"
                    }}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Type filter */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>TYPE</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[["all", "All"], ["veg", "🌱 Veg"], ["egg", "🥚 Egg"]].map(([v, l]) => (
                    <button key={v} onClick={() => setTypeFilter(v)} style={{
                      padding: "5px 10px", borderRadius: 999, border: "1px solid",
                      borderColor: typeFilter === v ? "#22c55e" : "#2a2a2a",
                      background: typeFilter === v ? "rgba(34,197,94,0.15)" : "transparent",
                      color: typeFilter === v ? "#22c55e" : "#666",
                      cursor: "pointer", fontSize: 11, fontFamily: "monospace"
                    }}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Benefit filter */}
              <div>
                <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>BENEFIT</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["all", "Muscle", "Skin", "Brain", "Gut", "Debloat"].map(v => (
                    <button key={v} onClick={() => setBenefitFilter(v)} style={{
                      padding: "5px 10px", borderRadius: 999, border: "1px solid",
                      borderColor: benefitFilter === v ? (benefitColors[v] || "#8b5cf6") : "#2a2a2a",
                      background: benefitFilter === v ? `${(benefitColors[v] || "#8b5cf6")}22` : "transparent",
                      color: benefitFilter === v ? (benefitColors[v] || "#8b5cf6") : "#666",
                      cursor: "pointer", fontSize: 11, fontFamily: "monospace"
                    }}>{v === "all" ? "All" : v}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 10, color: "#555", fontSize: 10, fontFamily: "monospace" }}>
                {filtered.length} of {dishes.length} dishes
              </div>
            </div>

            {/* DISH GROUPS */}
            {Object.entries(grouped).map(([tier, items]) => (
              <div key={tier} style={{ marginBottom: 36 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
                  paddingBottom: 10, borderBottom: `1px solid ${tierConfig[tier].color}22`
                }}>
                  <span style={{
                    fontSize: isMobile ? 11 : 12, fontFamily: "monospace",
                    letterSpacing: isMobile ? 1 : 3,
                    color: tierConfig[tier].color, textTransform: "uppercase"
                  }}>{tierConfig[tier].label}</span>
                  <span style={{ fontSize: 10, color: "#444", fontFamily: "monospace" }}>{items.length}</span>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
                  gap: 14
                }}>
                  {items.map(dish => (
                    <div key={dish.id}
                      onClick={() => setExpanded(expanded === dish.id ? null : dish.id)}
                      style={{
                        background: expanded === dish.id
                          ? `linear-gradient(135deg, ${tierConfig[dish.tier].bg}, rgba(255,255,255,0.02))`
                          : "rgba(255,255,255,0.02)",
                        border: `1px solid ${expanded === dish.id ? tierConfig[dish.tier].color + "44" : "#1a1a1a"}`,
                        borderRadius: 12,
                        padding: isMobile ? 14 : 18,
                        cursor: "pointer",
                        transition: "all 0.25s", position: "relative",
                        boxShadow: expanded === dish.id ? `0 0 24px ${tierConfig[dish.tier].color}15` : "none"
                      }}>

                      {/* Card header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div style={{ flex: 1, paddingRight: 10 }}>
                          <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 600, color: "#f0ead8", lineHeight: 1.35, marginBottom: 3 }}>
                            {dish.name}
                          </div>
                          <div style={{ fontSize: 10, color: "#666", fontFamily: "monospace", letterSpacing: 1 }}>
                            {dish.cuisine} · {dish.type === "egg" ? "🥚" : "🌱"}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{
                            fontSize: isMobile ? 18 : 22, fontWeight: 700,
                            color: tierConfig[dish.tier].color, fontFamily: "monospace", lineHeight: 1
                          }}>{dish.protein}g</div>
                          <div style={{ fontSize: 9, color: "#555", fontFamily: "monospace" }}>protein</div>
                        </div>
                      </div>

                      {/* Quick stats */}
                      <div style={{ display: "flex", gap: isMobile ? 8 : 12, marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, color: "#888", fontFamily: "monospace" }}>⏱ {dish.prep}</span>
                        <span style={{ fontSize: 10, color: "#888", fontFamily: "monospace" }}>🔥 {dish.cook}</span>
                        <span style={{ fontSize: 10, color: "#888", fontFamily: "monospace" }}>{dish.cal} kcal</span>
                      </div>

                      {/* Benefit tags */}
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: expanded === dish.id ? 14 : 0 }}>
                        {dish.benefits.map(b => (
                          <span key={b} style={{
                            fontSize: 9, padding: "2px 7px", borderRadius: 999,
                            background: `${benefitColors[b]}18`, color: benefitColors[b],
                            border: `1px solid ${benefitColors[b]}33`, fontFamily: "monospace"
                          }}>{b}</span>
                        ))}
                      </div>

                      {/* Expanded content */}
                      {expanded === dish.id && (
                        <div style={{ marginTop: 4 }} onClick={e => e.stopPropagation()}>
                          <div style={{
                            background: "rgba(255,255,255,0.03)", borderRadius: 8,
                            padding: "10px 12px", marginBottom: 12
                          }}>
                            <div style={{ fontSize: 11, color: "#aaa", lineHeight: 1.7 }}>
                              <div style={{ marginBottom: 8 }}>
                                <span style={{ color: "#666", fontFamily: "monospace" }}>NUTRIENTS: </span>
                                {dish.nutrients}
                              </div>
                              <div>
                                <span style={{ color: "#666", fontFamily: "monospace" }}>WHY: </span>
                                {dish.why}
                              </div>
                            </div>
                          </div>

                          {/* Links */}
                          <div style={{ display: "flex", gap: 8 }}>
                            <a href={dish.recipe} target="_blank" rel="noopener noreferrer"
                              style={{
                                flex: 1, padding: "10px 8px", borderRadius: 8, textDecoration: "none",
                                background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)",
                                color: "#22c55e", fontSize: isMobile ? 11 : 12, fontFamily: "monospace",
                                textAlign: "center", display: "block"
                              }}>
                              📖 RECIPE
                            </a>
                            <a href={dish.youtube} target="_blank" rel="noopener noreferrer"
                              style={{
                                flex: 1, padding: "10px 8px", borderRadius: 8, textDecoration: "none",
                                background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
                                color: "#ef4444", fontSize: isMobile ? 11 : 12, fontFamily: "monospace",
                                textAlign: "center", display: "block"
                              }}>
                              ▶ YOUTUBE
                            </a>
                          </div>
                        </div>
                      )}

                      {expanded !== dish.id && (
                        <div style={{
                          position: "absolute", bottom: 8, right: 12,
                          fontSize: 9, color: "#2a2a2a", fontFamily: "monospace"
                        }}>tap ↓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#444", fontFamily: "monospace" }}>
                No dishes match your filters.
              </div>
            )}
          </>
        )}

        {activeSection === "tips" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: 16
          }}>
            {[
              { icon: "🌟", title: "Glowing Skin", color: "#ec4899",
                tip: "Vitamin C drives collagen production. Red bell peppers, tomatoes, parsley are your best sources. Lycopene from COOKED tomatoes absorbs much better than raw. Always pair tomato dishes with olive oil — lycopene is fat-soluble. Zinc (tofu, eggs, tahini) heals and prevents acne." },
              { icon: "🧠", title: "Brain Health", color: "#8b5cf6",
                tip: "Choline in egg yolks is the most underrated brain nutrient. Do not skip egg yolks. Omega-3 from walnuts, flaxseed, chia supports neuron health. Quercetin from onions crosses the blood-brain barrier. MCT fats from coconut milk = instant brain fuel." },
              { icon: "🫀", title: "Debloating", color: "#06b6d4",
                tip: "Avoid raw onion, raw garlic, raw broccoli in large amounts — all high-FODMAP. Fermented foods (miso, yogurt, labneh) actively reduce bloating over time. Ginger is the #1 immediate debloating ingredient. Drink warm lemon water every morning before eating." },
              { icon: "💪", title: "Muscle Building", color: "#ef4444",
                tip: "Target 1.6g protein per kg bodyweight per day. At 65kg = 104g/day. Doable: Greek yogurt (20g) + soya curry (52g per 100g dry) + tofu stir fry (22g) + egg muffins (18g). Soya chunks are the highest plant protein food on earth." },
              { icon: "🌿", title: "Gut Health", color: "#10b981",
                tip: "Try to eat 30 different plants per week. Fermented foods add live bacteria. Resistant starch in cooled rice and potatoes feeds good gut bacteria. Fiber from lentils, beans, oats is the best prebiotic. When very bloated, go to congee or egg drop soup." },
              { icon: "⚡", title: "Indian Palate Hacks", color: "#f59e0b",
                tip: "Any dish instantly better with: squeeze of lemon, fresh green chilli, cumin, fresh coriander, or chaat masala. Your spice tolerance is a massive advantage. Shakshuka, misir wat, and mujaddara are the three dishes most familiar to an Indian tongue." },
            ].map(card => (
              <div key={card.title} style={{
                background: "rgba(255,255,255,0.02)", border: `1px solid ${card.color}22`,
                borderRadius: 12, padding: isMobile ? 18 : 24
              }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{card.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: card.color, marginBottom: 10, fontFamily: "monospace", letterSpacing: 1 }}>
                  {card.title.toUpperCase()}
                </div>
                <p style={{ fontSize: 12, color: "#999", lineHeight: 1.8, margin: 0 }}>{card.tip}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === "stock" && (
          <div>
            <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 20, letterSpacing: 1 }}>
              STOCK THESE 20 → MAKE 80% OF DISHES ANYTIME
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
              gap: 12
            }}>
              {[
                { name: "Soya Chunks (Nutrela)", reason: "52g protein/100g — highest plant protein on earth", icon: "🏆" },
                { name: "Greek Yogurt / Hung Curd", reason: "Probiotics, protein, skin, gut health", icon: "🥛" },
                { name: "Firm Tofu", reason: "Complete protein, muscle building, 22g/cup", icon: "⬜" },
                { name: "Eggs", reason: "Most complete food — all 9 aminos + choline + B12 + D", icon: "🥚" },
                { name: "Cottage Cheese", reason: "Casein = slow protein, great before sleep", icon: "🧀" },
                { name: "Red Lentils (Masoor)", reason: "Iron, protein, fiber — cooks in 20 mins", icon: "🫘" },
                { name: "Canned Chickpeas", reason: "No cooking needed, hummus or curry instantly", icon: "🫘" },
                { name: "Canned Black Beans", reason: "Highest anthocyanin bean, brain + gut", icon: "🫘" },
                { name: "Edamame (frozen)", reason: "Complete protein, defrost and eat, 17g/cup", icon: "💚" },
                { name: "Olive Oil", reason: "Replace refined oils completely, brain + anti-inflammatory", icon: "🫒" },
                { name: "Avocados", reason: "#1 skin food — vitamin E + oleic acid", icon: "🥑" },
                { name: "Walnuts", reason: "#1 brain nut — DHA precursor, Omega-3", icon: "🪨" },
                { name: "Tahini", reason: "More calcium than milk per tbsp, zinc, complete with chickpeas", icon: "🤍" },
                { name: "Canned Tomatoes", reason: "Lycopene, vitamin C, base for 15+ dishes", icon: "🍅" },
                { name: "Fresh Ginger", reason: "#1 anti-bloating + anti-inflammatory ingredient", icon: "🫚" },
                { name: "Spinach (fresh/frozen)", reason: "Iron, Vitamin K, folate — works in everything", icon: "🥬" },
                { name: "Red Bell Peppers", reason: "3x more Vitamin C than orange — collagen + skin", icon: "🫑" },
                { name: "Miso Paste", reason: "Probiotics, gut health, 5-minute soup base", icon: "🍵" },
                { name: "Rolled Oats", reason: "Beta-glucan fiber feeds gut microbiome", icon: "🌾" },
                { name: "Sesame Oil + Soy Sauce", reason: "Umami, sesamol antioxidant, zinc", icon: "🍶" },
              ].map((item, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid #1a1a1a",
                  borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start"
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#e0d8c8", marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>{item.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 24, borderTop: "1px solid #111" }}>
          <p style={{ color: "#333", fontSize: 10, fontFamily: "monospace", letterSpacing: isMobile ? 1 : 2 }}>
            TAP ANY CARD · RECIPE + YOUTUBE INSIDE · {dishes.length} DISHES
          </p>
        </div>
      </div>
    </div>
  );
}