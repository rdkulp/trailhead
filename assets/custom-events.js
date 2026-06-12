// ================================================================================
// Custom events
//
// To help make it easier to add custom functionality, the theme emits custom
// events (along with their associated data) related to key theme features.
//
// To enable this functionality update the 'useCustomEvents' variable in
// the theme.liquid file to 'true'.
// ================================================================================

/* eslint-disable no-console */

// ================================================================================
// "Item added to the cart"
//
// - Fires whenever an item has been added to the cart
// - Exposed when the ajax cart is enabled
// - "detail" object data:
//   - The associated product object
// ================================================================================
document.addEventListener("cart:item-added", function (evt) {
  console.log("Item added to the cart");
  console.log(evt.detail.product);
});

// ================================================================================
// "Cart updated"
//
// - Fires whenever the cart is updated
// - Exposed when the ajax cart is enabled
// - "detail" object data:
//   - The cart object
// ================================================================================
document.addEventListener("cart:updated", function (evt) {
  console.log("Cart updated");
  console.log(evt.detail.cart);
});

// ================================================================================
// "Cart error"
//
// - Fires whenever there is an error when adding an item to the cart
//   - Typically due to a product not having sufficient stock
// - "detail" object data:
//   - The error message
// ================================================================================
document.addEventListener("cart:error", function (evt) {
  console.log("Cart error");
  console.log(evt.detail.errorMessage);
});

// ================================================================================
// "Quick cart opened"
//
// - Fires whenever the quick cart is opened
// - Exposed when the ajax cart is enabled
// - "detail" object data:
//   - The cart object
// ================================================================================
document.addEventListener("quick-cart:open", function (evt) {
  console.log("Quick cart opened");
  console.log(evt.detail.cart);
});

// ================================================================================
// "Quick cart closed"
//
// - Fires whenever the quick cart is opened
// - Exposed when the ajax cart is enabled
// ================================================================================
document.addEventListener("quick-cart:close", function () {
  console.log("Quick cart closed");
});

// ================================================================================
// "Product variant changed"
//
// - Fires whenever a variant product is selected
// - Exposed when a 'Variant selectors' block has been added to a product template
//   or featured product section
// - "detail" object data:
//   - The variant object
// ================================================================================
document.addEventListener("product:variant-change", function (evt) {
  console.log("Product variant changed");
  console.log(evt.detail.variant);
});

// ================================================================================
// "Product quantity updated"
//
// - Fires whenever a product quanatiy is updated
// - Exposed when a 'Quantity selector' block has been added to a product template
//   or featured product section
// - "detail" object data:
//   - The variant object
//   - The quantity
// ================================================================================
document.addEventListener("product:quantity-update", function (evt) {
  console.log("Product quantity updated");
  console.log(evt.detail.quantity, evt.detail.variant);
});

// ================================================================================
// "Quick view loaded"
//
// - Fires whenever a quick view modal is opened
// - Exposed when the 'Enable quick view' setting is enabled and a quick view
//   modal is opened
// ================================================================================
document.addEventListener("quick-view:loaded", function () {
  console.log("Quick view loaded");
});
/* eslint-enable no-console */
