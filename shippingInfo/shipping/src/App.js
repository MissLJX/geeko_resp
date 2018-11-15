import React from 'react';
import './App.css';
import _ from 'lodash'


import axios from 'axios'

const instance = axios.create({
  baseURL: window.ctx,
  timeout: 50000,
  headers: {
    appVersion: '3.5.8'
  }
})


const getData = () =>  instance.get('/context/anon/get-shipping-policy-info', {}).then(res => res.data).then(data => data.result).catch((e) => {
        console.error(e)
})


// const _shipping_infos = [
//         {
//             "country": {
//                 "label":"ARUBA",
//                 "value":"AW"
//             },
//             "standard": {
//                 "time": "20-60",
//                 "free": "FREE for orders over $59USD"
//             },
//             "expedited":{
//                 "time": "-",
//                 "free": "-"
//             },
//             "express": {
//                 "time": "5-10",
//                 "free": "Calculated by weight and distance"
//             }
//         },
//         {
//             "country": {
//                 "label":"GREENLAND",
//                 "value":"GL"
//             },
//             "standard": {
//                 "time": "20-60",
//                 "free": "FREE for orders over $59USD"
//             },
//             "expedited":{
//                 "time": "-",
//                 "free": "-"
//             },
//             "express": {
//                 "time": "5-10",
//                 "free": "Calculated by weight and distance"
//             }
//         }
//     ]

// const getData = () => new Promise((resolve, reject) => {
//     resolve(_shipping_infos)
// })

const getGroupCountries = (infos) => {
    return _.groupBy(infos, info => (info.country || '').substr(0, 1).toUpperCase())
}



class FilterInpunt extends React.Component {
    render() {
        return (
            <div className="x-filter-input">
                <i className="iconfont">&#xe71c;</i>
                <input placeholder="Please choose your country" value={this.props.ds} onMouseOver={(e) => {this.props.focusHandle(e, true)}} onChange={this.props.filterHandle}/>
            </div>

        )
    }
}

class LiCountry extends React.Component {
    render() {
        return <li onClick={this.props.liClickHandle} className="x-country-li" value={this.props.li.country}>{this.props.li.country}</li>
    }
}

class LiFirstLetter extends React.Component {
    render() {
        return <li className="x-group-letter">{this.props.k}</li>
    }
}


class Lis extends React.Component {
    render() {
        return (
            <React.Fragment>
                <LiFirstLetter key={this.props.k} k={this.props.k}/>
                {

                    this.props.lis.map((v,i) => <LiCountry liClickHandle={this.props.liClickHandle} key={v.country} li={v}/>)
                }
            </React.Fragment>
        )

    }
}


class LiDisplayer extends React.Component {

    render() {
        const groupCountry = getGroupCountries(this.props.infos)

        const sortedKeys = Object.keys(groupCountry).sort()

        return (
            <ul className={'x-countries'+(this.props.isShow ? ' active' : '')}>
                {

                    sortedKeys.map((k) => {
                        return <Lis liClickHandle={this.props.liClickHandle} key={k} k={k} lis={groupCountry[k]}/>
                    })

                }
            </ul>
        )
    }
}

class ShippingCell extends React.Component {
    render() {
        return <td rowSpan={this.props.col || 1}>{this.props.value}</td>
    }
}

class ShippingRow extends React.Component {
    render() {
        return (
            <tr>
                {/*{this.props.isFirst && <ShippingCell col={this.props.col} value={this.props.row.region}/>}*/}
                <ShippingCell value={this.props.row.country}/>
                <ShippingCell value={this.props.row.standard.time}/>
                <ShippingCell value={this.props.row.standard.free}/>
                <ShippingCell value={this.props.row.expedited.time}/>
                <ShippingCell value={this.props.row.expedited.free}/>
                <ShippingCell value={this.props.row.express.time}/>
                <ShippingCell value={this.props.row.express.free}/>
            </tr>
        )
    }
}

class ShippingRows extends React.Component {
    render() {
        const stateGroup = this.props.stateGroup
        const stateKeys = Object.keys(stateGroup).sort()
        const result = stateKeys.map((sk) => {
            let rows = stateGroup[sk]
            return rows.map((row, index) => {
                return <ShippingRow col={rows.length} key={row.country} isFirst={index === 0} row={row}/>
            })
        })
        return result
    }
}


