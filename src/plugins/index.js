import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import{ 
Form,
Button,
Select,
FormItem,
Input,
Message,
Container,
Header,
Aside,
Main,
Menu,
Submenu,
MenuItem,
Breadcrumb,
BreadcrumbItem,
Card,
Row,
Col,
Table,
TableColumn,
Switch,
Tooltip,
Pagination,
Dialog,
MessageBox
} from 'element-ui'

//注册为全局组件，在哪里都可以使用
Vue.use(Form)
Vue.use(Button)
Vue.use(Select)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
