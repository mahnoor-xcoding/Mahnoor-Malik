// ==============================
// TIMEZONE
// MAIN JAVASCRIPT
// ==============================


// ==============================
// CART DATA
// ==============================

let cart =
    JSON.parse(localStorage.getItem("timezoneCart")) || [];


// Make old cart items compatible
cart = cart.map(function (watch) {

    return {

        id: watch.id || Date.now() + Math.random(),

        image: watch.image || "",

        name: watch.name || "Watch",

        price: Number(
            String(watch.price || "0")
                .replace(/[^0-9.]/g, "")
        ),

        quantity: Number(watch.quantity) || 1

    };

});


// ==============================
// SAVE CART
// ==============================

function saveCart() {

    localStorage.setItem(
        "timezoneCart",
        JSON.stringify(cart)
    );

}


// ==============================
// ADD TO CART
// ==============================

const addButtons =
    document.querySelectorAll(".add-cart");


addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const product =
            button.closest(".product-card");


        if (!product) return;


        const image =
            product.querySelector("img");


        const name =
            product.querySelector("h3");


        const priceParagraphs =
            product.querySelectorAll("p");


        let price = 0;


        priceParagraphs.forEach(function (p) {

            if (p.textContent.includes("Price:")) {

                price = Number(
                    p.textContent
                        .replace(/[^0-9.]/g, "")
                );

            }

        });


        const imageSource =
            image
                ? image.getAttribute("src")
                : "";


        const productName =
            name
                ? name.textContent.trim()
                : "Watch";


        // Check if product already exists

        const existingProduct =
            cart.find(function (watch) {

                return (
                    watch.name === productName &&
                    watch.image === imageSource
                );

            });


        if (existingProduct) {

            existingProduct.quantity += 1;

        }
        else {

            cart.push({

                id: Date.now() + Math.random(),

                image: imageSource,

                name: productName,

                price: price,

                quantity: 1

            });

        }


        saveCart();


        button.textContent = "Added ✓";


        setTimeout(function () {

            button.textContent = "Add to Cart";

        }, 1500);

    });

});


// ==============================
// CART PAGE
// ==============================

const cartBox =
    document.querySelector(".cart");


if (cartBox) {

    showCart();

}


// ==============================
// SHOW CART
// ==============================

function showCart() {

    if (!cartBox) return;


    cartBox.innerHTML = "";


    if (cart.length === 0) {

        cartBox.innerHTML = `

            <div class="empty-cart">

                <h2>Your Cart is Empty</h2>

                <p>
                    Add a watch from the Shop.
                </p>

                <a
                    class="shop-btn"
                    href="shop.html">

                    Go To Shop

                </a>

            </div>

        `;


        updateCartSummary();

        return;

    }


    cart.forEach(function (watch) {


        const item =
            document.createElement("div");


        item.className = "cart-item";


        item.innerHTML = `

            <img
                src="${watch.image}"
                alt="${watch.name}"
            >


            <div class="cart-item-info">

                <h3>
                    ${watch.name}
                </h3>


                <p>
                    Price: ${watch.price}
                </p>


                <p>
                    Subtotal:
                    ${watch.price * watch.quantity}
                </p>


                <div class="quantity-box">

                    <button
                        class="quantity-minus"
                        data-id="${watch.id}">

                        −

                    </button>


                    <span>
                        ${watch.quantity}
                    </span>


                    <button
                        class="quantity-plus"
                        data-id="${watch.id}">

                        +

                    </button>

                </div>


                <button
                    class="remove-cart"
                    data-id="${watch.id}">

                    Remove

                </button>

            </div>

        `;


        cartBox.appendChild(item);

    });


    addQuantityButtons();

    addRemoveButtons();

    updateCartSummary();

}


// ==============================
// QUANTITY BUTTONS
// ==============================

