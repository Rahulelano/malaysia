import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import OptimizedImage from '@/components/common/OptimizedImage';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Mock shipping (logic can be expanded later)
  const shipping = 0;
  const grandTotal = totalPrice + shipping;

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/checkout/success');
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Malasiyakart</title>
      </Helmet>
      <Layout>
        <div className="container-main section-padding">
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              <form id="checkout-form" onSubmit={handleSubmit}>
                {/* Shipping Details */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required placeholder="Enter last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" required placeholder="Enter email address" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required placeholder="Street address, apartment, suite, etc." />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required placeholder="Enter city" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" required placeholder="Enter postal code" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required placeholder="Enter phone number" />
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Payment Method */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                  <RadioGroup defaultValue="card" className="grid gap-4">
                    <div>
                      <RadioGroupItem value="card" id="card" className="peer sr-only" />
                      <Label
                        htmlFor="card"
                        className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-secondary/50"
                      >
                        <span className="font-semibold">Credit/Debit Card</span>
                        <div className="flex gap-2">
                          {/* Icons placeholder */}
                          <div className="w-8 h-5 bg-gray-200 rounded" />
                          <div className="w-8 h-5 bg-gray-200 rounded" />
                        </div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="fpx" id="fpx" className="peer sr-only" />
                      <Label
                        htmlFor="fpx"
                        className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-secondary/50"
                      >
                        <span className="font-semibold">FPX Online Banking</span>
                        <div className="w-8 h-5 bg-gray-200 rounded" />
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                      <Label
                        htmlFor="cod"
                        className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-secondary/50"
                      >
                        <span className="font-semibold">Cash on Delivery</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </section>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

                {/* Real Items List */}
                <div className="space-y-4 mb-6 max-h-60 overflow-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-md flex-shrink-0 overflow-hidden">
                        <OptimizedImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium line-clamp-2">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-semibold">RM {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>RM {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `RM ${shipping}`}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>RM {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  form="checkout-form"
                  className="w-full btn-primary mt-6"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Place Order'}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
