import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'

function ItemListContainerComponent({ greeting, text }) {
  return (
    <section className={css({ 
      backgroundColor: 'white', 
      borderRadius: 'md', 
      boxShadow: 'md', 
      padding: '6'
    })}>
      <h2 className={css({ fontSize: '3xl', fontWeight: 'bold', marginBottom: '4' })}>{greeting}</h2>
      <p className={css({ fontSize: 'lg', color: 'gray.600' })}>{text}</p>
      <div className={flex({ gap: '4', marginTop: '6' })}>
      </div>
    </section>
  )
}

export default ItemListContainerComponent


