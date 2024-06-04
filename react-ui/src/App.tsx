import { Routes, Route } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import BackOffice from './pages/BackOffice';
import ProductList from './components/backoffice/BackOfficeList';
import BackOfficeForm from './components/backoffice/BackOfficeForm';
import LoginTransition from './components/login/LoginTransition';
import useProducts from './hooks/useProducts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me } from './features/user-slice';

import ErrorPage from './pages/ErrorPage';
import LoginControle from './components/login/LoginControle';
import ProtectedAdmin from './components/login/ProtectedAdmin';
import AlreadyLogged from './components/login/AlreadyLogged';
import Cart from './pages/Cart';
import { RootState } from './store/store';
import RegistrationForm from './components/login/register/RegisterForm';
import ProductDetails from './pages/ProductDetails';
import NavBarTop from './components/nav/NavBarTop';
import Home from './pages/Home';
import FooterComponent from './components/footer/FooterComponent';


function App() {
  const isDark = useSelector<RootState, boolean>((state) => state.theme.isDark);
  const dispatch = useDispatch()

  useProducts();

  useEffect(() => {
    const token = localStorage.getItem("mywebsite_token");
    if (token) {
      dispatch(me() as any)
    }
  }, [dispatch]);

  return (<>
    <div className={!isDark ? 'on' : 'off'} >

      <NavBarTop />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AlreadyLogged><LoginControle /></AlreadyLogged>} />
        <Route path="/registerFrom" element={<AlreadyLogged><RegistrationForm /></AlreadyLogged>} />

        <Route path="/backoffice" element={<ProtectedAdmin><BackOffice /></ProtectedAdmin>}>
          <Route path="/backoffice/products" element={<ProductList />} />
          <Route path="/backoffice/products/new" element={<BackOfficeForm />} />
          <Route path="/backoffice/products/edit/:id" element={<BackOfficeForm />} />
        </Route>

        <Route path="/login_transition" element={<LoginTransition />} />
        <Route path="/products/" element={<Home />} />
        <Route path="/products/:gender/:category/:subcategory" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
      <FooterComponent />

    </div>
  </>
  );
}

export default App;
