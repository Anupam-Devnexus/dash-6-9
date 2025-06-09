import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import './App.css';

// Common components
import Nav from "./Components/Nav/Nav";
import LandingPage from './Components/LandingPage/LandingPage';

// Lazy-loaded pages
const Dashboard = lazy(() => import('./Pages/Dashboard/DashboardPage'));
const Product = lazy(() => import('./Pages/Products/Products'));
const Bids = lazy(() => import('./Pages/Bids/Bid'));
const Enquiry = lazy(() => import('./Pages/Enquiry/Enquiry'));
const Orders = lazy(() => import('./Pages/Orders/Orders'));
const Review = lazy(() => import('./Pages/Review/Review'));
const Brochures = lazy(() => import('./Pages/Brochures/Brochures'));
const Media = lazy(() => import('./Pages/Media/Media'));
const Location = lazy(() => import('./Pages/LocationDirectory/Location'));
const Blog = lazy(() => import('./Pages/Blog/Blog'));
const Portfolio = lazy(() => import('./Pages/Portfolio/Portfolio'))

// Add pages
const AddProduct = lazy(() => import('./Pages/AddProduct/AddProduct'));
const AddReview = lazy(() => import('./Pages/AddReview/AddReview'));
const AddMedia = lazy(() => import('./Pages/AddMedia/AddMedia'));
const AddLocation = lazy(() => import('./Pages/AddLocation/AddLocations'));
const AddBrochures = lazy(() => import('./Pages/AddBrochures/AddBrochures'));
const AddAchievment = lazy(() => import('./Pages/AddAchievment/AddAchievment'));
const AddPortfolio = lazy(() => import('./Pages/AddPortfolio/AddPortfolio'));
// View Brands
const ViewBrands = lazy(() => import('./Pages/AddBrands/ViewBrands'))
const AddBrands = lazy(() => import('./Pages/AddBrands/AddBrands'))


// Edit pages
const EditProduct = lazy(() => import('./Pages/EditProduct/EditProduct'));
const EditReview = lazy(() => import('./Pages/EditReviews/EditR'));
const EditLocation = lazy(() => import('./Pages/EditLocation/EditL'));
const EditBrochure = lazy(() => import('./Pages/EditBrochures/EditB'));
const EditMedia = lazy(() => import('./Pages/EditMedia/EditMedia'))

// Authentication
const Signup = lazy(() => import('./Pages/SignUp/Signup'));
const Login = lazy(() => import('./Pages/LoginSignup/LoginSignupForm'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword/ForgotPassword'));

// Optional pop-up or shared edit components
const ReviewCard = lazy(() => import('./Components/PopUp/EditReview'));

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Nav />

        {/* Main Content Area */}
        <div className="ml-14 lg:ml-36 flex-1 overflow-x-hidden">
          <Suspense fallback={<div className="text-center mt-10">Lazy Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Landing/Dashboard */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />

              {/* Main Sections */}
              <Route path="/admin/products" element={<Product />} />
              <Route path="/admin/bids" element={<Bids />} />
              <Route path="/admin/enquiry" element={<Enquiry />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/review" element={<Review />} />
              <Route path="/admin/brochures" element={<Brochures />} />
              <Route path="/admin/media" element={<Media />} />
              <Route path="/admin/location" element={<Location />} />
              <Route path="/admin/blogs" element={<Blog />} />
              <Route path="/admin/portfolio" element={<Portfolio />} />

              {/* Add Pages */}
              <Route path="/admin/product/addProduct" element={<AddProduct />} />
              <Route path="/admin/review/addReview" element={<AddReview />} />
              <Route path="/admin/media/addMedia" element={<AddMedia />} />
              <Route path="/admin/location/addLocation" element={<AddLocation />} />
              <Route path="/admin/addBrochures" element={<AddBrochures />} />
              <Route path="/admin/dashboard/addAchievment" element={<AddAchievment />} />
              <Route path="/admin/dashboard/viewBrands" element={<ViewBrands />} />
              <Route path="/admin/portfolio/addPortfolio" element={<AddPortfolio />} />
              <Route path="/admin/dashboard/viewBrands/addBrand" element={<AddBrands />} />

              {/* Edit Pages */}
              <Route path="/admin/edit/:productType/:productTitle" element={<EditProduct />} />
              <Route path="/admin/review/:clientname/edit" element={<EditReview />} />
              <Route path="/admin/location/edit-location" element={<EditLocation />} />
              <Route path="/admin/brochures/edit/:id" element={<EditBrochure />} />
              <Route path="/admin/media/edit-media/:id" element={<EditMedia />} />

              {/* Shared/Popup Component */}
              <Route path="/admin/popup/review" element={<ReviewCard />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}


export default App;
