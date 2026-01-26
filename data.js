/* INSTRUCTIONS FOR UPDATING:
  1. Only change the text inside the "quotes".
  2. Do not delete the commas at the end of lines.
  3. To add a new item, copy an existing block { ... }, and paste it below.
*/

/// =========================================
// 1. SPECIAL OFFERS
// =========================================
const SPECIAL_OFFERS = [
  {
    title: "WEEKEND LUNCH SPECIAL",
    description: "Sat & Sun (12:00 - 15:00): Chef's Biryani Combos from £6.50."
  },
  {
    title: "THALI FEAST",
    description: "Sat & Sun (12:00 - 15:00): Veg, Non-Veg & Seafood Thalis from £10.99."
  },
  {
    title: "EAT IN OFFER",
    description: "Spend £50 and we will refund your Outlet Village parking charge."
  },
  {
    title: "EAT IN OFFER",
    description: "Free beer with a main meal, every Tuesday."
  },
  {
    title: "TAKEAWAY OFFER",
    description: "5% discount on takeaway / collections, every Thursday."
  }
];
  // To add a new offer, copy the block above and paste it here

// =========================================
// 2. REVIEWS (Google)
// =========================================
const REVIEWS_DATA = [
  {
    author: "Gina Dearing",
    rating: 5, // Number of stars (1-5)
    text: "Food is amazing, well recommended and the service was outstanding. Very accommodating to Vegan diets.",
    time: "Local Guide"
  },
  {
    author: "Fanz Ferns",
    rating: 5,
    text: "New business but good food, good taste, and well balanced spice. Service is quick. Well done.",
    time: "Local Guide"
  },
  {
    author: "Pratik Surani",
    rating: 5,
    text: "One of the best Indian restaurants I’ve eaten at in the UK — extremely fussy about Indian food.",
    time: "Verified Diner"
  },
  {
    author: "Tarun Reddy",
    rating: 5,
    text: "Breads very soft and tender. Kofta curry and Panner Tikka Masala is unique and delicious.",
    time: "Verified Diner"
  }
];

