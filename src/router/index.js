import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import HelloWorld from '@/components/HelloWorld'

// cookie操作
import {
	setCookie,
	getCookie,
	removeCookie
} from '../utils/cookies';
// 标题语言
import zh_titles from '@/assets/language/zh.json'
import en_titles from '@/assets/language/en.json'
let current_lang = getCookie('lang');
let current_title = '';
switch (current_lang) {
	case 'zh':
		current_title = zh_titles.zh.meta_titles;
		break;
	case 'en':
		current_title = en_titles.en.meta_titles;
		break;
}
// 底部导航
import public_model from '@/page/public_model'
import home from '@/page/home/home'
import user from '@/page/user/user'

// 邀请有奖
import invite_a_prize from '@/page/invite_a_prize'
import rules_of_activity from '@/page/rules_of_activity'
import invitation_register from "@/page/invitation/invitation_register"

// 订单
import order from '@/page/order/order'
import order_details from '@/page/order/order_details'
import refund from '@/page/order/refund'
import refund_details from '@/page/order/refund_details'
import distribution_details from '@/page/order/distribution_details'

// 首页
import select_address from '@/page/home/select_address'
import seller_list from '@/page/home/seller_list'
import seller_search from '@/page/home/seller_search'
// 用户协议
import service_agreement from '@/page/service_agreement'

// 登录注册
import login from '@/page/user/login'
import register from '@/page/user/register'
import forget from '@/page/user/forget'
import retrieve_password from '@/page/user/retrieve_password'

// 我的
import balance from '@/page/user/my_balance/balance'
import balance_details from '@/page/user/my_balance/balance_details'
import account from '@/page/user/account'
import set_pass from '@/page/user/account/set_pass'
import set_payment from '@/page/user/account/set_payment'
import feedback from '@/page/user/feedback'
import notice from '@/page/user/notice'
import notice_detail from '@/page/user/notice_detail'
import merchant_entry from '@/page/user/merchant_entry'

// 我的地址
import address_list_test from '@/page/home/address_list_test'

import address_list from '@/page/my_address/address_list'
import add_address from '@/page/my_address/add_address'
import address_map from '@/page/my_address/address_map'
import phone_area from '@/page/my_address/phone_area'

// 我的评价
import my_evaluate from '@/page/evaluate/my_evaluate'
import evaluate from '@/page/evaluate/evaluate'

// 我的优惠券
import platform_coupon from '@/page/coupon/platform_coupon'
import coupon_records from '@/page/coupon/coupon_records'

// 首页优惠券
import home_coupon from "@/page/home/home_coupon"

// 购物车
import shopping_car from "@/page/shopping_car"
import coupon from "@/page/coupon"

// 提交订单
import submit_order from "@/page/submit_order"
import order_address from "@/page/order_address"

//支付
import selectPayMethod from "@/page/order/selectPayMethod"

Vue.use(Router)

