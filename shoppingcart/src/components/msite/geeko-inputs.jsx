import React, { useEffect, useState, useRef, useLayoutEffect, createRef } from 'react'
import styled from 'styled-components'
import { form, control, button } from 'react-validation'
import { getCountries, getStates, getCites, getCityByZip } from '../../api'
import _ from 'lodash'
import { FormattedMessage } from 'react-intl'

const InputContainer = styled.div`
    border: 0;
    display: inline-flex;
    padding: 0;
    position: relative;
    min-width: 0;
    flex-direction: column;
    vertical-align: top;
    width: 100%;
    &.select{
        &::after{
            content: '\\e690';
            font-family: 'iconfont';
            position: absolute;
            right: 10px;
            top: 12px;
            pointer-events: none;
            color: #666;
        }
    }
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
        transform: translate(0, -4px) scale(0.85);
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
    padding-bottom: 8px;

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
        border-bottom: 1px solid #666;
        pointer-events: none;
    }

    &.focused::after{
        transform: scaleX(1);
    }

    &.__error::after{
        border-bottom: 1px solid #E64545;
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
        height: 20px;
    }

    & > select{
        border: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: none;
        box-shadow: none;
        cursor: pointer;
        position: relative;
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
        color: #666;
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
           font-family: AcuminPro-Bold;
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
const Close = styled.span`
	display: inline-block;
	position: absolute;
	right: 10px;
	top: 12px;
	cursor: pointer;
    height: 25px;
    width: 25px;
    text-align: center;
    line-height: 25px;
