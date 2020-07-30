import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function SearchForm({params, onParamChange, handleCheckbox}) {
    return (
        <Form className="mb-4">
            <Form.Row className="align-items-end">
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        type="text"
                        value={params.description}
                        onChange={onParamChange}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        name="location"
                        type="text"
                        value={params.location}
                        onChange={onParamChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xs="auto" className="ml-2" >
                    <Form.Check
                        className="mb-2"
                        name="full_time"
                        id="full_time"
                        type="checkbox"
                        label="Only Full Time"
                        value={params.full_time}
                        onChange={handleCheckbox}
                    />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}
