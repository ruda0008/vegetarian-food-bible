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
  {
    id: 1, name: "Overnight Oats + Whey Protein", cuisine: "Western", type: "veg",
    prep: "5 min", cook: "0 min (overnight)", protein: 38, cal: 420,
    nutrients: "Beta-glucan, B vitamins, Iron, Calcium, Probiotics",
    benefits: ["Muscle", "Gut", "Debloat", "Brain"],
    tier: "ultra", mealType: ["breakfast", "mealprep"],
    why: "Adding 1 scoop whey to overnight oats is the single highest protein breakfast. Beta-glucan from oats feeds gut microbiome.",
    recipe: "https://www.bbcgoodfood.com/recipes/overnight-oats",
    youtube: "https://www.youtube.com/results?search_query=overnight+oats+high+protein+recipe"
  },
  {
    id: 2, name: "Cottage Cheese + Tofu Scramble", cuisine: "Fusion", type: "veg",
    prep: "5 min", cook: "10 min", protein: 36, cal: 320,
    nutrients: "Complete protein x2, Calcium, B12, Selenium, Isoflavones",
    benefits: ["Muscle", "Skin", "Brain"],
    tier: "ultra", mealType: ["breakfast"],
    why: "Blending cottage cheese into scrambled tofu doubles protein without changing texture much. One of the highest plant protein meals possible.",
    recipe: "https://minimalistbaker.com/tofu-scramble/",
    youtube: "https://www.youtube.com/results?search_query=high+protein+tofu+cottage+cheese+scramble"
  },
  {
    id: 3, name: "Greek Yogurt Protein Bowl", cuisine: "Western", type: "veg",
    prep: "3 min", cook: "0 min", protein: 35, cal: 380,
    nutrients: "Probiotics, Casein, Whey, Calcium, B12, Omega-3, Zinc",
    benefits: ["Muscle", "Gut", "Skin", "Brain", "Debloat"],
    tier: "ultra", mealType: ["breakfast"],
    why: "Combining Greek yogurt AND cottage cheese gives you both fast (whey) and slow (casein) proteins. Top with hemp seeds for Omega-3.",
    recipe: "https://www.eatwell101.com/greek-yogurt-protein-bowl",
    youtube: "https://www.youtube.com/results?search_query=high+protein+greek+yogurt+bowl+recipe"
  },
  {
    id: 4, name: "Edamame + Tofu Miso Ramen", cuisine: "Japanese", type: "veg",
    prep: "10 min", cook: "15 min", protein: 34, cal: 480,
    nutrients: "Complete protein, Probiotics (miso), Iodine, Isoflavones, B vitamins, Iron",
    benefits: ["Muscle", "Gut", "Brain", "Debloat"],
    tier: "ultra", mealType: ["dinner"],
    why: "Firm tofu + edamame in one bowl = 34g complete soy protein. Miso adds probiotics. Most complete single bowl on this list.",
    recipe: "https://www.pickuplimes.com/recipe/miso-ramen-476",
    youtube: "https://www.youtube.com/results?search_query=high+protein+tofu+miso+ramen+vegetarian"
  },
  {
    id: 5, name: "3-Egg Frittata + Feta + Spinach", cuisine: "Italian/Greek", type: "egg",
    prep: "5 min", cook: "15 min", protein: 32, cal: 360,
    nutrients: "Complete protein, Choline, Vitamin K, Calcium, Iron, B12, Selenium",
    benefits: ["Muscle", "Skin", "Brain", "Bones"],
    tier: "ultra", mealType: ["breakfast", "mealprep"],
    why: "3 whole eggs + feta cheese = 32g protein. Spinach adds iron and vitamin K. Bake once, eat across multiple meals.",
    recipe: "https://www.bbcgoodfood.com/recipes/spinach-feta-frittata",
    youtube: "https://www.youtube.com/results?search_query=spinach+feta+frittata+recipe"
  },
  {
    id: 6, name: "Egg White Omelette + Cottage Cheese + Spinach", cuisine: "Western", type: "egg",
    prep: "5 min", cook: "8 min", protein: 30, cal: 220,
    nutrients: "Very high protein, Calcium, Iron, Vitamin K, Folate",
    benefits: ["Muscle", "Skin", "Debloat"],
    tier: "ultra", mealType: ["breakfast"],
    why: "Highest protein-to-calorie egg dish. Best for muscle cutting. Spinach iron + K for skin renewal.",
    recipe: "https://www.allrecipes.com/recipe/egg-white-omelette/",
    youtube: "https://www.youtube.com/results?search_query=egg+white+cottage+cheese+omelette+high+protein"
  },
  {
    id: 7, name: "Paneer Bhurji", cuisine: "Indian", type: "veg",
    prep: "5 min", cook: "10 min", protein: 30, cal: 380,
    nutrients: "Complete protein, Calcium, B12, Phosphorus, Vitamin A",
    benefits: ["Muscle", "Bones", "Brain", "Skin"],
    tier: "ultra", mealType: ["breakfast", "lunch"],
    why: "200g paneer = 30g protein. Your highest-protein Indian dish. Use minimal oil, add bell peppers and tomatoes for vitamins.",
    recipe: "https://www.vegrecipesofindia.com/paneer-bhurji-recipe/",
    youtube: "https://www.youtube.com/results?search_query=healthy+paneer+bhurji+high+protein"
  },
  {
    id: 8, name: "Soya Chunk Curry", cuisine: "Indian", type: "veg",
    prep: "10 min", cook: "20 min", protein: 52, cal: 340,
    nutrients: "Complete protein (soy), Iron, Calcium, Fiber, Omega-3, Isoflavones",
    benefits: ["Muscle", "Brain", "Gut", "Skin"],
    tier: "ultra", mealType: ["lunch", "dinner", "mealprep"],
    why: "100g dry soya chunks = 52g protein — the HIGHEST plant protein density on this entire list. Absorbs any curry flavour perfectly.",
    recipe: "https://www.vegrecipesofindia.com/soya-chunks-curry/",
    youtube: "https://www.youtube.com/results?search_query=soya+chunks+curry+high+protein+vegetarian"
  },
  {
    id: 9, name: "Ethiopian Misir Wat", cuisine: "Ethiopian", type: "veg",
    prep: "5 min", cook: "20 min", protein: 18, cal: 280,
    nutrients: "Iron, Folate, Fiber, B6, Zinc, Potassium",
    benefits: ["Debloat", "Skin", "Brain", "Gut"],
    tier: "high", mealType: ["dinner", "mealprep"],
    why: "Red lentils are among the most complete plant proteins. Berbere spice is deeply anti-inflammatory. Tastes like smoky masoor dal.",
    recipe: "https://www.thespruceeats.com/ethiopian-red-lentils-misir-wat-2395565",
    youtube: "https://www.youtube.com/results?search_query=ethiopian+misir+wat+recipe"
  },
  {
    id: 10, name: "Lebanese Mujaddara", cuisine: "Middle Eastern", type: "veg",
    prep: "5 min", cook: "25 min", protein: 15, cal: 320,
    nutrients: "Complete protein (lentil+rice), Iron, B vitamins, Fiber, Zinc",
    benefits: ["Debloat", "Brain", "Gut"],
    tier: "high", mealType: ["lunch", "dinner"],
    why: "Lentil + rice = near-complete amino acid profile. Caramelized onion adds quercetin for brain protection.",
    recipe: "https://cookieandkate.com/mujaddara-recipe/",
    youtube: "https://www.youtube.com/results?search_query=mujaddara+Lebanese+lentil+rice+recipe"
  },
  {
    id: 11, name: "Moroccan Chickpea Tagine", cuisine: "Moroccan", type: "veg",
    prep: "10 min", cook: "25 min", protein: 14, cal: 340,
    nutrients: "Fiber, Iron, B6, Folate, Magnesium, Vitamin C, Zinc",
    benefits: ["Debloat", "Skin", "Brain", "Gut"],
    tier: "high", mealType: ["dinner", "mealprep"],
    why: "Chickpeas + tomatoes + turmeric + ginger = anti-inflammatory powerhouse. Very similar flavor logic to Gujarati chole.",
    recipe: "https://www.bbcgoodfood.com/recipes/moroccan-chickpea-soup",
    youtube: "https://www.youtube.com/results?search_query=moroccan+chickpea+tagine+recipe"
  },
  {
    id: 12, name: "Moroccan Harira Soup", cuisine: "Moroccan", type: "veg",
    prep: "10 min", cook: "25 min", protein: 16, cal: 290,
    nutrients: "Lentils+chickpeas, Iron, Folate, Fiber, Vitamin C",
    benefits: ["Debloat", "Gut", "Brain", "Skin"],
    tier: "high", mealType: ["dinner", "mealprep"],
    why: "Dual legume base = high protein and fiber. Lemon + coriander add vitamin C for better iron absorption.",
    recipe: "https://www.196flavors.com/morocco-harira/",
    youtube: "https://www.youtube.com/results?search_query=harira+soup+recipe+moroccan"
  },
  {
    id: 13, name: "Greek Yogurt Bowl (nuts + berries)", cuisine: "Mediterranean", type: "veg",
    prep: "3 min", cook: "0 min", protein: 20, cal: 280,
    nutrients: "Probiotics, Calcium, B12, Protein, Antioxidants, Omega-3 (walnuts)",
    benefits: ["Debloat", "Skin", "Brain", "Gut"],
    tier: "high", mealType: ["breakfast"],
    why: "Probiotics directly reduce bloating. Walnuts = #1 brain nut. Berries = top skin + brain antioxidant foods.",
    recipe: "https://www.loveandlemons.com/greek-yogurt/",
    youtube: "https://www.youtube.com/results?search_query=high+protein+greek+yogurt+bowl+breakfast"
  },
  {
    id: 14, name: "Hummus + Whole Grain Pita + Raw Veggies", cuisine: "Mediterranean", type: "veg",
    prep: "5 min", cook: "0 min", protein: 12, cal: 320,
    nutrients: "Tahini (calcium, zinc), Olive oil (polyphenols), Fiber, B vitamins, Iron",
    benefits: ["Debloat", "Skin", "Brain"],
    tier: "high", mealType: ["lunch"],
    why: "Chickpeas + tahini = complete protein. Olive oil polyphenols protect brain neurons. Zero cooking.",
    recipe: "https://cookieandkate.com/best-hummus-recipe/",
    youtube: "https://www.youtube.com/results?search_query=homemade+hummus+recipe"
  },
  {
    id: 15, name: "Turkish Red Lentil Soup (Mercimek)", cuisine: "Turkish", type: "veg",
    prep: "5 min", cook: "20 min", protein: 14, cal: 240,
    nutrients: "Iron, Fiber, B6, Folate, Potassium, Protein",
    benefits: ["Debloat", "Gut", "Skin"],
    tier: "high", mealType: ["dinner", "mealprep"],
    why: "Blended lentil soup = easiest form for gut absorption. Very similar to masoor dal. Lemon juice boosts iron uptake.",
    recipe: "https://www.themediterraneandish.com/turkish-lentil-soup/",
    youtube: "https://www.youtube.com/results?search_query=turkish+red+lentil+soup+mercimek+corbasi"
  },
  {
    id: 16, name: "Miso Soup with Tofu + Seaweed", cuisine: "Japanese", type: "veg",
    prep: "3 min", cook: "5 min", protein: 10, cal: 120,
    nutrients: "Probiotics, Iodine, B12 (seaweed), Isoflavones, Calcium, Zinc",
    benefits: ["Debloat", "Gut", "Skin", "Brain"],
    tier: "medium", mealType: ["dinner"],
    why: "Fermented miso = live probiotics. Seaweed = rare plant source of iodine + B12. Best debloating soup.",
    recipe: "https://www.justonecookbook.com/homemade-miso-soup/",
    youtube: "https://www.youtube.com/results?search_query=homemade+miso+soup+tofu+seaweed"
  },
  {
    id: 17, name: "Tofu Stir Fry (soy + ginger + garlic)", cuisine: "Asian", type: "veg",
    prep: "10 min", cook: "10 min", protein: 22, cal: 280,
    nutrients: "Complete protein, Calcium, Iron, Isoflavones, Ginger, Garlic (allicin)",
    benefits: ["Muscle", "Skin", "Brain"],
    tier: "high", mealType: ["lunch", "dinner"],
    why: "Tofu = highest plant protein density. Ginger = top anti-inflammatory for bloating. Garlic allicin = immune powerhouse.",
    recipe: "https://minimalistbaker.com/crispy-tofu-stir-fry/",
    youtube: "https://www.youtube.com/results?search_query=crispy+tofu+stir+fry+recipe+high+protein"
  },
  {
    id: 18, name: "Korean Dubu Jorim (Spicy Braised Tofu)", cuisine: "Korean", type: "veg",
    prep: "5 min", cook: "15 min", protein: 20, cal: 260,
    nutrients: "Complete protein, Calcium, Iron, Capsaicin, Selenium, Isoflavones",
    benefits: ["Muscle", "Skin", "Debloat"],
    tier: "high", mealType: ["lunch", "dinner"],
    why: "Capsaicin boosts metabolism. Tofu is muscle-building gold. Very easy and deeply satisfying.",
    recipe: "https://www.koreanbapsang.com/dubu-jorim-spicy-braised-tofu/",
    youtube: "https://www.youtube.com/results?search_query=dubu+jorim+spicy+braised+tofu+korean"
  },
  {
    id: 19, name: "Tabbouleh", cuisine: "Middle Eastern", type: "veg",
    prep: "10 min", cook: "0 min", protein: 5, cal: 180,
    nutrients: "Vitamin K (parsley), Vitamin C, Folate, Iron, Fiber",
    benefits: ["Skin", "Debloat", "Brain"],
    tier: "medium", mealType: ["lunch"],
    why: "Parsley = most vitamin K and C dense food. Massive detox + skin benefits. Zero cooking ever.",
    recipe: "https://cookieandkate.com/tabbouleh-recipe/",
    youtube: "https://www.youtube.com/results?search_query=tabbouleh+recipe+authentic"
  },
  {
    id: 20, name: "Spanish Gazpacho", cuisine: "Spanish", type: "veg",
    prep: "10 min", cook: "0 min", protein: 3, cal: 120,
    nutrients: "Lycopene, Vitamin C, Vitamin E, Beta-carotene, Potassium",
    benefits: ["Skin", "Debloat"],
    tier: "medium", mealType: ["lunch"],
    why: "Lycopene from raw tomatoes = #1 food for skin radiance. All raw = maximum enzyme retention. Zero cooking.",
    recipe: "https://www.seriouseats.com/gazpacho-recipe",
    youtube: "https://www.youtube.com/results?search_query=authentic+gazpacho+recipe+spanish"
  },
  {
    id: 21, name: "Ribollita (Tuscan White Bean Soup)", cuisine: "Italian", type: "veg",
    prep: "10 min", cook: "25 min", protein: 14, cal: 310,
    nutrients: "Fiber, Protein, Iron, Folate, B vitamins, Potassium, Kale",
    benefits: ["Gut", "Brain", "Skin"],
    tier: "high", mealType: ["dinner", "mealprep"],
    why: "White beans + kale + olive oil = triple threat for gut, brain, and skin. One of Italy's most nutritious soups.",
    recipe: "https://www.bbcgoodfood.com/recipes/ribollita",
    youtube: "https://www.youtube.com/results?search_query=ribollita+tuscan+bean+soup+recipe"
  },
  {
    id: 22, name: "Edamame with Sea Salt", cuisine: "Japanese", type: "veg",
    prep: "2 min", cook: "8 min", protein: 17, cal: 190,
    nutrients: "Complete protein, Folate, Vitamin K, Iron, Calcium, Fiber, Omega-3",
    benefits: ["Muscle", "Skin", "Brain", "Debloat"],
    tier: "high", mealType: ["lunch"],
    why: "One of very few plant foods with complete protein. High folate for cell repair and skin renewal.",
    recipe: "https://www.justonecookbook.com/edamame/",
    youtube: "https://www.youtube.com/results?search_query=how+to+cook+edamame"
  },
  {
    id: 23, name: "Pad Thai with Tofu", cuisine: "Thai", type: "veg",
    prep: "10 min", cook: "15 min", protein: 20, cal: 380,
    nutrients: "Complete protein, B vitamins, Tamarind (antioxidants), Bean sprouts, Peanuts",
    benefits: ["Muscle", "Brain", "Skin"],
    tier: "high", mealType: ["lunch", "dinner"],
    why: "Balanced macros + micronutrients. Bean sprouts add live enzymes. Tamarind supports liver detox.",
    recipe: "https://www.recipetineats.com/tofu-pad-thai/",
    youtube: "https://www.youtube.com/results?search_query=vegetarian+tofu+pad+thai+recipe"
  },
  {
    id: 24, name: "Thai Green Curry with Tofu", cuisine: "Thai", type: "veg",
    prep: "5 min", cook: "20 min", protein: 18, cal: 360,
    nutrients: "Coconut milk (MCT fats), Lemongrass, Galangal, Tofu protein",
    benefits: ["Brain", "Skin", "Gut"],
    tier: "high", mealType: ["dinner"],
    why: "MCT fats directly fuel the brain. Lemongrass is anti-microbial and debloating. Easy coconut curry.",
    recipe: "https://www.recipetineats.com/thai-green-curry/",
    youtube: "https://www.youtube.com/results?search_query=thai+green+curry+tofu+vegetarian"
  },
  {
    id: 25, name: "Tom Kha Soup with Tofu", cuisine: "Thai", type: "veg",
    prep: "5 min", cook: "15 min", protein: 12, cal: 240,
    nutrients: "MCT fats, Galangal, Lemongrass, Coconut, Mushrooms (beta-glucans)",
    benefits: ["Gut", "Brain", "Debloat"],
    tier: "high", mealType: ["dinner"],
    why: "Mushroom beta-glucans = powerful immune boost. Galangal stronger than ginger for digestion.",
    recipe: "https://www.thespruceeats.com/thai-coconut-soup-tom-kha-recipe-3217315",
    youtube: "https://www.youtube.com/results?search_query=tom+kha+soup+tofu+vegan+recipe"
  },
  {
    id: 26, name: "Pasta e Fagioli", cuisine: "Italian", type: "veg",
    prep: "5 min", cook: "20 min", protein: 16, cal: 380,
    nutrients: "Fiber, Iron, Protein, B vitamins, Rosemary (antioxidant), Olive oil",
    benefits: ["Gut", "Debloat", "Brain"],
    tier: "high", mealType: ["dinner"],
    why: "Beans + pasta = complete amino acids. Rosemary has strong cognitive benefits. Italian peasant food at its best.",
    recipe: "https://www.seriouseats.com/pasta-e-fagioli-recipe",
    youtube: "https://www.youtube.com/results?search_query=pasta+e+fagioli+recipe"
  },
  {
    id: 27, name: "Avocado Toast (whole grain)", cuisine: "Western", type: "veg",
    prep: "5 min", cook: "3 min", protein: 8, cal: 310,
    nutrients: "Omega-9, Vitamin E, Folate, Potassium, Fiber, B vitamins",
    benefits: ["Skin", "Brain", "Debloat"],
    tier: "medium", mealType: ["breakfast", "lunch"],
    why: "Avocado's oleic acid + vitamin E protect skin cell membranes. Top food for skin glow and radiance.",
    recipe: "https://cookieandkate.com/avocado-toast-recipe/",
    youtube: "https://www.youtube.com/results?search_query=avocado+toast+recipe+healthy"
  },
  {
    id: 28, name: "Black Bean Burrito Bowl", cuisine: "Mexican", type: "veg",
    prep: "5 min", cook: "10 min", protein: 18, cal: 420,
    nutrients: "Anthocyanins, Fiber, Iron, Magnesium, Resistant starch, Vitamin C",
    benefits: ["Gut", "Debloat", "Brain", "Muscle"],
    tier: "high", mealType: ["lunch", "dinner"],
    why: "Black beans = highest anthocyanin of any bean — brain + heart protection. Resistant starch feeds gut bacteria.",
    recipe: "https://minimalistbaker.com/black-bean-burrito-bowls/",
    youtube: "https://www.youtube.com/results?search_query=black+bean+burrito+bowl+vegetarian"
  },
  {
    id: 29, name: "Israeli Sabich Bowl", cuisine: "Israeli", type: "veg",
    prep: "10 min", cook: "15 min", protein: 13, cal: 350,
    nutrients: "Nasunin (eggplant antioxidant), Tahini, Chickpeas, Olive oil, Parsley",
    benefits: ["Brain", "Skin", "Debloat"],
    tier: "high", mealType: ["lunch"],
    why: "Nasunin in eggplant skin specifically protects brain cell membranes. Tahini is a calcium powerhouse.",
    recipe: "https://www.thespruceeats.com/sabich-sandwich-recipe-4583009",
    youtube: "https://www.youtube.com/results?search_query=sabich+bowl+recipe+israeli"
  },
  {
    id: 30, name: "Ethiopian Gomen (Collard Greens)", cuisine: "Ethiopian", type: "veg",
    prep: "5 min", cook: "15 min", protein: 6, cal: 140,
    nutrients: "Vitamin K, Vitamin C, Iron, Calcium, Folate, Beta-carotene",
    benefits: ["Skin", "Brain", "Bones"],
    tier: "medium", mealType: ["dinner"],
    why: "Collard greens are top vitamin K and calcium greens. Ethiopian spices add anti-inflammatory power.",
    recipe: "https://www.thespruceeats.com/ethiopian-collard-greens-gomen-recipe-2395575",
    youtube: "https://www.youtube.com/results?search_query=ethiopian+gomen+collard+greens+recipe"
  },
  {
    id: 31, name: "Shakshuka", cuisine: "Middle Eastern", type: "egg",
    prep: "5 min", cook: "15 min", protein: 16, cal: 280,
    nutrients: "Complete protein, Lycopene, Vitamin C, Iron, Choline, Vitamin D, B12",
    benefits: ["Muscle", "Skin", "Brain", "Debloat"],
    tier: "high", mealType: ["breakfast", "dinner"],
    why: "Vitamin C from tomatoes + iron from eggs = best iron absorption combo. Choline in yolk = #1 brain nutrient for memory.",
    recipe: "https://cookieandkate.com/shakshuka-recipe/",
    youtube: "https://www.youtube.com/results?search_query=shakshuka+recipe+easy"
  },
  {
    id: 32, name: "Egg Muffins / Mini Frittatas (meal prep)", cuisine: "Western", type: "egg",
    prep: "10 min", cook: "20 min", protein: 18, cal: 240,
    nutrients: "Complete protein, Choline, B12, Selenium, Vitamin D, Iron",
    benefits: ["Muscle", "Brain", "Skin"],
    tier: "high", mealType: ["breakfast", "mealprep"],
    why: "Make 12 on Sunday, eat all week. Each egg = 6g complete protein + most essential vitamins. Most efficient prep.",
    recipe: "https://www.wellplated.com/egg-muffins/",
    youtube: "https://www.youtube.com/results?search_query=egg+muffins+meal+prep+recipe"
  },
  {
    id: 33, name: "Turkish Menemen", cuisine: "Turkish", type: "egg",
    prep: "5 min", cook: "10 min", protein: 14, cal: 260,
    nutrients: "Complete protein, Vitamin C, Lycopene, Choline, B12, Capsaicin",
    benefits: ["Skin", "Brain", "Muscle"],
    tier: "high", mealType: ["breakfast"],
    why: "Quicker than shakshuka. Capsicum + tomato = massive vitamin C hit. Great for collagen production.",
    recipe: "https://www.thespruceeats.com/menemen-turkish-scrambled-eggs-4684573",
    youtube: "https://www.youtube.com/results?search_query=turkish+menemen+recipe"
  },
  {
    id: 34, name: "Protein Pancakes (egg + banana + oats)", cuisine: "Western", type: "egg",
    prep: "3 min", cook: "7 min", protein: 16, cal: 320,
    nutrients: "Complete protein, Potassium, B6, Beta-glucan, Choline, Magnesium",
    benefits: ["Muscle", "Brain", "Gut"],
    tier: "high", mealType: ["breakfast"],
    why: "3 ingredients, 10 minutes. Magnesium supports muscle function. B6 crucial for neurotransmitter production.",
    recipe: "https://www.bbcgoodfood.com/recipes/banana-protein-pancakes",
    youtube: "https://www.youtube.com/results?search_query=3+ingredient+protein+pancakes+egg+banana+oats"
  },
  {
    id: 35, name: "Scrambled Eggs + Greek Yogurt", cuisine: "Western", type: "egg",
    prep: "3 min", cook: "5 min", protein: 22, cal: 260,
    nutrients: "Complete protein x2, Probiotics, Calcium, Choline, B12, Selenium",
    benefits: ["Muscle", "Gut", "Brain", "Skin"],
    tier: "high", mealType: ["breakfast"],
    why: "Mixing Greek yogurt into eggs = creamier texture, 8g extra protein, adds probiotics. Best protein-per-minute meal.",
    recipe: "https://www.seriouseats.com/the-best-scrambled-eggs-recipe",
    youtube: "https://www.youtube.com/results?search_query=scrambled+eggs+greek+yogurt+high+protein"
  },
  {
    id: 36, name: "Baked Eggs in Avocado", cuisine: "Western", type: "egg",
    prep: "3 min", cook: "15 min", protein: 12, cal: 280,
    nutrients: "Complete protein, Oleic acid, Vitamin E, Choline, Folate, Potassium, B12",
    benefits: ["Skin", "Brain", "Debloat"],
    tier: "high", mealType: ["breakfast"],
    why: "Avocado + egg = ultimate skin + brain combo. Oleic acid + choline + vitamin E in one meal.",
    recipe: "https://www.allrecipes.com/recipe/238789/baked-eggs-in-avocado/",
    youtube: "https://www.youtube.com/results?search_query=baked+eggs+in+avocado+recipe"
  },
  {
    id: 37, name: "Korean Gyeran Bap (Egg Rice Bowl)", cuisine: "Korean", type: "egg",
    prep: "2 min", cook: "5 min", protein: 14, cal: 380,
    nutrients: "Complete protein, Choline, B12, Sesame (calcium, zinc, sesamol antioxidant)",
    benefits: ["Brain", "Muscle"],
    tier: "medium", mealType: ["lunch", "dinner"],
    why: "Fastest high-protein hot meal on this entire list. Fried egg over rice + sesame oil + soy sauce. Unbeatable speed.",
    recipe: "https://www.maangchi.com/recipe/gyeranjjim",
    youtube: "https://www.youtube.com/results?search_query=korean+egg+rice+bowl+gyeran+bap"
  },
  {
    id: 38, name: "Breakfast Burrito (egg + beans + cheese + salsa)", cuisine: "Mexican", type: "egg",
    prep: "5 min", cook: "8 min", protein: 22, cal: 450,
    nutrients: "Complete protein, Iron, Fiber, Calcium, Vitamin C, B vitamins, Choline",
    benefits: ["Muscle", "Gut", "Brain"],
    tier: "high", mealType: ["breakfast"],
    why: "Egg + bean combo = complete amino acids. High fiber keeps you full. Best post-workout breakfast.",
    recipe: "https://www.loveandlemons.com/breakfast-burrito/",
    youtube: "https://www.youtube.com/results?search_query=high+protein+breakfast+burrito+recipe"
  },
  {
    id: 39, name: "Egg Drop Soup", cuisine: "Chinese", type: "egg",
    prep: "3 min", cook: "7 min", protein: 10, cal: 120,
    nutrients: "Complete protein, Choline, B12, Ginger (anti-inflammatory)",
    benefits: ["Debloat", "Gut", "Brain"],
    tier: "medium", mealType: ["dinner"],
    why: "Gentlest egg dish for your gut. Perfect when bloated. Ginger soothes digestion. Extremely light.",
    recipe: "https://www.seriouseats.com/egg-drop-soup-recipe",
    youtube: "https://www.youtube.com/results?search_query=egg+drop+soup+recipe+easy"
  },
  {
    id: 40, name: "Thai Basil Fried Egg over Rice", cuisine: "Thai", type: "egg",
    prep: "3 min", cook: "7 min", protein: 14, cal: 380,
    nutrients: "Complete protein, Choline, B12, Holy basil (eugenol), Capsaicin",
    benefits: ["Brain", "Muscle"],
    tier: "medium", mealType: ["lunch", "dinner"],
    why: "Holy basil has powerful eugenol — anti-inflammatory and antimicrobial. Crispy egg edges are incredible.",
    recipe: "https://www.seriouseats.com/thai-fried-egg-recipe",
    youtube: "https://www.youtube.com/results?search_query=thai+basil+fried+egg+over+rice"
  },
  {
    id: 41, name: "Vietnamese Banh Mi Egg Sandwich", cuisine: "Vietnamese", type: "egg",
    prep: "10 min", cook: "8 min", protein: 16, cal: 360,
    nutrients: "Complete protein, Choline, Probiotics (pickled daikon), Vitamin C, B vitamins",
    benefits: ["Gut", "Skin", "Brain", "Muscle"],
    tier: "high", mealType: ["lunch"],
    why: "Pickled daikon = probiotics + vitamin C. One of the most nutritionally interesting sandwiches on this list.",
    recipe: "https://www.seriouseats.com/banh-mi-recipe",
    youtube: "https://www.youtube.com/results?search_query=banh+mi+egg+sandwich+recipe"
  },
  {
    id: 42, name: "Huevos Rancheros", cuisine: "Mexican", type: "egg",
    prep: "5 min", cook: "10 min", protein: 18, cal: 380,
    nutrients: "Complete protein, Lycopene, Vitamin C, Iron, Fiber, Choline, Capsaicin",
    benefits: ["Skin", "Muscle", "Brain"],
    tier: "high", mealType: ["breakfast", "lunch"],
    why: "Eggs + salsa + beans on tortilla. Vitamin C from salsa dramatically boosts iron absorption.",
    recipe: "https://cookieandkate.com/huevos-rancheros-recipe/",
    youtube: "https://www.youtube.com/results?search_query=huevos+rancheros+recipe+easy"
  },
  {
    id: 43, name: "Skyr Bowl (hemp seeds + walnuts)", cuisine: "Icelandic", type: "veg",
    prep: "3 min", cook: "0 min", protein: 33, cal: 380,
    nutrients: "Complete protein, Omega-3, DHA, Calcium, B12, Probiotics",
    benefits: ["Muscle", "Brain", "Skin", "Gut"],
    tier: "ultra", mealType: ["breakfast"],
    why: "Skyr has almost double the protein of Greek yogurt. Hemp seeds add complete protein + Omega-3. Walnuts add DHA for brain.",
    recipe: "https://www.bbcgoodfood.com/recipes/skyr-bowl",
    youtube: "https://www.youtube.com/results?search_query=skyr+bowl+high+protein+recipe"
  },
  {
    id: 44, name: "Tempeh Stir Fry (soy + ginger + sesame)", cuisine: "Asian", type: "veg",
    prep: "5 min", cook: "10 min", protein: 34, cal: 360,
    nutrients: "Complete protein, Probiotics, Iron, Calcium, Isoflavones, Sesamol",
    benefits: ["Muscle", "Gut", "Debloat", "Skin"],
    tier: "ultra", mealType: ["lunch", "dinner", "mealprep"],
    why: "Tempeh is fermented soya — higher protein than tofu AND probiotic. Fermentation makes it easier to digest than raw soy.",
    recipe: "https://minimalistbaker.com/simple-tempeh-stir-fry/",
    youtube: "https://www.youtube.com/results?search_query=tempeh+stir+fry+recipe+high+protein"
  },
  {
    id: 45, name: "Saag Tofu (Indian)", cuisine: "Indian", type: "veg",
    prep: "5 min", cook: "15 min", protein: 32, cal: 320,
    nutrients: "Complete protein, Vitamin K, Iron, Folate, Calcium, Isoflavones",
    benefits: ["Muscle", "Skin", "Brain", "Debloat"],
    tier: "ultra", mealType: ["lunch", "dinner"],
    why: "Palak paneer but with tofu — higher protein, lower fat. Spinach iron + vitamin K + tofu complete protein. Indian palate instant comfort.",
    recipe: "https://www.vegrecipesofindia.com/palak-tofu/",
    youtube: "https://www.youtube.com/results?search_query=saag+tofu+palak+tofu+recipe"
  },
  {
    id: 46, name: "Tempeh Taco Bowl", cuisine: "Mexican", type: "veg",
    prep: "5 min", cook: "10 min", protein: 36, cal: 420,
    nutrients: "Complete protein, Anthocyanins, Fiber, Omega-3, Healthy fats, Vitamin C",
    benefits: ["Muscle", "Gut", "Skin", "Brain"],
    tier: "ultra", mealType: ["lunch", "dinner"],
    why: "Crumbled tempeh + black beans = double protein hit. Avocado adds oleic acid for skin. Salsa adds vitamin C for iron absorption.",
    recipe: "https://minimalistbaker.com/tempeh-taco-meat/",
    youtube: "https://www.youtube.com/results?search_query=tempeh+taco+bowl+recipe+vegan"
  },
  {
    id: 47, name: "High Protein Smoothie (skyr + hemp + PB + banana)", cuisine: "Western", type: "veg",
    prep: "3 min", cook: "0 min", protein: 38, cal: 440,
    nutrients: "Complete protein, Omega-3, Magnesium, Potassium, B6, Vitamin E",
    benefits: ["Muscle", "Brain"],
    tier: "ultra", mealType: ["breakfast"],
    why: "Skyr + hemp seeds + peanut butter + banana = complete amino acid profile from multiple sources. Best pre or post workout drink.",
    recipe: "https://www.bbcgoodfood.com/recipes/protein-smoothie",
    youtube: "https://www.youtube.com/results?search_query=high+protein+smoothie+skyr+hemp+peanut+butter"
  },
  {
    id: 48, name: "Moong Dal Chilla with Paneer Stuffing", cuisine: "Indian", type: "veg",
    prep: "5 min", cook: "10 min", protein: 34, cal: 380,
    nutrients: "Complete protein x2, Calcium, B12, Phosphorus, Iron, Fiber",
    benefits: ["Muscle", "Gut", "Skin"],
    tier: "ultra", mealType: ["breakfast", "lunch", "mealprep"],
    why: "Moong dal batter + paneer filling = two complete proteins. Most familiar high protein option for Indian palate. Zero adjustment needed.",
    recipe: "https://www.vegrecipesofindia.com/moong-dal-chilla/",
    youtube: "https://www.youtube.com/results?search_query=moong+dal+chilla+paneer+stuffing+recipe"
  },
  {
    id: 49, name: "Quinoa Power Bowl (quinoa + edamame + tofu + tahini)", cuisine: "Fusion", type: "veg",
    prep: "5 min", cook: "15 min", protein: 35, cal: 460,
    nutrients: "Complete protein x3, Calcium, Iron, Omega-3, Zinc, B vitamins",
    benefits: ["Muscle", "Brain", "Skin"],
    tier: "ultra", mealType: ["lunch"],
    why: "Quinoa is the only grain with complete protein. Stacked with edamame and tofu = three complete plant proteins in one bowl.",
    recipe: "https://cookieandkate.com/quinoa-power-bowls/",
    youtube: "https://www.youtube.com/results?search_query=quinoa+power+bowl+tofu+edamame+tahini"
  },
  {
    id: 50, name: "3-Egg Shakshuka with Feta", cuisine: "Middle Eastern", type: "egg",
    prep: "5 min", cook: "15 min", protein: 31, cal: 380,
    nutrients: "Complete protein, Lycopene, Vitamin C, Choline, Calcium, B12, Iron",
    benefits: ["Muscle", "Skin", "Brain"],
    tier: "ultra", mealType: ["breakfast", "lunch"],
    why: "3 eggs instead of 2 + feta crumbled on top = 31g protein. Lycopene + choline + vitamin C all in one pan. Never bland.",
    recipe: "https://cookieandkate.com/shakshuka-recipe/",
    youtube: "https://www.youtube.com/results?search_query=shakshuka+3+eggs+feta+recipe"
  },
  {
    id: 51, name: "Tempeh Miso Soup", cuisine: "Japanese", type: "veg",
    prep: "5 min", cook: "10 min", protein: 30, cal: 280,
    nutrients: "Complete protein, Probiotics x2, Iodine, B12, Isoflavones, Zinc",
    benefits: ["Muscle", "Gut", "Debloat"],
    tier: "ultra", mealType: ["dinner"],
    why: "Miso + tempeh = probiotics from two sources simultaneously. Lowest calorie 30g+ protein dish on this list.",
    recipe: "https://www.justonecookbook.com/miso-soup/",
    youtube: "https://www.youtube.com/results?search_query=tempeh+miso+soup+recipe+high+protein"
  },
  {
    id: 52, name: "Korean Sundubu Jjigae (Soft Tofu Stew)", cuisine: "Korean", type: "veg",
    prep: "3 min", cook: "10 min", protein: 18, cal: 220,
    nutrients: "Silken tofu protein, Mushroom beta-glucans, Capsaicin, Selenium, Iron",
    benefits: ["Debloat", "Gut", "Brain"],
    tier: "high", mealType: ["dinner"],
    why: "Softest most digestible tofu preparation. Gochugaru reduces inflammation. Mushroom beta-glucans boost immunity. Deeply savoury broth.",
    recipe: "https://www.koreanbapsang.com/sundubu-jjigae-soft-tofu-stew/",
    youtube: "https://www.youtube.com/results?search_query=sundubu+jjigae+soft+tofu+stew+vegetarian"
  },
  {
    id: 53, name: "Japanese Hiyayakko (Cold Tofu)", cuisine: "Japanese", type: "veg",
    prep: "3 min", cook: "0 min", protein: 20, cal: 180,
    nutrients: "Complete protein, Isoflavones, Calcium, Ginger, Sesamol, Iodine",
    benefits: ["Debloat", "Muscle", "Skin"],
    tier: "high", mealType: ["lunch"],
    why: "Zero cooking. Lightest high protein dish on this list. Cold silken tofu + soy + ginger + sesame. Best summer debloating meal.",
    recipe: "https://www.justonecookbook.com/hiyayakko-cold-tofu/",
    youtube: "https://www.youtube.com/results?search_query=hiyayakko+cold+tofu+recipe+japanese"
  },
  {
    id: 54, name: "Peanut Noodles with Edamame", cuisine: "Asian", type: "veg",
    prep: "5 min", cook: "10 min", protein: 26, cal: 440,
    nutrients: "Complete protein, Omega-3, Vitamin E, B vitamins, Manganese, Zinc",
    benefits: ["Brain", "Muscle", "Skin"],
    tier: "high", mealType: ["lunch", "dinner"],
    why: "Peanut butter + edamame = complete protein combo. Rich nutty tangy sauce — never bland. Omega-3 from edamame for brain.",
    recipe: "https://minimalistbaker.com/easy-peanut-noodles/",
    youtube: "https://www.youtube.com/results?search_query=peanut+noodles+edamame+recipe+easy"
  },
  {
    id: 55, name: "Labneh Flatbread + Za'atar + Hemp Seeds", cuisine: "Middle Eastern", type: "veg",
    prep: "3 min", cook: "5 min", protein: 22, cal: 340,
    nutrients: "Probiotics, Calcium, Omega-3, Zinc, Thyme antioxidants, Olive oil polyphenols",
    benefits: ["Gut", "Skin", "Brain"],
    tier: "high", mealType: ["breakfast", "lunch"],
    why: "Hemp seeds turn a snack into a muscle building meal. Za'atar is one of the most antioxidant-rich spice blends. Probiotic labneh debloats.",
    recipe: "https://www.themediterraneandish.com/labneh/",
    youtube: "https://www.youtube.com/results?search_query=labneh+flatbread+zaatar+recipe"
  },
  {
    id: 56, name: "Miso Glazed Tofu (pan fried)", cuisine: "Japanese", type: "veg",
    prep: "3 min", cook: "8 min", protein: 22, cal: 260,
    nutrients: "Complete protein, Probiotics, Sesamol, Isoflavones, Zinc, B vitamins",
    benefits: ["Gut", "Muscle", "Skin", "Debloat"],
    tier: "high", mealType: ["lunch", "dinner"],
    why: "Crispy outside soft inside. Miso glaze = umami bomb + probiotics. One of the most flavourful tofu preparations. Never bland.",
    recipe: "https://minimalistbaker.com/miso-glazed-tofu/",
    youtube: "https://www.youtube.com/results?search_query=miso+glazed+tofu+recipe+crispy"
  },
  {
    id: 57, name: "Turkish Cilbir (Poached Egg + Garlic Yogurt)", cuisine: "Turkish", type: "egg",
    prep: "3 min", cook: "7 min", protein: 24, cal: 280,
    nutrients: "Complete protein, Probiotics, Choline, B12, Allicin, Capsaicin, Calcium",
    benefits: ["Muscle", "Gut", "Brain", "Skin"],
    tier: "high", mealType: ["breakfast"],
    why: "Ancient Ottoman dish — poached eggs on garlic yogurt + chilli butter. Incredible layered flavours. Protein from egg AND yogurt simultaneously.",
    recipe: "https://www.thespruceeats.com/cilbir-turkish-eggs-recipe-4783069",
    youtube: "https://www.youtube.com/results?search_query=cilbir+turkish+eggs+yogurt+recipe"
  },
  {
    id: 58, name: "Beetroot Hummus + Whole Grain Pita", cuisine: "Middle Eastern", type: "veg",
    prep: "5 min", cook: "0 min", protein: 14, cal: 300,
    nutrients: "Nitrates, Betalains, Iron, Calcium (tahini), Folate, Fiber, Vitamin C",
    benefits: ["Skin", "Brain", "Debloat"],
    tier: "high", mealType: ["lunch"],
    why: "Chickpea protein + beetroot nitrates + tahini calcium. Nitric oxide from beetroot gives skin glow. Visually stunning deep pink colour.",
    recipe: "https://cookieandkate.com/beet-hummus-recipe/",
    youtube: "https://www.youtube.com/results?search_query=beetroot+hummus+recipe+easy"
  },
  {
    id: 59, name: "Green Shakshuka (spinach + herbs + eggs)", cuisine: "Middle Eastern", type: "egg",
    prep: "5 min", cook: "12 min", protein: 20, cal: 260,
    nutrients: "Complete protein, Vitamin K, Folate, Iron, Choline, B12, Magnesium",
    benefits: ["Skin", "Brain", "Muscle"],
    tier: "high", mealType: ["breakfast"],
    why: "Eggs poached in spinach + herb green sauce. Higher vitamin K and folate than red shakshuka. Bright herby flavour — refreshing not heavy.",
    recipe: "https://www.loveandlemons.com/green-shakshuka/",
    youtube: "https://www.youtube.com/results?search_query=green+shakshuka+recipe+spinach"
  },
  {
    id: 60, name: "Egg + Avocado Smash Bowl", cuisine: "Western", type: "egg",
    prep: "3 min", cook: "6 min", protein: 18, cal: 340,
    nutrients: "Complete protein, Oleic acid, Vitamin E, Choline, Folate, Potassium, B12",
    benefits: ["Skin", "Brain", "Debloat"],
    tier: "high", mealType: ["breakfast"],
    why: "Choline + oleic acid + vitamin E in one bowl. 9 minutes total. Avocado fat helps absorb all fat-soluble vitamins from the egg.",
    recipe: "https://www.bbcgoodfood.com/recipes/avocado-eggs",
    youtube: "https://www.youtube.com/results?search_query=egg+avocado+smash+bowl+recipe"
  },
  {
    id: 61, name: "Tempeh Bolognese (Italian)", cuisine: "Italian", type: "veg",
    prep: "10 min", cook: "20 min", protein: 28, cal: 420,
    nutrients: "Complete protein, Probiotics, Lycopene, Iron, B vitamins, Rosemary antioxidants",
    benefits: ["Muscle", "Gut", "Skin"],
    tier: "high", mealType: ["dinner", "mealprep"],
    why: "Crumbled tempeh as bolognese meat — tastes incredibly rich and meaty. Make huge batch, refrigerates 5 days, freezes 3 months.",
    recipe: "https://minimalistbaker.com/tempeh-bolognese/",
    youtube: "https://www.youtube.com/results?search_query=tempeh+bolognese+recipe+vegan"
  },
  {
    id: 62, name: "Quinoa + Black Bean Salad", cuisine: "Mexican", type: "veg",
    prep: "10 min", cook: "15 min", protein: 22, cal: 380,
    nutrients: "Complete protein, Anthocyanins, Fiber, Lime (vitamin C), Cumin, Folate",
    benefits: ["Muscle", "Brain", "Debloat", "Skin"],
    tier: "high", mealType: ["lunch", "mealprep"],
    why: "Quinoa + black beans = complete amino acids. Lime + cumin + coriander = punchy fresh flavour. Refrigerates 4 days perfectly.",
    recipe: "https://cookieandkate.com/black-bean-quinoa-salad-recipe/",
    youtube: "https://www.youtube.com/results?search_query=quinoa+black+bean+salad+mexican+recipe"
  },
  {
    id: 63, name: "Chana Masala (Indian)", cuisine: "Indian", type: "veg",
    prep: "5 min", cook: "20 min", protein: 19, cal: 320,
    nutrients: "Fiber, Iron, Folate, B6, Zinc, Potassium, Vitamin C",
    benefits: ["Gut", "Debloat", "Muscle", "Brain"],
    tier: "high", mealType: ["lunch", "dinner", "mealprep"],
    why: "Your most familiar meal prep. Gets better every day as spices develop. Freezes 3 months. Zero adjustment needed for Indian palate.",
    recipe: "https://www.vegrecipesofindia.com/chana-masala-recipe/",
    youtube: "https://www.youtube.com/results?search_query=chana+masala+recipe+easy+authentic"
  },
  {
    id: 64, name: "Baked Tempeh + Roasted Vegetables", cuisine: "Fusion", type: "veg",
    prep: "10 min", cook: "25 min", protein: 32, cal: 380,
    nutrients: "Complete protein, Probiotics, Beta-carotene, Vitamin C, Iron, Fiber",
    benefits: ["Muscle", "Skin", "Gut"],
    tier: "ultra", mealType: ["lunch", "dinner", "mealprep"],
    why: "Marinate in soy + ginger + garlic, bake alongside seasonal veg. Make full tray, refrigerates 5 days. Mix with rice or wraps all week.",
    recipe: "https://minimalistbaker.com/baked-tempeh/",
    youtube: "https://www.youtube.com/results?search_query=baked+tempeh+roasted+vegetables+meal+prep"
  },
  {
    id: 65, name: "Spinach Dal (Indian)", cuisine: "Indian", type: "veg",
    prep: "5 min", cook: "20 min", protein: 18, cal: 260,
    nutrients: "Iron, Vitamin K, Folate, Fiber, B6, Potassium, Protein",
    benefits: ["Skin", "Brain", "Debloat", "Muscle"],
    tier: "high", mealType: ["lunch", "dinner", "mealprep"],
    why: "Moong or masoor dal + spinach = most nutritious Indian meal prep. Iron + folate + protein + vitamin K in one pot. Makes 5 portions easily.",
    recipe: "https://www.vegrecipesofindia.com/palak-dal-recipe/",
    youtube: "https://www.youtube.com/results?search_query=spinach+dal+palak+dal+recipe"
  },
  {
    id: 66, name: "Moroccan Spiced Lentil + Sweet Potato", cuisine: "Moroccan", type: "veg",
    prep: "10 min", cook: "25 min", protein: 16, cal: 360,
    nutrients: "Beta-carotene, Vitamin A, Iron, Fiber, Folate, Cinnamon (blood sugar), B6",
    benefits: ["Skin", "Gut", "Brain", "Debloat"],
    tier: "high", mealType: ["dinner", "mealprep"],
    why: "Sweet potato beta-carotene converts to vitamin A — critical for skin cell renewal. Warm spices — cumin, coriander, cinnamon = complex flavour.",
    recipe: "https://www.bbcgoodfood.com/recipes/moroccan-lentil-sweet-potato-soup",
    youtube: "https://www.youtube.com/results?search_query=moroccan+lentil+sweet+potato+recipe"
  },
  {
    id: 67, name: "Greek Baked Eggs in Tomato + Feta", cuisine: "Greek", type: "egg",
    prep: "5 min", cook: "20 min", protein: 24, cal: 320,
    nutrients: "Complete protein, Lycopene, Choline, Calcium, B12, Vitamin C, Selenium",
    benefits: ["Skin", "Muscle", "Brain"],
    tier: "high", mealType: ["breakfast", "mealprep"],
    why: "Bake in cast iron, slice like a cake, refrigerate. Reheat in 90 seconds all week. Lycopene + choline + calcium in every slice.",
    recipe: "https://www.themediterraneandish.com/baked-eggs/",
    youtube: "https://www.youtube.com/results?search_query=greek+baked+eggs+tomato+feta+recipe"
  },
  {
    id: 68, name: "Saag Paneer Wrap", cuisine: "Indian", type: "veg",
    prep: "5 min", cook: "10 min", protein: 24, cal: 380,
    nutrients: "Complete protein, Vitamin K, Iron, Calcium, Folate, Fiber",
    benefits: ["Muscle", "Skin", "Brain"],
    tier: "high", mealType: ["lunch"],
    why: "Leftover saag + paneer in whole wheat wrap. Your Indian palate, zero adjustment. Iron + protein + vitamin K in one portable meal.",
    recipe: "https://www.vegrecipesofindia.com/palak-paneer-recipe/",
    youtube: "https://www.youtube.com/results?search_query=saag+paneer+wrap+recipe+quick"
  },
];

