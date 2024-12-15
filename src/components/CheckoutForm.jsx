import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { css } from '../../styled-system/css';
import { FaCreditCard, FaUser, FaMapMarkerAlt, FaTag, FaPercent } from 'react-icons/fa';
import Swal from 'sweetalert2';
import  DiscountModal from './DiscountModal';
import BanksPromotionsModal from './BanksPromotionsModal';

const VALID_COUPONS = {
  'FIRST10': 10,
  'WELCOME20': 20,
  'SPECIAL30': 30
};

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  });
  const [errors, setErrors] = useState({});
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isBankPromotionsModalOpen, setIsBankPromotionsModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Se requiere un email válido';
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.zipCode.trim() || !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) newErrors.zipCode = 'Se requiere un código postal válido';
    if (!formData.cardNumber.trim() || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Se requiere un número de tarjeta válido de 16 dígitos';
    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = 'Se requiere una fecha de vencimiento válida';
    } else {
      const [month, year] = formData.cardExpiry.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const today = new Date();
      if (expiry < today) {
        newErrors.cardExpiry = 'La tarjeta ha expirado';
      }
    }
    if (!formData.cardCVV.trim() || !/^\d{3,4}$/.test(formData.cardCVV)) newErrors.cardCVV = 'Se requiere un CVV válido (3-4 dígitos)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyCoupon = () => {
    const couponCode = coupon.toUpperCase();
    if (VALID_COUPONS[couponCode]) {
      setAppliedCoupon(couponCode);
      setDiscount(VALID_COUPONS[couponCode]);
      setCoupon('');
      Swal.fire({
        icon: 'success',
        title: 'Cupón aplicado',
        text: `Se ha aplicado un descuento del ${VALID_COUPONS[couponCode]}%`,
        background: isDarkMode ? '#1F2937' : '#FFFFFF',
        color: isDarkMode ? '#FFFFFF' : '#000000',
        confirmButtonColor: '#3B82F6'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Cupón inválido',
        text: 'Por favor, ingrese un código de cupón válido.',
        background: isDarkMode ? '#1F2937' : '#FFFFFF',
        color: isDarkMode ? '#FFFFFF' : '#000000',
        confirmButtonColor: '#EF4444'
      });
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = (discount / 100) * subtotal;
    return subtotal - discountAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(cart.length === 0){
      Swal.fire({
        icon: 'warning',
        title: 'Sin pedidos no hay compra bye',
        text: 'Su pedido ha sido realizado con éxito. Recibirá una confirmación por correo electrónico.',
        background: isDarkMode ? '#1F2937' : '#FFFFFF',
        color: isDarkMode ? '#FFFFFF' : '#000000',
        confirmButtonColor: '#10B981'
      }).then(() => {
        navigate('/');
      });
   
    };
    if (validateForm()) {
      const orderData = {
        formData,
        cart,
        total: calculateTotal(),
        discount: discount,
        appliedCoupon: appliedCoupon,
        timestamp: new Date()
      };

      try {
        const { id: orderId } = await addDoc(collection(db, 'orders'), orderData);
        clearCart();
        navigate('/order-confirmation', { state: { orderId } });
        Swal.fire({
          icon: 'success',
          title: '¡Pedido realizado!',
          text: 'Su pedido ha sido realizado con éxito. Recibirá una confirmación por correo electrónico.',
          background: isDarkMode ? '#1F2937' : '#FFFFFF',
          color: isDarkMode ? '#FFFFFF' : '#000000',
          confirmButtonColor: '#10B981'
        });
      } catch (error) {
        console.error('Error al crear el pedido:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al realizar el pedido',
          text: 'Por favor, intente nuevamente más tarde.',
          background: isDarkMode ? '#1F2937' : '#FFFFFF',
          color: isDarkMode ? '#FFFFFF' : '#000000',
          confirmButtonColor: '#EF4444'
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'cardNumber' || name === 'cardCVV' || name === 'zipCode') {
      updatedValue = value.replace(/\D/g, '');
    }

    if (name === 'cardNumber') {
      updatedValue = updatedValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }

    if (name === 'cardExpiry') {
      // Ensure we're working with a valid date string
      if (value) {
        const date = new Date(value + '-01'); // Add day to make valid date
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        updatedValue = `${month}/${year}`;
      } else {
        updatedValue = '';
      }
    }

    setFormData({ ...formData, [name]: updatedValue });
  };

  return (
    <div className={css({
      width: '100%',
      maxWidth: '1000px',
      margin: '2rem auto',
      padding: '0 1rem',
    })}>
      <form onSubmit={handleSubmit} className={css({
        backgroundColor: isDarkMode ? 'gray.800' : 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'grid',
        gridTemplateColumns: { base: '1fr', lg: '2fr 1fr' },
        gap: '2rem',
      })}>
        {/* Left Column - Form Fields */}
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '2rem' })}>
          {/* Personal Information Section */}
          <section>
            <h2 className={css({
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: isDarkMode ? 'gray.100' : 'gray.900',
            })}>
              <FaUser /> Información Personal
            </h2>
            <div className={css({
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
              gap: '1rem',
            })}>
              {[
                { name: 'name', label: 'Nombre' },
                { name: 'email', label: 'Email' },
                { name: 'address', label: 'Dirección' },
                { name: 'city', label: 'Ciudad' },
                { name: 'zipCode', label: 'Código Postal' }
              ].map((field) => (
                <div key={field.name} className={css({
                  gridColumn: field.name === 'address' ? 'span 2' : 'auto',
                })}>
                  <label className={css({
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: isDarkMode ? 'gray.300' : 'gray.700',
                  })}>
                    {field.label}
                  </label>
                  <input
                    type={field.name === 'email' ? 'email' : (field.name === 'zipCode' ? 'tel' : 'text')}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={css({
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid',
                      borderColor: errors[field.name] ? 'red.500' : (isDarkMode ? 'gray.600' : 'gray.300'),
                      backgroundColor: isDarkMode ? 'gray.700' : 'white',
                      color: isDarkMode ? 'gray.100' : 'gray.900',
                      '&:focus': {
                        outline: 'none',
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.5)',
                      },
                    })}
                    maxLength={field.name === 'zipCode' ? 5 : undefined}
                  />
                  {errors[field.name] && (
                    <span className={css({
                      color: 'red.500',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    })}>
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Payment Information Section */}
          <section>
            <h2 className={css({
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: isDarkMode ? 'gray.100' : 'gray.900',
            })}>
              <FaCreditCard /> Información de Pago
            </h2>
            <div className={css({
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
              gap: '1rem',
            })}>
              <div className={css({ gridColumn: 'span 2' })}>
                <label className={css({
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: isDarkMode ? 'gray.300' : 'gray.700',
                })}>
                  Número de Tarjeta
                </label>
                <input
                  type="tel"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={css({
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid',
                    borderColor: errors.cardNumber ? 'red.500' : (isDarkMode ? 'gray.600' : 'gray.300'),
                    backgroundColor: isDarkMode ? 'gray.700' : 'white',
                    color: isDarkMode ? 'gray.100' : 'gray.900',
                    '&:focus': {
                      outline: 'none',
                      borderColor: 'blue.500',
                      boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.5)',
                    },
                  })}
                />
                {errors.cardNumber && (
                  <span className={css({
                    color: 'red.500',
                    fontSize: '0.875rem',
                    marginTop: '0.25rem',
                    display: 'block',
                  })}>
                    {errors.cardNumber}
                  </span>
                )}
              </div>
              <div>
                <label className={css({
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: isDarkMode ? 'gray.300' : 'gray.700',
                })}>
                  Fecha de Vencimiento
                </label>
                <input
                  type="month"
                  name="cardExpiry"
                  value={formData.cardExpiry ? `20${formData.cardExpiry.split('/')[1]}-${formData.cardExpiry.split('/')[0]}` : ''}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 7)}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().slice(0, 7)}
                  className={css({
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid',
                    borderColor: errors.cardExpiry ? 'red.500' : (isDarkMode ? 'gray.600' : 'gray.300'),
                    backgroundColor: isDarkMode ? 'gray.700' : 'white',
                    color: isDarkMode ? 'gray.100' : 'gray.900',
                    '&:focus': {
                      outline: 'none',
                      borderColor: 'blue.500',
                      boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.5)',
                    },
                  })}
                />
                {errors.cardExpiry && (
                  <span className={css({
                    color: 'red.500',
                    fontSize: '0.875rem',
                    marginTop: '0.25rem',
                    display: 'block',
                  })}>
                    {errors.cardExpiry}
                  </span>
                )}
              </div>
              <div>
                <label className={css({
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: isDarkMode ? 'gray.300' : 'gray.700',
                })}>
                  CVV
                </label>
                <input
                  type="tel"
                  name="cardCVV"
                  value={formData.cardCVV}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength={4}
                  className={css({
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid',
                    borderColor: errors.cardCVV ? 'red.500' : (isDarkMode ? 'gray.600' : 'gray.300'),
                    backgroundColor: isDarkMode ? 'gray.700' : 'white',
                    color: isDarkMode ? 'gray.100' : 'gray.900',
                    '&:focus': {
                      outline: 'none',
                      borderColor: 'blue.500',
                      boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.5)',
                    },
                  })}
                />
                {errors.cardCVV && (
                  <span className={css({
                    color: 'red.500',
                    fontSize: '0.875rem',
                    marginTop: '0.25rem',
                    display: 'block',
                  })}>
                    {errors.cardCVV}
                  </span>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className={css({
            backgroundColor: isDarkMode ? 'gray.700' : 'gray.50',
            borderRadius: '0.75rem',
            overflow: 'hidden',
          })}>
            <div className={css({
              padding: '1.5rem',
              borderBottom: '1px solid',
              borderColor: isDarkMode ? 'gray.600' : 'gray.200',
            })}>
              <h2 className={css({
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: isDarkMode ? 'gray.100' : 'gray.900',
              })}>
                <FaMapMarkerAlt /> Resumen del Pedido
              </h2>
              <div className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              })}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={css({
                      display: 'flex',
                      gap: '1rem',
                      padding: '0.75rem',
                      backgroundColor: isDarkMode ? 'gray.800' : 'white',
                      borderRadius: '0.5rem',
                    })}
                  >
                    <img
                      src={item.images?.primary || 'https://via.placeholder.com/80x80?text=No+Image'}
                      alt={item.name}
                      className={css({
                        width: '4rem',
                        height: '4rem',
                        objectFit: 'cover',
                        borderRadius: '0.375rem',
                      })}
                    />
                    <div className={css({
                      flex: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    })}>
                      <span className={css({
                        fontWeight: 'medium',
                        color: isDarkMode ? 'gray.100' : 'gray.900',
                      })}>
                        {item.name}
                      </span>
                      <div className={css({
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: isDarkMode ? 'gray.300' : 'gray.600',
                      })}>
                        <span>Cant: {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <div className={css({
              padding: '1.5rem',
              borderBottom: '1px solid',
              borderColor: isDarkMode ? 'gray.600' : 'gray.200',
            })}>
              <div className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                color: isDarkMode ? 'gray.100' : 'gray.900',
              })}>
                <FaTag />
                <span className={css({ fontWeight: 'medium' })}>Cupones y Promociones</span>
              </div>
              <div className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              })}>
                <div className={css({
                  display: 'flex',
                  gap: '0.5rem',
                })}>
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Ingrese código de cupón"
                    className={css({
                      flex: '1',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid',
                      borderColor: isDarkMode ? 'gray.600' : 'gray.300',
                      backgroundColor: isDarkMode ? 'gray.800' : 'white',
                      color: isDarkMode ? 'gray.100' : 'gray.900',
                      '&:focus': {
                        outline: 'none',
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.5)',
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className={css({
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'blue.500',
                      color: 'white',
                      borderRadius: '0.5rem',
                      fontWeight: 'medium',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: 'blue.600',
                      },
                      '&:focus': {
                        outline: 'none',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
                      },
                    })}
                  >
                    Aplicar
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDiscountModalOpen(true)}
                  className={css({
                    padding: '0.75rem',
                    backgroundColor: isDarkMode ? 'gray.700' : 'gray.200',
                    color: isDarkMode ? 'gray.100' : 'gray.900',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'gray.600' : 'gray.300',
                    },
                  })}
                >
                  Ver códigos de descuento disponibles
                </button>
                <button
                  type="button"
                  onClick={() => setIsBankPromotionsModalOpen(true)}
                  className={css({
                    padding: '0.75rem',
                    backgroundColor: isDarkMode ? 'gray.700' : 'gray.200',
                    color: isDarkMode ? 'gray.100' : 'gray.900',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'gray.600' : 'gray.300',
                    },
                  })}
                >
                  Ver promociones bancarias
                </button>
              </div>
            </div>

            {/* Total Section */}
            <div className={css({
              padding: '1.5rem',
            })}>
              <div className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              })}>
                <div className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: isDarkMode ? 'gray.300' : 'gray.600',
                })}>
                  <span>Subtotal</span>
                  <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'green.500',
                    fontWeight: 'medium',
                  })}>
                    <div className={css({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    })}>
                      <FaPercent />
                      <span>Descuento</span>
                    </div>
                    <span>-{discount}%</span>
                  </div>
                )}
                <div className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  color: isDarkMode ? 'gray.100' : 'gray.900',
                  paddingTop: '0.75rem',
                  marginTop: '0.75rem',
                  borderTop: '1px solid',
                  borderColor: isDarkMode ? 'gray.600' : 'gray.200',
                })}>
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className={css({
                  width: '100%',
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: 'green.500',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'green.600',
                  },
                  '&:focus': {
                    outline: 'none',
                    boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.5)',
                  },
                })}
              >
                Realizar Pedido
              </button>
            </div>
          </div>
        </div>
        <DiscountModal
          isOpen={isDiscountModalOpen}
          onClose={() => setIsDiscountModalOpen(false)}
        />

        <BanksPromotionsModal
          isOpen={isBankPromotionsModalOpen}
          onClose={() => setIsBankPromotionsModalOpen(false)}
        />
      </form>
    </div>
  );
};

export default CheckoutForm;

