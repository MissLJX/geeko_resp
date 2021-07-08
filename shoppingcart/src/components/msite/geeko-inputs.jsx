import React, { useEffect, useState, useRef, useLayoutEffect, createRef } from 'react'
import styled from 'styled-components'
import { form, control, button } from 'react-validation'
import { getCountries, getStates, getCites, getCityByZip } from '../../api'
import _ from 'lodash'

const InputContainer = styled.div`
    border: 0;
    display: inline-flex;
    padding: 0;
    position: relative;
    min-width: 0;
    flex-direction: column;
    vertical-align: top;
    width: 100%;
`

const Label = styled.label`
    top: 0;
    left: 0;
    position: absolute;
    transform: translate(0, 24px) scale(1);
    font-size: 14px;
    transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    transform-origin: top left;
    color: #999999;
    &.focused{
        transform: translate(0, 1.5px) scale(0.85);
    }
    &+div{
        margin-top: 16px;
    }
    &.__error{
        color: #E64545;
    }
`

const InputWrapper = styled.div`
    position: relative;
    cursor: text;
    display: inline-flex;
    position: relative;
    align-items: center;
    box-sizing: border-box;

    &::before{
        left: 0;
        right: 0;
        bottom: 0;
        content: "\00a0";
        position: absolute;
        transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        border-bottom: 1px solid #e6e6e6;
        pointer-events: none;
    }

    &::after{
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        position: absolute;
        transform: scaleX(0);
        transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
        border-bottom: 2px solid #1976d2;
        pointer-events: none;
    }

    &.focused::after{
        transform: scaleX(1);
    }

    &.__error::after{
        border-bottom: 2px solid #E64545;
        transform: scaleX(1);
    }

    & > input, & > select{
        font: inherit;
        color: currentColor;
        width: 100%;
        border: 0;
        margin: 0;
        display: block;
        padding: 6px 0 7px;
        min-width: 0;
        background: none;
        box-sizing: content-box;
        animation-name: mui-auto-fill-cancel;
        letter-spacing: inherit;
        animation-duration: 10ms;
        -webkit-tap-highlight-color: transparent;
    }

    & > select{
        border: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url(https://image.geeko.ltd/site/pc/icon137.png) no-repeat scroll calc(100% - 10px) center transparent;
        box-shadow: none;
        cursor: pointer;
    }
`



const ERROR = styled.div`
    font-size: 12px;
    color: #E64545;
    margin-top: 2px;
`

const MASK = styled.div`
    position: fixed;
    z-index: 10;
    background-color: rgba(0, 0, 0, .4);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    margin-top: 0 !important;
`

const SELECTALTER = styled.div`
    position: fixed;
    z-index: 11;
    background-color: #fff;
    height: 90%;
    max-height: calc(100% - 80px);
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: auto;
`

const OPTIONCONTAINER = styled.div`
    position: relative;
    display: flex;
`

const OPTIONASIDE = styled.div`
    position: absolute;
    position: sticky;
    left: 0;
    top: 0;
    width: 18px;
    padding-right: 16px;
   

    & > span{
        display: block;
        cursor: pointer;
        text-decoration: none;
        width: 18px;
        height: 18px;
        cursor: pointer;
        text-align: center;
        line-height: 18px;
        color: #999;
        &.active{
            background-color: #e64545;
            border-radius: 50%;
            color: #fff;
        }
    }
`

const OPTIONBODY = styled.div`
    flex: 1;
`

const OPTIONS = styled.ul`
    padding-left: 16px;
    & > li{
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #eee;
        position: relative;
        &.selected{
            font-family: 'SlatePro-Medium';
            color: #000;
            &::after{
                content: '\\e638';
                display: inline-block;
                position: absolute;
                right: 0;
                top: 2px;
                font-family: iconfont;
            }
        }
    }
`

const GROUPHEAD = styled.div`
    height: 24px;
    padding-left: 16px;
    color: #666666;
    text-transform: uppercase;
    line-height: 24px;
    background-color: #f7f7f7;
`

const OPTIONPICKER = styled.div`
    height: 100%;
    & > .__hd{
       height: 136px;
       & > .__title{
           height: 47px;
           text-align: center;
           font-size: 16px;
           line-height: 47px;
       }

       & > .__search{
            height: 34px;
            background-color: #f6f6f6;
            display: flex;
            margin-left: 12px;
            margin-right: 12px;
            & > .__icon{
                font-family: 'iconfont';
                font-size: 15px;
                text-align: center;
                line-height: 34px;
                flex-shrink: 0;
                display: inline-block;
                width: 32px;
            }
            & > .__input{
                border: none;
                outline: none;
                box-shadow: none;
                width: 100%;
                height: 100%;
                background: transparent;
            }
       }

       & > .__menu{
           height: 55px;
           display: flex;
           justify-content: space-around;
           align-items: center;
           & > span{
               cursor: pointer;
               display: inline-block;
               position: relative;
               text-align: center;

               &::before{
                   content: '\\e690';
                   display: inline-block;
                   position: absolute;
                   left: -5px;
                   top: 2px;
                   font-family: iconfont;
                   color: #999;
               }

               &:first-child{
                   &::before{
                       content: '';
                   }
               }
           }
       }
    }

    & > .__bd{
        height: calc(100% - 136px);
        overflow: auto;
    }
`



