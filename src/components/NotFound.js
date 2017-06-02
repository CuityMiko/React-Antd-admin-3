import React from 'react';

const style = {
  fontSize : '16px',
  color : '#f04134'
}

class NoteFound extends React.Component { // eslint-disable-line
  render() {
    return (
      <div style={style}>
        404:页面内容不存在，请选择其他菜单项~
      </div>
    );
  }
}

export default NoteFound;
