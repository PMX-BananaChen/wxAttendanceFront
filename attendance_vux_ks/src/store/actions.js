//import 数据 from ''	这里面可以获取数据
import * as data from './data'

export default{
	UPDATE_USERID:({commit})=>{
		commit(data.UPDATE_USERID)
	},
	UPDATE_EMPNO:({commit})=>{
		commit(data.UPDATE_EMPNO)
	},
	UPDATE_YEARMONTH:({commit})=>{
		commit(data.UPDATE_YEARMONTH)
	}
	
}
