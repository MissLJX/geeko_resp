import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactSlider from 'react-slider'

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 2px;
`


const Thumb = (props, state) => <span  {...props}><span style={{
    width: 18,
    height: 18,
    borderRadius: '50%',
    backgroundColor: '#222',
    display: 'inline-block',
    position: 'absolute',
    top: -9,
    left: -9
}}/></span>

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => props.index === 2 ? '#ddd' : props.index === 1 ? '#222' : '#ddd'};
`

const Track = (props, state) => <StyledTrack {...props} index={state.index} />

const INFO = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`


export default props => {
    const [values, setValues] = useState(props.values || [0, 80])

    useEffect(() => {
        setValues(props.values)
    }, [props.values])

    return <div >
        <INFO>
            <span>{values[0]}</span>
            <span>{values[1]}</span>
        </INFO>
        <div style={{marginTop: 16, paddingRight: 9, paddingLeft: 9}}>
            <StyledSlider
                defaultValue={[values[0], values[1]]}
                value={values}
                renderTrack={Track}
                renderThumb={Thumb}
                onAfterChange={(values) => {props.onChange(values)}}
                onChange={(v1, v2) => {
                    setValues(v1)
                }}
                min={Number(props.min.amount||0)}
                max={Number(props.max.amount||100)}
            />
        </div>
    </div>
}