import React, { useState } from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkDown from 'react-markdown'

export default function Job({job}) {
    const [open, setOpen] = useState(false)
    return (
        <Card className="mb-3 jobCard">
            <Card.Body style={{paddingBottom: 0}}>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="primary" className="mr-2" style={{backgroundColor: '#F0DB4F', color: '#323330'}}>
                            {job.type}
                        </Badge>
                        <Badge variant="primary">
                            Location: {job.location}
                        </Badge>
                        <div className="mt-2"  style={{wordBreak: 'break-all'}}>
                            <ReactMarkDown source={job.how_to_apply} />
                        </div>
                    </div>
                    <img className="d-none d-md-block" height="50" alt={job.company} src={job.company_logo} />
                </div>
            </Card.Body>
            <Card.Text className="mr-3 text-right" >
                <Button 
                    onClick={() => setOpen(prevOpen=>!prevOpen)} 
                    variant="primary"
                >
                    {open ? 'Hide Details' : 'View Details'}
                </Button>
            </Card.Text>
            <Collapse in={open}>
                <div className="m-4">
                    <ReactMarkDown source={job.description}/>
                </div>
            </Collapse>
        </Card>
    )
}
