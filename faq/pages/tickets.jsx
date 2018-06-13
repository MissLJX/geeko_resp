import React from 'react'
import styled from 'styled-components'
import {list} from '../api'
import {Link} from 'react-router-dom'
import {withScroll} from '../HoCs/list.jsx'
import {ColoredButton} from '../components/buttons.jsx'

class TicketList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
  	const StatusText = styled.label`
  		&::before{
  			content:'';
  			display: inline-block;
  			background-color: ${props => props.color};
  			width: 10px;
  			height: 10px;
  			border-radius: 50%;
  			margin-right: 4px;
  		}
  		color: ${props => props.color};
  		font-size: 12px;
  	`

  	const Status = (props) => {
  		let rendered
  		switch (props.state) {
  			case 1:
  				rendered = <StatusText color="#ff7700">No replied</StatusText>
  				break
  			case 2:
  				rendered = <StatusText color="#208d00">Replied</StatusText>
  				break
  			default:
  				rendered = <StatusText color="#666">Resolved</StatusText>
  				break
  		}
  		return rendered
  	}

  	const TicketUL = styled.ul`
  		& > li{
  			margin-top: 10px;
  			&:first-child{
  				margin-top: 0;
  			}
  			& > a{
  				text-decoration: none;
  			}
  		}
  	`

  	const TicketLI = styled.li`
  		background-color: #fff;
  		padding-left: 10px;
  		padding-right: 10px;
  	`

  	const TicketHD = styled.div`
  		border-bottom: 1px solid #cacaca;
  		height: 40px;
  		width: 100%;
  	`

  	const TicketBD = styled.div`
  		padding-top: 15px;
  		padding-bottom: 15px;
  		& > div{
  			margin-top: 5px;
  			&:first-child{
  				margin-top: 0;
  			}
  		}
  	`

  	const TicketGrey = styled.span`
  		color: #999;
  		font-size: 12px;
  	`

  	const TicketContent = styled.span`
  		color: #222;
  		font-size: 14px;
  		line-height: 20px;
  	`

  	const getMessage = (reply) => {
  		if (reply.imageUrls && reply.imageUrls.length) {
  			return `[Image] ${reply.message === '-' ? '' : reply.message}`
  		}
  		return reply.message === '-' ? '' : reply.message
  	}

    return <TicketUL>
    		{this.props.tickets && this.props.tickets.map((ticket) => (
    			ticket.ticketReplies &&
    			<TicketLI key={ticket.id}>

    				<Link to={`/ticket/${ticket.id}`}>
    			    	<TicketHD className="x-table __vm">
	    					<div className="x-cell">
	    						<TicketGrey>Ticket ID: </TicketGrey>
	    						<TicketGrey>{ticket.id}</TicketGrey>
	    					</div>
	    					<div className="x-cell" style={{textAlign: 'right'}}>
	    						<TicketGrey>{new Date(ticket.openDate).toLocaleDateString()}</TicketGrey>
	    					</div>
	    				</TicketHD>

	    				<TicketBD>
	    					<div>
	    						<TicketContent>Last message: {getMessage(ticket.ticketReplies[0])}</TicketContent>
	    					</div>
	    					<div>
	    						<Status state={ticket.state}/>
	    					</div>
	    					<div>
	    						<TicketGrey>{new Date(ticket.updateDate).toLocaleString()}</TicketGrey>
	    					</div>
	    				</TicketBD>
    				</Link>

    			</TicketLI>
    		))}
    	</TicketUL>
  }
}

export default class Tickets extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tickets: [],
      skip: 0,
      limit: 20,
      loading: false,
      finished: false
    }

    this.scrollHandler = this.scrollHandler.bind(this)
  }

  scrollHandler () {
  	if (!this.state.loading) {
  		this.setState({loading: true})
  		list(this.state.skip, this.state.limit).then(({result: items}) => {
	  		this.setState({
	  			tickets: this.state.tickets.concat(items),
	  			loading: false,
	  			skip: this.state.skip + this.state.limit,
	  			finished: !items || !items.length
	  		})
  		})
  	}
  }

  componentWillMount () {
  	this.scrollHandler()
  }
  render () {
  	const ScrolledTicketList = withScroll(TicketList)

  	const BottomText = this.state.finished ? <span>No more</span> : (this.state.loading ? <span>Loading...</span> : null)

  	return (
  			<div>
  				<ScrolledTicketList scrollHandler={this.scrollHandler} tickets={this.state.tickets}/>
  				<div style={{height: '50px', textAlign: 'center'}}>
  					{BottomText}
  				</div>
        <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
          <Link style={{
            display: 'block',
            textAlign: 'center',
            height: '45px',
            lineHeight: '45px',
            backgroundColor: '#222',
            color: '#fff',
            textTransform: 'uppercase',
            textDecoration: 'none'
          }}
          to="/ticket/add">Submit a Ticket</Link>
        </div>
  			</div>
  			)
  }
}
