import './App.css';
import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import Login from "./pages/Password Section/Login/Login";
import Mainlayout from './components/MainLayout/Mainlayout';
import Dashboard from "./pages/DashBoard/Dashboard";
import Enquiries from './pages/Enquiries/Enquiries';
import Bloglist from './pages/Blog Section/Bloglist/Bloglist';
import BlogCategoryList from './pages/Blog Section/BlogCategoryList/BlogCategoryList';
import Orders from './pages/Orders/Orders';
import Customers from './pages/Customers/Customers';
import ColorList from './pages/Catalog/ColorSection/ColorList/ColorList';
import CategoryList from './pages/Catalog/CategorySection/CategoryList/Categorylist';
import BrandList from './pages/Catalog/Brand Section/BrandList/BrandList';
import ProductList from './pages/Catalog/Product Section/ProductList';
import AddBlog from './pages/Blog Section/Add Blog/AddBlog';
import AddBlogCat from './pages/Blog Section/AddBlogCategory/AddBlogCat';
import AddColor from './pages/Catalog/ColorSection/Add Color/AddColor';
import AddCategory from './pages/Catalog/CategorySection/AddCategory/AddCategory';
import AddBrand from './pages/Catalog/Brand Section/AddBrand/AddBrand';
import AddProduct from './pages/Catalog/Product Section/AddProduct';
import ViewEnq from './pages/Enquiries/ViewEnq';
import ViewOrder from './pages/Orders/ViewOrder';
import { PrivateRoutes } from './pages/ProtectedRoutes/PrivateRoute';
import { OpenRoutes } from './pages/ProtectedRoutes/OpenRoute';
import AddSize from './pages/SizeSection/AddSize';
import SizeList from './pages/SizeSection/ListSize';
import AddBanner from './pages/Banners/AddBanner';
import BannerList from './pages/Banners/BannerList';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>}/>
      <Route path='/admin' element={<PrivateRoutes><Mainlayout /></PrivateRoutes>}>
        <Route index element={<Dashboard />}/>
        <Route path='enquiries' element={<Enquiries />}/>
        <Route path='enquiries/:id' element={<ViewEnq />}/>
      
        <Route path='blog-list' element={<Bloglist />}/>
        <Route path='blog' element={<AddBlog  />}/>
        <Route path='blog/:id' element={<AddBlog  />}/>
        <Route path='blog-category-list' element={<BlogCategoryList />}/>
        <Route path='blog-category' element={<AddBlogCat />}/>
        <Route path='blog-category/:id' element={<AddBlogCat />}/>

        <Route path='orders' element={<Orders />}/>
        <Route path='order/:id' element={<ViewOrder />}/>

        <Route path='customers' element={<Customers />}/>
        <Route path='color-list' element={<ColorList />}/>
        <Route path='color' element={<AddColor />}/>
        <Route path='color/:id' element={<AddColor />}/>
        <Route path='category-list' element={<CategoryList />}/>
        <Route path='category' element={<AddCategory />}/>
        <Route path='category/:id' element={<AddCategory />}/>
        <Route path='list-brand' element={<BrandList />}/>
        <Route path='brand' element={<AddBrand/>}/>
        <Route path='brand/:id' element={<AddBrand/>}/>
        <Route path='addsize' element={<AddSize/>}/>
        <Route path='size-list' element={<SizeList/>}/>
        <Route path='size/:id' element={<AddSize/>}/>
        <Route path='product-list' element={<ProductList />}/>
        <Route path='product' element={<AddProduct />}/>
        <Route path='product/:id' element={<AddProduct />}/>

        <Route path='banner' element={<AddBanner />}/>
        <Route path='banner-list' element={<BannerList />}/>
        
      </Route>
    </Routes>
   </Router>
  );
}

export default App;