class ShippingTable extends React.Component {
    render() {

        if(!this.props.infos || !this.props.infos.length)
            return <div className="x-shipping-empty"></div>



        const stateGroup = _.groupBy(this.props.infos, info => info.region)

        return (
            <table className="x-shipping-table">
                <thead>
                <tr>
                    {/*<th rowSpan='2'>REGION</th>*/}
                    <th rowSpan='2'>COUNTRY</th>
                    <th colSpan='2'>Standard Shipping</th>
                    <th colSpan='2'>Expedited Shipping</th>
                    <th colSpan='2'>Express Shipping</th>
                </tr>

                <tr className="x-shipping-back-grey">
                    <th>Shipping Time</th>
                    <th>Fee</th>
                    <th>Shipping Time</th>
                    <th>Fee</th>
                    <th>Shipping Time</th>
                    <th>Fee</th>
                </tr>
                </thead>

                <tbody>
                <ShippingRows stateGroup={stateGroup} />
                </tbody>

            </table>



        )
    }
}
class ShippingFilter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            displayValue: '',
            filteredInfos: [],
            filteredDisplyInfos: [],
            infos: [],
            focused: false
        }

        this.changeHandle = this.changeHandle.bind(this)
        this.focusHandle = this.focusHandle.bind(this)
        this.filterHandle = this.filterHandle.bind(this)
        this.liClickHandle = this.liClickHandle.bind(this)



    }


    componentDidMount(){

       

        window.addEventListener('click', (e) => {
            this.setState({focused: false})
        }, false);

        getData().then(_infos => {
            let infos = _infos ? _infos.map( info => ({standard: info.standard, expedited: info.expedited, express: info.express, country: info.country.label}) ) : []
            
            let countries = {}

            if(_infos){
                _.each(_infos, info => {
                    countries[info.country.value] = info.country.label
                })
            }
            

            let searchkey = countries[window.__searchkey__] || ''


            this.setState({
                searchValue: searchkey,
                displayValue: searchkey,
                infos: infos,
                filteredInfos: infos,
                filteredDisplyInfos: searchkey ? infos.filter(p => _.startsWith((p.country || '').toLowerCase(), searchkey.toLowerCase())) :infos
            })
        })
    }


    changeHandle(e) {
        e.preventDefault()
        this.setState({
            searchValue: e.target.value
        })


    }


    focusHandle(event, f){
        event.preventDefault()
        this.setState({
            focused: f,
            searchValue: '',
            filteredInfos: this.state.infos
        })
    }


    filterHandle(e){
        e.preventDefault()
        let f = e.target.value
        this.setState(
            {
                filteredInfos: this.state.infos.filter(p => _.startsWith((p.country||'').toLowerCase(), f.toLowerCase())  ),
                searchValue: f,
                displayValue: f
            }

        )

        if(!f){

            this.setState({
                filteredDisplyInfos: this.state.infos
            })
        }
    }


    liClickHandle(e){
        e.preventDefault()
        let f = e.target.getAttribute('value')
        this.setState(
            {
                filteredDisplyInfos: this.state.infos.filter(p => _.startsWith((p.country||'').toLowerCase(), f.toLowerCase())),
                searchValue: f,
                focused: false,
                displayValue: f
            }
        )

    }


    render() {
        return (
            <div className="x-country-filter">
                <div className="hd" onClick={(e) => { e.nativeEvent.stopImmediatePropagation()}}>
                    <div className="x-filter-putor">
                        <FilterInpunt focused={this.state.focused} sv={this.state.searchValue} ds={this.state.displayValue} changeHandle={this.changeHandle} focusHandle={this.focusHandle} filterHandle={this.filterHandle}/>
                        <LiDisplayer liClickHandle={this.liClickHandle} isShow={this.state.focused} infos={this.state.filteredInfos}/>
                    </div>

                </div>
                <div className="bd">
                    <ShippingTable infos={this.state.filteredDisplyInfos}/>
                </div>

            </div>

        )
    }
}

export default {ShippingFilter}
