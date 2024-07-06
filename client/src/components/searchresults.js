import { useLocation } from "react-router-dom"

const SearchResults = (props) => {
    const location = useLocation()
    // const passedData = location.state.data

    return(
        <div className="outer">
            <div className="main">
                {/* <h1 className="main-heading">Search results for patient name: {state}</h1> */}
                {location.state}
            </div>
        </div>
    )
}

export default SearchResults