import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRobotMsg , insertUserMsg} from "../../redux/actions/robot";

import './style.scss';
import ChatHeader from '../../components/ChatHeader';
import ChatItem from '../../components/ChatItem';
import InputArea from '../../components/InputArea';
import {
	toNomalTime
} from "../../utils/transformTime";

class Robot extends Component {
        constructor(){
            super();
            this.state = {
                time: toNomalTime(Date.parse(new Date()) / 1000),
                inputMsg: "",
                userInfo: {
                    avatar: 'http://ooytyiziz.bkt.clouddn.com/people1.jpg',
                    name: '吃瓜群众'
                },
                robotRequestQuery:{},
                isScrollToBottom: true
            }
        }
		refresh() {
			setTimeout(() => {
				window.scrollTo(0, document.body.scrollHeight + 10000)
			}, 0)
        }
        componentDidMount(){
            setTimeout(() => {
                this.refresh();
            }, 200)
        }
        sendMessage =  async (value) => {
            this.setState({
                inputMsg: value
            },()=>{
                console.log(' this.state.inputMsg', this.state.inputMsg);
                this.props.insertUserMsg(
                    { message: this.state.inputMsg }
                );

                this.props.getRobotMsg(
                    {
                        "key":"92febb91673740c2814911a6c16dbcc5",
                        "info":this.state.inputMsg
                    }
                )
            })

        }

        render() {
            console.log("this.props.state.robot", this.props.state.robot)
            console.log('this.state', this.state);
            const listItems = this.props.state.robot.map((msg,index) =>
                 <li key={index}>
                 {msg.user && <ChatItem  img="http://ooytyiziz.bkt.clouddn.com/robot.gif" msg={msg.message} name={msg.user} time={this.state.time} />}
                 {!msg.user && <ChatItem me="true" img={this.state.userInfo.avatar}  msg={msg.message} name={this.state.userInfo.name} time={this.state.time} />}
              </li>
            );
            return (
                    <div className="robot-wrapper">
                        <ChatHeader title="机器人聊天"/>
                        <ul>
                            {listItems}
                        </ul>
                        <InputArea sendMessage={this.sendMessage}/>
                    </div>
            )
       }
}

export default connect(state => ({
    state: state
  }), {
    getRobotMsg,
    insertUserMsg
  })(Robot);