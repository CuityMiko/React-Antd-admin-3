/*
** menuList 菜单列表
** auth:whr
** time:2017.4.6
*/

let menuList = [
  {
    path:'business',
    label:'业务监控',
    icon:'bar-chart',
    child:[
      {
        path:'ctr',
        label:'高CTR',
        child:[]
      },
      {
        path:'channel',
        label:'频道/类目内容',
        child:[]
      },
    ]
  },
  {
    path:'user',
    label:'用户中心',
    icon:'user',
    child:[
      {
        path:'about',
        label:'关于我',
        child:[
          {
            path:'mylog',
            label:'我的记录'
          }
        ]
      },
      {
        path:'seting',
        label:'设置',
        child:[
          {
            path:'info',
            label:'基本信息'
          }
        ]
      }
    ]
  }
];

// 处理路径，给一级路径加上'/',给二级路径加上一级路径
// 例如 一级路径 user --> /user
// 例如 二级路径 user下的about --> /user/about
function addFatherPath(v,i){
	if(v.icon){//一级菜单
		v.path = '/' + v.path;
		if(v.child && v.child.length){
			eachChild(v);
		}
	}
}
function eachChild(v){
	v.child.forEach((vv,ii) => {
		vv.path = v.path + '/' + vv.path;
		if(vv.child && vv.child.length){
			eachChild(vv);
		}
	})
}
menuList.forEach(addFatherPath);

export default menuList

