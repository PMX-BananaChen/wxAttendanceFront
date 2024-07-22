import {
	UPDATE_USERID,
	UPDATE_EMPNO,
	UPDATE_YEARMONTH
} from './data'

const state={
	userId:'',
	empNo:'',
	yearMonth:''
};


const mutations={
	/*userId*/
	[UPDATE_USERID](state,type){
		state.userId=type;
	},
	/*empNo*/
	[UPDATE_EMPNO](state,type){
		state.empNo=type;
	},
	/*yearMonth*/
	[UPDATE_YEARMONTH](state,type){
		state.yearMonth=type;
	}
};

const getters={
	userId(state){
		return state.userId;
	},
	empNo(state){
		return state.empNo;
	},
	yearMonth(state){
		return state.yearMonth;
	}
};

export default{
	state,
	mutations,
	getters
}