export const Input = control(({ error, isChanged, isUsed, divStyle, ...props }) => {
    const [focused, setFocused] = useState(false)
    const label = props.label || props.renderLabel()
    return <InputContainer>
        <Label className={`${(focused || props.value || props.placeholder) ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>{label}</Label>
        <InputWrapper className={`${focused ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>
            <input {...props} autoComplete="no" onFocus={(evt) => {
                setFocused(true)
                props.onFocus(evt)
            }} onBlur={(evt) => {
                setFocused(false)
                props.onBlur(evt)
            }} />
        </InputWrapper>
        {isChanged && isUsed && !!error && <ERROR className="ErrorMsg">{error}</ERROR>}
    </InputContainer>
})


export const Select = control(({ error, isChanged, isUsed, divStyle, ...props }) => {
    const [focused, setFocused] = useState(false)
    const label = props.label || props.renderLabel()
    return <InputContainer>
        <Label className={`${(focused || props.value || props.placeholder) ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>{label}</Label>
        <InputWrapper className={`${focused ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>
            <select {...props} onFocus={(evt) => {
                setFocused(true)
                props.onFocus(evt)
            }} onBlur={(evt) => {
                setFocused(false)
                props.onBlur(evt)
            }} />
        </InputWrapper>
        {isChanged && isUsed && !!error && <ERROR className="ErrorMsg">{error}</ERROR>}
    </InputContainer>
})


export const GountrySelect = control(({ error, isChanged, isUsed, divStyle, ...props }) => {
    const [focused, setFocused] = useState(false)
    const [showOption, setShowOption] = useState(false)
    const label = props.label || props.renderLabel()
    return <React.Fragment>
        <InputContainer onClick={evt => { setShowOption(true); evt.preventDefault(); }}>
            <Label className={`${(focused || props.value || props.placeholder) ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>{label}</Label>
            <InputWrapper className={`${focused ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>
                <select {...props} style={{pointerEvents:'none'}} onFocus={(evt) => {
                    setFocused(true)
                    props.onFocus(evt)
                }} disabled onBlur={(evt) => {
                    setFocused(false)
                    props.onBlur(evt)
                }} />
            </InputWrapper>
            {isChanged && isUsed && !!error && <ERROR className="ErrorMsg">{error}</ERROR>}
        </InputContainer>
        {
            showOption && <React.Fragment>
                <MASK onClick={evt => { setShowOption(false) }} />
                <SELECTALTER>
                    <CountryInfoPicker step={props.step || 0} onClose={() => {setShowOption(false)}} country={props.country} state={props.state} city={props.city} onSelect={props.onSelect}/>
                </SELECTALTER>
            </React.Fragment>
        }


    </React.Fragment>
})

const CountryList = props => {
    const { options = [], selectedOption, onSelect, filter, step } = props
    const groupedOptions = _.groupBy(options.filter( o=> o.label.indexOf(filter) >=0 ), c => c.label.substr(0, 1).toUpperCase())
    const keys = Object.keys(groupedOptions).sort()
    const [option, setOption] = useState({})
    const [key, setKey] = useState()

    useEffect(() => {
        setOption(selectedOption || {})
    }, [selectedOption])

    useEffect(() => {
        setKey()
    }, [options])

    const refs = keys.reduce((acc, value) => {
        acc[value] = React.createRef()
        return acc
    }, {})
     
    const handleClick = k => {
        setKey(k)
        refs[k].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const handleSelect = option => {
       setOption(option)
       onSelect(option)
    }

    

    return <OPTIONCONTAINER>
        <OPTIONBODY>
            {
                keys.map(k => <div key={k}>
                    <GROUPHEAD innerRef={refs[k]} id={k}>{k}</GROUPHEAD>
                    <OPTIONS>
                        {
                          (groupedOptions[k] || []).map(op => <li className={`${op.value === option.value?'selected':''}`} onClick={() => {handleSelect(op)}} key={op.value}>
                              {op.label}
                          </li>)
                        }
                    </OPTIONS>
                </div>)
            }
        </OPTIONBODY>

        <div style={{
            flexShrink: 0,
            paddingRight: 12,
            paddingLeft: 12,
        }}>
            <OPTIONASIDE>
                {
                    keys.map(k => <span className={`${k === key?'active':''}`} onClick={() => {handleClick(k)}} key={k}>{k}</span>)
                }
            </OPTIONASIDE>
        </div>
    </OPTIONCONTAINER>
}

const CountryInfoPicker = React.memo(props => {
    const [step, setStep] = useState(props.step || 0)
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [filter, setFilter] = useState('')
    const [country, setCountry] = useState()
    const [state, setState] = useState()
    const [cities, setCities] = useState()
    const [city, setCity] = useState()
    const [triggeCountry, setTriggeCountry] = useState(false)
    const [triggeState, setTriggeState] = useState(false)
    const [triggeCity, setTriggeCity] = useState(false)

    const bdref = useRef()

    useEffect(() => {
        getCountries().then(data => data.result).then(countries => {
            setCountries(countries)
            setCountry((countries||[]).find(c => c.value === (props.country || 'US')))
        })
    }, [])

    useEffect(() => {
        setCountry((countries||[]).find(c => c.value === (props.country || 'US')))

        const statePromise = getStates(props.country).then(data => data.result)
        const citeyPromise = getCites(props.country, props.state).then(data => data.result)

        Promise.all([statePromise,  citeyPromise]).then(values => {
            const [nStates, nCities] = values
            const pCities = (nCities || []).map(c => ({...c, label: c.name, value: c.name}))
            const pStates = nStates || []
            setState(pStates.find(s => s.value === props.state))
            setCity(pCities.find(c => c.value === props.city))
            setStates(pStates)
            setCities(pCities)
            if(triggeCountry){
                if(pStates && pStates.length){
                    setStep(step+1)
                }else{
                    props.onClose()
                }
                setTriggeCountry(false)
            }
        })
       
    }, [props.country])

    useEffect(() => {
        setState((states || []).find(s => s.value === props.state))
        getCites(props.country,props.state).then(data => data.result).then(cts => {
            setCities((cts || []).map( c => ({...c, label: c.name, value: c.name})))
            if(triggeState){
                if(cts && cts.length){
                    setStep(step+1)
                }else{
                    props.onClose()
                }
                setTriggeState(false)
            }
        })
    }, [props.state])

    useEffect(() => {
        if(triggeCity){
            props.onClose()
            setTriggeCity(false)
        }
    }, [props.city])

    const changeHandle = _.debounce(evt => {
        setFilter(evt.target.value)
    }, 400)


    const infoChange = (option, name) => {
        let scountry = country? country.value: ''
        let sstate = state? state.value: ''
        let scity = city? city.value: ''
        switch(name){
            case 'country':
                scountry = option.value
                setTriggeCountry(true)
                break
            case 'state':
                sstate = option.value
                setTriggeState(true)
                break
            case 'city':
                scity = option.value
                setTriggeCity(true)
                break
        }
        props.onSelect(scountry, sstate, scity, option.zipCodes)
    }

    const getOptionRender = s => {
        if(s === 0){
            return  <CountryList onSelect={option => infoChange(option, 'country')} filter={filter} selectedOption={country} options={countries} />
        }else if(s === 1){
            return  <CountryList onSelect={option => infoChange(option, 'state')} filter={filter} selectedOption={state} options={states} />
        }else if(s === 2){
            return  <CountryList onSelect={option => infoChange(option, 'city')} filter={filter} selectedOption={city} options={cities} />
        }
    }

    const stepClickHandle = s => {
        setStep(Number(s))
    }

    useLayoutEffect(() => {
        bdref.current.scrollTo(0, 0)
    }, [
        step
    ])


    return <OPTIONPICKER>
        <div className="__hd">
            <div className="__title">Country/Region</div>
            <div className="__search">
                <span className="__icon">&#xe772;</span>
                <input className="__input" onChange={changeHandle}/>
            </div>
            <div className="__menu">
                <span onClick={() => {stepClickHandle(0)}} style={{width: '50%'}}>
                    <span style={{color: step===0?'#e64545':'#999'}}>{country?country.label:'Country'}</span>
                </span>
                {
                    states && states.length > 0 && <span onClick={() => {stepClickHandle(1)}} style={{width: '50%'}}>
                        <span style={{color: step===1?'#e64545':'#999'}}>{state?state.label:'State/Province'}</span>
                    </span>
                }

                {
                    cities && cities.length > 0 && <span onClick={() => {stepClickHandle(2)}} style={{width: '50%'}}>
                        <span style={{color: step===2?'#e64545':'#999'}}>{city?city.label:'City'}</span>
                    </span>
                }
            </div>
        </div>
        <div ref={bdref} className="__bd">
            <div>
                {
                    getOptionRender(step)
                }
            </div>
        </div>
    </OPTIONPICKER>
})