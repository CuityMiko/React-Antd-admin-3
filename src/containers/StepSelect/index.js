/*
** StepSelect.js  级联下拉框，最多支持3级级联
** auth:whr
** time:2017.3.23
** selectList、config、form 3属性是必须的，
** 对应action格式为: { payload:{ ranks: { rank0, rank1, rank2 }} }
*/
import { connect } from 'react-redux'
import { channelFormAction } from '../../actions'
import StepSelect from '../../components/StepSelect'

function mapStateToProps(state, ownProps){ //负责输入逻辑
  return {
    ranks: state.channelForm.ranks
  }
}
function mapDispatchToProps(dispatch){ //负责输出逻辑，即将用户对 UI 组件的操作映射成 Action,即发送action
  return {
    dispatchRanks(ranks){
      channelFormAction.payload.ranks = ranks;
      dispatch(channelFormAction)
    }
  }
}
const ContainerStepSelect = connect(mapStateToProps,mapDispatchToProps)(StepSelect);

export default ContainerStepSelect
