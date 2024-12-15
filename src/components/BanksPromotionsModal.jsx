import { css } from '../../styled-system/css' 
import Modal from './Modal'
import { useTheme } from '../context/ThemeContext'

const BankPromotion = ({ bank, installments, interestFree }) => {
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
        {bank}
      </h3>
      <p className={css({
        color: isDarkMode ? 'gray.300' : 'gray.600',
        marginBottom: '2',
      })}>
        {installments} cuotas
      </p>
      {interestFree && (
        <p className={css({
          fontSize: 'sm',
          color: 'green.500',
          fontWeight: 'bold',
        })}>
          ¡Sin interés!
        </p>
      )}
    </div>
  )
}

const BankPromotionsModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Promociones Bancarias"
    >
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4',
      })}>
        <BankPromotion
          bank="Santander Rio"
          installments={8}
          interestFree={true}
        />
        <BankPromotion
          bank="Banco ciudad"
          installments={6}
          interestFree={true}
        />
        <BankPromotion
          bank="Banco Galicia"
          installments={6}
          interestFree={true}
        />
        <BankPromotion
          bank="BBVA"
          installments={12}
          interestFree={true}
        />
      </div>
    </Modal>
  )
}

export default BankPromotionsModal
