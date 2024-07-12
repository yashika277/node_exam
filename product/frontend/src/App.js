
import './App.css';
import CategoryList from './Components/categoryList';
import MyProducts from './Components/myProduct';
import ProductForm from './Components/productForm';
import ProductItem from './Components/productItem';
import ProductList from './Components/ProductList';

function App() {
  return (
    <div className="App">
      <MyProducts/>
      <ProductForm/>
      <ProductItem/>
      <ProductList/>
      <CategoryList/>
    </div>
  );
}

export default App;
