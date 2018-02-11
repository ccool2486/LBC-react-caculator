import React from 'react'
import Display from './Display'
import ButtonPanel from './ButtonPanel'
import calculate from '../logic/calculate' // 計算機核心functions
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: null,
      next: null,
      operation: null,
    }
  }

  handleClick = (buttonName) => {
    this.setState(calculate(this.state, buttonName))
  }

  render() {
    return (
      <div className="component-app">
        <Display // 上面那塊灰色的顯示現在數字的地方 
          value={this.state.next || this.state.total || '0'} //要麻輸出next, 要麻total, 要麻就是0
        />
        <ButtonPanel // 按鈕區
          clickHandler={this.handleClick}
        />
      </div>
    )
  }
}
export default App
