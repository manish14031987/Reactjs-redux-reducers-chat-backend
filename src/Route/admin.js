import Dashboard from "../Pages/Dashboard";
import Chat from "../Pages/Chat";
import ChatDetail from "../Pages/Chat/detail";
import Permission from "../Pages/Permission";
import Setting from "../Pages/Setting";
import Profile from "../Pages/Profile";
import Password from "../Pages/Password";
import Notification from "../Pages/Notification";

import Email from "../Pages/Email";
import EmailEdit from "../Pages/Email/edit";
import EmailAdd from "../Pages/Email/add";

import CMS from "../Pages/CMS";
import PageEdit from "../Pages/CMS/edit";
import PageAdd from "../Pages/CMS/add";

import Faq from "../Pages/Faq";
import FaqEdit from "../Pages/Faq/edit";
import FaqAdd from "../Pages/Faq/add";

import Customer from "../Pages/Customer";
import CustomerEdit from "../Pages/Customer/edit";
import CustomerAdd from "../Pages/Customer/add";
import CustomerChangePassword from "../Pages/Customer/changePassword";

import Admin from "../Pages/Admin";
import AdminEdit from "../Pages/Admin/edit";
import AdminAdd from "../Pages/Admin/add";
import AdminChangePassword from "../Pages/Admin/changePassword";

import Category from "../Pages/Category";
import CategoryAdd from "../Pages/Category/add";
import CategoryEdit from "../Pages/Category/edit";

import Banner from "../Pages/Banner";
import BannerAdd from "../Pages/Banner/add";
import BannerEdit from "../Pages/Banner/edit";

import Subscription from "../Pages/Subscription";
import SubscriptionAdd from "../Pages/Subscription/add";
import SubscriptionEdit from "../Pages/Subscription/edit";
import SendNotification from "../Pages/SendNotification/add";

import Brand from "../Pages/Brand";
import BrandAdd from "../Pages/Brand/add";
import BrandEdit from "../Pages/Brand/edit";

import Model from "../Pages/Model";
import ModelAdd from "../Pages/Model/add";
import ModelEdit from "../Pages/Model/edit";
import Commission from "../Pages/Commission";
import CommissionAdd from "../Pages/Commission/add";
import CommissionEdit from "../Pages/Commission/edit";

import Coupon from "../Pages/Coupon";
import CouponAdd from "../Pages/Coupon/add";
import CouponEdit from "../Pages/Coupon/edit";

import PostItem from "../Pages/PostItem";
import PostItemCreate from "../Pages/PostItem/add";
import Order from "../Pages/Order";
import ReturnRequest from "../Pages/ReturnRequest";

import Report from "../Pages/Report";
import ReportAdd from "../Pages/Report/add";
import ReportEdit from "../Pages/Report/edit";
import ReportItems from "../Pages/ReportItems";

import DoffoVerify from "../Pages/DoffoVerify";

import DoffoBoostReport from "../Pages/DoffoBoostReport";

import CashOut from "../Pages/CashOut";

