import { css } from '../../styled-system/css'
import Modal from './Modal'
import { useTheme } from '../context/ThemeContext'

const DiscountCode = ({ code, description, validUntil }) => {
  const { isDarkMode } = useTheme()
  return (
    <div className={css({
      padding: '4',
      border: '1px solid',
      borderColor: isDarkMode ? 'gray.600' : 'gray.200',
      borderRadius: 'md',
      backgroundColor: isDarkMode ? 'gray.700' : 'gray.50',
    })}>
      <h3 className={css({
        fontSize: 'lg',
        fontWeight: 'bold',
        marginBottom: '2',
        color: isDarkMode ? 'gray.100' : 'gray.900',
      })}>
        {code}
      </h3>
      <p className={css({
        color: isDarkMode ? 'gray.300' : 'gray.600',
        marginBottom: '2',
      })}>
        {description}
      </p>
      <p className={css({
        fontSize: 'sm',
        color: isDarkMode ? 'gray.400' : 'gray.500',
      })}>
        Válido hasta el {validUntil}
      </p>
    </div>
  )
}

const DiscountCodeModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Códigos de Descuento"
    >
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4',
      })}>
        <DiscountCode
          code="FIRST10"
          description="10% de descuento en tu primera compra"
          validUntil="31/12/2024"
        />
        <DiscountCode
          code="SUMMER24"
          description="15% de descuento en productos de verano"
          validUntil="28/02/2024"
        />
      </div>
    </Modal>
  )
}

export default DiscountCodeModal

