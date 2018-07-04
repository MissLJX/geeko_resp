import React from 'react'
import {unitprice} from '../utils/utils.js'

export default (props) => <span {...props}>{unitprice(props.money)}</span>