const route = [
  {
    id: 1,
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
    title: "Dashboard",
  },
  {
    id: 0,
    path: "/dashboard/permission",
    exact: true,
    name: "Permission",
    component: Permission,
    title: "Permission",
  },
  {
    path: "/setting",
    exact: true,
    name: "Platform Settings",
    component: Setting,
    title: "Platform  Settings",
  },
  {
    path: "/account/profile",
    exact: true,
    name: "My Profile",
    component: Profile,
    title: "My Profile",
  },
  {
    path: "/account/password",
    exact: true,
    name: "Change Password",
    component: Password,
    title: "Change Password",
  },
  {
    path: "/notification",
    exact: true,
    name: "Notification",
    component: Notification,
    title: "Notifications",
  },
  {
    path: "/cms/email",
    exact: true,
    name: "Email Template Management",
    component: Email,
    title: "Email Template Management",
  },
  {
    path: "/cms/email/edit/:id",
    exact: true,
    name: "Update",
    component: EmailEdit,
    title: "Update Email",
  },
  {
    path: "/cms/email/create",
    exact: true,
    name: "Create Email",
    component: EmailAdd,
    title: "Create",
  },
  {
    path: "/cms/page",
    exact: true,
    name: "Page Management",
    component: CMS,
    title: "Page Management",
  },
  {
    path: "/cms/page/edit/:id",
    exact: true,
    name: "Update Page",
    component: PageEdit,
    title: "Update Page",
  },
  {
    path: "/cms/page/create",
    exact: true,
    name: "Create Page",
    component: PageAdd,
    title: "Create Page",
  },
  {
    path: "/cms/faq",
    exact: true,
    name: "FAQ's Management",
    component: Faq,
    title: "FAQ's Management",
  },
  {
    path: "/cms/faq/edit/:id",
    exact: true,
    name: "Update FAQ",
    component: FaqEdit,
    title: "Update",
  },
  {
    path: "/cms/faq/create",
    exact: true,
    name: "Create FAQ",
    component: FaqAdd,
    title: "Create FAQ",
  },
  {
    path: "/users/customer",
    exact: true,
    name: "Customer Management",
    component: Customer,
    title: "Customer Management",
  },
  {
    path: "/users/customer/edit/:id",
    exact: true,
    name: "Update Customer",
    component: CustomerEdit,
    title: "Update Customer",
  },
  {
    path: "/users/customer/create",
    exact: true,
    name: "Create Customer",
    component: CustomerAdd,
    title: "Create Customer",
  },
  {
    path: "/users/customer/change-password/:id",
    exact: true,
    name: "Change Password",
    component: CustomerChangePassword,
    title: "Change Password",
  },
  {
    id: 5,
    path: "/sub-admin",
    exact: true,
    name: "Sub Admin Management",
    component: Admin,
    title: "Sub Admin Management",
  },
  {
    id: 7,
    path: "/sub-admin/edit/:id",
    exact: true,
    name: "Update Sub Admin",
    component: AdminEdit,
    title: "Update Sub Admin",
  },
  {
    id: 6,
    path: "/sub-admin/create",
    exact: true,
    name: "Create Sub Admin",
    component: AdminAdd,
    title: "Create Sub Admin",
  },
  {
    id: 9,
    path: "/sub-admin/change-password/:id",
    exact: true,
    name: "Change Password",
    component: AdminChangePassword,
    title: "Change Password",
  },
  {
    path: "/cms/category",
    exact: true,
    name: "Categories Management",
    component: Category,
    title: "Categories Management",
  },
  {
    path: "/cms/category/edit/:id",
    exact: true,
    name: "Update Category",
    component: CategoryEdit,
    title: "Update Category",
  },
  {
    path: "/cms/category/create",
    exact: true,
    name: "Create Category",
    component: CategoryAdd,
    title: "Create Category",
  },
  {
    path: "/cms/banner",
    exact: true,
    name: "Banners",
    component: Banner,
    title: "Banners",
  },
  {
    path: "/cms/banner/create",
    exact: true,
    name: "Create Banner",
    component: BannerAdd,
    title: "Create Banner",
  },
  {
    path: "/cms/banner/edit/:id",
    exact: true,
    name: "Update Banner",
    component: BannerEdit,
    title: "Update Banner",
  },
  {
    path: "/cms/brand",
    exact: true,
    name: "Brands Management",
    component: Brand,
    title: "Brands Management",
  },
  {
    path: "/cms/brand/edit/:id",
    exact: true,
    name: "Update Brand",
    component: BrandEdit,
    title: "Update Brand",
  },
  {
    path: "/cms/brand/create",
    exact: true,
    name: "Create Brand",
    component: BrandAdd,
    title: "Create Brand",
  },
  {
    path: "/cms/model",
    exact: true,
    name: "Model Management",
    component: Model,
    title: "Model Management",
  },
  {
    path: "/cms/model/edit/:id",
    exact: true,
    name: "Update Model",
    component: ModelEdit,
    title: "Update Model",
  },
  {
    path: "/cms/model/create",
    exact: true,
    name: "Create Model",
    component: ModelAdd,
    title: "Create Model",
  },
  {
    path: "/subscription",
    exact: true,
    name: "Subscriptions",
    component: Subscription,
    title: "Subscriptions",
  },
  {
    path: "/subscription/create",
    exact: true,
    name: "Create Subscription",
    component: SubscriptionAdd,
    title: "Create Subscription",
  },
  {
    path: "/subscription/edit/:id",
    exact: true,
    name: "Update Subscription",
    component: SubscriptionEdit,
    title: "Update Subscription",
  },
  {
    path: "/send-notification",
    exact: true,
    name: "Send Notification",
    component: SendNotification,
    title: "Send Notification",
  },
  {
    path: "/commission",
    exact: true,
    name: "Commission",
    component: Commission,
    title: "Commission",
  },
  {
    path: "/commission/create",
    exact: true,
    name: "Commission",
    component: CommissionAdd,
    title: "Commission",
  },
  {
    path: "/commission/edit/:id",
    exact: true,
    name: "Commission",
    component: CommissionEdit,
    title: "Commission",
  },
  {
    id: 13,
    path: "/coupon",
    exact: true,
    name: "Coupon Management",
    component: Coupon,
    title: "Coupon Management",
  },
  {
    id: 14,
    path: "/coupon/edit/:id",
    exact: true,
    name: "Update Coupon",
    component: CouponEdit,
    title: "Update Coupon",
  },
  {
    id: 14,
    path: "/coupon/create",
    exact: true,
    name: "Create Coupon",
    component: CouponAdd,
    title: "Create Coupon",
  },
  {
    path: "/post-item",
    exact: true,
    name: "Post Item Management",
    component: PostItem,
    title: "Post Item Management",
  },
  {
    path: "/post-item/create",
    exact: true,
    name: "Create Item",
    component: PostItemCreate,
    title: "Create Item",
  },
  {
    path: "/order/listing",
    exact: true,
    name: "Order Management",
    component: Order,
    title: "Order Management",
  },
  {
    path: "/order/return-return",
    exact: true,
    name: "ReturnRequest Management",
    component: ReturnRequest,
    title: "ReturnRequest Management",
  },
  {
    path: "/cms/report",
    exact: true,
    name: "Reports Management",
    component: Report,
    title: "Reports Management",
  },
  {
    path: "/cms/report/edit/:id",
    exact: true,
    name: "Update Report",
    component: ReportEdit,
    title: "Update Report",
  },
  {
    path: "/cms/report/create",
    exact: true,
    name: "Create Report",
    component: ReportAdd,
    title: "Create Report",
  },
  {
    path: "/report-items",
    exact: true,
    name: "Reported Items",
    component: ReportItems,
    title: "Reported Items",
  },
  {
    path: "/doffo-verify",
    exact: true,
    name: "Doffo Verify Request",
    component: DoffoVerify,
    title: "Doffo Verify Request",
  },
  {
    path: "/doffo-boost-report",
    exact: true,
    name: "Doffo Boost Report",
    component: DoffoBoostReport,
    title: "Doffo Boost Report",
  },
  {
    path: "/chat",
    exact: true,
    name: "Chat",
    component: Chat,
    title: "Chat",
  },
  {
    path: "/chat/:room",
    exact: true,
    name: "Chat",
    component: ChatDetail,
    title: "Chat",
  },
  {
    path: "/cash-out-request",
    exact: true,
    name: "CashOut",
    component: CashOut,
    title: "CashOut Request",
  },
];

export default route;