// =========================================
// 3. MENU ITEMS
// =========================================
/* Codes Guide: 
   "D" = Dairy, "G" = Gluten, "N" = Nuts, "F" = Fish, "S" = Soya, "P" = Prawns
*/
const MENU_DATA = [
  {
    category: "Papadum & Chutney",
    name: "Papadum with Homemade Chutney",
    desc: "Masala papad with onion, tomatoes, coriander and magic powder",
    price: "£0.90",
    codes: [] 
  },
  {
    category: "Snack Bites",
    name: "Punjabi Samosa (2pc)",
    desc: "Classic Punjabi vegetable samosa with tamarind chutney",
    price: "£3.50",
    codes: ["G"]
  },
  {
    category: "Snack Bites",
    name: "Bhel Puri",
    desc: "Puffed rice tossed with potatoes, onion finished with chutneys.",
    price: "£3.50",
    codes: ["G","D","N"]
  },
  {
    category: "Snack Bites",
    name: "Onion Bhaji (4pc)",
    desc: "Crispy fried onion coated with gram flour and mixed spices, mint sauce",
    price: "£3.90",
    codes: ["D"]
  },
  {
    category: "Snack Bites",
    name: "Gol-Gappa (6pc)",
    desc: "Wheat puffs, spiced chickpeas potatoes, tamarind, mint and coriander water.",
    price: "£4.50",
    codes: ["G","D"]
  },
  {
    category: "Snack Bites",
    name: "Chef Special - Kale Pakora Chaat",
    desc: "Crispy kale leaves fried with mint and tamarind chutney",
    price: "£5.90",
    codes: []
  },
  {
    category: "Snack Bites",
    name: "Samosa Chaat",
    desc: "Classic deconstructed samosa, chickpeas, sweet yoghurt, mint and tamarind chutney.",
    price: "£5.90",
    codes: ["D","G"]
  },
  {
    category: "Snack Bites",
    name: "Pav Bhaji",
    desc: "Special Street food of Mumbai Mash spicy vegetable, onion, tomato & spices with butter toasted bun.",
    price: "£5.90",
    codes: ["D","G"]
  },
  {
    category: "Snack Bites",
    name: "Gobi 65",
    desc: "Crispy cauliflower florets with curry leaves and chilli",
    price: "£5.90",
    codes: []
  },
  {
    category: "Snack Bites",
    name: "Aloo Tikki Chaat (2pc)",
    desc: "Crispy potato patties with chickpeas curry, assorted chutneys.",
    price: "£5.90",
    codes: ["D"]
  },
  {
    category: "Snack Bites",
    name: "Chef Special - Paneer Pocket Kebab",
    desc: "Layered paratha encased like a pocket, stuffed with paneer, peppers and onion.",
    price: "£7.90",
    codes: ["G","D"]
  },
  {
    category: "Snack Bites",
    name: "Chilli Paneer",
    desc: "Indian cottage tossed with chilli, mix pepper and soy sauce",
    price: "£7.90",
    codes: ["D","G"]
  },
  {
    category: "Non-Veg Starters",
    name: "Chef Special - Chicken Pocket Kebab",
    desc: "Layered paratha encased like a pocket stuffed with chicken, peppers and onion.",
    price: "£7.90",
    codes: ["G"]
  },
  {
    category: "Non-Veg Starters",
    name: "Chicken Lolipop (4pc)",
    desc: "Deep fried chicken wings lollipop.",
    price: "£7.90",
    codes: []
  },
  {
    category: "Non-Veg Starters",
    name: "Chilli Chicken",
    desc: "Chicken tossed with chilli, mix pepper and soy sauce.",
    price: "£7.50",
    codes: ["G"]
  },
  {
    category: "Non-Veg Starters",
    name: "Chicken 65",
    desc: "Tender Boneless Chicken, marinated in yoghurt, curry leaf, Indian spices",
    price: "£7.50",
    codes: []
  },
  {
    category: "Non-Veg Starters",
    name: "Lamb Seekh Kebab (3pc)",
    desc: "Juicy minced lamb kebabs grilled with aromatic spices, herbs, and smoky charcoal flavour.",
    price: "£7.90",
    codes: []
  },
  {
    category: "Non-Veg Starters",
    name: "Patiyala Lamb Chop (3pc)",
    desc: "Grilled lamb chops marinated with Kashmiri chilli and aromatic spices.",
    price: "£8.90",
    codes: ["D"]
  },
  {
    category: "Non-Veg Starters",
    name: "Chilli Squid",
    desc: "Marinated squid deep fried and tossed in the pan with Indian spices and garnish.",
    price: "£8.90",
    codes: ["F"]
  },
  {
    category: "Non-Veg Starters",
    name: "Amritsari Fish",
    desc: "Punjabi-style crispy-fried fish marinated in carom, gram flour & spice",
    price: "£8.90",
    codes: ["D","F"]
  },
  {
    category: "Non-Veg Starters",
    name: "Dakshini Prawns (5pc)",
    desc: "Spicy & crispy-fried prawns with curry leaf, lemon and chilli",
    price: "£8.90",
    codes: ["P"]
  },
  {
    category: "Veg Curries",
    name: "Saag Paneer/Aloo",
    desc: "Indian cottage cheese cooked in garlicky spinach finish with cream.",
    price: "£8.90",
    codes: ["D"]
  },
  {
    category: "Veg Curries",
    name: "Paneer Butter Masala",
    desc: "Cottage cheese with dried fenugreek finished with cream.",
    price: "£8.90",
    codes: ["D"]
  },
  {
    category: "Veg Curries",
    name: "Kadai Paneer",
    desc: "Cottage cheese with mix peppers and tomato onion sauce.",
    price: "£8.90",
    codes: ["D"]
  },
  {
    category: "Veg Curries",
    name: "Bhindi Masala",
    desc: "Okra tossed with onion and tomato gravy.",
    price: "£8.90",
    codes: ["D"]
  },
  {
    category: "Veg Curries",
    name: "Dal Makhani",
    desc: "Slow cooked black lentils in a rich creamy spicy sauce.",
    price: "£7.50",
    codes: ["D"]
  },
  {
    category: "Veg Curries",
    name: "Channa Masala",
    desc: "Authentic chickpea curry with bold spices.",
    price: "£7.50",
    codes: ["D"]
  },
  {
    category: "Veg Curries",
    name: "Tadka Dal",
    desc: "Yellow lentis infused with aromatic spices and a sizzling ghee tadka",
    price: "£7.00",
    codes: ["D"]
  },
  {
    category: "Non-Veg Curries",
    name: "Butter Chicken",
    desc: "Classic butter chicken with tomato, dried fenugreek finished with cream.",
    price: "£9.50",
    codes: ["D"]
  },
  {
    category: "Non-Veg Curries",
    name: "Grandmas Chicken Curry",
    desc: "Chicken morsels braised in aromatic home style gravy.",
    price: "£9.50",
    codes: []
  },
  {
    category: "Non-Veg Curries",
    name: "Madras Chicken Curry",
    desc: "Spicy authentic Indian curry with tender chicken cooked with bold madras spices.",
    price: "£9.50",
    codes: ["D"]
  },
  {
    category: "Non-Veg Curries",
    name: "Madras Lamb Curry",
    desc: "Spicy authentic Indian curry with tender lamb cooked with bold madras spices.",
    price: "£10.50",
    codes: ["D"]
  },
  {
    category: "Non-Veg Curries",
    name: "Railway Lamb Curry",
    desc: "Classic railway of colonial, a mildly spiced, tangy lamb and potato curry",
    price: "£10.50",
    codes: []
  },
  {
    category: "Non-Veg Curries",
    name: "Fish Moilee",
    desc: "Fish simmered in onion, ginger, coconut and curry leaf sauce.",
    price: "£10.50",
    codes: ["D","F"]
  },
  {
    category: "Non-Veg Curries",
    name: "Prawn Moilee",
    desc: "Fish simmered in onion, ginger, coconut and curry leaf sauce",
    price: "£10.50",
    codes: ["D","P"]
  },
  {
    category: "Combo Meals",
    name: "Chicken Combo",
    desc: "Chicken Dum Biryani, Chicken Lollipop (2pcs), Chilli Chicken, Raita, Chips, Soft Drink",
    price: "£16.90",
    codes: ["D","S"]
  },
  {
    category: "Combo Meals",
    name: "Veg Combo",
    desc: "Veg Biryani, Paneer Tikka (2pcs), Chilli Paneer, Raita, Chips, Soft Drink",
    price: "£15.90",
    codes: ["D","S"]
  },
  {
    category: "Combo Meals",
    name: "Seafood Combo",
    desc: "Prawns Biryani, Amritsari Fish (4pcs), Dakeshni Prawn (3pcs), Raita, Chips, Soft Drink",
    price: "£18.90",
    codes: ["D","F","P"]
  },
  {
    category: "Tandoori Khazana",
    name: "Mixed Grill",
    desc: "1 tandoori chicken pc, 2 Punjabi chicken tikka, 2 Malai chicken tikka, 3 chicken wings, 2 lamb seekh kebab-complimentary butter naan.",
    price: "£18.90",
    codes: ["D"]
  },
  {
    category: "Tandoori Khazana",
    name: "Achari Paneer Tikka (4pc)",
    desc: "Cottage cheese marinated with pickling spices in a yoghurt cooked in tandoor",
    price: "£7.50",
    codes: ["D"]
  },
  {
    category: "Tandoori Khazana",
    name: "Malai Chicken Tikka (4pc)",
    desc: "Grilled chicken marinated in yoghurt, cream, cheese cardamom and Indian spices",
    price: "£6.90",
    codes: ["D"]
  },
  {
    category: "Tandoori Khazana",
    name: "Punjabi Chicken Tikka (4pc)",
    desc: "Grilled chicken marinated in Kashmiri chilli, yoghurt and spices.",
    price: "£6.90",
    codes: ["D"]
  },
  {
    category: "Tandoori Khazana",
    name: "Tandoori Chicken Wings (6pc)",
    desc: "Chilli coated chicken wings grilled in tandoor.",
    price: "£7.90",
    codes: ["D"]
  },
  {
    category: "Tandoori Khazana",
    name: "Tandoori Chicken (Half)",
    desc: "Tandoor-marinated spring chicken.",
    price: "£8.50",
    codes: ["D"]
  },
  {
    category: "Tandoori Khazana",
    name: "Tandoori Chicken (Full)",
    desc: "Tandoor-marinated spring chicken.",
    price: "£14.50",
    codes: ["D"]
  },
  {
    category: "Biryanis",
    name: "Kathal and Paneer Biryani",
    desc: "Spice infused basmati with fragrant jackfruit, paneer and raita.",
    price: "£9.00",
    codes: ["D"]
  },
  {
    category: "Biryanis",
    name: "Chicken Dum Biryani",
    desc: "Basmati rice slow-cooked with tender chicken and spices, served with raita",
    price: "£10.50",
    codes: ["D"]
  },
  {
    category: "Biryanis",
    name: "Chicken Tikka Biryani",
    desc: "Spice infused basmati with fragrant chicken and raita.",
    price: "£10.00",
    codes: ["D"]
  },
  {
    category: "Biryanis",
    name: "Lamb Biryani",
    desc: "Spice infused basmati with fragrant lamb and raita.",
    price: "£11.00",
    codes: ["D"]
  },
  {
    category: "Biryanis",
    name: "Prawn Biryani",
    desc: "Spice infused basmati with fragrant prawn and raita",
    price: "£12.50",
    codes: ["D"]
  },
  {
    category: "Sides",
    name: "Noodles (Chicken)",
    desc: "Wok tossed noodles with tender chicken.",
    price: "£7.90",
    codes: ["G","S"]
  },
  {
    category: "Sides",
    name: "Noodles (Veg)",
    desc: "Wok tossed noodles with assorted vegetables.",
    price: "£7.90",
    codes: ["G","S"]
  },
  {
    category: "Sides",
    name: "Aloo Jeera",
    desc: "Boiled baby potatoes tossed in aromatic spices.",
    price: "£6.50",
    codes: ["D"]
  },
  {
    category: "Sides",
    name: "Steam Rice",
    desc: "Steam plain long grain basmati rice.",
    price: "£3.90",
    codes: []
  },
  {
    category: "Sides",
    name: "Pilau Rice",
    desc: "Basmati rice tempered with cumin seed.",
    price: "£3.90",
    codes: []
  },
  {
    category: "Sides",
    name: "Special TOB Salad",
    desc: "Onion, tomato, cucumber, coriander & roasted cumin",
    price: "£3.50",
    codes: []
  },
  {
    category: "Sides",
    name: "Raita",
    desc: "Natural yoghurt with cucumber and roasted cumin.",
    price: "£2.90",
    codes: ["D"]
  },
  {
    category: "Tandoor Breads",
    name: "Tandoori Roti",
    desc: "Whole wheat unleavened bread",
    price: "£2.50",
    codes: ["G"]
  },
  {
    category: "Tandoor Breads",
    name: "Plain Naan",
    desc: "Leavened, white flour flatbread baked in clay oven.",
    price: "£3.00",
    codes: ["G"]
  },
  {
    category: "Tandoor Breads",
    name: "Butter Naan",
    desc: "Unleavened bread with butter",
    price: "£3.00",
    codes: ["D","G"]
  },
  {
    category: "Tandoor Breads",
    name: "Cheese Naan",
    desc: "Unleavened bread with cheese.",
    price: "£3.50",
    codes: ["D","G"]
  },
  {
    category: "Tandoor Breads",
    name: "Chilli Naan",
    desc: "Leavened bread with chilli.",
    price: "£3.50",
    codes: ["D","G"]
  },
  {
    category: "Tandoor Breads",
    name: "Garlic Naan",
    desc: "Leavened bread with garlic.",
    price: "£3.50",
    codes: ["D","G"]
  },
  {
    category: "Tandoor Breads",
    name: "Chilli Cheese Naan",
    desc: "Leavened bread with cheese and chilli",
    price: "£3.90",
    codes: ["D","G"]
  },
  {
    category: "Tandoor Breads",
    name: "Lacchedar Paratha",
    desc: "A traditional whole wheat flaky layered bread",
    price: "£3.50",
    codes: ["D","G"]
  },
  {
    category: "Tandoor Breads",
    name: "Keema Naan",
    desc: "Indian spiced minced lamb stuffed in naan.",
    price: "£3.90",
    codes: ["D","G"]
  },
  {
    category: "Tandoor Breads",
    name: "Aloo Paratha",
    desc: "All-time favourite stuffed with potato filling.",
    price: "£3.90",
    codes: ["D","G"]
  },
  {
    category: "Tandoor Breads",
    name: "Peshwari Naan",
    desc: "Leavened bread, stuffed with mix of nuts, raisins, desiccated coconut",
    price: "£3.90",
    codes: ["D","N","G"]
  },
  {
    category: "Desserts",
    name: "Tandoori Pineapple",
    desc: "With vanilla ice cream",
    price: "£5.00",
    codes: []
  },
  {
    category: "Desserts",
    name: "Gulab Jamun",
    desc: "",
    price: "£4.00",
    codes: []
  },
  {
    category: "Desserts",
    name: "Gajar Halwa",
    desc: "",
    price: "£4.00",
    codes: []
  },
  {
    category: "Desserts",
    name: "Rasmalai",
    desc: "",
    price: "£4.00",
    codes: []
  },
  {
    category: "Children's Menu",
    name: "Chips",
    desc: "",
    price: "£2.90",
    codes: []
  },
  {
    category: "Children's Menu",
    name: "Chicken Nuggets",
    desc: "",
    price: "£3.90",
    codes: []
  },
  {
    category: "Children's Menu",
    name: "Fish Finger",
    desc: "",
    price: "£3.90",
    codes: []
  },
  // ... (keep your existing menu items above)

  // --- WEEKEND SPECIALS: BIRYANI ---
  {
    category: "Weekend Lunch (Sat-Sun 12-3pm)",
    name: "Chef Special - Chicken Biryani Combo",
    desc: "Served with Papad, Salad, and choice of Raita OR Veg Curry.",
    price: "£7.50",
    codes: []
  },
  {
    category: "Weekend Lunch (Sat-Sun 12-3pm)",
    name: "Chef Special - Veg Biryani Combo",
    desc: "Served with Papad, Salad, and choice of Raita OR Veg Curry.",
    price: "£6.50",
    codes: ["V"]
  },

  // --- WEEKEND SPECIALS: THALIS ---
  {
    category: "Weekend Thalis (Sat-Sun 12-3pm)",
    name: "Veg Thali",
    desc: "Main: Chilli Paneer, Paneer Butter Masala, Bhindi Masala, Dal Tadka. Sides: Pickle, Papad, Salad, Gulab Jamun + Choice of Rice & Naan.",
    price: "£10.99",
    codes: ["V"]
  },
  {
    category: "Weekend Thalis (Sat-Sun 12-3pm)",
    name: "Non-Veg Thali",
    desc: "Main: Chicken 65, Chicken Curry, Lamb Curry, Dal Tadka. Sides: Pickle, Papad, Salad, Gulab Jamun + Choice of Rice & Naan.",
    price: "£12.99",
    codes: []
  },
  {
    category: "Weekend Thalis (Sat-Sun 12-3pm)",
    name: "Seafood Thali",
    desc: "Main: Chilli Squid, Prawn Curry, Fish Moilee, Dal Tadka. Sides: Pickle, Papad, Salad, Gulab Jamun + Choice of Rice & Naan.",
    price: "£13.99",
    codes: ["F", "P"]
  }
];