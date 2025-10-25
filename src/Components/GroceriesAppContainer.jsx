
import { useState } from "react";
import products from '../data/products';
import ProductsContainer from './ProductsContainer';
import CartContainer from './CartContainer';
import NavBar from './NavBar';

export default function GroceriesAppContainer() {
    const [productQuantity, setProductQuantity] = useState(
        products.map((prod) => {
            return {
                id: prod.id,
                purchaseQuantity: 0,
                priceOptions: [parseFloat(prod.price.replace('$', ''))],
                currentPrice: parseFloat(prod.price.replace('$', '')),
            };
        })
    );

    const [cart, setCart] = useState([]);

    const handleAddToQuantity = (productId) => {
        const newProductQuantity = productQuantity.map((prod) => {
            if (prod.id === productId) {
                return { ...prod, purchaseQuantity: prod.purchaseQuantity + 1 };
            }
            return prod;
        });
        setProductQuantity(newProductQuantity);
    };

    const handleRemoveQuantity = (productId) => {
        const newProductQuantity = productQuantity.map((prod) => {
            if (prod.id === productId && prod.purchaseQuantity > 0) {
                return { ...prod, purchaseQuantity: prod.purchaseQuantity - 1 };
            }
            return prod;
        });
        setProductQuantity(newProductQuantity);
    };

    const handleAddToCart = (productId) => {
        const productToAdd = productQuantity.find(prod => prod.id === productId);
        if (productToAdd && productToAdd.purchaseQuantity > 0) {
            const productData = products.find(prod => prod.id === productId);
            setCart(prevCart => {
                const existingItem = prevCart.find(item => item.id === productId);
                if (existingItem) {
                    return prevCart.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity + productToAdd.purchaseQuantity }
                            : item
                    );
                } else {
                    return [...prevCart, {
                        id: productId,
                        product: productData.productName,
                        quantity: productToAdd.purchaseQuantity,
                        currentPrice: productToAdd.currentPrice,
                        image: productData.image,
                    }];
                }
            });
            
            const resetQuantity = productQuantity.map((prod) => {
                if (prod.id === productId) {
                    return { ...prod, purchaseQuantity: 0 };
                }
                return prod;
            });
            setProductQuantity(resetQuantity);
        } else {
            alert("Please set quantity greater than 0 before adding to cart");
        }
    };

    const handleRemoveFromCart = (itemToRemove) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemToRemove.id));
    };

    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const handleEmptyCart = () => {
  setCart([]);
};
const handleCheckout = () => {
  alert(`Thank you for your purchase! Your order total is $${cart.reduce((sum, item) => sum + (item.quantity * item.currentPrice), 0).toFixed(2)}`);
  setCart([]);
};
const handleUpdateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) {
    
    handleRemoveFromCart({ id: productId });
  } else {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }
};

    return (
        <div>
            <NavBar username="username" cartItemCount={totalCartItems} />
            <div className="GroceriesApp-Container">
                <ProductsContainer
                    data={products}
                    productQuantity={productQuantity}
                    handleAddToQuantity={handleAddToQuantity}
                    handleRemoveQuantity={handleRemoveQuantity}
                    handleAddToCart={handleAddToCart}
                />
                <CartContainer
                    cart={cart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                    onCheckout={handleCheckout}
                    onUpdateQuantity={handleUpdateQuantity}
                />
            </div>
        </div>
    );
}