const routes = [{
	path: '/HelloWorld',
	name: 'HelloWorld',
	component: HelloWorld,
	meta: {
		title: 'HelloWorld'
	}
},
{
	path: '/',
	name: 'public_model',
	component: public_model,
	redirect: '/home',
	children: [{
		path: 'home',
		name: 'home',
		component: home,
		meta: {
			title: current_title.all
		}
	},
	{
		path: 'order',
		name: 'order',
		component: order
	},
	{
		path: 'user',
		name: 'user',
		component: user
	}

	]
},
{
	path: '/invite_a_prize',
	name: 'invite_a_prize',
	component: invite_a_prize
},
{
	path: '/rules_of_activity',
	name: 'rules_of_activity',
	component: rules_of_activity
},
{
	path: '/platform_coupon',
	name: 'platform_coupon',
	component: platform_coupon
},
{
	path: '/coupon_records',
	name: 'coupon_records',
	component: coupon_records
},
{
	path: '/login',
	name: 'login',
	component: login
},
{
	path: '/register',
	name: 'register',
	component: register
},
{
	path: '/service_agreement',
	name: 'service_agreement',
	component: service_agreement
},
{
	path: '/forget',
	name: 'forget',
	component: forget
},
{
	path: '/retrieve_password',
	name: 'retrieve_password',
	component: retrieve_password
},
{
	path: '/balance',
	name: 'balance',
	component: balance
},
{
	path: '/balance_details/:id',
	name: 'balance_details',
	component: balance_details
},
{
	path: '/account',
	name: 'account',
	component: account
},
{
	path: '/notice',
	name: 'notice',
	component: notice
},
{
	path: '/notice_detail',
	name: 'notice_detail',
	component: notice_detail
},
{
	path: '/set_pass/:id',
	name: 'set_pass',
	component: set_pass
},
{
	path: '/set_payment/:id',
	name: 'set_payment',
	component: set_payment
},
{
	path: '/feedback',
	name: 'feedback',
	component: feedback
},
{
	path: '/merchant_entry',
	name: 'merchant_entry',
	component: merchant_entry
},
{
	path: '/select_address',
	name: 'select_address',
	component: select_address
},
{
	path: '/address_list_test',
	name: 'address_list_test',
	component: address_list_test
},
{
	path: '/address_list',
	name: 'address_list',
	component: address_list
},
{
	path: '/add_address',
	name: 'add_address',
	component: add_address
},
{
	path: '/phone_area',
	name: 'phone_area',
	component: phone_area
},
{
	path: '/address_map',
	name: 'address_map',
	component: address_map
},
{
	path: '/my_evaluate',
	name: 'my_evaluate',
	component: my_evaluate
},
{
	path: '/evaluate',
	name: 'evaluate',
	component: evaluate
},
{
	path: '/seller_list',
	name: 'seller_list',
	component: seller_list
},
{
	path: '/seller_search',
	name: 'seller_search',
	component: seller_search
},
{
	path: '/home_coupon',
	name: 'home_coupon',
	component: home_coupon
},
{
	path: '/shopping_car',
	name: 'shopping_car',
	component: shopping_car
},
{
	path: '/coupon',
	name: 'coupon',
	component: coupon
},
{
	path: '/order_details',
	name: 'order_details',
	component: order_details
},
{
	path: '/refund',
	name: 'refund',
	component: refund
},
{
	path: '/refund_details',
	name: 'refund_details',
	component: refund_details
},
{
	path: '/distribution_details',
	name: 'distribution_details',
	component: distribution_details
},
{
	path: '/business_shop',
	name: 'business_shop',
	component: resolve => require(['@/page/shop/index.vue'], resolve), //商家店铺
	children: [{
		path: '/shop_menu',
		name: 'shop_menu',
		component: resolve => require(['@/page/shop/shop_menu.vue'], resolve) //菜单
	},
	{
		path: '/shop_comment',
		name: 'shop_comment',
		component: resolve => require(['@/page/shop/shop_comment.vue'], resolve) //评论
	},
	{
		path: '/shop_aptitude',
		name: 'shop_aptitude',
		component: resolve => require(['@/page/shop/shop_aptitude.vue'], resolve) //资质
	},
	]
},
{
	path: '/shop_detail',
	name: 'shop_detail',
	component: resolve => require(['@/page/shop/shop_detail'], resolve) //商家店铺详情
},
{
	path: '/shop_search',
	name: 'shop_search',
	component: resolve => require(['@/page/shop/shop_search'], resolve) //商家店铺搜索
},
{
	path: '/shop_platform',
	name: 'shop_platform',
	component: resolve => require(['@/page/shop/shop_platform'], resolve) //商家店铺优惠券
},
{
	path: '/submit_order',
	name: 'submit_order',
	component: submit_order
},
{
	path: '/order_address',
	name: 'order_address',
	component: order_address
},
{
	path: '/invitation_register', // 邀请有奖注册
	name: 'invitation_register',
	component: invitation_register,
	meta: {
		title: current_title.invitation_register
	}
},
{
	path: '/selectPayMethod',
	name: 'selectPayMethod',
	component: selectPayMethod
}
]

const router = new Router({
	mode: 'history',
	base: '/h5/',
	routes
});

router.beforeEach((to, from, next) => {

	if (from.name == 'business_shop') {
		store.state.from_seller = true;
	} else {
		store.state.from_seller = false;
	}

	let obj = {
		userName: '',
		sex: 0,
		phoneNumber: '',
		room: '',
		phoneArea: '63',
		add_address: {
			address: '',
			locPos: {
				lat: '',
				lng: ''
			}
		}
	}
	// 当不为这三个路由 则清空store中的数据
	if (!(to.name == 'phone_area') && !(to.name == 'address_map') && !(to.name == 'add_address')) {
		// store.state.userInfo = obj
		sessionStorage.setItem('userInfo', JSON.stringify(obj))
	}
	if (!(to.name == 'business_shop') && !(to.name == 'shop_comment') && !(to.name == 'shop_aptitude') &&
		!(to.name == 'shop_detail') && !(to.name == 'shop_search') && !(to.name == 'login') && !(to.name == 'submit_order') && !(to.name == 'phone_area')) {
		// store.state.userInfo = obj
		localStorage.setItem('cartList', JSON.stringify([]))
	}
	if (!(to.name == 'feedback') && !(to.name == 'phone_area')) {
		sessionStorage.setItem('advice', '')
	}
	if (!(to.name == 'submit_order') && !(to.name == 'coupon')) {
		store.state.select_coupon = {
			money: '',
			id: '',
			activityType: '',
			showCoupon: false
		}
	}
	if (!(to.name == 'add_address') && !(to.name == 'address_map')) {
		localStorage.removeItem("no_yet_save_city");
		localStorage.removeItem("no_yet_save_addr");
	}
	if (to.meta.requireAuth) {

	} else {
		next();
	}
})

export default router;
