import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators,Dispatch} from 'redux'
import '../home/css/home.less'
import * as TodoAction from '../../actions'
import {storeType,initUser} from '../../reducer/types'
import {Editor, EditorState, RichUtils} from 'draft-js'

interface Iprops{
    history:any,
    actions:{
        editContent:any
    },
    initUser:initUser,
    editData:any
}
interface IState{
    // a:string
    editorState:EditorState
}
interface content{
    id:string,
    content:string,
    children:any
}

class Home extends PureComponent<Iprops,IState>{
    constructor(props:Iprops){
        super(props)
        this.state={
            editorState:EditorState.createEmpty()
        }
        this.onChange = this.onChange.bind(this)
        this.handleKeyCommand = this.handleKeyCommand.bind(this)
    }
    componentDidMount(){
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {url: 'http://www.zombo.com'}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        console.log(entityKey,contentState)
        // const contentStateWithLink = Modifier.applyEntity(
        // contentStateWithEntity,
        // selectionState,
        // entityKey
        // );
    }
    onChange(editorState:EditorState){
        // console.log(editorState)
        this.setState({editorState})
    }
    handleKeyCommand(command:string){
        // console.log(command)
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
            return 'not-handled';
    }
    render(){
        const {editData,actions:{editContent}} = this.props
        return(
            <div className='contentBody'>
                <Editor 
                    editorState={this.state.editorState} 
                    onChange={this.onChange} 
                    handleKeyCommand={this.handleKeyCommand}
                />
            </div>
        )
    }
}
function mapStateToProps (state:storeType) {
    const {initUser,editData} = state
    return {initUser,editData}
}
function mapDispatchProps (dispatch:Dispatch):any {
    return{
        actions:bindActionCreators(TodoAction,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchProps
)(Home)