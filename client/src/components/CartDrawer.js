import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, clearCart, totalPrice } = useCart();
  const [step, setStep] = useState('cart'); // 'cart' | 'payment' | 'checkout' | 'success'
  const [form, setForm] = useState({ name: '', email: '', phone: '', transactionId: '', message: '' });
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/payment')
      .then(res => setPaymentDetails(res.data))
      .catch(() => setPaymentDetails({
        upiId: 'your-upi-id@bank',
        payeeName: 'OvutOfLove Art Store',
        upiUri: 'upi://pay?pa=your-upi-id%40bank&pn=OvutOfLove%20Art%20Store&cu=INR',
        note: 'Scan the QR code or copy the UPI ID, then enter your transaction ID after payment.'
      }));
  }, []);

  const qrCodeUrl = paymentDetails
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(paymentDetails.upiUri)}`
    : '';

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    // Basic validation for UPI Transaction ID (usually 12 digits, but we enforce at least 12 chars to prevent easy fake inputs)
    if (form.transactionId.trim().length < 12) {
      alert("Please enter a valid UPI Transaction ID or UTR number. It is typically 12 digits long.");
      return;
    }

    setLoading(true);
    try {
      for (const item of cartItems) {
        await axios.post('/api/orders', {
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          message: form.message,
          artworkId: item._id,
          paymentTransactionId: form.transactionId,
          paymentMethod: 'UPI'
        });
      }
      clearCart();
      setStep('success');
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const close = () => { setCartOpen(false); setTimeout(() => setStep('cart'), 400); };
  const copyUpiId = async () => {
    if (!paymentDetails?.upiId) return;
    try {
      await navigator.clipboard.writeText(paymentDetails.upiId);
    } catch {
      window.prompt('Copy UPI ID', paymentDetails.upiId);
    }
  };

  return (
    <>
      <div className={`cart-overlay ${cartOpen ? 'cart-overlay--open' : ''}`} onClick={close} />
      <aside className={`cart-drawer ${cartOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <span className="section-label">Your Collection</span>
          <button onClick={close} className="cart-drawer__close" aria-label="Close">✕</button>
        </div>

        {step === 'cart' && (
          <>
            {cartItems.length === 0 ? (
              <div className="cart-drawer__empty">
                <span className="ornament">✦</span>
                <p>Your collection is empty.</p>
                <p className="cart-drawer__empty-sub">Browse the gallery to find something that speaks to you.</p>
              </div>
            ) : (
              <>
                <div className="cart-drawer__items">
                  {cartItems.map(item => (
                    <div key={item._id} className="cart-item">
                      <img src={item.imageUrl} alt={item.title} className="cart-item__img" />
                      <div className="cart-item__info">
                        <p className="cart-item__title">{item.title}</p>
                        <p className="cart-item__price">₹{item.price.toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="cart-item__remove" aria-label="Remove">✕</button>
                    </div>
                  ))}
                </div>
                <div className="cart-drawer__footer">
                  <div className="cart-drawer__total">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <button className="btn-primary" style={{width:'100%'}} onClick={() => setStep('payment')}>
                    Continue to UPI Payment
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {step === 'payment' && (
          <div className="cart-drawer__payment">
            <div className="cart-drawer__payment-summary">
              <h3>Pay with UPI</h3>
              <p className="cart-drawer__form-note">
                Complete the payment below, then continue to submit your transaction ID.
              </p>
              <div className="cart-drawer__payment-total">
                <span>Amount due</span>
                <strong>₹{totalPrice.toLocaleString()}</strong>
              </div>
            </div>

            <div className="cart-drawer__qr-card">
              {qrCodeUrl ? <img src={qrCodeUrl} alt="UPI QR code" className="cart-drawer__qr" /> : null}
              <div className="cart-drawer__upi-meta">
                <span className="cart-drawer__upi-label">UPI ID</span>
                <p>{paymentDetails?.upiId || 'your-upi-id@bank'}</p>
                <button type="button" className="btn-ghost" onClick={copyUpiId}>Copy UPI ID</button>
              </div>
            </div>

            <p className="cart-drawer__payment-note">{paymentDetails?.note}</p>

            <div className="cart-drawer__form-actions">
              <button type="button" className="btn-ghost" onClick={() => setStep('cart')}>← Back</button>
              <button type="button" className="btn-primary" onClick={() => setStep('checkout')}>
                I have paid
              </button>
            </div>
          </div>
        )}

        {step === 'checkout' && (
          <form className="cart-drawer__form" onSubmit={handleCheckout}>
            <h3>Submit Payment Details</h3>
            <p className="cart-drawer__form-note">Enter your details and the UPI transaction ID so we can verify the payment and process your order.</p>
            <div className="ink-divider-sm" style={{margin:'1rem 0'}}/>
            <input required placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input required type="email" placeholder="Your email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            <input required placeholder="UPI transaction ID" value={form.transactionId} onChange={e => setForm({...form, transactionId: e.target.value})} />
            <textarea placeholder="Any notes or special requests…" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            <div className="cart-drawer__form-actions">
              <button type="button" className="btn-ghost" onClick={() => setStep('cart')}>← Back</button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving…' : 'Save Order'}
              </button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="cart-drawer__success">
            <span style={{fontSize:'2.5rem', color:'var(--gold)'}}>✦</span>
            <h3>Order saved.</h3>
            <p>Your order is now in MongoDB and waiting for payment verification. I’ll write back to <em>{form.email}</em> after checking the transaction ID.</p>
            <button className="btn-ghost" style={{marginTop:'1.5rem'}} onClick={close}>Close</button>
          </div>
        )}
      </aside>
    </>
  );
}