function addQuantityButtons() {


    const plusButtons =
        document.querySelectorAll(
            ".quantity-plus"
        );


    const minusButtons =
        document.querySelectorAll(
            ".quantity-minus"
        );


    plusButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const id =
                    Number(button.dataset.id);


                const watch =
                    cart.find(function (item) {

                        return item.id === id;

                    });


                if (watch) {

                    watch.quantity += 1;

                    saveCart();

                    showCart();

                }

            }
        );

    });


    minusButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const id =
                    Number(button.dataset.id);


                const watch =
                    cart.find(function (item) {

                        return item.id === id;

                    });


                if (!watch) return;


                if (watch.quantity > 1) {

                    watch.quantity -= 1;

                }
                else {

                    cart =
                        cart.filter(function (item) {

                            return item.id !== id;

                        });

                }


                saveCart();

                showCart();

            }
        );

    });

}


// ==============================
// REMOVE FROM CART
// ==============================

function addRemoveButtons() {


    const removeButtons =
        document.querySelectorAll(
            ".remove-cart"
        );


    removeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const id =
                    Number(button.dataset.id);


                cart =
                    cart.filter(function (watch) {

                        return watch.id !== id;

                    });


                saveCart();

                showCart();

            }
        );

    });

}


// ==============================
// CART SUMMARY
// ==============================

function updateCartSummary() {


    const totalItems =
        document.querySelector("#total-items");


    const totalPrice =
        document.querySelector("#total-price");


    if (!totalItems || !totalPrice) return;


    let itemCount = 0;

    let priceTotal = 0;


    cart.forEach(function (watch) {

        itemCount += watch.quantity;

        priceTotal +=
            watch.price * watch.quantity;

    });


    totalItems.textContent =
        itemCount;


    totalPrice.textContent =
        priceTotal;

}


// ==============================
// CLEAR CART
// ==============================

const clearCartButton =
    document.querySelector("#clear-cart");


if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        function () {


            if (cart.length === 0) {

                return;

            }


            const confirmClear =
                confirm(
                    "Are you sure you want to clear the cart?"
                );


            if (!confirmClear) return;


            cart = [];


            saveCart();

            showCart();

        }
    );

}


// ==============================
// SHOP NOW
// ==============================

const shopNowButtons =
    document.querySelectorAll(".shop-now");


shopNowButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const product =
                button.closest(".product-card");


            if (!product) return;


            const addButton =
                product.querySelector(".add-cart");


            if (addButton) {

                addButton.click();

            }


            setTimeout(function () {

                window.location.href =
                    "cart.html";

            }, 300);

        }
    );

});


// ==============================
// SHOP SEARCH
// ==============================

const shopSearch =
    document.querySelector("#shop-search");


const shopSearchButton =
    document.querySelector("#shop-search-button");


function performShopSearch() {


    if (!shopSearch) return;


    const search =
        shopSearch.value
            .trim()
            .toLowerCase();


    filterProducts(
        search,
        "All"
    );

}


if (shopSearchButton) {

    shopSearchButton.addEventListener(
        "click",
        performShopSearch
    );

}


if (shopSearch) {

    shopSearch.addEventListener(
        "input",
        performShopSearch
    );

}


// ==============================
// CATEGORY FILTER
// ==============================

const filterButtons =
    document.querySelectorAll(
        "[data-filter]"
    );


filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const category =
                button.dataset.filter;


            const search =
                shopSearch
                    ? shopSearch.value
                        .trim()
                        .toLowerCase()
                    : "";


            filterProducts(
                search,
                category
            );

        }
    );

});


// ==============================
// FILTER PRODUCTS
// ==============================

function filterProducts(
    search,
    category
) {


    const sections =
        document.querySelectorAll(
            ".products"
        );


    const noProducts =
        document.querySelector(
            "#no-products"
        );


    let found = false;


    sections.forEach(function (section) {


        const sectionCategory =
            section.dataset.category;


        if (
            category !== "All" &&
            sectionCategory !== category
        ) {

            section.style.display =
                "none";

            return;

        }


        const products =
            section.querySelectorAll(
                ".product-card"
            );


        let sectionHasProduct =
            false;


        products.forEach(function (product) {


            const productText =
                product.textContent
                    .toLowerCase();


            if (
                search === "" ||
                productText.includes(search)
            ) {

                product.style.display =
                    "inline-block";

                sectionHasProduct =
                    true;

                found = true;

            }
            else {

                product.style.display =
                    "none";

            }

        });


        if (sectionHasProduct) {

            section.style.display =
                "block";

        }
        else {

            section.style.display =
                "none";

        }

    });


    if (noProducts) {

        noProducts.style.display =
            found ? "none" : "block";

    }

}


