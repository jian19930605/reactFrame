import React from 'react';
import {
  connect
} from 'react-redux';
import {
  Prompt
} from 'react-router'
import {
  Layout,
  Breadcrumb,
  Tabs
} from 'antd'
// 富文本编辑器
import CKEDITOR from 'ckeditor'
import store from 'store'
import ExpForm from 'components/ExpForm'
import {
  infoFormfield
} from 'constants/constant'
const {
  Content
} = Layout;
const TabPane = Tabs.TabPane;

function mapStateToProps(state) {
  let {
    expreducer,
    userInfo
  } = state
  return {
    expDetail: expreducer.expDetail,
    userInfo: userInfo
  }
}

class StuIngExp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    CKEDITOR.replace('editor1')
  }
  componentWillUnmount() {
    let editor = CKEDITOR.instances.editor1
    this.saveEditValue(editor)
    console.log(this.refs.expform)
  }
  saveEditValue = (editor) => {
    let key = 'ems_user_bh_' + this.props.userInfo.bh
    let data = editor.getData()
    store.set(key, data)
  }
  setEditValue = () => {
    let key = 'ems_user_bh_' + this.props.userInfo.bh
    let storeText = store.get(key) && store.get(key)
    return {
      __html: storeText
    };
  }
  handleSubmit = (data) => {
    console.log(data)
  }
  callback = (key) => {
    console.log(key)
  }
  render() {
    let expInfo = this.props.location.state.expInfo.fqsy ? this.props.location.state.expInfo.fqsy : {}
    return (
      <Layout style={{minHeight:'100%'}}>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>实验进行中</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
              <Breadcrumb>
                <Breadcrumb.Item>基本信息：</Breadcrumb.Item>
              </Breadcrumb>
              <ExpForm ref="expform" formfield={infoFormfield} formData={expInfo} show={true} submitCallback={this.handleSubmit.bind(this)}>
                  <Breadcrumb>
                    <Breadcrumb.Item>文档记录：</Breadcrumb.Item>
                  </Breadcrumb>
                  <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="Tab 1" key="1">
                        <div  dangerouslySetInnerHTML={this.setEditValue()} />
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                  </Tabs>
                  <Breadcrumb style={{ margin: '20px 0' }}>
                    <Breadcrumb.Item>实验记录：</Breadcrumb.Item>
                  </Breadcrumb>
                  <textarea name="editor1" id="editor1" rows="10" cols="80" ref="editor"></textarea>
              </ExpForm>
            </div>
          </Content>
          <Prompt
            message="你确定要离开吗？"
          />
      </Layout>
    )
  }
}

export default connect(
  mapStateToProps,
  // Implement map dispatch to props
)(StuIngExp)