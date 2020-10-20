import React from 'react';
import './App.css';
import _ from 'lodash'

import {addLocaleData, IntlProvider, FormattedMessage} from 'react-intl'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import fr from 'react-intl/locale-data/fr'
import es from 'react-intl/locale-data/es'
import pt from 'react-intl/locale-data/pt'
import sv from 'react-intl/locale-data/sv'
import da from 'react-intl/locale-data/da'
import nb from 'react-intl/locale-data/nb'
import is from 'react-intl/locale-data/is'
import fi from 'react-intl/locale-data/fi'

import de_L from './i18n/de'
import fr_L from './i18n/fr'
import es_L from './i18n/es'
import pt_L from './i18n/pt'
import en_L from './i18n/en'
import sv_L from './i18n/sv'
import da_L from './i18n/da'
import nb_L from './i18n/nb'
import is_L from './i18n/is'
import fi_L from './i18n/fi'




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

                
                <span className="x-filter-title"><FormattedMessage id="shipping_to"/>:</span> <FilterGSelect searchValue={this.props.searchValue} selectHandle={this.props.selectHandle} infos ={this.props.infos}/>
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


class FilterGSelect extends React.Component{

    render(){
        const groupCountry =  getGroupCountries(this.props.infos)
        const sortedKeys = Object.keys(groupCountry).sort()

    
        return <select value={this.props.searchValue} className="x-filter-select" onChange={this.props.selectHandle}>
            {
                sortedKeys.map(k => <optgroup label={k} key={k}>
                    {
                        groupCountry[k].map(info => <option value={info.country} key={info.country}>{info.country}</option>)
                    }
                </optgroup>)
            }
        </select>
    }
}

class ShippingCell extends React.Component {
    render() {
        return <td rowSpan={this.props.col || 1}>{this.props.value}</td>
    }
}

class ShippingRow extends React.Component {
    render() {
        const {row} = this.props
        return (
            <tr>
                <td>{row.label}</td>
                <td>{row.time}</td>
                <td>{row.free}</td>
            </tr>
        )
    }
}

class ShippingRows extends React.Component {
    render() {
        const infos = this.props.infos
        return infos.map(info => (
            <React.Fragment key={info.country}>
                {this.props.hasStandard && <ShippingRow row={{...info.standard}}/>}
                {this.props.hasExpedited && <ShippingRow row={{...info.expedited}}/>}
                {this.props.hasExpress && <ShippingRow row={{...info.express}}/>}
            </React.Fragment>
        ))
    }
}


class ShippingTable extends React.Component {
    render() {

        if(!this.props.infos || !this.props.infos.length)
            return <div className="x-shipping-empty"></div>



        const infos = this.props.infos

        const hasStandard = _.find(this.props.infos, info => !!info.standard)
        const hasExpedited = _.find(this.props.infos, info => !!info.expedited)
        const hasExpress = _.find(this.props.infos, info => !!info.express)

        return (
            <table className="x-shipping-table" style={{width:'100%'}}>
                <tbody>
                <tr>
                        <td><FormattedMessage id="shipping_method"/></td>
                        <td><FormattedMessage id="shipping_time"/></td>
                        <td><FormattedMessage id="costs"/></td>
                    </tr>

                <ShippingRows hasStandard={hasStandard} hasExpedited={hasExpedited} hasExpress={hasExpress} infos={infos} />

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

       

        getData().then(_infos => {

            _infos.push({
                country: {
                    label: 'Country/Region',
                    value:'-'
                },
                standard:{
                    free:'-',
                    time:'-',
                    label:'-'
                }
            })

            let infos = _infos ? _infos.map( info => ({standard: info.standard, expedited: info.expedited, express: info.express, country: info.country.label}) ) : []
            
            let countries = {}

            if(_infos){
                _.each(_infos, info => {
                    countries[info.country.value] = info.country.label
                })
            }
            

            let searchkey = countries[window.__searchkey__] || countries['-']


            this.setState({
                searchValue: searchkey,
                displayValue: searchkey,
                infos: infos,
                filteredInfos: infos,
                filteredDisplyInfos: searchkey ? infos.filter(p => p.country.toLowerCase() === searchkey.toLowerCase()) :infos
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


    selectHandle(e){
        e.preventDefault()
        let f = e.target.value
        const {infos} = this.state
        this.setState(
            {
                filteredDisplyInfos: f ? infos.filter(p => p.country.toLowerCase() === f.toLowerCase()) :infos,
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
                        <FilterInpunt searchValue={this.state.searchValue} selectHandle={ this.selectHandle.bind(this)} infos={this.state.infos}/>
                    </div>

                </div>
                <div className="bd">
                    <ShippingTable infos={this.state.filteredDisplyInfos}/>
                </div>

            </div>

        )
    }
}



addLocaleData([...en, ...fr, ...de, ...pt, ...es, ...sv, ...da, ...nb, ...is, ...fi])

const messages = {}

const lang = (window.lang || 'en').substring(0, 2)

messages['en'] = en_L

messages['de'] = de_L
messages['fr'] = fr_L

messages['es'] = es_L
messages['pt'] = pt_L

messages['sv'] = sv_L
messages['da'] = da_L
messages['nb'] = nb_L
messages['is'] = is_L
messages['fi'] = fi_L

const IntlFilter = () => {
    return <IntlProvider locale={lang} messages={messages[lang]}>
        <ShippingFilter/>
    </IntlProvider>
}

export default IntlFilter
