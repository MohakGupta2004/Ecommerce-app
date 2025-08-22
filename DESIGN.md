# 📦 Routes for Ecommerce Application

## **Auth & Users**

```http
POST   /auth/register        # register user (customer/seller/admin)
POST   /auth/login           # login
POST   /auth/logout          # logout (invalidate token)
GET    /users                # [admin] list users
GET    /users/:id            # get user profile
PUT    /users/:id            # update user info (self or admin)
DELETE /users/:id            # [admin] delete/deactivate user
```

---

## **Products**

```http
GET    /products             # list products (with filters, pagination)
GET    /products/:id         # get product details
POST   /products             # [seller/admin] create product
PUT    /products/:id         # [seller/admin] update product
DELETE /products/:id         # [seller/admin] remove product
GET    /users/:id/products   # list products by seller
```

---

## **Carts**

```http
GET    /carts/me             # get logged-in user’s cart
POST   /carts/me/items       # add item to cart
PUT    /carts/me/items/:id   # update quantity
DELETE /carts/me/items/:id   # remove item
DELETE /carts/me/clear       # empty cart
```

---

## **Orders**

```http
GET    /orders               # [admin] list all orders
GET    /users/:id/orders     # list orders by user
GET    /orders/:id           # get order details
GET    /orders/:id/items     # list items in order
GET    /order-items/:id      # get single order item
POST   /orders               # create new order (from cart)
PUT    /orders/:id/status    # [admin/seller] update status (pending, shipped, delivered, cancelled)
```

---

## **Payments**

```http
POST   /payments             # create payment (for an order)
GET    /payments/:id         # get payment details
GET    /orders/:id/payment   # get payment for an order
PUT    /payments/:id/status  # update payment status (captured, failed, refunded)
```

---

## **Reviews**

```http
GET    /products/:id/reviews # list reviews for a product
POST   /products/:id/reviews # add review (customer only, once per order)
PUT    /reviews/:id          # update review
DELETE /reviews/:id          # delete review
```

---
