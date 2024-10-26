import './App.css'
import NavbarComponent from './components/NavbarComponent'
import  ItemListContainerComponent from './components/ItemListContainerComponent'
function App() {

  return (
   <div>
      <NavbarComponent/>
      <ItemListContainerComponent greeting='Bienvenidos al bazar de Vartan' text='segunda prop'/>
   </div>
  )
}
export default App