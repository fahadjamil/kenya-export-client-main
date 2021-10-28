import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import PublicRoute from "./shared/routes/PublicRoute.jsx";
import PrivateRoute from "./shared/routes/PrivateRoute.jsx";
import Auth from "./website/views/Auth";
import Home from "./website/views/Home";
import About from "./website/views/About";
import Services from "./website/views/Services";
import Marketplace from "./website/views/Marketplace";
import Testimonials from "./website/views/Testimonials";
import FAQs from "./website/views/FAQs";
import Contact from "./website/views/Contact";
import DashboardView from "./portal/views/DashboardView";
import ProfileView from "./portal/views/ProfileView";
import BuynShip from "./portal/views/BuynShip";
import RevenueView from "./portal/views/RevenueView";
import VerifyEmail from "./website/views/VerifyEmail.js";
import ShipmentFormView from "./portal/views/ShipmentFormView";
import ShipmentListView from "./portal/views/ShipmentListView";
import UsersList from "./portal/components/admin/UsersList.js";
import ShipmentDetail from "./portal/components/customer/ShipmentDetail.js";
import UserDetail from "./portal/components/admin/UserDetail.js";
import CollectionUpdate from "./portal/components/customer/CollectionUpdate";
import ShipmentTracking from "./portal/components/customer/ShipmentTracking.js";
import ForgotPassword from "./website/views/ForgotPassword.js";
import ShipmentSteps from "./website/views/ShipmentSteps";
import SearchArea from "./website/views/SearchArea";
import NewsletterList from "./portal/components/employee/NewsletterList.js";
import ByAir from "./website/views/ByAir";
import BySea from "./website/views/BySea";
import OnlineShopping from "./website/views/OnlineShopping";
import ExcessBaggage from "./website/views/ExcessBaggage";
import CollectionServices from "./website/views/CollectionServices";

const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute path="/" exact>
        <Home />
      </PublicRoute>
      <PublicRoute path="/about-us">
        <About />
      </PublicRoute>
      <PublicRoute path="/services" exact>
        <Services />
      </PublicRoute>
      <PublicRoute path="/marketplace">
        <Marketplace />
      </PublicRoute>
      <PublicRoute path="/testimonials">
        <Testimonials />
      </PublicRoute>
      <PublicRoute path="/faqs">
        <FAQs />
      </PublicRoute>
      <PublicRoute path="/contact">
        <Contact />
      </PublicRoute>
      <PublicRoute path="/auth">
        <Auth />
      </PublicRoute>
      <PublicRoute path="/verify-email/:route/:email">
        <VerifyEmail />
      </PublicRoute>
      <PublicRoute path="/forgot-password">
        <ForgotPassword />
      </PublicRoute>
      <PublicRoute path="/shipment-steps">
        <ShipmentSteps />
      </PublicRoute>
      <PublicRoute path="/search-area">
        <SearchArea />
      </PublicRoute>

      <PublicRoute path="/services/by-air">
        <ByAir />
      </PublicRoute>
      <PublicRoute path="/services/by-sea">
        <BySea />
      </PublicRoute>
      <PublicRoute path="/services/online-shopping">
        <OnlineShopping />
      </PublicRoute>
      <PublicRoute path="/services/excess-baggage">
        <ExcessBaggage />
      </PublicRoute>
      <PublicRoute path="/services/collection-services">
        <CollectionServices />
      </PublicRoute>

      <PrivateRoute path="/dashboard">
        <DashboardView />
      </PrivateRoute>
      <PrivateRoute path="/profile">
        <ProfileView />
      </PrivateRoute>
      <PrivateRoute path="/shipment-list/:type">
        <ShipmentListView />
      </PrivateRoute>
      <PrivateRoute path="/users-list/:role">
        <UsersList />
      </PrivateRoute>
      <PrivateRoute path="/user-detail/:id">
        <UserDetail />
      </PrivateRoute>
      <PrivateRoute path="/buynship-form">
        <BuynShip />
      </PrivateRoute>
      <PrivateRoute path="/revenue">
        <RevenueView />
      </PrivateRoute>
      <PrivateRoute path="/shipment-form">
        <ShipmentFormView />
      </PrivateRoute>
      <PrivateRoute path="/shipment-detail/:id">
        <ShipmentDetail />
      </PrivateRoute>
      <PrivateRoute path="/collection-update">
        <CollectionUpdate />
      </PrivateRoute>
      <PrivateRoute path="/shipment-tracking">
        <ShipmentTracking />
      </PrivateRoute>
      <PrivateRoute path="/subscribers">
        <NewsletterList />
      </PrivateRoute>
      <Redirect to="/" exact />
    </Switch>
  </Router>
);

export default AppRouter;