// ==============================
// URL SEARCH / CATEGORY
// ==============================

const currentPage =
    window.location.pathname;


if (
    currentPage.includes("shop.html")
) {


    const params =
        new URLSearchParams(
            window.location.search
        );


    const category =
        params.get("category");


    const search =
        params.get("search");


    if (category) {

        filterProducts(
            "",
            category
        );

    }


    if (search) {


        if (shopSearch) {

            shopSearch.value =
                search;

        }


        filterProducts(
            search.toLowerCase(),
            "All"
        );

    }

}


// ==============================
// HOME SEARCH
// ==============================

const homeSearch =
    document.querySelector("#home-search");


const homeSearchButton =
    document.querySelector(
        "#home-search-button"
    );


function performHomeSearch() {


    if (!homeSearch) return;


    const search =
        homeSearch.value.trim();


    if (search === "") {

        return;

    }


    window.location.href =
        "shop.html?search=" +
        encodeURIComponent(search);

}


if (homeSearchButton) {

    homeSearchButton.addEventListener(
        "click",
        performHomeSearch
    );

}


if (homeSearch) {

    homeSearch.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                performHomeSearch();

            }

        }
    );

}


// ==============================
// CHECKOUT
// ==============================

const checkoutForm =
    document.querySelector(
        "#checkout-form"
    );


if (checkoutForm) {


    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            const name =
                document.querySelector(
                    "#customer-name"
                ).value.trim();


            const phone =
                document.querySelector(
                    "#customer-phone"
                ).value.trim();


            const address =
                document.querySelector(
                    "#customer-address"
                ).value.trim();


            const city =
                document.querySelector(
                    "#customer-city"
                ).value.trim();


            const payment =
                document.querySelector(
                    "#payment"
                ).value;


            if (
                name === "" ||
                phone === "" ||
                address === "" ||
                city === "" ||
                payment === ""
            ) {

                alert(
                    "Please complete all checkout fields."
                );

                return;

            }


            alert(
                "🎉 Thank you for your order! Your order has been placed successfully. We’ll contact you soon for confirmation."
            );


            cart = [];

            saveCart();

            checkoutForm.reset();

            showCart();

        }
    );

}


// ==============================
// ACCOUNT
// ==============================

const loginSection =
    document.querySelector(
        ".login-section"
    );


const loginForm =
    document.querySelector(
        ".login-section form"
    );


if (loginSection) {


    const savedAccount =
        JSON.parse(
            localStorage.getItem(
                "timezoneAccount"
            )
        );


    if (savedAccount) {

        showAccount(savedAccount);

    }
    else if (loginForm) {

        setupAccountForm();

    }

}


// ==============================
// ACCOUNT FORM
// ==============================

