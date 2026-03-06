import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items: cartItems, removeItem, updateQuantity, totalPrice: subtotal } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const savings = originalTotal - subtotal;
  const shipping = subtotal >= 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Malasiyakart</title>
        </Helmet>
        <Layout>
          <div className="container-main section-padding">
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/shop">
                <Button className="btn-primary">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${cartItems.length}) - Malasiyakart`}</title>
      </Helmet>

      <Layout>
        <div className="container-main section-padding">
          <h1 className="text-2xl font-bold mb-6">
            Shopping Cart ({cartItems.length} items)
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-xl p-4 flex gap-4"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.seller}
                    </p>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold">
                        RM {item.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        RM {item.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

                {/* Coupon */}
                <div className="flex gap-2 mb-6">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="secondary">Apply</Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>RM {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-success">
                    <span>Savings</span>
                    <span>-RM {savings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `RM ${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add RM {150 - subtotal} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>RM {total.toLocaleString()}</span>
                  </div>
                </div>

                <Link to="/checkout" className="block mt-6">
                  <Button className="w-full btn-accent" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link
                  to="/shop"
                  className="block text-center text-sm text-primary mt-4 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
