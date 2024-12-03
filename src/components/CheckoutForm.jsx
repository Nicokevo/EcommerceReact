import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext'; // Importamos el contexto global para el tema
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { css } from '../../styled-system/css';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [errors, setErrors] = useState({});
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Accedemos al tema desde el contexto global

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'A valid email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim() || isNaN(formData.zipCode)) newErrors.zipCode = 'A valid ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const orderData = {
        ...formData,
        cart: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        date: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      console.log('Order saved with ID: ', docRef.id);

      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error saving order: ', error);
    }
  };

  return (
    <div className={css({
      width: '100%',
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '0 1rem',
    })}>
      <form 
        onSubmit={handleSubmit} 
        className={css({
          backgroundColor: isDarkMode ? '#2A2A2A' : 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
          gap: '2rem',
          position: 'relative',
          transition: 'all 0.2s ease',
        })}
      >
        <div className={css({
          gridColumn: { base: '1', md: '1 / -1' },
          textAlign: 'center',
        })}>
          <h2 className={css({
            fontSize: '2rem',
            marginBottom: '1rem',
            color: isDarkMode ? '#ffffff' : '#000000',
          })}>
            Awesome Checkout
          </h2>
        </div>

        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        })}>
          {['name', 'email', 'address'].map((field) => (
            <div key={field}>
              <label 
                htmlFor={field}
                className={css({
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: isDarkMode ? '#E0E0E0' : '#333333',
                  fontSize: '0.9rem',
                })}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={css({
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid',
                  borderColor: isDarkMode ? '#404040' : '#e0e0e0',
                  backgroundColor: isDarkMode ? '#333333' : '#ffffff',
                  color: isDarkMode ? '#ffffff' : '#000000',
                  transition: 'all 0.2s ease',
                  _focus: {
                    outline: 'none',
                    borderColor: '#4A90E2',
                    boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
                  }
                })}
              />
              {errors[field] && (
                <span className={css({
                  color: '#FF4D4D',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem',
                  display: 'block',
                })}>
                  {errors[field]}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        })}>
          {['city', 'zipCode'].map((field) => (
            <div key={field}>
              <label 
                htmlFor={field}
                className={css({
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: isDarkMode ? '#E0E0E0' : '#333333',
                  fontSize: '0.9rem',
                })}
              >
                {field === 'zipCode' ? 'ZIP Code' : field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={css({
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid',
                  borderColor: isDarkMode ? '#404040' : '#e0e0e0',
                  backgroundColor: isDarkMode ? '#333333' : '#ffffff',
                  color: isDarkMode ? '#ffffff' : '#000000',
                  transition: 'all 0.2s ease',
                  _focus: {
                    outline: 'none',
                    borderColor: '#4A90E2',
                    boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
                  }
                })}
              />
              {errors[field] && (
                <span className={css({
                  color: '#FF4D4D',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem',
                  display: 'block',
                })}>
                  {errors[field]}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className={css({
          gridColumn: { base: '1', md: '1 / -1' },
          marginTop: '1rem',
        })}>
          <h3 className={css({
            fontSize: '1.2rem',
            marginBottom: '1rem',
            color: isDarkMode ? '#ffffff' : '#000000',
          })}>
            Order Summary
          </h3>
          <div className={css({
            backgroundColor: isDarkMode ? '#333333' : '#f8f8f8',
            padding: '1rem',
            borderRadius: '0.5rem',
          })}>
            {cart.map((item) => (
              <div 
                key={item.id} 
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  borderBottom: '1px solid',
                  borderColor: isDarkMode ? '#404040' : '#e0e0e0',
                  '&:last-child': {
                    borderBottom: 'none',
                  }
                })}
              >
                <div className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                })}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={css({
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: '0.25rem',
                    })} 
                  />
                  <div className={css({
                    color: isDarkMode ? '#ffffff' : '#000000',
                  })}>
                    {item.name} x{item.quantity}
                  </div>
                </div>
                <div className={css({
                  color: isDarkMode ? '#ffffff' : '#000000',
                })}>
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
            <div className={css({
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            })}>
              <span>Total:</span>
              <span>
                ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
              </span>
            </div>
          </div>
        </div>

        <div className={css({
          gridColumn: { base: '1', md: '1 / -1' },
          textAlign: 'center',
          marginTop: '1.5rem',
        })}>
          <button 
            type="submit" 
            className={css({
              padding: '1rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#4A90E2',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              _hover: {
                backgroundColor: '#357ABD',
              }
            })}
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