function setupAccountForm() {


    const passwordInput =
        document.querySelector(
            "#password"
        );


    const passwordMessage =
        document.querySelector(
            "#password-message"
        );


    const bioInput =
        document.querySelector(
            "#bio"
        );


    const bioCount =
        document.querySelector(
            "#bio-count"
        );


    // ==============================
    // BIO COUNT
    // ==============================

    if (bioInput && bioCount) {

        bioInput.addEventListener(
            "input",
            function () {

                bioCount.textContent =
                    bioInput.value.length +
                    " / 150";

            }
        );

    }


    // ==============================
    // PASSWORD CHECK
    // ==============================

    if (
        passwordInput &&
        passwordMessage
    ) {


        passwordInput.addEventListener(
            "input",
            function () {


                const password =
                    passwordInput.value;


                if (
                    password.length === 0
                ) {

                    passwordMessage.textContent =
                        "Password must be at least 6 characters.";

                    return;

                }


                if (
                    password.length < 6
                ) {

                    passwordMessage.textContent =
                        "Password is too short.";

                    return;

                }


                const hasLetter =
                    /[A-Za-z]/.test(password);


                const hasNumber =
                    /[0-9]/.test(password);


                const hasSpecial =
                    /[@#$%^&*]/.test(password);


                if (
                    !hasLetter ||
                    !hasNumber ||
                    !hasSpecial
                ) {

                    passwordMessage.textContent =
                        "Password is weak.";

                }
                else {

                    passwordMessage.textContent =
                        "Password is strong ✓";

                }

            }
        );

    }


    // ==============================
    // CREATE ACCOUNT
    // ==============================

    if (!loginForm) return;


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document.querySelector(
                    "#username"
                ).value.trim();


            const email =
                document.querySelector(
                    "#email"
                ).value.trim();


            const bio =
                document.querySelector(
                    "#bio"
                ).value.trim();


            const password =
                document.querySelector(
                    "#password"
                ).value.trim();


            // Username

            if (username === "") {

                alert(
                    "Please enter your username."
                );

                return;

            }


            // Email

            if (
                email === "" ||
                !email.includes("@") ||
                !email.includes(".")
            ) {

                alert(
                    "Please enter a correct email."
                );

                return;

            }


            // Password

            const hasLetter =
                /[A-Za-z]/.test(password);


            const hasNumber =
                /[0-9]/.test(password);


            const hasSpecial =
                /[@#$%^&*]/.test(password);


            if (password.length < 6) {

                passwordMessage.textContent =
                    "Password is too short.";

                return;

            }


            if (
                !hasLetter ||
                !hasNumber ||
                !hasSpecial
            ) {

                passwordMessage.textContent =
                    "Password is weak.";

                return;

            }


            // Account

            const account = {

                username: username,

                email: email,

                bio: bio

            };


            localStorage.setItem(
                "timezoneAccount",
                JSON.stringify(account)
            );


            alert(
                "Account created successfully!"
            );


            showAccount(account);

        }
    );

}


// ==============================
// SHOW ACCOUNT
// ==============================

function showAccount(account) {


    const section =
        document.querySelector(
            ".login-section"
        );


    if (!section) return;


    section.innerHTML = `

        <h2>
            My Account
        </h2>


        <div class="account-info">

            <h3>
                ${account.username}
            </h3>


            <p>
                <strong>Email:</strong>
                ${account.email}
            </p>


            <p>
                <strong>Bio:</strong>
                ${account.bio || "No bio added."}
            </p>

        </div>


        <div class="account-buttons">

            <button id="edit-account">
                Edit Account
            </button>


            <button id="logout-account">
                Logout
            </button>

        </div>

    `;


    // Edit

    const editButton =
        document.querySelector(
            "#edit-account"
        );


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                showEditForm(account);

            }
        );

    }


    // Logout

    const logoutButton =
        document.querySelector(
            "#logout-account"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {


                localStorage.removeItem(
                    "timezoneAccount"
                );


                location.reload();

            }
        );

    }

}


// ==============================
// EDIT ACCOUNT
// ==============================

function showEditForm(account) {


    const section =
        document.querySelector(
            ".login-section"
        );


    if (!section) return;


    section.innerHTML = `

        <h2>
            Edit Account
        </h2>


        <form id="edit-form">


            <label for="edit-username">
                Username
            </label>


            <input
                type="text"
                id="edit-username"
                value="${account.username}"
            >


            <label for="edit-email">
                Email
            </label>


            <input
                type="email"
                id="edit-email"
                value="${account.email}"
            >


            <label for="edit-bio">
                Bio
            </label>


            <textarea
                id="edit-bio"
                maxlength="150"
            >${account.bio || ""}</textarea>


            <button type="submit">
                Save Changes
            </button>


        </form>

    `;


    const editForm =
        document.querySelector(
            "#edit-form"
        );


    editForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document.querySelector(
                    "#edit-username"
                ).value.trim();


            const email =
                document.querySelector(
                    "#edit-email"
                ).value.trim();


            const bio =
                document.querySelector(
                    "#edit-bio"
                ).value.trim();


            if (username === "") {

                alert(
                    "Username cannot be empty."
                );

                return;

            }


            if (
                email === "" ||
                !email.includes("@") ||
                !email.includes(".")
            ) {

                alert(
                    "Please enter a correct email."
                );

                return;

            }


            const updatedAccount = {

                username: username,

                email: email,

                bio: bio

            };


            localStorage.setItem(
                "timezoneAccount",
                JSON.stringify(updatedAccount)
            );


            alert(
                "Account updated successfully!"
            );


            showAccount(updatedAccount);

        }
    );

}