`


export const Input = control(({ error, isChanged, isUsed, divStyle, ...props }) => {
    const [focused, setFocused] = useState(false)
    const label = props.label || props.renderLabel()
    return <InputContainer>
        <Label className={`${(focused || props.value || props.placeholder) ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>{label}</Label>
        <InputWrapper className={`${focused ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>
            <input {...props} autoComplete="no"
                onFocus={(evt) => {
                    setFocused(true);
                    if (props.onFocus) {
                        props.onFocus(evt)
                    }

                }} onBlur={(evt) => {
                    setFocused(false)
                    if (props.onBlur) {
                        props.onBlur(evt)
                    }
                }}
            />
        </InputWrapper>
        {isChanged && isUsed && !!error && <ERROR className="ErrorMsg">{error}</ERROR>}
    </InputContainer>
})


export const Select = control(({ error, isChanged, isUsed, divStyle, ...props }) => {
    const [focused, setFocused] = useState(false)
    const label = props.label || props.renderLabel()
    return <InputContainer className="select">
        <Label className={`${(focused || props.value || props.placeholder) ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>{label}</Label>
        <InputWrapper className={`${focused ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>
            <select {...props}
                onFocus={(evt) => {
                    setFocused(true);
                    if (props.onFocus) {
                        props.onFocus(evt)
                    }

                }} onBlur={(evt) => {
                    setFocused(false)
                    if (props.onBlur) {
                        props.onBlur(evt)
                    }
                }}
            />
        </InputWrapper>
        {isChanged && isUsed && !!error && <ERROR className="ErrorMsg">{error}</ERROR>}
    </InputContainer>
})

export const StreetInput = control(({ error, isChanged, isUsed, divStyle, ...props }) => {
    const [focused, setFocused] = useState(false)
    const label = props.label || props.renderLabel()
    const addressRef = useRef()


    useEffect(() => {
        let autocomplete
        if (window.google && window.google.maps && window.google.maps.places && window.google.maps.places.Autocomplete) {
            autocomplete = new google.maps.places.Autocomplete(addressRef.current, {
                componentRestrictions: { country: [props.country] },
                fields: ["address_components", "geometry"],
                types: ["address"],
            })
            autocomplete.addListener("place_changed", function () {
                const place = autocomplete.getPlace();
                let streetAddress1 = "";
                let zipCode = "";
                let country = "";
                let state = "";
                let city = "";
                for (const component of place.address_components) {
                    const componentType = component.types[0]
                    switch (componentType) {
                        case "street_number": {
                            streetAddress1 = `${component.long_name} ${streetAddress1}`;
                            break
                        }

                        case "route": {
                            streetAddress1 += component.long_name;
                            break
                        }

                        case "postal_code": {
                            zipCode = `${component.long_name}${zipCode}`;
                            break
                        }

                        case "postal_code_suffix": {
                            zipCode = `${zipCode}-${component.long_name}`;
                            break
                        }

                        case "postal_town":
                        case "locality":
                            city = component.long_name;
                            break

                        case "administrative_area_level_1": {
                            state = component.short_name;
                            break
                        }
                        case "country":
                            country = component.short_name;
                            break
                    }
                }


                props.onAuto({
                    streetAddress1,
                    zipCode,
                    city,
                    state,
                    country
                })

            });
        }


        return () => {
            if (autocomplete) {
                autocomplete.unbindAll()
            }
        }
    }, [props.country])


    return <InputContainer>
        <Label className={`${(focused || props.value || props.placeholder) ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>{label}</Label>
        <InputWrapper className={`${focused ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>
            <input {...props} autoComplete="no"
                ref={addressRef}
                onFocus={(evt) => {
                    setFocused(true);
                    if (props.onFocus) {
                        props.onFocus(evt)
                    }

                }} onBlur={(evt) => {
                    setFocused(false)
                    if (props.onBlur) {
                        props.onBlur(evt)
                    }
                }}
            />
        </InputWrapper>
        {isChanged && isUsed && !!error && <ERROR className="ErrorMsg">{error}</ERROR>}
    </InputContainer>
})



export const GountrySelect = control(({ error, isChanged, isUsed, divStyle, ...props }) => {
    const [focused, setFocused] = useState(false)
    const [showOption, setShowOption] = useState(false)
    const label = props.label || props.renderLabel()

    return <React.Fragment>
        <InputContainer className="select" onClick={evt => {
            if (!!!props.disabled) {
                setShowOption(true);
                evt.preventDefault();
            }
        }}>
            <Label className={`${(focused || props.value || props.placeholder) ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>{label}</Label>
            <InputWrapper className={`${focused ? 'focused' : ''} ${isChanged && isUsed && !!error && '__error'}`}>
                <select key={props.value} {...props} onFocus={(evt) => {
                    setFocused(true)
                    if (props.onFocus) {
                        props.onFocus(evt)
                    }

                }} disabled onBlur={(evt) => {
                    setFocused(false)
                    if (props.onBlur) {
                        props.onBlur(evt)
                    }
                }}
                    style={{
                        color: !!props.disabled ? '#999' : '#000',
                        fontSize: 14,
                        fontFamily: 'AcuminPro-Bold',
                        pointerEvents: 'none'
                    }}
                />
            </InputWrapper>
            {isChanged && isUsed && !!error && <ERROR className="ErrorMsg">{error}</ERROR>}
        </InputContainer>
        {
            showOption && <React.Fragment>
                <MASK onClick={evt => { setShowOption(false) }} />
                <SELECTALTER>
                    <Close onClick={() => { setShowOption(false) }}><span style={{ fontSize: 14, cursor: 'pointer', color: '#999', display: 'inline-block', fontFamily: 'iconfont' }}>&#xe6af;</span></Close>
                    <CountryInfoPicker step={props.step || 0} onClose={() => { setShowOption(false) }} country={props.country} state={props.state} city={props.city} onSelect={props.onSelect} />
                </SELECTALTER>
            </React.Fragment>
        }


    </React.Fragment>
})

const CountryList = props => {
    const { options = [], selectedOption, onSelect, filter, step } = props
    const groupedOptions = _.groupBy(options.filter(o => o.label.toUpperCase().indexOf((filter || '').toUpperCase()) >= 0), c => c.label.substr(0, 1).toUpperCase())
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

    useLayoutEffect(() => {
        let k
        if(selectedOption && selectedOption.label){
            k = selectedOption.label.substr(0,1).toUpperCase()
            if(refs[k] && refs[k].current){
                setKey(k)
                refs[k].current.scrollIntoView({
                    block: 'start',
                })
            }
        }
    }, [refs])



    return <OPTIONCONTAINER>
        <OPTIONBODY>
            {
                keys.map(k => <div key={k}>
                    <GROUPHEAD innerRef={refs[k]} id={k}>{k}</GROUPHEAD>
                    <OPTIONS>
                        {
                            (groupedOptions[k] || []).map(op => <li className={`${op.value === option.value ? 'selected' : ''}`} onClick={() => { handleSelect(op) }} key={op.value}>
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
                    keys.map(k => <span className={`${k === key ? 'active' : ''}`} onClick={() => { handleClick(k) }} key={k}>{k}</span>)
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
    const filterRef = useRef()


    useEffect(() => {
        getCountries().then(data => data.result).then(countries => {
            setCountries(countries)
            setCountry((countries || []).find(c => c.value === (props.country || 'US')))
        })
    }, [])

    useEffect(() => {
        setFilter('')
        filterRef.current.value = ''
    }, [step])

    useEffect(() => {
        setCountry((countries || []).find(c => c.value === (props.country || 'US')))
        const statePromise = getStates(props.country).then(data => data.result)
        const citeyPromise = getCites(props.country, props.state).then(data => data.result)
        Promise.all([statePromise, citeyPromise]).then(values => {
            const [nStates, nCities] = values
            const pCities = (nCities || []).map(c => ({ ...c, label: c.name, value: c.name }))
            const pStates = nStates || []
            setState(pStates.find(s => s.value === props.state))
            setCity(pCities.find(c => c.value === props.city))
            setStates(pStates)
            setCities(pCities)
            if (triggeCountry) {
                if (pStates && pStates.length) {
                    // setStep(step + 1)
                } else {
                    props.onClose()
                }
                setTriggeCountry(false)
            }
        })
    }, [props.country])

    useEffect(() => {

        if(props.state){
            setState((states || []).find(s => s.value === props.state))
            getCites(props.country, props.state).then(data => data.result).then(cts => {
                setCities((cts || []).map(c => ({ ...c, label: c.name, value: c.name })))
                if (triggeState) {
                    if (cts && cts.length) {
                        // setStep(step + 1)
                    } else {
                        props.onClose()
                    }
                    setTriggeState(false)
                }
            })
        }

       
    }, [props.state])

    useEffect(() => {
        if (triggeCity) {
            props.onClose()
            setTriggeCity(false)
        }
    }, [props.city])

    const changeHandle = _.debounce(evt => {
        setFilter(evt.target.value)
    }, 400)


    const infoChange = (option, name) => {
        let scountry = country ? country.value : ''
        let sstate = state ? state.value : ''
        let scity = city ? city.value : ''
        switch (name) {
            case 'country':
                scountry = option.value
                setTriggeCountry(true)
                if(scountry !== option.value){
                    setStates([])
                    setCities([])
                }
                setStep(1)
                break
            case 'state':
                sstate = option.value
                setTriggeState(true)
                if(sstate !== option.value){
                    setCities([])
                }
                setStep(2)
                break
            case 'city':
                scity = option.value
                setTriggeCity(true)
                break
        }
        props.onSelect(scountry, sstate, scity, option.zipCodes)
        
    }

    const getOptionRender = s => {
        if (s === 0) {
            return <CountryList step={step} onSelect={option => infoChange(option, 'country')} filter={filter} selectedOption={country} options={countries} />
        } else if (s === 1) {
            return <CountryList step={step} onSelect={option => infoChange(option, 'state')} filter={filter} selectedOption={state} options={states} />
        } else if (s === 2) {
            return <CountryList step={step} onSelect={option => infoChange(option, 'city')} filter={filter} selectedOption={city} options={cities} />
        }
    }

    const stepClickHandle = s => {
        setStep(Number(s))
    }

    // useLayoutEffect(() => {
    //     bdref.current.scrollTo(0, 0)
    // }, [
    //     step
    // ])


    return <OPTIONPICKER>
        <div className="__hd">
            <div className="__title"><FormattedMessage id="country" /></div>
            <div className="__search">
                <span className="__icon">&#xe772;</span>
                <input ref={filterRef} className="__input" onChange={changeHandle} />
            </div>
            <div className="__menu">
                <span onClick={() => { stepClickHandle(0) }} style={{ width: '50%' }}>
                    <span style={{ color: step === 0 ? '#e64545' : '#999' }}>{country ? country.label : <span><FormattedMessage id="country" /></span>}</span>
                </span>
                {
                    states && states.length > 0 && <span onClick={() => { stepClickHandle(1) }} style={{ width: '50%' }}>
                        <span style={{ color: step === 1 ? '#e64545' : '#999' }}>{state ? state.label : <span><FormattedMessage id="state" /></span>}</span>
                    </span>
                }

                {
                    cities && cities.length > 0 && <span onClick={() => { stepClickHandle(2) }} style={{ width: '50%' }}>
                        <span style={{ color: step === 2 ? '#e64545' : '#999' }}>{city ? city.label : <span><FormattedMessage id="city" /></span>}</span>
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