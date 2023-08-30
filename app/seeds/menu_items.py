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
        image_url="https://popmenucloud.com/cdn-cgi/image/width%3D1920%2Cheight%3D1920%2Cfit%3Dscale-dow[…]ality%3D60/pmcnbstq/05af1d98-fb7f-4d8c-af77-f83476646f8c.jpg"
    )

    taco_plate = MenuItem(
        restaurant_id=4,
        name="Taco Plate",
        description="Indulge in our flavorful taco plate, featuring your choice of tacos served with rice and beans.",
        price=10.50,
        category="Tacos",
        image_url="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-dow[…]ality%3D60/pmcnbstq/50162eb2-d513-4393-9942-3a80b9f87c83.jpg"
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
        name="Strawberry Cheesecake Ice Cream",
        description="Indulge in the creamy goodness of our strawberry cheesecake ice cream, featuring swirls of strawberry and chunks of cheesecake.",
        price=5.50,
        category="Ice Cream Flavors",
        image_url="https://saltandstraw.com/cdn/shop/files/CO-PROJECTS-SALTSTRAW-AUG23-SCOOP-CHPIE-1200_60c89f72-de68-4b66-b235-0c1b5f30a0f2_1000x1000.png?v=1691157790"
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

    db.session.commit()


def undo_menu_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()
