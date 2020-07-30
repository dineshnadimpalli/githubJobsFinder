import React, { useState } from 'react';
import useFetchJobs from './utils/useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './components/Job';
import JobsPagination from './components/JobsPagination';
import SearchForm from './components/SearchForm';

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const {
    jobs, 
    loading,
    error,
    hasNextPage
  } = useFetchJobs(params, page)

  const handleParamChange = (e) => {
    const param = e.target.name 
    const value = e.target.value
    console.log(param, value)
    setPage(1)
    setParams((prevParams => {
      return {
        ...prevParams,
        [param]: value
      }
    }))
  }

  const handleCheckbox = (e) => {
    const param = e.target.name 
    const value = e.target.checked
    console.log(param, value)
    setPage(1)
    setParams((prevParams => {
      return {
        ...prevParams,
        [param]: !prevParams.full_time
      }
    }))
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Find jobs around you</h1>
      <h5 className="text-muted mb-4">Using Github Jobs api</h5>
      <SearchForm params={params} onParamChange={handleParamChange} handleCheckbox={handleCheckbox}/>
      {(loading || jobs.length>0) && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
      {!loading && jobs.length===0 && <h3 className="text-muted mb-2">No results found :(</h3>}
      {loading && <h3 className="text-muted mb-2">Loading...</h3>}
      {error && <h3 className="text-muted mb-2">Error. Try refreshing the page</h3>}
      {
        jobs && jobs.map(job=>{
          return <Job key={job.id} job={job}/>
        })
      }
      {jobs.length>0 && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
    </Container>
  )
}

export default App;
