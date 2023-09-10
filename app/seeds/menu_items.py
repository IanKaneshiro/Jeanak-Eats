from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text


def seed_menu_items():
    mcchicken = MenuItem(
        restaurant_id=1,
        name="McChicken",
        description="Savor the satisfying crunch of our juicy chicken patty, topped with shredded lettuce and just the right amount of creamy mayonnaise, all served on a perfectly toasted bun.",
        price=3.50,
        category="Chicken and Fish Sandwiches",
        image_url="https://s7d1.scene7.com/is/image/mcdonalds/DC_201909_4314_McChicken_832x472:product-header-desktop?wid=830&hei=458&dpr=off"
    )

    big_mac = MenuItem(
        restaurant_id=1,
        name="Big Mac",
        description="Sink your teeth into our iconic Big Mac, featuring two all-beef patties, special sauce, lettuce, cheese, pickles, onions, and a sesame seed bun.",
        price=4.99,
        category="Burgers",
        image_url="https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0005_BigMac_832x472:1-4-product-tile-desktop"
    )

    fries = MenuItem(
        restaurant_id=1,
        name="French Fries",
        description="Enjoy our crispy and golden French fries, perfect as a side or snack.",
        price=2.00,
        category="Sides",
        image_url=" https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_8932_MediumFries_832x472:product-header-desktop?wid=830&hei=458&dpr=off"
    )

    apple_pie = MenuItem(
        restaurant_id=1,
        name="Apple Pie",
        description="Indulge in the warm and flaky goodness of our apple pie, filled with delicious apple filling.",
        price=1.49,
        category="Desserts",
        image_url=" https://s7d1.scene7.com/is/image/mcdonalds/DC_202004_0706_BakedApplePie_Broken_832x472:product-header-desktop?wid=830&hei=458&dpr=off"
    )

    whopper = MenuItem(
        restaurant_id=2,
        name="Whopper",
        description="Our flame-grilled Whopper sandwich features a quarter-pound of savory flame-grilled beef, topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.",
        price=4.79,
        category="Burgers",
        image_url=" https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=150&q=80&fit=max&auto=format"
    )

    chicken_fries = MenuItem(
        restaurant_id=2,
        name="Chicken Fries",
        description="Enjoy our crispy and flavorful chicken fries, perfect as a snack or side.",
        price=2.49,
        category="Chicken",
        image_url="https://cdn.sanity.io/images/czqk28jt/prod_bk_us/8c615844ecb447c71310a14c2d449d56ff213b33-1333x1333.png?w=150&q=80&fit=max&auto=format"
    )

    onion_rings = MenuItem(
        restaurant_id=2,
        name="Onion Rings",
        description="Satisfy your craving for something crispy with our delicious onion rings.",
        price=2.29,
        category="Sides",
        image_url="https://cdn.sanity.io/images/czqk28jt/prod_bk_us/2f1f1c87c082b18cee83d286921162a24dc869bd-1333x1333.png?w=150&q=80&fit=max&auto=format"
    )

    soft_serve_ice_cream = MenuItem(
        restaurant_id=2,
        name="Soft Serve Ice Cream",
        description="Indulge in the sweet delight of our soft serve ice cream, available in vanilla and chocolate.",
        price=1.00,
        category="Desserts",
        image_url=" https://cdn.sanity.io/images/czqk28jt/prod_bk_us/4498579d52cbd5d5b381bfda0f914a585c0da77a-1333x1333.png?w=150&q=80&fit=max&auto=format"
    )
    burrito = MenuItem(
        restaurant_id=4,
        name="Burrito",
        description="Try our hearty burrito, filled with your choice of meat, rice, beans, salsa, and more.",
        price=8.99,
        category="Burritos",
        image_url="https://t3.ftcdn.net/jpg/02/05/04/02/360_F_205040245_k37GsQhvSg0yhM5zmqf3NWDtACBgCEpm.jpg"
    )

    taco_plate = MenuItem(
        restaurant_id=4,
        name="Taco Plate",
        description="Indulge in our flavorful taco plate, featuring your choice of tacos served with rice and beans.",
        price=10.50,
        category="Tacos",
        image_url="https://amandascookin.com/wp-content/uploads/2019/06/chicken-tacos-680-500x500.jpg"
    )

    guacamole = MenuItem(
        restaurant_id=4,
        name="Guacamole",
        description="Enjoy our fresh and creamy guacamole, made from ripe avocados and seasoned to perfection.",
        price=5.50,
        category="Appetizers",
        image_url="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/4/19/0/KC1701_Guacamole_s4x3.jpg.rend.hgtvcom.616.462.suffix/1524173261989.jpeg"
    )

    horchata = MenuItem(
        restaurant_id=4,
        name="Horchata",
        description="Quench your thirst with our refreshing horchata, a sweet and creamy rice-based drink.",
        price=3.00,
        category="Beverages",
        image_url="https://www.halfbakedharvest.com/wp-content/uploads/2020/03/Dirty-Horchata-1.jpg"
    )

    ribeye_steak = MenuItem(
        restaurant_id=5,
        name="Ribeye Steak",
        description="Savor the rich flavor and tenderness of our prime ribeye steak, cooked to perfection.",
        price=38.99,
        category="Steaks",
        image_url="https://diethood.com/wp-content/uploads/2021/02/ribeye-steak-5.jpg"
    )

    lobster_mashed_potatoes = MenuItem(
        restaurant_id=5,
        name="Lobster Mashed Potatoes",
        description="Indulge in the creamy decadence of our mashed potatoes, infused with chunks of succulent lobster meat.",
        price=19.99,
        category="Sides",
        image_url="https://newengland.com/wp-content/uploads/lobster-mashed-potatoes-recipe-1.jpg"
    )

    chocolate_lava_cake = MenuItem(
        restaurant_id=5,
        name="Chocolate Lava Cake",
        description="End your meal on a sweet note with our warm and gooey chocolate lava cake, topped with a scoop of vanilla ice cream.",
        price=9.50,
        category="Desserts",
        image_url="https://www.foodandwine.com/thmb/XdFd-DvTtouryLCjeCqwhfmmK-A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/molten-chocolate-cake-FT-RECIPE0220-0a33d7d0ab0c45588f7bfe742d33a9bc.jpg"
    )

    carne_asada = MenuItem(
        restaurant_id=5,
        name="Carne Asada",
        description="Meat steak",
        price=20.99,
        category="Steaks",
        image_url="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2021/04/Carne-Asada-main.jpg"
    )

    honey_lavender_ice_cream = MenuItem(
        restaurant_id=6,
        name="Honey Lavender Ice Cream",
        description="Experience the delicate and floral notes of our honey lavender ice cream.",
        price=5.00,
        category="Ice Cream Flavors",
        image_url="https://saltandstraw.com/cdn/shop/products/salt-and-straw_honey-lavender_540x.png?v=1580425919"
    )

    cookie_dough_scoop = MenuItem(
        restaurant_id=6,
        name="Cookie Dough Scoop",
        description="Indulge in our classic cookie dough ice cream, loaded with chunks of delicious cookie dough.",
        price=4.50,
        category="Ice Cream Flavors",
        image_url="https://saltandstraw.com/cdn/shop/products/salt-and-straw-salted-malted-chocolate-chip-cookie-dough_175c66f6-32ce-4902-b07b-ef42213d281c_grande.jpg?v=1675284905"
    )

    chocolate_sundae = MenuItem(
        restaurant_id=6,
        name="Chocolate Sundae",
        description="Treat yourself to our chocolate lover's dream sundae, featuring rich chocolate ice cream, hot fudge, whipped cream, and a cherry on top.",
        price=6.50,
        category="Sundaes",
        image_url="https://saltandstraw.com/cdn/shop/products/salt-and-straw_chocolate-gooey-brownie_540x.jpg?v=1580424622"
    )

    strawberry_cheesecake_ice_cream = MenuItem(
        restaurant_id=6,
        name="Pumpkpin Spiced Tiramisu",
        description="A pumpkin spiced vibe that's richer and more vibrant than anything you've tasted.",
        price=5.50,
        category="Ice Cream Flavors",
        image_url="https://saltandstraw.com/cdn/shop/files/CO-PROJ-SALTSTRAW-SEP23-TIRAMISU-SCOOP-023_5591bd99-fa8b-4870-addc-2b4a6312af0d.png?v=1693518379&width=400"
    )

    classic_burger = MenuItem(
        restaurant_id=7,
        name="Classic Burger",
        description="Satisfy your burger cravings with our classic beef patty, lettuce, tomato, onions, pickles, and special sauce on a toasted bun.",
        price=12.99,
        category="Burgers",
        image_url="https://www.thewholesomedish.com/wp-content/uploads/2019/04/The-Best-Classic-Hamburgers-550.jpg"
    )

    chicken_caesar_salad = MenuItem(
        restaurant_id=7,
        name="Chicken Caesar Salad",
        description="Enjoy a fresh and flavorful Caesar salad topped with grilled chicken breast, croutons, and our house-made Caesar dressing.",
        price=14.50,
        category="Salads",
        image_url="https://s23209.pcdn.co/wp-content/uploads/2023/01/220905_DD_Chx-Caesar-Salad_051.jpg"
    )

    new_york_cheesecake = MenuItem(
        restaurant_id=7,
        name="New York Cheesecake",
        description="Indulge in a slice of our rich and creamy New York-style cheesecake, topped with your choice of fruit topping.",
        price=7.99,
        category="Desserts",
        image_url="https://www.onceuponachef.com/images/2017/12/cheesecake.jpg"
    )

    pasta_primavera = MenuItem(
        restaurant_id=7,
        name="Pasta Primavera",
        description="Enjoy a delightful pasta primavera, featuring a medley of fresh vegetables sautéed in garlic and olive oil, served over your choice of pasta.",
        price=16.99,
        category="Pasta",
        image_url="https://www.cookingclassy.com/wp-content/uploads/2018/09/pasta-primavera-2.jpg"
    )

    shawarma_plate = MenuItem(
        restaurant_id=8,
        name="Shawarma Plate",
        description="Delight in our flavorful shawarma plate, featuring tender slices of marinated meat, rice, hummus, and pita bread.",
        price=15.99,
        category="Plates",
        image_url="https://www.pipercooks.com/wp-content/uploads/2022/07/chicken-shawarma-plate-10.jpg"
    )

    falafel_wrap = MenuItem(
        restaurant_id=8,
        name="Falafel Wrap",
        description="Enjoy our crispy falafel wrapped in warm pita bread, with fresh vegetables and tahini sauce.",
        price=8.50,
        category="Wraps",
        image_url="https://pickyeaterblog.com/wp-content/uploads/2022/11/healthy-falafel-wrap-recipe.jpg"
    )

    baklava = MenuItem(
        restaurant_id=8,
        name="Baklava",
        description="Indulge in the sweet and flaky layers of our baklava, made with honey, nuts, and phyllo dough.",
        price=4.99,
        category="Desserts",
        image_url="https://www.simplyrecipes.com/thmb/3S8HtOSKvpoQmw4wgo5yCW2qjVE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Baklava-LEAD-11-b2a228e6db9f43d697ae3aed378d0b2a.jpg"
    )

    vegan_moussaka = MenuItem(
        restaurant_id=8,
        name="Vegan Moussaka",
        description="Savor the layers of roasted eggplant, potatoes, and spiced vegan ground meat, topped with creamy béchamel sauce, baked to perfection.",
        price=14.50,
        category="Vegan Specialties",
        image_url="https://minimalistbaker.com/wp-content/uploads/2020/12/Easy-Vegan-Moussaka-SQUARE.jpg"
    )
    shackburger = MenuItem(
        restaurant_id=9,
        name="ShackBurger",
        description="Angus beef cheeseburger with lettuce, tomato, and ShackSauce on a toasted potato bun (contains sesame, eggs, milk, soy, wheat, and gluten)",
        price=7.19,
        category="Burgers",
        image_url="https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Burgers_ShackBurger_1500x920_lg1663589553.jpeg"
    )
    golden_state_double = MenuItem(
        restaurant_id=9,
        name="Golden State Double",
        description="Richards Grassfed Beef double cheddar cheeseburger topped with pickles and smoked garlic aioli (contains sesame, milk, wheat, egg, and gluten)",
        price=12.29,
        category="Burgers",
        image_url="https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Burgers_GoldenStateDouble_1500x920_lg1663590761.jpeg"
    )
    avocado_bacon_burger = MenuItem(
        restaurant_id=9,
        name="Avocado Bacon Burger",
        description="Angus beef cheeseburger topped with freshly sliced avocado, applewood-smoked bacon, and ShackSauce on a toasted potato bun (contains sesame, eggs, milk, soy, wheat, and gluten)",
        price=10.09,
        category="Burgers",
        image_url="https://d2luv1saso99wi.cloudfront.net/2023-06_SHA_Avocado-Bacon_Digital-Menu_1500x920_Burger_lg1689678265.jpeg"
    )
    smoke_shack = MenuItem(
        restaurant_id=9,
        name="SmokeShack",
        description="Angus beef cheeseburger with applewood-smoked bacon, chopped cherry peppers, and ShackSauce on a toasted potato bun (contains sesame, milk, wheat, egg, soy, and gluten)",
        price=11.59,
        category="Burger",
        image_url="https://d2luv1saso99wi.cloudfront.net/2023-05_DoubleSmokeshack_Digital-Product-Image_1500x920_lg1684761804.jpeg"
    )
    shakeshack_fries = MenuItem(
        restaurant_id=9,
        name="Fries",
        description="Crispy crinkle cut fries (contains soy)",
        price=4.09,
        category="Sides",
        image_url="https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_CrinkleCutFries_Fries_1500x920_lg1663591933.jpeg"
    )
    shakeshack_cheese_fries = MenuItem(
        restaurant_id=9,
        name="Cheese Fries",
        description="Crispy crinkle cuts topped with our cheese sauce (contains soy and milk)",
        price=5.09,
        category="Sides",
        image_url="https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_CrinkleCutFries_CheeseFries_1500x920_lg1663591946.jpeg"
    )
    shakeshack_blackandwhite_shake = MenuItem(
        restaurant_id=9,
        name="Black and White Shake",
        description="Chocolate fudge sauce hand spun with our house-made vanilla frozen custard (contains milk and egg)",
        price=5.99,
        category="Shakes",
        image_url="https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Shakes_BlackAndWhite_1500x920_lg1689592733.jpeg"
    )
    shakeshack_strawberry_shake = MenuItem(
        restaurant_id=9,
        name="Strawberry Shake",
        description="Real strawberry hand spun with our house-made vanilla frozen custard (contains milk and egg)",
        price=5.99,
        category="Shakes",
        image_url="https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Shakes_Strawberry_1500x920_lg1689592721.jpeg"
    )
    shakeshack_vanilla_shake = MenuItem(
        restaurant_id=9,
        name="Vanilla Shake",
        description="House-made vanilla frozen custard with real vanilla (contains milk and egg)",
        price=5.99,
        category="Shakes",
        image_url="https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Shakes_Vanilla_1500x920_lg1689592781.jpeg"
    )
    shakeshack_chocolate_shake = MenuItem(
        restaurant_id=9,
        name="Chocolate Shake",
        description="House-made chocolate frozen custard (contains milk and egg)",
        price=5.99,
        category="Shakes",
        image_url="https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Shakes_Chocolate_1500x920_lg1689592744.jpeg"
    )
    blondies_garlicchicken_pizza = MenuItem(
        restaurant_id=10,
        name="Garlic Chicken Pizza",
        description="Garlic sauce, grilled chicken, red bell pepper, fresh basil and roasted garlic.",
        price=15.95,
        category="Pizza",
        image_url="https://blondiespizza.com/wp-content/uploads/2020/11/WhatsApp-Image-2022-07-01-at-7.39.39-PM.jpeg"
    )
    blondies_magicmushroom_pizza = MenuItem(
        restaurant_id=10,
        name="Magic Mushroom Pizza",
        description="Garlic Sauce, Portobello, crimini, shiitake, white button mushrooms , sun-dried tomatoes and black olives.",
        price=15.95,
        category="Pizza",
        image_url="https://blondiespizza.com/wp-content/uploads/2020/11/WhatsApp-Image-2022-07-01-at-7.40.28-PM-1.jpeg"
    )
    blondies_cheese_pizza = MenuItem(
        restaurant_id=10,
        name="Cheese Pizza",
        description="Classic Cheese Pizza with Blondies four cheese blend. Mozzarella, cheddar, provolone, parmesan.",
        price=9.95,
        category="Pizza",
        image_url="https://blondiespizza.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-27-at-9.00.45-PM.jpeg"
    )
    blondies_tomandart_pizza = MenuItem(
        restaurant_id=10,
        name="Tom and Art Pizza",
        description="Pesto sauce, tomato, mushroom, and artichoke hearts.",
        price=15.95,
        category="Pizza",
        image_url="https://blondiespizza.com/wp-content/uploads/2020/11/WhatsApp-Image-2022-07-01-at-7.38.22-PM.jpeg"
    )
    blondies_pepperoni_pizza = MenuItem(
        restaurant_id=10,
        name="Pepperoni Pizza",
        description="One hundred percent all beef Pepperoni.",
        price=12.95,
        category="Pizza",
        image_url="https://blondiespizza.com/wp-content/uploads/2020/11/WhatsApp-Image-2022-07-01-at-7.40.13-PM.jpeg"
    )
    blondies_sixcheese_pizza = MenuItem(
        restaurant_id=10,
        name="Six Cheese Pizza",
        description="Pesto sauce, tomatoes, roasted garlic, mozzarella, cheddar, provolone, parmesan, feta, and chevre cheese.",
        price=15.95,
        category="Pizza",
        image_url="https://blondiespizza.com/wp-content/uploads/2020/11/WhatsApp-Image-2022-07-01-at-7.39.59-PM.jpeg"
    )
    blondies_hawaiian_pizza = MenuItem(
        restaurant_id=10,
        name="Hawaiian Pizza",
        description="Tomato Sauce, Pineapple and Ham.",
        price=15.95,
        category="Pizza",
        image_url="https://blondiespizza.com/wp-content/uploads/2020/11/WhatsApp-Image-2022-07-01-at-7.39.22-PM.jpeg"
    )
    blondies_pestochicken_pizza = MenuItem(
        restaurant_id=10,
        name="Pesto Chicken Pizza",
        description="Pesto sauce, mushrooms, onions, tomatoes, green bell pepper and grilled chicken.",
        price=15.95,
        category="Pizza",
        image_url="https://blondiespizza.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-01-at-7.40.41-PM-1.jpeg"
    )
    llhawaiian_bbqchicken = MenuItem(
        restaurant_id=11,
        name="Barbecue Chicken",
        description="Grilled boneless chicken marinated in our tangy, Hawaii-inspired barbecue sauce.",
        price=14.60,
        category="Chicken",
        image_url="https://images.prismic.io/hawaiianbarbecue/82d3adfc-7637-4775-95d2-7987179d73f1_BBQ_Chicken-optimized.png?auto=compress%2Cformat&fit=max&w=500&h=388&fm=webp"
    )
    llhawaiian_bbqbeef_bowl = MenuItem(
        restaurant_id=11,
        name="BBQ Beef Bowl",
        description="L&L's tantalizing barbecue beef served with steamed vegetables on a bed of rice.",
        price=14.60,
        category="Beef",
        image_url="https://images.prismic.io/hawaiianbarbecue/8eca44a9-20a7-450e-b8ca-f9471fb8e334_BBQ_Beef_Bowl-optimized.png?auto=compress%2Cformat&fit=max&w=500&h=388&fm=webp"
    )
    llhawaiian_chickenkatsu = MenuItem(
        restaurant_id=11,
        name="Chicken Katsu",
        description="Tender pieces of deep-fried boneless chicken, this best-seller is served with our piquant katsu sauce.",
        price=13.60,
        category="Chicken",
        image_url="https://images.prismic.io/hawaiianbarbecue/91ce129b-21cc-4c8f-b015-2f2eac96e875_Chicken_Katsu-optimized.png?auto=compress%2Cformat&fit=max&w=500&h=388&fm=webp"
    )
    llhawaiian_kaluapork = MenuItem(
        restaurant_id=11,
        name="Kalua Pork with Cabbage",
        description="Smoke-flavored, slowly-roasted shredded pork, combined with fresh cabbage.",
        price=16.80,
        category="Pork",
        image_url="https://images.prismic.io/hawaiianbarbecue/02c2abca-f9d9-4b2c-8c3d-e3bd14271b28_Kalua_Pork_and_Cabbage-optimized.png?auto=compress%2Cformat&fit=max&w=500&h=388&fm=webp"
    )
    llhawaiian_locomoco = MenuItem(
        restaurant_id=11,
        name="Loco Moco",
        description="Savory hamburger patties over rice, topped with brown gravy and 2 fresh fried eggs.",
        price=15.80,
        category="Beef",
        image_url="https://images.prismic.io/hawaiianbarbecue/8540b0dc-0f63-408c-bfba-eeb26399c374_Loco_Moco-optimized.png?auto=compress%2Cformat&fit=max&w=500&h=388&fm=webp"
    )
    llhawaiian_spammusubi = MenuItem(
        restaurant_id=11,
        name="Spam Musubi",
        description="An island classic composed of a slice of grilled SPAM on rice, wrapped in dried seaweed.",
        price=10.30,
        category="Specialty",
        image_url="https://images.prismic.io/hawaiianbarbecue/39e43164-e9ed-46b0-868c-7c0262f14501_Musubi_Options-optimized.png?auto=compress%2Cformat&fit=max&w=500&h=388&fm=webp"
    )
    llhawaiian_spamsaimin = MenuItem(
        restaurant_id=11,
        name="Spam Saimin",
        description="Noodle soup unique to Hawaii, served with SPAM and fresh green onion.",
        price=11.30,
        category="Specialty",
        image_url="https://images.prismic.io/hawaiianbarbecue/82732013-21b5-4ceb-9847-0de84f25645a_SPAM_Saimin-optimized.png?auto=compress%2Cformat&fit=max&w=500&h=388&fm=webp"
    )
    enssaro_ethiopiannacho = MenuItem(
        restaurant_id=12,
        name="Ethiopian Nachos",
        description="Ethiopian-style fried potato chips with house made salsa and Ethiopian hummus.",
        price=14.00,
        category="Appetizers",
        image_url="https://images.squarespace-cdn.com/content/v1/5de846a28fe9df1841137623/1581808112058-2Y35HVPQKDSPLL1O9UC4/84618654_3739770249374219_6917953159956529152_n.jpg?format=750w"
    )
    enssaro_kitforolls = MenuItem(
        restaurant_id=12,
        name="Kitfo Rolls",
        description="Warm, minced, rare beef tartare rolled with our house-made Injera wrap.",
        price=10.00,
        category="Appetizers",
        image_url="https://www.196flavors.com/wp-content/uploads/2021/04/kitfo-1fp.jpg"
    )
    enssaro_yebegwot = MenuItem(
        restaurant_id=12,
        name="Ye Beg Wot",
        description="Lamb slowly simmered with berbere and a combination of spices.",
        price=19.00,
        category="Comfort Food",
        image_url="https://theethiopianfood.com/wp-content/uploads/2022/12/YeBeg-Wot-Ethiopian-Lamb-Stew-500x375.jpg"
    )
    enssaro_bozenashiro = MenuItem(
        restaurant_id=12,
        name="Bozena Shiro",
        description="A rich and savory stew of Shiro simmered with minced beef, and a combination of Ethiopian spices.",
        price=21.00,
        category="Comfort Food",
        image_url="https://www.wassethiopianrestaurant.com/wp-content/uploads/2021/07/Bozena-Shiro-1080x675.jpg"
    )
    joyride_zoeroni_pizza = MenuItem(
        restaurant_id=13,
        name="Zoe 'Roni Pepperoni",
        description="Pepperoni, mozzarella & brick cheese, topped with parmesan and house marinara",
        price=28.00,
        category="Pizza",
        image_url="https://images.squarespace-cdn.com/content/v1/61099c6efe196b48d9ac54d7/6ab99d93-6ffd-446e-8bc3-7611c9a257d2/W-Zoe+Roni+-+061_Joyride_02102022_paigegreen.jpg?format=1500w"
    )
    joyride_meatzza_pizza = MenuItem(
        restaurant_id=13,
        name="Meatzza",
        description="Italian sausage, bacon, pepperoni, mozzarella & brick cheese, topped with parmesan and house marinara",
        price=31.00,
        category="Pizza",
        image_url="https://images.squarespace-cdn.com/content/v1/61099c6efe196b48d9ac54d7/d4eafa68-6eba-4849-a782-f68628df5e28/W-Meatzza+-+065_Joyride_02102022_paigegreen.jpg?format=1500w"
    )
    joyride_eatyourveggies_pizza = MenuItem(
        restaurant_id=13,
        name="Eat Your Veggies",
        description="Brussels sprouts, crimini mushrooms, black olives, dorati tomatoes, red onion, mozzarella & brick cheese,",
        price=27.00,
        category="Pizza",
        image_url="https://131220777.cdn6.editmysite.com/uploads/1/3/1/2/131220777/s186213969590501822_p878_i4_w1000.jpeg?width=2400&optimize=medium"
    )
    joyride_sweetbianca_pizza = MenuItem(
        restaurant_id=13,
        name="Sweet Bianca",
        description="Taleggio, fig jam, ricotta, mozzarella & brick cheese",
        price=27.00,
        category="Pizza",
        image_url="https://images.squarespace-cdn.com/content/v1/61099c6efe196b48d9ac54d7/453b986c-e366-45b9-8345-0949bd56c8d9/W-Sweet+Bianca+-+050_Joyride_02102022_paigegreen.jpg?format=1500w"
    )
    joyride_buffalochicken_pizza = MenuItem(
        restaurant_id=13,
        name="Buffalo Chicken",
        description="Fire-braised chicken breast, Frank's Red Hot cayenne pepper sauce, red onion, mozzarella & brick cheese",
        price=27.00,
        category="Pizza",
        image_url="https://images.squarespace-cdn.com/content/v1/61099c6efe196b48d9ac54d7/0d6e407a-7ee1-4292-9b04-d2a5e701a5d1/1x1+-+W-Buffalo+Chicken+-+_54A6163_Joyride_08092022_paigegreen+1.jpg?format=1500w"
    )
    joyride_greengoddess_pizza = MenuItem(
        restaurant_id=13,
        name="Green Goddess",
        description="Arugula, ricotta, sweetie drops, pesto, black olives, red onion, cracked black pepper, mozzarella & brick",
        price=26.00,
        category="Pizza",
        image_url="https://images.squarespace-cdn.com/content/v1/61099c6efe196b48d9ac54d7/2c055b4a-2cef-4909-a998-57f36b93ef4a/W-Garden+Goddess+-+056_Joyride_02102022_paigegreen.jpg?format=1500w"
    )
    joyride_oceanbeach_pizza = MenuItem(
        restaurant_id=13,
        name="Ocean Beach",
        description="Clams, Dorati tomatoes, capers, lemon, chili flakes, topped with parsley, parmesan, and chili flakes",
        price=25.00,
        category="Pizza",
        image_url="https://131220777.cdn6.editmysite.com/uploads/1/3/1/2/131220777/s186213969590501822_p1151_i2_w1000.jpeg?dpr=2.5"
    )
    joyride_anchovyumami_pizza = MenuItem(
        restaurant_id=13,
        name="Anchovy Umami",
        description="Anchovies, red onion, jalapenos, crimini mushrooms and topped with parmesan and house marinara.",
        price=24.00,
        category="Pizza",
        image_url="https://131220777.cdn6.editmysite.com/uploads/1/3/1/2/131220777/s186213969590501822_p1152_i1_w2800.jpeg?width=2560&dpr=2.5"
    )

    
    

    db.session.add(mcchicken)
    db.session.add(big_mac)
    db.session.add(fries)
    db.session.add(apple_pie)
    db.session.add(whopper)
    db.session.add(chicken_fries)
    db.session.add(onion_rings)
    db.session.add(soft_serve_ice_cream)
    db.session.add(burrito)
    db.session.add(taco_plate)
    db.session.add(guacamole)
    db.session.add(horchata)
    db.session.add(ribeye_steak)
    db.session.add(lobster_mashed_potatoes)
    db.session.add(chocolate_lava_cake)
    db.session.add(carne_asada)
    db.session.add(honey_lavender_ice_cream)
    db.session.add(cookie_dough_scoop)
    db.session.add(chocolate_sundae)
    db.session.add(strawberry_cheesecake_ice_cream)
    db.session.add(classic_burger)
    db.session.add(chicken_caesar_salad)
    db.session.add(new_york_cheesecake)
    db.session.add(pasta_primavera)
    db.session.add(shawarma_plate)
    db.session.add(falafel_wrap)
    db.session.add(baklava)
    db.session.add(vegan_moussaka)
    db.session.add(shackburger)
    db.session.add(golden_state_double)
    db.session.add(avocado_bacon_burger)
    db.session.add(smoke_shack)
    db.session.add(shakeshack_fries)
    db.session.add(shakeshack_cheese_fries)
    db.session.add(shakeshack_blackandwhite_shake)
    db.session.add(shakeshack_strawberry_shake)
    db.session.add(shakeshack_vanilla_shake)
    db.session.add(shakeshack_chocolate_shake)
    db.session.add(blondies_garlicchicken_pizza)
    db.session.add(blondies_magicmushroom_pizza)
    db.session.add(blondies_cheese_pizza)
    db.session.add(blondies_tomandart_pizza)
    db.session.add(blondies_pepperoni_pizza)
    db.session.add(blondies_sixcheese_pizza)
    db.session.add(blondies_hawaiian_pizza)
    db.session.add(blondies_pestochicken_pizza)
    db.session.add(llhawaiian_bbqchicken)
    db.session.add(llhawaiian_bbqbeef_bowl)
    db.session.add(llhawaiian_chickenkatsu)
    db.session.add(llhawaiian_kaluapork)
    db.session.add(llhawaiian_locomoco)
    db.session.add(llhawaiian_spammusubi)
    db.session.add(llhawaiian_spamsaimin)
    db.session.add(enssaro_ethiopiannacho)
    db.session.add(enssaro_kitforolls)
    db.session.add(enssaro_yebegwot)
    db.session.add(enssaro_bozenashiro)
    db.session.add(joyride_zoeroni_pizza)
    db.session.add(joyride_meatzza_pizza)
    db.session.add(joyride_eatyourveggies_pizza)
    db.session.add(joyride_sweetbianca_pizza)
    db.session.add(joyride_buffalochicken_pizza)
    db.session.add(joyride_greengoddess_pizza)
    db.session.add(joyride_oceanbeach_pizza)
    db.session.add(joyride_anchovyumami_pizza)

    db.session.commit()


def undo_menu_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()
