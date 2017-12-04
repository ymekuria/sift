import React, { Component } from 'React';
import store from '../../store';
import { router } from 'react-router';
import { routeActions } from 'react-router-redux';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import Delete from 'material-ui/lib/svg-icons/action/highlight-off';

class DashTable extends Component {
  render() {
    const { paperStyle, svgStyle, iconStyle } = styles;
    const userName = this.props.table.tablename.split("_")[0];
    const tableName = this.props.table.tablename.split("_")[1]

    return (
        <Paper style={paperStyle}  zDepth={2} rounded={false}>
          <div className='dashCardTop'>
            <IconButton onClick={()=>this.props.removeTable(this.props.table.id)}  style={iconStyle}>
              <Delete style={svgStyle}/>
            </IconButton>

            <h5 className='dashCardTableName'>{this.props.table.tablename.split("_")[1].toUpperCase()}</h5>
            </div>

           <div className='endPointView'>
             <div className='dashEndPointLabel'>Endpoint</div><br/>
             <div className='dashEndPoint'>sand/{userName}/{tableName}/</div>
           </div>
          <RaisedButton
          label="View Table" secondary={true}
          onClick={() => {
            store.dispatch({type: 'adding_vis_table',
                              newTable: this.props.table.tablename.split("_")[1] })
            this.props.nav('/vis')}}
          style={{margin: 5,
            position: 'relative',
           bottom: -90}} />
       </Paper>
    )
  }
}
const styles = {
  paperStyle: {
    height: '21.3em',
    width: '19em',
    margin: '1em',
    textAlign: 'center',
    display: 'inline-block',
    marginBottom: '10px'
    //border: '1px solid #C5CAD9',
    //backgroundColor: '#C5CAD9',
  },
  iconStyle: {
    display: 'inline-block',
    float: 'right',
    marginRight: '18px',
    height: '12px',
    width: '12px'
  },
  svgStyle: {
    fontSize: '10px',
    height: '10px',
    width: '1px'
  }
},

export default DashTable;
