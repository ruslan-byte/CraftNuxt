export default {
	namespaced: true,
	state: {
		stikerData: {},
		getDataFunc: null,
		isStikerWin: false
	},
	mutations: {
		setStickerData(state, newData)
		{
			state.stikerData = newData;
		},
		setDataFunc(state, newCallback)
		{
			state.getDataFunc = newCallback;
		},
		setStickerWin(state,newVal)
		{
			state.isStikerWin = newVal;
		}
	},
};	