const benefitColors = {
  "Muscle": "#ef4444", "Skin": "#ec4899", "Brain": "#8b5cf6",
  "Gut": "#10b981", "Debloat": "#06b6d4", "Bones": "#f59e0b",
};

const tierConfig = {
  ultra: { label: "🔥 ULTRA HIGH PROTEIN (30g+)", color: "#ff4500", bg: "#1a0a00" },
  high: { label: "💪 HIGH PROTEIN (14–28g)", color: "#22c55e", bg: "#0a1a0a" },
  medium: { label: "🌿 NUTRITIOUS (5–13g)", color: "#60a5fa", bg: "#0a0f1a" },
};

const cuisines = ["all", "Indian", "Japanese", "Korean", "Thai", "Turkish", "Middle Eastern", "Moroccan", "Ethiopian", "Italian", "Mexican", "Western", "Asian", "Icelandic", "Fusion", "Vietnamese", "Greek", "Spanish", "Chinese", "Israeli", "Mediterranean"];

const mealTypes = [
  ["all", "🍽 All"],
  ["breakfast", "🌅 Breakfast"],
  ["lunch", "☀️ Lunch"],
  ["dinner", "🌙 Dinner"],
  ["mealprep", "📦 Meal Prep"],
];

export default function NutritionGuide() {
  const width = useWindowSize();
  const isMobile = width < 640;
  const isTablet = width < 900;

  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [benefitFilter, setBenefitFilter] = useState("all");
  const [cuisineFilter, setCuisineFilter] = useState("all");
  const [mealFilter, setMealFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [activeSection, setActiveSection] = useState("dishes");

  const filtered = useMemo(() => {
    return dishes.filter(d => {
      if (filter !== "all" && d.tier !== filter) return false;
      if (typeFilter !== "all" && d.type !== typeFilter) return false;
      if (benefitFilter !== "all" && !d.benefits.includes(benefitFilter)) return false;
      if (cuisineFilter !== "all" && d.cuisine !== cuisineFilter) return false;
      if (mealFilter !== "all" && !d.mealType.includes(mealFilter)) return false;
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) &&
          !d.cuisine.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, typeFilter, benefitFilter, cuisineFilter, mealFilter, search]);

  const grouped = useMemo(() => {
    const g = {};
    ["ultra", "high", "medium"].forEach(t => {
      const items = filtered.filter(d => d.tier === t);
      if (items.length) g[t] = items;
    });
    return g;
  }, [filtered]);

  const FilterBtn = ({ active, color, onClick, children }) => (
    <button onClick={onClick} style={{
      padding: "5px 10px", borderRadius: 999, border: "1px solid",
      borderColor: active ? color : "#2a2a2a",
      background: active ? `${color}22` : "transparent",
      color: active ? color : "#666",
      cursor: "pointer", fontSize: 11, fontFamily: "monospace",
      transition: "all 0.15s"
    }}>{children}</button>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#050508", color: "#e8e0d0",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative", overflowX: "hidden"
    }}>
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
            fontSize: isMobile ? 28 : isTablet ? 38 : 52, fontWeight: 400, lineHeight: 1.15,
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
              padding: isMobile ? "8px 16px" : "8px 22px", borderRadius: 999, border: "1px solid",
              borderColor: activeSection === key ? "#ff4500" : "#333",
              background: activeSection === key ? "rgba(255,69,0,0.15)" : "transparent",
              color: activeSection === key ? "#ff4500" : "#888",
              cursor: "pointer", fontSize: isMobile ? 12 : 13, fontFamily: "monospace", letterSpacing: 1
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
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search dish or cuisine..."
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(255,255,255,0.05)", border: "1px solid #2a2a2a",
                  borderRadius: 8, padding: "9px 14px", color: "#e8e0d0",
                  fontFamily: "monospace", fontSize: 12, outline: "none", marginBottom: 14
                }}
              />

              {/* Meal Type */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: "#a78bfa", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>MEAL TYPE</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {mealTypes.map(([v, l]) => (
                    <FilterBtn key={v} active={mealFilter === v} color="#a78bfa" onClick={() => setMealFilter(v)}>{l}</FilterBtn>
                  ))}
                </div>
              </div>

              {/* Cuisine */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: "#f59e0b", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>CUISINE</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {cuisines.map(v => (
                    <FilterBtn key={v} active={cuisineFilter === v} color="#f59e0b" onClick={() => setCuisineFilter(v)}>
                      {v === "all" ? "🌍 All" : v}
                    </FilterBtn>
                  ))}
                </div>
              </div>

              {/* Protein Tier */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: "#ff4500", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>PROTEIN TIER</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[["all", "All"], ["ultra", "🔥 30g+"], ["high", "💪 14g+"], ["medium", "🌿 5g+"]].map(([v, l]) => (
                    <FilterBtn key={v} active={filter === v} color="#ff4500" onClick={() => setFilter(v)}>{l}</FilterBtn>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: "#22c55e", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>TYPE</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[["all", "All"], ["veg", "🌱 Veg"], ["egg", "🥚 Egg"]].map(([v, l]) => (
                    <FilterBtn key={v} active={typeFilter === v} color="#22c55e" onClick={() => setTypeFilter(v)}>{l}</FilterBtn>
                  ))}
                </div>
              </div>

              {/* Benefit */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#60a5fa", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>BENEFIT</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["all", "Muscle", "Skin", "Brain", "Gut", "Debloat"].map(v => (
                    <FilterBtn key={v} active={benefitFilter === v} color={benefitColors[v] || "#60a5fa"} onClick={() => setBenefitFilter(v)}>
                      {v === "all" ? "All" : v}
                    </FilterBtn>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
                  {filtered.length} of {dishes.length} dishes
                </div>
                <button onClick={() => { setFilter("all"); setTypeFilter("all"); setBenefitFilter("all"); setCuisineFilter("all"); setMealFilter("all"); setSearch(""); }}
                  style={{
                    padding: "4px 10px", borderRadius: 999, border: "1px solid #333",
                    background: "transparent", color: "#555", cursor: "pointer",
                    fontSize: 10, fontFamily: "monospace"
                  }}>reset all</button>
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
                    letterSpacing: isMobile ? 1 : 3, color: tierConfig[tier].color
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
                        borderRadius: 12, padding: isMobile ? 14 : 18,
                        cursor: "pointer", transition: "all 0.25s", position: "relative",
                        boxShadow: expanded === dish.id ? `0 0 24px ${tierConfig[dish.tier].color}15` : "none"
                      }}>

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
                          <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: tierConfig[dish.tier].color, fontFamily: "monospace", lineHeight: 1 }}>
                            {dish.protein}g
                          </div>
                          <div style={{ fontSize: 9, color: "#555", fontFamily: "monospace" }}>protein</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: isMobile ? 8 : 12, marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, color: "#888", fontFamily: "monospace" }}>⏱ {dish.prep}</span>
                        <span style={{ fontSize: 10, color: "#888", fontFamily: "monospace" }}>🔥 {dish.cook}</span>
                        <span style={{ fontSize: 10, color: "#888", fontFamily: "monospace" }}>{dish.cal} kcal</span>
                      </div>

                      {/* Meal type tags */}
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
                        {dish.mealType.map(m => (
                          <span key={m} style={{
                            fontSize: 9, padding: "1px 6px", borderRadius: 999,
                            background: "rgba(167,139,250,0.1)", color: "#a78bfa",
                            border: "1px solid rgba(167,139,250,0.2)", fontFamily: "monospace"
                          }}>
                            {m === "breakfast" ? "🌅" : m === "lunch" ? "☀️" : m === "dinner" ? "🌙" : "📦"} {m}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: expanded === dish.id ? 14 : 0 }}>
                        {dish.benefits.map(b => (
                          <span key={b} style={{
                            fontSize: 9, padding: "2px 7px", borderRadius: 999,
                            background: `${benefitColors[b]}18`, color: benefitColors[b],
                            border: `1px solid ${benefitColors[b]}33`, fontFamily: "monospace"
                          }}>{b}</span>
                        ))}
                      </div>

                      {expanded === dish.id && (
                        <div style={{ marginTop: 4 }} onClick={e => e.stopPropagation()}>
                          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
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
                          <div style={{ display: "flex", gap: 8 }}>
                            <a href={dish.recipe} target="_blank" rel="noopener noreferrer" style={{
                              flex: 1, padding: "10px 8px", borderRadius: 8, textDecoration: "none",
                              background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)",
                              color: "#22c55e", fontSize: isMobile ? 11 : 12, fontFamily: "monospace",
                              textAlign: "center", display: "block"
                            }}>📖 RECIPE</a>
                            <a href={dish.youtube} target="_blank" rel="noopener noreferrer" style={{
                              flex: 1, padding: "10px 8px", borderRadius: 8, textDecoration: "none",
                              background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
                              color: "#ef4444", fontSize: isMobile ? 11 : 12, fontFamily: "monospace",
                              textAlign: "center", display: "block"
                            }}>▶ YOUTUBE</a>
                          </div>
                        </div>
                      )}

                      {expanded !== dish.id && (
                        <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 9, color: "#2a2a2a", fontFamily: "monospace" }}>tap ↓</div>
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
              { icon: "🌟", title: "Glowing Skin", color: "#ec4899", tip: "Vitamin C drives collagen production. Red bell peppers, tomatoes, parsley are your best sources. Lycopene from COOKED tomatoes absorbs much better than raw. Always pair tomato dishes with olive oil — lycopene is fat-soluble. Zinc (tofu, eggs, tahini) heals and prevents acne." },
              { icon: "🧠", title: "Brain Health", color: "#8b5cf6", tip: "Choline in egg yolks is the most underrated brain nutrient. Do not skip egg yolks. Omega-3 from walnuts, flaxseed, chia supports neuron health. Quercetin from onions crosses the blood-brain barrier. MCT fats from coconut milk = instant brain fuel." },
              { icon: "🫀", title: "Debloating", color: "#06b6d4", tip: "Avoid raw onion, raw garlic, raw broccoli in large amounts — all high-FODMAP. Fermented foods (miso, yogurt, labneh) actively reduce bloating over time. Ginger is the #1 immediate debloating ingredient. Drink warm lemon water every morning before eating." },
              { icon: "💪", title: "Muscle Building", color: "#ef4444", tip: "Target 1.6g protein per kg bodyweight per day. At 65kg = 104g/day. Doable: Greek yogurt (20g) + soya curry (52g per 100g dry) + tofu stir fry (22g) + egg muffins (18g). Soya chunks are the highest plant protein food on earth." },
              { icon: "🌿", title: "Gut Health", color: "#10b981", tip: "Try to eat 30 different plants per week. Fermented foods add live bacteria. Resistant starch in cooled rice and potatoes feeds good gut bacteria. Fiber from lentils, beans, oats is the best prebiotic. When very bloated, go to congee or egg drop soup." },
              { icon: "⚡", title: "Indian Palate Hacks", color: "#f59e0b", tip: "Any dish instantly better with: squeeze of lemon, fresh green chilli, cumin, fresh coriander, or chaat masala. Your spice tolerance is a massive advantage. Shakshuka, misir wat, and mujaddara are the three dishes most familiar to an Indian tongue." },
            ].map(card => (
              <div key={card.title} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${card.color}22`, borderRadius: 12, padding: isMobile ? 18 : 24 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{card.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: card.color, marginBottom: 10, fontFamily: "monospace", letterSpacing: 1 }}>{card.title.toUpperCase()}</div>
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
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12 }}>
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
                <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1a1a1a", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
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

        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 24, borderTop: "1px solid #111" }}>
          <p style={{ color: "#333", fontSize: 10, fontFamily: "monospace", letterSpacing: isMobile ? 1 : 2 }}>
            TAP ANY CARD · RECIPE + YOUTUBE INSIDE · {dishes.length} DISHES
          </p>
        </div>
      </div>
    </div>
  );
}